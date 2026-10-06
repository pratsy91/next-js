import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.10: Advanced Feature Incidents - Next.js Mastery",
  description:
    "Production incidents: middleware loops, env leaks, i18n cache, draft mode, and multi-tenant static cache",
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

export default function Lesson10Page() {
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
          B15.10: Advanced Feature Incidents (B10)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Real production incidents around middleware (and Next.js 16 proxy.ts
          migration), env exposure, i18n, draft mode, rewrites, and tenant
          caching. Each scenario: what broke, why, and concrete fixes.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Middleware sends every request—including /login—to /login
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              After shipping auth middleware, the site shows ERR_TOO_MANY_REDIRECTS.
              Even visiting /login bounces to /login forever. Support cannot sign
              in; the app is effectively down.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Middleware runs on all matched paths. If unauthenticated users are
              always redirected to /login but /login is not excluded, the
              middleware runs again on /login, sees no session, and redirects to
              /login again.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Define public routes: /login, /signup, static assets, webhooks.</li>
              <li>Tighten the matcher so middleware skips those paths.</li>
              <li>On Next.js 16+, apply the same logic in proxy.ts at the project root.</li>
              <li>Keep middleware/proxy logic synchronous—no DB round trips on every hit.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// middleware.ts (Next.js 14–15) or proxy.ts (Next.js 16+) at project root
import { NextResponse } from 'next/server';

const PUBLIC = ['/login', '/signup', '/api/health'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (PUBLIC.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }
  const session = request.cookies.get('session')?.value;
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|login|signup).*)'],
};`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            process.env.API_SECRET is undefined in the browser
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              A Client Component calls your internal API with an Authorization
              header built from process.env.API_SECRET. In dev it seemed fine; in
              production the header is empty and every request returns 401.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Only NEXT_PUBLIC_* variables are inlined into the client bundle.
              Server-only env vars are stripped from client code at build time, so
              the value is undefined in the browser—by design.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Never read secrets in Client Components.</li>
              <li>Call a Server Action or route handler that adds the secret server-side.</li>
              <li>Do not prefix secrets with NEXT_PUBLIC_.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/actions/fetchReports.js
'use server';

export async function fetchReports() {
  const res = await fetch('https://internal.api/reports', {
    headers: { Authorization: \`Bearer \${process.env.API_SECRET}\` },
    cache: 'no-store',
  });
  return res.json();
}

// Client Component — only invokes the server action
'use client';
import { fetchReports } from '@/app/actions/fetchReports';`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Stripe secret key visible in the client bundle
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Security scan flags sk_live_* in a public JS chunk. Checkout worked,
              but anyone could extract the key and create charges. Finance pauses
              payouts until rotation.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              NEXT_PUBLIC_STRIPE_SECRET was added so the browser could charge cards.
              The build inlines every NEXT_PUBLIC_ value into client JavaScript,
              which is world-readable.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Revoke and rotate the leaked key in Stripe immediately.</li>
              <li>Remove NEXT_PUBLIC_ from secret keys; keep only publishable key client-side.</li>
              <li>Create PaymentIntent or Checkout Session in a Server Action on nodejs runtime.</li>
              <li>Redeploy and verify bundles with source-map explorer or build output.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/actions/checkout.js
