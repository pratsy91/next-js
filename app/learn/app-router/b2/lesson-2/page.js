import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B2.2: Special Files - Next.js Mastery",
  description: "Complete guide to special files in Next.js App Router",
};

export default function Lesson2Page() {
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
          B2.2: Special Files
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about all special files in App Router: layout.js, page.js,
          loading.js, error.js, not-found.js, template.js, default.js, route.js,
          and global-error.js.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: layout.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. layout.js (Layouts at All Levels)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Layouts wrap route segments and persist across navigation. They can
            be placed at any level of your route hierarchy.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Root Layout (Required)
          </h3>
          <CodeBlock
            code={`// app/layout.js - REQUIRED
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Layout
          </h3>
          <CodeBlock
            code={`// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <nav>Dashboard Nav</nav>
      {children}
    </div>
  );
}

// This layout wraps all routes under /dashboard`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Layout Props
          </h3>
          <CodeBlock
            code={`// app/products/[id]/layout.js
export default function ProductLayout({ children, params }) {
  // params is a Promise in Next.js 15+
  const { id } = await params;
  
  return (
    <div>
      <h1>Product {id}</h1>
      {children}
    </div>
  );
}

// Available props:
// - children: React.ReactNode
// - params: Promise<{ [key: string]: string }>`}
            language="javascript"
          />
        </section>

        {/* Section 2: page.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. page.js (Route Pages)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              page.js
            </code>{" "}
            file makes a route segment publicly accessible. It's the UI for that
            route.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Page
          </h3>
          <CodeBlock
            code={`// app/page.js → Route: /
export default function Home() {
  return <h1>Home</h1>;
}

// app/about/page.js → Route: /about
export default function About() {
  return <h1>About</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Page with Params
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
export default async function ProductPage({ params, searchParams }) {
  // params is a Promise in Next.js 15+
  const { id } = await params;
  
  // searchParams is also a Promise
  const { color, size } = await searchParams;
  
  return (
    <div>
      <h1>Product {id}</h1>
      <p>Color: {color}</p>
      <p>Size: {size}</p>
    </div>
  );
}

// Available props:
// - params: Promise<{ [key: string]: string }>
// - searchParams: Promise<{ [key: string]: string | string[] | undefined }>`}
            language="javascript"
          />
        </section>

        {/* Section 3: loading.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. loading.js (Loading UI)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              loading.js
            </code>{" "}
            file creates a loading UI that shows while the route segment is
            loading.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Loading UI
          </h3>
          <CodeBlock
            code={`// app/loading.js (Root level)
export default function Loading() {
  return <div>Loading...</div>;
}

// app/dashboard/loading.js (Nested level)
export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center">
      <div className="spinner">Loading dashboard...</div>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Loading with Suspense
          </h3>
          <CodeBlock
            code={`// app/products/loading.js
// Automatically wraps page.js in Suspense
export default function ProductsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 w-64 mb-4"></div>
      <div className="space-y-4">
        <div className="h-32 bg-gray-200"></div>
        <div className="h-32 bg-gray-200"></div>
      </div>
    </div>
  );
}

// This shows while app/products/page.js is loading`}
            language="javascript"
          />
        </section>

        {/* Section 4: error.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. error.js (Error Boundaries)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              error.js
            </code>{" "}
            file creates an error boundary that catches errors in the route
            segment.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Error Boundary
          </h3>
          <CodeBlock
            code={`// app/error.js (Root level)
'use client'; // Error boundaries must be Client Components

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// Error props:
// - error: Error object
// - reset: () => void - Function to reset the error boundary`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Error Boundary
          </h3>
          <CodeBlock
            code={`// app/dashboard/error.js
'use client';

export default function DashboardError({ error, reset }) {
  return (
    <div className="error-container">
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}

// Only catches errors in /dashboard routes`}
            language="javascript"
          />
        </section>

        {/* Section 5: not-found.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. not-found.js (Not Found UI)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              not-found.js
            </code>{" "}
            file creates a 404 UI for the route segment.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Not Found
          </h3>
          <CodeBlock
            code={`// app/not-found.js (Root level)
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
}

// app/products/[id]/not-found.js (Nested level)
export default function ProductNotFound() {
  return (
    <div>
      <h2>Product Not Found</h2>
      <p>The product you're looking for doesn't exist.</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using notFound() Function
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) {
    notFound(); // Triggers not-found.js
  }
  
  return <h1>{product.name}</h1>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: template.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. template.js (Templates)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Templates are similar to layouts but create a new instance for each
            child. They re-render on navigation.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Template
          </h3>
          <CodeBlock
            code={`// app/template.js
export default function Template({ children }) {
  return (
    <div className="template">
      {children}
    </div>
  );
}

// Key differences from layout.js:
// - Re-renders on navigation
// - New instance for each child
// - Animations work better with templates`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Template vs Layout
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    Feature
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    layout.js
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    template.js
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Re-renders
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ❌ No (persists)
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ✅ Yes (new instance)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    State
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Persists
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Resets
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Use Case
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Shared UI, navigation
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Animations, enter/exit
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: default.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. default.js (Parallel Route Fallback)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              default.js
            </code>{" "}
            file provides a fallback UI for parallel routes when no matching
            route is found.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Default for Parallel Route
          </h3>
          <CodeBlock
            code={`// app/dashboard/@analytics/default.js
// Shows when @analytics slot doesn't have a matching route
export default function DefaultAnalytics() {
  return (
    <div>
      <p>No analytics data available</p>
    </div>
  );
}

// app/dashboard/layout.js
export default function DashboardLayout({ children, analytics }) {
  return (
    <div>
      <main>{children}</main>
      <aside>
        {analytics} {/* Shows default.js if no route matches */}
      </aside>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 8: route.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. route.js (Route Handlers)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              route.js
            </code>{" "}
            file creates API endpoints (route handlers) for HTTP methods.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Route Handler
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ users: [] });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ created: body });
}

// Available HTTP methods:
// GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Route Handler
          </h3>
          <CodeBlock
            code={`// app/api/users/[id]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;
  return NextResponse.json({ user: { id } });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  // Delete user logic
  return NextResponse.json({ deleted: id });
}`}
            language="javascript"
          />
        </section>

        {/* Section 9: global-error.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            9. global-error.js (Global Error Boundary)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              global-error.js
            </code>{" "}
            file catches errors in the root layout. It must be in the root app
            directory.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Global Error Boundary
          </h3>
          <CodeBlock
            code={`// app/global-error.js
'use client'; // Must be Client Component

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div>
          <h2>Something went wrong globally!</h2>
          <p>{error.message}</p>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  );
}

// Important:
// - Must include <html> and <body> tags
// - Only catches errors in root layout
// - Replaces root layout when error occurs`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            When to Use global-error.js
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Errors in root layout.js</li>
            <li>Critical application errors</li>
            <li>Fallback when error.js fails</li>
            <li>Must provide full HTML structure</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b2/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B2.1 Basic Routing
          </Link>
          <Link
            href="/learn/app-router/b2/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B2.3 Layout System →
          </Link>
        </div>
      </div>
    </div>
  );
}
