"use client";

import { motion, useMotionTemplate, useSpring, useTransform } from "framer-motion";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";

type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  color: string;
  shadow: string;
};

const particleColors = [
  { color: "rgba(186,230,253,0.9)", shadow: "0 0 16px rgba(125,211,252,0.42)" },
  { color: "rgba(167,243,208,0.86)", shadow: "0 0 16px rgba(52,211,153,0.34)" },
  { color: "rgba(253,186,116,0.82)", shadow: "0 0 16px rgba(251,191,36,0.3)" },
  { color: "rgba(249,168,212,0.78)", shadow: "0 0 16px rgba(244,114,182,0.3)" }
];

const makeParticles = (count: number, offset: number, baseSize: number): Particle[] =>
  Array.from({ length: count }, (_, index) => {
    const seed = index + offset;
    const tone = particleColors[seed % particleColors.length];

    return {
      id: seed,
      left: `${(seed * 47) % 100}%`,
      top: `${(seed * 71) % 100}%`,
      size: baseSize + ((seed * 11) % 4) * 0.38,
      opacity: 0.16 + ((seed * 17) % 44) / 100,
      delay: ((seed * 13) % 10) * 0.28,
      duration: 5.4 + ((seed * 19) % 8),
      color: tone.color,
      shadow: tone.shadow
    };
  });

const particleLayers = [
  { particles: makeParticles(70, 21, 0.8), depth: 4, className: "hidden sm:block opacity-70" },
  { particles: makeParticles(48, 143, 1.05), depth: 10, className: "opacity-80" },
  { particles: makeParticles(26, 317, 1.45), depth: 18, className: "opacity-90" }
];

const networkPaths = [
  "M4 22 C14 15 24 18 33 27 C44 38 54 35 65 24 C74 15 86 16 96 25",
  "M8 68 C18 54 31 58 42 66 C54 75 65 70 76 58 C84 49 91 52 98 61",
  "M18 42 L29 34 L41 40 L54 29 L67 38 L82 31",
  "M2 84 L17 76 L31 82 L46 72 L62 79 L79 69 L96 76",
  "M11 12 L22 22 L34 18 L49 29 L64 21 L81 28 L94 18"
];

const nodePoints = [
  [18, 42],
  [29, 34],
  [41, 40],
  [54, 29],
  [67, 38],
  [82, 31],
  [17, 76],
  [31, 82],
  [46, 72],
  [62, 79],
  [79, 69],
  [22, 22],
  [49, 29],
  [64, 21],
  [81, 28]
];

const dataBeams = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  left: `${6 + index * 13}%`,
  delay: index * 0.72,
  duration: 8 + (index % 4)
}));

