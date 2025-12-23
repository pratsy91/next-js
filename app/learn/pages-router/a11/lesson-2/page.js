import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A11.2: Data Fetching Methods Cheatsheet - Next.js Mastery",
  description: "Complete data fetching reference for Next.js Pages Router",
};

export default function Lesson2Page() {
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
          A11.2: Data Fetching Methods Cheatsheet
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete reference for getStaticProps, getServerSideProps,
          getStaticPaths, and data fetching patterns.
        </p>
      </div>

      <div className="space-y-8">
        {/* getStaticProps */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. getStaticProps (SSG)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            is a special function that runs at build time to pre-render pages
            with data. It enables Static Site Generation (SSG), where HTML is
            generated once at build time and served from a CDN. This provides
            the fastest possible performance and excellent SEO since content is
            fully available before JavaScript executes.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it works:</strong> During the build process, Next.js
            calls{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            for each page that exports it. The function fetches data, processes
            it, and returns props that are passed to the page component. The
            resulting HTML is cached and served statically. With Incremental
            Static Regeneration (ISR), you can specify a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidate
            </code>{" "}
            time to update the page after the initial build without rebuilding
            the entire site.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Interview Tip:</strong> Know when to use getStaticProps vs
            getServerSideProps. Use getStaticProps when data can be determined
            at build time, content doesn't change frequently, or you want
            maximum performance. It's ideal for blogs, documentation, marketing
            pages, or any content that's publicly available and relatively
            stable.
          </p>
          <CodeBlock
            code={`// pages/products/[id].js
export async function getStaticProps(context) {
  const { params, preview, previewData } = context;
  
  // Fetch data
  const product = await fetchProduct(params.id);
  
  if (!product) {
    return {
      notFound: true, // Returns 404 page
    };
  }
  
  return {
    props: {
      product, // Passed to page component
    },
    // ISR: Revalidate every 60 seconds
    revalidate: 60,
  };
}

export default function Product({ product }) {
  return <div>{product.name}</div>;
}

// Context Parameters:
// - params: Route parameters for dynamic routes
// - preview: Boolean indicating preview mode
// - previewData: Preview data set by setPreviewData
// - locale: Active locale (i18n)
// - locales: All available locales
// - defaultLocale: Default locale`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Return Values
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>props:</strong> Object passed to page component (required
              if not redirecting)
            </li>
            <li>
              <strong>revalidate:</strong> Number of seconds for ISR (optional)
            </li>
            <li>
              <strong>notFound:</strong> Boolean, shows 404 if true
            </li>
            <li>
              <strong>redirect:</strong> Object {"{"}destination: string,
              permanent: boolean{"}"}
            </li>
          </ul>
        </section>

        {/* getServerSideProps */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. getServerSideProps (SSR)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>{" "}
            enables Server-Side Rendering (SSR), where the page is rendered on
            each request rather than at build time. This function runs on the
            server before the page is sent to the client, giving you access to
            the full request and response objects, making it perfect for
            personalized content or data that changes frequently.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Characteristics:</strong> Unlike getStaticProps, this
            function executes on every request, so you have access to cookies,
            headers, query parameters, and request-specific data. It's slower
            than static generation since each page must be rendered per request,
            but it ensures data is always fresh. The function can return props,
            redirects, or notFound. Important: Using getServerSideProps disables
            Automatic Static Optimization, so pages won't be statically
            generated even if they could be.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Use Cases:</strong> Perfect for user-specific dashboards,
            authentication-required pages, real-time data, or content that must
            be personalized per request. It's also useful when you need to
            access request headers (like Accept-Language for
            internationalization) or handle authentication checks before
            rendering.
          </p>
          <CodeBlock
            code={`// pages/profile.js
export async function getServerSideProps(context) {
  const {
    req,        // HTTP IncomingMessage
    res,        // HTTP ServerResponse
    params,     // Route parameters
    query,      // Query string parsed
    preview,    // Preview mode
    previewData,
    resolvedUrl, // Actual URL including query
    locale,
    locales,
    defaultLocale,
  } = context;
  
  // Access cookies
  const token = req.cookies.token;
  
  // Check authentication
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  // Fetch user data
  const user = await getUserFromToken(token);
  
  return {
    props: {
      user,
    },
    // Optional: Cache response (max 2 seconds)
    // cache: 'no-store' | 'force-cache' | { revalidate: 60 }
  };
}

export default function Profile({ user }) {
  return <div>{user.name}</div>;
}

// Important: getServerSideProps disables Automatic Static Optimization`}
            language="javascript"
          />
        </section>

        {/* getStaticPaths */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. getStaticPaths (Dynamic Routes with SSG)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticPaths
            </code>{" "}
            is required when using{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            with dynamic routes. It tells Next.js which specific paths to
            pre-render at build time. Without it, Next.js wouldn't know which
            dynamic routes should be generated statically.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it works:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticPaths
            </code>{" "}
            runs at build time and returns an array of path objects. Each path
            object contains the params that will be passed to{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>
            . The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              fallback
            </code>{" "}
            property determines what happens when a path isn't pre-generated:{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              false
            </code>{" "}
            returns 404,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              true
            </code>{" "}
            shows a fallback UI, and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              'blocking'
            </code>{" "}
            waits for generation on first request.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Required for dynamic routes with getStaticProps. Defines which paths
            to pre-render.
          </p>
          <CodeBlock
            code={`// pages/products/[id].js
export async function getStaticPaths() {
  // Fetch all product IDs
  const products = await fetchAllProducts();
  
  // Generate paths
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));
  
  return {
    paths,
    fallback: false, // See fallback options below
  };
}

export async function getStaticProps({ params }) {
  const product = await fetchProduct(params.id);
  return { props: { product } };
}

// For catch-all routes
// pages/shop/[...categories].js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { categories: [] } },
      { params: { categories: ['electronics'] } },
      { params: { categories: ['electronics', 'phones'] } },
    ],
    fallback: false,
  };
}

// Context has params object:
// - Single dynamic: { id: '123' }
// - Catch-all: { categories: ['a', 'b'] }
// - Optional catch-all: { categories: ['a'] } or { categories: [] }`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Fallback Options
          </h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                fallback: false
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                <li>Any path not returned → 404</li>
                <li>All paths must be known at build time</li>
                <li>Best for: Small, finite set of pages</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                fallback: true
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                <li>Paths not generated → show fallback page</li>
                <li>Page generated on first request (background)</li>
                <li>Must check router.isFallback in component</li>
              </ul>
              <CodeBlock
                code={`export default function Product({ product }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return <div>{product.name}</div>;
}`}
                language="javascript"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                fallback: 'blocking'
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                <li>Paths not generated → Next.js waits for generation</li>
                <li>No fallback state needed</li>
                <li>First request is slower (generates on-demand)</li>
                <li>Better for SEO (no loading state)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ISR */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Incremental Static Regeneration (ISR)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Incremental Static Regeneration (ISR) allows you to update static
            pages after they've been built, without rebuilding the entire site.
            It combines the performance benefits of static generation with the
            flexibility of dynamic content that updates periodically.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How ISR Works:</strong> When you specify a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidate
            </code>{" "}
            time in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>
            , Next.js serves the statically generated page from cache. After the
            revalidation period expires, the next request triggers a background
            regeneration of that page while still serving the stale (but valid)
            version. Once regeneration completes, future requests get the fresh
            page. This ensures users always get fast responses while content
            stays relatively fresh.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Use Cases:</strong> ISR is perfect for content that changes
            occasionally but doesn't need to be real-time. Examples include
            product pages (prices change but not constantly), blog posts
            (published occasionally), or news sites (updated regularly but not
            every second). It's also useful for large sites where rebuilding
            everything would take too long - you can regenerate pages
            incrementally as they're requested. For interview purposes,
            understand that ISR provides a middle ground between static
            generation (fast but stale) and server-side rendering (fresh but
            slower).
          </p>
          <CodeBlock
            code={`// pages/products/[id].js
export async function getStaticPaths() {
  // Pre-render most popular products
  const popularProducts = await getPopularProducts();
  
  return {
    paths: popularProducts.map(p => ({ params: { id: p.id } })),
    fallback: 'blocking', // Generate others on-demand
  };
}

export async function getStaticProps({ params }) {
  const product = await fetchProduct(params.id);
  
  return {
    props: { product },
    // Revalidate every 60 seconds
    revalidate: 60,
  };
}

// How ISR works:
// 1. First request: Generate and cache page
// 2. Subsequent requests: Serve cached page (fast)
// 3. After revalidate period: Next request triggers regeneration
// 4. Stale page served while regenerating
// 5. Fresh page cached for next requests

// On-demand Revalidation (without revalidate)
// POST /api/revalidate?secret=token&path=/products/123
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  try {
    await res.revalidate(req.query.path as string);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}`}
            language="javascript"
          />
        </section>

        {/* Context Parameters */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Context Parameter Reference
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The context parameter is passed to{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>
            , providing access to route information, request details, and
            Next.js-specific features. Understanding what's available in the
            context is essential for building dynamic pages and handling various
            scenarios.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Context Properties:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              params
            </code>{" "}
            contains dynamic route parameters (available in both), which is
            crucial for dynamic routes.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              req
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              res
            </code>{" "}
            are only available in getServerSideProps, giving you full access to
            HTTP request and response objects for authentication, headers,
            cookies, etc.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              query
            </code>{" "}
            provides parsed query string parameters. Preview mode properties
            allow content preview functionality. Understanding which properties
            are available in which function helps you choose the right data
            fetching method for your needs.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Property
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Available In
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    params
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Both
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Route parameters (dynamic routes)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    req
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    getServerSideProps
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    HTTP request object
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    res
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    getServerSideProps
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    HTTP response object
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    query
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    getServerSideProps
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Query string parameters
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    preview
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Both
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Preview mode active
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    previewData
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Both
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Preview data from setPreviewData
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    resolvedUrl
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    getServerSideProps
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Actual URL including query
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Values */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Return Values Reference
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Data fetching functions must return a specific object structure that
            tells Next.js how to handle the page. The return value determines
            what props are passed to the component, whether to show a 404,
            redirect to another page, or configure caching behavior.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Return Value Options:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              props
            </code>{" "}
            is the most common - an object whose properties are passed to the
            page component.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidate
            </code>{" "}
            enables ISR by specifying revalidation time in seconds.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              notFound: true
            </code>{" "}
            shows the 404 page, useful when data doesn't exist.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              redirect
            </code>{" "}
            sends users to another page (permanent=true uses 308, false uses
            307).{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              cache
            </code>{" "}
            (getServerSideProps only) controls response caching. You can only
            return one of props, redirect, or notFound - they're mutually
            exclusive.
          </p>
          <CodeBlock
            code={`// props: Object passed to page component
return {
  props: {
    data: 'value',
  },
};

// revalidate: ISR revalidation time in seconds
return {
  props: { data },
  revalidate: 60,
};

// notFound: Show 404 page
return {
  notFound: true,
};

// redirect: Redirect to another page
return {
  redirect: {
    destination: '/login',
    permanent: false, // true = 308, false = 307
  },
};

// cache: Control caching (getServerSideProps only)
return {
  props: { data },
  cache: 'no-store', // or 'force-cache'
  // or
  cache: {
    revalidate: 60,
  },
};`}
            language="javascript"
          />
        </section>

        {/* Data Fetching Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Data Fetching Patterns
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Choosing the right data fetching pattern significantly impacts
            performance and user experience. The key is understanding when to
            fetch data in parallel versus sequentially, and how to properly
            handle errors and edge cases.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Parallel vs Sequential:</strong> Always fetch independent
            data sources in parallel using{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Promise.all()
            </code>{" "}
            - this minimizes total loading time. Use sequential fetching only
            when one operation depends on another's result (e.g., fetching user
            data first, then fetching that user's posts using their ID). Error
            handling should use try-catch blocks, returning{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              notFound: true
            </code>{" "}
            for missing resources or redirecting to error pages for other
            failures. Always validate data exists before returning it as props.
          </p>
          <CodeBlock
            code={`// Parallel fetching
export async function getStaticProps() {
  const [posts, comments] = await Promise.all([
    fetchPosts(),
    fetchComments(),
  ]);
  
  return {
    props: { posts, comments },
  };
}

// Sequential fetching (when dependent)
export async function getStaticProps({ params }) {
  const user = await fetchUser(params.id);
  const posts = await fetchUserPosts(user.id); // Depends on user
  
  return {
    props: { user, posts },
  };
}

// Error handling
export async function getStaticProps({ params }) {
  try {
    const data = await fetchData(params.id);
    return {
      props: { data },
    };
  } catch (error) {
    return {
      notFound: true,
      // or
      // redirect: { destination: '/error', permanent: false },
    };
  }
}`}
            language="javascript"
          />
        </section>

        {/* When to Use Each */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. When to Use Each Method
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                getStaticProps:
              </p>
              <ul className="list-inside list-disc space-y-1 ml-4">
                <li>Data available at build time</li>
                <li>Static content (blogs, docs, marketing)</li>
                <li>Best performance needed</li>
                <li>Content from CMS, markdown, APIs</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                getServerSideProps:
              </p>
              <ul className="list-inside list-disc space-y-1 ml-4">
                <li>Data must be fetched at request time</li>
                <li>Personalized content</li>
                <li>Need request/response access</li>
                <li>Authentication required</li>
                <li>Real-time data</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Client-side (no data fetching function):
              </p>
              <ul className="list-inside list-disc space-y-1 ml-4">
                <li>User-specific data not needed for SEO</li>
                <li>Dashboards</li>
                <li>Data that changes frequently</li>
                <li>Use SWR, React Query, or useEffect</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a11/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Core Concepts
          </Link>
          <Link
            href="/learn/pages-router/a11/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Routing & Navigation →
          </Link>
        </div>
      </div>
    </div>
  );
}
