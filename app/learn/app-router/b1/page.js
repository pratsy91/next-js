import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B1.1: Project Setup",
    description:
      "Complete project setup with create-next-app, manual setup, project structure, configuration, and environment variables",
    topics: [
      "create-next-app with App Router",
      "Manual setup with app/ directory",
      "Project structure (app/, public/, components/, lib/)",
      "next.config.js configuration (all options)",
      "Environment variables",
      "TypeScript setup for App Router",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B1.2: Core Concepts",
    description:
      "React Server Components, Server vs Client Components, component tree, streaming, Server Actions, and progressive enhancement",
    topics: [
      "React Server Components",
      "Server Components vs Client Components",
      "Component tree structure",
      "Streaming and Suspense",
      "Server Actions",
      "Progressive Enhancement",
    ],
    status: "available",
  },
];

export default function B1Page() {
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
          B1: Foundation & Setup
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn the fundamentals of Next.js App Router setup and core concepts.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b1/${lesson.id}`}
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
