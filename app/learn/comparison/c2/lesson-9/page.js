import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C2.9: Special Features - Next.js Mastery",
  description: "Special features unique to each router",
};

export default function Lesson9Page() {
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
          C2.9: Special Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Compare special features: Pages Router has shallow routing and
          getInitialProps, App Router has Server Actions, Streaming, Parallel
          Routes, and Intercepting Routes.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Pages Router: Shallow Routing, getInitialProps
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router has unique features like shallow routing and
            getInitialProps.
          </p>

          <CodeBlock
            code={`// Pages Router: Shallow routing
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  
  // Update URL without running data fetching
  router.push('/about?counter=1', undefined, { shallow: true });
  
  // Only updates URL, doesn't fetch getServerSideProps/getStaticProps
  // Useful for filters, pagination, etc.
}

// Pages Router: getInitialProps (Legacy)
// pages/index.js
export default function Home({ data }) {
  return <div>{data}</div>;
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { data };
};

// Works in both pages and _app.js
// ⚠️ Disables automatic static optimization
// ⚠️ Not recommended for new projects

// Pages Router: Built-in i18n
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
};

// Automatic locale routing
// /en/about, /fr/about

// Pages Router: Preview Mode
// pages/api/preview.js
export default function handler(req, res) {
  res.setPreviewData({});
  res.redirect(req.query.slug);
}

// Access in getStaticProps
export async function getStaticProps({ preview }) {
  // Fetch draft content if preview
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. App Router: Server Actions, Streaming, Parallel Routes,
            Intercepting Routes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router introduces powerful new features.
          </p>

          <CodeBlock
            code={`// App Router: Server Actions
// app/actions.ts
'use server';

export async function createPost(data: FormData) {
  // Server-side mutation
  await savePost(data);
}

// app/create/page.tsx
import { createPost } from './actions';

export default function CreatePage() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}

// App Router: Streaming
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

// Components stream independently
// Better perceived performance

// App Router: Parallel Routes
// app/dashboard/@analytics/page.tsx
export default function Analytics() {
  return <div>Analytics</div>;
}

// app/dashboard/@team/page.tsx
export default function Team() {
  return <div>Team</div>;
}

// app/dashboard/layout.tsx
export default function Layout({ children, analytics, team }) {
  return (
    <div>
      {children}
      {analytics}
      {team}
    </div>
  );
}

// App Router: Intercepting Routes
// app/@modal/(.)photo/[id]/page.tsx
// Intercepts /photo/[id] and shows as modal
// (.) matches same level
// (..) matches parent level
// (..)(..) matches two levels up
// (...) matches root level

// Benefits:
// ✅ Server Actions for mutations
// ✅ Streaming for better UX
// ✅ Parallel Routes for complex layouts
// ✅ Intercepting Routes for modals`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Feature Comparison
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Comparison of unique features.
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
                    getInitialProps
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Supported (legacy)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not supported
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Built-in i18n
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Supported
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Use middleware
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Server Actions
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not supported
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Built-in
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
                    Parallel Routes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not supported
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ @folder syntax
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Intercepting Routes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not supported
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ (.) syntax
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Preview Mode
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ getStaticProps preview
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Draft Mode
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c2/lesson-8"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C2.8 API Routes
          </Link>
          <Link
            href="/learn/comparison/c2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to C2 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
