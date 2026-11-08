import Link from "next/link";
import { FeatureExplorer } from "@/components/FeatureExplorer";
import { CATEGORIES, getAllFeatures } from "@/lib/content";

export default function Home() {
  const features = getAllFeatures();
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My developer feature notebook</h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Every feature: the <span className="font-medium text-amber-600 dark:text-amber-400">standard</span> way, the{" "}
          <span className="font-medium text-emerald-600 dark:text-emerald-400">optimized</span> way and the technique behind it,
          how to use it, and copy-ready use-case code.
        </p>
        <Link
          href="/roadmap"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Follow the React roadmap →
        </Link>
      </section>
      <FeatureExplorer features={features} categories={CATEGORIES} />
    </main>
  );
}
