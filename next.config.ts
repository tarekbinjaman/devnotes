import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a test build go to a separate folder (NEXT_DIST_DIR=.next-verify) so it
  // doesn't clash with a running `npm run dev`, which uses .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
