import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C2.1: Routing - Next.js Mastery",
  description: "Routing differences between App Router and Pages Router",
};

export default function Lesson1Page() {
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
          C2.1: Routing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Understand the key differences in routing between App Router and Pages
          Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Pages Router Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Pages Router: File-based in pages/
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router uses a simple file-based routing system in the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/
            </code>{" "}
            directory.
          </p>

          <CodeBlock
            code={`// Pages Router file structure
pages/
  ├── index.js          → /
  ├── about.js          → /about
  ├── blog/
  │   ├── index.js      → /blog
  │   └── [slug].js     → /blog/:slug
  └── api/
      └── users.js      → /api/users

// Special files in Pages Router:
// - _app.js: Custom App component
// - _document.js: Custom Document
// - _error.js: Custom error page
// - 404.js: Not found page
// - 500.js: Server error page

// Dynamic routes
pages/
  ├── [id].js           → /:id
  ├── [...slug].js     → /:slug (catch-all)
  └── [[...slug]].js    → /:slug (optional catch-all)

// Route groups NOT supported
// ❌ pages/(group)/page.js - Not valid

// Nested routes
pages/
  └── dashboard/
      ├── index.js      → /dashboard
      └── settings.js   → /dashboard/settings`}
            language="text"
          />
        </section>

        {/* Section 2: App Router Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. App Router: File-based in app/ with Special Files
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router uses file-based routing in the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/
            </code>{" "}
            directory with special files for layouts, loading, and errors.
          </p>

          <CodeBlock
            code={`// App Router file structure
app/
  ├── page.js           → /
  ├── layout.js         → Root layout
  ├── about/
  │   └── page.js       → /about
  ├── blog/
  │   ├── page.js       → /blog
  │   ├── layout.js     → Layout for /blog/*
  │   ├── loading.js    → Loading UI
  │   ├── error.js      → Error boundary
  │   └── [slug]/
  │       └── page.js   → /blog/:slug
  └── api/
      └── users/
          └── route.js  → /api/users

// Special files in App Router:
// - layout.js: Shared layout
// - page.js: Route segment
// - loading.js: Loading UI
// - error.js: Error boundary
// - not-found.js: 404 page
// - route.js: API route handler
// - template.js: Re-rendered layout

// Dynamic routes
app/
  ├── [id]/
  │   └── page.js       → /:id
  ├── [...slug]/
  │   └── page.js       → /:slug (catch-all)
  └── [[...slug]]/
      └── page.js       → /:slug (optional catch-all)

// Route groups (supported!)
app/
  └── (marketing)/
      ├── about/
      │   └── page.js   → /about
      └── contact/
          └── page.js   → /contact

// Nested routes
app/
  └── dashboard/
      ├── page.js       → /dashboard
      └── settings/
          └── page.js   → /dashboard/settings`}
            language="text"
          />
        </section>

        {/* Section 3: Key Differences */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Key Differences Summary
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Comparison of routing features.
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
                    Directory
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    pages/
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    app/
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Route File
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    index.js, about.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    page.js
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Route Groups
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not supported
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Supported (folder)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Special Files
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    _app.js, _document.js, _error.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    layout.js, loading.js, error.js, not-found.js
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Nested Layouts
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Only _app.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Multiple layout.js files
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to C2 Lessons
          </Link>
          <Link
            href="/learn/comparison/c2/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C2.2 Data Fetching →
          </Link>
        </div>
      </div>
    </div>
  );
}
