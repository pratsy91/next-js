import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "A2.1: Basic Routing",
    description:
      "Index routes, nested routes, dynamic routes, catch-all routes, optional catch-all, and nested dynamic routes",
    topics: [
      "Index routes (pages/index.js)",
      "Nested routes (pages/about.js, pages/contact.js)",
      "Dynamic routes (pages/[id].js)",
      "Catch-all routes (pages/[...slug].js)",
      "Optional catch-all routes (pages/[[...slug]].js)",
      "Route groups with parentheses (not supported in Pages Router)",
      "Nested dynamic routes (pages/posts/[id]/[comment].js)",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "A2.2: Special Pages",
    description:
      "Custom App component, Document, error pages, 404, 500, and API directory structure",
    topics: [
      "pages/_app.js (custom App component)",
      "pages/_document.js (custom Document)",
      "pages/_error.js (custom error page)",
      "pages/404.js (custom 404)",
      "pages/500.js (custom 500)",
      "pages/api/ directory structure",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "A2.3: Routing Features",
    description:
      "next/link component, next/router useRouter hook, programmatic navigation, route parameters, shallow routing, prefetching, and locale routing",
    topics: [
      "next/link component (all props)",
      "next/router - useRouter hook (all methods and properties)",
      "Programmatic navigation (router.push, router.replace, router.back, router.reload)",
      "Route parameters (router.query, router.asPath, router.pathname)",
      "Shallow routing",
      "Prefetching behavior",
      "Locale routing (if i18n enabled)",
    ],
    status: "available",
  },
];

export default function A2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Pages Router Chapters
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A2: Routing System
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete guide to Next.js Pages Router routing system with all routing
          patterns and features.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/pages-router/a2/${lesson.id}`}
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
