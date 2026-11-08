// Validates feature .mdx files compile and have the required frontmatter.
// Usage: node scripts/check-mdx.mjs [files...]   (no args = all features)
import fs from "node:fs";
import path from "node:path";
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";

const root = path.join(process.cwd(), "content", "features");
const files =
  process.argv.slice(2).length > 0
    ? process.argv.slice(2)
    : fs.readdirSync(root).flatMap((c) =>
        fs.readdirSync(path.join(root, c)).filter((f) => f.endsWith(".mdx")).map((f) => path.join(root, c, f)),
      );

const required = ["title", "summary", "category", "difficulty", "tags", "technologies"];
const allowedComponents = new Set(["CodeTabs", "Tab", "Callout", "TechBadge", "QA"]);
let failed = 0;

for (const file of files) {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const problems = [];
  for (const k of required) if (data[k] === undefined) problems.push(`missing frontmatter "${k}"`);
  const folder = path.basename(path.dirname(file));
  if (data.category && data.category !== folder) problems.push(`category "${data.category}" != folder "${folder}"`);
  if (!/^## Interview questions\s*$/m.test(content)) problems.push(`no "## Interview questions" section`);
  // Unknown capitalized JSX tags outside code fences
  let inFence = false;
  for (const line of content.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    for (const m of line.replace(/`[^`]*`/g, "").matchAll(/<([A-Z][A-Za-z]*)/g)) {
      if (!allowedComponents.has(m[1])) problems.push(`unknown component <${m[1]}>`);
    }
  }
  try {
    await compile(content, { remarkPlugins: [remarkGfm] });
  } catch (e) {
    problems.push(`MDX compile error: ${e.message}`);
  }
  if (problems.length) {
    failed++;
    console.log(`✗ ${path.relative(process.cwd(), file)}\n   - ${problems.join("\n   - ")}`);
  }
}
console.log(failed ? `\n${failed} file(s) with problems` : `✓ ${files.length} file(s) OK`);
process.exit(failed ? 1 : 0);
