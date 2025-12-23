import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B2.1: Basic Routing",
    description:
      "Route segments, nested routes, layouts, route groups, parallel routes, intercepting routes, and dynamic routes",
    topics: [
      "Route segments (app/page.js)",
      "Nested routes (app/about/page.js)",
      "Layouts (app/layout.js)",
      "Nested layouts",
      "Route groups (folder) - parentheses syntax",
      "Parallel routes @folder - @ prefix syntax",
      "Intercepting routes (.), (..), (...) - relative path syntax",
      "Dynamic routes (app/[id]/page.js)",
      "Catch-all routes (app/[...slug]/page.js)",
      "Optional catch-all routes (app/[[...slug]]/page.js)",
      "Nested dynamic routes",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B2.2: Special Files",
    description:
      "All special files in App Router: layout.js, page.js, loading.js, error.js, not-found.js, template.js, default.js, route.js, and global-error.js",
    topics: [
      "layout.js (layouts at all levels)",
      "page.js (route pages)",
      "loading.js (loading UI)",
      "error.js (error boundaries)",
      "not-found.js (not found UI)",
      "template.js (templates)",
      "default.js (parallel route fallback)",
      "route.js (route handlers)",
      "global-error.js (global error boundary)",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B2.3: Layout System",
    description:
      "Root layout, nested layouts, layout composition, props, state persistence, and re-rendering behavior",
    topics: [
      "Root layout (required)",
      "Nested layouts",
      "Layout composition",
      "Layout props (children, params)",
      "Layout state persistence",
      "Layout re-rendering behavior",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "B2.4: Loading States",
    description:
      "loading.js file, Suspense boundaries, streaming SSR, loading skeletons, and nested loading states",
    topics: [
      "loading.js file",
      "Suspense boundaries",
      "Streaming SSR",
      "Loading skeletons",
      "Nested loading states",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "B2.5: Error Handling",
    description:
      "error.js file, error boundaries, error props, error recovery, global-error.js, and nested error boundaries",
    topics: [
      "error.js file",
      "Error boundaries",
      "Error props (error, reset)",
      "Error recovery",
      "global-error.js",
      "Nested error boundaries",
    ],
    status: "available",
  },
  {
    id: "lesson-6",
    title: "B2.6: Not Found Handling",
    description:
      "not-found.js file, notFound() function, custom 404 pages, and nested not-found",
    topics: [
      "not-found.js file",
      "notFound() function",
      "Custom 404 pages",
      "Nested not-found",
    ],
    status: "available",
  },
];

export default function B2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to App Router Chapters
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B2: Routing System
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master the complete routing system in Next.js App Router. Learn about
          routes, layouts, special files, loading states, error handling, and
          not-found pages.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b2/${lesson.id}`}
            className="block rounded-lg border-2 border-blue-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
          >
            <h2 className="mb-2 text-2xl font-semibold text-blue-600 dark:text-blue-400">
              {lesson.title}
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {lesson.description}
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Topics Covered:
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {lesson.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
