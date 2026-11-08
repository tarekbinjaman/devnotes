import type { ReactNode } from "react";

const styles = {
  info: { box: "border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/40", icon: "💡" },
  why: { box: "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40", icon: "⚡" },
  warn: { box: "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40", icon: "⚠️" },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof styles;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[type] ?? styles.info;
  return (
    <div className={`my-5 rounded-xl border px-4 py-3 ${s.box}`}>
      {title && (
        <p className="!mt-0 !mb-1 font-semibold">
          <span className="mr-1.5">{s.icon}</span>
          {title}
        </p>
      )}
      <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{children}</div>
    </div>
  );
}
