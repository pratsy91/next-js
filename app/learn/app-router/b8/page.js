import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B8.1: next/image",
    description:
      "Image component with all props, optimization features, loading strategies, placeholders, sizes, srcSet, priority loading, external domains, image formats, and responsive images",
    topics: [
      "Image component (all props)",
      "Optimization features",
      "Loading strategies",
      "Placeholders",
      "Sizes and srcSet",
      "Priority loading",
      "External domains",
      "Image formats",
      "Responsive images",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B8.2: next/script",
    description:
      "Script component, loading strategies, inline scripts, external scripts, and script optimization",
    topics: [
      "Script component",
      "Loading strategies",
      "Inline scripts",
      "External scripts",
      "Script optimization",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B8.3: next/font",
    description:
      "Font optimization, next/font/google, next/font/local, font display strategies, variable fonts, and font preloading",
    topics: [
      "Font optimization",
      "next/font/google",
      "next/font/local",
      "Font display strategies",
      "Variable fonts",
      "Font preloading",
    ],
    status: "available",
  },
];

export default function B8Page() {
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
          B8: Components & Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master Next.js optimized components: Image, Script, and Font. Learn
          how to optimize images, scripts, and fonts for better performance and
          user experience.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b8/${lesson.id}`}
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
