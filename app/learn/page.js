import Link from "next/link";

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Next.js Mastery Course
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Choose your learning path. We cover every method, every concept,
          nothing is skipped.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/learn/app-router"
          className="group rounded-lg border-2 border-blue-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
        >
          <h2 className="mb-2 text-2xl font-semibold text-blue-600 group-hover:text-blue-700 dark:text-blue-400">
            App Router Mastery
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Learn the latest Next.js App Router with React Server Components,
            Server Actions, and all modern features.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            12 Comprehensive Chapters
          </div>
        </Link>

        <Link
          href="/learn/pages-router"
          className="group rounded-lg border-2 border-blue-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
        >
          <h2 className="mb-2 text-2xl font-semibold text-blue-600 group-hover:text-blue-700 dark:text-blue-400">
            Pages Router Mastery
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Master the Pages Router with getServerSideProps, getStaticProps, and
            all traditional Next.js patterns.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            10 Comprehensive Chapters
          </div>
        </Link>

        <Link
          href="/learn/comparison"
          className="group rounded-lg border-2 border-green-200 bg-white p-6 transition-all hover:border-green-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-500"
        >
          <h2 className="mb-2 text-2xl font-semibold text-green-600 group-hover:text-green-700 dark:text-green-400">
            Comparison & Common Features
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Learn about features that work the same in both App Router and Pages
            Router.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            9 Common Features
          </div>
        </Link>

        <Link
          href="/learn/recent-updates"
          className="group rounded-lg border-2 border-purple-200 bg-white p-6 transition-all hover:border-purple-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-500"
        >
          <h2 className="mb-2 text-2xl font-semibold text-purple-600 group-hover:text-purple-700 dark:text-purple-400">
            Recent Updates
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Stay up-to-date with the latest Next.js features, version updates,
            and new concepts.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Latest Features & Changes
          </div>
        </Link>
      </div>
    </div>
  );
}
