"use client";

import { useLearned } from "./useLearned";

export function LearnedButton({ id }: { id: string }) {
  const { isLearned, toggle } = useLearned();
  const done = isLearned(id);
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={done}
      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
        done
          ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
          : "border-zinc-300 text-zinc-700 hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-300"
      }`}
    >
      {done ? "✓ Learned" : "Mark as learned"}
    </button>
  );
}
