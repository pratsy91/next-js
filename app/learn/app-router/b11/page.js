import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B11.1: Performance",
    description:
      "Code splitting, dynamic imports, lazy loading, bundle analysis, tree shaking, and streaming optimization",
    topics: [
      "Code splitting",
      "Dynamic imports",
      "Lazy loading",
      "Bundle analysis",
      "Tree shaking",
      "Streaming optimization",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B11.2: Caching",
    description:
      "Fetch caching, Full Route Cache, Router Cache, Request Memoization, Data Cache, and cache invalidation",
    topics: [
      "Fetch caching",
      "Full Route Cache",
      "Router Cache",
      "Request Memoization",
      "Data Cache",
      "Cache invalidation",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B11.3: SEO",
    description:
      "Metadata optimization, structured data, sitemap generation, robots.txt, Open Graph, and Twitter Cards",
    topics: [
      "Metadata optimization",
      "Structured data",
      "Sitemap generation",
      "robots.txt",
      "Open Graph",
      "Twitter Cards",
    ],
    status: "available",
  },
];

export default function B11Page() {
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
          B11: Optimization
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master optimization techniques in Next.js App Router. Learn
          performance optimization, caching strategies, and SEO best practices
          to build fast, efficient, and discoverable web applications.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b11/${lesson.id}`}
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
