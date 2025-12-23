import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "C3.1: When to use Pages Router",
    description:
      "Understand when Pages Router is the right choice for your project",
    topics: [
      "Legacy projects",
      "Built-in i18n requirements",
      "Shallow routing needs",
      "getInitialProps usage",
      "Stability and maturity",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "C3.2: When to use App Router",
    description:
      "Understand when App Router is the right choice for your project",
    topics: [
      "New projects",
      "Server Components benefits",
      "Server Actions needs",
      "Streaming requirements",
      "Modern React features",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "C3.3: Migration Strategies",
    description: "Learn how to migrate from Pages Router to App Router",
    topics: [
      "Incremental migration",
      "Route-by-route migration",
      "Data fetching migration",
      "API routes migration",
      "Best practices",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "C3.4: Coexistence Patterns",
    description: "Run both routers in the same Next.js application",
    topics: [
      "Running both routers",
      "Gradual migration",
      "Shared components",
      "Configuration",
      "Common patterns",
    ],
    status: "available",
  },
];

export default function C3Page() {
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
          C3: Migration Considerations
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn when to use each router, how to migrate between them, and how to
          run both routers in the same application.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/comparison/c3/${lesson.id}`}
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
