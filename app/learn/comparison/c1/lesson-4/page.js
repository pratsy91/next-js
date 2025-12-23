import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C1.4: next.config.js - Next.js Mastery",
  description:
    "next.config.js has the same options in both App Router and Pages Router",
};

export default function Lesson4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c1"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C1 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C1.4: next.config.js
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Most{" "}
          <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
            next.config.js
          </code>{" "}
          options work the same in both App Router and Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Common Configuration Options
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            These options work the same in both routers.
          </p>

          <CodeBlock
            code={`// next.config.js (works in both routers)
module.exports = {
  // Image optimization
  images: {
    domains: ['example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: 'value',
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old',
        destination: '/new',
        permanent: true,
      },
    ];
  },
  
  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Custom-Header',
            value: 'custom-value',
          },
        ],
      },
    ];
  },
  
  // Output configuration
  output: 'standalone', // or 'export'
  
  // React strict mode
  reactStrictMode: true,
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Router-Specific Options
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Some options are specific to one router.
          </p>

          <CodeBlock
            code={`// Pages Router specific
module.exports = {
  // i18n (Pages Router only)
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  
  // Experimental features (both routers, different features)
  experimental: {
    // App Router specific
    appDir: true, // Only needed for App Router
    
    // Common experimental features
    optimizeCss: true,
    serverActions: true,
  },
};

// App Router specific
module.exports = {
  experimental: {
    // App Router features
    serverActions: true,
    serverComponentsExternalPackages: ['package-name'],
  },
};

// Most configuration is shared!
// Only a few options are router-specific.`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Webpack Configuration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Webpack customization works the same in both routers.
          </p>

          <CodeBlock
            code={`// Webpack config (both routers)
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '.'),
    };
    
    return config;
  },
};

// Same webpack API in both routers
// - config: Webpack configuration object
// - buildId: Unique build identifier
// - dev: Boolean indicating development mode
// - isServer: Boolean indicating server-side build
// - defaultLoaders: Default Next.js loaders
// - webpack: Webpack instance`}
            language="javascript"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c1/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C1.3 next/font
          </Link>
          <Link
            href="/learn/comparison/c1/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C1.5 Middleware →
          </Link>
        </div>
      </div>
    </div>
  );
}
