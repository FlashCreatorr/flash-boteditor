"use client";

import { motion } from "framer-motion";
import { Hash, AtSign, User, FileText, AlignLeft } from "lucide-react";
import BotAvatar from "@/components/BotAvatar";
import type { BotInfo } from "@/types/telegram";

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}

function InfoRow({ icon, label, value, mono = false }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-brand-border last:border-0">
      <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-primary-600">{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p
          className={`text-sm text-brand-text break-words leading-relaxed ${
            mono ? "font-mono" : "font-medium"
          }`}
        >
          {value || <span className="text-brand-muted italic">Not set</span>}
        </p>
      </div>
    </div>
  );
}

interface BotInfoCardProps {
  bot: BotInfo;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function BotInfoCard({ bot }: BotInfoCardProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="glass-card p-6 sm:p-8"
    >
      {/* Profile header */}
      <motion.div variants={itemVariants} className="flex items-center gap-5 mb-6">
        <BotAvatar photoUrl={bot.photoUrl} name={bot.firstName} size={80} />
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-text truncate">
            {bot.firstName}
          </h2>
          {bot.username && (
            <p className="text-primary-600 font-medium text-sm mt-0.5">
              @{bot.username}
            </p>
          )}
          <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Active Bot
          </span>
        </div>
      </motion.div>

      {/* Info rows */}
      <motion.div variants={itemVariants} className="rounded-2xl border border-brand-border overflow-hidden">
        <InfoRow
          icon={<User size={15} strokeWidth={2} />}
          label="Bot Name"
          value={bot.firstName}
        />
        <InfoRow
          icon={<AtSign size={15} strokeWidth={2} />}
          label="Username"
          value={bot.username ? `@${bot.username}` : ""}
        />
        <InfoRow
          icon={<Hash size={15} strokeWidth={2} />}
          label="Bot ID"
          value={String(bot.id)}
          mono
        />
        <InfoRow
          icon={<FileText size={15} strokeWidth={2} />}
          label="Description"
          value={bot.description}
        />
        <InfoRow
          icon={<AlignLeft size={15} strokeWidth={2} />}
          label="Short Description"
          value={bot.shortDescription}
        />
      </motion.div>
    </motion.div>
  );
}
