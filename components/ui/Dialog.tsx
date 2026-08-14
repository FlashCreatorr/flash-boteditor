"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
}

export default function Dialog({ isOpen, type, title, message, onClose }: DialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-message"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-card-hover border border-brand-border p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-all duration-150"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.1, duration: 0.5, bounce: 0.4 }}
              className="flex justify-center mb-5"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isSuccess
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {isSuccess ? (
                  <CheckCircle size={32} strokeWidth={1.5} />
                ) : (
                  <XCircle size={32} strokeWidth={1.5} />
                )}
              </div>
            </motion.div>

            {/* Content */}
            <div className="text-center">
              <h2
                id="dialog-title"
                className={`text-xl font-bold mb-2 ${
                  isSuccess ? "text-emerald-700" : "text-red-700"
                }`}
              >
                {title}
              </h2>
              <p id="dialog-message" className="text-brand-muted text-sm leading-relaxed">
                {message}
              </p>
            </div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-6"
            >
              <button
                onClick={onClose}
                className={`btn-shine w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
                  isSuccess
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
