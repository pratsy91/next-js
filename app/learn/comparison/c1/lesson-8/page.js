import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C1.8: Deployment - Next.js Mastery",
  description:
    "Deployment process is the same for both App Router and Pages Router",
};

export default function Lesson8Page() {
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
          C1.8: Deployment
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The deployment process is the same for both App Router and Pages
          Router.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Same Build Process
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Both routers use the same build command and process.
          </p>

          <CodeBlock
            code={`// Build command (both routers)
npm run build
# or
next build

// Build output (both routers)
# Creates .next/ directory with:
# - Optimized pages
# - Static assets
# - Server code
# - Build manifest

// Start production server (both routers)
npm start
# or
next start

// ✅ Same commands
// ✅ Same build output structure
// ✅ Same production server`}
            language="bash"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Same Deployment Platforms
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            All deployment platforms support both routers.
          </p>

          <CodeBlock
            code={`// Vercel (both routers)
# Automatic detection
# Deploys both App Router and Pages Router

// Docker (both routers)
# Same Dockerfile works for both
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]

// Self-hosting (both routers)
# Same process:
# 1. Build: npm run build
# 2. Start: npm start
# 3. Configure reverse proxy (Nginx, etc.)

// Static export (both routers)
# next.config.js
module.exports = {
  output: 'export',
};

# Same static export process

// ✅ Same platforms
// ✅ Same deployment steps
// ✅ Same configuration`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Platform-Specific Notes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Minor differences on some platforms.
          </p>

          <CodeBlock
            code={`// Vercel
# Automatically detects router type
# No configuration needed for either

// Netlify
# Both routers work the same
# netlify.toml (same for both)
[build]
  command = "npm run build"
  publish = ".next"

// AWS Amplify
# Both routers supported
# Same build settings

// Railway
# Both routers work
# Same deployment process

// Cloudflare Pages
# Both routers supported
# Same configuration

// The deployment process is identical!
// Only minor platform-specific optimizations may differ.`}
            language="text"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c1/lesson-7"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C1.7 Styling
          </Link>
          <Link
            href="/learn/comparison/c1/lesson-9"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C1.9 Optimization →
          </Link>
        </div>
      </div>
    </div>
  );
}
