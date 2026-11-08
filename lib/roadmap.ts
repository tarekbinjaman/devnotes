/**
 * Learning path shown on /roadmap. Items are "category/slug" of existing features;
 * plain strings starting with "soon:" are planned topics that don't have a page yet.
 */
export type Stage = {
  title: string;
  level: "Beginner" | "Interview-ready" | "Production-ready";
  goal: string;
  items: string[];
};

export const ROADMAP: Stage[] = [
  {
    title: "1. JavaScript foundations",
    level: "Beginner",
    goal: "The JS that React is built on. Interviews usually start here.",
    items: [
      "js-fundamentals/closures",
      "js-fundamentals/event-loop",
      "js-fundamentals/promises-async",
      "js-fundamentals/this-keyword",
      "js-fundamentals/copying-immutability",
    ],
  },
  {
    title: "2. React basics",
    level: "Beginner",
    goal: "Build components, pass data, handle input.",
    items: [
      "fundamentals/components",
      "fundamentals/jsx-conditional-lists",
      "fundamentals/props",
      "fundamentals/state",
      "fundamentals/events",
      "fundamentals/forms",
    ],
  },
  {
    title: "3. Rendering & core hooks",
    level: "Interview-ready",
    goal: "Know exactly when and why components render, and how effects run.",
    items: [
      "fundamentals/rendering",
      "fundamentals/virtual-dom",
      "fundamentals/use-effect",
      "fundamentals/use-layout-effect",
      "fundamentals/use-ref",
      "fundamentals/use-id",
      "fundamentals/custom-hooks",
    ],
  },
  {
    title: "4. State at scale",
    level: "Interview-ready",
    goal: "Manage complex and shared state cleanly.",
    items: ["fundamentals/use-reducer", "fundamentals/context-api"],
  },
  {
    title: "5. Performance",
    level: "Interview-ready",
    goal: "Measure first, then memoize, defer and split.",
    items: [
      "fundamentals/use-memo",
      "fundamentals/use-callback",
      "fundamentals/react-memo",
      "fundamentals/use-transition",
      "react/list-filtering",
      "react/debounced-search",
      "react/lazy-loading",
      "css/virtualized-list",
      "javascript/debounce-throttle",
    ],
  },
  {
    title: "6. Resilient UI",
    level: "Interview-ready",
    goal: "Handle errors, loading states and overlays like a senior dev.",
    items: ["fundamentals/error-boundaries", "fundamentals/suspense", "fundamentals/portals"],
  },
  {
    title: "7. Beyond React: full-stack & UI",
    level: "Production-ready",
    goal: "What real apps need around React.",
    items: [
      "backend/server-filtering-pagination",
      "backend/sql-indexes",
      "backend/api-caching",
      "javascript/memoize-cache",
      "javascript/web-worker",
      "css/responsive-grid",
      "css/performant-animations",
    ],
  },
  {
    title: "8. Production toolkit (coming in Phase 2)",
    level: "Production-ready",
    goal: "The libraries and practices used in professional React codebases.",
    items: [
      "soon:Data fetching with TanStack Query",
      "soon:Forms with React Hook Form + Zod",
      "soon:State management with Zustand / Redux Toolkit",
      "soon:Next.js Server Components & Server Actions",
      "soon:Testing with Vitest, Testing Library & Playwright",
      "soon:Accessibility (keyboard, ARIA, focus)",
      "soon:Security (XSS, secrets, auth)",
    ],
  },
];
