import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A2.3: Routing Features - Next.js Mastery",
  description: "Complete guide to routing features in Next.js Pages Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a2"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A2 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A2.3: Routing Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master all routing features: next/link, next/router, navigation,
          parameters, shallow routing, and prefetching.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: next/link */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. next/link Component (All Props)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Link
            </code>{" "}
            component enables client-side navigation between pages.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/123">Blog Post</Link>
    </nav>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            All Link Props
          </h3>
          <CodeBlock
            code={`import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* href - The path or URL to navigate to */}
      <Link href="/about">About</Link>
      
      {/* as - Optional decorator for the path (for dynamic routes) */}
      <Link href="/blog/[id]" as="/blog/123">
        Blog Post
      </Link>
      
      {/* replace - Replace current history entry instead of pushing */}
      <Link href="/login" replace>
        Login (replace)
      </Link>
      
      {/* scroll - Scroll to top on navigation (default: true) */}
      <Link href="/about" scroll={false}>
        About (no scroll)
      </Link>
      
      {/* shallow - Update URL without running getServerSideProps/getStaticProps */}
      <Link href="/about?foo=bar" shallow>
        About (shallow)
      </Link>
      
      {/* prefetch - Prefetch page in background (default: true) */}
      <Link href="/contact" prefetch={false}>
        Contact (no prefetch)
      </Link>
      
      {/* locale - Enable locale routing (if i18n configured) */}
      <Link href="/about" locale="fr">
        About (French)
      </Link>
      
      {/* Legacy: passHref - Pass href to child (not needed in Next.js 13+) */}
      <Link href="/about" passHref>
        <a>About (legacy)</a>
      </Link>
    </nav>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Custom Component
          </h3>
          <CodeBlock
            code={`import Link from 'next/link';

export default function Navigation() {
  return (
    <Link href="/about">
      <button className="btn-primary">
        Go to About
      </button>
    </Link>
  );
}

// Or with styled component
import styled from 'styled-components';

const StyledLink = styled.a\`
  color: blue;
  text-decoration: none;
\`;

export default function Navigation() {
  return (
    <Link href="/about" passHref>
      <StyledLink>About</StyledLink>
    </Link>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: next/router useRouter */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. next/router - useRouter Hook (All Methods and Properties)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useRouter
            </code>{" "}
            hook provides access to the router object with all routing methods
            and properties.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function MyComponent() {
  const router = useRouter();
  
  return (
    <div>
      <p>Current route: {router.pathname}</p>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            All Router Properties
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function RouterInfo() {
  const router = useRouter();
  
  return (
    <div>
      <p>pathname: {router.pathname}</p>
      {/* Current route path (e.g., /blog/[id]) */}
      
      <p>asPath: {router.asPath}</p>
      {/* Actual path including query (e.g., /blog/123?foo=bar) */}
      
      <p>query: {JSON.stringify(router.query)}</p>
      {/* Query string object (e.g., { id: '123', foo: 'bar' }) */}
      
      <p>route: {router.route}</p>
      {/* Route pattern (e.g., /blog/[id]) */}
      
      <p>basePath: {router.basePath}</p>
      {/* Base path if configured */}
      
      <p>locale: {router.locale}</p>
      {/* Current locale */}
      
      <p>locales: {JSON.stringify(router.locales)}</p>
      {/* Available locales */}
      
      <p>defaultLocale: {router.defaultLocale}</p>
      {/* Default locale */}
      
      <p>isReady: {router.isReady ? 'true' : 'false'}</p>
      {/* Whether router fields are ready */}
      
      <p>isPreview: {router.isPreview ? 'true' : 'false'}</p>
      {/* Whether in preview mode */}
      
      <p>isFallback: {router.isFallback ? 'true' : 'false'}</p>
      {/* Whether page is in fallback state */}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Router Methods
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  
  // All available methods:
  // router.push(url, as, options)
  // router.replace(url, as, options)
  // router.prefetch(url, as)
  // router.back()
  // router.reload()
  // router.beforePopState(cb)
  // router.events.on(event, callback)
  // router.events.off(event, callback)
  
  return <div>Navigation component</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Programmatic Navigation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Programmatic Navigation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Navigate programmatically using router methods.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.push()
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  
  const handleNavigation = () => {
    // Simple path
    router.push('/about');
    
    // With query parameters
    router.push('/blog/123?sort=date');
    
    // Object syntax
    router.push({
      pathname: '/blog/[id]',
      query: { id: '123', sort: 'date' },
    });
    
    // With as (URL masking)
    router.push('/blog/[id]', '/blog/123');
    
    // With options
    router.push('/about', undefined, { shallow: true });
    router.push('/about', undefined, { scroll: false });
    router.push('/about', undefined, { locale: 'fr' });
  };
  
  return <button onClick={handleNavigation}>Navigate</button>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.replace()
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  
  const handleReplace = () => {
    // Replace current history entry (no back button)
    router.replace('/login');
    
    // With query
    router.replace('/dashboard?tab=settings');
    
    // Object syntax
    router.replace({
      pathname: '/posts/[id]',
      query: { id: '123' },
    });
  };
  
  return <button onClick={handleReplace}>Replace Route</button>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.back() and router.reload()
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };
  
  const reloadPage = () => {
    router.reload();
  };
  
  return (
    <div>
      <button onClick={goBack}>Go Back</button>
      <button onClick={reloadPage}>Reload Page</button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Route Parameters */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Route Parameters (router.query, router.asPath, router.pathname)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Access route parameters and query strings through router properties.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.query
          </h3>
          <CodeBlock
            code={`// pages/blog/[id].js
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  
  // For /blog/123
  // router.query = { id: '123' }
  
  // For /blog/123?sort=date&page=2
  // router.query = { id: '123', sort: 'date', page: '2' }
  
  return <h1>Post ID: {id}</h1>;
}

