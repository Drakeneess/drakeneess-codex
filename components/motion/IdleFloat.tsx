"use client";

import { motion } from "framer-motion";

type IdleFloatProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function IdleFloat({
  children,
  className = "",
  delay = 0,
}: IdleFloatProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}