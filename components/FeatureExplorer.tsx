"use client";

import Fuse from "fuse.js";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import type { Category, FeatureMeta } from "@/lib/content";
import { FeatureCard } from "./FeatureCard";

export function FeatureExplorer({ features, categories }: { features: FeatureMeta[]; categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);

  // Press "/" to focus search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(features, {
        keys: [
          { name: "title", weight: 3 },
          { name: "tags", weight: 2 },
          { name: "technologies", weight: 2 },
          { name: "summary", weight: 1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [features],
  );

  const allTags = useMemo(() => [...new Set(features.flatMap((f) => f.tags))].sort(), [features]);

  const results = useMemo(() => {
    let list = deferredQuery.trim() ? fuse.search(deferredQuery).map((r) => r.item) : features;
    if (category) list = list.filter((f) => f.category === category);
    if (tag) list = list.filter((f) => f.tags.includes(tag));
    return list;
  }, [deferredQuery, fuse, features, category, tag]);

  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <div>
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search features, tags, technologies…  (press /)"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip active={!category} onClick={() => setCategory(null)}>All</Chip>
        {categories.map((c) => (
          <Chip key={c.slug} active={category === c.slug} onClick={() => setCategory(category === c.slug ? null : c.slug)}>
            {c.icon} {c.name}
          </Chip>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(tag === t ? null : t)}
            className={`rounded-full px-2.5 py-0.5 text-xs transition ${
              tag === t
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            #{t}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        {results.length} feature{results.length === 1 ? "" : "s"}
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((f) => (
          <FeatureCard key={`${f.category}/${f.slug}`} feature={f} categoryName={catName(f.category)} />
        ))}
      </div>
      {results.length === 0 && (
        <p className="mt-10 text-center text-zinc-500">No features match. Try another word or clear the filters.</p>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm transition ${
        active
          ? "border-indigo-600 bg-indigo-600 text-white"
          : "border-zinc-300 bg-white text-zinc-700 hover:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
      }`}
    >
      {children}
    </button>
  );
}
