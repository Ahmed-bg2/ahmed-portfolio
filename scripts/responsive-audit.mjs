import { spawn } from "node:child_process";

const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.AUDIT_URL ?? "http://127.0.0.1:3000";
const widths = [320, 375, 390, 430, 768, 1024, 1440];
const routes = [
  "/",
  "/projects/fixitechpro",
  "/projects/schoolpro",
  "/projects/kia-appointment-booking-system",
  "/certifications/ccna-introduction-to-networks"
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForJson(url, attempts = 40) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Chrome may need a moment before the debugging endpoint is ready.
    }

    await sleep(150);
  }

  throw new Error(`Unable to read ${url}`);
}

function send(socket, method, params = {}) {
  const id = send.nextId++;

  return new Promise((resolve, reject) => {
    const onMessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.id !== id) {
        return;
      }

      socket.removeEventListener("message", onMessage);

      if (data.error) {
        reject(new Error(`${method}: ${data.error.message}`));
        return;
      }

      resolve(data.result);
    };

    socket.addEventListener("message", onMessage);
    socket.send(JSON.stringify({ id, method, params }));
  });
}

send.nextId = 1;

async function auditViewport(width) {
  const port = 9300 + widths.indexOf(width);
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--window-size=${width},1200`,
    "about:blank"
  ], { stdio: "ignore" });

  try {
    const targets = await waitForJson(`http://127.0.0.1:${port}/json/list`);
    const page = targets.find((target) => target.type === "page") ?? targets[0];
    const socket = new WebSocket(page.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    });

    await send(socket, "Page.enable");
    await send(socket, "Runtime.enable");
    await send(socket, "Emulation.setDeviceMetricsOverride", {
      width,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: width < 768
    });

    const results = [];

    for (const route of routes) {
      await send(socket, "Page.navigate", { url: `${baseUrl}${route}` });
      await new Promise((resolve) => {
        const onMessage = (event) => {
          const data = JSON.parse(event.data);

          if (data.method === "Page.loadEventFired") {
            socket.removeEventListener("message", onMessage);
            resolve();
          }
        };

        socket.addEventListener("message", onMessage);
      });
      await sleep(350);

      const evaluation = await send(socket, "Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const root = document.documentElement;
          const body = document.body;
          const overflow = Math.max(root.scrollWidth, body.scrollWidth) - window.innerWidth;
          const elements = Array.from(document.querySelectorAll("body *"));
          const offenders = elements
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                tag: element.tagName.toLowerCase(),
                text: (element.textContent || "").trim().slice(0, 70),
                className: String(element.className || "").slice(0, 120),
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width)
              };
            })
            .filter((item) => item.width > 0 && (item.left < -2 || item.right > window.innerWidth + 2))
            .slice(0, 8);

          const brokenImages = Array.from(document.images)
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => image.currentSrc || image.src);

          return { route: location.pathname, width: window.innerWidth, overflow, offenders, brokenImages };
        })()`
      });

      results.push(evaluation.result.value);
    }

    socket.close();
    return results;
  } finally {
    chrome.kill();
  }
}

const allResults = [];

for (const width of widths) {
  allResults.push(...await auditViewport(width));
}

const failures = allResults.filter(
  (result) => result.overflow > 2 || result.brokenImages.length > 0
);

console.table(allResults.map((result) => ({
  width: result.width,
  route: result.route,
  overflow: result.overflow,
  offenders: result.offenders.length,
  brokenImages: result.brokenImages.length
})));

if (failures.length > 0) {
  console.log(JSON.stringify(failures, null, 2));
  process.exit(1);
}