// pages/posts/[...slug].js
export default function Post() {
  const router = useRouter();
  const { slug } = router.query;
  
  // For /posts/a/b/c
  // router.query = { slug: ['a', 'b', 'c'] }
  
  return <div>Slug: {slug?.join('/')}</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.pathname vs router.asPath
          </h3>
          <CodeBlock
            code={`// pages/blog/[id].js
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  
  // For URL: /blog/123?sort=date
  
  // router.pathname = '/blog/[id]'
  // (The route pattern, not the actual path)
  
  // router.asPath = '/blog/123?sort=date'
  // (The actual path including query string)
  
  return (
    <div>
      <p>Pathname: {router.pathname}</p>
      <p>AsPath: {router.asPath}</p>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.isReady
          </h3>
          <CodeBlock
            code={`// Important: router.query is empty during SSR
// Use router.isReady to check if query is available
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (router.isReady) {
      // Now router.query is populated
      const { id } = router.query;
      fetchData(id).then(setData);
    }
  }, [router.isReady, router.query]);
  
  if (!router.isReady) {
    return <div>Loading...</div>;
  }
  
  return <div>Data: {data}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Shallow Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Shallow Routing
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Shallow routing allows you to change the URL without running data
            fetching methods like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>
            .
          </p>

          <CodeBlock
            code={`import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Shallow routing - only updates URL, doesn't fetch data
    router.push('/about?tab=settings', undefined, { shallow: true });
  }, []);
  
  // getServerSideProps or getStaticProps won't run
  // Only the URL changes
  
  return <div>My Page</div>;
}

// Or with Link
import Link from 'next/link';

export default function Navigation() {
  return (
    <Link href="/about?tab=settings" shallow>
      <a>About (shallow)</a>
    </Link>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            When to Use Shallow Routing
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Filtering or sorting without fetching new data</li>
            <li>Updating URL query parameters for client-side state</li>
            <li>Tab navigation within the same page</li>
            <li>Pagination when data is already loaded</li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Limitations
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Only works for same page navigation</li>
            <li>Can't change the pathname, only query parameters</li>
            <li>Requires the page component to handle the query change</li>
          </ul>
        </section>

        {/* Section 6: Prefetching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Prefetching Behavior
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically prefetches pages linked with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Link
            </code>{" "}
            when they enter the viewport.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Automatic Prefetching
          </h3>
          <CodeBlock
            code={`import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* Prefetched automatically when link enters viewport */}
      <Link href="/about">
        <a>About</a>
      </Link>
      
      {/* Disable prefetching */}
      <Link href="/contact" prefetch={false}>
        <a>Contact</a>
      </Link>
    </nav>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Manual Prefetching
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyComponent() {
  const router = useRouter();
  
  useEffect(() => {
    // Prefetch a route
    router.prefetch('/about');
    
    // Prefetch with as parameter
    router.prefetch('/blog/[id]', '/blog/123');
  }, []);
  
  return <div>My Component</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Prefetching Details
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Prefetching happens in production only</li>
            <li>Only prefetches JavaScript bundles, not data</li>
            <li>Happens when link enters viewport (Intersection Observer)</li>
            <li>
              Can be disabled with{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                prefetch={false}
              </code>
            </li>
            <li>Useful for improving perceived performance</li>
          </ul>
        </section>

        {/* Section 7: Locale Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Locale Routing (if i18n enabled)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            When i18n is configured in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next.config.js
            </code>
            , Next.js provides built-in locale routing.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Configuration
          </h3>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
    localeDetection: true, // Auto-detect browser locale
  },
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using Locales with Link
          </h3>
          <CodeBlock
            code={`import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  
  return (
    <nav>
      {/* Current locale */}
      <Link href="/about" locale={router.locale}>
        About (current locale)
      </Link>
      
      {/* Specific locale */}
      <Link href="/about" locale="fr">
        About (French)
      </Link>
      
      {/* Switch locale */}
      <Link href={router.asPath} locale="de">
        Switch to German
      </Link>
    </nav>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Programmatic Locale Navigation
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function LocaleSwitcher() {
  const router = useRouter();
  
  const switchLocale = (locale) => {
    router.push(router.asPath, router.asPath, { locale });
  };
  
  return (
    <div>
      <button onClick={() => switchLocale('en')}>English</button>
      <button onClick={() => switchLocale('fr')}>Français</button>
      <button onClick={() => switchLocale('de')}>Deutsch</button>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Router Locale Properties
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function LocaleInfo() {
  const router = useRouter();
  
  return (
    <div>
      <p>Current locale: {router.locale}</p>
      <p>Default locale: {router.defaultLocale}</p>
      <p>Available locales: {router.locales?.join(', ')}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Locale Routing Strategies
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Strategy
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    URL Format
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Configuration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Sub-path
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    /fr/about, /de/about
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Default
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Domain
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    fr.example.com, de.example.com
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    domains configuration
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Subdomain
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    fr.example.com, de.example.com
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    domains configuration
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a2/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A2.2 Special Pages
          </Link>
          <Link
            href="/learn/pages-router/a2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to A2 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
