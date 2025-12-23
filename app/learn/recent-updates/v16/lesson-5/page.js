import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "V16.5: Smart Routing & Prefetching - Next.js Mastery",
  description: "Learn about routing and prefetching enhancements in Next.js 16",
};

export default function Lesson5Page() {
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
          V16.5: Smart Routing & Prefetching Enhancements
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about layout deduplication, incremental prefetching, and smarter
          route optimization.
        </p>
      </div>

      <div className="space-y-8">
        {/* Layout Deduplication */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Layout Deduplication
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Shared layouts are now downloaded once, even when multiple links
            share the same layout, reducing network load.
          </p>
          <CodeBlock
            code={`// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar /> {/* Shared layout component */}
      <main>{children}</main>
    </div>
  );
}

// app/dashboard/page.js
export default function DashboardPage() {
  return <div>Dashboard</div>;
}

// app/dashboard/settings/page.js
export default function SettingsPage() {
  return <div>Settings</div>;
}

// Before (Next.js 15):
// - Navigating from /dashboard to /dashboard/settings
// - Layout code downloaded again (duplicate)
// - Extra network request

// After (Next.js 16):
// - Layout code downloaded once
// - Shared layout reused across navigation
// - Reduced network load
// - Faster navigation`}
            language="javascript"
          />
        </section>

        {/* Incremental Prefetching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Incremental Prefetching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Prefetching now downloads only necessary parts of a page,
            prioritizing navigation speed and reducing unnecessary data
            transfer.
          </p>
          <CodeBlock
            code={`// app/products/page.js
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <Link href="/products/123">Product 123</Link>
      {/* Prefetches only what's needed:
          - Product page component
          - Layout if not already cached
          - Not the entire page bundle */}
    </div>
  );
}

// How it works:
// 1. User hovers over link
// 2. Next.js analyzes what's needed
// 3. Downloads only necessary chunks
// 4. Avoids redundant downloads
// 5. Faster navigation when clicked`}
            language="javascript"
          />
        </section>

        {/* Prefetch Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Prefetch Configuration Options
          </h2>
          <CodeBlock
            code={`import Link from 'next/link';

// Automatic prefetching (default)
<Link href="/about">About</Link>
// Prefetches on hover/viewport

// Disable prefetching
<Link href="/about" prefetch={false}>
  About
</Link>
// No prefetching

// Force prefetching
<Link href="/about" prefetch={true}>
  About
</Link>
// Always prefetches

// Smart prefetching (Next.js 16 default)
// - Prefetches based on viewport visibility
// - Prefetches on hover
// - Only downloads necessary chunks
// - Reuses shared components`}
            language="javascript"
          />
        </section>

        {/* Network Load Reduction */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Network Load Reduction
          </h2>
          <CodeBlock
            code={`// Example: Navigation flow
// 1. User visits /dashboard
//    - Downloads: dashboard layout + page
// 
// 2. User navigates to /dashboard/settings
//    - Before: Downloads entire settings page bundle
//    - After: Only downloads settings page (layout reused)
//    - Savings: ~30-50% less data transfer
//
// 3. User navigates to /dashboard/profile
//    - Reuses dashboard layout (already cached)
//    - Only downloads profile page
//    - Even faster navigation

// Benefits:
// - Faster page transitions
// - Lower bandwidth usage
// - Better mobile experience
// - Improved Core Web Vitals`}
            language="javascript"
          />
        </section>

        {/* Route Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Route Optimization Strategies
          </h2>
          <CodeBlock
            code={`// Best practices for optimal routing

// 1. Share layouts when possible
// app/(main)/layout.js - Shared layout
export default function MainLayout({ children }) {
  return (
    <div>
      <Header /> {/* Shared */}
      {children}
      <Footer /> {/* Shared */}
    </div>
  );
}

// 2. Use route groups for organization
// app/(marketing)/about/page.js
// app/(marketing)/contact/page.js
// Same layout, better organization

// 3. Enable prefetching for important routes
<Link href="/checkout" prefetch={true}>
  Checkout
</Link>

// 4. Disable prefetching for low-priority routes
<Link href="/legal" prefetch={false}>
  Legal
</Link>

// 5. Use dynamic imports for large components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
});`}
            language="javascript"
          />
        </section>

        {/* Performance Impact */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Performance Impact
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Improvement
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Layout Downloads
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    -50% (deduplicated)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Prefetch Size
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    -30% (incremental)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Navigation Speed
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    +40% faster
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Bandwidth Usage
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    -35% reduction
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/recent-updates/v16/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Turbopack Default
          </Link>
          <Link
            href="/learn/recent-updates/v16/lesson-6"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: React 19.2 Integration →
          </Link>
        </div>
      </div>
    </div>
  );
}
