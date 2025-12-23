import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "A8.1: Middleware (Pages Router)",
    description:
      "Middleware for request/response manipulation, redirects, rewrites, headers, cookies, and authentication",
    topics: [
      "File location (middleware.js)",
      "Matcher configuration",
      "Request/Response manipulation",
      "Redirects and rewrites",
      "Headers and cookies",
      "Authentication",
      "Edge runtime",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "A8.2: Internationalization (i18n)",
    description:
      "Built-in i18n routing: locale detection, subdomain/domain routing, locale switching, and data fetching with locales",
    topics: [
      "Built-in i18n routing",
      "Locale detection",
      "Subdomain and domain routing",
      "Locale switching",
      "getStaticProps with locales",
      "getServerSideProps with locales",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "A8.3: Preview Mode",
    description:
      "Preview mode for draft content: enabling/disabling, preview API route, and getStaticProps with preview",
    topics: [
      "Enabling preview mode",
      "Disabling preview mode",
      "Preview API route",
      "getStaticProps with preview",
      "Draft content handling",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "A8.4: Redirects & Rewrites",
    description:
      "URL redirects and rewrites: next.config.js configuration, conditional redirects, and external/internal routing",
    topics: [
      "next.config.js redirects",
      "next.config.js rewrites",
      "Conditional redirects",
      "External redirects",
      "Internal rewrites",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "A8.5: Environment Variables",
    description:
      "Environment variables: public vs server-only, runtime vs build-time, and TypeScript types",
    topics: [
      "Public variables (NEXT_PUBLIC_*)",
      "Server-only variables",
      "Runtime vs build-time",
      "TypeScript types",
    ],
    status: "available",
  },
];

export default function A8Page() {
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
          A8: Advanced Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Advanced Next.js Pages Router features: middleware,
          internationalization, preview mode, redirects, rewrites, and
          environment variables.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/pages-router/a8/${lesson.id}`}
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
