import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C3.1: When to use Pages Router - Next.js Mastery",
  description: "Understand when Pages Router is the right choice",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c3"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C3 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C3.1: When to use Pages Router
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn when Pages Router is the right choice for your Next.js project.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Legacy Projects
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            If you have an existing Pages Router project, staying with it may be
            the best choice.
          </p>

          <CodeBlock
            code={`// Reasons to stay with Pages Router:
// ✅ Project already uses Pages Router
// ✅ Team is familiar with Pages Router
// ✅ Large codebase would require significant migration
// ✅ No immediate need for App Router features
// ✅ Project is stable and working well

// Example: Existing e-commerce site
// - Uses getServerSideProps for product pages
// - Uses getStaticProps for blog posts
// - Has complex API routes
// - Team knows Pages Router well
// → Stay with Pages Router

// Migration cost vs benefit
// If migration would take months and provide
// minimal immediate benefit, consider staying.`}
            language="text"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Built-in i18n Requirements
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router has built-in i18n support that's easier to configure.
          </p>

          <CodeBlock
            code={`// Pages Router: Built-in i18n
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de', 'es'],
    defaultLocale: 'en',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
      },
    ],
  },
};

// Automatic locale routing
// /en/about, /fr/about
// example.com/about, example.fr/about

// App Router: Requires middleware
// More complex setup for i18n
// If you need simple i18n with domain/subdomain routing,
// Pages Router is easier.

// Use Pages Router when:
// ✅ Need built-in i18n with domain routing
// ✅ Want automatic locale detection
// ✅ Need subdomain-based routing
// ✅ Simple i18n configuration`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Shallow Routing Needs
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router supports shallow routing, which App Router doesn't.
          </p>

          <CodeBlock
            code={`// Pages Router: Shallow routing
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  
  // Update URL without running data fetching
  const updateFilter = (filter) => {
    router.push(
      \`/products?filter=\${filter}\`,
      undefined,
      { shallow: true }
    );
  };
  
  // URL changes but getServerSideProps doesn't run
  // Useful for:
  // - Filters
  // - Pagination
  // - Search params
  // - Analytics tracking
}

// App Router: No shallow routing
// URL changes trigger full navigation
// Must use client-side state or searchParams

// Use Pages Router when:
// ✅ Need shallow routing for filters/pagination
// ✅ Want URL updates without data refetch
// ✅ Building complex filtering UI`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. getInitialProps Usage
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            If you rely on getInitialProps, Pages Router is your only option.
          </p>

          <CodeBlock
            code={`// Pages Router: getInitialProps
// pages/index.js
export default function Home({ data }) {
  return <div>{data}</div>;
}

Home.getInitialProps = async (ctx) => {
  const data = await fetchData();
  return { data };
};

// App Router: No getInitialProps
// Must use Server Components or Server Actions

// Use Pages Router when:
// ✅ Existing code uses getInitialProps
// ✅ Need getInitialProps in _app.js
// ✅ Migrating from older Next.js versions
// ⚠️ Note: getInitialProps is legacy
// Consider migrating to App Router long-term`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Stability and Maturity
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router is more mature and stable for production use.
          </p>

          <CodeBlock
            code={`// Pages Router advantages:
// ✅ Mature and stable
// ✅ Extensive documentation
// ✅ Large community knowledge base
// ✅ Many examples and tutorials
// ✅ Well-tested in production
// ✅ Predictable behavior

// Use Pages Router when:
// ✅ Need maximum stability
// ✅ Team prefers proven technology
// ✅ Project requires minimal risk
// ✅ Working with strict deadlines
// ✅ Need extensive third-party support

// App Router is newer:
// ⚠️ Still evolving
// ⚠️ Some features may change
// ⚠️ Less third-party library support
// ⚠️ Fewer production examples

// Both are production-ready, but Pages Router
// has a longer track record.`}
            language="text"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to C3 Lessons
          </Link>
          <Link
            href="/learn/comparison/c3/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C3.2 When to use App Router →
          </Link>
        </div>
      </div>
    </div>
  );
}
