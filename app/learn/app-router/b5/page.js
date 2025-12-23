import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B5.1: Route Handler Basics",
    description:
      "File structure, HTTP methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS), Request/Response handling, and TypeScript types",
    topics: [
      "File structure (app/api/route.js)",
      "HTTP methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS)",
      "Request/Response handling",
      "TypeScript types",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B5.2: Route Handler Features",
    description:
      "Dynamic routes, catch-all routes, optional catch-all, route segment config, Edge/Node.js runtime, streaming responses, and CORS handling",
    topics: [
      "Dynamic route handlers",
      "Catch-all route handlers",
      "Optional catch-all",
      "Route segment config",
      "Edge runtime",
      "Node.js runtime",
      "Streaming responses",
      "CORS handling",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B5.3: Route Handler Patterns",
    description:
      "RESTful API design, error handling, authentication, file uploads, webhooks, and response streaming",
    topics: [
      "RESTful API design",
      "Error handling",
      "Authentication",
      "File uploads",
      "Webhooks",
      "Response streaming",
    ],
    status: "available",
  },
];

export default function B5Page() {
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
          B5: Route Handlers
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master Route Handlers in Next.js App Router. Learn how to create API
          endpoints, handle HTTP methods, implement advanced features, and
          follow best practices for building robust APIs.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b5/${lesson.id}`}
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
