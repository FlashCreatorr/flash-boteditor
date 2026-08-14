"use client";

import { useState } from "react";
import Image from "next/image";
import { Bot } from "lucide-react";

interface BotAvatarProps {
  photoUrl: string | null;
  name: string;
  size?: number;
  className?: string;
}

export default function BotAvatar({ photoUrl, name, size = 80, className = "" }: BotAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const showFallback = !photoUrl || imgError;

  return (
    <div
      className={`relative flex-shrink-0 rounded-2xl overflow-hidden bg-primary-50 border-2 border-brand-border ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${name} avatar`}
    >
      {showFallback ? (
        <div className="w-full h-full flex items-center justify-center">
          <Bot
            size={Math.round(size * 0.45)}
            className="text-primary-600"
            strokeWidth={1.5}
          />
        </div>
      ) : (
        <Image
          src={photoUrl}
          alt={`${name} profile photo`}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
          unoptimized
          sizes={`${size}px`}
        />
      )}
    </div>
  );
}
