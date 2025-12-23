import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "A4.1: API Route Basics",
    description:
      "File structure, route handlers for all HTTP methods, request/response objects, and TypeScript types",
    topics: [
      "File structure (pages/api/)",
      "Route handlers (all HTTP methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS)",
      "Request/Response objects",
      "TypeScript types",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "A4.2: API Route Features",
    description:
      "Dynamic routes, catch-all routes, middleware, CORS, authentication, file uploads, streaming, and Edge runtime",
    topics: [
      "Dynamic API routes (pages/api/posts/[id].js)",
      "Catch-all API routes (pages/api/[...params].js)",
      "Optional catch-all (pages/api/[[...params]].js)",
      "Middleware in API routes",
      "CORS handling",
      "Authentication in API routes",
      "File uploads",
      "Streaming responses",
      "Edge runtime in API routes",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "A4.3: API Route Patterns",
    description:
      "RESTful API design, error handling, response formatting, status codes, headers, cookies, and body parsing",
    topics: [
      "RESTful API design",
      "Error handling",
      "Response formatting",
      "Status codes",
      "Headers manipulation",
      "Cookies handling",
      "Body parsing (JSON, form-data, text)",
    ],
    status: "available",
  },
];

export default function A4Page() {
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
          A4: API Routes
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete guide to building API routes in Next.js Pages Router. Learn
          how to create RESTful APIs, handle requests, and implement advanced
          features.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/pages-router/a4/${lesson.id}`}
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
