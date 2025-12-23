import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B12.1: Build Process",
    description:
      "next build command, build output, static export, standalone output, and build analysis",
    topics: [
      "next build command",
      "Build output",
      "Static export",
      "Standalone output",
      "Build analysis",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B12.2: Deployment Platforms",
    description:
      "Vercel deployment, self-hosting, Docker deployment, Node.js server, and static hosting",
    topics: [
      "Vercel deployment",
      "Self-hosting",
      "Docker deployment",
      "Node.js server",
      "Static hosting",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B12.3: Production Configuration",
    description:
      "Environment variables, error tracking, analytics, monitoring, and performance budgets",
    topics: [
      "Environment variables",
      "Error tracking",
      "Analytics",
      "Monitoring",
      "Performance budgets",
    ],
    status: "available",
  },
];

export default function B12Page() {
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
          B12: Deployment
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master deployment in Next.js App Router. Learn the build process,
          deployment platforms, and production configuration to deploy your
          applications successfully.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b12/${lesson.id}`}
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
