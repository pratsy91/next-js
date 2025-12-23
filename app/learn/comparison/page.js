import Link from "next/link";

const chapters = [
  {
    id: "c1",
    title: "C1: Common Features (Work in Both)",
    description:
      "Features that work the same way in both App Router and Pages Router",
    lessons: 9,
    status: "available",
  },
  {
    id: "c2",
    title: "C2: Key Differences",
    description:
      "Understand the key differences between App Router and Pages Router",
    lessons: 9,
    status: "available",
  },
  {
    id: "c3",
    title: "C3: Migration Considerations",
    description:
      "Learn when to use each router, migration strategies, and coexistence patterns",
    lessons: 4,
    status: "available",
  },
];

export default function ComparisonPage() {
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
          Comparison & Common Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about features that work in both routers and understand the key
          differences between App Router and Pages Router.
        </p>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/learn/comparison/${chapter.id}`}
            className="block rounded-lg border-2 border-blue-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="mb-2 text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {chapter.title}
                </h2>
                <p className="mb-2 text-gray-600 dark:text-gray-300">
                  {chapter.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {chapter.lessons} Lessons
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
