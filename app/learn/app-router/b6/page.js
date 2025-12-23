import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B6.1: next/navigation",
    description:
      "useRouter, usePathname, useSearchParams, useParams hooks, redirect, permanentRedirect, notFound functions, navigation methods, and prefetching",
    topics: [
      "useRouter hook (all methods)",
      "usePathname hook",
      "useSearchParams hook",
      "useParams hook",
      "redirect function",
      "permanentRedirect function",
      "notFound function",
      "Navigation methods (push, replace, refresh, back, forward)",
      "Prefetching behavior",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B6.2: next/link",
    description:
      "Link component with all props, prefetching, scroll behavior, shallow routing note, and active link styling",
    topics: [
      "Link component (all props)",
      "Prefetching",
      "Scroll behavior",
      "Shallow routing (not in App Router - note this)",
      "Active link styling",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B6.3: URL State Management",
    description:
      "Search params, query parameters, hash navigation, and URL state patterns",
    topics: [
      "Search params",
      "Query parameters",
      "Hash navigation",
      "URL state patterns",
    ],
    status: "available",
  },
];

export default function B6Page() {
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
          B6: Navigation & Routing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master navigation and routing in Next.js App Router. Learn how to use
          navigation hooks, the Link component, and manage URL state
          effectively.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b6/${lesson.id}`}
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
