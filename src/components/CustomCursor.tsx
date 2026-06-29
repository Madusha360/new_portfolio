"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hovered" | "project">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring filters for inertia/lag
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile/touch-only devices to disable custom cursor
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };

    if (isTouchDevice()) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);

      // Find if we are hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const checkHover = () => {
        // Check if hover target is inside Bento Grid Project Card
        const projectCard = target.closest("[data-cursor='project']");
        if (projectCard) {
          setCursorType("project");
          return;
        }

        // Check if hover target is links, buttons, or custom toggles
        const interactive = target.closest("a, button, [role='button'], .cursor-pointer");
        if (interactive) {
          setCursorType("hovered");
          return;
        }

        setCursorType("default");
      };

      checkHover();
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic style injection to hide standard cursor on desktop
    const style = document.createElement("style");
    style.innerHTML = `
      @media (pointer: fine) {
        body, a, button, input, textarea, select {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.head.removeChild(style);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) {
    return null;
  }

  // Size/styling variations based on cursor state
  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: "rgba(111, 95, 77, 0.15)", // Subtle bronze shade
      border: "1.5px solid var(--accent)",
      mixBlendMode: "normal" as const,
    },
    hovered: {
      width: 36,
      height: 36,
      backgroundColor: "var(--accent)",
      border: "1.5px solid var(--accent)",
      mixBlendMode: "difference" as const,
    },
    project: {
      width: 72,
      height: 72,
      backgroundColor: "var(--background)",
      border: "1.5px solid var(--accent)",
      color: "var(--foreground)",
      mixBlendMode: "normal" as const,
    }
  };

  const currentVariant = variants[cursorType];

  return (
    <motion.div
      style={{
        left: cursorX,
        top: cursorY,
        width: currentVariant.width,
        height: currentVariant.height,
        backgroundColor: currentVariant.backgroundColor,
        border: currentVariant.border,
        mixBlendMode: currentVariant.mixBlendMode,
      }}
      animate={{
        scale: cursorType !== "default" ? [0.9, 1.05, 1] : 1,
      }}
      transition={{ duration: 0.3 }}
      className="fixed pointer-events-none z-50 rounded-full flex items-center justify-center font-mono text-[9px] uppercase tracking-widest text-accent font-medium shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
    >
      {cursorType === "project" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-foreground dark:text-background font-semibold"
        >
          view
        </motion.span>
      )}
    </motion.div>
  );
}
