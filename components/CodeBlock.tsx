"use client";

import { useRef, useState, type ComponentProps } from "react";

/** Replaces <pre> in MDX: adds a copy button and shows the language label. */
export function CodeBlock(props: ComponentProps<"pre"> & { "data-language"?: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const lang = props["data-language"];

  function fallbackCopy(text: string) {
    // For browsers/iframes where the Clipboard API is blocked
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }

  function copy() {
    const text = ref.current?.innerText ?? "";
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative my-4">
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        {lang && (
          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] uppercase text-zinc-400">
            {lang}
          </span>
        )}
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-white/15 bg-zinc-800/80 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-700"
          aria-label="Copy code"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre ref={ref} {...props} />
    </div>
  );
}
