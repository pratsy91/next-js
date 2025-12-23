import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "V16.8: Breaking Changes & Migration - Next.js Mastery",
  description:
    "Learn about breaking changes and migration guide for Next.js 16",
};

export default function Lesson8Page() {
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
          V16.8: Breaking Changes & Migration Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive guide to breaking changes, removals, and migration from
          Next.js 15 to 16.
        </p>
      </div>

      <div className="space-y-8">
        {/* AMP Support Removed */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. AMP Support Removed
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            AMP (Accelerated Mobile Pages) support has been removed due to its
            deprecation as a web standard.
          </p>
          <CodeBlock
            code={`// ❌ No longer works (Next.js 15)
// next.config.js
module.exports = {
  amp: {
    canonicalBase: 'https://example.com',
  },
};

// ✅ Remove AMP configuration
// next.config.js
module.exports = {
  // Remove amp config
};

// Migration steps:
// 1. Remove all amp: true from pages
// 2. Remove AMP-related configuration
// 3. Use standard Next.js optimizations instead:
//    - Image optimization
//    - Static generation
//    - Performance best practices`}
            language="javascript"
          />
        </section>

        {/* Middleware to Proxy.ts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Middleware Renamed to Proxy.ts
          </h2>
          <CodeBlock
            code={`// ❌ Old (Next.js 15)
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Your logic
  return NextResponse.next();
}

// ✅ New (Next.js 16)
// proxy.ts (rename file)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Your logic (same as before)
  return NextResponse.next();
}

// Migration steps:
// 1. Rename middleware.ts to proxy.ts
// 2. Change function name from middleware to proxy
// 3. Update any imports/references
// 4. Test all protected routes`}
            language="javascript"
          />
        </section>

        {/* Caching API Changes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Caching API Changes
          </h2>
          <CodeBlock
            code={`// ❌ Old (Next.js 15)
import { revalidateTag } from 'next/cache';

revalidateTag('products'); // No cacheLife parameter

// ✅ New (Next.js 16)
import { revalidateTag } from 'next/cache';

revalidateTag('products', { cacheLife: 60 });
// cacheLife is now required

// Migration:
// 1. Update all revalidateTag() calls
// 2. Add cacheLife parameter
// 3. Choose appropriate cacheLife value (seconds)
// 4. Test revalidation behavior`}
            language="javascript"
          />
        </section>

        {/* Turbopack Default */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Turbopack as Default Bundler
          </h2>
          <CodeBlock
            code={`// Webpack is no longer default
// Most projects work without changes

// ❌ If you relied on custom Webpack configs:
module.exports = {
  webpack: (config) => {
    // Complex custom webpack config
    return config;
  },
};

// ✅ Migrate to Turbopack config:
module.exports = {
  experimental: {
    turbo: {
      // Turbopack equivalent
      resolveAlias: { /* ... */ },
      loaders: { /* ... */ },
    },
  },
};

// Migration steps:
// 1. Test your app with Turbopack
// 2. Identify any issues
// 3. Convert Webpack configs to Turbopack
// 4. Remove Webpack dependencies if any`}
            language="javascript"
          />
        </section>

        {/* React 19.2 Upgrade */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. React 19.2 Upgrade
          </h2>
          <CodeBlock
            code={`// Next.js 16 includes React 19.2

// package.json
{
  "dependencies": {
    "react": "^19.2.0",      // Upgraded from 18.x
    "react-dom": "^19.2.0"   // Upgraded from 18.x
  }
}

// Potential breaking changes:
// - Some deprecated APIs removed
// - TypeScript types may change
// - Third-party libraries need React 19 support

// Migration checklist:
// ✅ Update React and React-DOM
// ✅ Check third-party library compatibility
// ✅ Review React 19 migration guide
// ✅ Update TypeScript types
// ✅ Test thoroughly`}
            language="javascript"
          />
        </section>

        {/* Step-by-Step Migration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Step-by-Step Migration Guide
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Step 1: Update Dependencies
              </h3>
              <CodeBlock
                code={`npm install next@latest react@latest react-dom@latest`}
                language="bash"
              />
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Step 2: Rename Middleware
              </h3>
              <CodeBlock
                code={`# Rename file
mv middleware.ts proxy.ts

# Update function name
# Change: export function middleware
# To: export function proxy`}
                language="bash"
              />
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Step 3: Update Caching APIs
              </h3>
              <CodeBlock
                code={`# Find all revalidateTag calls
# Add cacheLife parameter
revalidateTag('tag', { cacheLife: 60 });`}
                language="bash"
              />
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Step 4: Remove AMP
              </h3>
              <CodeBlock
                code={`# Remove all AMP-related code
# Remove amp: true from pages
# Remove AMP config from next.config.js`}
                language="bash"
              />
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Step 5: Test Everything
              </h3>
              <CodeBlock
                code={`npm run build
npm run dev
# Test all routes, features, and functionality`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Common Issues & Solutions
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Issue: revalidateTag() errors
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Solution: Add cacheLife parameter to all revalidateTag() calls.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Issue: Middleware not working
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Solution: Rename middleware.ts to proxy.ts and update function
                name.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Issue: Third-party library incompatibility
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Solution: Check for React 19 compatible versions or wait for
                updates.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Issue: Build errors with Turbopack
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Solution: Convert Webpack configs to Turbopack format or report
                issues.
              </p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Migration Resources
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Next.js 16 Release Notes</li>
            <li>React 19 Migration Guide</li>
            <li>Next.js GitHub Discussions</li>
            <li>Turbopack Documentation</li>
            <li>Next.js Discord Community</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/recent-updates/v16/lesson-7"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Build Adapters API
          </Link>
          <Link
            href="/learn/recent-updates/v16"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Back to Next.js 16 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
