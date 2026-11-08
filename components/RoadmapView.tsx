"use client";

import Link from "next/link";
import { useLearned } from "./useLearned";

export type RoadmapItem =
  | { kind: "feature"; id: string; href: string; title: string; summary: string }
  | { kind: "soon"; id: string; title: string };

export type RoadmapStageView = { title: string; level: string; goal: string; items: RoadmapItem[] };

const levelStyle: Record<string, string> = {
  Beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  "Interview-ready": "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
  "Production-ready": "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
};

export function RoadmapView({ stages }: { stages: RoadmapStageView[] }) {
  const { isLearned, toggle } = useLearned();
  const all = stages.flatMap((s) => s.items.filter((i) => i.kind === "feature"));
  const done = all.filter((i) => isLearned(i.id)).length;
  const pct = all.length ? Math.round((done / all.length) * 100) : 0;

  return (
    <div>
      <div className="sticky top-14 z-20 -mx-4 mb-8 border-b border-zinc-200 bg-zinc-50/90 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Your progress</span>
          <span className="tabular-nums text-zinc-600 dark:text-zinc-400">
            {done} / {all.length} topics · {pct}%
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ol className="space-y-10">
        {stages.map((stage) => {
          const features = stage.items.filter((i) => i.kind === "feature");
          const stageDone = features.filter((i) => isLearned(i.id)).length;
          return (
            <li key={stage.title}>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold">{stage.title}</h2>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${levelStyle[stage.level] ?? ""}`}>
                  {stage.level}
                </span>
                {features.length > 0 && (
                  <span className="text-xs tabular-nums text-zinc-500">
                    {stageDone}/{features.length}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{stage.goal}</p>

              <ul className="mt-4 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
                {stage.items.map((item) =>
                  item.kind === "soon" ? (
                    <li key={item.id} className="flex items-center gap-3 px-4 py-3 text-zinc-400">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded border border-dashed border-zinc-300 dark:border-zinc-700" />
                      <span className="flex-1">{item.title}</span>
                      <span className="text-xs">coming soon</span>
                    </li>
                  ) : (
                    <li key={item.id} className="flex items-start gap-3 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isLearned(item.id)}
                        onChange={() => toggle(item.id)}
                        aria-label={`Mark ${item.title} as learned`}
                        className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
                      />
                      <div className="min-w-0 flex-1">
                        <Link
                          href={item.href}
                          className={`font-medium hover:text-indigo-600 dark:hover:text-indigo-400 ${
                            isLearned(item.id) ? "text-zinc-400 line-through" : ""
                          }`}
                        >
                          {item.title}
                        </Link>
                        <p className="text-sm text-zinc-500">{item.summary}</p>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
