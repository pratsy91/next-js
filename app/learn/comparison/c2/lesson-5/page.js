import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C2.5: Metadata - Next.js Mastery",
  description:
    "Metadata handling differences between App Router and Pages Router",
};

export default function Lesson5Page() {
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
          C2.5: Metadata
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Compare metadata handling: Pages Router uses next/head, App Router
          uses Metadata API.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Pages Router: next/head Component
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router uses the Head component for metadata.
          </p>

          <CodeBlock
            code={`// Pages Router: next/head
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>My Page</title>
        <meta name="description" content="Page description" />
        <meta property="og:title" content="My Page" />
        <meta property="og:description" content="Page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>My Page</h1>
      </main>
    </>
  );
}

// Dynamic metadata
export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <article>{post.content}</article>
    </>
  );
}

// Multiple Head components (merged)
<Head>
  <title>Page Title</title>
</Head>
<Head>
  <meta name="description" content="Description" />
</Head>

// Limitations:
// - Client-side rendering
// - Manual management
// - No type safety
// - Can cause layout shift`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. App Router: Metadata API
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router uses the Metadata API with static and dynamic exports.
          </p>

          <CodeBlock
            code={`// App Router: Static metadata
// app/page.tsx
export const metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
  },
};

export default function Page() {
  return <h1>My Page</h1>;
}

// App Router: Dynamic metadata
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}

// App Router: Metadata in layout
// app/layout.tsx
export const metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
  description: 'Default description',
};

// Benefits:
// ✅ Server-side rendering
// ✅ Type-safe
// ✅ Automatic optimization
// ✅ No layout shift
// ✅ Better SEO`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Comparison
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Key differences in metadata handling.
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
                    API
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    next/head component
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Metadata API (export)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Rendering
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Client-side
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Server-side
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Type Safety
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ No
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Yes (TypeScript)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Dynamic Metadata
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Manual (in component)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    generateMetadata function
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Layout Shift
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ⚠️ Possible
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ None
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    SEO Optimization
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Manual
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
            href="/learn/comparison/c2/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C2.4 Layouts
          </Link>
          <Link
            href="/learn/comparison/c2/lesson-6"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C2.6 Loading States →
          </Link>
        </div>
      </div>
    </div>
  );
}
