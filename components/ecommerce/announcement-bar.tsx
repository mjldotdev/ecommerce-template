"use client";

import { X } from "lucide-react";
import { useState } from "react";

const messages = [
  "Free shipping on orders over $400",
  "New arrivals — SS 2025 collection now live",
  "Returns accepted within 14 days",
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [msgIndex] = useState(() =>
    Math.floor(Math.random() * messages.length)
  );

  if (!visible) {
    return null;
  }

  return (
    <div className="relative z-[55] flex items-center justify-center bg-[var(--ink)] px-6 py-2.5 text-[var(--canvas)]">
      <p className="text-center text-[0.6rem] text-eyebrow">
        <span className="mr-2 text-[var(--accent)]">◆</span>
        {messages[msgIndex]}
      </p>
      <button
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-4 -translate-y-1/2 text-[var(--canvas)]/50 transition-colors duration-200 hover:text-[var(--canvas)]"
        onClick={() => setVisible(false)}
        type="button"
      >
        <X size={12} />
      </button>
    </div>
  );
}
