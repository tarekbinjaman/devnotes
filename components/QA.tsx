import type { ReactNode } from "react";

/**
 * Interview question with a collapsible answer (try answering before you open it).
 *
 * <QA q="What is the difference between useMemo and useCallback?">
 * Answer in markdown…
 * </QA>
 */
export function QA({ q, level, children }: { q: string; level?: "junior" | "mid" | "senior"; children: ReactNode }) {
  return (
    <details className="not-prose group my-3 rounded-xl border border-zinc-200 bg-white open:shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3 font-medium marker:hidden [&::-webkit-details-marker]:hidden">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Q
        </span>
        <span className="flex-1">{q}</span>
        {level && (
          <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {level}
          </span>
        )}
        <span className="shrink-0 text-zinc-400 transition group-open:rotate-90">›</span>
      </summary>
      <div className="prose prose-zinc max-w-none border-t border-zinc-200 px-4 py-3 text-[0.95rem] dark:prose-invert dark:border-zinc-800 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </details>
  );
}
