import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.10: Advanced Features (B10) - Most Asked Interview Questions",
  description:
    "Most asked Next.js App Router interview questions on Middleware, route segment config, i18n, env vars, and draft mode",
};

export default function Lesson10Page() {
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
          B14.10: Advanced Features (B10)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The most frequently asked interview questions on Middleware, route
          segment config, internationalization, redirects/rewrites, environment
          variables, and Draft Mode.
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
            1. What is Middleware in Next.js? When should you use it?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Middleware runs <strong>before</strong> a request completes — on
              every matched route. It executes at the Edge by default, close to
              users, making it ideal for cross-cutting concerns that must happen
              before rendering: authentication checks, redirects, locale detection,
              A/B testing, bot protection, and setting request/response headers.
            </p>
            <p>
              Place{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">middleware.ts</code>{" "}
              in the project root (or{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">src/</code>{" "}
              if using src directory). It receives a{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NextRequest</code>{" "}
              and returns a{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NextResponse</code>.
            </p>
            <p>
              <strong>Use middleware for:</strong> auth gating, geo redirects,
              locale prefixing. <strong>Do not use for:</strong> heavy data
              fetching, database queries, or business logic better suited to
              Server Components or Route Handlers.
            </p>
          </div>
          <CodeBlock
            code={`// middleware.ts (project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};`}
            language="typescript"
          />
        </section>

        {/* Q2 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            2. What are Middleware limitations (no Node.js APIs)?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Middleware runs on the <strong>Edge Runtime</strong> by default,
              which is a lightweight V8 isolate — not full Node.js. This means:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                No Node.js APIs:{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">fs</code>,{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">crypto</code>{" "}
                (Node version), native modules
              </li>
              <li>
                No direct database connections (use HTTP calls to edge-compatible
                DBs like PlanetScale, Turso, or Upstash)
              </li>
              <li>
                Limited npm package compatibility — packages must be Edge-compatible
              </li>
              <li>
                Cannot read or modify response body after generation
              </li>
              <li>
                Cannot produce response bodies directly in some edge cases — use
                redirects, rewrites, or header modifications
              </li>
            </ul>
            <p>
              Keep middleware fast and stateless. Offload heavy work to Server
              Components, Route Handlers, or external edge functions.
            </p>
          </div>
        </section>

        {/* Q3 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            3. How does the matcher config work?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              The{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">matcher</code>{" "}
              export controls which paths trigger middleware. Without it, middleware
              runs on every route including static assets — usually undesirable.
            </p>
            <p>
              Matchers support path patterns, negative lookahead regex to exclude
              paths, and arrays of patterns. Next.js recommends excluding{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">_next/static</code>,{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">_next/image</code>, and{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">favicon.ico</code>{" "}
              for performance.
            </p>
          </div>
          <CodeBlock
            code={`export const config = {
  // Single path
  matcher: '/about/:path*',

  // Multiple paths
  matcher: ['/dashboard/:path*', '/api/:path*'],

  // Exclude static files (recommended default)
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],

  // Match specific methods (advanced)
  matcher: [
    { source: '/api/:path*', missing: [{ type: 'header', key: 'x-api-key' }] },
  ],
};`}
            language="typescript"
          />
        </section>

        {/* Q4 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            4. Next.js 16: proxy.ts vs middleware.ts — what changed?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              In Next.js 16, the middleware concept evolves with clearer separation
              between <strong>request interception</strong> (middleware) and{" "}
              <strong>upstream proxying</strong> (proxy.ts). The{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">proxy.ts</code>{" "}
              file handles forwarding requests to external backends, API gateways,
              or microservices — acting as a development and production reverse
              proxy layer.
            </p>
            <p>
              <strong>middleware.ts</strong> remains for auth, redirects, header
              injection, and locale routing at the Edge.{" "}
              <strong>proxy.ts</strong> is for routing traffic to external services
              during development (replacing manual{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">rewrites</code>{" "}
              in some cases) and unified proxy configuration. Know both exist in
              interviews for Next.js 16+ — middleware is not deprecated, but proxy
              is the dedicated tool for backend forwarding.
            </p>
          </div>
          <CodeBlock
            code={`// middleware.ts — auth, redirects, headers (Edge)
export function middleware(request: NextRequest) {
  // Gate routes, set cookies, redirect
  return NextResponse.next();
}

// proxy.ts — forward to external services (Next.js 16+)
export const config = {
  '/api/external/:path*': {
    target: 'https://api.example.com',
    changeOrigin: true,
    pathRewrite: { '^/api/external': '' },
  },
};`}
            language="typescript"
          />
        </section>

        {/* Q5 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            5. What does export const dynamic = &apos;force-static&apos; | &apos;force-dynamic&apos; do?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Route segment config controls rendering behavior at the layout or
              page level:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">'force-static'</code>{" "}
                — always statically generate at build time, even if dynamic
                functions are used (they become no-ops or build-time values)
              </li>
              <li>
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">'force-dynamic'</code>{" "}
                — always render on each request (SSR), opts out of static caching
              </li>
              <li>
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">'auto'</code>{" "}
                (default) — Next.js decides based on usage of cookies, headers,
                searchParams, etc.
              </li>
              <li>
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">'error'</code>{" "}
                — fail build if route would be dynamic (enforce static)
              </li>
            </ul>
            <p>
              Using{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">cookies()</code>,{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">headers()</code>, or{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">searchParams</code>{" "}
              automatically makes a route dynamic unless overridden.
            </p>
          </div>
          <CodeBlock
            code={`// app/dashboard/page.js — always dynamic (personalized)
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getSession(); // uses cookies internally
  return <div>Welcome {session.user.name}</div>;
}

// app/blog/[slug]/page.js — force static for CDN caching
export const dynamic = 'force-static';

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}`}
            language="javascript"
          />
        </section>

        {/* Q6 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            6. What is export const revalidate?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">revalidate</code>{" "}
              sets the ISR (Incremental Static Regeneration) interval in seconds
              for a route segment. A statically generated page is regenerated in
              the background after the revalidation period when the next request
              arrives.
            </p>
            <p>
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">revalidate = 0</code>{" "}
              is equivalent to dynamic rendering.{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">revalidate = false</code>{" "}
              caches indefinitely. Per-fetch{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">next: &#123; revalidate: 3600 &#125;</code>{" "}
              can override segment-level config for individual data sources.
            </p>
          </div>
          <CodeBlock
            code={`// Revalidate this page every hour
export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 },
  }).then((r) => r.json());

  return <ProductList products={products} />;
}

// On-demand revalidation (Route Handler or Server Action)
import { revalidatePath, revalidateTag } from 'next/cache';

revalidatePath('/products');
revalidateTag('products');`}
            language="javascript"
          />
        </section>

        {/* Q7 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            7. runtime = &apos;edge&apos; | &apos;nodejs&apos; — when to use each?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>nodejs</strong> (default) — full Node.js runtime with access
              to all npm packages, filesystem (limited), and native modules. Use
              for database connections, heavy computation, and most Route Handlers.
            </p>
            <p>
              <strong>edge</strong> — lightweight V8 isolate deployed globally.
              Lower cold start, runs closer to users. Limited APIs. Use for
              geo-based logic, simple transforms, A/B routing, and latency-sensitive
              lightweight handlers.
            </p>
            <p>
              Export{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">export const runtime = 'edge'</code>{" "}
              in a page, layout, or route handler. Middleware always runs on Edge.
            </p>
          </div>
          <CodeBlock
            code={`// app/api/geo/route.js — Edge for low latency
export const runtime = 'edge';

export async function GET(request) {
  const country = request.headers.get('x-vercel-ip-country') ?? 'US';
  return Response.json({ country });
}

// app/api/reports/route.js — Node for heavy DB work
export const runtime = 'nodejs';

export async function GET() {
  const report = await db.query('SELECT * FROM analytics...');
  return Response.json(report);
}`}
            language="javascript"
          />
        </section>

        {/* Q8 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            8. How do you implement i18n in the App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Unlike Pages Router&apos;s built-in i18n config, App Router i18n is
              implemented manually via routing and middleware:
            </p>
            <ol className="list-inside list-decimal space-y-2">
              <li>
                Use dynamic segment:{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">app/[lang]/layout.js</code>
              </li>
              <li>
                Middleware detects locale from URL, cookie, or Accept-Language
                header and redirects to prefixed path
              </li>
              <li>
                Load translations via dictionaries (JSON files) or libraries like{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">next-intl</code>
              </li>
              <li>
                Set{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">html lang</code>{" "}
                attribute in locale layout
              </li>
            </ol>
          </div>
          <CodeBlock
            code={`// middleware.ts — locale detection
const locales = ['en', 'fr', 'de'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname.startsWith(\`/\${l}/\`) || pathname === \`/\${l}\`
  );
  if (hasLocale) return NextResponse.next();

  const locale = request.cookies.get('locale')?.value ?? defaultLocale;
  return NextResponse.redirect(new URL(\`/\${locale}\${pathname}\`, request.url));
}

// app/[lang]/layout.js
export default async function LocaleLayout({ children, params }) {
  const { lang } = await params;
  return <html lang={lang}><body>{children}</body></html>;
}`}
            language="typescript"
          />
        </section>

        {/* Q9 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            9. Redirects vs rewrites in next.config — what is the difference?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Redirects</strong> — browser URL changes. User sees the new
              URL. Returns 307/308 status. Use for moved pages, canonical URLs,
              HTTP→HTTPS.
            </p>
            <p>
              <strong>Rewrites</strong> — URL stays the same in the browser, but
              Next.js serves content from a different path or external URL
              internally. Use for proxying APIs, masking backend URLs, or serving
              the same page at multiple paths.
            </p>
          </div>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true, // 308
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend.example.com/:path*',
      },
    ];
  },
};`}
            language="javascript"
          />
        </section>

        {/* Q10 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            10. Environment variables — security and NEXT_PUBLIC_ prefix?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Variables in{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.env.local</code>{" "}
              are server-only by default — never exposed to the browser bundle.
              Prefix with{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NEXT_PUBLIC_</code>{" "}
              only for values safe to expose client-side (public API URLs, feature
              flags, analytics IDs).
            </p>
            <p>
              <strong>Security rules:</strong> never prefix secrets (API keys,
              database URLs, JWT secrets) with{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NEXT_PUBLIC_</code>.
              Server-only vars are inlined at build time for server bundles only.
              Client Components can only access{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NEXT_PUBLIC_*</code>{" "}
              vars — accessing server vars in client code causes undefined or
              build errors.
            </p>
          </div>
          <CodeBlock
            code={`# .env.local
DATABASE_URL=postgresql://...        # Server only ✅
STRIPE_SECRET_KEY=sk_live_...        # Server only ✅
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  # Client safe ✅
NEXT_PUBLIC_API_URL=https://api.example.com

// Server Component / Route Handler
const db = process.env.DATABASE_URL; // ✅

// Client Component
'use client';
const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY; // ✅
const secret = process.env.STRIPE_SECRET_KEY; // ❌ undefined in browser`}
            language="javascript"
          />
        </section>

        {/* Q11 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            11. What is Draft Mode and when do you use it?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Draft Mode lets content editors preview unpublished CMS content on
              your production site without rebuilding. Enabling draft mode sets a
              secure cookie that bypasses static generation and fetches fresh
              data on each request.
            </p>
            <p>
              Flow: CMS webhook hits a Route Handler → call{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">draftMode().enable()</code>{" "}
              → redirect editor to preview URL → page fetches draft content →
              call{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">draftMode().disable()</code>{" "}
              to exit preview.
            </p>
          </div>
          <CodeBlock
            code={`// app/api/draft/route.js
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.DRAFT_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get('slug');
  draftMode().enable();
  redirect(\`/blog/\${slug}\`);
}

// app/blog/[slug]/page.js
import { draftMode } from 'next/headers';

export default async function BlogPost({ params }) {
  const { isEnabled } = draftMode();
  const post = isEnabled
    ? await fetchDraftPost(params.slug)
    : await fetchPublishedPost(params.slug);
  return <article>{post.content}</article>;
}`}
            language="javascript"
          />
        </section>

        {/* Q12 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            12. What is the auth pattern with Middleware?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              The recommended pattern: middleware performs a <strong>lightweight
              session check</strong> (cookie existence or JWT verification at Edge),
              redirects unauthenticated users, and passes session info via headers
              or cookies to downstream Server Components for full authorization.
            </p>
            <p>
              Do not put full RBAC logic in middleware — keep it fast. Verify
              JWT signature with Edge-compatible libraries (jose). Server Components
              then load user permissions from database.
            </p>
          </div>
          <CodeBlock
            code={`// middleware.ts
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.sub as string);
    return response;
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// app/dashboard/page.js — full auth in Server Component
export default async function Dashboard() {
  const user = await getCurrentUser(); // reads cookie, loads from DB
  if (!user.hasRole('admin')) notFound();
  return <AdminPanel user={user} />;
}`}
            language="typescript"
          />
        </section>

        {/* Q13 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            13. Edge case: should Middleware run on static assets?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Generally <strong>no</strong>. Running middleware on{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">/_next/static/*</code>,{" "}
              images, fonts, and favicons adds latency to every asset request
              without benefit. Use a negative lookahead matcher to exclude them.
            </p>
            <p>
              Static assets are served from CDN with long cache headers — middleware
              intercepting them wastes Edge compute and can break caching if you
              modify response headers incorrectly. Only include asset paths in
              matcher if you need geo-blocking or auth on specific public files.
            </p>
          </div>
        </section>

        {/* Q14 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            14. How do you set headers in Middleware?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Use{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NextResponse.next()</code>{" "}
              with modified headers for downstream requests, or{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">NextResponse.redirect()</code>{" "}
              /{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">rewrite()</code>{" "}
              with response headers. You can also set request headers passed to
              Server Components via the request header override pattern.
            </p>
          </div>
          <CodeBlock
            code={`export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Response headers (security, caching)
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}`}
            language="typescript"
          />
        </section>

        {/* Q15 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            15. How do you implement multi-tenant routing?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Multi-tenant apps identify tenants by subdomain (
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">acme.app.com</code>
              ), custom domain, or path prefix (
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">/t/acme</code>
              ). Middleware is the entry point for tenant resolution.
            </p>
            <p>
              <strong>Subdomain pattern:</strong> middleware reads{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">request.nextUrl.hostname</code>,
              looks up tenant (edge KV cache), sets{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">x-tenant-id</code>{" "}
              header, and rewrites to internal routes. Use{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">preferredRegion</code>{" "}
              segment config for data locality per tenant region.
            </p>
          </div>
          <CodeBlock
            code={`// middleware.ts — subdomain tenant routing
export async function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const subdomain = hostname.split('.')[0];

  if (subdomain === 'www' || subdomain === 'app') {
    return NextResponse.next();
  }

  const tenant = await getTenantFromCache(subdomain);
  if (!tenant) {
    return NextResponse.rewrite(new URL('/tenant-not-found', request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', tenant.id);

  return NextResponse.rewrite(
    new URL(\`/sites/\${tenant.id}\${request.nextUrl.pathname}\`, request.url),
    { request: { headers: requestHeaders } }
  );
}

// app/sites/[tenantId]/page.js
export const preferredRegion = ['iad1', 'sfo1']; // route segment config`}
            language="typescript"
          />
        </section>

        {/* Q16 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            16. What other route segment config options matter in interviews?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <ul className="list-inside list-disc space-y-2">
              <li>
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">fetchCache</code>{" "}
                — control default fetch caching for the segment
              </li>
              <li>
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">preferredRegion</code>{" "}
                — pin rendering to specific regions (multi-region apps)
              </li>
              <li>
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">maxDuration</code>{" "}
                — serverless function timeout (platform-dependent)
              </li>
              <li>
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">dynamicParams</code>{" "}
                — whether unlisted dynamic params generate on-demand (true) or 404 (false)
              </li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/[slug]/page.js — full segment config example
export const dynamic = 'auto';
export const dynamicParams = true;
export const revalidate = 3600;
export const runtime = 'nodejs';
export const preferredRegion = 'auto';
export const maxDuration = 30;

export async function generateStaticParams() {
  return [{ slug: 'about' }, { slug: 'contact' }];
}`}
            language="javascript"
          />
        </section>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
        <Link
          href="/learn/app-router/b14/lesson-9"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ← Previous: B14.9 Styling
        </Link>
        <Link
          href="/learn/app-router/b14/lesson-11"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Next: B14.11 Optimization →
        </Link>
      </nav>
    </div>
  );
}
