import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.2: Data Fetching & Caching Cheatsheet - Next.js Mastery",
  description:
    "Complete data fetching and caching reference for Next.js App Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b13"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B13 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B13.2: Data Fetching & Caching Cheatsheet
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete reference for data fetching patterns, caching strategies, and
          revalidation.
        </p>
      </div>

      <div className="space-y-8">
        {/* Server Components Data Fetching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Server Components Data Fetching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Components can directly use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              async/await
            </code>{" "}
            for data fetching because they run only on the server. This is a
            fundamental difference from Pages Router - you don't need special
            functions like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>
            . Simply mark your component as{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              async
            </code>{" "}
            and use await to fetch data directly.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it works:</strong> When Next.js renders a Server
            Component, it executes all async operations on the server before
            sending the rendered HTML to the client. The component code never
            runs in the browser - only the resulting HTML, CSS, and any nested
            Client Components are sent. This allows direct database access, file
            system operations, and internal API calls without exposing sensitive
            information or adding unnecessary JavaScript to the client bundle.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Benefits:</strong> Simpler code (no separate data fetching
            functions), better security (API keys stay on server), smaller
            bundles (data fetching logic doesn't ship to client), and improved
            performance (data is fetched and rendered on the server in parallel
            with other operations). This pattern is particularly powerful when
            combined with React's Suspense for streaming partial content.
          </p>
          <CodeBlock
            code={`// app/products/page.js
export default async function ProductsPage() {
  // Direct async/await - no hooks needed
  const products = await fetch('https://api.example.com/products')
    .then(res => res.json());
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// With error handling
export default async function ProductsPage() {
  try {
    const products = await fetchProducts();
    return <ProductList products={products} />;
  } catch (error) {
    return <Error message={error.message} />;
  }
}`}
            language="javascript"
          />
        </section>

        {/* Fetch API & Cache Options */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Fetch API & Cache Options
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js extends the native{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              fetch
            </code>{" "}
            API with additional caching capabilities through the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next
            </code>{" "}
            configuration object. This allows you to control how data is cached,
            revalidated, and served, providing fine-grained control over data
            freshness without needing separate caching libraries.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Caching Strategy:</strong> By default, Next.js caches fetch
            requests indefinitely until manually revalidated. This enables
            static generation where data fetched at build time is reused across
            requests. You can opt into Incremental Static Regeneration (ISR)
            using{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidate
            </code>
            , which regenerates pages in the background after a specified time
            period while serving stale content. For truly dynamic data, use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              cache: 'no-store'
            </code>{" "}
            to fetch fresh on every request. Tag-based revalidation lets you
            invalidate specific groups of cached data on-demand, perfect for
            CMS-driven content.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Interview Points:</strong> Understand the default caching
            behavior, know when to use each cache strategy, and explain how
            revalidation works. Be able to explain the difference between
            time-based revalidation (ISR) and on-demand revalidation (tags), and
            when you'd choose one over the other. Also understand that fetch
            deduplication automatically happens within the same render pass.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Cache Options
          </h3>
          <CodeBlock
            code={`// Default: Cached indefinitely (until manual revalidation)
const data = await fetch('https://api.example.com/data');
// Returns cached data on subsequent requests

// Revalidate every 60 seconds (ISR)
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
});

// Always fetch fresh (no cache)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// Revalidate with tags
const data = await fetch('https://api.example.com/data', {
  next: { tags: ['products'] }
});
// Later: revalidateTag('products')

// Cache only if fresh, otherwise revalidate
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 },
  cache: 'force-cache' // default
});`}
            language="javascript"
          />

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Option
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Behavior
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Use Case
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    Default
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Cached indefinitely
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Static content
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    revalidate: number
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    ISR - revalidate every N seconds
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Frequently updated content
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    cache: 'no-store'
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Always fetch fresh
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Real-time data
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    tags: []
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    On-demand revalidation
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Content management
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Static vs Dynamic Rendering */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Static vs Dynamic Rendering
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            By default, Next.js App Router uses static rendering - pages are
            pre-rendered at build time and served as static HTML from a CDN.
            This provides the best performance but requires all data to be
            available at build time. You can opt into dynamic rendering when you
            need fresh, request-time data.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Static Rendering (Default):</strong> Pages are generated at
            build time, cached, and served from CDN. This is the fastest option
            and works well for content that doesn't change frequently. Next.js
            automatically detects if a route can be statically rendered based on
            whether it uses dynamic functions (cookies, headers, searchParams)
            or dynamic config.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Dynamic Rendering:</strong> Pages are rendered on each
            request, ensuring fresh data but with slower response times. You can
            force dynamic rendering with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              export const dynamic = 'force-dynamic'
            </code>{" "}
            or by using dynamic functions. Understanding when to use each is
            crucial for performance optimization. Static rendering is preferred
            unless you need request-time data, authentication checks, or
            real-time content.
          </p>
          <CodeBlock
            code={`// Static Rendering (Default)
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // ISR
  });
  return <div>{data.title}</div>;
}

// Dynamic Rendering
export const dynamic = 'force-dynamic'; // Opt into dynamic

export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Always fetch fresh
  });
  return <div>{data.title}</div>;
}

// Auto-detect: Use dynamic if using dynamic functions
export default async function Page({ searchParams }) {
  // Using searchParams makes it dynamic
  const data = await fetchData(searchParams.id);
  return <div>{data.title}</div>;
}

// Route Segment Config
export const dynamic = 'auto'; // default
export const dynamicParams = true; // default
export const revalidate = 3600; // ISR revalidation
export const fetchCache = 'auto'; // default
export const runtime = 'nodejs'; // or 'edge'
export const preferredRegion = 'auto'; // or specific region`}
            language="javascript"
          />
        </section>

        {/* ISR */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Incremental Static Regeneration (ISR)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Incremental Static Regeneration (ISR) allows you to update static
            pages after they've been built without rebuilding the entire site.
            It combines the performance benefits of static generation (fast CDN
            delivery, excellent SEO) with the flexibility to update content
            periodically, making it ideal for content that changes occasionally
            but doesn't need to be real-time.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How ISR Works:</strong> When you specify a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidate
            </code>{" "}
            time (in seconds), Next.js generates and caches the page at build
            time. After the revalidation period expires, the next request
            triggers a background regeneration of that page while still serving
            the stale (but valid) cached version to users. Once regeneration
            completes, future requests get the fresh page. This
            "stale-while-revalidate" pattern ensures users always get fast
            responses while content stays relatively fresh. The key benefit is
            that regeneration happens incrementally - only the pages that are
            requested after the revalidation period are regenerated, not the
            entire site.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Use Cases:</strong> ISR is perfect for product pages where
            prices or inventory change periodically, blog posts that get
            occasional updates, news sites updated regularly but not in
            real-time, or e-commerce sites where product information changes but
            not every second. It's also valuable for large sites where
            rebuilding everything would take too long - you can pre-render the
            most important pages and generate others on-demand with ISR. For
            interview purposes, understand that ISR provides a middle ground
            between fully static generation (fastest, but completely stale) and
            server-side rendering (fresh, but slower and more expensive).
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Interview Points:</strong> Know that ISR works on a per-page
            basis - you can have different revalidation times for different
            pages. Understand that the first request after the revalidation
            period may be slower (it regenerates in the background), but
            subsequent requests are fast. Be able to explain when ISR is better
            than pure static generation or SSR. Understand the relationship
            between ISR and on-demand revalidation (tags) - ISR is time-based,
            while tags are event-based.
          </p>
          <CodeBlock
            code={`// Time-based Revalidation
export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  }).then(res => res.json());
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// Route-level ISR
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// How it works:
// 1. First request: Generate page (may be slow)
// 2. Subsequent requests: Serve cached page (fast)
// 3. After revalidate period: Next request triggers regeneration in background
// 4. Stale page served while regenerating
// 5. Fresh page cached for next requests`}
            language="javascript"
          />
        </section>

        {/* On-Demand Revalidation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. On-Demand Revalidation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            On-demand revalidation allows you to invalidate and regenerate
            cached pages immediately when content changes, rather than waiting
            for a time-based revalidation period. This is perfect for content
            management systems, e-commerce updates, or any scenario where you
            need instant cache invalidation when data changes.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it Works:</strong> You create a Route Handler or Server
            Action that calls{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidatePath()
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidateTag()
            </code>{" "}
            to invalidate specific paths or cache tags. When triggered (via API
            call, webhook, or Server Action), Next.js immediately regenerates
            those pages in the background. The old cached version is served
            while regeneration happens, then fresh content is available for
            subsequent requests. This provides event-driven cache updates -
            content changes trigger immediate regeneration rather than waiting
            for a timer.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Use Cases:</strong> CMS webhooks that trigger regeneration
            when content is published or updated, e-commerce systems where
            product updates should appear immediately, blog platforms where new
            posts should be visible right away, or any system where time-based
            revalidation would be too slow or wasteful.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidatePath()
            </code>{" "}
            invalidates specific routes, while{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidateTag()
            </code>{" "}
            invalidates all data tagged with that tag, making it more efficient
            for related content that spans multiple routes.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Security Considerations:</strong> Always protect
            revalidation endpoints with a secret token to prevent unauthorized
            cache invalidation. Never expose revalidation endpoints publicly
            without authentication. Use environment variables for secrets and
            validate them in your revalidation handler. This prevents malicious
            actors from triggering expensive regeneration operations or causing
            denial of service attacks.
          </p>
          <CodeBlock
            code={`// app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }
  
  try {
    // Revalidate specific path
    revalidatePath('/products');
    revalidatePath('/products/[id]', 'page');
    
    // Or revalidate by tag
    revalidateTag('products');
    
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return Response.json({ error: 'Error revalidating' }, { status: 500 });
  }
}

// Usage: Trigger from CMS webhook
// POST /api/revalidate?secret=your-secret

// In Server Actions
'use server';

import { revalidatePath } from 'next/cache';

export async function updateProduct(id, data) {
  await db.product.update({ where: { id }, data });
  revalidatePath('/products');
  revalidatePath(\`/products/\${id}\`);
}`}
            language="javascript"
          />
        </section>

        {/* Cache Tags & Keys */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Cache Tags & Cache Keys
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Cache tags provide a way to group related cached data so you can
            invalidate multiple items at once. Instead of manually invalidating
            each individual path, you tag related data and invalidate by tag.
            This is particularly powerful for content that's related but stored
            across multiple routes or data sources.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How Tags Work:</strong> When you fetch data, you can assign
            one or more tags to that fetch operation. Later, when you call{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidateTag('tag-name')
            </code>
            , Next.js invalidates all cached data that was tagged with that
            name. You can use multiple tags per fetch (e.g., both 'products' and
            'product-123') to allow both bulk invalidation (all products) and
            specific invalidation (single product). Tags are hierarchical - you
            can use patterns like 'product-123' where 'product' is the category
            and '123' is the specific ID.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Cache Keys (Advanced):</strong> For more advanced use cases,
            you can use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              unstable_cache
            </code>{" "}
            to create custom cache keys and control caching behavior for
            non-fetch operations (like database queries or complex
            computations). This is useful when you want to cache the result of a
            function call with specific parameters. The cache key prefix helps
            organize cached entries, and you can still use tags for
            invalidation. Note that this API is marked as unstable, so use it
            cautiously in production.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Best Practices:</strong> Use descriptive tag names that
            clearly indicate what content they represent. Group related content
            under common tags (e.g., all product pages tagged 'products'). Use
            specific tags for individual items when you need granular control.
            Combine tags strategically - tag both the category and specific item
            for flexibility. Avoid too many tags per fetch as it can complicate
            invalidation logic. Document your tag strategy so team members
            understand the invalidation patterns.
          </p>
          <CodeBlock
            code={`// Using Tags for Grouped Revalidation
export default async function ProductPage({ params }) {
  const product = await fetch(\`https://api.example.com/products/\${params.id}\`, {
    next: { tags: ['products', \`product-\${params.id}\`] }
  });
  
  return <div>{product.name}</div>;
}

// Revalidate all products
revalidateTag('products');

// Revalidate specific product
revalidateTag(\`product-\${id}\`);

// Manual Cache Keys (Advanced)
import { unstable_cache } from 'next/cache';

const getCachedData = unstable_cache(
  async (id: string) => {
    return fetchData(id);
  },
  ['product'], // cache key prefix
  {
    tags: ['products'],
    revalidate: 3600,
  }
);`}
            language="javascript"
          />
        </section>

        {/* Data Fetching Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Data Fetching Patterns & Best Practices
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Understanding different data fetching patterns is crucial for
            optimizing performance and user experience. The key is knowing when
            to fetch data in parallel (independent sources) versus sequentially
            (dependent operations), how to handle loading states, and proper
            error handling strategies.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Pattern Selection:</strong> Always fetch data in parallel
            when sources are independent - this minimizes total loading time.
            Use sequential fetching only when one operation depends on the
            result of another. Use Suspense boundaries to show loading states
            for individual components rather than blocking the entire page.
            Implement proper error handling at multiple levels - route-level
            with error.js, component-level with try-catch, and use notFound()
            for missing resources. These patterns ensure fast, resilient
            applications that provide good user feedback.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Parallel Data Fetching
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            When you have multiple independent data sources, fetch them
            simultaneously using{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Promise.all()
            </code>
            . This reduces total loading time from the sum of all fetches to the
            duration of the slowest fetch. This is the preferred pattern
            whenever possible.
          </p>
          <CodeBlock
            code={`// Fetch multiple data sources in parallel
export default async function Page() {
  // Both fetch in parallel, not sequential
  const [user, posts] = await Promise.all([
    fetch('https://api.example.com/user'),
    fetch('https://api.example.com/posts'),
  ]);
  
  const [userData, postsData] = await Promise.all([
    user.json(),
    posts.json(),
  ]);
  
  return (
    <div>
      <UserProfile user={userData} />
      <PostList posts={postsData} />
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Sequential Data Fetching
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use sequential fetching when one data fetch depends on the result of
            another. For example, fetching user details first, then fetching
            that user's posts using their ID. While this takes longer, it's
            necessary when there are dependencies between data sources.
          </p>
          <CodeBlock
            code={`// When second fetch depends on first
export default async function Page() {
  const user = await fetchUser();
  const posts = await fetchUserPosts(user.id); // Depends on user.id
  
  return <UserPosts user={user} posts={posts} />;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Loading States with Suspense
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            React Suspense allows you to show loading states for specific
            components without blocking the entire page. Wrap async Server
            Components in Suspense boundaries with fallback UI. This enables
            progressive rendering where fast components appear immediately while
            slower ones show loading states. Multiple Suspense boundaries can
            show different loading states for different parts of the page
            simultaneously.
          </p>
          <CodeBlock
            code={`import { Suspense } from 'react';

async function Products() {
  const products = await fetchProducts();
  return <ProductList products={products} />;
}

export default function Page() {
  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <Products />
      </Suspense>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error Handling
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement error handling at multiple levels for robust applications.
            Route-level error boundaries (
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              error.js
            </code>
            ) catch errors in that route segment and children. Component-level
            try-catch handles errors in specific data fetching operations. Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              notFound()
            </code>{" "}
            to show 404 pages for missing resources. Always provide
            user-friendly error messages and retry options when appropriate.
          </p>
          <CodeBlock
            code={`// Using error.js for route-level errors
// app/products/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Error loading products</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// Or handle in component
export default async function Page() {
  try {
    const data = await fetchData();
    return <div>{data}</div>;
  } catch (error) {
    notFound(); // Show 404
    // or
    return <ErrorComponent error={error} />;
  }
}`}
            language="javascript"
          />
        </section>

        {/* Best Practices */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Best Practices
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Use Server Components for data fetching when possible</li>
            <li>Leverage caching - don't opt out unless necessary</li>
            <li>
              Use ISR for semi-static content (revalidate: 60, 3600, etc.)
            </li>
            <li>Use tags for on-demand revalidation from CMS</li>
            <li>Fetch in parallel when data sources are independent</li>
            <li>Use Suspense for loading states</li>
            <li>Handle errors gracefully with error.js</li>
            <li>Use dynamic = 'force-dynamic' only when needed</li>
            <li>Prefer fetch over external libraries for better caching</li>
            <li>Use route segment config for route-level settings</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Core Concepts
          </Link>
          <Link
            href="/learn/app-router/b13/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Routing & Navigation →
          </Link>
        </div>
      </div>
    </div>
  );
}
