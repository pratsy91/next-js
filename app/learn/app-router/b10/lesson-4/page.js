import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B10.4: Redirects & Rewrites - Next.js Mastery",
  description: "Complete guide to redirects and rewrites in Next.js App Router",
};

export default function Lesson4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b10"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B10 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B10.4: Redirects & Rewrites
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to configure redirects and rewrites in Next.js App Router:
          next.config.js redirects, rewrites, conditional redirects, external
          redirects, and internal rewrites.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: next.config.js redirects */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. next.config.js Redirects
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure permanent and temporary redirects in{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              next.config.js
            </code>
            .
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Redirects
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 308 permanent redirect
      },
      {
        source: '/temporary',
        destination: '/temp',
        permanent: false, // 307 temporary redirect
      },
    ];
  },
};

module.exports = nextConfig;

// Redirect with status code
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/old',
        destination: '/new',
        permanent: true, // 308
      },
      {
        source: '/temp',
        destination: '/temporary',
        permanent: false, // 307
      },
    ];
  },
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Redirects
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect with path parameters
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      // Redirect with multiple parameters
      {
        source: '/category/:category/product/:id',
        destination: '/products/:id',
        permanent: true,
      },
      // Redirect with query parameters
      {
        source: '/search',
        destination: '/search-results',
        permanent: true,
        has: [
          {
            type: 'query',
            key: 'q',
            value: 'nextjs',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`}
            language="javascript"
          />
        </section>

        {/* Section 2: next.config.js rewrites */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. next.config.js Rewrites
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure URL rewrites to map one URL to another without changing
            the browser URL.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Rewrites
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
      },
      {
        source: '/api/legacy',
        destination: '/api/v2',
      },
    ];
  },
};

module.exports = nextConfig;

// Rewrite with path parameters
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
      },
      {
        source: '/user/:id',
        destination: '/users/:id',
      },
    ];
  },
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Rewrites
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Rewrite to external URL
      {
        source: '/external-api/:path*',
        destination: 'https://api.example.com/:path*',
      },
      // Rewrite with query parameters
      {
        source: '/search',
        destination: '/search-results',
      },
      // Rewrite with conditions
      {
        source: '/api/:path*',
        destination: '/api/v2/:path*',
        has: [
          {
            type: 'header',
            key: 'x-api-version',
            value: 'v2',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`}
            language="javascript"
          />
        </section>

        {/* Section 3: Conditional Redirects */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Conditional Redirects
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create redirects based on conditions like headers, cookies, or query
            parameters.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Redirects with Conditions
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect based on header
      {
        source: '/old',
        destination: '/new',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'x-redirect',
            value: 'true',
          },
        ],
      },
      // Redirect based on cookie
      {
        source: '/dashboard',
        destination: '/login',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'session',
          },
        ],
      },
      // Redirect based on query parameter
      {
        source: '/search',
        destination: '/search-results',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'q',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complex Conditional Redirects
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Multiple conditions (AND)
      {
        source: '/admin',
        destination: '/unauthorized',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'role',
            value: 'user', // Must be 'user'
          },
        ],
        missing: [
          {
            type: 'header',
            key: 'x-admin-access',
          },
        ],
      },
      // Redirect based on host
      {
        source: '/:path*',
        destination: 'https://newdomain.com/:path*',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'olddomain.com',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`}
            language="javascript"
          />
        </section>

        {/* Section 4: External Redirects */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. External Redirects
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Redirect to external URLs outside your Next.js application.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic External Redirects
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect to external URL
      {
        source: '/external',
        destination: 'https://example.com',
        permanent: true,
      },
      // Redirect with path
      {
        source: '/docs',
        destination: 'https://docs.example.com',
        permanent: true,
      },
      // Redirect with dynamic path
      {
        source: '/blog/:slug',
        destination: 'https://blog.example.com/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            External Redirects with Conditions
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect based on locale
      {
        source: '/:locale/old',
        destination: 'https://example.com/:locale/new',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'accept-language',
          },
        ],
      },
      // Redirect to different domains
      {
        source: '/legacy/:path*',
        destination: 'https://legacy.example.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;`}
            language="javascript"
          />
        </section>

        {/* Section 5: Internal Rewrites */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Internal Rewrites
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Rewrite URLs to internal routes without changing the browser URL.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Internal Rewrites
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Simple rewrite
      {
        source: '/old-path',
        destination: '/new-path',
      },
      // Rewrite with parameters
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
      },
      // Rewrite API routes
      {
        source: '/api/legacy/:path*',
        destination: '/api/v2/:path*',
      },
    ];
  },
};

module.exports = nextConfig;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Internal Rewrites
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Rewrite with query parameters
      {
        source: '/search',
        destination: '/search-results',
      },
      // Rewrite based on conditions
      {
        source: '/api/:path*',
        destination: '/api/v2/:path*',
        has: [
          {
            type: 'header',
            key: 'x-api-version',
            value: 'v2',
          },
        ],
      },
      // Rewrite to different locale
      {
        source: '/:locale/old',
        destination: '/:locale/new',
      },
      // Rewrite catch-all
      {
        source: '/docs/:path*',
        destination: '/documentation/:path*',
      },
    ];
  },
};

module.exports = nextConfig;`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b10/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B10.3 Internationalization
          </Link>
          <Link
            href="/learn/app-router/b10/lesson-5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B10.5 Environment Variables →
          </Link>
        </div>
      </div>
    </div>
  );
}
