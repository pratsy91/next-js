import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.11: Optimization (B11) - Most Asked Interview Questions",
  description:
    "Most asked Next.js App Router interview questions on performance, Core Web Vitals, caching, PPR, and SEO",
};

export default function Lesson11Page() {
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
          B14.11: Optimization (B11)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The most frequently asked interview questions on Next.js performance
          optimization — Core Web Vitals, caching layers, code splitting, PPR,
          streaming, and SEO.
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
            1. How do you optimize a Next.js App Router application?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              A layered approach works best:
            </p>
            <ol className="list-inside list-decimal space-y-2">
              <li>
                <strong>Rendering strategy</strong> — static/ISR where possible,
                dynamic only when needed
              </li>
              <li>
                <strong>Data fetching</strong> — parallel fetches, appropriate
                cache/revalidate settings
              </li>
              <li>
                <strong>Bundle size</strong> — dynamic imports, tree shaking,
                analyze with @next/bundle-analyzer
              </li>
              <li>
                <strong>Assets</strong> — next/image, next/font, next/script
              </li>
              <li>
                <strong>Streaming</strong> — Suspense boundaries, loading.js
              </li>
              <li>
                <strong>Measure</strong> — Lighthouse, Web Vitals, real user monitoring
              </li>
            </ol>
            <p>
              The App Router gives you Server Components by default — leverage
              them to keep JavaScript off the client unless interactivity requires it.
            </p>
          </div>
        </section>

        {/* Q2 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            2. Explain Core Web Vitals — LCP, CLS, INP
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Google&apos;s Core Web Vitals measure real-user experience and
              affect SEO ranking:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong>LCP (Largest Contentful Paint)</strong> — time until the
                largest visible element renders. Target: &lt;2.5s. Optimize with
                priority images, font preloading, reducing TTFB, and static/ISR
                rendering.
              </li>
              <li>
                <strong>CLS (Cumulative Layout Shift)</strong> — visual stability;
                how much content jumps. Target: &lt;0.1. Fix with explicit
                image dimensions, next/font, reserved space for dynamic content.
              </li>
              <li>
                <strong>INP (Interaction to Next Paint)</strong> — replaced FID;
                measures responsiveness to user input. Target: &lt;200ms. Reduce
                with smaller JS bundles, defer non-critical scripts, avoid long
                main-thread tasks.
              </li>
            </ul>
          </div>
          <CodeBlock
            code={`// LCP optimization — hero image
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={630}
  priority          // Preload LCP candidate
  sizes="100vw"
  placeholder="blur"
  blurDataURL={blurData}
/>

// CLS prevention — always set dimensions
<Image src="/avatar.jpg" width={48} height={48} alt="User" />`}
            language="javascript"
          />
        </section>

        {/* Q3 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            3. Deep dive: the four caching layers in Next.js
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Next.js App Router has four distinct caches — interviewers love this
              question:
            </p>
            <ol className="list-inside list-decimal space-y-3">
              <li>
                <strong>Request Memoization</strong> — deduplicates identical{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">fetch</code>{" "}
                calls within a single render pass. Automatic, per-request only.
              </li>
              <li>
                <strong>Data Cache</strong> — persists fetch results across
                requests and deployments (until revalidated). Control with{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">cache: 'force-cache'</code>{" "}
                or{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">next: &#123; revalidate: N &#125;</code>.
              </li>
              <li>
                <strong>Full Route Cache</strong> — caches rendered HTML/RSC
                payload at build time (static) or on first request (dynamic with
                revalidate). Stored on server/CDN.
              </li>
              <li>
                <strong>Router Cache</strong> — client-side in-memory cache of
                RSC payloads during SPA navigation. Soft navigation reuses cached
                segments. Cleared on refresh or{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">router.refresh()</code>.
              </li>
            </ol>
          </div>
          <CodeBlock
            code={`// Layer 2: Data Cache control
fetch('https://api.example.com/posts', {
  next: { revalidate: 3600, tags: ['posts'] },
});

fetch('https://api.example.com/user', {
  cache: 'no-store', // Opt out of Data Cache
});

// Invalidate Data Cache
import { revalidateTag, revalidatePath } from 'next/cache';
revalidateTag('posts');
revalidatePath('/blog');

// Layer 4: Router Cache — client soft nav reuses cached RSC payload
// router.refresh() busts Router Cache for current route`}
            language="javascript"
          />
        </section>

        {/* Q4 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            4. dynamic() import and ssr: false — how do they work?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">next/dynamic</code>{" "}
              code-splits components into separate bundles loaded on demand.
              Options include{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">loading</code>{" "}
              fallback UI,{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">ssr: false</code>{" "}
              to skip server rendering (client-only), and{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">ssr: true</code>{" "}
              (default) for SSR of the dynamic component.
            </p>
            <p>
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">ssr: false</code>{" "}
              only works in Client Components — the component renders only after
              hydration. Use for browser-only libraries (charts, maps, editors)
              that access{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">window</code>.
            </p>
          </div>
          <CodeBlock
            code={`import dynamic from 'next/dynamic';

// Client-only — no SSR (browser APIs)
const Chart = dynamic(() => import('@/components/Chart'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});

// SSR enabled (default) — still code-split
const HeavyTable = dynamic(() => import('@/components/HeavyTable'), {
  loading: () => <TableSkeleton />,
});

// Server Component can import dynamic Client Components
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Chart data={data} />
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q5 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            5. When to use loading.js vs Suspense?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>loading.js</strong> — file-convention that automatically
              wraps a route segment in a Suspense boundary. Shows instant loading
              UI during navigation for the entire page/segment. Zero boilerplate.
            </p>
            <p>
              <strong>Suspense</strong> — manual, granular boundaries around
              specific async components within a page. One slow component does not
              block the entire page — other content streams immediately.
            </p>
            <p>
              <strong>Best practice:</strong> use{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">loading.js</code>{" "}
              for route-level skeletons; use inline{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">&lt;Suspense&gt;</code>{" "}
              for component-level streaming within a page (e.g., sidebar loads
              instantly, feed streams in).
            </p>
          </div>
          <CodeBlock
            code={`// app/dashboard/loading.js — route-level
export default function Loading() {
  return <DashboardSkeleton />;
}

// app/dashboard/page.js — component-level Suspense
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <aside>Static sidebar — renders immediately</aside>
      <main>
        <Suspense fallback={<FeedSkeleton />}>
          <Feed /> {/* async Server Component */}
        </Suspense>
        <Suspense fallback={<StatsSkeleton />}>
          <Stats /> {/* independent async boundary */}
        </Suspense>
      </main>
    </div>
  );
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
            6. How do you reduce bundle size?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <ul className="list-inside list-disc space-y-2">
              <li>
                Prefer Server Components — zero client JS for static UI
              </li>
              <li>
                Dynamic import heavy Client Components
              </li>
              <li>
                Import only what you need:{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">import &#123; debounce &#125; from 'lodash/debounce'</code>
              </li>
              <li>
                Analyze with{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">@next/bundle-analyzer</code>
              </li>
              <li>
                Replace heavy libraries (moment → date-fns/dayjs)
              </li>
              <li>
                Use modular icon imports instead of full icon packs
              </li>
              <li>
                Audit Client Component boundaries — push interactivity to leaf nodes
              </li>
            </ul>
          </div>
          <CodeBlock
            code={`// next.config.js — bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});

// Run: ANALYZE=true npm run build

// ❌ Imports entire lodash (~70KB)
import _ from 'lodash';

// ✅ Tree-shakeable import
import debounce from 'lodash/debounce';`}
            language="javascript"
          />
        </section>

        {/* Q7 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            7. What is the performance impact of Link prefetching?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">&lt;Link&gt;</code>{" "}
              prefetches linked routes when they enter the viewport (production
              only). Prefetched routes load their RSC payload into the Router
              Cache, making subsequent navigation near-instant.
            </p>
            <p>
              <strong>Tradeoffs:</strong> prefetching uses bandwidth and server
              resources for routes the user may never visit. Disable with{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">prefetch=&#123;false&#125;</code>{" "}
              for low-priority links (logout, admin-only pages). Static routes
              prefetch fully; dynamic routes prefetch partially (down to nearest
              loading.js boundary).
            </p>
          </div>
          <CodeBlock
            code={`import Link from 'next/link';

// Default: prefetches in viewport
<Link href="/dashboard">Dashboard</Link>

// Disable for expensive/dynamic routes
<Link href="/admin/reports" prefetch={false}>
  Reports (heavy, admin-only)
</Link>`}
            language="javascript"
          />
        </section>

        {/* Q8 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            8. Image, font, and script optimization recap
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>next/image</strong> — automatic WebP/AVIF, lazy loading,
              responsive sizes, blur placeholder. Set{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">priority</code>{" "}
              on LCP image. Always provide{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">width/height</code>{" "}
              or{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">fill</code>{" "}
              with{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">sizes</code>.
            </p>
            <p>
              <strong>next/font</strong> — self-hosts fonts, zero layout shift,
              no external requests. Eliminates CLS from font loading.
            </p>
            <p>
              <strong>next/script</strong> —{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">beforeInteractive</code>{" "}
              (critical),{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">afterInteractive</code>{" "}
              (default),{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">lazyOnload</code>{" "}
              (low priority). Prevents render-blocking third-party scripts.
            </p>
          </div>
        </section>

        {/* Q9 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            9. What is Partial Prerendering (PPR)?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              PPR combines static and dynamic rendering in a <strong>single
              route</strong>. The static shell (layout, header, static content)
              is prerendered at build time and served instantly from CDN. Dynamic
              holes (personalized widgets, cart count) stream in via Suspense
              boundaries at request time.
            </p>
            <p>
              Enable with{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">experimental.ppr = true</code>{" "}
              in next.config and{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">export const experimental_ppr = true</code>{" "}
              on routes. PPR gives you static performance with dynamic
              personalization — the best of both worlds for e-commerce, dashboards,
              and content sites with personalized sidebars.
            </p>
          </div>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  experimental: { ppr: true },
};

// app/product/[id]/page.js
export const experimental_ppr = true;

export default function ProductPage({ params }) {
  return (
    <div>
      {/* Static shell — prerendered at build */}
      <ProductHeader id={params.id} />
      <ProductDescription id={params.id} />

      {/* Dynamic hole — streams at request time */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <PersonalizedRecommendations userId={getUserId()} />
      </Suspense>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q10 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            10. How do you measure performance (Lighthouse, Web Vitals)?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong>Lighthouse</strong> — lab data in Chrome DevTools; good
                for CI and debugging
              </li>
              <li>
                <strong>next/web-vitals</strong> — report real-user metrics to
                analytics
              </li>
              <li>
                <strong>Vercel Speed Insights</strong> — built-in RUM on Vercel
              </li>
              <li>
                <strong>Chrome UX Report (CrUX)</strong> — field data Google uses
                for ranking
              </li>
            </ul>
          </div>
          <CodeBlock
            code={`// app/layout.js — report Web Vitals
'use client';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Send to analytics: metric.name, metric.value, metric.rating
    console.log(metric.name, metric.value);
    // analytics.track(metric.name, { value: metric.value });
  });
  return null;
}

// Metrics reported: CLS, FCP, FID, INP, LCP, TTFB`}
            language="javascript"
          />
        </section>

        {/* Q11 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            11. How do you avoid request waterfalls?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Waterfalls occur when sequential awaits block each other. In Server
              Components, child components that fetch independently still run in
              parallel by default (React streams them). Problems arise when you
              chain dependent fetches unnecessarily or fetch in Client Components
              after hydration.
            </p>
            <p>
              <strong>Fixes:</strong> use{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">Promise.all()</code>{" "}
              for independent data, fetch at the highest common ancestor and pass
              props down, use preload patterns, and avoid Client Component
              useEffect fetching for data available at render time.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ Waterfall — sequential awaits
const user = await fetchUser(id);
const posts = await fetchPosts(user.id); // depends on user — OK
const tags = await fetchTags();          // independent but waited!

// ✅ Parallel independent fetches
const user = await fetchUser(id);
const [posts, tags] = await Promise.all([
  fetchPosts(user.id),
  fetchTags(),
]);

// ✅ Preload pattern
const userPromise = fetchUser(id);
const user = await userPromise;
const posts = await fetchPosts(user.id);`}
            language="javascript"
          />
        </section>

        {/* Q12 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            12. Memoization and the React Compiler — what should you know?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Traditional optimization:{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">React.memo</code>,{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">useMemo</code>,{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">useCallback</code>{" "}
              to prevent unnecessary re-renders in Client Components.
            </p>
            <p>
              The <strong>React Compiler</strong> (React 19+) automatically
              memoizes components and hooks at compile time, reducing the need
              for manual memoization. Next.js integrates experimental React
              Compiler support via{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">experimental.reactCompiler</code>.
            </p>
            <p>
              <strong>Interview angle:</strong> Server Components reduce the need
              for client memoization entirely. Apply memoization only in Client
              Components with expensive renders or frequently re-rendering parents.
              With React Compiler, manual memo becomes less necessary over time.
            </p>
          </div>
        </section>

        {/* Q13 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            13. What is the relationship between SEO and performance?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Google uses Core Web Vitals as a ranking signal. Fast, stable pages
              rank better and have lower bounce rates. Next.js helps SEO through:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Server-rendered HTML — crawlers get full content immediately</li>
              <li>Metadata API — proper titles, descriptions, OG tags</li>
              <li>Static/ISR — fast TTFB from CDN</li>
              <li>sitemap.js / robots.js — programmatic SEO files</li>
              <li>Structured data (JSON-LD) in Server Components</li>
            </ul>
            <p>
              Performance without SEO metadata is incomplete — always pair
              technical performance with proper metadata, semantic HTML, and
              accessible markup.
            </p>
          </div>
        </section>

        {/* Q14 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            14. Common performance interview scenarios
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>&quot;Dashboard is slow on first load&quot;</strong> — audit
              Client Component tree, dynamic import charts, move data fetching to
              Server Components, add Suspense boundaries.
            </p>
            <p>
              <strong>&quot;Blog posts show stale content&quot;</strong> — check
              revalidate settings, on-demand revalidation via webhooks, cache tags.
            </p>
            <p>
              <strong>&quot;Navigation feels sluggish&quot;</strong> — check Router
              Cache, prefetch settings, reduce RSC payload size, avoid force-dynamic
              on static-looking pages.
            </p>
            <p>
              <strong>&quot;High LCP on mobile&quot;</strong> — priority hero image,
              reduce TTFB with static/ISR, optimize server response, CDN caching.
            </p>
          </div>
        </section>

        {/* Q15 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            15. Cache invalidation strategies
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Choose invalidation based on data freshness requirements:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong>Time-based (ISR)</strong> —{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">revalidate: 3600</code>{" "}
                for content that can be slightly stale
              </li>
              <li>
                <strong>On-demand by path</strong> —{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">revalidatePath('/blog')</code>{" "}
                after CMS publish
              </li>
              <li>
                <strong>On-demand by tag</strong> —{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">revalidateTag('products')</code>{" "}
                invalidates all fetches tagged &apos;products&apos;
              </li>
              <li>
                <strong>No cache</strong> —{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">cache: 'no-store'</code>{" "}
                or{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">dynamic = 'force-dynamic'</code>{" "}
                for real-time data
              </li>
              <li>
                <strong>Client bust</strong> —{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">router.refresh()</code>{" "}
                after Server Action mutations
              </li>
            </ul>
          </div>
          <CodeBlock
            code={`// CMS webhook → Route Handler
import { revalidateTag } from 'next/cache';

export async function POST(request) {
  const body = await request.json();
  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidateTag(\`post-\${body.slug}\`);
  revalidatePath('/blog');
  return Response.json({ revalidated: true });
}

// Tagged fetch
fetch(url, { next: { tags: [\`post-\${slug}\`] } });`}
            language="javascript"
          />
        </section>

        {/* Q16 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            16. How does streaming improve perceived performance?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Streaming sends HTML/RSC payload to the browser incrementally as
              Server Components resolve, rather than waiting for all data. Users
              see layout and fast content immediately while slow sections load.
            </p>
            <p>
              Combine with Suspense fallbacks for skeleton UI. TTFB improves
              because the response starts immediately. Total load time may be
              similar, but perceived performance is much better — users can
              interact with loaded sections while others stream in.
            </p>
          </div>
        </section>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
        <Link
          href="/learn/app-router/b14/lesson-10"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ← Previous: B14.10 Advanced Features
        </Link>
        <Link
          href="/learn/app-router/b14/lesson-12"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Next: B14.12 Deployment →
        </Link>
      </nav>
    </div>
  );
}
