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

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Parallel Data Fetching
          </h3>
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
