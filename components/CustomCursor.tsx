"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-cyan-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      variants={variants}
      animate="default"
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}