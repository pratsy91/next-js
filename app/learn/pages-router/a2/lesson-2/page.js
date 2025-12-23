import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A2.2: Special Pages - Next.js Mastery",
  description: "Complete guide to special pages in Next.js Pages Router",
};

export default function Lesson2Page() {
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
          A2.2: Special Pages
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about special pages in Next.js Pages Router: _app.js,
          _document.js, error pages, and API routes.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: _app.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. pages/_app.js (Custom App Component)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _app.js
            </code>{" "}
            file is the top-level component that wraps all pages. Use it to:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Persist layout between page navigations</li>
            <li>Keep state when navigating between pages</li>
            <li>Add global CSS</li>
            <li>Add providers (theme, auth, etc.)</li>
            <li>Custom error handling</li>
          </ul>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic _app.js
          </h3>
          <CodeBlock
            code={`// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Layout and Providers
          </h3>
          <CodeBlock
            code={`// pages/_app.js
import { ThemeProvider } from 'next-themes';
import Layout from '../components/Layout';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With getInitialProps
          </h3>
          <CodeBlock
            code={`// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// This disables automatic static optimization for all pages
MyApp.getInitialProps = async (appContext) => {
  // appContext.ctx is the context object
  // appContext.Component is the active page component
  // appContext.router is the router instance
  
  let pageProps = {};
  
  // Call getInitialProps of the page component if it exists
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  
  return { pageProps };
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Error Handling
          </h3>
          <CodeBlock
            code={`// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps, err }) {
  const router = useRouter();
  
  useEffect(() => {
    // Log page views
    const handleRouteChange = (url) => {
      console.log('Page view:', url);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
  
  return <Component {...pageProps} err={err} />;
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: _document.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. pages/_document.js (Custom Document)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _document.js
            </code>{" "}
            file customizes the HTML document structure. It's only rendered on
            the server and is used to modify the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &lt;html&gt;
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &lt;body&gt;
            </code>{" "}
            tags.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic _document.js
          </h3>
          <CodeBlock
            code={`// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Custom Meta Tags
          </h3>
          <CodeBlock
            code={`// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Styled-components
          </h3>
          <CodeBlock
            code={`// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      
      const initialProps = await Document.getInitialProps(ctx);
      
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Important Notes
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                _document.js
              </code>{" "}
              is only rendered on the server
            </li>
            <li>
              Event handlers like{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                onClick
              </code>{" "}
              won't work here
            </li>
            <li>
              Use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                _app.js
              </code>{" "}
              for client-side code
            </li>
            <li>
              Don't use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                next/head
              </code>{" "}
              in{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                _document.js
              </code>
            </li>
          </ul>
        </section>

        {/* Section 3: _error.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. pages/_error.js (Custom Error Page)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _error.js
            </code>{" "}
            file is used to customize error pages. It only works in production.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic _error.js
          </h3>
          <CodeBlock
            code={`// pages/_error.js
function Error({ statusCode }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>
        {statusCode
          ? \`An error \${statusCode} occurred on server\`
          : 'An error occurred on client'}
      </h1>
      <p>Something went wrong. Please try again later.</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Error Details (Development Only)
          </h3>
          <CodeBlock
            code={`// pages/_error.js
function Error({ statusCode, err }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Error {statusCode}</h1>
      {process.env.NODE_ENV === 'development' && err && (
        <pre style={{ background: '#f5f5f5', padding: '1rem' }}>
          {err.stack}
        </pre>
      )}
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};

export default Error;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Important Notes
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                _error.js
              </code>{" "}
              only works in production
            </li>
            <li>In development, Next.js shows the default error overlay</li>
            <li>This page is only rendered when an error occurs</li>
            <li>
              Use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                getInitialProps
              </code>{" "}
              to customize the error response
            </li>
          </ul>
        </section>

        {/* Section 4: 404.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. pages/404.js (Custom 404 Page)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create a custom 404 page by adding{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/404.js
            </code>
            . This page is shown when a route doesn't exist.
          </p>

          <CodeBlock
            code={`// pages/404.js
import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        textAlign: 'center'
      }}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <Link href="/">
          <a style={{ 
            marginTop: '1rem', 
            padding: '0.5rem 1rem', 
            background: '#0070f3', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            Go back home
          </a>
        </Link>
      </div>
    </>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With getStaticProps (Optional)
          </h3>
          <CodeBlock
            code={`// pages/404.js
export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}

// Optional: You can use getStaticProps in 404.js
export async function getStaticProps() {
  return {
    props: {},
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: 500.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. pages/500.js (Custom 500 Page)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create a custom 500 page by adding{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/500.js
            </code>
            . This page is shown when a server error occurs.
          </p>

          <CodeBlock
            code={`// pages/500.js
import Link from 'next/link';
import Head from 'next/head';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 - Server Error</title>
      </Head>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        textAlign: 'center'
      }}>
        <h1>500</h1>
        <h2>Server Error</h2>
        <p>Something went wrong on our end. Please try again later.</p>
        <Link href="/">
          <a style={{ 
            marginTop: '1rem', 
            padding: '0.5rem 1rem', 
            background: '#0070f3', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            Go back home
          </a>
        </Link>
      </div>
    </>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Difference: 404 vs 500 vs _error.js
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    File
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    When Shown
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Environment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      404.js
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Page not found
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    All environments
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      500.js
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Server error
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    All environments
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      _error.js
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Any error
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Production only
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: pages/api/ */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. pages/api/ Directory Structure
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/api/
            </code>{" "}
            directory creates API routes. Any file inside this directory becomes
            an API endpoint.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic API Route
          </h3>
          <CodeBlock
            code={`// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API' });
}

// Access at: /api/hello`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Directory Structure Examples
          </h3>
          <CodeBlock
            code={`pages/
└── api/
    ├── hello.js                    → /api/hello
    ├── users/
    │   ├── index.js                → /api/users
    │   └── [id].js                 → /api/users/:id
    ├── posts/
    │   ├── index.js                → /api/posts
    │   ├── [id].js                 → /api/posts/:id
    │   └── [id]/
    │       └── comments.js         → /api/posts/:id/comments
    └── auth/
        ├── login.js                 → /api/auth/login
        └── logout.js                → /api/auth/logout`}
            language="text"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            HTTP Methods
          </h3>
          <CodeBlock
            code={`// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    // Handle POST request
    const { name, email } = req.body;
    res.status(201).json({ message: 'User created' });
  } else if (req.method === 'PUT') {
    // Handle PUT request
    res.status(200).json({ message: 'User updated' });
  } else if (req.method === 'DELETE') {
    // Handle DELETE request
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic API Routes
          </h3>
          <CodeBlock
            code={`// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    // Get user by ID
    res.status(200).json({ id, name: 'John Doe' });
  } else if (req.method === 'PUT') {
    // Update user
    res.status(200).json({ id, message: 'Updated' });
  } else if (req.method === 'DELETE') {
    // Delete user
    res.status(200).json({ id, message: 'Deleted' });
  }
}

// Access at: /api/users/123`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Important Notes
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>API routes run only on the server</li>
            <li>They don't increase client-side bundle size</li>
            <li>
              Use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                req.method
              </code>{" "}
              to handle different HTTP methods
            </li>
            <li>
              Access query parameters via{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                req.query
              </code>
            </li>
            <li>
              Access request body via{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                req.body
              </code>
            </li>
            <li>
              All the same routing patterns work (dynamic, catch-all, etc.)
            </li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a2/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A2.1 Basic Routing
          </Link>
          <Link
            href="/learn/pages-router/a2/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A2.3 Routing Features →
          </Link>
        </div>
      </div>
    </div>
  );
}
