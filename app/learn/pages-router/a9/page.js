import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "A9.1: Performance",
    description:
      "Code splitting, dynamic imports, lazy loading, bundle analysis, webpack configuration, and tree shaking",
    topics: [
      "Code splitting",
      "Dynamic imports",
      "Lazy loading components",
      "Bundle analysis",
      "Webpack configuration",
      "Tree shaking",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "A9.2: Caching",
    description:
      "Static page caching, API route caching, ISR caching, CDN caching, and browser caching strategies",
    topics: [
      "Static page caching",
      "API route caching",
      "ISR caching",
      "CDN caching",
      "Browser caching",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "A9.3: SEO",
    description:
      "Meta tags optimization, structured data, sitemap generation, robots.txt, Open Graph, and Twitter Cards",
    topics: [
      "Meta tags optimization",
      "Structured data",
      "Sitemap generation",
      "robots.txt",
      "Open Graph",
      "Twitter Cards",
    ],
    status: "available",
  },
];

export default function A9Page() {
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
          A9: Optimization
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Performance optimization, caching strategies, and SEO best practices
          for Next.js Pages Router applications.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/pages-router/a9/${lesson.id}`}
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
