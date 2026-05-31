"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const interactiveSelector =
  "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']";

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 160, damping: 24, mass: 0.45 });
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 24, mass: 0.45 });
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (!finePointer) {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target;

      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setIsVisible(true);
      setIsInteractive(target instanceof Element && Boolean(target.closest(interactiveSelector)));
    };

    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.documentElement.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <motion.div
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-cyan-50 shadow-[0_0_10px_rgba(165,243,252,0.7)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          opacity: isVisible ? 0.95 : 0,
          scale: isInteractive ? 0.7 : 1
        }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-cyan-100/24 bg-cyan-100/[0.018] shadow-[0_0_22px_rgba(125,211,252,0.16)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          opacity: isVisible ? 0.72 : 0,
          scale: isInteractive ? 1.42 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed left-0 top-0 h-14 w-14 rounded-full bg-cyan-100/[0.035] blur-xl"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          opacity: isVisible ? 0.42 : 0,
          scale: isInteractive ? 1.08 : 0.82
        }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}
