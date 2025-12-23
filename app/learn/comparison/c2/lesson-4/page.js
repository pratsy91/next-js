import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C2.4: Layouts - Next.js Mastery",
  description: "Layout system differences between App Router and Pages Router",
};

export default function Lesson4Page() {
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
          C2.4: Layouts
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Compare layout systems: Pages Router uses _app.js/_document.js, App
          Router uses layout.js files.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Pages Router: Custom _app.js and _document.js
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router has two special files for customization.
          </p>

          <CodeBlock
            code={`// Pages Router: _app.js
// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="app-wrapper">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

// Pages Router: _document.js
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Limitations:
// - Only one _app.js (root level)
// - Only one _document.js (root level)
// - No nested layouts
// - Layout shared across all pages`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. App Router: layout.js Files at Any Level
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router supports nested layouts with layout.js files.
          </p>

          <CodeBlock
            code={`// App Router: Root layout
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// App Router: Nested layout
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

// App Router: Multiple nested layouts
app/
  ├── layout.js              // Root layout
  ├── dashboard/
  │   ├── layout.js          // Dashboard layout
  │   ├── settings/
  │   │   ├── layout.js      // Settings layout
  │   │   └── page.js
  │   └── page.js

// Benefits:
// ✅ Nested layouts
// ✅ Layout-specific code splitting
// ✅ Layout-specific loading/error states
// ✅ Layout persistence (no re-render on navigation)`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Comparison
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Key differences in layout systems.
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
                    Root Layout
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    _app.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    app/layout.js
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    HTML Structure
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    _document.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    app/layout.js (includes html/body)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Nested Layouts
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Not supported
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Multiple layout.js files
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Layout Persistence
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Re-renders on navigation
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Persists (no re-render)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Layout Code Splitting
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Single bundle
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Per-layout splitting
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c2/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C2.3 Navigation
          </Link>
          <Link
            href="/learn/comparison/c2/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C2.5 Metadata →
          </Link>
        </div>
      </div>
    </div>
  );
}