'use server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(priceId) {
  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: \`\${process.env.APP_URL}/success\`,
    cancel_url: \`\${process.env.APP_URL}/cart\`,
  });
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Middleware imports fs or a DB driver and crashes on Edge
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Deploy succeeds locally but production middleware throws
              &quot;Dynamic Code Evaluation not allowed&quot; or cannot find module fs.
              Every page returns 500 at the edge.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              middleware.ts and proxy.ts run on the Edge runtime by default—no
              Node fs, no native DB drivers, tight bundle limits. Importing Prisma
              or pg in middleware pulls incompatible code into the edge bundle.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Middleware/proxy: only cookie/JWT signature checks and redirects.</li>
              <li>Validate sessions against DB in Server Components or route handlers with runtime nodejs.</li>
              <li>Never await slow auth DB calls in middleware—it blocks every matched request.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// middleware.ts — edge-safe: verify JWT locally only
import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/session-edge';

export async function middleware(request) {
  const token = request.cookies.get('session')?.value;
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

// app/dashboard/page.js — heavy auth on Node
export const runtime = 'nodejs';

export default async function DashboardPage() {
  const user = await getUserFromDatabase(); // Prisma OK here
  return <Dashboard user={user} />;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Auth cookie missing in middleware after subdomain login
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Users log in on auth.example.com but app.example.com middleware never
              sees the session cookie and keeps redirecting to login. Cookies tab
              shows the cookie only on the auth host.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Cookie path, domain, and SameSite were set for a single host. A cookie
              scoped to auth.example.com is not sent to app.example.com. Cross-site
              POST login with SameSite=Lax may also drop cookies on navigation.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Set Domain=.example.com for shared subdomains (or use one app origin).</li>
              <li>Use Secure; SameSite=None only when truly cross-site with Secure.</li>
              <li>Align Path=/ and verify Set-Cookie on the response that matters.</li>
              <li>Test middleware on the exact host users hit, not localhost only.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// route handler setting session — app/api/login/route.js
import { cookies } from 'next/headers';

export async function POST(request) {
  const token = await signSession(user);
  cookies().set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    domain: '.example.com',
    maxAge: 60 * 60 * 24 * 7,
  });
  return Response.json({ ok: true });
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Middleware runs on static assets and slows every page
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Lighthouse TTFB looks fine but static chunks and images incur extra
              edge latency. CDN logs show middleware invocations for /_next/static
              and /_next/image on every visit.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              A broad matcher like /:path* includes Next.js internal asset routes.
              Auth logic runs thousands of times per page load instead of once for
              HTML navigation.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use a negative lookahead matcher to exclude _next, static files, and images.</li>
              <li>Audit middleware/proxy cold starts in hosting metrics.</li>
              <li>Keep the matcher list minimal—only routes that need auth or locale.</li>
            </ul>
          </div>
          <CodeBlock
            code={`export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            force-static page calls cookies() and build fails
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              CI build errors: route cannot be static because it uses cookies().
              Or the page ships as static but throws at runtime when personalization
              was added without updating segment config.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              export const dynamic = &apos;force-static&apos; tells Next.js the segment
              must be static. cookies(), headers(), and uncached fetch with
              credentials opt the route into dynamic rendering—they conflict.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Remove force-static from personalized pages; use force-dynamic or auto.</li>
              <li>Split: static shell + dynamic child that reads cookies inside Suspense.</li>
              <li>Run next build locally with the same env as CI to catch the error early.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/account/page.js — personalized: do not force-static
export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';

