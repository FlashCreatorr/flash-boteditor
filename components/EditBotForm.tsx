"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Save, RotateCcw } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import type { BotInfo } from "@/types/telegram";

interface EditBotFormProps {
  bot: BotInfo;
  token: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

const MAX_NAME = 64;
const MAX_DESC = 512;
const MAX_SHORT = 120;

interface CharCountProps {
  current: number;
  max: number;
}
function CharCount({ current, max }: CharCountProps) {
  const pct = current / max;
  const color =
    pct >= 1
      ? "text-red-500"
      : pct >= 0.85
      ? "text-amber-500"
      : "text-brand-muted";
  return (
    <p className={`char-count ${color}`}>
      {current}/{max}
    </p>
  );
}

export default function EditBotForm({ bot, token, onSuccess, onError }: EditBotFormProps) {
  const [name, setName] = useState(bot.firstName);
  const [description, setDescription] = useState(bot.description);
  const [shortDescription, setShortDescription] = useState(bot.shortDescription);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const changed =
      name !== bot.firstName ||
      description !== bot.description ||
      shortDescription !== bot.shortDescription;
    setIsDirty(changed);
  }, [name, description, shortDescription, bot]);

  const handleReset = () => {
    setName(bot.firstName);
    setDescription(bot.description);
    setShortDescription(bot.shortDescription);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      onError("Bot name cannot be empty.");
      return;
    }
    if (name.trim().length > MAX_NAME) {
      onError(`Bot name must be ${MAX_NAME} characters or less.`);
      return;
    }
    if (description.length > MAX_DESC) {
      onError(`Description must be ${MAX_DESC} characters or less.`);
      return;
    }
    if (shortDescription.length > MAX_SHORT) {
      onError(`Short description must be ${MAX_SHORT} characters or less.`);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/update-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          name: name.trim(),
          description: description.trim(),
          shortDescription: shortDescription.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        onError(data.error ?? "Failed to update bot. Please try again.");
      } else {
        onSuccess();
      }
    } catch {
      onError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
      className="glass-card p-6 sm:p-8"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-secondary-600/10 flex items-center justify-center">
          <Pencil size={17} className="text-secondary-600" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-base font-bold text-brand-text">Edit Bot Info</h3>
          <p className="text-xs text-brand-muted mt-0.5">Changes apply instantly via Telegram API</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="edit-name" className="label-base">
            Bot Name
            <span className="text-red-500 ml-0.5" aria-hidden>*</span>
          </label>
          <motion.input
            id="edit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME}
            className="input-base"
            placeholder="Enter bot name"
            disabled={isLoading}
            aria-required="true"
            aria-describedby="name-count"
            whileFocus={{ scale: 1.005 }}
            transition={{ duration: 0.15 }}
          />
          <div id="name-count">
            <CharCount current={name.length} max={MAX_NAME} />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="edit-description" className="label-base">
            Bot Description
          </label>
          <motion.textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={MAX_DESC}
            rows={4}
            className="input-base"
            placeholder="Enter bot description (optional)"
            disabled={isLoading}
            aria-describedby="desc-count"
            whileFocus={{ scale: 1.005 }}
            transition={{ duration: 0.15 }}
          />
          <div id="desc-count">
            <CharCount current={description.length} max={MAX_DESC} />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label htmlFor="edit-short-description" className="label-base">
            Short Description
          </label>
          <motion.textarea
            id="edit-short-description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            maxLength={MAX_SHORT}
            rows={3}
            className="input-base"
            placeholder="Enter short description (optional)"
            disabled={isLoading}
            aria-describedby="short-count"
            whileFocus={{ scale: 1.005 }}
            transition={{ duration: 0.15 }}
          />
          <div id="short-count">
            <CharCount current={shortDescription.length} max={MAX_SHORT} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <motion.button
            type="submit"
            disabled={isLoading || !isDirty}
            className="btn-shine btn-primary flex-1"
            whileHover={{ scale: isLoading || !isDirty ? 1 : 1.02 }}
            whileTap={{ scale: isLoading || !isDirty ? 1 : 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            aria-label="Update bot information"
          >
            {isLoading ? (
              <>
                <Spinner size={18} color="#ffffff" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save size={17} strokeWidth={2} />
                <span>Update Bot</span>
              </>
            )}
          </motion.button>

          {isDirty && (
            <motion.button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="btn-secondary sm:w-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              aria-label="Reset changes"
            >
              <RotateCcw size={16} strokeWidth={2} />
              <span>Reset</span>
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}
