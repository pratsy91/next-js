import Link from "next/link";

const updates = [
  {
    id: "v16",
    title: "Next.js 16 - New Features & Changes",
    description:
      "Learn about all the new features, methods, and concepts introduced in Next.js 16",
    lessons: 8,
    status: "available",
  },
];

export default function RecentUpdatesPage() {
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
          Recent Updates
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Stay current with the latest Next.js features, version updates, and
          new concepts not covered in the main learning paths.
        </p>
      </div>

      <div className="space-y-4">
        {updates.map((update) => (
          <Link
            key={update.id}
            href={
              update.status === "available"
                ? `/learn/recent-updates/${update.id}`
                : "#"
            }
            className={`block rounded-lg border-2 p-6 transition-all ${
              update.status === "available"
                ? "border-purple-200 bg-white hover:border-purple-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-500"
                : "border-gray-200 bg-gray-50 opacity-60 dark:border-gray-700 dark:bg-gray-800"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2
                  className={`mb-2 text-xl font-semibold ${
                    update.status === "available"
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-400"
                  }`}
                >
                  {update.title}
                </h2>
                <p className="mb-2 text-gray-600 dark:text-gray-300">
                  {update.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {update.lessons} Lessons
                </div>
              </div>
              {update.status === "locked" && (
                <div className="ml-4 text-gray-400">🔒</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
