import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "V16.4: Turbopack as Default Bundler - Next.js Mastery",
  description:
    "Learn about Turbopack becoming the default bundler in Next.js 16",
};

export default function Lesson4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/recent-updates/v16"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Next.js 16 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          V16.4: Turbopack as Default Bundler
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about Turbopack becoming the default bundler with significant
          performance improvements and filesystem caching.
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            What is Turbopack?
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Turbopack is a Rust-based bundler that is now the default for all
            Next.js projects. It offers significant performance improvements
            over Webpack.
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>2-5× faster production builds</li>
            <li>Up to 10× faster Fast Refresh during development</li>
            <li>Filesystem caching for reduced startup times</li>
            <li>Incremental compilation</li>
            <li>Built with Rust for performance</li>
          </ul>
        </section>

        {/* Performance Benefits */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Performance Benefits
          </h2>
          <CodeBlock
            code={`// No configuration needed - Turbopack is now default
// package.json
{
  "scripts": {
    "dev": "next dev",        // Uses Turbopack automatically
    "build": "next build",    // Uses Turbopack for production builds
    "start": "next start"
  }
}

// Performance improvements:
// - Production builds: 2-5× faster than Webpack
// - Fast Refresh: Up to 10× faster
// - Initial compilation: Significantly faster startup
// - Incremental updates: Only recompiles changed files`}
            language="javascript"
          />
        </section>

        {/* Filesystem Caching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Filesystem Caching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Turbopack uses filesystem caching to reuse compiled artifacts
            between sessions, dramatically reducing startup times.
          </p>
          <CodeBlock
            code={`// Turbopack automatically caches to .next/cache/turbo
// No configuration needed - works out of the box

// Benefits:
// - Faster subsequent starts
// - Faster hot reloads
// - Better CI/CD performance
// - Reduced CPU usage

// Cache location:
// .next/cache/turbo/

// To clear cache (if needed):
// rm -rf .next/cache/turbo

// Or use Next.js command:
// next build --no-cache`}
            language="bash"
          />
        </section>

        {/* Migration from Webpack */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Migration from Webpack
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            In Next.js 16, Turbopack is the default. Most projects will work
            without changes. For custom Webpack configurations, you may need to
            adapt.
          </p>
          <CodeBlock
            code={`// Old way (Next.js 15) - Using Webpack
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Custom webpack config
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    };
    return config;
  },
};

// New way (Next.js 16) - Turbopack is default
// Most configurations work automatically
// next.config.js
module.exports = {
  // Turbopack handles most cases automatically
  // For custom configs, use experimental.turbo
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './src',
      },
    },
  },
};

// If you need Webpack (not recommended):
// Use --webpack flag (deprecated)
// next dev --webpack`}
            language="javascript"
          />
        </section>

        {/* Turbopack-Specific Features */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Turbopack-Specific Features
          </h2>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  experimental: {
    turbo: {
      // Resolve aliases
      resolveAlias: {
        '@components': './components',
        '@utils': './utils',
      },
      
      // Loader configuration
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
      
      // Resolve extensions
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
      
      // Environment variables
      env: {
        CUSTOM_KEY: process.env.CUSTOM_KEY,
      },
    },
  },
};`}
            language="javascript"
          />
        </section>

        {/* Fast Refresh */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Fast Refresh Improvements
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Turbopack's Fast Refresh is up to 10× faster than Webpack's HMR.
          </p>
          <CodeBlock
            code={`// Fast Refresh works automatically with Turbopack
// No configuration needed

// Features:
// - Preserves component state on edits
// - Only updates changed components
// - Faster refresh cycles
// - Better error recovery

// Example: Edit a component
// app/components/Button.tsx
export default function Button() {
  return <button>Click me</button>; // Change this text
}

// Fast Refresh:
// 1. Detects change instantly
// 2. Recompiles only Button component
// 3. Updates browser without full page reload
// 4. Preserves any component state
// 5. Updates in milliseconds instead of seconds`}
            language="javascript"
          />
        </section>

        {/* Best Practices */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Best Practices
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>No migration needed:</strong> Turbopack works
              automatically in Next.js 16
            </li>
            <li>
              <strong>Keep cache:</strong> Don't clear Turbopack cache unless
              experiencing issues
            </li>
            <li>
              <strong>Check compatibility:</strong> Most packages work, but
              custom Webpack plugins may need alternatives
            </li>
            <li>
              <strong>Use experimental.turbo:</strong> For custom
              configurations, use the turbo config object
            </li>
            <li>
              <strong>Monitor build times:</strong> Enjoy the performance
              improvements!
            </li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/recent-updates/v16/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Enhanced Caching APIs
          </Link>
          <Link
            href="/learn/recent-updates/v16/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Smart Routing →
          </Link>
        </div>
      </div>
    </div>
  );
}
