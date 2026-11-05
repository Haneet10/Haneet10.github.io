"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
    >
      {copied ? <Check className="h-4 w-4 text-accent" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">{copied ? "Copied to clipboard" : "Copy address"}</span>
    </button>
  );
}
