import Link from "next/link";

const chapters = [
  {
    id: "b1",
    title: "B1: Foundation & Setup",
    description: "Project setup, structure, and core concepts",
    lessons: 2,
    status: "available",
  },
  {
    id: "b2",
    title: "B2: Routing System",
    description:
      "Complete routing system with layouts, pages, and special files",
    lessons: 6,
    status: "available",
  },
  {
    id: "b3",
    title: "B3: Data Fetching",
    description: "Server Components, caching, and data fetching strategies",
    lessons: 4,
    status: "available",
  },
  {
    id: "b4",
    title: "B4: Server Actions",
    description: "Server Actions, Form Actions, and progressive enhancement",
    lessons: 3,
    status: "available",
  },
  {
    id: "b5",
    title: "B5: Route Handlers",
    description: "API routes, HTTP methods, and route handlers",
    lessons: 3,
    status: "available",
  },
  {
    id: "b6",
    title: "B6: Navigation & Routing",
    description: "next/navigation hooks, Link component, and URL state",
    lessons: 3,
    status: "available",
  },
  {
    id: "b7",
    title: "B7: Metadata API",
    description: "Static and dynamic metadata, SEO optimization",
    lessons: 3,
    status: "available",
  },
  {
    id: "b8",
    title: "B8: Components & Features",
    description: "next/image, next/script, next/font optimization",
    lessons: 3,
    status: "available",
  },
  {
    id: "b9",
    title: "B9: Styling",
    description: "CSS Modules, Tailwind, CSS-in-JS, and styling strategies",
    lessons: 5,
    status: "available",
  },
  {
    id: "b10",
    title: "B10: Advanced Features",
    description: "Middleware, route segment config, i18n, and more",
    lessons: 6,
    status: "available",
  },
  {
    id: "b11",
    title: "B11: Optimization",
    description: "Performance, caching, SEO, and optimization strategies",
    lessons: 3,
    status: "available",
  },
  {
    id: "b12",
    title: "B12: Deployment",
    description: "Build process, deployment platforms, and production config",
    lessons: 3,
    status: "available",
  },
  {
    id: "b13",
    title: "B13: Interview Cheatsheet",
    description:
      "Complete interview preparation guide with quick reference, patterns, and Q&A",
    lessons: 10,
    status: "available",
  },
];

export default function AppRouterPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          App Router Mastery
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete guide to Next.js App Router. Every method, every concept
          covered.
        </p>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={
              chapter.status === "available"
                ? `/learn/app-router/${chapter.id}`
                : "#"
            }
            className={`block rounded-lg border-2 p-6 transition-all ${
              chapter.status === "available"
                ? "border-blue-200 bg-white hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
                : "border-gray-200 bg-gray-50 opacity-60 dark:border-gray-700 dark:bg-gray-800"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2
                  className={`mb-2 text-xl font-semibold ${
                    chapter.status === "available"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-400"
                  }`}
                >
                  {chapter.title}
                </h2>
                <p className="mb-2 text-gray-600 dark:text-gray-300">
                  {chapter.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {chapter.lessons} Lessons
                </div>
              </div>
              {chapter.status === "locked" && (
                <div className="ml-4 text-gray-400">🔒</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
