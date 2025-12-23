import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "A3.1: getServerSideProps",
    description:
      "Server-side rendering with getServerSideProps: context object, return values, error handling, authentication, API calls, database queries, and caching",
    topics: [
      "Basic usage",
      "Context object (params, req, res, query, preview, previewData, resolvedUrl, locale, locales, defaultLocale)",
      "Return object (props, notFound, redirect)",
      "Error handling",
      "Authentication in getServerSideProps",
      "API calls in getServerSideProps",
      "Database queries",
      "Caching behavior",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "A3.2: getStaticProps",
    description:
      "Static site generation with getStaticProps: context, return values, ISR, revalidation strategies, preview mode, and TypeScript",
    topics: [
      "Basic usage",
      "Context object (params, preview, previewData, locale, locales, defaultLocale)",
      "Return object (props, revalidate, notFound)",
      "ISR (Incremental Static Regeneration)",
      "Revalidation strategies (time-based, on-demand)",
      "Preview mode",
      "TypeScript types",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "A3.3: getStaticPaths",
    description:
      "Dynamic static routes with getStaticPaths: paths generation, fallback modes, TypeScript, and combining with getStaticProps",
    topics: [
      "Basic usage",
      "Return object (paths, fallback)",
      "Fallback modes: false, true, 'blocking'",
      "Dynamic route generation",
      "TypeScript types",
      "Combining with getStaticProps",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "A3.4: getInitialProps (Legacy)",
    description:
      "Legacy data fetching method: usage in pages and _app.js, context object, and when to use vs avoid",
    topics: [
      "Usage in pages",
      "Usage in _app.js",
      "Context object",
      "When to use vs avoid",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "A3.5: Client-Side Data Fetching",
    description:
      "Client-side data fetching: useEffect with fetch, SWR, React Query, loading states, and error handling",
    topics: [
      "useEffect with fetch",
      "SWR integration",
      "React Query integration",
      "Data fetching libraries",
      "Loading states",
      "Error handling",
    ],
    status: "available",
  },
];

export default function A3Page() {
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
          A3: Data Fetching
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete guide to data fetching in Next.js Pages Router: SSR, SSG,
          ISR, and client-side fetching.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/pages-router/a3/${lesson.id}`}
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
