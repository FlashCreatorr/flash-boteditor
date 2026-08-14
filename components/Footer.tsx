"use client";

import { motion } from "framer-motion";
import { Shield, Send } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="w-full border-t border-brand-border bg-brand-surface mt-12"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-brand-muted text-sm">
            <Shield size={14} strokeWidth={2} />
            <span>Your token is never stored or sent to any third party.</span>
          </div>
          <div className="flex items-center gap-2 text-brand-muted text-sm">
            <span>Built with</span>
            <a
              href="https://t.me/FL4SH_FF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              aria-label="Developer Telegram"
            >
              <Send size={13} strokeWidth={2} />
              <span>@FL4SH_FF</span>
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
