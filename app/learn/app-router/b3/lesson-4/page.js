import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B3.4: Streaming & Suspense - Next.js Mastery",
  description: "Complete guide to streaming and Suspense in Next.js App Router",
};

export default function Lesson4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b3"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B3 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B3.4: Streaming & Suspense
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master streaming SSR, Suspense boundaries, loading states, progressive
          rendering, and error boundaries with streaming.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Streaming SSR */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Streaming SSR
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Streaming Server-Side Rendering sends HTML to the client
            progressively as it's generated, improving Time to First Byte
            (TTFB).
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Streaming Works
          </h3>
          <CodeBlock
            code={`// app/page.js
import { Suspense } from 'react';

async function FastComponent() {
  // Fast data fetch
  const data = await fetch('https://api.example.com/fast', {
    cache: 'no-store',
  }).then((res) => res.json());
  
  return <div>Fast: {data.message}</div>;
}

async function SlowComponent() {
  // Slow data fetch
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await fetch('https://api.example.com/slow', {
    cache: 'no-store',
  }).then((res) => res.json());
  
  return <div>Slow: {data.message}</div>;
}

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <Suspense fallback={<div>Loading fast...</div>}>
        <FastComponent /> {/* Streams immediately when ready */}
      </Suspense>
      
      <Suspense fallback={<div>Loading slow...</div>}>
        <SlowComponent /> {/* Streams later when ready */}
      </Suspense>
    </div>
  );
}

// User experience:
// 1. Page HTML starts streaming immediately
// 2. FastComponent appears when ready
// 3. SlowComponent appears when ready
// All without waiting for everything!`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Benefits of Streaming
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Faster TTFB:</strong> Server starts sending HTML
              immediately
            </li>
            <li>
              <strong>Progressive Rendering:</strong> Content appears as it
              becomes available
            </li>
            <li>
              <strong>Better UX:</strong> Users see content faster
            </li>
            <li>
              <strong>Parallel Data Fetching:</strong> Multiple sources can load
              simultaneously
            </li>
          </ul>
        </section>

        {/* Section 2: Suspense Boundaries */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Suspense Boundaries
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Suspense boundaries define where loading states appear and how
            content streams.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Single Suspense Boundary
          </h3>
          <CodeBlock
            code={`// app/page.js
import { Suspense } from 'react';

async function DataComponent() {
  const data = await fetch('https://api.example.com/data').then((res) =>
    res.json()
  );
  
  return <div>{data.message}</div>;
}

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <Suspense fallback={<div>Loading data...</div>}>
        <DataComponent />
      </Suspense>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Suspense Boundaries
          </h3>
          <CodeBlock
            code={`// app/dashboard/page.js
import { Suspense } from 'react';

async function UserProfile({ userId }) {
  const user = await fetchUser(userId);
  return <div>{user.name}</div>;
}

async function UserPosts({ userId }) {
  const posts = await fetchPosts(userId);
  return <div>{posts.length} posts</div>;
}

async function UserStats({ userId }) {
  const stats = await fetchStats(userId);
  return <div>Stats: {stats.total}</div>;
}

export default function DashboardPage({ params }) {
  const { userId } = await params;
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Each streams independently */}
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile userId={userId} />
      </Suspense>
      
      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPosts userId={userId} />
      </Suspense>
      
      <Suspense fallback={<div>Loading stats...</div>}>
        <UserStats userId={userId} />
      </Suspense>
    </div>
  );
}

// All three fetch in parallel and stream independently`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Suspense Boundaries
          </h3>
          <CodeBlock
            code={`// app/products/page.js
import { Suspense } from 'react';

async function ProductList() {
  const products = await fetchProducts();
  return (
    <div>
      {products.map((product) => (
        <Suspense
          key={product.id}
          fallback={<div>Loading {product.name}...</div>}
        >
          <ProductDetails productId={product.id} />
        </Suspense>
      ))}
    </div>
  );
}

async function ProductDetails({ productId }) {
  const details = await fetchProductDetails(productId);
  return <div>{details.description}</div>;
}

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Loading States */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Loading States
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Loading states in Suspense boundaries provide feedback while data is
            being fetched.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Simple Loading Fallback
          </h3>
          <CodeBlock
            code={`// app/page.js
import { Suspense } from 'react';

async function DataComponent() {
  const data = await fetchData();
  return <div>{data}</div>;
}

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DataComponent />
      </Suspense>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Skeleton Loading Fallback
          </h3>
          <CodeBlock
            code={`// app/products/page.js
import { Suspense } from 'react';

function ProductSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-gray-200 rounded"></div>
      ))}
    </div>
  );
}

async function ProductList() {
  const products = await fetchProducts();
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using loading.js
          </h3>
          <CodeBlock
            code={`// app/products/loading.js
export default function ProductsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 w-64 mb-4"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}

// app/products/page.js
// Automatically uses loading.js as fallback
export default async function ProductsPage() {
  const products = await fetchProducts();
  
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Progressive Rendering */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Progressive Rendering
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Progressive rendering shows content as it becomes available, rather
            than waiting for everything.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Progressive Example
          </h3>
          <CodeBlock
            code={`// app/dashboard/page.js
import { Suspense } from 'react';

async function Header() {
  // Fast: Static content
  return <h1>Dashboard</h1>;
}

async function QuickStats() {
  // Medium: Fast query
  const stats = await fetchQuickStats();
  return <div>Quick Stats: {stats.total}</div>;
}

async function DetailedData() {
  // Slow: Complex query
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await fetchDetailedData();
  return <div>Detailed: {data.length} items</div>;
}

export default function DashboardPage() {
  return (
    <div>
      {/* Shows immediately */}
      <Header />
      
      {/* Shows when ready (fast) */}
      <Suspense fallback={<div>Loading quick stats...</div>}>
        <QuickStats />
      </Suspense>
      
      {/* Shows when ready (slow) */}
      <Suspense fallback={<div>Loading detailed data...</div>}>
        <DetailedData />
      </Suspense>
    </div>
  );
}

// User sees:
// 1. Header (immediately)
// 2. Quick Stats (when ready)
// 3. Detailed Data (when ready)
// All progressively, not all at once!`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Benefits
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Users see content faster</li>
            <li>Perceived performance improves</li>
            <li>Page feels more responsive</li>
            <li>Better user experience</li>
          </ul>
        </section>

        {/* Section 5: Error Boundaries with Streaming */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Error Boundaries with Streaming
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Error boundaries work seamlessly with streaming, isolating errors to
            specific Suspense boundaries.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error Boundary with Suspense
          </h3>
          <CodeBlock
            code={`// app/products/page.js
import { Suspense } from 'react';

async function ProductList() {
  const products = await fetchProducts();
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

async function Recommendations() {
  // This might fail
  const recs = await fetchRecommendations();
  return (
    <div>
      {recs.map((rec) => (
        <div key={rec.id}>{rec.name}</div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      
      {/* If this fails, error.js catches it */}
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
      
      {/* If this fails, only this section shows error */}
      <Suspense fallback={<div>Loading recommendations...</div>}>
        <Recommendations />
      </Suspense>
    </div>
  );
}

// app/products/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Error loading products</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// Error boundaries catch errors in their Suspense boundaries
// Other Suspense boundaries continue to work`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Isolated Error Handling
          </h3>
          <CodeBlock
            code={`// app/dashboard/page.js
import { Suspense } from 'react';

async function UserProfile({ userId }) {
  const user = await fetchUser(userId);
  return <div>{user.name}</div>;
}

async function UserPosts({ userId }) {
  // This might fail, but won't affect other sections
  const posts = await fetchPosts(userId);
  return <div>{posts.length} posts</div>;
}

async function UserStats({ userId }) {
  const stats = await fetchStats(userId);
  return <div>Stats: {stats.total}</div>;
}

export default function DashboardPage({ params }) {
  const { userId } = await params;
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Each has its own error boundary */}
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile userId={userId} />
      </Suspense>
      
      {/* If this fails, others still work */}
      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPosts userId={userId} />
      </Suspense>
      
      <Suspense fallback={<div>Loading stats...</div>}>
        <UserStats userId={userId} />
      </Suspense>
    </div>
  );
}

// Benefits:
// - Errors are isolated to specific sections
// - Other sections continue to work
// - Better user experience
// - Partial page rendering`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b3/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B3.3 Client-Side Data Fetching
          </Link>
          <Link
            href="/learn/app-router/b4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B4 Server Actions →
          </Link>
        </div>
      </div>
    </div>
  );
}
