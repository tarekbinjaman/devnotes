"use client";

import { Children, isValidElement, useState, type ReactElement, type ReactNode } from "react";

type TabProps = { label: string; children: ReactNode };

/** One tab inside <CodeTabs>. Put a code block (or any MDX) inside it. */
export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

const tone: Record<string, string> = {
  standard: "data-[active=true]:border-amber-500 data-[active=true]:text-amber-600 dark:data-[active=true]:text-amber-400",
  optimized: "data-[active=true]:border-emerald-500 data-[active=true]:text-emerald-600 dark:data-[active=true]:text-emerald-400",
};

/**
 * Usage in MDX:
 * <CodeTabs>
 *   <Tab label="Standard"> ```js ... ``` </Tab>
 *   <Tab label="Optimized"> ```js ... ``` </Tab>
 * </CodeTabs>
 */
export function CodeTabs({ children }: { children: ReactNode }) {
  const tabs = Children.toArray(children).filter(
    (c): c is ReactElement<TabProps> => isValidElement(c) && typeof (c.props as TabProps).label === "string",
  );
  const [active, setActive] = useState(0);
  if (tabs.length === 0) return <>{children}</>;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-zinc-200 bg-zinc-50 px-2 dark:border-zinc-800 dark:bg-zinc-900">
        {tabs.map((t, i) => {
          const label = t.props.label;
          return (
            <button
              key={label}
              role="tab"
              type="button"
              aria-selected={i === active}
              data-active={i === active}
              onClick={() => setActive(i)}
              className={`-mb-px whitespace-nowrap border-b-2 border-transparent px-3 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 data-[active=true]:border-indigo-500 data-[active=true]:text-indigo-600 dark:data-[active=true]:text-indigo-400 ${tone[label.toLowerCase()] ?? ""}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="code-tab-panel px-3 pb-1">{tabs[active]}</div>
    </div>
  );
}
