import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B7.1: Static Metadata",
    description:
      "Metadata object export, all metadata types, Open Graph, Twitter Cards, icons, manifest, robots, and verification metadata",
    topics: [
      "Metadata object export",
      "All metadata types (title, description, keywords, authors, etc.)",
      "Open Graph metadata",
      "Twitter Card metadata",
      "Icons and manifest",
      "Robots metadata",
      "Verification metadata",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B7.2: Dynamic Metadata",
    description:
      "generateMetadata function, async metadata generation, metadata with params and searchParams, inheritance, and merging",
    topics: [
      "generateMetadata function",
      "Async metadata generation",
      "Metadata with params",
      "Metadata with searchParams",
      "Metadata inheritance",
      "Metadata merging",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B7.3: Metadata Patterns",
    description:
      "SEO optimization, social media sharing, dynamic titles, canonical URLs, and alternate languages",
    topics: [
      "SEO optimization",
      "Social media sharing",
      "Dynamic titles",
      "Canonical URLs",
      "Alternate languages",
    ],
    status: "available",
  },
];

export default function B7Page() {
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
          B7: Metadata API
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master the Metadata API in Next.js App Router. Learn how to configure
          static and dynamic metadata for optimal SEO, social media sharing, and
          search engine optimization.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b7/${lesson.id}`}
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
