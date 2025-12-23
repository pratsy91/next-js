import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A11.9: Best Practices & Patterns - Next.js Mastery",
  description: "Best practices and patterns for Next.js Pages Router",
};

export default function Lesson9Page() {
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
          A11.9: Best Practices & Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Production-ready patterns, architecture decisions, and common
          pitfalls.
        </p>
      </div>

      <div className="space-y-8">
        {/* Project Structure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Project Structure Best Practices
          </h2>
          <CodeBlock
            code={`// Recommended structure
pages/
├── _app.js
├── _document.js
├── index.js
├── about.js
├── blog/
│   ├── index.js
│   └── [slug].js
├── api/
│   └── users/
│       └── [id].js
└── components/        # Shared components
    ├── Layout.js
    ├── Header.js
    └── Footer.js

// Organize by feature (alternative)
pages/
├── dashboard/
│   ├── index.js
│   └── settings.js
└── marketing/
    ├── index.js
    └── about.js

components/
├── dashboard/
│   └── DashboardCard.js
└── marketing/
    └── Hero.js`}
            language="text"
          />
        </section>

        {/* Data Fetching Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Data Fetching Patterns
          </h2>
          <CodeBlock
            code={`// ✅ DO: Use getStaticProps for static content
export async function getStaticProps() {
  const posts = await fetchPosts();
  return { props: { posts } };
}

// ✅ DO: Use getServerSideProps for dynamic content
export async function getServerSideProps(context) {
  const user = await getUser(context.req);
  return { props: { user } };
}

// ✅ DO: Use ISR for semi-static content
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 60, // Revalidate every 60 seconds
  };
}

// ❌ DON'T: Use getInitialProps in pages (legacy)
// Use getStaticProps or getServerSideProps instead

// ✅ DO: Fetch in parallel when possible
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
]);`}
            language="javascript"
          />
        </section>

        {/* Error Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Error Handling Strategies
          </h2>
          <CodeBlock
            code={`// Custom 404 page
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}

// Custom 500 page
// pages/500.js
export default function Custom500({ statusCode }) {
  return (
    <h1>{statusCode ? \`An error \${statusCode} occurred\` : 'An error occurred'}</h1>
  );
}

// Error handling in getServerSideProps
export async function getServerSideProps() {
  try {
    const data = await fetchData();
    return { props: { data } };
  } catch (error) {
    return {
      notFound: true, // Show 404
      // or
      // redirect: {
      //   destination: '/error',
      //   permanent: false,
      // },
    };
  }
}

// Error boundaries (React)
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}`}
            language="javascript"
          />
        </section>

        {/* Loading States */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Loading State Patterns
          </h2>
          <CodeBlock
            code={`// Router loading state
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return <div>Content</div>;
}

// Client-side loading
import { useState, useEffect } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData().then(data => {
      setData(data);
      setLoading(false);
    });
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return <div>{data}</div>;
}

// Skeleton loaders
export default function Page({ data }) {
  if (!data) {
    return <SkeletonLoader />;
  }
  return <div>{data.content}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Authentication Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Authentication Patterns
          </h2>
          <CodeBlock
            code={`// getServerSideProps authentication
export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  const user = await getUser(token);
  
  return {
    props: { user },
  };
}

// Higher-order component
export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
      checkAuth().then(auth => {
        setAuthenticated(auth);
        if (!auth) {
          router.push('/login');
        }
      });
    }, [router]);
    
    if (!authenticated) {
      return null;
    }
    
    return <Component {...props} />;
  };
}

// Usage
export default withAuth(DashboardPage);`}
            language="javascript"
          />
        </section>

        {/* State Management */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. State Management Approaches
          </h2>
          <CodeBlock
            code={`// React Context
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Redux
import { Provider } from 'react-redux';
import store from '@/store';

// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// URL state for shareable state
// Use query parameters for filters, pagination, etc.
const router = useRouter();
const { filter, page } = router.query;`}
            language="javascript"
          />
        </section>

        {/* Type Safety */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Type Safety with TypeScript
          </h2>
          <CodeBlock
            code={`// Page props types
// pages/products/[id].tsx
import { GetServerSideProps } from 'next';

type PageProps = {
  product: {
    id: string;
    name: string;
  };
};

export default function ProductPage({ product }: PageProps) {
  return <div>{product.name}</div>;
}

// getServerSideProps type
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const product = await fetchProduct(context.params!.id);
  return {
    props: { product },
  };
};

// API route types
// pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  user?: {
    id: string;
    name: string;
  };
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ user: { id: '1', name: 'John' } });
}`}
            language="typescript"
          />
        </section>

        {/* Common Pitfalls */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Common Pitfalls & Solutions
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Using getInitialProps:</strong> Use getStaticProps or
              getServerSideProps instead
            </li>
            <li>
              <strong>Not handling loading states:</strong> Always handle
              router.isFallback
            </li>
            <li>
              <strong>Not optimizing images:</strong> Use next/image component
            </li>
            <li>
              <strong>Over-fetching data:</strong> Fetch only what you need
            </li>
            <li>
              <strong>Not handling errors:</strong> Implement error boundaries
              and try-catch
            </li>
            <li>
              <strong>Ignoring caching:</strong> Use ISR for better performance
            </li>
            <li>
              <strong>Large bundle sizes:</strong> Use dynamic imports
            </li>
            <li>
              <strong>Not using TypeScript:</strong> Add type safety for better
              DX
            </li>
            <li>
              <strong>Blocking rendering:</strong> Use client-side fetching for
              non-critical data
            </li>
            <li>
              <strong>Poor SEO:</strong> Add proper meta tags and structured
              data
            </li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a11/lesson-8"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Interview Questions
          </Link>
          <Link
            href="/learn/pages-router/a11/lesson-10"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Advanced Patterns →
          </Link>
        </div>
      </div>
    </div>
  );
}
