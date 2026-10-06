import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.2: Routing Incidents - Next.js Mastery",
  description:
    "Production routing failures: 404s, layouts, loading, parallel routes, and intercepts (maps to B2)",
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

export default function Lesson2Page() {
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
          B15.2: Routing Incidents
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          File-system routing looks simple until Linux CI, parallel slots, or
          layout vs template semantics bite in production. These are the
          incidents senior Next interviews expect you to diagnose fast.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            New app folder returns 404 on Linux CI
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              /reports works on a developer Mac but 404s after merge. The folder
              exists in Git as app/reports/Page.js instead of page.js.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              macOS default file systems are often case-insensitive; Linux CI
              is case-sensitive. Next only recognizes exact special filenames:
              page.js, layout.js, route.js, etc.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Rename to lowercase page.js and commit with git mv if needed.</li>
              <li>Add a CI check or eslint rule for App Router file naming.</li>
              <li>Ensure the segment exports a default page component.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — app/reports/Page.js (wrong case on Linux)

// FIXED — app/reports/page.js
export default function ReportsPage() {
  return <h1>Reports</h1>;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            not-found.js never shows — threw Error instead
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Missing products show the generic error.js UI or a 500 instead of
              the branded not-found.js page. Logs show uncaught Error: Product
              not found.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              not-found.js renders only when you call notFound() from
              next/navigation or when no route matches. A thrown Error triggers
              error.js, not the 404 UI.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Import notFound and call it when the resource is missing.</li>
              <li>Reserve throw for unexpected failures you want in error.js.</li>
              <li>Colocate app/not-found.js and segment-level not-found.js as needed.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN
export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) throw new Error('Product not found');
  return <div>{product.name}</div>;
}

// FIXED
import { notFound } from 'next/navigation';
export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();
  return <div>{product.name}</div>;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            error.js does not catch root layout failures
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Segment error.js works on /dashboard but a crash in root layout.js
              shows the Next dev overlay or a blank document. error.js also never
              runs if the file is missing use client.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              error.js is a Client Component boundary that replaces a segment
              layout/page subtree. Errors in root layout are outside nested
              error boundaries — you need app/global-error.js with its own html/body.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Add use client to error.js and implement reset().</li>
              <li>Add global-error.js for root layout and template failures.</li>
              <li>Move risky logic out of root layout into child segments with error.js.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// app/dashboard/error.js
'use client';
export default function DashboardError({ error, reset }) {
  return (
    <div>
      <p>{error.message}</p>
      <button type="button" onClick={() => reset()}>Retry</button>
    </div>
  );
}

