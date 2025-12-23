import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A11.5: Custom App & Document - Next.js Mastery",
  description:
    "Custom _app.js and _document.js reference for Next.js Pages Router",
};

export default function Lesson5Page() {
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
          A11.5: Custom App & Document
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          _app.js, _document.js, page initialization, global styles, and custom
          configuration.
        </p>
      </div>

      <div className="space-y-8">
        {/* _app.js Structure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. _app.js Structure & Use Cases
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _app.js
            </code>{" "}
            is a special file that wraps all pages in your Next.js application.
            It's the top-level React component that runs on both server and
            client, receiving the page component and its props. This is where
            you can add global providers, layouts, error boundaries, and state
            that should persist across page navigations.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Characteristics:</strong> Unlike individual pages,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _app.js
            </code>{" "}
            maintains state across route changes, making it perfect for global
            state management (Redux, Context), persistent layouts, theme
            providers, or analytics tracking. The component receives{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Component
            </code>{" "}
            (the active page) and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pageProps
            </code>{" "}
            (props returned from getStaticProps, getServerSideProps, or
            getInitialProps). Importantly, adding{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getInitialProps
            </code>{" "}
            to{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _app.js
            </code>{" "}
            disables Automatic Static Optimization for all pages.
          </p>
          <CodeBlock
            code={`// pages/_app.js
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// Common use cases:
// - Persist layout across pages
// - Keep state when navigating
// - Add global CSS
// - Inject additional data into pages
// - Custom error handling
// - Global providers (Redux, Context, etc.)

// With layout
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// With providers
import { Provider } from 'react-redux';
import store from '@/store';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Page Props & getInitialProps */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Page Props & getInitialProps
          </h2>
          <CodeBlock
            code={`// pages/_app.js
import App from 'next/app';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// getInitialProps in _app.js (disables automatic static optimization)
MyApp.getInitialProps = async (appContext) => {
  // Call page's getInitialProps if available
  const appProps = await App.getInitialProps(appContext);
  
  // Add global props
  const globalData = await fetchGlobalData();
  
  return {
    ...appProps,
    globalData,
  };
};

export default MyApp;

// Note: getInitialProps is legacy
// Use getServerSideProps or getStaticProps in pages instead
// Only use getInitialProps if you need it in _app.js`}
            language="javascript"
          />
        </section>

        {/* Global Error Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Global Error Handling
          </h2>
          <CodeBlock
            code={`// pages/_app.js
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

// Component-level error handling
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.addEventListener('error', (event) => {
      // Log error
      console.error('Global error:', event.error);
      // Send to error tracking service
    });
    
    return () => {
      window.removeEventListener('error', handler);
    };
  }, []);
  
  return <Component {...pageProps} />;
}`}
            language="javascript"
          />
        </section>

        {/* _document.js Structure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. _document.js Structure
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _document.js
            </code>{" "}
            is used to customize the HTML document structure that wraps your
            application. Unlike{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _app.js
            </code>
            , it only runs on the server and is rendered once per page request.
            This is where you customize the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              html
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              body
            </code>{" "}
            tags, add custom fonts, or include third-party scripts that need to
            be in the document head.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>When to use:</strong> Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _document.js
            </code>{" "}
            when you need to modify the HTML structure itself (adding lang
            attributes, custom body classes, or additional meta tags in the
            head). It's also the place for font preconnects, favicon links, or
            analytics scripts that should load before React. Important: Don't
            use it for application logic - that belongs in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _app.js
            </code>
            . The document component must render{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Html
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Head
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Main
            </code>
            , and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NextScript
            </code>{" "}
            components.
          </p>
          <CodeBlock
            code={`// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add custom head elements */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Custom HTML structure
export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="My app" />
      </Head>
      <body className="bg-white dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Custom HTML Structure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Custom HTML Structure
          </h2>
          <CodeBlock
            code={`// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter"
          rel="stylesheet"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Meta tags */}
        <meta name="theme-color" content="#000000" />
        
        {/* Stylesheets */}
        <link rel="stylesheet" href="/custom.css" />
      </Head>
      <body>
        {/* Custom body content */}
        <div id="root">
          <Main />
        </div>
        <NextScript />
        {/* Custom scripts */}
        <script src="/analytics.js" />
      </body>
    </Html>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Font Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Font Optimization
          </h2>
          <CodeBlock
            code={`// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Preconnect to font domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Load fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Or use next/font (recommended)
// pages/_app.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* CSS-in-JS Setup */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. CSS-in-JS Setup
          </h2>
          <CodeBlock
            code={`// pages/_document.js (for styled-components)
import Document, { Html, Head, Main, NextScript } from 'next/document';
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
        </section>

        {/* Analytics & Third-party Scripts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Analytics & Third-party Scripts
          </h2>
          <CodeBlock
            code={`// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    // Google Analytics
    const handleRouteChange = (url) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: url,
        });
      }
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  return <Component {...pageProps} />;
}

// Or use next/script in _document.js
// pages/_document.js
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
      </body>
    </Html>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a11/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: API Routes Reference
          </Link>
          <Link
            href="/learn/pages-router/a11/lesson-6"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Head & Metadata →
          </Link>
        </div>
      </div>
    </div>
  );
}
