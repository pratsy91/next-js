import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A6.1: Custom _app.js - Next.js Mastery",
  description: "Complete guide to custom App component in Next.js Pages Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a6"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A6 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A6.1: Custom _app.js
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to customize the App component to add global functionality,
          styles, and state management.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Component Structure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Component Structure
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _app.js
            </code>{" "}
            file is the top-level component that wraps all pages in your
            application.
          </p>

          <CodeBlock
            code={`// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// Basic structure:
// - Receives Component (the active page)
// - Receives pageProps (props from getStaticProps/getServerSideProps)
// - Returns the Component with pageProps spread

// File location: pages/_app.js (required)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Points
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Runs on both server and client</li>
            <li>Wraps all pages in your application</li>
            <li>State persists between page navigations</li>
            <li>Perfect for global providers and layouts</li>
            <li>Only one _app.js file per application</li>
          </ul>
        </section>

        {/* Section 2: pageProps Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. pageProps Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pageProps
            </code>{" "}
            contains props returned from data fetching methods.
          </p>

          <CodeBlock
            code={`// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  // pageProps contains:
  // - Props from getStaticProps
  // - Props from getServerSideProps
  // - Props from getInitialProps (if used)
  
  // You can modify pageProps before passing to Component
  const modifiedProps = {
    ...pageProps,
    globalData: 'Some global data',
  };
  
  return <Component {...modifiedProps} />;
}

// Accessing pageProps in pages
// pages/index.js
export default function Home({ title, globalData }) {
  // title comes from getStaticProps
  // globalData comes from _app.js
  return <h1>{title} - {globalData}</h1>;
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Home Page',
    },
  };
}

// pageProps structure:
// {
//   title: 'Home Page',        // From getStaticProps
//   globalData: 'Some global data' // Added in _app.js
// }`}
            language="javascript"
          />
        </section>

        {/* Section 3: Global Styles */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Global Styles
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Import global CSS files in _app.js to apply styles across all pages.
          </p>

          <CodeBlock
            code={`// pages/_app.js
import '../styles/globals.css';
import '../styles/reset.css';
import '../styles/variables.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// styles/globals.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

// Multiple global stylesheets
import '../styles/globals.css';
import '../styles/components.css';
import '../styles/utilities.css';

// CSS-in-JS global styles
import { Global, css } from '@emotion/react';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css\`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
          }
        \`}
      />
      <Component {...pageProps} />
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Layout Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Layout Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Wrap pages with layout components that persist across navigation.
          </p>

          <CodeBlock
            code={`// pages/_app.js
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  );
}

// components/Layout.js
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

// Conditional layouts based on route
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Different layout for admin pages
  if (router.pathname.startsWith('/admin')) {
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    );
  }
  
  // Default layout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// Layout with persistent state
export default function MyApp({ Component, pageProps }) {
  return (
    <LayoutProvider>
      <Navigation />
      <Component {...pageProps} />
      <Sidebar />
    </LayoutProvider>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: State Management Setup */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. State Management Setup
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set up global state management providers in _app.js.
          </p>

          <CodeBlock
            code={`// pages/_app.js
import { Provider } from 'react-redux';
import { store } from '../store';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// Redux setup
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Context API setup
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

// Zustand setup (no provider needed)
// But you can still use _app.js for initialization
import { useEffect } from 'react';
import { useStore } from '../store';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initialize store on app load
    useStore.getState().initialize();
  }, []);
  
  return <Component {...pageProps} />;
}

// Multiple providers
export default function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Error Boundaries */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Error Boundaries
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add error boundaries to catch and handle errors in your application.
          </p>

          <CodeBlock
            code={`// pages/_app.js
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

// Using react-error-boundary library
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
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error:', error, errorInfo);
      }}
      onReset={() => {
        // Reset app state
      }}
    >
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 7: Analytics Integration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Analytics Integration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add analytics tracking that works across all pages.
          </p>

          <CodeBlock
            code={`// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  return <Component {...pageProps} />;
}

// lib/gtag.js
export const pageview = (url) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Google Analytics with Script component
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={\`https://www.googletagmanager.com/gtag/js?id=\${process.env.NEXT_PUBLIC_GA_ID}\`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: \`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '\${process.env.NEXT_PUBLIC_GA_ID}');
          \`,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

// Multiple analytics providers
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Google Analytics
      gtag.pageview(url);
      // Facebook Pixel
      fbq('track', 'PageView');
      // Custom analytics
      analytics.track('page_view', { url });
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  return <Component {...pageProps} />;
}`}
            language="javascript"
          />
        </section>

        {/* Section 8: getInitialProps in _app */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. getInitialProps in _app
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getInitialProps
            </code>{" "}
            in _app.js to fetch data for all pages (disables automatic static
            optimization).
          </p>

          <CodeBlock
            code={`// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// getInitialProps in _app.js
MyApp.getInitialProps = async (appContext) => {
  // appContext.ctx - Same context as page getInitialProps
  // appContext.Component - The active page component
  // appContext.router - The router instance
  
  // Fetch global data
  const globalData = await fetchGlobalData();
  
  // Call getInitialProps of page component if it exists
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  
  return {
    pageProps: {
      ...pageProps,
      globalData, // Add global data to all pages
    },
  };
}

// Example: Fetching user data for all pages
MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const token = ctx.req?.cookies?.token;
  
  let user = null;
  if (token) {
    user = await getUserFromToken(token);
  }
  
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(ctx);
  }
  
  return {
    pageProps: {
      ...pageProps,
      user, // Available in all pages
    },
  };
}

// Important Warning
// ⚠️ Using getInitialProps in _app.js disables automatic static optimization
// All pages will be server-rendered, even if they don't need it
// Consider using getServerSideProps in individual pages instead`}
            language="javascript"
          />

          <div className="mt-4 rounded-lg bg-yellow-50 border-2 border-yellow-200 p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> Using{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                getInitialProps
              </code>{" "}
              in{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                _app.js
              </code>{" "}
              disables automatic static optimization for your entire
              application. All pages will be server-rendered, even if they could
              be statically generated.
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a6"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to A6 Lessons
          </Link>
          <Link
            href="/learn/pages-router/a6/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A6.2 Custom _document.js →
          </Link>
        </div>
      </div>
    </div>
  );
}
