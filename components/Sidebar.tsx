import Link from "next/link";
import { CATEGORIES, getFeaturesByCategory } from "@/lib/content";

export function Sidebar({ activeCategory, activeSlug }: { activeCategory?: string; activeSlug?: string }) {
  return (
    <nav className="space-y-6 text-sm">
      {CATEGORIES.map((c) => {
        const features = getFeaturesByCategory(c.slug);
        return (
          <div key={c.slug}>
            <Link
              href={`/${c.slug}`}
              className={`mb-2 block font-semibold ${
                activeCategory === c.slug && !activeSlug ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-900 dark:text-zinc-100"
              }`}
            >
              {c.icon} {c.name}
            </Link>
            <ul className="space-y-1 border-l border-zinc-200 dark:border-zinc-800">
              {features.map((f) => {
                const active = activeCategory === c.slug && activeSlug === f.slug;
                return (
                  <li key={f.slug}>
                    <Link
                      href={`/${c.slug}/${f.slug}`}
                      className={`-ml-px block border-l-2 py-0.5 pl-3 ${
                        active
                          ? "border-indigo-500 font-medium text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      }`}
                    >
                      {f.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
