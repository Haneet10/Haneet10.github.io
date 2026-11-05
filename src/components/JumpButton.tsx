"use client";

import { useEffect, useState } from "react";
import { Command } from "lucide-react";
import { openCommandMenu } from "./CommandMenu";

/** Opens the jump menu. Shows the keyboard shortcut on devices with a keyboard. */
export function JumpButton({ compact = false }: { compact?: boolean }) {
  const [mac, setMac] = useState(true);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);

  if (compact) {
    return (
      <button
        type="button"
        onClick={openCommandMenu}
        aria-label="Jump to a section or project"
        className="grid h-10 w-10 place-items-center text-muted transition-colors hover:text-ink"
      >
        <Command className="h-[17px] w-[17px]" aria-hidden />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={openCommandMenu}
      className="group mr-1 inline-flex h-8 items-center gap-2.5 border border-line px-2.5 text-[13px] text-muted transition-colors hover:border-line-2 hover:text-ink"
      aria-label="Jump to a section or project"
    >
      Jump to
      <kbd className="font-mono text-[10px] text-faint transition-colors group-hover:text-accent">{mac ? "⌘K" : "Ctrl K"}</kbd>
    </button>
  );
}
