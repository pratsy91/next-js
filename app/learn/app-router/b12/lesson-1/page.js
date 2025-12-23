import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B12.1: Build Process - Next.js Mastery",
  description: "Complete guide to build process in Next.js App Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b12"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B12 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B12.1: Build Process
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to build Next.js App Router applications: next build
          command, build output, static export, standalone output, and build
          analysis.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: next build command */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. `next build` Command
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Build your Next.js application for production deployment.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Build Command
          </h3>
          <CodeBlock
            code={`// Build for production
npm run build

// Or directly
npx next build

// What happens during build:
// 1. Compiles TypeScript/JavaScript
// 2. Optimizes images
// 3. Generates static pages
// 4. Creates bundles
// 5. Analyzes and optimizes

// Build output location:
// .next/ directory

// Build options:
npm run build
  --debug          # Enable debug mode
  --no-lint        # Skip linting
  --experimental-build-mode=compile  # Experimental build mode

// Environment-specific builds:
NODE_ENV=production npm run build
NODE_ENV=development npm run build

// Build with custom config:
next build --experimental-build-mode=compile`}
            language="bash"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Build Process Steps
          </h3>
          <CodeBlock
            code={`// Build process stages:
// 1. Compilation
//    - TypeScript → JavaScript
//    - JSX → React elements
//    - CSS processing

// 2. Optimization
//    - Minification
//    - Tree shaking
//    - Code splitting
//    - Image optimization

// 3. Static Generation
//    - Pre-render static pages
//    - Generate HTML
//    - Create static assets

// 4. Bundle Analysis
//    - Analyze bundle sizes
//    - Identify large dependencies
//    - Generate reports

// Build output example:
// ✓ Compiled successfully
// ✓ Linting and checking validity of types
// ✓ Collecting page data
// ✓ Generating static pages (5/5)
// ✓ Collecting build traces
// ✓ Finalizing page optimization

// Route (app)                              Size     First Load JS
// ┌ ○ /                                    2.89 kB        87.2 kB
// ├ ○ /about                               1.35 kB        87.2 kB
// ├ ○ /blog                                5.42 kB        91.3 kB
// └ ○ /dashboard                           12.1 kB        97.9 kB

// ○  (Static)  prerendered as static content
// ●  (SSG)     prerendered as static content (uses getStaticProps)
// λ  (Dynamic) server-rendered on demand`}
            language="javascript"
          />
        </section>

        {/* Section 2: Build Output */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Build Output
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Understand the structure and contents of the build output.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Build Output Structure
          </h3>
          <CodeBlock
            code={`// .next/ directory structure:
.next/
├── cache/              # Build cache
├── static/             # Static assets
│   ├── chunks/         # JavaScript chunks
│   ├── media/          # Optimized images
│   └── ...
├── server/             # Server-side code
│   ├── app/            # App Router pages
│   ├── chunks/         # Server chunks
│   ├── middleware.js   # Middleware
│   └── ...
├── static-paths/       # Static paths
├── BUILD_ID            # Build identifier
├── package.json        # Package info
└── required-server-files.json  # Server requirements

// Static assets:
// .next/static/chunks/
//   - Main app bundle
//   - Route-specific bundles
//   - Shared chunks
//   - Framework chunks

// Server files:
// .next/server/
//   - Rendered pages
//   - API routes
//   - Server components
//   - Middleware

// Build artifacts:
// - Static HTML files
// - Pre-rendered pages
// - Optimized images
// - JavaScript bundles
// - CSS files
// - Source maps (if enabled)`}
            language="text"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Build Output Analysis
          </h3>
          <CodeBlock
            code={`// Build output shows:
// - Route sizes
// - First Load JS
// - Bundle composition
// - Optimization status

// Example output:
// Route (app)                              Size     First Load JS
// ┌ ○ /                                    2.89 kB        87.2 kB
// ├ ○ /about                               1.35 kB        87.2 kB
// ├ ○ /blog                                5.42 kB        91.3 kB
// ├ ○ /blog/[slug]                         8.15 kB        94.1 kB
// └ ○ /dashboard                           12.1 kB        97.9 kB

// First Load JS shared by all:
//   chunks/framework-abc123.js             45.2 kB
//   chunks/main-xyz789.js                  42.0 kB

// Analyze bundle size:
// - Identify large routes
// - Find optimization opportunities
// - Track bundle growth
// - Monitor performance

// Check build size:
ls -lh .next/static/chunks/
ls -lh .next/server/

// Build optimization tips:
// - Use dynamic imports for large components
// - Code split by route
// - Optimize images
// - Remove unused dependencies
// - Use tree shaking`}
            language="javascript"
          />
        </section>

        {/* Section 3: Static Export */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Static Export
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Export your Next.js app as static HTML for deployment to static
            hosting.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Static Export
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Optional: custom output directory
  distDir: 'out',
};

module.exports = nextConfig;

// Build for static export
npm run build

// Output location:
// out/ directory (or distDir)

// Static export generates:
// - Static HTML files
// - JavaScript bundles
// - CSS files
// - Optimized images
// - All static assets

// Limitations:
// - No API routes
// - No Server Components (pre-rendered only)
// - No Server Actions
// - No Dynamic Routes (must use generateStaticParams)
// - No Image Optimization API
// - No Middleware

// Use static export for:
// - Static sites
// - Documentation sites
// - Marketing pages
// - JAMstack applications

// Not suitable for:
// - Dynamic content
// - User authentication
// - Real-time features
// - Server-side features`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Static Export Configuration
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // Custom output directory
  distDir: 'out',
  
  // Image optimization (use external service)
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Trailing slash
  trailingSlash: true,
  
  // Base path
  basePath: '/my-app',
  
  // Asset prefix
  assetPrefix: '/my-app',
};

