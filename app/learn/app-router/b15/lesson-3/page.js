import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.3: Data Fetching Incidents - Next.js Mastery",
  description:
    "Stale cache, accidental dynamic routes, waterfalls, and revalidation bugs in production (maps to B3)",
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

export default function Lesson3Page() {
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
          B15.3: Data Fetching Incidents
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Caching wins until prices stay stale, builds fail without DATABASE_URL,
          or a webhook revalidation silently no-ops. These scenarios mirror
          on-call tickets on Next 14–16 Data Cache behavior.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Users see yesterday&apos;s prices after admin update
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Ops updates pricing in the admin CMS. Database rows are correct but
              the storefront still shows old numbers for hours until deploy.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              fetch in Server Components defaults to caching in the Data Cache.
              Without revalidate or tags, the first rendered response is reused
              indefinitely across requests and static pages.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Set next: revalidate seconds or cache: no-store for truly live pricing.</li>
              <li>Tag fetches and call revalidateTag from the admin Server Action or webhook.</li>
              <li>Document which routes are static vs time-based ISR for support runbooks.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — cached forever
const res = await fetch('https://api.example.com/prices');

// FIXED — ISR every 60s + tag for admin bust
const res = await fetch('https://api.example.com/prices', {
  next: { revalidate: 60, tags: ['prices'] },
});

// admin action
'use server';
import { revalidateTag } from 'next/cache';
export async function publishPrices() {
  await syncPrices();
  revalidateTag('prices');
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Loading spinner never ends — Promise in JSX
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The dashboard shows an infinite skeleton. React DevTools shows a
              Promise object as child text instead of resolved data.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Async Server Components must await promises before returning JSX.
              Passing getOrders() without await returns a Promise into the tree,
              which React does not auto-resolve in render.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Mark the component async and await each fetch before return.</li>
              <li>Split slow lists into child async components wrapped in Suspense.</li>
              <li>Use the React use() hook only in Client Components with a passed promise from server.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN
export default function Dashboard() {
  const orders = getOrders(); // Promise
  return <OrderList orders={orders} />;
}

// FIXED
export default async function Dashboard() {
  const orders = await getOrders();
  return <OrderList orders={orders} />;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Marketing page became dynamic on every request
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              After adding a tiny personalization banner, Vercel analytics shows
              the landing page as dynamic with TTFB spiking. It used to be static.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Calling cookies(), headers(), draftMode(), or uncached fetch with
              cache: no-store opts the route into dynamic rendering. Using new
              Date() in render also forces per-request output.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Keep the static marketing shell; move personalization to a client island or separate dynamic segment.</li>
              <li>In Next 15+, await cookies() only in the dynamic subtree, not the static parent page.</li>
              <li>Run next build and read the route table for static vs dynamic markers.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — app/page.js reads cookies in static landing
import { cookies } from 'next/headers';
export default async function Home() {
  const store = await cookies();
  const promo = store.get('promo')?.value;
  return <Hero promo={promo} />;
}

// FIXED — static hero + dynamic slot
export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}><PromoBanner /></Suspense>
    </>
  );
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Sequential await waterfall — 3s TTFB
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Product page waits for user profile, recommendations, and reviews
              one after another. Each call is 300ms but TTFB is ~900ms plus render.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              await chains in one async component run serially. Independent IO
              should start together so the event loop can overlap network latency.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Start promises first, then await Promise.all for independent data.</li>
              <li>Split optional sections into sibling async components with Suspense.</li>
              <li>Profile with Server-Timing or logging timestamps per fetch.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN
const user = await getUser(id);
const recs = await getRecs(id);
const reviews = await getReviews(id);

// FIXED
const userP = getUser(id);
const recsP = getRecs(id);
const reviewsP = getReviews(id);
const [user, recs, reviews] = await Promise.all([userP, recsP, reviewsP]);`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Whole page waits — missing Suspense on slow section
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Hero and footer are instant in design, but users see nothing until
              the comments widget finishes a slow third-party API call.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              A single async page awaits the slowest fetch before sending HTML.
              Without Suspense boundaries, streaming cannot flush fast content first.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Extract Comments into an async child wrapped in Suspense with a skeleton fallback.</li>
              <li>Pair with loading.js on the segment for route-level fallback.</li>
              <li>Keep above-the-fold data in the parent that resolves first.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Hero />
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments />
      </Suspense>
    </>
  );
}

async function Comments() {
  const data = await fetchComments();
  return <CommentList data={data} />;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            No generateStaticParams — product pages timeout on demand
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Catalog has 50k SKUs. First visitor to obscure products triggers
              serverless timeouts and 504s because every slug renders at request time.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Dynamic segments without generateStaticParams still work but cold
              paths pay full render cost on first hit. At scale you need prebuilt
              top paths plus a sensible fallback strategy.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Implement generateStaticParams for popular IDs and paginate the rest.</li>
              <li>Use dynamicParams true with ISR revalidate for long tail SKUs.</li>
              <li>Monitor on-demand generation errors and backfill static paths from analytics.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`export async function generateStaticParams() {
  const top = await db.product.findMany({ take: 500, orderBy: { views: 'desc' } });
  return top.map(p => ({ id: String(p.id) }));
}

export const dynamicParams = true;
export const revalidate = 3600;

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();
  return <ProductView product={product} />;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            revalidatePath called but CDN still serves stale JSON
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Admin publish calls revalidatePath('/products') but product cards
              fed by a tagged fetch stay old until TTL expires.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              revalidatePath invalidates a route segment cache; revalidateTag
              invalidates Data Cache entries tagged on fetch. Mismatched paths,
              layout type, or missing tags leave some layers warm-stale.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Tag upstream fetches and revalidateTag the same tag on mutation.</li>
              <li>Call revalidatePath for page segments that embed the stale RSC payload.</li>
              <li>Verify external CDN cache headers if a proxy sits in front of Next.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`await fetch(api, { next: { tags: ['products'] } });

'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
export async function afterProductSave() {
  revalidateTag('products');
  revalidatePath('/products');
  revalidatePath('/products/[id]', 'page');
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Webhook revalidation never runs — secret or static handler
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              CMS webhook logs 401 from /api/revalidate. Even after fixing the
              secret, some deploys still ignore POST because the handler was cached at build time.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Wrong REVALIDATE_SECRET, missing Authorization header check, or a
              statically optimized route handler that never executes fresh logic on
              each webhook hit.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>export const dynamic = 'force-dynamic' or runtime config on the webhook route.</li>
              <li>Compare secrets with timing-safe equals and return 401 on mismatch.</li>
              <li>Log tag and path revalidated; alert on non-2xx webhook responses in CMS.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// app/api/revalidate/route.js
export const dynamic = 'force-dynamic';

import { revalidateTag } from 'next/cache';

export async function POST(request) {
  const secret = request.headers.get('x-revalidate-secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const body = await request.json();
  revalidateTag(body.tag);
  return Response.json({ revalidated: true });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Request memoization — duplicate fetch still looks stale later
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Engineer expects one DB hit per request but sees two identical
              queries. After mutation in the same request, they expect fresh data
              but still read memoized results from earlier in the render.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              React request memoization dedupes identical fetch calls during one
              server render pass. It is not the persistent Data Cache and does not
              survive across requests or after you need post-mutation freshness in
              the same render without re-fetching differently.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reuse a single awaited fetch result via props instead of calling twice.</li>
              <li>After writes, revalidateTag or read with cache: no-store for that read path.</li>
              <li>Do not confuse per-request dedupe with long-lived cached fetch defaults.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// Same URL + options in one render — deduped to one network call
async function Header() {
  const user = await fetch('/api/me', { cache: 'force-cache' });
  return <Nav user={user} />;
}
async function Sidebar() {
  const user = await fetch('/api/me', { cache: 'force-cache' });
  return <Side user={user} />;
}

// After mutation in same action — use revalidateTag or no-store read`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Client useEffect fetch — empty SEO and layout shift
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Google Search Console shows soft 404s on blog posts because HTML
              lacks article body until JavaScript runs. CLS spikes when content pops in.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Client-only data fetching leaves the initial response as a shell.
              Crawlers and slow networks see blank main content.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Fetch article in async Server Component page and stream HTML with content.</li>
              <li>Reserve client fetch for user-specific widgets below the fold.</li>
              <li>Align generateMetadata with the same server data source.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — 'use client' page with useEffect fetch

// FIXED — app/blog/[slug]/page.js
export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article><h1>{post.title}</h1><div>{post.body}</div></article>;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Database at build time — CI missing DATABASE_URL
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              next build fails in GitHub Actions with PrismaClientInitializationError
              while local build succeeds with a populated .env.local.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              generateStaticParams or static pages that query the DB at build time
              require live credentials in CI. Preview databases may also block inbound IPs.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Mark data-heavy routes dynamic or fetch at request time when build DB is unavailable.</li>
              <li>Provide CI secrets or stub generateStaticParams to return [] with dynamicParams true.</li>
              <li>Separate build-time content from runtime API using CMS static export when possible.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`export const dynamic = 'force-dynamic'; // skip static DB at build

// Or guard generateStaticParams
export async function generateStaticParams() {
  if (!process.env.DATABASE_URL) return [];
  const rows = await db.page.findMany({ select: { slug: true } });
  return rows.map(r => ({ slug: r.slug }));
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Cache stampede after revalidateTag on a hot page
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Flash sale publish triggers revalidateTag on homepage. Traffic spike
              knocks over the origin as thousands of concurrent regenerations hit
              the database.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Invalidating a hot tag without stale-while-revalidate strategy lets
              every request miss cache at once. Setting cache: no-store everywhere
              as a panic fix makes it worse long term.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use short revalidate windows for hot pages so most traffic hits warm cache.</li>
              <li>Pre-warm critical paths after tag invalidation from a background job.</li>
              <li>Protect origin with rate limits and single-flight regeneration patterns at the CDN layer.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// Prefer bounded staleness on homepage fetch
await fetch(HOME_API, { next: { revalidate: 30, tags: ['home'] } });

// After admin publish — revalidateTag then warm
revalidateTag('home');
await fetch(process.env.SITE_URL, { headers: { 'x-warm': '1' } });`}
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b15/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Routing Incidents
          </Link>
          <Link
            href="/learn/app-router/b15/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Server Action Incidents →
          </Link>
        </div>
      </div>
    </div>
  );
}
