import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.13: General Production Debugging - Next.js Mastery",
  description:
    "Cross-cutting on-call scenarios: env mismatches, ChunkLoadError, auth redirects, pool exhaustion, and hydration",
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

export default function Lesson13Page() {
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
          B15.13: General Production Debugging
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Cross-cutting on-call scenarios that span middleware, caching, auth, deploys,
          and data integrity. Fixes include a practical debug sequence where it helps.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Works on my machine — production 500 only
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Feature ships; staging and local dev pass. Production returns 500 on
              one route. Logs show minified stack traces; dev cannot reproduce until
              they mimic production NODE_ENV.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              NODE_ENV=production enables stricter behavior and strips dev-only code.
              Missing env vars exist only in .env.local. assert/debug throws only
              outside production builds.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reproduce: run next build &amp;&amp; next start locally with production env.</li>
              <li>Check logs: hosting function logs, source maps, requestId correlation.</li>
              <li>Check env: compare platform env list to .env.example required keys.</li>
              <li>Fix missing var or production-only branch; verify on staging with prod parity.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// package.json — local prod parity
"scripts": {
  "build": "next build",
  "start:prod": "next build && cross-env NODE_ENV=production next start"
}

// Fail fast at startup for required secrets (server module)
const required = ['DATABASE_URL', 'AUTH_SECRET'];
for (const key of required) {
  if (!process.env[key]) throw new Error(\`Missing \${key}\`);
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            ChunkLoadError after deploy — old tabs break
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Minutes after deploy, support tickets spike: white screen, ChunkLoadError,
              unexpected token in console. Users who kept tabs open hit 404 on old
              hashed JS files.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              HTML references content-hashed chunks. Deploy replaces assets; stale HTML
              still points at deleted files. Aggressive CDN purge without grace period
              worsens the window.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reproduce: keep tab open across deploy; watch network 404 on /_next/static.</li>
              <li>Check caching: keep immutable hashed assets long-lived; version HTML separately.</li>
              <li>Fix client: listen for chunk error and hard reload once.</li>
              <li>Verify: deploy again with long-lived tab; confirm auto-recovery.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/ChunkRecovery.js
'use client';
import { useEffect } from 'react';

export default function ChunkRecovery() {
  useEffect(() => {
    function onError(event) {
      const msg = event?.message ?? '';
      if (msg.includes('ChunkLoadError') || msg.includes('Loading chunk')) {
        window.location.reload();
      }
    }
    window.addEventListener('error', onError);
    return () => window.removeEventListener('error', onError);
  }, []);
  return null;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Infinite redirect between / and /login
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Logged-in users bounce between home and login. Incognito works until login
              then loops. No clear 500—just 307 chains in network panel.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Middleware says no cookie → /login while login page redirect() sends
              authenticated users to /. Cookie name, path, or decryption mismatch
              makes both sides disagree about session state.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reproduce with curl -I -L and browser preserving cookies.</li>
              <li>Log middleware decisions (pathname, hasSession) temporarily in preview.</li>
              <li>Align cookie set in login route with middleware read; fix redirect conditions.</li>
              <li>Verify: single hop to destination; no loop in staging.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// middleware.ts — temporary debug (remove after fix)
export function middleware(request) {
  const session = request.cookies.get('session')?.value;
  console.log('[mw]', request.nextUrl.pathname, Boolean(session));
  // ...
}

// app/login/page.js — avoid redirect if session invalid per same rules as middleware
import { redirect } from 'next/navigation';
import { getValidSession } from '@/lib/auth';

export default async function LoginPage() {
  const session = await getValidSession();
  if (session) redirect('/');
  return <LoginForm />;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Intermittent 500s at peak — connection pool exhausted
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Traffic spike causes random 500s; DB metrics show too many connections.
              Error: sorry, too many clients already or Timed out acquiring connection.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              new PrismaClient() per request in serverless or hot reload pattern leaks
              connections. Dev global cache on globalThis was copied to prod incorrectly
              or omitted entirely under load.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Check logs at peak for pool timeout; graph DB connection count.</li>
              <li>Check env: DATABASE_URL pool limits vs serverless concurrency.</li>
              <li>Singleton Prisma on globalThis in dev; one client per instance in prod.</li>
              <li>Verify under load test: connections plateau, errors stop.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// lib/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Double charge — Server Action retried without idempotency
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Customers report duplicate orders from one checkout click. Payment provider
              shows two intents with the same cart a second apart.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Double click, slow network retry, or browser resubmitting forms retriggers
              the Server Action. Without idempotency keys the backend creates two charges.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reproduce: double-click pay button on throttled network.</li>
              <li>Disable submit while pending; use pending state from useFormStatus.</li>
              <li>Pass idempotency key to payment API; dedupe in DB on unique key.</li>
              <li>Verify: repeated action returns same result, one charge.</li>
            </ul>
          </div>
          <CodeBlock
            code={`'use server';

export async function checkout(formData) {
  const idempotencyKey = formData.get('idempotencyKey');
  const existing = await db.order.findUnique({ where: { idempotencyKey } });
  if (existing) return existing;

  const order = await paymentProvider.charge({
    idempotencyKey,
    amount: formData.get('amount'),
  });
  await db.order.create({ data: { idempotencyKey, externalId: order.id } });
  return order;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Hydration error only in Chrome with extensions
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Sentry floods hydration mismatch on body subtree. QA sees nothing in
              Firefox; Chrome users with password managers report glitches.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Extensions inject DOM before React hydrates. Real bugs also exist—
              Date.now or random IDs in SSR output differ from client first render.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reproduce in incognito without extensions; compare to affected browser.</li>
              <li>Fix real mismatches: stable IDs, suppressHydrationWarning only on known time nodes.</li>
              <li>Do not blanket suppress hydration on layout—fix root cause first.</li>
              <li>Verify: clean profile passes; document extension noise for support.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// Known timestamp — narrow suppression
<time dateTime={iso} suppressHydrationWarning>
  {formattedForUserTimezone}
</time>

// Bad — random id in SSR
// <div id={Math.random()} />`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            PII in logs — Server Action logs full formData
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Security review finds plaintext passwords and SSN fields in log aggregator
              from console.log(formData) left in a signup Server Action.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              FormData includes all fields; quick debug logging ships to centralized
              logs with retention and broad access—GDPR and SOC2 violation.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Search codebase for console.log in actions; remove or redact.</li>
              <li>Structured logs with allowlist fields only; never log password, token, card.</li>
              <li>Purge retained logs if breach; rotate credentials if secrets logged.</li>
              <li>Add lint rule or review checklist for Server Actions.</li>
            </ul>
          </div>
          <CodeBlock
            code={`'use server';

const SENSITIVE = new Set(['password', 'ssn', 'cardNumber']);

export async function signup(formData) {
  const safe = {};
  for (const [key, value] of formData.entries()) {
    if (!SENSITIVE.has(key)) safe[key] = value;
  }
  logger.info({ event: 'signup_attempt', fields: safe });
  // ...
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Auth works on localhost, fails on real domain behind TLS proxy
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Login succeeds but session cookie never sticks in production. Users loop
              on http URL while browsers expect Secure cookies on HTTPS site.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              TLS terminates at load balancer; Next sees http:// internally. Secure
              cookies and Auth.js trustHost settings reject or mis-set sessions without
              x-forwarded-proto and correct AUTH_URL.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reproduce on production domain; inspect Set-Cookie and scheme in logs.</li>
              <li>Set AUTH_URL / NEXTAUTH_URL to public https origin.</li>
              <li>Enable trustHost; ensure proxy forwards x-forwarded-proto: https.</li>
              <li>Verify cookie Secure + SameSite appropriate for your login flow.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// .env.production
AUTH_URL=https://app.example.com
AUTH_TRUST_HOST=true

// Reverse proxy must send
// X-Forwarded-Proto: https
// X-Forwarded-Host: app.example.com`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Health check redirected to login — all instances unhealthy
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Deploy completes then full outage. Load balancer drains every instance;
              /api/health returns 302 to /login so probes fail continuously.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Global auth middleware/proxy matches /api/health. Probes do not send
              session cookies; middleware treats them as anonymous and redirects.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reproduce: curl -I /api/health — expect 200 not 302.</li>
              <li>Exclude health and readiness paths in middleware/proxy matcher.</li>
              <li>Return 200 JSON without auth; keep probes cheap.</li>
              <li>Verify LB marks instances healthy before traffic shift.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/api/health/route.js
export async function GET() {
  return Response.json({ ok: true, ts: Date.now() });
}

// middleware.ts public paths
const PUBLIC = ['/login', '/api/health', '/api/ready'];`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Feature flag frozen ON in static page at build time
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Flag turned off in LaunchDarkly but marketing page still shows experimental
              pricing until rebuild. Ops toggles have no effect on cached HTML.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              process.env.FEATURE_X or flag client read during static generation bakes
              value into HTML at build. ISR without per-request evaluation inherits
              the same snapshot.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Check caching: route segment config static vs dynamic in build output.</li>
              <li>Read flags per request in dynamic segment or client after hydration for UI-only.</li>
              <li>Revalidate on flag change webhook if using edge-config cache.</li>
              <li>Verify toggle off reflects within seconds without redeploy.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/pricing/page.js — per-request flags
export const dynamic = 'force-dynamic';

import { getFlag } from '@/lib/flags';

export default async function PricingPage() {
  const newPricing = await getFlag('new_pricing');
  return newPricing ? <PricingV2 /> : <PricingV1 />;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Timezone bug — today&apos;s orders empty for India users
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Dashboard filters orders for today; IST users see empty list until UTC
              midnight. Console shows hydration warning on date label text.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Server formats dates in UTC; client re-formats in local timezone with
              toLocaleDateString—strings differ at hydration. Query bounds use UTC
              day while user expects Asia/Kolkata calendar day.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reproduce with TZ=Asia/Kolkata in server logs vs browser locale.</li>
              <li>Pick explicit timezone (user setting or org default) for queries and display.</li>
              <li>Pass ISO strings from server; format in client-only component if needed.</li>
              <li>Verify filter boundaries match user calendar day.</li>
            </ul>
          </div>
          <CodeBlock
            code={`import { formatInTimeZone } from 'date-fns-tz';

const TZ = 'Asia/Kolkata';

export async function getOrdersForToday(userId) {
  const start = formatInTimeZone(new Date(), TZ, "yyyy-MM-dd'T'00:00:00XXX");
  const end = formatInTimeZone(new Date(), TZ, "yyyy-MM-dd'T'23:59:59XXX");
  return db.order.findMany({
    where: { userId, createdAt: { gte: new Date(start), lte: new Date(end) } },
  });
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Memory grows for hours on long-lived next start server
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Self-hosted Node process RSS climbs from 400MB to 4GB over a day until
              OOM kill restart. Leak correlates with traffic but not specific route in
              first glance.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Unbounded global Map caches every user profile. setInterval at module
              import accumulates listeners across hot reload in dev; in prod a similar
              timer never clears. Event listeners attached per request without teardown.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reproduce under heap snapshot diff after sustained load test.</li>
              <li>Cap LRU caches; TTL evict entries; avoid module-scope timers.</li>
              <li>Move long-running work to worker or external queue.</li>
              <li>Verify RSS stable over 24h soak after fix.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// lib/lru.js — bounded cache
import { LRUCache } from 'lru-cache';

export const profileCache = new LRUCache({
  max: 500,
  ttl: 1000 * 60 * 5,
});

// Avoid at module top level:
// setInterval(() => { ... }, 1000);`}
            language="javascript"
          />
        </section>
      </div>

      <nav className="flex flex-wrap items-center gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
        <Link
          href="/learn/app-router/b15/lesson-12"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ← Previous: B15.12
        </Link>
      </nav>
    </div>
  );
}
