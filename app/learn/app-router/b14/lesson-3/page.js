import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.3: Data Fetching - Next.js Mastery",
  description:
    "Most asked interview questions on fetch, caching, static/dynamic rendering, and streaming",
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
          href="/learn/app-router/b14"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B14 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B14.3: Data Fetching
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Most asked interview questions on Server Component fetching, caching,
          static vs dynamic rendering, and streaming (maps to B3).
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            How do you fetch data in App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Fetch directly in async Server Components
              using fetch(), ORM calls, or any server-side API — no getServerSideProps needed.
            </p>
            <CodeBlock
              code={`// app/products/page.js
export default async function ProductsPage() {
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What are the fetch cache options in Next.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Pass a <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">cache</code> option or use <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">next.revalidate</code> / <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">next.tags</code>:</p>
            <CodeBlock
              code={`// Default — cached indefinitely (static)
await fetch('https://api.example.com/data');

// Never cache — always fresh (dynamic)
await fetch('https://api.example.com/data', { cache: 'no-store' });

// Revalidate every 60 seconds (ISR-like)
await fetch('https://api.example.com/data', { next: { revalidate: 60 } });

// Tag for on-demand revalidation
await fetch('https://api.example.com/data', { next: { tags: ['products'] } });`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Static vs Dynamic rendering — what makes a route dynamic?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> A route becomes dynamic when Next.js cannot statically prerender it at build time.</p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Using <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">cookies()</code> or <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">headers()</code></li>
              <li>Using <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">searchParams</code> without static generation</li>
              <li>fetch with <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">cache: &apos;no-store&apos;</code></li>
              <li><code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">export const dynamic = &apos;force-dynamic&apos;</code></li>
              <li>unstable_noStore() / connection() (Next.js 15+)</li>
            </ul>
            <p>Static routes are prerendered at build and served from cache/CDN.</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is ISR in App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Incremental Static Regeneration regenerates
              static pages in the background after a revalidation interval. In App
              Router, use fetch with{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">next: &#123; revalidate: N &#125;</code>{" "}
              or route segment config.
            </p>
            <CodeBlock
              code={`// Time-based revalidation (ISR)
await fetch('https://api.example.com/posts', { next: { revalidate: 3600 } });

// Or segment-level
export const revalidate = 3600; // revalidate every hour`}
              language="javascript"
            />
            <p>First request after expiry triggers background regeneration; stale content served until fresh.</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is the difference between revalidatePath and revalidateTag?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>revalidatePath(&apos;/blog&apos;):</strong> Invalidates a specific URL path and its data</li>
              <li><strong>revalidateTag(&apos;posts&apos;):</strong> Invalidates all fetch requests tagged with that tag — granular cache busting</li>
            </ul>
            <CodeBlock
              code={`'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function createPost() {
  await db.post.create({ /* ... */ });
  revalidateTag('posts');       // bust all fetches tagged 'posts'
  revalidatePath('/blog');      // refresh /blog page cache
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            What are the four caching layers in Next.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ol className="ml-4 list-inside list-decimal space-y-2">
              <li><strong>Request Memoization:</strong> Dedupes identical fetch in one render pass (React cache)</li>
              <li><strong>Data Cache:</strong> Persists fetch results across requests (server-side, survives renders)</li>
              <li><strong>Full Route Cache:</strong> Caches rendered HTML + RSC payload of static routes at build</li>
              <li><strong>Router Cache (Client):</strong> Client-side cache of RSC payloads for soft navigation</li>
            </ol>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Request memoization vs Data Cache — what is the difference?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>Request memoization:</strong> Per-request only; same fetch URL in one tree = one network call; gone after response</li>
              <li><strong>Data Cache:</strong> Cross-request persistence; survives multiple users/requests until revalidation or no-store</li>
            </ul>
            <CodeBlock
              code={`// Both ProductList and ProductCount share one fetch per request (memoization)
async function ProductList() {
  const products = await fetch('https://api.example.com/products');
  // ...
}
async function ProductCount() {
  const products = await fetch('https://api.example.com/products'); // deduped
  // ...
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            How does streaming work in App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> The server sends HTML in chunks as async
              Server Components resolve. Fast content appears immediately; slow
              segments stream in when ready — no need to wait for all data.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Enabled by React Suspense and async Server Components</li>
              <li>loading.js auto-wraps routes in Suspense</li>
              <li>Improves TTFB and perceived performance</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Why wrap components in Suspense?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Suspense defines a boundary where React can show fallback UI while async children load, enabling streaming without blocking the entire page.</p>
            <CodeBlock
              code={`import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        <SlowAnalytics />  {/* async Server Component */}
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <SlowActivity />
      </Suspense>
    </div>
  );
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Parallel vs sequential data fetching — which is better?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Parallel is faster when requests are independent. Sequential is required when one fetch depends on another&apos;s result.</p>
            <CodeBlock
              code={`// ❌ Sequential — total time = A + B
const user = await getUser();
const posts = await getPosts(user.id);

// ✅ Parallel — total time = max(A, B)
const [user, settings] = await Promise.all([getUser(), getSettings()]);`}
              language="javascript"
            />
            <p>Split independent slow fetches into separate async components wrapped in Suspense for parallel streaming.</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            When should you fetch on the client instead?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Use client fetching when:</p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Data depends on client-only state (scroll position, input, WebSocket)</li>
              <li>Polling or real-time updates after page load</li>
              <li>User-specific data that changes frequently without full navigation</li>
            </ul>
            <CodeBlock
              code={`'use client';
import useSWR from 'swr';

export default function LivePrice() {
  const { data } = useSWR('/api/price', fetcher, { refreshInterval: 5000 });
  return <span>{data?.price}</span>;
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is generateStaticParams?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Pre-generates static pages for dynamic
              routes at build time — App Router equivalent of getStaticPaths.
            </p>
            <CodeBlock
              code={`// app/blog/[slug]/page.js
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <Article post={post} />;
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            How do cookies() and headers() affect dynamic rendering?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Reading request-specific data via{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">cookies()</code>{" "}
              or <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">headers()</code>{" "}
              opts the route into dynamic rendering — output varies per request.
            </p>
            <CodeBlock
              code={`import { cookies } from 'next/headers';

export default async function Dashboard() {
  const session = cookies().get('session');
  const user = await getUser(session?.value);
  return <div>Welcome {user.name}</div>;
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            What are unstable_noStore() and connection()?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Explicit APIs to opt out of static caching:</p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>unstable_noStore():</strong> Marks route/data as dynamic — no static prerender</li>
              <li><strong>connection():</strong> (Next.js 15+) Waits for incoming request — forces dynamic; replaces some noStore use cases</li>
            </ul>
            <CodeBlock
              code={`import { unstable_noStore as noStore } from 'next/cache';
import { connection } from 'next/server';

export default async function Page() {
  await connection(); // ensure dynamic rendering
  noStore();          // opt out of data cache
  const data = await fetchLiveData();
  return <div>{data}</div>;
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            How do you fetch from a database in a Server Component?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Import your ORM/DB client directly — it runs only on the server.</p>
            <CodeBlock
              code={`// app/users/page.js
import { db } from '@/lib/db';

export default async function UsersPage() {
  const users = await db.user.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.email}</li>)}
    </ul>
  );
}`}
              language="javascript"
            />
            <p>Never import db clients into Client Components — secrets and connection pools stay server-side.</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            How does fetch deduplication work?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> During a single server render, identical
              fetch requests (same URL + options) are automatically deduplicated
              via React&apos;s request memoization — only one network call is made.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Applies per request, not across users or page loads</li>
              <li>Non-fetch async calls (direct DB) are not auto-deduplicated — use React cache() if needed</li>
              <li>Data Cache deduplicates across requests when cache options match</li>
            </ul>
            <CodeBlock
              code={`import { cache } from 'react';

export const getUser = cache(async (id) => {
  return db.user.findUnique({ where: { id } });
});`}
              language="javascript"
            />
          </div>
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b14/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Routing System
          </Link>
          <Link
            href="/learn/app-router/b14/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Server Actions →
          </Link>
        </div>
      </div>
    </div>
  );
}
