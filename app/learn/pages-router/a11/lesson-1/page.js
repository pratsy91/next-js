import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A11.1: Core Concepts Quick Reference - Next.js Mastery",
  description: "Essential Next.js Pages Router concepts for interviews",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a11"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A11 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A11.1: Core Concepts Quick Reference
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Essential Next.js Pages Router concepts, file-based routing, and
          pre-rendering strategies.
        </p>
      </div>

      <div className="space-y-8">
        {/* File-based Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. File-based Routing System
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Routes are created by organizing files in the pages/ directory.
          </p>

          <CodeBlock
            code={`pages/
├── index.js              → / (home)
├── about.js              → /about
├── blog/
│   ├── index.js         → /blog
│   └── [slug].js        → /blog/[slug]
├── shop/
│   └── [...categories].js → /shop/[...categories]
└── api/
    └── users/
        └── [id].js      → /api/users/[id]`}
            language="text"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Route Types
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Static:</strong> pages/about.js → /about
            </li>
            <li>
              <strong>Dynamic:</strong> pages/[id].js → /123, /abc
            </li>
            <li>
              <strong>Catch-all:</strong> pages/[...slug].js → /a, /a/b, /a/b/c
            </li>
            <li>
              <strong>Optional Catch-all:</strong> pages/[[...slug]].js → /, /a,
              /a/b
            </li>
            <li>
              <strong>API Routes:</strong> pages/api/* → /api/*
            </li>
          </ul>
        </section>

        {/* Pre-rendering Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Pre-rendering Strategies
          </h2>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Static Site Generation (SSG)
          </h3>
          <CodeBlock
            code={`// pages/products/[id].js
export async function getStaticProps({ params }) {
  const product = await fetchProduct(params.id);
  
  return {
    props: {
      product,
    },
    // Revalidate every 60 seconds (ISR)
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const products = await fetchAllProductIds();
  
  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    fallback: false, // or 'blocking' or true
  };
}

export default function Product({ product }) {
  return <div>{product.name}</div>;
}`}
            language="javascript"
          />
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            <strong>When to use:</strong> Pre-rendered at build time, best for
            static content, blog posts, documentation.
          </p>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server-Side Rendering (SSR)
          </h3>
          <CodeBlock
            code={`// pages/profile.js
export async function getServerSideProps(context) {
  const { req, res, params, query } = context;
  
  // Access to request/response
  const user = await getUserFromCookie(req);
  
  return {
    props: {
      user,
    },
  };
}

export default function Profile({ user }) {
  return <div>{user.name}</div>;
}`}
            language="javascript"
          />
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            <strong>When to use:</strong> Rendered on each request, best for
            personalized content, real-time data, SEO with dynamic content.
          </p>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Client-Side Rendering (CSR)
          </h3>
          <CodeBlock
            code={`// pages/dashboard.js
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Dashboard() {
  const { data, error } = useSWR('/api/data', fetcher);
  
  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  
  return <div>{data.message}</div>;
}
// No getStaticProps or getServerSideProps = CSR`}
            language="javascript"
          />
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            <strong>When to use:</strong> User-specific data, dashboard, data
            that doesn't need SEO.
          </p>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Incremental Static Regeneration (ISR)
          </h3>
          <CodeBlock
            code={`export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    // Revalidate every 10 seconds
    revalidate: 10,
  };
}
// Page is statically generated, regenerated at most once every 10 seconds`}
            language="javascript"
          />
        </section>

        {/* Comparison Table */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Rendering Strategy Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Strategy
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    When Renders
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Use Case
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Data Fetching
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    SSG
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Build time
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Static content, blogs
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    getStaticProps
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    SSR
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Every request
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Personalization, real-time
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    getServerSideProps
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    ISR
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Build + revalidate
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Semi-static, e-commerce
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    getStaticProps + revalidate
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    CSR
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Client-side
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Dashboards, user data
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    useEffect, SWR, etc.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Automatic Code Splitting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Automatic Code Splitting
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically splits code per page. Each page only loads
            what it needs.
          </p>
          <CodeBlock
            code={`// pages/index.js - Loads only this bundle
export default function Home() {
  return <h1>Home</h1>;
}

// pages/about.js - Separate bundle
export default function About() {
  return <h1>About</h1>;
}

// Dynamic imports for additional splitting
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('../components/Heavy'), {
  ssr: false, // Disable SSR
  loading: () => <p>Loading...</p>,
});`}
            language="javascript"
          />
        </section>

        {/* Custom App */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Custom App (_app.js)
          </h2>
          <CodeBlock
            code={`// pages/_app.js
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}

// Use cases:
// - Persist layout across pages
// - Keep state when navigating
// - Add global CSS
// - Custom error handling
// - Inject additional data into pages`}
            language="javascript"
          />
        </section>

        {/* Custom Document */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Custom Document (_document.js)
          </h2>
          <CodeBlock
            code={`// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Use cases:
// - Customize <html> and <body> tags
// - Add fonts, meta tags in <head>
// - Only renders on server
// - Don't add application logic here`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a11"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to A11 Lessons
          </Link>
          <Link
            href="/learn/pages-router/a11/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Data Fetching Methods →
          </Link>
        </div>
      </div>
    </div>
  );
}
