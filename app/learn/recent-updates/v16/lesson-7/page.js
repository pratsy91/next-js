import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "V16.7: Build Adapters API - Next.js Mastery",
  description: "Learn about Build Adapters API in Next.js 16",
};

export default function Lesson7Page() {
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
          V16.7: Build Adapters API (Alpha)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about the new Build Adapters API for custom deployment targets
          beyond Vercel.
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            What are Build Adapters?
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Build Adapters API (Alpha) allows customization of deployment
            targets beyond Vercel, enabling Next.js applications to run on
            platforms like Cloudflare Workers, Deno, Bun, or custom
            infrastructure.
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Custom deployment targets</li>
            <li>Platform-specific optimizations</li>
            <li>Flexible infrastructure choices</li>
            <li>Currently in Alpha - API may change</li>
          </ul>
        </section>

        {/* Basic Usage */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Basic Adapter Setup
          </h2>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable adapters
    adapters: true,
  },
};

module.exports = nextConfig;

// Install adapter package
// npm install @next/adapter-cloudflare
// or
// npm install @next/adapter-deno
// or
// npm install @next/adapter-bun`}
            language="javascript"
          />
        </section>

        {/* Cloudflare Workers Adapter */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Cloudflare Workers Adapter
          </h2>
          <CodeBlock
            code={`// Install
// npm install @next/adapter-cloudflare

// next.config.js
const nextConfig = {
  experimental: {
    adapters: ['@next/adapter-cloudflare'],
  },
};

// Deploy to Cloudflare Workers
// wrangler pages deploy .next

// Benefits:
// - Edge computing
// - Global distribution
// - Low latency
// - Serverless execution`}
            language="javascript"
          />
        </section>

        {/* Deno Adapter */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Deno Adapter
          </h2>
          <CodeBlock
            code={`// Install
// npm install @next/adapter-deno

// next.config.js
const nextConfig = {
  experimental: {
    adapters: ['@next/adapter-deno'],
  },
};

// Deploy to Deno Deploy
// deno deploy

// Benefits:
// - Deno runtime features
// - Built-in TypeScript support
// - Modern JavaScript features
// - Secure by default`}
            language="javascript"
          />
        </section>

        {/* Bun Adapter */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Bun Adapter
          </h2>
          <CodeBlock
            code={`// Install
// npm install @next/adapter-bun

// next.config.js
const nextConfig = {
  experimental: {
    adapters: ['@next/adapter-bun'],
  },
};

// Deploy to Bun runtime
// bun run build
// bun start

// Benefits:
// - Fast JavaScript runtime
// - Native bundler
// - Built-in test runner
// - Fast package manager`}
            language="javascript"
          />
        </section>

        {/* Custom Infrastructure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Custom Infrastructure Deployment
          </h2>
          <CodeBlock
            code={`// Create custom adapter
// adapters/custom.js
export default function customAdapter(config) {
  return {
    name: 'custom-adapter',
    async build() {
      // Custom build logic
      console.log('Building for custom platform...');
    },
    async deploy() {
      // Custom deployment logic
      console.log('Deploying to custom platform...');
    },
  };
}

// next.config.js
const customAdapter = require('./adapters/custom');

const nextConfig = {
  experimental: {
    adapters: [customAdapter],
  },
};

// Use cases:
// - Kubernetes deployments
// - Docker containers
// - Self-hosted infrastructure
// - Hybrid cloud setups`}
            language="javascript"
          />
        </section>

        {/* Important Notes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Important Notes (Alpha)
          </h2>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
            <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Alpha feature:</strong> API may change in future
                versions
              </li>
              <li>
                <strong>Not production-ready:</strong> Use with caution in
                production
              </li>
              <li>
                <strong>Limited documentation:</strong> May require
                experimentation
              </li>
              <li>
                <strong>Platform limitations:</strong> Some Next.js features may
                not work on all platforms
              </li>
              <li>
                <strong>Community support:</strong> Limited compared to Vercel
                deployment
              </li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/recent-updates/v16/lesson-6"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: React 19.2 Integration
          </Link>
          <Link
            href="/learn/recent-updates/v16/lesson-8"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Breaking Changes →
          </Link>
        </div>
      </div>
    </div>
  );
}
