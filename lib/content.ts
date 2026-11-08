import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const FEATURES_DIR = path.join(process.cwd(), "content", "features");

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

/** Add a new category here + a folder in content/features/<slug>. */
export const CATEGORIES: Category[] = [
  { slug: "fundamentals", name: "React Fundamentals", description: "Core React concepts in learning order: components, state, rendering and hooks.", icon: "📘" },
  { slug: "react", name: "React / Next.js", description: "Real-world React & Next.js patterns: filtering, search, lazy loading.", icon: "⚛️" },
  { slug: "javascript", name: "JavaScript / TypeScript", description: "Language-level utilities and performance techniques.", icon: "🟨" },
  { slug: "css", name: "CSS / Tailwind / UI", description: "Layouts, animations and rendering-heavy UI.", icon: "🎨" },
  { slug: "backend", name: "Backend / Database / APIs", description: "Server-side filtering, queries, indexes and caching.", icon: "🗄️" },
];

export type FeatureMeta = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  technologies: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  updated?: string;
  /** Optional position within the category (lower first). Features without it sort A–Z after the ordered ones. */
  order?: number;
};

export type Feature = FeatureMeta & { content: string; headings: Heading[] };
export type Heading = { id: string; text: string };

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function readMeta(category: string, file: string): { meta: FeatureMeta; content: string } {
  const raw = fs.readFileSync(path.join(FEATURES_DIR, category, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");
  return {
    meta: {
      slug,
      category,
      title: data.title ?? slug,
      summary: data.summary ?? "",
      tags: data.tags ?? [],
      technologies: data.technologies ?? [],
      difficulty: data.difficulty ?? "intermediate",
      updated: data.updated ? String(data.updated) : undefined,
      order: typeof data.order === "number" ? data.order : undefined,
    },
    content,
  };
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getFeaturesByCategory(category: string): FeatureMeta[] {
  const dir = path.join(FEATURES_DIR, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => readMeta(category, f).meta)
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || a.title.localeCompare(b.title));
}

export function getAllFeatures(): FeatureMeta[] {
  return CATEGORIES.flatMap((c) => getFeaturesByCategory(c.slug));
}

export function getFeature(category: string, slug: string): Feature | null {
  for (const ext of [".mdx", ".md"]) {
    const file = path.join(FEATURES_DIR, category, slug + ext);
    if (fs.existsSync(file)) {
      const { meta, content } = readMeta(category, slug + ext);
      // Only top-level "## " headings outside code fences, for the table of contents.
      const headings: Heading[] = [];
      let inFence = false;
      for (const line of content.split(/\r?\n/)) {
        if (/^\s*```/.test(line)) inFence = !inFence;
        const m = !inFence && /^##\s+(.+)$/.exec(line);
        if (m) headings.push({ id: slugify(m[1]), text: m[1].trim() });
      }
      return { ...meta, content, headings };
    }
  }
  return null;
}
