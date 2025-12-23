import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B2.5: Error Handling - Next.js Mastery",
  description: "Complete guide to error handling in Next.js App Router",
};

export default function Lesson5Page() {
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
          B2.5: Error Handling
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master error handling: error.js files, error boundaries, error props,
          error recovery, global-error.js, and nested error boundaries.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: error.js file */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. error.js File
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              error.js
            </code>{" "}
            file creates an error boundary that catches errors in the route
            segment and its children.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Error Boundary
          </h3>
          <CodeBlock
            code={`// app/error.js (Root level)
'use client'; // Error boundaries MUST be Client Components

export default function Error({ error, reset }) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// Error boundaries catch:
// - Errors in Server Components
// - Errors in Client Components
// - Errors during rendering
// - Errors in data fetching`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Important Rules
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Must be a Client Component ('use client')</li>
            <li>Catches errors in the route segment and children</li>
            <li>Does NOT catch errors in layout.js</li>
            <li>Does NOT catch errors in other error.js files</li>
            <li>Replaces the page content when error occurs</li>
          </ul>
        </section>

        {/* Section 2: Error Boundaries */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Error Boundaries
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Error boundaries isolate errors to specific parts of your
            application, preventing the entire app from crashing.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Error Boundaries Work
          </h3>
          <CodeBlock
            code={`// app/products/error.js
'use client';

export default function ProductsError({ error, reset }) {
  return (
    <div>
      <h2>Error loading products</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}

// This error boundary:
// - Catches errors in /products and all child routes
// - Does NOT catch errors in /products/layout.js
// - Does NOT catch errors in parent routes
// - Isolates the error to the products section`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error Boundary Scope
          </h3>
          <CodeBlock
            code={`// Directory structure:
// app/
//   ├── error.js              → Catches errors in root segment
//   ├── dashboard/
//   │   ├── error.js          → Catches errors in /dashboard
//   │   ├── settings/
//   │   │   ├── error.js      → Catches errors in /dashboard/settings
//   │   │   └── page.js

// Error hierarchy:
// - If error in /dashboard/settings/page.js:
//   → Settings error.js catches it first
//   → If Settings error.js fails, Dashboard error.js catches it
//   → If Dashboard error.js fails, Root error.js catches it`}
            language="javascript"
          />
        </section>

        {/* Section 3: Error Props */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Error Props (error, reset)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Error boundaries receive two props:{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              error
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              reset
            </code>
            .
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error Object
          </h3>
          <CodeBlock
            code={`// app/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Error Details</h2>
      <p>Message: {error.message}</p>
      <p>Stack: {error.stack}</p>
      <p>Name: {error.name}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// Error object properties:
// - message: string - Error message
// - stack: string - Stack trace (development only)
// - name: string - Error name (e.g., 'Error', 'TypeError')
// - cause: any - Error cause (if provided)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Reset Function
          </h3>
          <CodeBlock
            code={`// app/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      
      <div className="actions">
        <button onClick={reset}>
          Try again
        </button>
        <button onClick={() => window.location.href = '/'}>
          Go home
        </button>
      </div>
    </div>
  );
}

// reset() function:
// - Attempts to re-render the route segment
// - Useful for retrying failed operations
// - Does NOT guarantee the error won't happen again`}
            language="javascript"
          />
        </section>

        {/* Section 4: Error Recovery */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Error Recovery
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implementing proper error recovery strategies improves user
            experience when errors occur.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Retry with Reset
          </h3>
          <CodeBlock
            code={`// app/products/error.js
'use client';

import { useEffect } from 'react';

export default function ProductsError({ error, reset }) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Products error:', error);
  }, [error]);
  
  return (
    <div className="error-boundary">
      <h2>Failed to load products</h2>
      <p>{error.message}</p>
      
      <div className="actions">
        <button onClick={reset} className="retry-button">
          Retry
        </button>
        <button onClick={() => window.location.reload()}>
          Reload Page
        </button>
      </div>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Conditional Error Handling
          </h3>
          <CodeBlock
            code={`// app/error.js
'use client';

export default function Error({ error, reset }) {
  // Handle different error types
  if (error.message.includes('404')) {
    return (
      <div>
        <h2>Not Found</h2>
        <p>The resource you're looking for doesn't exist.</p>
        <button onClick={() => window.location.href = '/'}>
          Go Home
        </button>
      </div>
    );
  }
  
  if (error.message.includes('Network')) {
    return (
      <div>
        <h2>Network Error</h2>
        <p>Please check your internet connection.</p>
        <button onClick={reset}>Retry</button>
      </div>
    );
  }
  
  // Generic error
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: global-error.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. global-error.js
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
        <div className="global-error">
          <h2>Application Error</h2>
          <p>{error.message}</p>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  );
}

// Important requirements:
// - Must include <html> and <body> tags
// - Must be in app/ directory (root)
// - Only catches errors in root layout.js
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

        {/* Section 6: Nested Error Boundaries */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Nested Error Boundaries
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Error boundaries can be nested at different route levels, creating a
            hierarchy of error handling.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Error Boundary Example
          </h3>
          <CodeBlock
            code={`// app/error.js (Root)
'use client';

export default function RootError({ error, reset }) {
  return (
    <div className="root-error">
      <h2>Application Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Reset App</button>
    </div>
  );
}

// app/dashboard/error.js (Nested)
'use client';

export default function DashboardError({ error, reset }) {
  return (
    <div className="dashboard-error">
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry Dashboard</button>
    </div>
  );
}

// Error propagation:
// 1. Error in /dashboard/settings/page.js
// 2. If no settings/error.js, DashboardError catches it
// 3. If DashboardError fails, RootError catches it
// 4. If RootError fails, global-error.js catches it`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error Boundary Best Practices
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Place error.js at appropriate route levels</li>
            <li>Provide helpful error messages</li>
            <li>Include retry/reset functionality</li>
            <li>Log errors to monitoring services</li>
            <li>Don't catch errors you can't handle</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b2/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B2.4 Loading States
          </Link>
          <Link
            href="/learn/app-router/b2/lesson-6"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B2.6 Not Found Handling →
          </Link>
        </div>
      </div>
    </div>
  );
}
