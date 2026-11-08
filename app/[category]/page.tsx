import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { CATEGORIES, getCategory, getFeaturesByCategory } from "@/lib/content";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return { title: getCategory(category)?.name };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const features = getFeaturesByCategory(category);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">
        {cat.icon} {cat.name}
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{cat.description}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.slug} feature={f} />
        ))}
      </div>
      {features.length === 0 && <p className="mt-8 text-zinc-500">No features yet in this category.</p>}
    </main>
  );
}
