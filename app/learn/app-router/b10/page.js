import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B10.1: Middleware (App Router)",
    description:
      "File location (middleware.js), matcher configuration, request/response manipulation, redirects, rewrites, headers, cookies, authentication, Edge runtime, and NextResponse API",
    topics: [
      "File location (middleware.js in root)",
      "Matcher configuration",
      "Request/Response manipulation",
      "Redirects",
      "Rewrites",
      "Headers",
      "Cookies",
      "Authentication",
      "Edge runtime",
      "NextResponse API",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B10.2: Route Segment Config",
    description:
      "dynamic, dynamicParams, revalidate, fetchCache, runtime, preferredRegion options, and export options",
    topics: [
      "dynamic option",
      "dynamicParams option",
      "revalidate option",
      "fetchCache option",
      "runtime option",
      "preferredRegion option",
      "Export options",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B10.3: Internationalization",
    description:
      "Manual i18n implementation, locale routing, locale switching, next-intl library, and next-i18next library",
    topics: [
      "Manual i18n implementation",
      "Locale routing",
      "Locale switching",
      "next-intl library",
      "next-i18next library",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "B10.4: Redirects & Rewrites",
    description:
      "next.config.js redirects, next.config.js rewrites, conditional redirects, external redirects, and internal rewrites",
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
    title: "B10.5: Environment Variables",
    description:
      "Public variables, server-only variables, runtime vs build-time, and TypeScript types",
    topics: [
      "Public variables",
      "Server-only variables",
      "Runtime vs build-time",
      "TypeScript types",
    ],
    status: "available",
  },
  {
    id: "lesson-6",
    title: "B10.6: Draft Mode",
    description:
      "Enabling draft mode, disabling draft mode, draft API route, and preview content",
    topics: [
      "Enabling draft mode",
      "Disabling draft mode",
      "Draft API route",
      "Preview content",
    ],
    status: "available",
  },
];

export default function B10Page() {
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
          B10: Advanced Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master advanced features in Next.js App Router. Learn middleware,
          route segment configuration, internationalization, redirects &
          rewrites, environment variables, and draft mode.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b10/${lesson.id}`}
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
