import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="mb-6 text-6xl font-bold text-gray-900 dark:text-white">
          Next.js Mastery
        </h1>
        <p className="mb-12 text-xl text-gray-600 dark:text-gray-300">
          Complete guide to mastering Next.js - Every method, every concept,
          nothing left out
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/learn/app-router"
            className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Start with App Router
          </Link>
          <Link
            href="/learn/pages-router"
            className="rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
          >
            Start with Pages Router
          </Link>
          <Link
            href="/learn/comparison"
            className="rounded-lg border-2 border-green-600 px-8 py-4 text-lg font-semibold text-green-600 transition-colors hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
          >
            Comparison & Common Features
          </Link>
          <Link
            href="/learn/recent-updates"
            className="rounded-lg border-2 border-purple-600 px-8 py-4 text-lg font-semibold text-purple-600 transition-colors hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20"
          >
            Recent Updates
          </Link>
        </div>
        <div className="mt-16 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Learning Path
          </h2>
          <div className="grid gap-4 text-left sm:grid-cols-3">
            <div>
              <h3 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                App Router (Current)
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>✓ B1: Foundation & Setup</li>
                <li>B2: Routing System</li>
                <li>B3: Data Fetching</li>
                <li>B4: Server Actions</li>
                <li>... and 8 more chapters</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                Pages Router (Current)
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>✓ A1: Foundation & Setup</li>
                <li>A2: Routing System</li>
                <li>A3: Data Fetching</li>
                <li>... and 7 more chapters</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-green-600 dark:text-green-400">
                Comparison & Common Features
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>✓ C1: Common Features</li>
                <li>✓ C2: Key Differences</li>
                <li>✓ C3: Migration Considerations</li>
                <li>22 comprehensive lessons</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
