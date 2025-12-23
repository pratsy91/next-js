import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C2.7: Error Handling - Next.js Mastery",
  description: "Error handling differences between App Router and Pages Router",
};

export default function Lesson7Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c2"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C2 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C2.7: Error Handling
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Compare error handling: Pages Router uses _error.js and custom
          404/500, App Router uses error.js and not-found.js.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Pages Router: _error.js and Custom 404/500
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router uses special files for error handling.
          </p>

          <CodeBlock
            code={`// Pages Router: _error.js
// pages/_error.js
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? \`An error \${statusCode} occurred on server\`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

// Pages Router: 404.js
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}

// Pages Router: 500.js
// pages/500.js
export default function Custom500() {
  return <h1>500 - Server Error</h1>;
}

// Limitations:
// - Only root-level error handling
// - No nested error boundaries
// - Manual error state management`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. App Router: error.js and not-found.js Files
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router provides nested error boundaries with error.js and
            not-found.js.
          </p>

          <CodeBlock
            code={`// App Router: error.js
// app/dashboard/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// App Router: not-found.js
// app/dashboard/not-found.js
export default function NotFound() {
  return <h1>Dashboard not found</h1>;
}

// Nested error boundaries
app/
  ├── error.js              // Root error boundary
  ├── dashboard/
  │   ├── error.js          // Dashboard error boundary
  │   ├── settings/
  │   │   ├── error.js     // Settings error boundary
  │   │   └── page.tsx

// Using notFound() function
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound(); // Triggers nearest not-found.js
  }
  
  return <article>{post.content}</article>;
}

// Benefits:
// ✅ Nested error boundaries
// ✅ Granular error handling
// ✅ Automatic error recovery
// ✅ Better error isolation`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Comparison
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Key differences in error handling.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Pages Router
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    App Router
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Error Boundary
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    _error.js (root only)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    error.js (nested)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    404 Page
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    404.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    not-found.js
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    500 Page
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    500.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    error.js
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Nested Boundaries
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not supported
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Multiple error.js files
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Error Recovery
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Manual
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    reset() function
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Programmatic 404
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Manual redirect
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    notFound() function
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c2/lesson-6"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C2.6 Loading States
          </Link>
          <Link
            href="/learn/comparison/c2/lesson-8"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C2.8 API Routes →
          </Link>
        </div>
      </div>
    </div>
  );
}
