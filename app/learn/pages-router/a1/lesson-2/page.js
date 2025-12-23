import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A1.2: Core Concepts - Next.js Mastery",
  description: "Core concepts of Next.js Pages Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a1"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A1 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A1.2: Core Concepts
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Understanding the fundamental concepts of Next.js Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: File-based Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. File-based Routing in pages/
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js uses a file-based routing system. Every file in the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/
            </code>{" "}
            directory becomes a route automatically.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Routing Examples
          </h3>
          <CodeBlock
            code={`pages/
├── index.js          → / (home page)
├── about.js          → /about
├── contact.js        → /contact
├── blog/
│   ├── index.js      → /blog
│   └── [id].js       → /blog/:id (dynamic)
└── products/
    ├── index.js      → /products
    └── [id].js       → /products/:id`}
            language="text"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Route Examples
          </h3>
          <CodeBlock
            code={`// pages/index.js - Home page (/)
export default function Home() {
  return <h1>Home Page</h1>;
}

// pages/about.js - About page (/about)
export default function About() {
  return <h1>About Page</h1>;
}

// pages/blog/[id].js - Dynamic route (/blog/123)
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  
  return <h1>Blog Post: {id}</h1>;
}

// pages/posts/[...slug].js - Catch-all route (/posts/a/b/c)
export default function Post() {
  const router = useRouter();
  const { slug } = router.query;
  
  return <h1>Post: {slug?.join('/')}</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Points
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              Files in{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                pages/
              </code>{" "}
              automatically become routes
            </li>
            <li>No configuration needed - it's convention-based</li>
            <li>Nested folders create nested routes</li>
            <li>
              Special files like{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                _app.js
              </code>{" "}
              and{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                _document.js
              </code>{" "}
              don't create routes
            </li>
            <li>
              Files in{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                pages/api/
              </code>{" "}
              become API routes
            </li>
          </ul>
        </section>

        {/* Section 2: Automatic Code Splitting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Automatic Code Splitting
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically splits your code into smaller chunks. Each
            page only loads the JavaScript it needs.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How It Works
          </h3>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              Each page in{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                pages/
              </code>{" "}
              becomes its own JavaScript bundle
            </li>
            <li>Only the code needed for the current page is loaded</li>
            <li>Shared code is extracted into common chunks</li>
            <li>
              Code splitting happens automatically - no configuration needed
            </li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Example
          </h3>
          <CodeBlock
            code={`// pages/index.js
import HeavyComponent from '../components/HeavyComponent';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <HeavyComponent />
    </div>
  );
}

// pages/about.js
export default function About() {
  return <h1>About</h1>;
}

