import Link from "next/link";

const chapters = [
  {
    id: "a1",
    title: "A1: Foundation & Setup",
    description: "Project setup, structure, and core concepts",
    lessons: 2,
    status: "available",
  },
  {
    id: "a2",
    title: "A2: Routing System",
    description:
      "Complete routing system with pages, dynamic routes, and special files",
    lessons: 3,
    status: "available",
  },
  {
    id: "a3",
    title: "A3: Data Fetching",
    description: "getServerSideProps, getStaticProps, getStaticPaths, and ISR",
    lessons: 5,
    status: "available",
  },
  {
    id: "a4",
    title: "A4: API Routes",
    description: "API routes, HTTP methods, and route handlers",
    lessons: 3,
    status: "available",
  },
  {
    id: "a5",
    title: "A5: Components & Features",
    description: "next/head, next/image, next/script, next/font",
    lessons: 4,
    status: "available",
  },
  {
    id: "a6",
    title: "A6: Custom App & Document",
    description: "_app.js, _document.js, and custom configurations",
    lessons: 2,
    status: "available",
  },
  {
    id: "a7",
    title: "A7: Styling",
    description: "CSS Modules, Tailwind, CSS-in-JS, and styling strategies",
    lessons: 5,
    status: "available",
  },
  {
    id: "a8",
    title: "A8: Advanced Features",
    description: "Middleware, i18n, preview mode, redirects, and rewrites",
    lessons: 5,
    status: "available",
  },
  {
    id: "a9",
    title: "A9: Optimization",
    description: "Performance, caching, SEO, and optimization strategies",
    lessons: 3,
    status: "available",
  },
  {
    id: "a10",
    title: "A10: Deployment",
    description: "Build process, deployment platforms, and production config",
    lessons: 3,
    status: "available",
  },
  {
    id: "a11",
    title: "A11: Interview Cheatsheet",
    description:
      "Complete interview preparation guide with quick reference, patterns, and Q&A",
    lessons: 10,
    status: "available",
  },
];

export default function PagesRouterPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Learning Hub
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Pages Router Mastery
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete guide to Next.js Pages Router. Every method, every concept
          covered.
        </p>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={
              chapter.status === "available"
                ? `/learn/pages-router/${chapter.id}`
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
