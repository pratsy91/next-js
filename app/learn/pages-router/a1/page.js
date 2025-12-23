import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "A1.1: Project Setup",
    description:
      "Complete project setup with create-next-app, manual setup, project structure, configuration, and environment variables",
    topics: [
      "create-next-app with Pages Router",
      "Manual setup with pages/ directory",
      "Project structure (pages/, public/, styles/, components/)",
      "next.config.js configuration (all options)",
      "Environment variables (.env.local, .env.development, .env.production)",
      "TypeScript setup for Pages Router",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "A1.2: Core Concepts",
    description:
      "File-based routing, automatic code splitting, pre-rendering concepts (SSG, SSR, ISR), client-side navigation, and production vs development builds",
    topics: [
      "File-based routing in pages/",
      "Automatic code splitting",
      "Pre-rendering concepts (SSG, SSR, ISR)",
      "Client-side navigation",
      "Production vs development builds",
    ],
    status: "available",
  },
];

export default function A1Page() {
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
          A1: Foundation & Setup
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn the fundamentals of Next.js Pages Router setup and core
          concepts.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/pages-router/a1/${lesson.id}`}
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
