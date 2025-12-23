import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A11.8: Common Interview Questions & Answers - Next.js Mastery",
  description:
    "Comprehensive interview questions and answers for Next.js Pages Router",
};

export default function Lesson8Page() {
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
          A11.8: Common Interview Questions & Answers
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive collection of interview questions with detailed answers
          for Next.js Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Q1 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q1: Explain the difference between SSG, SSR, and ISR.
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Static Site Generation (SSG):</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Pages are pre-rendered at build time</li>
              <li>HTML is generated once and served from CDN</li>
              <li>Fastest performance, best SEO</li>
              <li>Use getStaticProps and optionally getStaticPaths</li>
              <li>Best for: Blog posts, documentation, marketing pages</li>
            </ul>
            <CodeBlock
              code={`export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
  };
}`}
              language="javascript"
            />

            <p className="mt-4">
              <strong>Server-Side Rendering (SSR):</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Pages are rendered on each request</li>
              <li>HTML is generated fresh for every user</li>
              <li>Can access request/response objects</li>
              <li>Use getServerSideProps</li>
              <li>
                Best for: Personalized content, real-time data, user dashboards
              </li>
            </ul>
            <CodeBlock
              code={`export async function getServerSideProps(context) {
  const { req, res, params, query } = context;
  const user = await getUser(req);
  return {
    props: { user },
  };
}`}
              language="javascript"
            />

            <p className="mt-4">
              <strong>Incremental Static Regeneration (ISR):</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Combines benefits of SSG and SSR</li>
              <li>Pages are statically generated at build time</li>
              <li>Regenerated in the background after revalidation period</li>
              <li>Use getStaticProps with revalidate option</li>
              <li>Best for: E-commerce products, frequently updated content</li>
            </ul>
            <CodeBlock
              code={`export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 60, // Revalidate every 60 seconds
  };
}`}
              language="javascript"
            />
          </div>
        </section>

        {/* Q2 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q2: When should you use getStaticProps vs getServerSideProps?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Use getStaticProps when:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Data can be determined at build time</li>
              <li>Content doesn't change frequently</li>
              <li>You want best performance and SEO</li>
              <li>Data comes from CMS, markdown files, or APIs</li>
              <li>Content is public and doesn't require user-specific data</li>
            </ul>

            <p>
              <strong>Use getServerSideProps when:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>You need request-time data</li>
              <li>Data changes frequently (every request)</li>
              <li>Need access to cookies, headers, query params</li>
              <li>Content is personalized per user</li>
              <li>You need to check authentication on server</li>
              <li>Data depends on user's location or timezone</li>
            </ul>

            <p>
              <strong>Trade-offs:</strong>
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Aspect
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      getStaticProps
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      getServerSideProps
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                      Performance
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      ⭐⭐⭐ Fastest
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      ⭐⭐ Slower (per request)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                      SEO
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      ⭐⭐⭐ Excellent
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      ⭐⭐⭐ Excellent
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                      Real-time Data
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      ❌ No (unless ISR)
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      ✅ Yes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                      Build Time
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      Longer (pre-generates)
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      Shorter (generates on-demand)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Q3 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q3: Explain getStaticPaths and its fallback options.
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              getStaticPaths is used with getStaticProps for dynamic routes. It
              tells Next.js which paths to pre-render at build time.
            </p>
            <CodeBlock
              code={`// pages/products/[id].js
export async function getStaticPaths() {
  const products = await fetchAllProducts();
  
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));
  
  return {
    paths,
    fallback: false, // or 'blocking' or true
  };
}

export async function getStaticProps({ params }) {
  const product = await fetchProduct(params.id);
  return {
    props: { product },
  };
}`}
              language="javascript"
            />

            <p>
              <strong>fallback: false</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Any path not returned by getStaticPaths → 404</li>
              <li>All possible paths must be specified at build time</li>
              <li>Best when: You have a small, known set of paths</li>
            </ul>

            <p>
              <strong>fallback: true</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Paths not generated at build time → show fallback page</li>
              <li>Next.js generates page on first request</li>
              <li>Must handle loading state in component</li>
              <li>Best when: You have many paths, can't pre-generate all</li>
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

            <p>
              <strong>fallback: 'blocking'</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Paths not generated → Next.js waits for page generation</li>
              <li>No fallback state needed in component</li>
              <li>First request is slower (generates on-demand)</li>
              <li>Best when: You want to avoid loading state, prefer SEO</li>
            </ul>
          </div>
        </section>

        {/* Q4 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q4: What is the difference between _app.js and _document.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>_app.js:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Runs on both server and client</li>
              <li>Wraps all pages</li>
              <li>
                Used for: Global styles, providers, layout components, state
                management
              </li>
              <li>Has access to pageProps</li>
              <li>
                Can have getInitialProps (disables automatic static
                optimization)
              </li>
            </ul>
            <CodeBlock
              code={`// pages/_app.js
import '@/styles/globals.css';
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

            <p>
              <strong>_document.js:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Runs only on server</li>
              <li>Used for: Customizing &lt;html&gt; and &lt;body&gt; tags</li>
              <li>Adds fonts, meta tags, external scripts</li>
              <li>Does NOT receive pageProps</li>
              <li>Should NOT be used for app logic</li>
            </ul>
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
}`}
              language="javascript"
            />
          </div>
        </section>

        {/* Q5 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q5: How do API Routes work in Pages Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              API Routes allow you to create API endpoints as Serverless
              Functions in the pages/api/ directory.
            </p>
            <CodeBlock
              code={`// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  const { method } = req;
  
  switch (method) {
    case 'GET':
      const user = getUser(id);
      res.status(200).json(user);
      break;
      
    case 'POST':
      const newUser = createUser(req.body);
      res.status(201).json(newUser);
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(\`Method \${method} Not Allowed\`);
  }
}

// Dynamic route: /api/users/123
// Catch-all: pages/api/users/[...params].js → /api/users/a/b/c
// Optional catch-all: pages/api/users/[[...params]].js`}
              language="javascript"
            />

            <p>
              <strong>Key Features:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Each file in pages/api/ becomes an API endpoint</li>
              <li>Files export a default function (handler)</li>
              <li>Handler receives req and res objects (Node.js-like)</li>
              <li>Supports all HTTP methods</li>
              <li>Deploys as serverless functions</li>
              <li>Can handle middleware, authentication, CORS</li>
            </ul>
          </div>
        </section>

        {/* Q6 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q6: How do you handle errors in Pages Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>1. Custom Error Page (404):</strong>
            </p>
            <CodeBlock
              code={`// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}`}
              language="javascript"
            />

            <p>
              <strong>2. Custom Error Page (500):</strong>
            </p>
            <CodeBlock
              code={`// pages/500.js
export default function Custom500() {
  return <h1>500 - Server Error</h1>;
}`}
              language="javascript"
            />

            <p>
              <strong>3. Error Handling in getServerSideProps:</strong>
            </p>
            <CodeBlock
              code={`export async function getServerSideProps() {
  try {
    const data = await fetchData();
    return {
      props: { data },
    };
  } catch (error) {
    return {
      notFound: true, // Shows 404 page
      // OR
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
}`}
              language="javascript"
            />

            <p>
              <strong>4. Error Boundaries (React):</strong>
            </p>
            <CodeBlock
              code={`// components/ErrorBoundary.js
class ErrorBoundary extends React.Component {
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
          </div>
        </section>

        {/* Q7 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q7: What are best practices for performance optimization?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>1. Use Static Generation when possible:</strong> SSG is
              fastest.
            </p>
            <p>
              <strong>2. Use ISR for frequently updated content:</strong> Best
              of both worlds.
            </p>
            <p>
              <strong>3. Optimize Images:</strong>
            </p>
            <CodeBlock
              code={`import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // For above-fold images
  loading="lazy" // Default for below-fold
/>`}
              language="javascript"
            />

            <p>
              <strong>4. Code Splitting with Dynamic Imports:</strong>
            </p>
            <CodeBlock
              code={`import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('../components/Heavy'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});`}
              language="javascript"
            />

            <p>
              <strong>5. Font Optimization:</strong>
            </p>
            <CodeBlock
              code={`import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
}`}
              language="javascript"
            />

            <p>
              <strong>6. Minimize Bundle Size:</strong> Analyze with
              @next/bundle-analyzer
            </p>
            <p>
              <strong>7. Use CDN for static assets:</strong> Deploy to
              Vercel/Netlify for optimal CDN.
            </p>
          </div>
        </section>

        {/* Q8 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q8: Should I migrate from Pages Router to App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Consider migrating when:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Starting a new project</li>
              <li>You need Server Components benefits</li>
              <li>Want better performance and smaller bundles</li>
              <li>Need nested layouts</li>
              <li>Want built-in loading/error states</li>
            </ul>

            <p>
              <strong>Stay with Pages Router when:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>
                Existing app works well and doesn't need App Router features
              </li>
              <li>Team is unfamiliar with Server Components</li>
              <li>You rely heavily on getServerSideProps patterns</li>
              <li>Migration effort doesn't justify benefits</li>
            </ul>

            <p>
              <strong>Note:</strong> Both routers can coexist in the same
              project, allowing gradual migration.
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a11/lesson-7"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Performance & Optimization
          </Link>
          <Link
            href="/learn/pages-router/a11/lesson-9"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Best Practices & Patterns →
          </Link>
        </div>
      </div>
    </div>
  );
}
