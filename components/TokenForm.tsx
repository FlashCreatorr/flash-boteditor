"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Eye, EyeOff, Bot } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

interface TokenFormProps {
  onSearch: (token: string) => void;
  isLoading: boolean;
}

export default function TokenForm({ onSearch, isLoading }: TokenFormProps) {
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(token.trim());
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="w-full"
    >
      {/* Hero heading */}
      <div className="text-center mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary-50 text-primary-600 mb-5 shadow-glass"
        >
          <Bot size={32} strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text tracking-tight mb-3"
        >
          Flex BotEditor
          <span className="text-primary-600">!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-brand-muted text-base sm:text-lg max-w-md mx-auto leading-relaxed"
        >
          Manage Your Telegram Bot Easily
        </motion.p>
      </div>

      {/* Token input card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card p-6 sm:p-8"
      >
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="bot-token" className="label-base text-sm sm:text-base">
            Bot Token
          </label>
          <p className="text-xs text-brand-muted mb-3">
            Obtain your token from{" "}
            <a
              href="https://t.me/BotFather"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline font-medium"
            >
              @BotFather
            </a>{" "}
            on Telegram
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Input wrapper */}
            <motion.div
              className="relative flex-1"
              animate={{
                boxShadow: focused
                  ? "0 0 0 3px rgba(37,99,235,0.12)"
                  : "none",
              }}
              style={{ borderRadius: 16 }}
              transition={{ duration: 0.15 }}
            >
              <input
                ref={inputRef}
                id="bot-token"
                type={showToken ? "text" : "password"}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter Telegram Bot Token"
                className="input-base pr-12 text-sm sm:text-base font-mono"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                aria-label="Telegram Bot Token"
                aria-describedby="token-hint"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-brand-muted hover:text-brand-text transition-colors"
                aria-label={showToken ? "Hide token" : "Show token"}
                tabIndex={0}
              >
                {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </motion.div>

            {/* Search button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="btn-shine btn-primary whitespace-nowrap px-6 sm:px-7 py-3 text-sm sm:text-base"
              whileHover={{ scale: isLoading ? 1 : 1.03 }}
              whileTap={{ scale: isLoading ? 1 : 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              aria-label="Fetch bot information"
            >
              {isLoading ? (
                <>
                  <Spinner size={18} color="#ffffff" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <Search size={17} strokeWidth={2} />
                  <span>Search Bot</span>
                </>
              )}
            </motion.button>
          </div>

          <p id="token-hint" className="text-xs text-brand-muted mt-2.5">
            Your token is never stored or saved anywhere.
          </p>
        </form>
      </motion.div>
    </motion.section>
  );
}
