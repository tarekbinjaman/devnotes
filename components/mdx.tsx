import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { CodeTabs, Tab } from "./CodeTabs";
import { TechBadge } from "./Badges";
import { QA } from "./QA";

/** Components you can use inside any .mdx feature file. */
const components = {
  pre: CodeBlock,
  CodeTabs,
  Tab,
  Callout,
  TechBadge,
  QA,
};

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm], // tables, strikethrough, task lists
          rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, { theme: { light: "github-light", dark: "github-dark-dimmed" }, keepBackground: false }],
          ],
        },
      }}
    />
  );
}
