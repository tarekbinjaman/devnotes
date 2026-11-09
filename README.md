# DevNotes

My personal developer feature notebook. For each feature it has:

- **Standard** code (the simple way, and its problem)
- **Optimized** code, plus *which technology makes it better and why*
- **How to use** it, step by step
- **Use-case demos**, copy-ready
- **Pitfalls** and when not to use it

Built with Next.js (App Router) + MDX + Tailwind CSS. Fully static, so it's free to host on Vercel.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
node scripts/check-mdx.mjs   # check all feature pages compile and have interview questions
```

## Add a new feature

1. Copy `templates/feature-template.mdx`
2. Paste it into `content/features/<category>/<your-feature-slug>.mdx`
   (categories: `fundamentals`, `react`, `javascript`, `css`, `backend`)
3. Fill in the frontmatter (title, summary, tags, technologies, difficulty, optional `order`) and the sections
4. Save. It appears automatically on the home page, in search, in the sidebar and on its category page.

### Components you can use inside `.mdx`

```mdx
<CodeTabs>
<Tab label="Standard">

```ts
// code
```

</Tab>
<Tab label="Optimized">

```ts
// code
```

</Tab>
</CodeTabs>

<Callout type="why" title="Why it's faster">…</Callout>   <!-- type: info | why | warn -->
<TechBadge>useMemo</TechBadge>
```

Leave a blank line before and after each code block inside `<Tab>`, or MDX won't parse it.

Every code block automatically gets syntax highlighting and a **Copy** button.

### Add a new category

1. Add an entry to `CATEGORIES` in `lib/content.ts`
2. Create the folder `content/features/<slug>/`

## Deploy to Vercel

1. Push this folder to a GitHub repo:
   ```bash
   git add .
   git commit -m "Initial DevNotes"
   git branch -M main
   git remote add origin https://github.com/<you>/devnotes.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new and import the repo. Vercel detects Next.js; click **Deploy**.
3. From then on, every `git push` redeploys automatically. Adding a feature means writing a `.mdx` file and pushing.

## Project structure

```
app/                     pages (home, /[category], /[category]/[slug])
components/              CodeTabs, CodeBlock (copy button), Callout, Sidebar, search
content/features/        ← your notes live here, one .mdx file per feature
lib/content.ts           reads the .mdx files + category list
templates/               feature template to copy
```
