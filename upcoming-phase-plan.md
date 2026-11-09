# DevNotes: Upcoming Phase Plan

Goal: someone who works through DevNotes top to bottom can **pass a React interview** and **work confidently on a production codebase**.

## Where we are

| Phase | Status | What it added |
| --- | --- | --- |
| Base site | ✅ Done | Next.js + MDX site, search, filters, code tabs with copy, dark mode, 12 pattern pages |
| React Fundamentals | ✅ Done | 13 core concept pages |
| Phase 1: Interview essentials | ✅ Done | JavaScript Fundamentals (5), 9 more React pages, interview Q&A on every page, roadmap + "Mark as learned" |
| Phase 2: Production toolkit | ✅ Done | Production React category (13 pages): TanStack Query, RHF + Zod, Zustand/RTK, Server Components/Actions, rendering, auth, testing, a11y, security, project structure |

**Today: 52 topics, all with interview questions.**

---

## Phase 3: Advanced React (senior level)

New category: **Advanced React** (`content/features/advanced/`). Roadmap stage 11 already lists these as "coming soon".

| # | Page | Covers |
| --- | --- | --- |
| 1 | Component patterns | Compound components, render props, HOCs, slots, controlled vs uncontrolled components, when each is used today |
| 2 | Headless UI & component APIs | Designing reusable components (props API, `asChild`, polymorphic `as`), headless libraries (Radix, React Aria) |
| 3 | React 19 features | Actions, `useActionState`, `useOptimistic`, `use()`, ref as prop, document metadata, what changed from 18 |
| 4 | React Compiler | What it auto-memoizes, rules it needs, when manual `useMemo`/`useCallback` still matter |
| 5 | Performance in real apps | Core Web Vitals (LCP, INP, CLS), React Profiler, bundle analysis, image/font optimization, a real debugging walkthrough |
| 6 | useSyncExternalStore & external stores | Subscribing to browser APIs / stores safely, tearing, how Zustand works inside |
| 7 | Concurrent rendering in depth | Fiber, lanes/priorities, transitions + Suspense together, hydration and selective hydration |
| 8 | Real-time UI | WebSockets / SSE, optimistic updates, reconnection, syncing with TanStack Query |
| 9 | Internationalization (i18n) | next-intl / formatting with `Intl`, RTL layouts, locale routing |

**Done when:** each page has the standard sections + 7–9 interview questions, roadmap stage 11 links to real pages, checker and build pass.

---

## Phase 4: Interview practice

New category: **Interview Practice** (`content/features/interview/`). Focus on *doing*, not reading.

### 4a. Machine-coding challenges (one page each)
Each page: problem statement (as an interviewer gives it) → requirements & edge cases → step-by-step solution → final code → follow-up questions interviewers ask → common mistakes.

1. Todo app with filters (all / active / done)
2. Autocomplete / typeahead with debounce, keyboard navigation and race-condition handling
3. Accessible modal / dialog
4. Infinite scroll list
5. Star rating component
6. Tabs and accordion (keyboard accessible)
7. Data table with sort, filter, pagination
8. Multi-step form wizard with validation
9. Countdown / stopwatch timer
10. Nested comments / file explorer (recursion)

### 4b. JavaScript coding questions
Implement from scratch: `debounce`, `throttle`, `Promise.all`, `memoize`, deep clone, `flatten`, event emitter, `curry`, array polyfills (`map`, `reduce`, `filter`), `bind`.

### 4c. Frontend system design
Framework page (requirements → architecture → data model → API → performance → accessibility → trade-offs), then worked examples: news feed, chat app, e-commerce product page, autocomplete at scale, image gallery.

### 4d. Behavioral & "explain your project"
How to talk about past work, trade-offs you made, a STAR-format template, questions to ask the interviewer.

**Done when:** 10 challenges + JS questions + 5 system design examples exist; roadmap gets an "Interview practice" stage.

---

## Phase 5: Site features (make learning easier)

| Feature | Why |
| --- | --- |
| "Edit on GitHub" link on every page | Planned in the original design, never built; quick way to fix notes |
| Related features at the bottom of each page | Connect concepts → patterns → production pages (e.g. useCallback → React.memo → List Filtering) |
| Interview-only mode | A page that lists every interview question across the site, filterable by topic and level (junior/mid/senior) |
| Random question / flashcard mode | Daily practice: show one question, reveal the answer, mark "knew it" / "review again" |
| Search inside page content | Today search covers title, tags and summary only; index headings and question text too |
| Live code playground (selected pages) | Run and edit examples in the browser (e.g. Sandpack) for the interactive topics |
| Progress export / import | Progress lives in one browser; allow saving it to a file and loading it elsewhere |
| SEO & sharing | Open Graph images, sitemap, favicon |

---

## Phase 6: Quality & maintenance

- **Accuracy review pass:** check every page against react.dev, nextjs.org and library docs; fix known weak spots (e.g. React 19 now blocks `javascript:` URLs; the Security page wording is softer than needed).
- **Version check:** note the library versions each page targets; refresh when majors change (Next.js 16 Cache Components, Zod 4, etc.).
- **CI:** GitHub Action that runs `node scripts/check-mdx.mjs` and `next build` on every push.
- **Content tests:** extend the checker (broken internal links, minimum number of interview questions, frontmatter `updated` date).

---

## Suggested order

1. **Phase 4a + 4b**: biggest win for interviews.
2. **Phase 3**: senior-level depth.
3. **Phase 5**: interview-only mode and flashcards first, then the rest.
4. **Phase 4c + 4d**, then **Phase 6** as ongoing upkeep.

## How to add pages in any phase

Copy `templates/feature-template.mdx` → `content/features/<category>/<slug>.mdx`, fill it in (keep the `## Interview questions` section last), add new categories in `lib/content.ts` and roadmap entries in `lib/roadmap.ts`, then run:

```bash
node scripts/check-mdx.mjs
```
