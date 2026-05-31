"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";

const nodes = [
  { x: 250, y: 74 },
  { x: 350, y: 133 },
  { x: 376, y: 250 },
  { x: 319, y: 352 },
  { x: 188, y: 356 },
  { x: 121, y: 250 },
  { x: 151, y: 137 },
  { x: 250, y: 196 },
  { x: 300, y: 250 },
  { x: 250, y: 306 },
  { x: 199, y: 250 }
];

const paths = [
  "M250 74 L350 133 L376 250 L319 352 L188 356 L121 250 L151 137 Z",
  "M151 137 L300 250 L188 356",
  "M350 133 L199 250 L319 352",
  "M121 250 L250 196 L376 250",
  "M250 74 L250 196 L250 306 L250 420",
  "M82 250 C138 178 188 144 250 144 C312 144 362 178 418 250",
  "M82 250 C138 322 188 356 250 356 C312 356 362 322 418 250"
];

export function HolographicCore() {
  const { normalizedX, normalizedY } = usePointerParallax(0.75);
  const smoothX = useSpring(normalizedX, { stiffness: 70, damping: 24, mass: 0.7 });
  const smoothY = useSpring(normalizedY, { stiffness: 70, damping: 24, mass: 0.7 });
  const rotateY = useTransform(smoothX, [-1, 1], [-13, 13]);
  const rotateX = useTransform(smoothY, [-1, 1], [10, -10]);
  const shiftX = useTransform(smoothX, (value) => value * 16);
  const shiftY = useTransform(smoothY, (value) => value * 12);

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[31rem] [perspective:1100px]"
      initial={false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, x: shiftX, y: shiftY, transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.2),transparent_58%)] blur-2xl" />
        <motion.div
          className="absolute inset-[9%] rounded-full border border-cyan-100/[0.16]"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[18%] rounded-full border border-fuchsia-300/[0.12]"
          animate={{ rotate: -360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/[0.11]"
          style={{ rotateX: 68 }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[58%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/[0.13]"
          style={{ rotateX: 74, rotateY: -20 }}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 23, repeat: Infinity, ease: "linear" }}
        />

        <motion.svg
          className="absolute inset-0 h-full w-full drop-shadow-[0_0_24px_rgba(34,211,238,0.22)]"
          viewBox="0 0 500 500"
          fill="none"
        >
          <defs>
            <linearGradient id="holo-line" x1="80" y1="80" x2="420" y2="420">
              <stop offset="0%" stopColor="rgba(216,180,254,0)" />
              <stop offset="45%" stopColor="rgba(103,232,249,0.72)" />
              <stop offset="100%" stopColor="rgba(96,165,250,0.05)" />
            </linearGradient>
            <radialGradient id="holo-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
              <stop offset="22%" stopColor="rgba(165,243,252,0.46)" />
              <stop offset="58%" stopColor="rgba(59,130,246,0.12)" />
              <stop offset="100%" stopColor="rgba(2,4,10,0)" />
            </radialGradient>
          </defs>

          <motion.circle
            cx="250"
            cy="250"
            r="78"
            fill="url(#holo-core)"
            animate={{ opacity: [0.68, 1, 0.72], scale: [0.96, 1.05, 0.98] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {paths.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              stroke="url(#holo-line)"
              strokeWidth={index < 4 ? 1.05 : 0.72}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.75, 0.38] }}
              transition={{
                duration: 5.8 + index * 0.55,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          ))}

          {nodes.map((node, index) => (
            <motion.g key={`${node.x}-${node.y}`}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={index < 7 ? 4 : 3}
                fill="rgba(165,243,252,0.86)"
                animate={{ opacity: [0.35, 0.95, 0.5], scale: [0.86, 1.24, 0.9] }}
                transition={{
                  duration: 3.8 + (index % 4),
                  delay: index * 0.16,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <circle cx={node.x} cy={node.y} r={index < 7 ? 10 : 7} fill="rgba(103,232,249,0.07)" />
            </motion.g>
          ))}
        </motion.svg>

        <div className="absolute inset-x-[18%] bottom-[12%] h-px bg-gradient-to-r from-transparent via-cyan-100/35 to-transparent" />
        <div className="absolute inset-x-[25%] top-[15%] h-px bg-gradient-to-r from-transparent via-fuchsia-200/20 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
