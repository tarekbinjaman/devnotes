import type { Metadata } from "next";
import { RoadmapView, type RoadmapItem, type RoadmapStageView } from "@/components/RoadmapView";
import { getAllFeatures } from "@/lib/content";
import { ROADMAP } from "@/lib/roadmap";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Learning path from JavaScript basics to interview-ready and production-ready React.",
};

export default function RoadmapPage() {
  const byId = new Map(getAllFeatures().map((f) => [`${f.category}/${f.slug}`, f]));

  const stages: RoadmapStageView[] = ROADMAP.map((s) => ({
    ...s,
    items: s.items.flatMap((id): RoadmapItem[] => {
      if (id.startsWith("soon:")) return [{ kind: "soon", id, title: id.slice(5) }];
      const f = byId.get(id);
      // Skip entries whose page doesn't exist (yet), so the roadmap never links to a 404
      return f ? [{ kind: "feature", id, href: `/${id}`, title: f.title, summary: f.summary }] : [];
    }),
  }));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">React roadmap</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Work top to bottom. Tick a topic when you can explain it <em>and</em> answer its interview questions without
        opening the answers. Progress is saved in this browser only.
      </p>
      <div className="mt-6">
        <RoadmapView stages={stages} />
      </div>
    </main>
  );
}
