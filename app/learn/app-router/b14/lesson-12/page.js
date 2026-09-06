import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.12: Deployment (B12) - Most Asked Interview Questions",
  description:
    "Most asked Next.js App Router interview questions on build process, deployment, standalone output, Docker, and production config",
};

export default function Lesson12Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b14"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B14 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B14.12: Deployment (B12)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The most frequently asked interview questions on deploying Next.js App
          Router applications — build process, Vercel, Docker, standalone output,
          static export, and production hardening.
        </p>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Questions tagged{" "}
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>{" "}
          /{" "}
          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>{" "}
          /{" "}
          <span className="rounded-full bg-orange-100 px-2 py-0.5 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>{" "}
          based on typical interview depth.
        </p>
      </div>

      <div className="space-y-6">
        {/* Q1 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            1. What happens during next build?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">next build</code>{" "}
              compiles your application for production:
            </p>
            <ol className="list-inside list-decimal space-y-2">
              <li>Compiles TypeScript/JavaScript (SWC)</li>
              <li>Analyzes routes and determines static vs dynamic rendering</li>
              <li>Pre-renders static pages and generates RSC payloads</li>
              <li>Runs generateStaticParams for dynamic routes</li>
              <li>Optimizes and bundles client JavaScript (code splitting per route)</li>
              <li>Extracts and optimizes CSS</li>
              <li>Generates optimized production output in .next/</li>
            </ol>
            <p>
              The build output shows a route table indicating static (○), dynamic
              (ƒ), or ISR (●) for each route — critical for understanding
              deployment behavior.
            </p>
          </div>
          <CodeBlock
            code={`npm run build

# Output route table example:
# Route (app)                Size     First Load JS
# ○ /                        5 kB         90 kB     (static)
# ● /blog/[slug]             8 kB         93 kB     (ISR)
# ƒ /dashboard               12 kB        97 kB     (dynamic/server)

# ○  Static   — prerendered at build
# ●  ISR      — static with revalidation
# ƒ  Dynamic  — server-rendered on demand`}
            language="bash"
          />
        </section>

        {/* Q2 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            2. next start vs Vercel serverless — what is the difference?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>next start</strong> — runs a Node.js HTTP server from the
              .next/ build output. Single long-running process handles all routes.
              Used for self-hosting, Docker, VPS. You manage scaling, load
              balancing, and process restarts.
            </p>
            <p>
              <strong>Vercel serverless</strong> — each route (or route group)
              deploys as an independent serverless function. Auto-scales per
              request, zero server management, global Edge network, automatic
              ISR/caching infrastructure. Cold starts possible on low-traffic
              routes.
            </p>
            <p>
              <strong>Interview answer:</strong> Vercel is optimized for Next.js
              with zero config. Self-hosting with{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">next start</code>{" "}
              gives full control but you handle infra, ISR cache persistence, and
              scaling yourself.
            </p>
          </div>
        </section>

        {/* Q3 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            3. What is output: &apos;standalone&apos;?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Standalone output creates a minimal self-contained deployment
              folder at{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.next/standalone</code>{" "}
              with only the files needed to run the server — no full node_modules.
              Ideal for Docker images (smaller, faster builds).
            </p>
            <p>
              You must manually copy{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">public/</code>{" "}
              and{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.next/static</code>{" "}
              into the standalone folder for assets to work correctly.
            </p>
          </div>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  output: 'standalone',
};

// Dockerfile pattern
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]`}
            language="dockerfile"
          />
        </section>

        {/* Q4 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            4. Static export (output: &apos;export&apos;) — limitations?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Static export generates pure HTML/CSS/JS files with no Node.js
              server. Suitable for fully static sites deployable to any CDN
              (S3, GitHub Pages, Netlify static).
            </p>
            <p>
              <strong>Not supported with static export:</strong>
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Server Components that need runtime data (unless build-time only)</li>
              <li>Route Handlers (API routes)</li>
              <li>Server Actions</li>
              <li>ISR / on-demand revalidation</li>
              <li>Middleware</li>
              <li>Dynamic routes without generateStaticParams</li>
              <li>Image Optimization (use unoptimized: true)</li>
              <li>Draft Mode</li>
            </ul>
            <p>
              Use static export only for marketing sites, docs, or portfolios
              with no server-side logic.
            </p>
          </div>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  output: 'export',
  images: { unoptimized: true },
};

// Build produces out/ directory — deploy to any static host
npm run build`}
            language="javascript"
          />
        </section>

        {/* Q5 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            5. Deploying to Vercel vs AWS/Docker?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b dark:border-gray-600">
                  <th className="py-2 pr-4">Aspect</th>
                  <th className="py-2 pr-4">Vercel</th>
                  <th className="py-2">AWS/Docker</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 pr-4">Setup</td>
                  <td className="py-2 pr-4">Git push, zero config</td>
                  <td className="py-2">Dockerfile, ECS/EKS/EC2, load balancer</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 pr-4">ISR</td>
                  <td className="py-2 pr-4">Built-in, global</td>
                  <td className="py-2">Manual cache layer (Redis/S3)</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 pr-4">Scaling</td>
                  <td className="py-2 pr-4">Automatic serverless</td>
                  <td className="py-2">Manual auto-scaling groups</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Cost</td>
                  <td className="py-2 pr-4">Usage-based, premium at scale</td>
                  <td className="py-2">Predictable infra cost, more ops overhead</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Q6 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            6. Environment variables in production
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Server env vars are read at <strong>runtime</strong> on self-hosted
              deployments (Docker, VPS) — you can change them without rebuilding.
              On Vercel, server vars are available at runtime;{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NEXT_PUBLIC_*</code>{" "}
              vars are inlined at <strong>build time</strong> and require redeploy
              to change.
            </p>
            <p>
              Set production secrets in your hosting platform (Vercel dashboard,
              AWS Secrets Manager, Docker secrets) — never commit{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.env.local</code>{" "}
              to git. Use different values per environment (preview, staging,
              production).
            </p>
          </div>
          <CodeBlock
            code={`# Vercel — set in dashboard per environment
# Production: DATABASE_URL=prod-db...
# Preview:    DATABASE_URL=staging-db...

# Docker — runtime injection
docker run -e DATABASE_URL=... -e JWT_SECRET=... my-nextjs-app

# .env.production — used during next build (avoid secrets here for self-hosted)
NEXT_PUBLIC_API_URL=https://api.production.com`}
            language="bash"
          />
        </section>

        {/* Q7 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            7. What are Preview Deployments?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Preview deployments (Vercel, Netlify, etc.) automatically deploy
              every pull request to a unique URL. Each preview gets its own
              environment variables (preview scope), allowing QA and stakeholder
              review before merging to production.
            </p>
            <p>
              Preview URLs are shareable, support password protection, and can
              integrate with GitHub PR comments showing deployment status.
              Environment-specific secrets (staging API keys) apply automatically.
            </p>
          </div>
        </section>

        {/* Q8 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            8. How does ISR work on different platforms?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Vercel:</strong> ISR is native — regenerated pages stored
              in global distributed cache, on-demand revalidation via API works
              out of the box.
            </p>
            <p>
              <strong>Self-hosted (next start):</strong> ISR cache stored in{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.next/cache</code>{" "}
              on the filesystem. Single-instance only — multi-instance deployments
              need shared cache (Redis, S3) via custom cache handler.
            </p>
            <p>
              <strong>Docker/Kubernetes:</strong> ephemeral filesystem loses ISR
              cache on container restart. Configure{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">cacheHandler</code>{" "}
              in next.config for persistent shared cache across replicas.
            </p>
          </div>
          <CodeBlock
            code={`// next.config.js — custom cache handler for multi-instance
module.exports = {
  cacheHandler: require.resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0, // disable in-memory cache
};

// cache-handler.js — Redis example
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

module.exports = class CacheHandler {
  async get(key) {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  }
  async set(key, data, ctx) {
    await redis.set(key, JSON.stringify(data), 'EX', ctx.revalidate);
  }
};`}
            language="javascript"
          />
        </section>

        {/* Q9 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            9. Dockerizing Next.js App Router — best practices
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <ul className="list-inside list-disc space-y-2">
              <li>Use multi-stage builds (builder + runner)</li>
              <li>Enable <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">output: 'standalone'</code></li>
              <li>Run as non-root user in production</li>
              <li>Use <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">node:20-alpine</code> for smaller images</li>
              <li>Set <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NODE_ENV=production</code></li>
              <li>Copy static assets and public folder explicitly</li>
              <li>Use .dockerignore to exclude node_modules, .git, .next from context</li>
            </ul>
          </div>
          <CodeBlock
            code={`# .dockerignore
node_modules
.next
.git
*.md
.env*

# Multi-stage Dockerfile (see Q3 for full example)
# Final image: ~150MB vs ~1GB without standalone`}
            language="dockerfile"
          />
        </section>

        {/* Q10 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            10. Build-time vs runtime configuration
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Build-time</strong> — baked into the bundle during{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">next build</code>.
              Includes{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NEXT_PUBLIC_*</code>{" "}
              env vars, static page generation, route analysis. Changing these
              requires rebuild.
            </p>
            <p>
              <strong>Runtime</strong> — read when the server handles a request.
              Server-only env vars on self-hosted/Docker, dynamic rendering
              decisions, database connections. Can change without rebuild on
              self-hosted.
            </p>
            <p>
              <strong>next.config.js</strong> is evaluated at build time — use
              environment variables carefully. For runtime config in self-hosted
              apps, read env vars inside Server Components or Route Handlers, not
              in next.config.
            </p>
          </div>
        </section>

        {/* Q11 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            11. Security headers and production checklist
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Production checklist for Next.js deployments:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Security headers (CSP, HSTS, X-Frame-Options)</li>
              <li>HTTPS enforced</li>
              <li>Secrets in env vars, not code</li>
              <li>Rate limiting on API routes</li>
              <li>Error monitoring (Sentry, etc.)</li>
              <li>Disable <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">poweredByHeader</code></li>
              <li>Validate all user input in Server Actions</li>
            </ul>
          </div>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};`}
            language="javascript"
          />
        </section>

        {/* Q12 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            12. CDN and caching headers in production
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Next.js sets appropriate Cache-Control headers automatically:
              static assets get long cache with content hash filenames; ISR pages
              get s-maxage with stale-while-revalidate; dynamic routes are
              uncacheable by default.
            </p>
            <p>
              On Vercel, the Edge Network handles CDN caching globally. Self-hosted
              requires configuring CDN (CloudFront, Cloudflare) in front of your
              origin. Cache static assets aggressively; API routes and personalized
              pages should have Cache-Control: private, no-store.
            </p>
          </div>
          <CodeBlock
            code={`// Route Handler — custom cache headers
export async function GET() {
  const data = await fetchData();
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

// Static assets (_next/static/*) — immutable, 1 year cache (automatic)
// ISR pages — s-maxage=revalidate, stale-while-revalidate (automatic)`}
            language="javascript"
          />
        </section>

        {/* Q13 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            13. Monitoring production Next.js applications
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong>Error tracking</strong> — Sentry, Bugsnag (integrate in
                instrumentation.js)
              </li>
              <li>
                <strong>Performance</strong> — Vercel Analytics, Speed Insights,
                next/web-vitals
              </li>
              <li>
                <strong>Logging</strong> — structured logs from Server Components
                and Route Handlers; avoid console.log in production
              </li>
              <li>
                <strong>Uptime</strong> — health check Route Handler at /api/health
              </li>
              <li>
                <strong>Build monitoring</strong> — CI alerts on failed builds,
                bundle size regressions
              </li>
            </ul>
          </div>
          <CodeBlock
            code={`// instrumentation.js — runs on server startup
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({ dsn: process.env.SENTRY_DSN });
  }
}

// app/api/health/route.js
export async function GET() {
  const dbOk = await checkDatabase();
  return Response.json(
    { status: dbOk ? 'healthy' : 'degraded' },
    { status: dbOk ? 200 : 503 }
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q14 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            14. Common deployment failures and how to fix them
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Build fails with &quot;Dynamic server usage&quot;</strong> — route
              uses cookies/headers unexpectedly. Add{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">export const dynamic = 'force-dynamic'</code>{" "}
              or remove dynamic APIs.
            </p>
            <p>
              <strong>404 on static assets in Docker</strong> — forgot to copy{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.next/static</code>{" "}
              and{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">public/</code>{" "}
              to standalone output.
            </p>
            <p>
              <strong>Env vars undefined in production</strong> —{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NEXT_PUBLIC_*</code>{" "}
              not set at build time, or server vars not injected in Docker/CI.
            </p>
            <p>
              <strong>Image optimization 500 errors</strong> — self-hosted needs
              sharp installed; check remotePatterns config.
            </p>
            <p>
              <strong>Middleware infinite redirect loop</strong> — matcher
              includes the redirect destination path.
            </p>
          </div>
        </section>

        {/* Q15 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            15. Edge runtime deployment considerations
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Routes with{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">export const runtime = 'edge'</code>{" "}
              deploy to Edge locations globally. Benefits: lower latency, no cold
              starts on Vercel Edge. Limitations: no Node.js APIs, smaller bundle
              size limits (~1-4MB depending on platform), limited npm compatibility.
            </p>
            <p>
              Middleware always runs on Edge. Mix Edge and Node routes in the
              same app — Next.js routes each to the appropriate runtime. Test Edge
              routes thoroughly; many npm packages fail silently or at build time.
            </p>
          </div>
        </section>

        {/* Q16 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            16. Multi-region deployment strategies
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Multi-region improves latency and availability:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong>Vercel</strong> — automatic global Edge network; set{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">preferredRegion</code>{" "}
                for data-locality
              </li>
              <li>
                <strong>Static/ISR content</strong> — CDN caches globally; no
                multi-region server needed
              </li>
              <li>
                <strong>Dynamic data</strong> — read replicas per region, or
                edge-compatible databases (PlanetScale, Turso)
              </li>
              <li>
                <strong>Self-hosted</strong> — deploy containers to multiple
                regions behind geo-routed load balancer; shared Redis for ISR cache
              </li>
            </ul>
            <p>
              Use{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">export const preferredRegion = ['iad1', 'sfo1', 'lhr1']</code>{" "}
              to pin serverless functions near your database while still serving
              static assets from global CDN.
            </p>
          </div>
          <CodeBlock
            code={`// app/api/data/route.js — run near database
export const runtime = 'nodejs';
export const preferredRegion = ['iad1']; // US East — near primary DB

export async function GET() {
  const data = await db.query('SELECT ...');
  return Response.json(data);
}

// Static pages — served from CDN globally (no config needed)
// ISR pages — cached at Edge after first regional generation`}
            language="javascript"
          />
        </section>
      </div>

      <nav className="flex flex-wrap items-center gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
        <Link
          href="/learn/app-router/b14/lesson-11"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ← Previous: B14.11 Optimization
        </Link>
      </nav>
    </div>
  );
}
