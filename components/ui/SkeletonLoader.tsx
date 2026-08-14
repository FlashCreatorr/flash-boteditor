"use client";

import { motion } from "framer-motion";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`skeleton ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

export default function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 sm:p-8 space-y-6"
      aria-label="Loading bot information"
      role="status"
    >
      {/* Header with avatar and name */}
      <div className="flex items-center gap-4">
        <SkeletonBlock className="w-20 h-20 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-5 w-2/3 rounded-lg" />
          <SkeletonBlock className="h-4 w-1/2 rounded-lg" />
          <SkeletonBlock className="h-4 w-1/3 rounded-lg" />
        </div>
      </div>

      {/* Info rows */}
      <div className="space-y-3">
        <SkeletonBlock className="h-4 w-full rounded-lg" />
        <SkeletonBlock className="h-4 w-5/6 rounded-lg" />
        <SkeletonBlock className="h-4 w-4/6 rounded-lg" />
      </div>

      {/* Edit section */}
      <div className="space-y-4 pt-2 border-t border-brand-border">
        <SkeletonBlock className="h-10 w-full rounded-2xl" />
        <SkeletonBlock className="h-24 w-full rounded-2xl" />
        <SkeletonBlock className="h-20 w-full rounded-2xl" />
        <SkeletonBlock className="h-12 w-full rounded-2xl" />
      </div>
    </motion.div>
  );
}