// app/global-error.js — root catch
'use client';
export default function GlobalError({ error, reset }) {
  return (
    <html><body>
      <h2>Something went wrong</h2>
      <button type="button" onClick={() => reset()}>Try again</button>
    </body></html>
  );
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Sidebar state resets — template vs layout confusion
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Either the sidebar collapses on every link click because they used
              template.js, or a multi-step form keeps stale values because they
              expected template remount but used layout.js.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              layout.js persists state across navigations within the segment.
              template.js remounts on navigation, resetting client state and
              re-running effects — similar to a key change on the segment.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use layout.js for persistent chrome: nav, sidebar, providers that should survive routing.</li>
              <li>Use template.js when each navigation must reset wizard state or run enter animations.</li>
              <li>Do not duplicate both unless you understand nested remount behavior.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// Persist sidebar — app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

// Reset form shell each navigation — app/onboarding/template.js
export default function OnboardingTemplate({ children }) {
  return <div key={Date.now()}>{children}</div>; // prefer route-level key via template semantics`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            loading.js never appears — parent blocks the child
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Users stare at a frozen shell for three seconds. loading.js exists
              under the slow child route but the parent layout awaited the same
              database query before rendering children.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              loading.js shows only when React can suspend the segment behind a
              Suspense boundary. A parent async layout that awaits everything
              blocks streaming and prevents the child loading UI from showing.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Move slow fetches into the child page or wrap them in Suspense with a fallback.</li>
              <li>Keep layouts lightweight; pass promises with use() in child server components where appropriate.</li>
              <li>Verify you did not await child data in the parent layout.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — app/shop/layout.js
export default async function ShopLayout({ children }) {
  const categories = await db.category.findMany(); // blocks entire subtree
  return <div><Nav categories={categories} />{children}</div>;
}

// FIXED — stream categories inside Suspense
import { Suspense } from 'react';
async function CategoryNav() {
  const categories = await db.category.findMany();
  return <Nav categories={categories} />;
}
export default function ShopLayout({ children }) {
  return (
    <div>
      <Suspense fallback={<NavSkeleton />}>
        <CategoryNav />
      </Suspense>
      {children}
    </div>
  );
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Dynamic route shows [object Promise] for params.id
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              After upgrading to Next 15, product URLs render titles as
              [object Promise]. Local types still say params is a plain object.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              In Next 15+, params and searchParams in pages, layouts, and route
              handlers are Promises for async route segments. Using params.id
              without await passes a Promise into your DB query string.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Make the page async and await params to read id before use.</li>
              <li>Apply the same pattern in generateMetadata and open graph helpers.</li>
              <li>Run the Next 15 codemod for params/searchParams across the repo.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — Next 15+
export default async function Page({ params }) {
  const product = await getProduct(params.id);
  return <h1>{product.name}</h1>;
}

// FIXED
export default async function Page({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return <h1>{product.name}</h1>;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Parallel route @modal 404 on hard refresh
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Soft navigation opens the login modal slot, but refreshing
              /login?modal=1 or hitting the intercept URL directly returns 404
              because the @modal slot has no default.js.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Parallel routes require a default.js for each slot to render when
              the slot is inactive. Hard navigation does not have prior client
              state to imply which parallel UI should show.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Add app/@modal/default.js that returns null or a placeholder.</li>
              <li>Ensure layout reads both children and modal props.</li>
              <li>For full-page login on refresh, use a real /login route instead of only an intercept.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// app/@modal/default.js
export default function ModalDefault() {
  return null;
}

// app/layout.js
export default function Layout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Intercept modal works on click, full page on hard reload
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Photo gallery opens as a modal from the feed, but sharing the URL
              and opening in a new tab shows the full photo page. PM asks for
              modal on refresh for desktop only.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Intercepting routes with (.) and (..) apply only to client-side
              navigation from the matched segment. Hard loads hit the canonical
              URL file app/photos/[id]/page.js. That is usually correct for SEO
              and deep links; forcing modal on refresh needs an explicit parallel
              route plus default.js strategy or accepting full page on refresh.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use app/feed/(.)photos/[id]/page.js to intercept from feed context.</li>
              <li>Keep app/photos/[id]/page.js as the shareable full page for refresh and SEO.</li>
              <li>If modal on refresh is required, render modal slot on that URL with matching layout and default.js fallbacks.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// Soft nav from /feed — intercept
// app/feed/(.)photos/[id]/page.js
import PhotoModal from '@/components/PhotoModal';
export default async function InterceptedPhoto({ params }) {
  const { id } = await params;
  const photo = await getPhoto(id);
  return <PhotoModal photo={photo} />;
}

// Hard load /photos/[id] — full page (expected for share URLs)
// app/photos/[id]/page.js`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Route group changed URLs or wrong root layout
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Marketing moved pages into app/(marketing)/about but analytics
              shows 404s at /marketing/about. Another team duplicated html/body
              in (shop)/layout.js and broke nested layouts.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Parentheses route groups organize files without affecting the URL.
              Only one root layout.js should define html and body. Nested groups
              share the nearest layout unless you split incorrectly.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Place routes at app/(marketing)/about/page.js for URL /about, not /marketing/about.</li>
              <li>Use groups to swap layouts between marketing and app shells without URL segments.</li>
              <li>Never add second html/body tags in nested layouts.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// URL is /about — folder app/(marketing)/about/page.js
export default function About() {
  return <main>About us</main>;
}

// app/(marketing)/layout.js — marketing chrome only, no <html>`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Catch-all [...slug] swallowed static routes
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              /blog stopped working after adding app/[...slug]/page.js at the
              root. CMS pages work but dedicated /blog routes never match.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              More specific static segments win over catch-alls at the same level,
              but a catch-all placed too high or a conflicting dynamic segment
              can shadow routes you expected to be static. Ordering and folder
              depth matter in the tree.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Scope catch-alls under app/cms/[...slug] instead of app root.</li>
              <li>Keep first-party routes as explicit folders: app/blog/page.js.</li>
              <li>Test route specificity with next build output and integration tests.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — app/[...slug]/page.js catches everything at root

// FIXED — app/cms/[...slug]/page.js for CMS pages only
export default async function CmsPage({ params }) {
  const { slug } = await params;
  const path = slug.join('/');
  const doc = await getCmsDoc(path);
  if (!doc) notFound();
  return <Article doc={doc} />;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Optional catch-all vs catch-all — homepage 404
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Docs site using app/docs/[[...slug]]/page.js works for nested paths
              but /docs itself 404s. Switching to [...slug] broke the marketing
              homepage at / when placed wrong.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Required catch-all [...slug] needs at least one segment.
              Optional [[...slug]] also matches zero segments, so it can serve
              the index of that path when page.js lives inside the optional folder.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use [[...slug]] when /docs and /docs/intro must both resolve.</li>
              <li>Add app/docs/page.js if you use required catch-all for subpages only.</li>
              <li>Never put optional catch-all at app/[[...slug]] unless you intend to own every URL.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// /docs index 404 with required catch-all only at app/docs/[...slug]

// FIXED — app/docs/[[...slug]]/page.js
export default async function DocsPage({ params }) {
  const { slug = [] } = await params;
  const id = slug.length ? slug.join('/') : 'index';
  const page = await getDoc(id);
  return <DocView page={page} />;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Soft navigation keeps stale layout search UI
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              After filtering products server-side, client navigation shows old
              facet counts in the layout until a full reload. router.push updated
              the URL but the layout segment did not refetch.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Layouts are reused and may stay cached in the client router cache
              on soft navigation. searchParams changes in a child do not
              automatically remount a parent layout that already fetched counts.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Call router.refresh() after mutations or filter changes that must re-run server layouts.</li>
              <li>Move filter-dependent UI into the page segment or a template that remounts.</li>
              <li>Pass searchParams into the layout fetch and mark the segment dynamic if needed.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// Client filter — 'use client'
'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
export function FacetFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function apply(color) {
    const params = new URLSearchParams(searchParams);
    params.set('color', color);
    router.push(pathname + '?' + params.toString());
    router.refresh(); // re-fetch server layout + page RSC payload
  }
  return <button type="button" onClick={() => apply('red')}>Red</button>;
}`}
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b15/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Foundation Incidents
          </Link>
          <Link
            href="/learn/app-router/b15/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Data Fetching Incidents →
          </Link>
        </div>
      </div>
    </div>
  );
}
