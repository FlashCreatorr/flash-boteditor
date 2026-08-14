"use client";

import { motion } from "framer-motion";

interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Spinner({ size = 20, color = "#2563eb", className = "" }: SpinnerProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      aria-label="Loading"
      role="img"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2.5"
        strokeOpacity="0.2"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
