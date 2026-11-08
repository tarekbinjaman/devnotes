import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Feature not found</h1>
      <p className="mt-2 text-zinc-500">That page doesn&apos;t exist (yet). Maybe it&apos;s time to write it?</p>
      <Link href="/" className="mt-6 inline-block text-indigo-600 hover:underline">← Back to all features</Link>
    </main>
  );
}
