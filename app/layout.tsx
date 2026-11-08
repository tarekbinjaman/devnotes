import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "DevNotes", template: "%s · DevNotes" },
  description: "My developer feature notebook: standard vs optimized code, how to use it, and real use-case demos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2 font-bold">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-sm text-white">{"</>"}</span>
                DevNotes
              </Link>
              <nav className="flex items-center gap-3 text-sm">
                <Link href="/roadmap" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Roadmap
                </Link>
                <Link href="/" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  All features
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          {children}
          <footer className="mt-16 border-t border-zinc-200 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800">
            DevNotes · add a feature by dropping an .mdx file in <code>content/features/</code>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
