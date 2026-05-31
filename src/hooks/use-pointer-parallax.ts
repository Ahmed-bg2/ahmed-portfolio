"use client";

import { useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";

export function usePointerParallax(strength = 1) {
  const pointerX = useMotionValue(-600);
  const pointerY = useMotionValue(-600);
  const normalizedX = useMotionValue(0);
  const normalizedY = useMotionValue(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (!finePointer) {
      return undefined;
    }

    let frame = 0;
    const current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      nx: 0,
      ny: 0
    };
    const target = { ...current };

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      current.nx += (target.nx - current.nx) * 0.1;
      current.ny += (target.ny - current.ny) * 0.1;

      pointerX.set(current.x);
      pointerY.set(current.y);
      normalizedX.set(current.nx * strength);
      normalizedY.set(current.ny * strength);

      const distance =
        Math.abs(target.x - current.x) +
        Math.abs(target.y - current.y) +
        Math.abs(target.nx - current.nx) +
        Math.abs(target.ny - current.ny);

      if (distance > 0.01) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const move = (event: PointerEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;

      target.x = event.clientX;
      target.y = event.clientY;
      target.nx = (event.clientX / width - 0.5) * 2;
      target.ny = (event.clientY / height - 0.5) * 2;
      setIsActive(true);

      if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };

    const leave = () => setIsActive(false);

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [normalizedX, normalizedY, pointerX, pointerY, strength]);

  return { pointerX, pointerY, normalizedX, normalizedY, isActive };
}
