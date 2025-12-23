import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B3.1: Server Components Data Fetching",
    description:
      "Async Server Components, Fetch API, caching options, revalidation strategies, and database queries",
    topics: [
      "Async Server Components",
      "Fetch API in Server Components",
      "Fetch caching (all cache options)",
      "Fetch revalidation (next.revalidate, next.revalidatePath, next.revalidateTag)",
      "Time-based revalidation",
      "On-demand revalidation",
      "Tag-based revalidation",
      "Database queries in Server Components",
      "API calls in Server Components",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B3.2: Caching Functions",
    description:
      "unstable_cache, cache function, revalidatePath, revalidateTag, cache strategies, and cache invalidation",
    topics: [
      "unstable_cache function",
      "cache function (React cache)",
      "revalidatePath function",
      "revalidateTag function",
      "Cache strategies",
      "Cache invalidation",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B3.3: Client-Side Data Fetching",
    description:
      "Client Components with fetch, useEffect, SWR, React Query, loading states, and error handling",
    topics: [
      "Client Components with fetch",
      "useEffect data fetching",
      "SWR integration",
      "React Query integration",
      "Loading states",
      "Error handling",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "B3.4: Streaming & Suspense",
    description:
      "Streaming SSR, Suspense boundaries, loading states, progressive rendering, and error boundaries with streaming",
    topics: [
      "Streaming SSR",
      "Suspense boundaries",
      "Loading states",
      "Progressive rendering",
      "Error boundaries with streaming",
    ],
    status: "available",
  },
];

export default function B3Page() {
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
          B3: Data Fetching
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master data fetching in Next.js App Router. Learn Server Components
          data fetching, caching strategies, client-side fetching, and streaming
          with Suspense.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b3/${lesson.id}`}
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
