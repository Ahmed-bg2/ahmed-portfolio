import { execSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";

const nextCachePath = join(process.cwd(), ".next");
const guardedLifecycleEvents = new Set(["prebuild", "predev"]);

function getActiveNextPorts() {
  if (process.platform !== "win32") {
    return [];
  }

  try {
    const output = execSync("netstat -ano", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });

    const activePorts = output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => /\bLISTENING\b/.test(line))
      .map((line) => {
        const match = line.match(/:(30(?:0\d|10))\s+\S+\s+LISTENING\s+(\d+)$/);
        return match ? { port: match[1], pid: match[2] } : null;
      })
      .filter(Boolean);

    return Array.from(
      new Map(activePorts.map((server) => [`${server.port}-${server.pid}`, server])).values()
    );
  } catch {
    return [];
  }
}

const lifecycleEvent = process.env.npm_lifecycle_event ?? "";
const activeNextPorts = getActiveNextPorts();

if (
  guardedLifecycleEvents.has(lifecycleEvent) &&
  activeNextPorts.length > 0 &&
  process.env.NEXT_FORCE_CLEAN !== "1"
) {
  const activeServers = activeNextPorts
    .map((server) => `:${server.port} (pid ${server.pid})`)
    .join(", ");

  console.error(
    `Refusing to clean .next while dev servers are active on ${activeServers}. Stop them first, or set NEXT_FORCE_CLEAN=1 if you are sure.`
  );
  process.exit(1);
}

rmSync(nextCachePath, { force: true, recursive: true });
