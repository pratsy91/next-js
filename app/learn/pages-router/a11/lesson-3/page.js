import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A11.3: Routing & Navigation Patterns - Next.js Mastery",
  description: "Complete routing reference for Next.js Pages Router",
};

export default function Lesson3Page() {
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
          A11.3: Routing & Navigation Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Routing reference, dynamic routes, catch-all routes, optional
          catch-all, and navigation.
        </p>
      </div>

      <div className="space-y-8">
        {/* Static Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Static Routes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Static routes in Next.js Pages Router are created by placing files
            directly in the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/
            </code>{" "}
            directory. The file path directly maps to the URL path - a file at{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/about.js
            </code>{" "}
            creates the route{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /about
            </code>
            . Nested folders create nested routes, and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              index.js
            </code>{" "}
            files represent the base route of that folder.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Interview Points:</strong> Understand that Next.js uses
            convention over configuration - you don't need to declare routes
            manually. Each page file automatically becomes a route, and Next.js
            handles code splitting per page. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/
            </code>{" "}
            directory is special and Next.js automatically treats it as the
            routing directory. Static routes are pre-rendered at build time
            (with getStaticProps) or request time (with getServerSideProps).
          </p>
          <CodeBlock
            code={`// pages/about.js
export default function AboutPage() {
  return <h1>About</h1>;
}
// URL: /about

// pages/contact.js
export default function ContactPage() {
  return <h1>Contact</h1>;
}
// URL: /contact

// Nested routes
// pages/blog/index.js
export default function BlogPage() {
  return <h1>Blog</h1>;
}
// URL: /blog`}
            language="javascript"
          />
        </section>

        {/* Dynamic Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Dynamic Routes [id]
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Dynamic routes use square brackets in file or folder names to create
            parameterized routes. A file named{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [id].js
            </code>{" "}
            creates a dynamic route where{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              id
            </code>{" "}
            becomes available via{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.query
            </code>
            . Multiple dynamic segments can be nested, and each creates a
            separate query parameter.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How parameters work:</strong> When a user visits{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /products/123
            </code>
            , Next.js matches it to{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/products/[id].js
            </code>{" "}
            and sets{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.query.id = '123'
            </code>
            . These parameters are strings by default and are available in both
            page components and data fetching functions (getServerSideProps,
            getStaticProps, getStaticPaths). For static generation with dynamic
            routes, you must use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticPaths
            </code>{" "}
            to specify which paths to pre-render.
          </p>
          <CodeBlock
            code={`// pages/products/[id].js
export default function ProductPage({ router }) {
  const { id } = router.query;
  return <h1>Product {id}</h1>;
}
// URL: /products/123 → id = '123'
// URL: /products/laptop → id = 'laptop'

// Multiple dynamic segments
// pages/shop/[category]/[product].js
export default function ProductDetailPage({ router }) {
  const { category, product } = router.query;
  return (
    <div>
      Category: {category}
      Product: {product}
    </div>
  );
}
// URL: /shop/electronics/laptop`}
            language="javascript"
          />
        </section>

        {/* Catch-all Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Catch-all Routes [...slug]
          </h2>
          <CodeBlock
            code={`// pages/docs/[...slug].js
export default function DocsPage({ router }) {
  const { slug } = router.query;
  // slug is an array
  // /docs/getting-started → slug = ['getting-started']
  // /docs/getting-started/installation → slug = ['getting-started', 'installation']
  
  return <div>{slug?.join('/')}</div>;
}

// Handling the slug array
export default function DocsPage({ router }) {
  const { slug } = router.query;
  
  if (!slug) {
    return <div>Docs Home</div>;
  }
  
  const path = Array.isArray(slug) ? slug.join('/') : slug;
  return <div>Docs: {path}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Optional Catch-all */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Optional Catch-all [[...slug]]
          </h2>
          <CodeBlock
            code={`// pages/shop/[[...slug]].js
export default function ShopPage({ router }) {
  const { slug } = router.query;
  
  // /shop → slug is undefined
  // /shop/electronics → slug = ['electronics']
  // /shop/electronics/laptops → slug = ['electronics', 'laptops']
  
  if (!slug) {
    return <div>Shop Home</div>;
  }
  
  return <div>Shop: {slug.join('/')}</div>;
}

// Alternative with index page
// pages/shop/index.js → /shop
// pages/shop/[...slug].js → /shop/electronics/laptops`}
            language="javascript"
          />
        </section>

        {/* Link Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Link Component & Prefetching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Link
            </code>{" "}
            component enables client-side navigation, which is faster than
            traditional page navigation because it only updates the URL and page
            content without a full browser reload. Next.js automatically
            prefetches pages linked with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Link
            </code>{" "}
            when they're visible in the viewport, making navigation feel instant
            when users click.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How prefetching works:</strong> Next.js uses the
            Intersection Observer API to detect when links enter the viewport,
            then prefetches the linked page's JavaScript and data in the
            background. This prefetching happens at low priority, so it doesn't
            interfere with current page rendering. When a user hovers over a
            link, Next.js can also prefetch it, though viewport-based
            prefetching is more common. Prefetching only happens in production
            builds and when the link is actually rendered (not hidden with CSS).
          </p>
          <CodeBlock
            code={`import Link from 'next/link';

// Basic link
<Link href="/about">About</Link>

// Dynamic route
<Link href="/products/123">Product 123</Link>

// With query params
<Link href={{
  pathname: '/products',
  query: { category: 'electronics' }
}}>
  Electronics
</Link>

// Prefetching
<Link href="/about" prefetch={true}>About</Link>
<Link href="/about" prefetch={false}>About</Link>

// Replace history
<Link href="/about" replace>About</Link>

// Scroll behavior
<Link href="/about" scroll={false}>About</Link>

// With anchor
<Link href="/about#team">Team Section</Link>`}
            language="javascript"
          />
        </section>

        {/* useRouter Hook */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. useRouter Hook
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useRouter
            </code>{" "}
            hook from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/router
            </code>{" "}
            provides access to the router object, which contains information
            about the current route and methods to programmatically navigate.
            This hook is essential for building dynamic navigation, handling
            query parameters, and managing route-based state.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Important Properties:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.query
            </code>{" "}
            contains both dynamic route parameters and URL query parameters,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.pathname
            </code>{" "}
            shows the route pattern (not the actual URL),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.asPath
            </code>{" "}
            shows the actual URL including query strings, and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.isFallback
            </code>{" "}
            indicates if a page is in fallback mode (for getStaticPaths). The
            router is ready to use after{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.isReady
            </code>{" "}
            becomes true, which is important for client-side data fetching based
            on query parameters.
          </p>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function MyPage() {
  const router = useRouter();
  
  // Router properties
  const { 
    route,        // Current route
    pathname,     // Pathname
    query,        // Query params
    asPath,       // Actual URL
    push,         // Navigate function
    replace,      // Replace function
    back,         // Go back
    reload,       // Reload page
    prefetch,     // Prefetch function
    isReady,      // Router ready state
    isFallback,   // getStaticPaths fallback state
    events,       // Router events
  } = router;
  
  // Programmatic navigation
  function handleClick() {
    router.push('/about');
    router.push('/products/123');
    router.push({
      pathname: '/products',
      query: { category: 'electronics' }
    });
    router.replace('/about'); // Replace history
    router.back(); // Go back
    router.reload(); // Reload
  }
  
  // Access query params
  const { id } = router.query;
  
  return <div>Current route: {router.pathname}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Programmatic Navigation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Programmatic Navigation
          </h2>
          <CodeBlock
            code={`import { useRouter } from 'next/router';

export default function NavigationExample() {
  const router = useRouter();
  
  // Navigate to a page
  function goToAbout() {
    router.push('/about');
  }
  
  // Navigate with query params
  function goToProduct(id) {
    router.push({
      pathname: '/products/[id]',
      query: { id }
    });
  }
  
  // Replace current history entry
  function replaceRoute() {
    router.replace('/dashboard');
  }
  
  // Navigate back
  function goBack() {
    router.back();
  }
  
  // Conditional navigation
  function handleSubmit() {
    // After form submission
    if (success) {
      router.push('/success');
    } else {
      router.push('/error');
    }
  }
  
  return (
    <div>
      <button onClick={goToAbout}>Go to About</button>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Route Protection */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Route Protection Patterns
          </h2>
          <CodeBlock
            code={`// Using getServerSideProps
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
  
  return {
    props: {},
  };
}

// Using useEffect in component
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedPage() {
  const router = useRouter();
  
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));
    
    if (!token) {
      router.push('/login');
    }
  }, [router]);
  
  return <div>Protected Content</div>;
}

// HOC pattern
export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    
    useEffect(() => {
      // Check authentication
      if (!authenticated) {
        router.push('/login');
      }
    }, [authenticated, router]);
    
    if (!authenticated) {
      return null;
    }
    
    return <Component {...props} />;
  };
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a11/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Data Fetching Methods
          </Link>
          <Link
            href="/learn/pages-router/a11/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: API Routes Reference →
          </Link>
        </div>
      </div>
    </div>
  );
}
