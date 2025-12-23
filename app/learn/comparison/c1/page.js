import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "C1.1: next/image",
    description:
      "Image optimization component - same API works in both App Router and Pages Router",
    topics: [
      "Same API in both routers",
      "Image optimization",
      "Props and features",
      "Usage examples",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "C1.2: next/script",
    description:
      "Script optimization component - same API works in both App Router and Pages Router",
    topics: [
      "Same API in both routers",
      "Loading strategies",
      "Script optimization",
      "Usage examples",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "C1.3: next/font",
    description:
      "Font optimization - same API works in both App Router and Pages Router",
    topics: [
      "Same API in both routers",
      "Font optimization",
      "Google fonts and local fonts",
      "Usage examples",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "C1.4: next.config.js",
    description:
      "Next.js configuration - same options work in both App Router and Pages Router",
    topics: [
      "Same configuration options",
      "Common settings",
      "Router-specific options",
      "Configuration examples",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "C1.5: Middleware",
    description:
      "Middleware API - same functionality, different routing context",
    topics: [
      "Same API",
      "Different routing context",
      "Request/Response manipulation",
      "Usage in both routers",
    ],
    status: "available",
  },
  {
    id: "lesson-6",
    title: "C1.6: Environment Variables",
    description:
      "Environment variables - same behavior in both App Router and Pages Router",
    topics: [
      "Same behavior",
      "NEXT_PUBLIC_ prefix",
      "Server-only variables",
      "Configuration",
    ],
    status: "available",
  },
  {
    id: "lesson-7",
    title: "C1.7: Styling",
    description:
      "Styling approaches - same methods work in both App Router and Pages Router",
    topics: [
      "CSS Modules",
      "Global CSS",
      "CSS-in-JS",
      "Tailwind CSS",
      "Sass/SCSS",
    ],
    status: "available",
  },
  {
    id: "lesson-8",
    title: "C1.8: Deployment",
    description:
      "Deployment process - same build and deployment steps for both routers",
    topics: [
      "Same build process",
      "Deployment platforms",
      "Production configuration",
      "Platform-specific notes",
    ],
    status: "available",
  },
  {
    id: "lesson-9",
    title: "C1.9: Optimization",
    description:
      "Optimization strategies - similar concepts with different implementations",
    topics: [
      "Performance optimization",
      "Caching strategies",
      "SEO optimization",
      "Router-specific differences",
    ],
    status: "available",
  },
];

export default function C1Page() {
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
          C1: Common Features (Work in Both)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about features that work the same way in both App Router and
          Pages Router. These are the shared APIs and configurations that make
          transitioning between routers easier.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/comparison/c1/${lesson.id}`}
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
