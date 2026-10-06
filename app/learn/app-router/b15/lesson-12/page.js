import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.12: Deployment Incidents - Next.js Mastery",
  description:
    "CI build failures, Docker standalone, ISR on self-host, Edge env gaps, Server Action skew, and secret rotation",
};

function LevelBadge({ level }) {
  const styles = {
    Junior:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Mid: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Senior: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[level]}`}
    >
      {level}
    </span>
  );
}

export default function Lesson12Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b15"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B15 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B15.12: Deployment Incidents (B12)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Builds, containers, CDN + ISR, serverless limits, preview SEO leaks, and
          deploy-time secret mistakes seen when shipping Next.js App Router apps.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            next build passes locally, fails in CI
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Pipeline fails at collect page data with DATABASE_URL is undefined.
              Developers cannot merge; production deploy is blocked though npm run
              build works on laptops.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Local .env.local provides vars CI lacks. Some modules read env at import
              time during build (generateStaticParams, top-level Prisma). NODE_ENV
              differences can also change code paths.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Add required env vars to CI secrets; document them in README for devs.</li>
              <li>Defer DB access to runtime, not module top-level during build.</li>
              <li>Run next build in CI with the same NODE_ENV=production as deploy.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// Bad — throws in CI when DATABASE_URL missing at build
// const db = new PrismaClient(); at module scope in a shared file used by generateStaticParams

// Better — lazy client
let prisma;
export function getPrisma() {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Committed .env points production at dev API
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Production orders hit staging payment API. Finance finds test charges
              on real cards. .env was committed with NEXT_PUBLIC_API_URL pointing
              at dev.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              NEXT_PUBLIC_ values are baked at build time from whichever .env file
              was present. Committed defaults override platform env if build uses
              the repo file.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Gitignore .env.local; commit .env.example with placeholders only.</li>
              <li>Set production URLs in Vercel/hosting env UI; rebuild after changes.</li>
              <li>Rotate keys exposed in git history; scan repo with secret scanning.</li>
            </ul>
          </div>
          <CodeBlock
            code={`# .env.example (committed)
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://user:pass@localhost:5432/app

# .gitignore
.env
.env.local
.env*.local`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            output export fails with Server Actions or cookies
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Team sets output: export for S3 hosting. Build errors on Server
              Actions, revalidatePath, or dynamic server usage from cookies().
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Static export emits HTML/JSON files only—no Node server, no actions,
              no ISR revalidation, no per-request cookies. Those features need a
              server deploy.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Remove output export; deploy with next start, Docker, or serverless.</li>
              <li>Or split marketing static site from dynamic app subdomain.</li>
              <li>Audit routes for dynamic features before choosing export.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// next.config.js — server deploy (default)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // remove for App Router + Server Actions
};

module.exports = nextConfig;`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Docker standalone missing static assets
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Container starts but CSS and JS 404. Logs show server.js running yet
              chunks under /_next/static are missing in the image.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              output standalone traces server files but does not automatically copy
              public/ and .next/static into the runner stage. Incomplete COPY steps
              produce a broken production image.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Enable output standalone in next.config.js.</li>
              <li>Copy .next/standalone, .next/static, and public into final image.</li>
              <li>Run node server.js from standalone directory with NODE_ENV=production.</li>
            </ul>
          </div>
          <CodeBlock
            code={`# Dockerfile excerpt
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            ISR never updates behind CDN caching HTML forever
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              App works on Vercel but self-hosted Node behind CloudFront shows week-old
              prices. revalidateTag runs yet users never see updates.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              CDN caches HTML with long max-age ignoring s-maxage from Next.js. Origin
              regenerates but edge serves stale full pages indefinitely.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Configure CDN to respect Cache-Control from origin or shorten HTML TTL.</li>
              <li>Purge CDN on deploy or on revalidate webhooks.</li>
              <li>Bypass cache for HTML paths while keeping static assets immutable.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// Optional route segment — explicit cache hint for proxies
export const revalidate = 60;

// CDN rule (conceptual): /_next/static/* cache 1y immutable
// HTML documents: honor s-maxage from origin or max-age 0 with revalidation`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Serverless function times out on slow product query
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Product detail route returns 504 after 10s in production. Logs show full
              table scan joining reviews and inventory on every request.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Serverless defaults (often 10s) cap execution. Unindexed queries plus
              serial awaits exceed the limit under real data volume.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Add indexes; split heavy reads; stream with Suspense.</li>
              <li>Raise maxDuration on the route segment where platform allows.</li>
              <li>Cache stable fragments with ISR instead of recomputing everything dynamically.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/product/[slug]/page.js
export const maxDuration = 30; // Vercel / compatible hosts
export const runtime = 'nodejs';

export default async function ProductPage({ params }) {
  const product = await db.product.findFirst({
    where: { slug: params.slug },
    include: { reviews: { take: 20, orderBy: { createdAt: 'desc' } } },
  });
  return <ProductView product={product} />;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Edge route works in preview, crashes in production region
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              export const runtime = edge on geo API route succeeds in EU preview but
              US production throws—env var missing or Node crypto API used.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Edge deployments have per-region env configuration. Node-only modules
              (fs, some bcrypt builds) fail at runtime on Edge even if build passed
              in one region.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Sync Edge env vars to all regions in hosting dashboard.</li>
              <li>Switch route to runtime nodejs if it needs Node APIs.</li>
              <li>Integration-test Edge routes in CI with edge-compatible mocks.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/api/geo/route.js — needs Node crypto? use nodejs
export const runtime = 'nodejs';

export async function GET() {
  const key = process.env.GEO_API_KEY;
  if (!key) throw new Error('GEO_API_KEY missing');
  return Response.json(await lookupGeo(key));
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Preview deployments indexed by Google
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Search results show preview-abc123.vercel.app duplicate content. SEO
              team reports canonical conflicts and leaked unfinished copy.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Preview URLs are public without robots.txt disallow or X-Robots-Tag.
              Crawlers follow links from PR comments and index staging hosts.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Add middleware/proxy header X-Robots-Tag: noindex on non-production hosts.</li>
              <li>robots.txt disallow all on preview deployments via platform setting.</li>
              <li>Use canonical links pointing to production domain only.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// middleware.ts — noindex preview hosts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host') ?? '';
  if (host.includes('preview') || host.endsWith('.vercel.app')) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }
  return NextResponse.next();
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Build OOM in CI on large monorepo app
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              GitHub Actions kills next build with JavaScript heap out of memory. Local
              M1 machines with 32GB succeed; CI has 7GB default.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Large client bundles, source maps, and importing huge JSON into client
              graphs spike memory during webpack/turbopack compilation. Parallel workers
              multiply usage.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Set NODE_OPTIONS=--max-old-space-size=8192 in CI.</li>
              <li>Reduce experimental worker count if configured.</li>
              <li>Remove huge static imports from client components; load on server or paginate.</li>
            </ul>
          </div>
          <CodeBlock
            code={`# .github/workflows/deploy.yml env
env:
  NODE_OPTIONS: --max-old-space-size=8192

# package.json
"scripts": {
  "build": "next build"
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Rolling deploy — Server Action ID mismatch errors
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              During deploy users submitting forms see Failed to find Server Action.
              Error correlates with minutes when two app versions run behind the load
              balancer.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Server Action IDs are build-specific. HTML from version A posts to
              version B which does not recognize the action hash—classic version skew
              during rolling updates.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use shorter rolling windows; drain connections before killing old pods.</li>
              <li>Blue/green or canary so only one build serves traffic at a time.</li>
              <li>On failure, prompt client refresh to load new action IDs.</li>
            </ul>
          </div>
          <CodeBlock
            code={`'use client';

export function SubmitButton({ action }) {
  async function wrapped(formData) {
    try {
      await action(formData);
    } catch (err) {
      if (String(err).includes('Server Action')) {
        window.location.reload();
        return;
      }
      throw err;
    }
  }
  return <form action={wrapped}>{/* fields */}</form>;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            next start in container without build step
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Container CMD runs next start immediately. Process exits: Could not find
              a production build in the .next directory.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              next start serves an existing production build—it never compiles. CI
              skipped npm run build or .next was excluded from the image layer.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Run npm run build in the image build stage before start.</li>
              <li>Copy .next artifact into runtime layer; do not mount empty volume over it.</li>
              <li>Use npm run start only after successful build in pipeline.</li>
            </ul>
          </div>
          <CodeBlock
            code={`# Multi-stage — build then start
RUN npm run build
CMD ["npm", "run", "start"]

# Verify in CI
RUN test -d .next/BUILD_ID`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Secrets in NEXT_PUBLIC_ cannot rotate without rebuild
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              API key rotation playbook fails—old key still in client bundles until
              full redeploy. Incident response takes hours instead of minutes.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              NEXT_PUBLIC_ variables embed at build time into static JS. Changing
              hosting env alone does not update already-built chunks users cached.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Keep secrets server-only; rotate via env + process restart.</li>
              <li>Expose only publishable keys with NEXT_PUBLIC_ prefix.</li>
              <li>After leak, rebuild anyway—but design so rotation does not require it.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// Server-only — rotatable at runtime
// process.env.INTERNAL_API_KEY in route handlers / Server Actions

// Client — publishable only
// process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

// app/api/config/route.js — never return secrets
export async function GET() {
  return Response.json({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
}`}
            language="javascript"
          />
        </section>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
        <Link
          href="/learn/app-router/b15/lesson-11"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ← Previous: B15.11
        </Link>
        <Link
          href="/learn/app-router/b15/lesson-13"
          className="rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Next: B15.13 →
        </Link>
      </nav>
    </div>
  );
}
