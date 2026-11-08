import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DifficultyBadge, TechBadge } from "@/components/Badges";
import { LearnedButton } from "@/components/LearnedButton";
import { MDXContent } from "@/components/mdx";
import { Sidebar } from "@/components/Sidebar";
import { getAllFeatures, getCategory, getFeature } from "@/lib/content";

type Props = { params: Promise<{ category: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllFeatures().map((f) => ({ category: f.category, slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const f = getFeature(category, slug);
  return f ? { title: f.title, description: f.summary } : {};
}

export default async function FeaturePage({ params }: Props) {
  const { category, slug } = await params;
  const feature = getFeature(category, slug);
  const cat = getCategory(category);
  if (!feature || !cat) notFound();

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_200px]">
      <aside className="hidden lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8">
          <Sidebar activeCategory={category} activeSlug={slug} />
        </div>
      </aside>

      <main className="min-w-0">
        <nav className="mb-4 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">Features</Link>
          <span className="mx-1.5">/</span>
          <Link href={`/${cat.slug}`} className="hover:text-zinc-900 dark:hover:text-zinc-100">{cat.name}</Link>
        </nav>

        <header className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{feature.title}</h1>
            <DifficultyBadge level={feature.difficulty} />
            <div className="ml-auto">
              <LearnedButton id={`${category}/${slug}`} />
            </div>
          </div>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">{feature.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-medium uppercase tracking-wide text-zinc-500">Tech</span>
            {feature.technologies.map((t) => (
              <TechBadge key={t}>{t}</TechBadge>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {feature.tags.map((t) => (
              <span key={t} className="text-xs text-zinc-500">#{t}</span>
            ))}
          </div>
        </header>

        <article className="prose prose-zinc max-w-none dark:prose-invert prose-headings:tracking-tight prose-pre:my-0 prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
          <MDXContent source={feature.content} />
        </article>
      </main>

      {feature.headings.length > 0 && (
        <aside className="hidden xl:block">
          <div className="sticky top-20 text-sm">
            <p className="mb-2 font-semibold">On this page</p>
            <ul className="space-y-1.5">
              {feature.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}
