import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B2.4: Loading States - Next.js Mastery",
  description: "Complete guide to loading states in Next.js App Router",
};

export default function Lesson4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b2"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B2 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B2.4: Loading States
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about loading.js files, Suspense boundaries, streaming SSR,
          loading skeletons, and nested loading states.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: loading.js file */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. loading.js File
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              loading.js
            </code>{" "}
            file automatically creates a loading UI that shows while the route
            segment is loading.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Loading UI
          </h3>
          <CodeBlock
            code={`// app/loading.js (Root level)
export default function Loading() {
  return <div>Loading...</div>;
}

// app/products/loading.js (Nested level)
export default function ProductsLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="spinner">Loading products...</div>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How loading.js Works
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Automatically wraps page.js in a Suspense boundary</li>
            <li>Shows while the page is loading (data fetching, etc.)</li>
            <li>Replaces the page content during loading</li>
            <li>Works with Server Components and async pages</li>
            <li>Can be nested at any route level</li>
          </ul>
        </section>

        {/* Section 2: Suspense Boundaries */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Suspense Boundaries
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Suspense boundaries allow you to show loading states for specific
            parts of your page.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Manual Suspense Boundary
          </h3>
          <CodeBlock
            code={`// app/page.js
import { Suspense } from 'react';

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return <div>Slow content loaded!</div>;
}

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <Suspense fallback={<div>Loading slow content...</div>}>
        <SlowComponent />
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
            code={`// app/page.js
import { Suspense } from 'react';

async function UserProfile({ userId }) {
  const user = await fetchUser(userId);
  return <div>{user.name}</div>;
}

async function UserPosts({ userId }) {
  const posts = await fetchPosts(userId);
  return <div>{posts.length} posts</div>;
}

export default function Page({ params }) {
  return (
    <div>
      <h1>User Dashboard</h1>
      
      {/* Each Suspense boundary streams independently */}
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile userId={params.userId} />
      </Suspense>
      
      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPosts userId={params.userId} />
      </Suspense>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Streaming SSR */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Streaming SSR
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Streaming Server-Side Rendering allows parts of the page to render
            progressively as data becomes available.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Streaming Works
          </h3>
          <CodeBlock
            code={`// app/page.js
import { Suspense } from 'react';

async function FastData() {
  // Fast query
  const data = await fetch('https://api.example.com/fast');
  return <div>Fast: {data.text()}</div>;
}

async function SlowData() {
  // Slow query
  await new Promise(resolve => setTimeout(resolve, 3000));
  const data = await fetch('https://api.example.com/slow');
  return <div>Slow: {data.text()}</div>;
}

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading fast...</div>}>
        <FastData /> {/* Shows immediately when ready */}
      </Suspense>
      
      <Suspense fallback={<div>Loading slow...</div>}>
        <SlowData /> {/* Shows later when ready */}
      </Suspense>
    </div>
  );
}

// User sees:
// 1. "Loading fast..." and "Loading slow..." (immediately)
// 2. Fast data appears (when ready)
// 3. Slow data appears (when ready)
// All without waiting for everything to load!`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Benefits of Streaming
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Faster Time to First Byte (TTFB)</li>
            <li>Progressive content rendering</li>
            <li>Better perceived performance</li>
            <li>Users see content as it becomes available</li>
          </ul>
        </section>

        {/* Section 4: Loading Skeletons */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Loading Skeletons
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Loading skeletons provide a better UX by showing the structure of
            content while it loads.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Skeleton
          </h3>
          <CodeBlock
            code={`// app/products/loading.js
export default function ProductsLoading() {
  return (
    <div className="space-y-4">
      {/* Skeleton for product list */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Skeleton with Tailwind
          </h3>
          <CodeBlock
            code={`// app/dashboard/loading.js
export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mt-2"></div>
      </div>
      
      {/* Cards skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
      
      {/* Table skeleton */}
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-2"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-gray-200 rounded mb-2"></div>
        ))}
      </div>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Nested Loading States */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Nested Loading States
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Loading states can be nested at different route levels, providing
            granular loading feedback.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Loading Hierarchy
          </h3>
          <CodeBlock
            code={`// Directory structure:
// app/
//   ├── loading.js              → Root loading
//   ├── dashboard/
//   │   ├── loading.js          → Dashboard loading
//   │   ├── settings/
//   │   │   ├── loading.js      → Settings loading
//   │   │   └── page.js

// app/loading.js
export default function RootLoading() {
  return <div>Loading app...</div>;
}

// app/dashboard/loading.js
export default function DashboardLoading() {
  return <div>Loading dashboard...</div>;
}

// app/dashboard/settings/loading.js
export default function SettingsLoading() {
  return <div>Loading settings...</div>;
}

// When navigating to /dashboard/settings:
// - Shows RootLoading first
// - Then DashboardLoading
// - Then SettingsLoading
// - Finally the page`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Loading State Priority
          </h3>
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            The closest loading.js to the route being loaded takes precedence:
          </p>
          <ol className="list-inside list-decimal space-y-1 text-gray-600 dark:text-gray-300">
            <li>Route-specific loading.js (highest priority)</li>
            <li>Parent route loading.js</li>
            <li>Root loading.js (lowest priority)</li>
          </ol>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b2/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B2.3 Layout System
          </Link>
          <Link
            href="/learn/app-router/b2/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B2.5 Error Handling →
          </Link>
        </div>
      </div>
    </div>
  );
}
