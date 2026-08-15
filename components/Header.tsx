"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-brand-border"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center shadow-btn">
            <Send size={16} className="text-white" strokeWidth={2} />
          </div>
          <span className="text-base sm:text-lg font-bold text-brand-text tracking-tight">
            Flash BotEditor
            <span className="text-primary-600">!</span>
          </span>
        </motion.div>

        {/* Developer button */}
        <motion.a
          href="https://t.me/FL4SH_FF"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold shadow-btn transition-all duration-200 hover:bg-primary-700 hover:shadow-btn-hover active:scale-95"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          aria-label="Visit developer's Telegram profile"
        >
          <Send size={14} strokeWidth={2} className="flex-shrink-0" />
          <span className="hidden sm:inline">Developer</span>
          <span className="sm:hidden">Dev</span>
        </motion.a>
      </div>
    </motion.header>
  );
}
