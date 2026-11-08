import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { CodeTabs, Tab } from "./CodeTabs";
import { TechBadge } from "./Badges";

/** Components you can use inside any .mdx feature file. */
const components = {
  pre: CodeBlock,
  CodeTabs,
  Tab,
  Callout,
  TechBadge,
};

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, { theme: { light: "github-light", dark: "github-dark-dimmed" }, keepBackground: false }],
          ],
        },
      }}
    />
  );
}
