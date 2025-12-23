import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A8.4: Redirects & Rewrites - Next.js Mastery",
  description:
    "Complete guide to redirects and rewrites in Next.js Pages Router",
};

export default function Lesson4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a8"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A8 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A8.4: Redirects & Rewrites
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to configure URL redirects and rewrites in Next.js Pages
          Router using next.config.js.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: next.config.js Redirects */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. next.config.js Redirects
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure permanent and temporary redirects in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next.config.js
            </code>
            .
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 308 redirect
      },
      {
        source: '/temporary',
        destination: '/new-location',
        permanent: false, // 307 redirect
      },
    ];
  },
};

// Multiple redirects
module.exports = {
  async redirects() {
    return [
      {
        source: '/old',
        destination: '/new',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/user/:id',
        destination: '/users/:id',
        permanent: true,
      },
    ];
  },
};

// Path matching
module.exports = {
  async redirects() {
    return [
      // Exact match
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      // Wildcard match
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      // Catch-all
      {
        source: '/docs/:path*',
        destination: '/documentation/:path*',
        permanent: true,
      },
    ];
  },
};`}
            language="javascript"
          />
        </section>

        {/* Section 2: next.config.js Rewrites */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. next.config.js Rewrites
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure URL rewrites to proxy requests internally without changing
            the browser URL.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.example.com/:path*',
      },
      {
        source: '/old-path',
        destination: '/new-path',
      },
    ];
  },
};

// Rewrite to external API
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: 'https://external-api.com/api/:path*',
      },
    ];
  },
};

// Rewrite with path parameters
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
      },
      {
        source: '/user/:id/profile',
        destination: '/users/:id',
      },
    ];
  },
};

// Multiple rewrites
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: '/api/v2/:path*',
      },
      {
        source: '/old/:path*',
        destination: '/new/:path*',
      },
    ];
  },
};`}
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

          <CodeBlock
            code={`// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old',
        destination: '/new',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'x-custom-header',
            value: 'custom-value',
          },
        ],
      },
      {
        source: '/admin',
        destination: '/login',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'auth-token',
          },
        ],
        missing: [
          {
            type: 'cookie',
            key: 'auth-token',
          },
        ],
      },
      {
        source: '/mobile/:path*',
        destination: '/m/:path*',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'user-agent',
            value: '.*Mobile.*',
          },
        ],
      },
    ];
  },
};

// Multiple conditions
module.exports = {
  async redirects() {
    return [
      {
        source: '/premium/:path*',
        destination: '/upgrade',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'subscription',
            value: 'free',
          },
        ],
      },
    ];
  },
};

// Query parameter conditions
module.exports = {
  async redirects() {
    return [
      {
        source: '/search',
        destination: '/search/new',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'legacy',
            value: 'true',
          },
        ],
      },
    ];
  },
};`}
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

          <CodeBlock
            code={`// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/external',
        destination: 'https://example.com',
        permanent: true,
      },
      {
        source: '/docs',
        destination: 'https://docs.example.com',
        permanent: false,
      },
      {
        source: '/old-site/:path*',
        destination: 'https://old.example.com/:path*',
        permanent: true,
      },
    ];
  },
};

// External redirect with path preservation
module.exports = {
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: 'https://blog.example.com/:slug',
        permanent: true,
      },
    ];
  },
};

// Conditional external redirect
module.exports = {
  async redirects() {
    return [
      {
        source: '/partner/:id',
        destination: 'https://partner.example.com/:id',
        permanent: false,
        has: [
          {
            type: 'header',
            key: 'referer',
            value: '.*partner-site.*',
          },
        ],
      },
    ];
  },
};

// Important: External redirects change the URL in the browser
// Unlike rewrites, which keep the original URL`}
            language="javascript"
          />
        </section>

        {/* Section 5: Internal Rewrites */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Internal Rewrites
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Rewrite URLs internally without changing the browser URL.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/about-us',
      },
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
      },
    ];
  },
};

// Rewrite to API route
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/user',
        destination: '/api/users/current',
      },
    ];
  },
};

// Rewrite with query parameters
module.exports = {
  async rewrites() {
    return [
      {
        source: '/search',
        destination: '/search-results',
      },
    ];
  },
};

// Multiple path segments
module.exports = {
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/dashboard/:path*',
      },
      {
        source: '/old/:category/:slug',
        destination: '/new/:category/:slug',
      },
    ];
  },
};

// Rewrite to external API (proxy)
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};

// Using rewrites for API versioning
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: '/api/v2/:path*',
      },
    ];
  },
};

// Important: Rewrites don't change the URL in the browser
// The user sees /old-path but Next.js serves /new-path internally`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a8/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A8.3 Preview Mode
          </Link>
          <Link
            href="/learn/pages-router/a8/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A8.5 Environment Variables →
          </Link>
        </div>
      </div>
    </div>
  );
}