export default async function AccountPage() {
  const session = cookies().get('session')?.value;
  const user = await getUser(session);
  return <Account user={user} />;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            French users see English because locale is not in the cache key
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              /fr/about sometimes renders English copy. Purging CDN fixes it briefly;
              then the first English visitor poisons the cache for everyone.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Locale was inferred from Accept-Language on a statically cached page
              without a distinct URL segment, or /about and /fr/about shared one
              RSC payload key. Static HTML cannot vary per header without dynamic.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use app/[locale]/... so each locale is its own route and cache entry.</li>
              <li>Do not read Accept-Language in a static page without marking it dynamic.</li>
              <li>Set Content-Language and hreflang; verify CDN caches by full path.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/[locale]/about/page.js
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const copy = await getMessages(locale);
  return <About copy={copy} />;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            next.config redirects and middleware chain into a loop
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              After migrating www to apex domain, some paths bounce between hosts.
              Marketing links 301 forever; SEO tools report redirect chains exceeding
              ten hops.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              next.config.js redirects run at the platform layer while middleware
              also rewrites host or path. Old rules still send apex→www while
              middleware sends www→apex, or trailing-slash rules fight each other.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Pick one layer for host canonicalization—usually config redirects once.</li>
              <li>Document redirect matrix; remove duplicate rules from middleware/proxy.</li>
              <li>Test with curl -I and follow redirects; fix loops before cutover.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// next.config.js — single canonical host rule
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.example.com' }],
        destination: 'https://example.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

// middleware.ts — do NOT also redirect host; only auth/locale`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Draft Mode left on—unpublished CMS content served to everyone
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Editors previewed a draft product launch; hours later customers see
              unpublished pricing. Draft banner never appeared for them—the cached
              HTML was shared globally.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              draftMode() was enabled for editors but the response was stored in the
              Data Cache without draft isolation. Production traffic reused the
              draft fetch result until revalidation.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Disable draft mode in production except explicit preview routes.</li>
              <li>While draft is on, use cache: no-store on CMS fetches.</li>
              <li>Separate preview deployment or secret preview URL for editors.</li>
              <li>Purge CDN after accidental draft cache pollution.</li>
            </ul>
          </div>
          <CodeBlock
            code={`import { draftMode } from 'next/headers';

export default async function ProductPage({ params }) {
  const { isEnabled } = draftMode();
  const product = await fetch(\`\${CMS}/products/\${params.slug}\`, {
    headers: isEnabled ? { Authorization: \`Bearer \${process.env.CMS_PREVIEW}\` } : {},
    next: isEnabled ? undefined : { revalidate: 3600, tags: ['product'] },
    cache: isEnabled ? 'no-store' : 'force-cache',
  }).then((r) => r.json());
  return <Product data={product} draft={isEnabled} />;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Rewrite proxy forwards cookies to a third-party API
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Legacy /api/* rewrite sends traffic to an old internal hostname visible
              in error pages. Partner API logs show session cookies from your users—
              a compliance incident.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              next.config rewrites blindly proxy browser requests including Cookie
              headers. External destinations should never receive your auth cookies;
              internal hostnames leak in redirects and JSON errors.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Replace blind rewrites with route handlers that strip Cookie and add service auth.</li>
              <li>Do not expose internal hostnames—use env-based upstream URLs server-side only.</li>
              <li>Audit rewrites after infra migrations; remove dead proxies.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/api/legacy/[...path]/route.js — controlled proxy
export async function GET(request, { params }) {
  const path = params.path.join('/');
  const upstream = process.env.LEGACY_API_URL;
  const res = await fetch(\`\${upstream}/\${path}\`, {
    headers: {
      Authorization: \`Bearer \${process.env.LEGACY_SERVICE_TOKEN}\`,
    },
    // never forward request.headers.get('cookie')
  });
  return new Response(res.body, { status: res.status, headers: { 'Content-Type': 'application/json' } });
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Multi-tenant static cache serves Tenant A data to Tenant B
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              SaaS dashboard at app.example.com shows another customer&apos;s revenue
              chart intermittently. Header x-tenant-id differs but HTML is identical
              in CDN cache keys.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Tenant was read from a request header in a page marked static or ISR
              without varying the cache. Next.js and CDNs key on URL by default, not
              arbitrary headers—cross-tenant leakage follows.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Put tenant in the path: /t/[tenant]/dashboard or use subdomain per tenant.</li>
              <li>Or export const dynamic = force-dynamic for tenant-specific pages.</li>
              <li>Never statically cache personalized tenant dashboards at shared URLs.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/t/[tenant]/dashboard/page.js
export const dynamic = 'force-dynamic';

export default async function TenantDashboard({ params }) {
  const { tenant } = await params;
  await assertUserCanAccessTenant(tenant);
  const stats = await getStats(tenant);
  return <Dashboard stats={stats} />;
}`}
            language="javascript"
          />
        </section>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
        <Link
          href="/learn/app-router/b15/lesson-9"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ← Previous: B15.9
        </Link>
        <Link
          href="/learn/app-router/b15/lesson-11"
          className="rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Next: B15.11 →
        </Link>
      </nav>
    </div>
  );
}
