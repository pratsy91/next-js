import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "A5.1: next/head",
    description:
      "Head component for managing document head: meta tags, scripts, links, and conditional rendering",
    topics: [
      "Head component usage",
      "All meta tags (title, description, og tags, twitter cards, etc.)",
      "Script tags in Head",
      "Link tags in Head",
      "Multiple Head components",
      "Conditional rendering",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "A5.2: next/image",
    description:
      "Image component with optimization, loading strategies, placeholders, responsive images, and more",
    topics: [
      "Image component (all props)",
      "Optimization features",
      "Loading strategies (lazy, eager)",
      "Placeholder (blur, empty)",
      "Sizes and srcSet",
      "Priority loading",
      "External domains configuration",
      "Image formats (WebP, AVIF)",
      "Responsive images",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "A5.3: next/script",
    description:
      "Script component for optimized script loading with different strategies and optimization",
    topics: [
      "Script component",
      "Loading strategies (beforeInteractive, afterInteractive, lazyOnload)",
      "Inline scripts",
      "External scripts",
      "Script optimization",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "A5.4: next/font",
    description:
      "Font optimization with Google Fonts, local fonts, display strategies, variable fonts, and preloading",
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

export default function A5Page() {
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
          A5: Components & Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master Next.js built-in components: next/head, next/image,
          next/script, and next/font for optimal performance and SEO.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/pages-router/a5/${lesson.id}`}
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
