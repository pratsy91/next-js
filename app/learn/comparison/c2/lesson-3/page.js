import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C2.3: Navigation - Next.js Mastery",
  description: "Navigation API differences between App Router and Pages Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c2"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C2 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C2.3: Navigation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Compare navigation APIs: Pages Router uses next/router, App Router
          uses next/navigation.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Pages Router: next/router (useRouter)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router provides a single useRouter hook from next/router.
          </p>

          <CodeBlock
            code={`// Pages Router: next/router
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  
  // Navigation
  router.push('/about');
  router.replace('/about');
  router.back();
  router.reload();
  
  // Route information
  const { pathname, query, asPath } = router;
  
  // Route parameters
  const { id } = router.query; // /posts/[id]
  
  // Events
  router.events.on('routeChangeStart', (url) => {
    console.log('Route changing to:', url);
  });
  
  return (
    <div>
      <p>Current path: {pathname}</p>
      <button onClick={() => router.push('/about')}>
        Go to About
      </button>
    </div>
  );
}

// Shallow routing (Pages Router only)
router.push('/about?counter=1', undefined, { shallow: true });

// Prefetching
import Link from 'next/link';
<Link href="/about" prefetch={false}>About</Link>`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. App Router: next/navigation (Multiple Hooks)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router provides multiple specialized hooks from next/navigation.
          </p>

          <CodeBlock
            code={`// App Router: next/navigation
'use client';

import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  
  // Navigation
  router.push('/about');
  router.replace('/about');
  router.back();
  router.refresh(); // Re-fetch data (no reload)
  router.prefetch('/about'); // Prefetch route
  
  // Route information
  // pathname: Current pathname
  // searchParams: URLSearchParams object
  // params: Dynamic route parameters
  
  // Route parameters
  const { id } = params; // /posts/[id]
  
  // Query parameters
  const page = searchParams.get('page');
  
  return (
    <div>
      <p>Current path: {pathname}</p>
      <p>Page: {page}</p>
      <button onClick={() => router.push('/about')}>
        Go to About
      </button>
    </div>
  );
}

// Separate hooks for different purposes
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  return <nav>Current: {pathname}</nav>;
}

// No shallow routing in App Router
// No router.events in App Router`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Key Differences
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Comparison of navigation features.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Pages Router
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    App Router
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Import
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    next/router
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    next/navigation
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Main Hook
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    useRouter (all features)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    useRouter, usePathname, useSearchParams, useParams
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Pathname
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    router.pathname
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    usePathname()
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Query Params
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    router.query
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    useSearchParams()
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Route Params
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    router.query
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    useParams()
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Shallow Routing
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Supported
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not supported
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Route Events
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ router.events
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not available
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Refresh
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    router.reload() (full reload)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    router.refresh() (re-fetch)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c2/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C2.2 Data Fetching
          </Link>
          <Link
            href="/learn/comparison/c2/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C2.4 Layouts →
          </Link>
        </div>
      </div>
    </div>
  );
}