// When visiting /about, HeavyComponent is NOT loaded
// Only the About page code is loaded`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Imports for Manual Code Splitting
          </h3>
          <CodeBlock
            code={`// pages/index.js
import dynamic from 'next/dynamic';

// Dynamically import a component (code splitting)
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable server-side rendering for this component
});

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <HeavyComponent />
    </div>
  );
}

// The HeavyComponent will only be loaded when it's rendered`}
            language="javascript"
          />
        </section>

        {/* Section 3: Pre-rendering Concepts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Pre-rendering Concepts (SSG, SSR, ISR)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js pre-renders pages by default. This means HTML is generated
            in advance, improving performance and SEO.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Static Site Generation (SSG)
          </h3>
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            Pages are generated at build time. The HTML is created once and
            reused for every request.
          </p>
          <CodeBlock
            code={`// pages/about.js
// This page uses SSG by default (no data fetching)

export default function About() {
  return <h1>About Us</h1>;
}

// With getStaticProps - also SSG
export async function getStaticProps() {
  return {
    props: {
      data: 'Static data',
    },
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server-Side Rendering (SSR)
          </h3>
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            Pages are generated on each request. HTML is created fresh for every
            user.
          </p>
          <CodeBlock
            code={`// pages/profile.js
// Uses SSR with getServerSideProps

export async function getServerSideProps(context) {
  // This runs on every request
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  
  return {
    props: {
      user,
    },
  };
}

export default function Profile({ user }) {
  return <h1>Welcome, {user.name}</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Incremental Static Regeneration (ISR)
          </h3>
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            Pages are generated at build time but can be regenerated in the
            background after a time interval.
          </p>
          <CodeBlock
            code={`// pages/posts/[id].js
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: 'blocking', // or true
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.id);
  
  return {
    props: {
      post,
    },
    // Revalidate every 60 seconds
    revalidate: 60,
  };
}

export default function Post({ post }) {
  return <article>{post.content}</article>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Comparison Table
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    When Generated
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Use Case
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    SSG
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Build time
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Static content, blogs, marketing pages
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    SSR
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Request time
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    User-specific data, real-time content
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ISR
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Build time + revalidation
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Content that updates periodically
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Client-side Navigation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Client-side Navigation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js uses client-side navigation by default. When you navigate
            between pages, only the necessary JavaScript is loaded, not a full
            page refresh.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using next/link
          </h3>
          <CodeBlock
            code={`import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/123">Blog Post</Link>
      
      {/* With prefetch (default: true) */}
      <Link href="/contact" prefetch={false}>
        Contact
      </Link>
      
      {/* Replace instead of push */}
      <Link href="/login" replace>
        Login
      </Link>
      
      {/* Scroll to top (default: true) */}
      <Link href="/about" scroll={false}>
        About (no scroll)
      </Link>
    </nav>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Programmatic Navigation
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function MyComponent() {
  const router = useRouter();
  
  const handleNavigation = () => {
    // Navigate to a page
    router.push('/about');
    
    // Navigate with query params
    router.push({
      pathname: '/blog/[id]',
      query: { id: '123' },
    });
    
    // Replace current history entry
    router.replace('/login');
    
    // Go back
    router.back();
    
    // Reload current page
    router.reload();
    
    // Shallow routing (change URL without running data fetching)
    router.push('/about?foo=bar', undefined, { shallow: true });
  };
  
  return <button onClick={handleNavigation}>Navigate</button>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Router Events
          </h3>
          <CodeBlock
            code={`import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyComponent() {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      console.log('Route change starting:', url);
    };
    
    const handleRouteChangeComplete = (url) => {
      console.log('Route change complete:', url);
    };
    
    const handleRouteChangeError = (err, url) => {
      console.error('Route change error:', err, url);
    };
    
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);
  
  return <div>My Component</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Production vs Development Builds */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Production vs Development Builds
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js behaves differently in development and production modes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Development Mode
          </h3>
          <CodeBlock
            code={`npm run dev
# or
next dev`}
            language="bash"
          />
          <ul className="mb-4 mt-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Fast refresh enabled (hot module replacement)</li>
            <li>Detailed error messages with stack traces</li>
            <li>No code minification</li>
            <li>Source maps enabled</li>
            <li>Slower initial page load</li>
            <li>Pages compiled on-demand</li>
            <li>getStaticProps runs on every request</li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Production Mode
          </h3>
          <CodeBlock
            code={`npm run build
npm run start
# or
next build
next start`}
            language="bash"
          />
          <ul className="mb-4 mt-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Code minified and optimized</li>
            <li>Tree shaking enabled</li>
            <li>All pages pre-rendered (if using SSG)</li>
            <li>Optimized bundle sizes</li>
            <li>Faster page loads</li>
            <li>Production error pages</li>
            <li>getStaticProps runs only at build time</li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Build Output
          </h3>
          <CodeBlock
            code={`# After running 'next build', you'll see:
.next/
├── static/          # Static assets
├── server/          # Server-side code
├── cache/          # Build cache
└── BUILD_ID        # Build identifier

# Production server
.next/server/pages/  # Pre-rendered pages
.next/static/        # Static assets`}
            language="text"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Environment Detection
          </h3>
          <CodeBlock
            code={`// Check if in production
if (process.env.NODE_ENV === 'production') {
  // Production-only code
}

// Check if in development
if (process.env.NODE_ENV === 'development') {
  // Development-only code
}

// In pages
export default function MyPage() {
  const isDev = process.env.NODE_ENV === 'development';
  
  return (
    <div>
      {isDev && <div>Development Mode</div>}
      <h1>My Page</h1>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a1/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A1.1 Project Setup
          </Link>
          <Link
            href="/learn/pages-router/a1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to A1 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