export function AnimatedBackground() {
  const { pointerX, pointerY, normalizedX, normalizedY, isActive } = usePointerParallax(1);
  const smoothX = useSpring(normalizedX, { stiffness: 42, damping: 28, mass: 0.8 });
  const smoothY = useSpring(normalizedY, { stiffness: 42, damping: 28, mass: 0.8 });
  const glow = useMotionTemplate`radial-gradient(560px circle at ${pointerX}px ${pointerY}px, rgba(125,211,252,0.15), rgba(52,211,153,0.07) 30%, rgba(244,114,182,0.05) 48%, transparent 72%)`;
  const gridX = useTransform(smoothX, (value) => value * 10);
  const gridY = useTransform(smoothY, (value) => value * 8);
  const networkX = useTransform(smoothX, (value) => value * 16);
  const networkY = useTransform(smoothY, (value) => value * 10);
  const nearX = useTransform(smoothX, (value) => value * -18);
  const nearY = useTransform(smoothY, (value) => value * -13);
  const midX = useTransform(smoothX, (value) => value * -10);
  const midY = useTransform(smoothY, (value) => value * -7);
  const farX = useTransform(smoothX, (value) => value * -4);
  const farY = useTransform(smoothY, (value) => value * -3);

  const layerTransforms = [
    { x: farX, y: farY },
    { x: midX, y: midY },
    { x: nearX, y: nearY }
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030511]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#030511_0%,#07101f_44%,#030511_100%)]" />
      <div className="absolute inset-0 opacity-80 [background:linear-gradient(125deg,rgba(125,211,252,0.12)_0%,transparent_28%,rgba(52,211,153,0.075)_47%,transparent_66%,rgba(244,114,182,0.105)_100%)]" />
      <div className="soft-aurora absolute inset-[-26%] opacity-70 blur-3xl [background:conic-gradient(from_120deg_at_48%_42%,rgba(125,211,252,0.14)_0deg,rgba(52,211,153,0.1)_72deg,rgba(251,191,36,0.09)_142deg,rgba(244,114,182,0.11)_214deg,rgba(96,165,250,0.12)_292deg,rgba(125,211,252,0.14)_360deg)]" />
      <div className="breathing-light absolute inset-x-0 top-0 h-[46rem] bg-[linear-gradient(100deg,transparent,rgba(125,211,252,0.09)_24%,rgba(52,211,153,0.06)_48%,rgba(244,114,182,0.08)_72%,transparent)] blur-3xl" />
      <motion.div
        className="absolute inset-[-4rem] bg-[linear-gradient(rgba(186,230,253,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(167,243,208,0.026)_1px,transparent_1px)] bg-[size:88px_88px] opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"
        style={{ x: gridX, y: gridY }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_38%,rgba(125,211,252,0.045)_40%,rgba(52,211,153,0.035)_41%,transparent_43%,transparent_100%)] bg-[length:280px_280px] opacity-75" />
      <div className="absolute inset-0 bg-[linear-gradient(155deg,transparent_0%,transparent_51%,rgba(251,191,36,0.028)_52%,transparent_54%,transparent_100%)] bg-[length:340px_340px] opacity-60" />

      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{ background: glow }}
        animate={{ opacity: isActive ? 1 : 0.32 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      <motion.svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ x: networkX, y: networkY }}
      >
        <defs>
          <linearGradient id="bg-network-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(244,114,182,0)" />
            <stop offset="38%" stopColor="rgba(125,211,252,0.38)" />
            <stop offset="66%" stopColor="rgba(52,211,153,0.26)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0)" />
          </linearGradient>
        </defs>
        {networkPaths.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="url(#bg-network-line)"
            strokeWidth="0.11"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.56, 0.22] }}
            transition={{
              duration: 8.2 + index * 1.2,
              delay: index * 0.55,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        ))}
        {nodePoints.map(([cx, cy], index) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="0.2"
            fill={index % 3 === 0 ? "rgba(167,243,208,0.72)" : "rgba(186,230,253,0.74)"}
            animate={{ opacity: [0.18, 0.72, 0.24], scale: [0.8, 1.35, 0.9] }}
            transition={{
              duration: 4.6 + (index % 5),
              delay: index * 0.13,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.svg>

      {dataBeams.map((beam) => (
        <motion.span
          key={beam.id}
          className="absolute top-[-22rem] h-[44rem] w-px rotate-[24deg] bg-gradient-to-b from-transparent via-sky-100/[0.16] to-transparent"
          style={{ left: beam.left }}
          animate={{ y: ["-18%", "126%"], opacity: [0, 0.65, 0] }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {particleLayers.map((layer, layerIndex) => (
        <motion.div
          key={layer.depth}
          className={`absolute inset-0 ${layer.className}`}
          style={layerTransforms[layerIndex]}
        >
          {layer.particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                backgroundColor: particle.color,
                boxShadow: particle.shadow
              }}
              animate={{
                opacity: [particle.opacity * 0.45, particle.opacity, particle.opacity * 0.58],
                scale: [0.86, 1.2, 0.92]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#030511] via-[#030511]/80 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,5,17,0.12)_55%,rgba(3,5,17,0.78)_100%)]" />
    </div>
  );
}
