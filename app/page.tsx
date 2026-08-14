"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TokenForm from "@/components/TokenForm";
import BotInfoCard from "@/components/BotInfoCard";
import EditBotForm from "@/components/EditBotForm";
import Dialog from "@/components/ui/Dialog";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import type { BotInfo } from "@/types/telegram";

interface DialogState {
  isOpen: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}

const DEFAULT_DIALOG: DialogState = {
  isOpen: false,
  type: "success",
  title: "",
  message: "",
};

export default function HomePage() {
  const [token, setToken] = useState("");
  const [botInfo, setBotInfo] = useState<BotInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [dialog, setDialog] = useState<DialogState>(DEFAULT_DIALOG);

  const closeDialog = useCallback(() => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const showError = useCallback((message: string) => {
    setDialog({
      isOpen: true,
      type: "error",
      title: "Something Went Wrong",
      message,
    });
  }, []);

  const showSuccess = useCallback(() => {
    setDialog({
      isOpen: true,
      type: "success",
      title: "Update Successful",
      message: "Bot information updated successfully.",
    });
  }, []);

  const handleSearch = useCallback(
    async (inputToken: string) => {
      if (!inputToken) {
        showError("Please enter your Telegram Bot Token to continue.");
        return;
      }

      setIsSearching(true);
      setBotInfo(null);

      try {
        const res = await fetch("/api/fetch-bot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: inputToken }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          showError(data.error ?? "Failed to fetch bot information. Please verify your token.");
          return;
        }

        setToken(inputToken);
        setBotInfo(data.data);
      } catch {
        showError("Network error. Please check your internet connection and try again.");
      } finally {
        setIsSearching(false);
      }
    },
    [showError]
  );

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <Header />

      {/* Background decoration */}
      <div className="fixed inset-0 dot-grid opacity-50 pointer-events-none" aria-hidden="true" />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary-50 opacity-30 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <main className="relative flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
        {/* Token search */}
        <TokenForm onSearch={handleSearch} isLoading={isSearching} />

        {/* Loading skeleton */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SkeletonLoader />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bot results */}
        <AnimatePresence mode="wait">
          {botInfo && !isSearching && (
            <motion.div
              key="bot-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6"
            >
              <BotInfoCard bot={botInfo} />
              <EditBotForm
                bot={botInfo}
                token={token}
                onSuccess={showSuccess}
                onError={showError}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        <AnimatePresence>
          {!botInfo && !isSearching && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-center py-8"
            >
              <p className="text-sm text-brand-muted">
                Enter your bot token above to get started.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Dialog */}
      <Dialog
        isOpen={dialog.isOpen}
        type={dialog.type}
        title={dialog.title}
        message={dialog.message}
        onClose={closeDialog}
      />
    </div>
  );
}
