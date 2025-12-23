import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A3.4: getInitialProps (Legacy) - Next.js Mastery",
  description: "Complete guide to getInitialProps in Next.js Pages Router",
};

export default function Lesson4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a3"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A3 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A3.4: getInitialProps (Legacy)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about the legacy getInitialProps method and when to use it vs
          avoid it.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Usage in Pages */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Usage in Pages
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getInitialProps
            </code>{" "}
            can be used in page components to fetch data. It runs on both server
            and client.
          </p>

          <CodeBlock
            code={`// pages/about.js
function About({ data }) {
  return <div>{data.title}</div>;
}

About.getInitialProps = async (context) => {
  // Runs on server on initial load
  // Runs on client on client-side navigation
  
  const res = await fetch('https://api.example.com/about');
  const data = await res.json();
  
  return {
    data,
  };
};

export default About;

// Or as a static method
export default function About({ data }) {
  return <div>{data.title}</div>;
}

About.getInitialProps = async (context) => {
  const res = await fetch('https://api.example.com/about');
  const data = await res.json();
  return { data };
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Dynamic Routes
          </h3>
          <CodeBlock
            code={`// pages/posts/[id].js
export default function Post({ post }) {
  return <article>{post.title}</article>;
}

Post.getInitialProps = async (context) => {
  const { id } = context.query;
  
  const res = await fetch(\`https://api.example.com/posts/\${id}\`);
  const post = await res.json();
  
  return {
    post,
  };
};`}
            language="javascript"
          />
        </section>

        {/* Section 2: Usage in _app.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Usage in _app.js
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            When used in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _app.js
            </code>
            , getInitialProps disables automatic static optimization for all
            pages.
          </p>

          <CodeBlock
            code={`// pages/_app.js
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  // appContext.ctx - Same context as page getInitialProps
  // appContext.Component - The active page component
  // appContext.router - The router instance
  
  let pageProps = {};
  
  // Call getInitialProps of the page component if it exists
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  
  // Return pageProps that will be passed to Component
  return {
    pageProps,
  };
};

export default MyApp;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Important Warning
          </h3>
          <div className="rounded-lg bg-yellow-50 border-2 border-yellow-200 p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> Using getInitialProps in{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                _app.js
              </code>{" "}
              disables automatic static optimization for your entire
              application. All pages will be server-rendered, even if they don't
              need it.
            </p>
          </div>
        </section>

        {/* Section 3: Context Object */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Context Object
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The context object provides access to route information,
            request/response objects, and more.
          </p>

          <CodeBlock
            code={`export default function MyPage({ data }) {
  return <div>{data}</div>;
}

MyPage.getInitialProps = async (context) => {
  // Available properties:
  
  // pathname - Current route path
  const pathname = context.pathname; // '/posts/[id]'
  
  // query - Query string and dynamic route params
  const { id, sort } = context.query; // { id: '123', sort: 'date' }
  
  // asPath - Actual path including query
  const asPath = context.asPath; // '/posts/123?sort=date'
  
  // req - HTTP request object (server only)
  const req = context.req; // undefined on client
  
  // res - HTTP response object (server only)
  const res = context.res; // undefined on client
  
  // err - Error object if error occurred
  const err = context.err;
  
  // Check if running on server
  if (context.req) {
    // Server-side code
    const userAgent = context.req.headers['user-agent'];
  } else {
    // Client-side code
  }
  
  const data = await fetchData(context.query.id);
  
  return {
    data,
  };
};`}
            language="javascript"
          />
        </section>

        {/* Section 4: When to Use vs Avoid */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. When to Use vs Avoid
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            getInitialProps is a legacy API. In most cases, you should use
            getServerSideProps or getStaticProps instead.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            ❌ Avoid getInitialProps When:
          </h3>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              You want static generation → Use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                getStaticProps
              </code>
            </li>
            <li>
              You want server-side rendering → Use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                getServerSideProps
              </code>
            </li>
            <li>
              You want automatic static optimization → Use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                getStaticProps
              </code>{" "}
              or no data fetching
            </li>
            <li>
              You want ISR → Use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                getStaticProps
              </code>{" "}
              with revalidate
            </li>
            <li>
              You're building a new app → Use modern data fetching methods
            </li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            ✅ Consider getInitialProps Only When:
          </h3>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Maintaining legacy code that already uses it</li>
            <li>
              You need data fetching that works identically on server and client
            </li>
            <li>You're migrating from an older Next.js version</li>
            <li>
              You have specific requirements that modern methods don't cover
            </li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Migration Guide
          </h3>
          <CodeBlock
            code={`// ❌ Old way (getInitialProps)
export default function Page({ data }) {
  return <div>{data}</div>;
}

Page.getInitialProps = async (context) => {
  const data = await fetchData();
  return { data };
};

// ✅ New way (getServerSideProps)
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

export default function Page({ data }) {
  return <div>{data}</div>;
}

// ✅ Or use getStaticProps for static pages
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}

export default function Page({ data }) {
  return <div>{data}</div>;
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
                    Runs On
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Static Optimization
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      getInitialProps
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Server + Client
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ Disabled
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Legacy
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      getServerSideProps
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Server only
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Enabled
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Recommended
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      getStaticProps
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Build time
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Enabled
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Recommended
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a3/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A3.3 getStaticPaths
          </Link>
          <Link
            href="/learn/pages-router/a3/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A3.5 Client-Side Data Fetching →
          </Link>
        </div>
      </div>
    </div>
  );
}
