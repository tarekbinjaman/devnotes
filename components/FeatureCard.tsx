import Link from "next/link";
import type { FeatureMeta } from "@/lib/content";
import { DifficultyBadge, TechBadge } from "./Badges";

export function FeatureCard({ feature, categoryName }: { feature: FeatureMeta; categoryName?: string }) {
  return (
    <Link
      href={`/${feature.category}/${feature.slug}`}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        {categoryName && <span className="text-xs text-zinc-500">{categoryName}</span>}
        <DifficultyBadge level={feature.difficulty} />
      </div>
      <h3 className="font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
        {feature.title}
      </h3>
      <p className="mt-1 flex-1 text-sm text-zinc-600 dark:text-zinc-400">{feature.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {feature.technologies.slice(0, 4).map((t) => (
          <TechBadge key={t}>{t}</TechBadge>
        ))}
      </div>
    </Link>
  );
}
