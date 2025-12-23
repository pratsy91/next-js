import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "C2.1: Routing",
    description:
      "File-based routing differences: Pages Router uses pages/, App Router uses app/ with special files",
    topics: [
      "Pages Router: File-based in pages/",
      "App Router: File-based in app/ with special files",
      "Route structure differences",
      "Special file differences",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "C2.2: Data Fetching",
    description:
      "Different data fetching approaches: getServerSideProps/getStaticProps vs async Server Components and Server Actions",
    topics: [
      "Pages Router: getServerSideProps, getStaticProps, getStaticPaths",
      "App Router: Async Server Components, Server Actions, fetch with caching",
      "When to use each approach",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "C2.3: Navigation",
    description: "Navigation API differences: next/router vs next/navigation",
    topics: [
      "Pages Router: next/router (useRouter)",
      "App Router: next/navigation (useRouter, usePathname, useSearchParams, useParams)",
      "API differences",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "C2.4: Layouts",
    description:
      "Layout system differences: _app.js/_document.js vs layout.js files",
    topics: [
      "Pages Router: Custom _app.js and _document.js",
      "App Router: layout.js files at any level",
      "Nested layouts",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "C2.5: Metadata",
    description: "Metadata handling: next/head vs Metadata API",
    topics: [
      "Pages Router: next/head component",
      "App Router: Metadata API (static and generateMetadata)",
      "SEO differences",
    ],
    status: "available",
  },
  {
    id: "lesson-6",
    title: "C2.6: Loading States",
    description: "Loading state handling: manual vs automatic with loading.js",
    topics: [
      "Pages Router: Manual with getServerSideProps/getStaticProps",
      "App Router: loading.js files with Suspense",
      "Loading UI patterns",
    ],
    status: "available",
  },
  {
    id: "lesson-7",
    title: "C2.7: Error Handling",
    description:
      "Error handling differences: _error.js vs error.js and not-found.js",
    topics: [
      "Pages Router: _error.js and custom 404/500",
      "App Router: error.js and not-found.js files",
      "Error boundary differences",
    ],
    status: "available",
  },
  {
    id: "lesson-8",
    title: "C2.8: API Routes",
    description: "API route differences: pages/api/ vs app/api/route.js",
    topics: [
      "Pages Router: pages/api/ with default export",
      "App Router: app/api/route.js with named exports",
      "Route handler differences",
    ],
    status: "available",
  },
  {
    id: "lesson-9",
    title: "C2.9: Special Features",
    description: "Special features unique to each router",
    topics: [
      "Pages Router: Shallow routing, getInitialProps",
      "App Router: Server Actions, Streaming, Parallel Routes, Intercepting Routes",
      "Feature comparison",
    ],
    status: "available",
  },
];

export default function C2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Comparison & Common Features
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C2: Key Differences
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Understand the key differences between App Router and Pages Router.
          Learn when to use each approach and how they differ in implementation.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/comparison/c2/${lesson.id}`}
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
