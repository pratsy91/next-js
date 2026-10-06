import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.11: Performance Incidents - Next.js Mastery",
  description:
    "Core Web Vitals regressions, bundle bloat, cache stampedes, N+1 fetches, and Suspense boundary mistakes",
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

export default function Lesson11Page() {
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
          B15.11: Performance Incidents (B11)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Production performance outages and regressions: LCP, CLS, INP, TTFB,
          bundle size, prefetch storms, Partial Prerendering pitfalls, and N+1
          Server Components.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Homepage LCP at 4s from unoptimized hero image
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              After a marketing refresh, mobile LCP regresses from 2.1s to 4.3s.
              The hero is a full-width CSS background-image or a plain img tag
              loading a 3MB PNG.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              CSS backgrounds and unoptimized img tags are not prioritized by the
              browser, skip Next.js image optimization, and often download oversized
              assets before paint.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Replace hero with next/image, set priority on above-the-fold LCP element.</li>
              <li>Serve WebP/AVIF via sizes and fill layout with explicit dimensions.</li>
              <li>Preload only the LCP image—not every carousel slide.</li>
            </ul>
          </div>
          <CodeBlock
            code={`import Image from 'next/image';

export default function Hero() {
  return (
    <Image
      src="/hero.webp"
      alt="Product launch"
      width={1200}
      height={630}
      priority
      sizes="100vw"
      className="h-auto w-full"
    />
  );
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            CLS spike from JS-injected promo banner
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Core Web Vitals report CLS 0.25 after a consent/promo script injects
              a bar at the top post-load. Content jumps; users mis-click checkout.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Third-party or client useEffect banners mount without reserved height.
              Layout reflows when DOM height changes after first paint.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reserve min-height in CSS for the banner slot or use transform-only animations.</li>
              <li>Render a static placeholder server-side; hydrate promo inside fixed container.</li>
              <li>Load non-critical banners after LCP with lazyOnload scripts.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// Reserve space — app/layout.js snippet
<div id="promo-slot" className="min-h-12">
  <PromoBanner />
</div>

// PromoBanner — client
'use client';
import { useEffect, useState } from 'react';

export default function PromoBanner() {
  const [text, setText] = useState(null);
  useEffect(() => {
    setText('Free shipping this week');
  }, []);
  return <div className="h-12">{text ?? '\u00A0'}</div>;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Poor INP from re-rendering the whole tree on every keystroke
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Search field feels laggy on mid-range Android. RUM shows INP p75
              above 500ms. Profiler shows the entire dashboard Client Component
              re-rendering on each character.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              State for the filter input lives in a parent that also renders heavy
              charts and tables. Every onChange triggers a full subtree reconciliation
              on the main thread.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Split SearchInput into its own memoized Client Component.</li>
              <li>Debounce server queries; use useTransition for non-urgent updates.</li>
              <li>Keep expensive widgets in siblings, not under the input state owner.</li>
            </ul>
          </div>
          <CodeBlock
            code={`'use client';
import { useState, useTransition, memo } from 'react';

const Results = memo(function Results({ query }) {
  return <HeavyTable query={query} />;
});

export default function DashboardShell() {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const v = e.target.value;
    setQuery(v);
    window.clearTimeout(window.__debounce);
    window.__debounce = window.setTimeout(() => {
      startTransition(() => setDebounced(v));
    }, 200);
  }

  return (
    <>
      <input value={query} onChange={onChange} />
      {isPending && <span>Updating…</span>}
      <Results query={debounced} />
    </>
  );
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Chart library pulled into layout client bundle (+200KB)
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Bundle analyzer shows recharts in the root layout chunk. Every route
              downloads 200KB extra; Time to Interactive worsens sitewide.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              A Server Component file imported the chart, but the root layout has
              use client at the top—everything in that module graph becomes client
              JS, including heavy chart imports used on one page.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Move charts into a dedicated Client Component file under the analytics route only.</li>
              <li>dynamic(() =&gt; import(&apos;./RevenueChart&apos;), ssr: false) for that widget alone.</li>
              <li>Keep layout client boundary minimal—shell only, not feature imports.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/analytics/RevenueChartClient.js
'use client';
import dynamic from 'next/dynamic';

const RevenueChart = dynamic(() => import('./RevenueChart'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
});

export default function RevenueChartClient(props) {
  return <RevenueChart {...props} />;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            High TTFB from serial awaits in root layout
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Every navigation waits 800ms before first byte. Root layout awaits
              auth, navigation menu, and notifications one after another before
              rendering children.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Async Server Component layouts block streaming until all awaited work
              completes. Serial awaits sum latency; users stare at a blank document.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Parallelize independent fetches with Promise.all in layout or move them down.</li>
              <li>Wrap slow nav/notifications in Suspense with skeleton fallbacks.</li>
              <li>Keep layout fast—defer non-critical data to page segments.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/layout.js
import { Suspense } from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<NavSkeleton />}>
          <NavBar />
        </Suspense>
        <Suspense fallback={<NotificationsSkeleton />}>
          <Notifications />
        </Suspense>
        {children}
      </body>
    </html>
  );
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Cache stampede after deploy spikes origin CPU
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Each deploy triggers a 10-minute CPU cliff. Thousands of concurrent
              regenerations hit the database; p99 latency triples.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Global revalidate: 0 or mass tag invalidation expires every ISR entry
              at once. CDN misses align and every request becomes an origin render—
              classic cache stampede.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use sensible revalidate intervals; stagger tag revalidation batches.</li>
              <li>Keep a static shell; revalidate hot paths selectively on write.</li>
              <li>Use single-flight or background revalidation patterns where platform supports it.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// fetch with tags — not revalidate: 0 everywhere
const products = await fetch(url, {
  next: { revalidate: 300, tags: ['products'] },
});

// after admin update — targeted invalidation
import { revalidateTag } from 'next/cache';

export async function updateProduct() {
  'use server';
  await db.product.update(/* ... */);
  revalidateTag('products');
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            cache no-store on every fetch melts the database
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Team set cache: no-store on all fetches to fix stale dashboards. DB
              connections max out; query latency climbs; incident declared when
              checkout slows.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              no-store disables Data Cache entirely—every page view hits origin data
              sources. What fixed stale UI created a DDoS against your own database.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Cache read-mostly data with revalidate and tags; invalidate on mutations.</li>
              <li>Reserve no-store for truly user-specific or auth-sensitive fetches only.</li>
              <li>Monitor cache hit ratio after changes.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// reads — cached with tag
await fetch(API_URL, { next: { tags: ['inventory'], revalidate: 60 } });

// write path
'use server';
import { revalidateTag } from 'next/cache';

export async function adjustStock(sku, delta) {
  await db.inventory.update({ where: { sku }, data: { qty: { increment: delta } } });
  revalidateTag('inventory');
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            dynamic ssr false on the whole page empties SEO HTML
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Product landing pages disappear from Google. View-source shows an empty
              shell because the page component was dynamically imported with ssr:
              false to silence window errors.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              ssr: false skips server rendering for that module—crawlers and users
              without JS see no meaningful content. Applying it to the page root
              instead of a small widget destroys SEO.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Server-render marketing copy and metadata in the Server Component page.</li>
              <li>dynamic import only the modal/map/chart that needs window.</li>
              <li>Verify with curl and Rich Results after deploy.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/product/[slug]/page.js — SEO on server
import dynamic from 'next/dynamic';

const SizeGuideModal = dynamic(() => import('./SizeGuideModal'), { ssr: false });

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);
  return (
    <article>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <SizeGuideModal />
    </article>
  );
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Prefetch storm on dashboard with 100+ links
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Admin sidebar lists every customer route. Opening the dashboard fires
              dozens of parallel RSC prefetches; API rate limits trip and the tab
              freezes.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Next.js Link prefetches visible routes by default in production. Hundreds
              of in-viewport admin links enqueue server work and JSON flight data
              simultaneously.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Set prefetch=false on bulk admin or off-screen navigation links.</li>
              <li>Paginate or virtualize long link lists.</li>
              <li>Prefetch only high-traffic destinations explicitly if needed.</li>
            </ul>
          </div>
          <CodeBlock
            code={`import Link from 'next/link';

export function AdminNav({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} prefetch={false}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            PPR blocked because cookies() sits above Suspense
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Team enabled Partial Prerendering expecting a static shell with a dynamic
              hole, but TTFB stays fully dynamic. Static shell never ships; build
              marks the whole layout dynamic.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              cookies() in root layout above the Suspense boundary forces the entire
              tree to wait for request-specific data before any static shell streams.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Move cookies() into the dynamic child inside Suspense.</li>
              <li>Keep root layout free of request APIs; static header/footer outside.</li>
              <li>Validate with next build output which segments are static vs dynamic.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/layout.js — static shell
import { Suspense } from 'react';
import { UserGreeting } from './UserGreeting';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>Static brand nav</header>
        <Suspense fallback={<span>Hi…</span>}>
          <UserGreeting />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

// UserGreeting.js — dynamic hole
import { cookies } from 'next/headers';

export async function UserGreeting() {
  const name = cookies().get('displayName')?.value ?? 'Guest';
  return <span>Hi, {name}</span>;
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            N+1 fetches — 50 review components each hit the API
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Product page timeout under load. Each ReviewCard Server Component
              fetches author data independently—50 reviews, 50 DB round trips per
              page view.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Composing lists from child Server Components that fetch their own data
              looks clean but duplicates work. React does not batch separate fetch
              calls across sibling components automatically at the data layer.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Fetch reviews + authors in the page with one query or JOIN.</li>
              <li>Pass plain props to presentational Server Components.</li>
              <li>Use dataloaders or IN queries instead of per-row fetches.</li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/product/[id]/page.js
export default async function ProductPage({ params }) {
  const { id } = await params;
  const reviews = await db.review.findMany({
    where: { productId: id },
    include: { author: true },
    take: 50,
  });
  return (
    <ul>
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} author={r.author} />
      ))}
    </ul>
  );
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Tag manager blocks LCP
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Marketing adds GTM in head with default sync loading. LCP element delays
              1.2s; Lighthouse flags third-party main-thread work as the bottleneck.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Raw script tags in layout compete with hero image download and block
              hydration. Tag containers often chain more scripts before paint.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              How to fix
            </h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use next/script with strategy afterInteractive or lazyOnload.</li>
              <li>Measure before/after with Lighthouse and field LCP.</li>
              <li>Trim tags; load analytics after primary content.</li>
            </ul>
          </div>
          <CodeBlock
            code={`import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          id="gtm"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXX"
        />
      </body>
    </html>
  );
}`}
            language="javascript"
          />
        </section>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
        <Link
          href="/learn/app-router/b15/lesson-10"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ← Previous: B15.10
        </Link>
        <Link
          href="/learn/app-router/b15/lesson-12"
          className="rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Next: B15.12 →
        </Link>
      </nav>
    </div>
  );
}
