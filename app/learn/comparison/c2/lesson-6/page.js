import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C2.6: Loading States - Next.js Mastery",
  description:
    "Loading state handling differences between App Router and Pages Router",
};

export default function Lesson6Page() {
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
          C2.6: Loading States
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Compare loading state handling: Pages Router requires manual
          implementation, App Router has automatic loading.js files.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Pages Router: Manual Loading States
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router requires manual loading state management.
          </p>

          <CodeBlock
            code={`// Pages Router: Manual loading state
// pages/profile.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return <div>Profile content</div>;
}

// With getServerSideProps (no loading UI)
// Data is fetched before page renders
export async function getServerSideProps() {
  const user = await getUser();
  return { props: { user } };
}

// Manual loading with Suspense (if using React 18+)
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
    </Suspense>
  );
}

// Limitations:
// - Manual implementation required
// - No automatic loading UI
// - Must handle loading states yourself`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. App Router: loading.js Files with Suspense
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router automatically handles loading states with loading.js
            files.
          </p>

          <CodeBlock
            code={`// App Router: Automatic loading UI
// app/dashboard/loading.js
export default function Loading() {
  return <div>Loading dashboard...</div>;
}

// app/dashboard/page.tsx
export default async function Dashboard() {
  const data = await fetchData(); // This triggers loading.js
  return <div>{data}</div>;
}

// Nested loading states
app/
  ├── loading.js              // Root loading
  ├── dashboard/
  │   ├── loading.js          // Dashboard loading
  │   ├── settings/
  │   │   ├── loading.js     // Settings loading
  │   │   └── page.tsx

// Loading.js automatically wraps children in Suspense
// No manual Suspense needed!

// Streaming with Suspense boundaries
// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile />
      </Suspense>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
    </div>
  );
}

// Benefits:
// ✅ Automatic loading UI
// ✅ Nested loading states
// ✅ Streaming support
// ✅ Better UX`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Comparison
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Key differences in loading state handling.
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
                    Loading UI
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Manual implementation
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Automatic (loading.js)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Route-based Loading
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    router.events
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Automatic with loading.js
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Nested Loading
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not supported
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Multiple loading.js files
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Streaming
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not supported
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Built-in with Suspense
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Suspense Integration
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Manual (React 18+)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Automatic
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c2/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C2.5 Metadata
          </Link>
          <Link
            href="/learn/comparison/c2/lesson-7"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C2.7 Error Handling →
          </Link>
        </div>
      </div>
    </div>
  );
}
