import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C1.9: Optimization - Next.js Mastery",
  description:
    "Optimization concepts are similar but implementations differ between routers",
};

export default function Lesson9Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c1"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C1 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C1.9: Optimization
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Optimization concepts are similar, but implementations differ between
          App Router and Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Performance Optimization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Similar concepts, different implementations.
          </p>

          <CodeBlock
            code={`// Code Splitting
// ✅ Both routers: Automatic route-based splitting
// ✅ Both routers: Dynamic imports work the same

// App Router
import dynamic from 'next/dynamic';
const Component = dynamic(() => import('./Component'));

// Pages Router
import dynamic from 'next/dynamic';
const Component = dynamic(() => import('./Component'));

// Bundle Analysis
// ✅ Both routers: Same tools
// ✅ Both routers: @next/bundle-analyzer works

// Tree Shaking
// ✅ Both routers: Automatic
// ✅ Both routers: Same webpack configuration

// Image Optimization
// ✅ Both routers: next/image works the same
// ✅ Both routers: Same optimization features`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Caching Strategies
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Different caching mechanisms, similar goals.
          </p>

          <CodeBlock
            code={`// Static Caching
// App Router: Automatic with Server Components
export default async function Page() {
  const data = await fetch('...'); // Cached automatically
  return <div>{data}</div>;
}

// Pages Router: getStaticProps
export async function getStaticProps() {
  const data = await fetch('...');
  return { props: { data } };
}

// ISR (Incremental Static Regeneration)
// App Router: revalidate option
export const revalidate = 60;

// Pages Router: revalidate in getStaticProps
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 60,
  };
}

// API Route Caching
// ✅ Both routers: Same Cache-Control headers
// ✅ Both routers: Same caching strategies

// CDN Caching
// ✅ Both routers: Same CDN configuration
// ✅ Both routers: Same headers API`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. SEO Optimization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Different APIs, same goals.
          </p>

          <CodeBlock
            code={`// Metadata
// App Router: Metadata API
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
};

// Pages Router: next/head
import Head from 'next/head';
<Head>
  <title>Page Title</title>
  <meta name="description" content="Page description" />
</Head>

// Structured Data
// ✅ Both routers: Same JSON-LD approach
// ✅ Both routers: Same implementation

// Sitemap
// ✅ Both routers: Same generation methods
// ✅ Both routers: Same XML format

// robots.txt
// ✅ Both routers: Same file or dynamic generation
// ✅ Both routers: Same format

// Open Graph & Twitter Cards
// App Router: metadata object
export const metadata = {
  openGraph: { ... },
  twitter: { ... },
};

// Pages Router: next/head
<Head>
  <meta property="og:title" content="..." />
</Head>

// Different APIs, same SEO features!`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Key Differences Summary
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Summary of optimization differences.
          </p>

          <CodeBlock
            code={`// Similarities:
// ✅ Code splitting: Same approach
// ✅ Bundle analysis: Same tools
// ✅ Image optimization: Same API
// ✅ CDN caching: Same configuration
// ✅ SEO concepts: Same goals

// Differences:
// ⚠️ Caching: Different APIs (Server Components vs getStaticProps)
// ⚠️ Metadata: Different APIs (metadata export vs next/head)
// ⚠️ Static generation: Different methods
// ⚠️ ISR: Different implementations

// Overall:
// The optimization concepts are the same,
// but the implementation APIs differ.
// Understanding one helps with the other!`}
            language="text"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c1/lesson-8"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C1.8 Deployment
          </Link>
          <Link
            href="/learn/comparison/c1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to C1 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