module.exports = nextConfig;

// Generate static paths
// app/blog/[slug]/page.js
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}

// Build:
npm run build

// Deploy out/ directory to:
// - Netlify
// - GitHub Pages
// - AWS S3
// - Cloudflare Pages
// - Any static host`}
            language="javascript"
          />
        </section>

        {/* Section 4: Standalone Output */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Standalone Output
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create a standalone build for self-hosting with minimal
            dependencies.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Standalone Build Configuration
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};

module.exports = nextConfig;

// Build standalone
npm run build

// Output location:
// .next/standalone/

// Standalone structure:
.next/standalone/
├── server.js           # Entry point
├── package.json        # Minimal dependencies
├── node_modules/       # Only required modules
├── .next/              # Built application
│   ├── static/         # Static assets
│   └── server/         # Server files
└── public/             # Public assets (if not copied)

// Benefits:
// - Minimal dependencies
// - Smaller Docker images
// - Faster deployments
// - Better performance

// Usage:
node .next/standalone/server.js

// Or with PM2:
pm2 start .next/standalone/server.js

// Dockerfile example:
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
CMD ["node", "server.js"]`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Standalone with Docker
          </h3>
          <CodeBlock
            code={`// Dockerfile with standalone output
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set output to standalone
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

// Build Docker image:
docker build -t my-nextjs-app .

// Run container:
docker run -p 3000:3000 my-nextjs-app`}
            language="dockerfile"
          />
        </section>

        {/* Section 5: Build Analysis */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Build Analysis
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Analyze your build to identify optimization opportunities and track
            bundle sizes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Built-in Build Analysis
          </h3>
          <CodeBlock
            code={`// Next.js provides build analysis in console output
npm run build

// Output shows:
// - Route sizes
// - First Load JS
// - Bundle breakdown

// Example:
// Route (app)                              Size     First Load JS
// ┌ ○ /                                    2.89 kB        87.2 kB
// ├ ○ /about                               1.35 kB        87.2 kB
// └ ○ /blog/[slug]                         8.15 kB        94.1 kB

// Analyze bundle composition:
// - Identify large dependencies
// - Find duplicate code
// - Track bundle growth
// - Optimize imports

// Check build size:
du -sh .next/
du -sh .next/static/
du -sh .next/server/

// Compare builds:
// Track bundle sizes over time
// Set performance budgets
// Monitor bundle growth`}
            language="bash"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Bundle Analyzer
          </h3>
          <CodeBlock
            code={`// Install bundle analyzer
npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your config
};

module.exports = withBundleAnalyzer(nextConfig);

// package.json
{
  "scripts": {
    "build": "next build",
    "analyze": "ANALYZE=true next build"
  }
}

// Run analysis:
npm run analyze

// Opens interactive visualization:
// - Bundle sizes
// - Module dependencies
// - Duplicate code
// - Optimization opportunities

// Use results to:
// - Identify large dependencies
// - Find unused code
// - Optimize imports
// - Split large bundles
// - Remove duplicates

// Performance budgets:
// next.config.js
module.exports = {
  experimental: {
    // Set bundle size limits
    // Warn if bundle exceeds limit
  },
};`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b11/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B11.3 SEO
          </Link>
          <Link
            href="/learn/app-router/b12/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B12.2 Deployment Platforms →
          </Link>
        </div>
      </div>
    </div>
  );
}
