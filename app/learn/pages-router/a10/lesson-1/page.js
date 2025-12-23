import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A10.1: Build Process - Next.js Mastery",
  description: "Complete guide to Next.js build process in Pages Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a10"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A10 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A10.1: Build Process
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about the Next.js build process: build command, output
          structure, static export, standalone output, and build analysis.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: next build command */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. next build Command
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Build your Next.js application for production using the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next build
            </code>{" "}
            command.
          </p>

          <CodeBlock
            code={`// Basic build command
npm run build
# or
next build

// Build process steps:
// 1. Compiles pages and components
// 2. Generates static pages (if using getStaticProps)
// 3. Optimizes images and assets
// 4. Creates production bundles
// 5. Generates build manifest

// Build output shows:
// - Compiled pages
// - Static pages generated
// - Dynamic routes
// - Build size information
// - Route information

// Example build output:
// ✓ Compiled successfully
// ✓ Linting and checking validity of types
// ✓ Collecting page data
// ✓ Generating static pages (5/5)
// ✓ Finalizing page optimization

// Route (app)                              Size     First Load JS
// ┌ ○ /                                    2.5 kB         85.2 kB
// ├ ○ /about                               1.2 kB         85.2 kB
// ├ ● /blog/[slug]                         3.1 kB         85.2 kB
// └ ○ /404                                 194 B          85.2 kB

// Build with environment variables
NODE_ENV=production next build

// Build with custom configuration
next build --debug

// Build analysis
ANALYZE=true next build

// Build for specific target
next build`}
            language="bash"
          />
        </section>

        {/* Section 2: Build Output */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Build Output
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Understand the structure and contents of the build output directory.
          </p>

          <CodeBlock
            code={`// Build output structure (.next directory)
.next/
├── BUILD_ID                    # Build identifier
├── cache/                      # Build cache
├── server/                     # Server-side code
│   ├── chunks/                # Code chunks
│   ├── pages/                  # Page files
│   └── app.js                  # App entry
├── static/                     # Static assets
│   ├── chunks/                 # JavaScript chunks
│   ├── css/                    # CSS files
│   └── media/                  # Media files
├── server.js                   # Server entry (standalone)
└── package.json                # Dependencies (standalone)

// Understanding build output:
// - server/: Server-side code and pages
// - static/: Client-side JavaScript and CSS
// - BUILD_ID: Unique identifier for this build
// - cache/: Cached build artifacts

// Route information in build output:
// ○ (Static): Pre-rendered at build time
// ● (SSG): Static Site Generation
// λ (Server): Server-side rendered
// ◐ (ISR): Incremental Static Regeneration

// Example route types:
// ○ /about                    → Static page
// ● /blog/[slug]              → SSG with dynamic routes
// λ /api/users                → API route
// ◐ /products/[id]            → ISR page

// Build manifest files:
// - .next/BUILD_ID: Current build ID
// - .next/routes-manifest.json: Route information
// - .next/prerender-manifest.json: Pre-rendered pages
// - .next/static/chunks/: JavaScript chunks

// Checking build output
ls -la .next/
cat .next/BUILD_ID

// Build size analysis
// The build output shows:
// - Route size: Size of the route's code
// - First Load JS: Total JavaScript for first load
// - Shared chunks: Code shared across routes`}
            language="text"
          />
        </section>

        {/* Section 3: Static Export */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Static Export (output: 'export')
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Export your Next.js app as static HTML files for static hosting.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  output: 'export',
};

// Build with static export
npm run build

// Output: out/ directory with static files
out/
├── index.html
├── about.html
├── _next/
│   ├── static/
│   └── chunks/
└── ...

// Static export requirements:
// - No API routes (pages/api/)
// - No getServerSideProps
// - No server-side features
// - All pages must be statically generatable

// Using getStaticPaths with static export
// pages/blog/[slug].js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'post-1' } },
      { params: { slug: 'post-2' } },
    ],
    fallback: false, // Must be false for static export
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return {
    props: { post },
  };
}

// Trailing slash configuration
module.exports = {
  output: 'export',
  trailingSlash: true, // Adds trailing slash to URLs
};

// Image optimization with static export
// Requires unoptimized: true
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

// Base path for static export
module.exports = {
  output: 'export',
  basePath: '/my-app', // For deployment to subdirectory
};

// Asset prefix
module.exports = {
  output: 'export',
  assetPrefix: '/assets', // Prefix for static assets
};

// Building static export
npm run build
# Creates out/ directory with static files

// Deploying static export
# Copy out/ directory to any static host:
# - GitHub Pages
# - Netlify
# - AWS S3
# - Any static file server`}
            language="javascript"
          />
        </section>

        {/* Section 4: Standalone Output */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Standalone Output
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Generate a standalone build with minimal dependencies for
            self-hosting.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  output: 'standalone',
};

// Build with standalone output
npm run build

// Output: .next/standalone/ directory
.next/standalone/
├── server.js              # Server entry point
├── package.json           # Minimal dependencies
├── node_modules/           # Only required dependencies
└── .next/                  # Build output

// Standalone output benefits:
// - Minimal dependencies
// - Smaller Docker images
// - Faster deployments
// - Self-contained application

// Running standalone build
cd .next/standalone
npm install --production
node server.js

// Or with PM2
pm2 start server.js

// Dockerfile for standalone
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

// Standalone with custom server
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(\`> Ready on http://\${hostname}:\${port}\`);
  });
});

// Standalone output includes:
// - All necessary dependencies
// - Optimized server code
// - Static assets
// - Runtime configuration`}
            language="javascript"
          />
        </section>

        {/* Section 5: Build Analysis */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Build Analysis
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Analyze your build to identify optimization opportunities and bundle
            size issues.
          </p>

          <CodeBlock
            code={`// Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});

// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}

// Run analysis
npm run analyze

// Build output analysis:
// - Route sizes
// - First Load JS sizes
// - Shared chunk sizes
// - Duplicate dependencies

// Understanding build output:
// Route (app)                              Size     First Load JS
// ┌ ○ /                                    2.5 kB         85.2 kB
// ├ ○ /about                               1.2 kB         85.2 kB
// ├ ● /blog/[slug]                         3.1 kB         85.2 kB
// └ ○ /404                                 194 B          85.2 kB

// Size: Route-specific code size
// First Load JS: Total JavaScript for initial page load
// Shared chunks: Code shared across multiple routes

// Performance budgets
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
  // Set performance budgets
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

// Build size warnings
// Next.js warns if:
// - Route size > 200 KB
// - First Load JS > 250 KB
// - Shared chunks > 500 KB

// Analyzing specific routes
// Check .next/static/chunks/ for:
// - Individual chunk sizes
// - Code splitting effectiveness
// - Duplicate code

// Build time analysis
// Measure build time:
time npm run build

// Optimize build time:
// - Use incremental builds
// - Cache node_modules
// - Use build cache
// - Parallel builds

// Build cache
// .next/cache/ contains:
// - Compiled pages
// - Optimized images
// - Generated static pages

// Clearing build cache
rm -rf .next/cache

// Build optimization tips:
// 1. Use dynamic imports for large components
// 2. Optimize images before build
// 3. Remove unused dependencies
// 4. Use code splitting effectively
// 5. Monitor bundle sizes regularly`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a10"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to A10 Lessons
          </Link>
          <Link
            href="/learn/pages-router/a10/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A10.2 Deployment Platforms →
          </Link>
        </div>
      </div>
    </div>
  );
}
