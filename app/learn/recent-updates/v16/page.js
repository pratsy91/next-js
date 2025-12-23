import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "V16.1: Cache Components & 'use cache' Directive",
    description:
      "New explicit caching mechanism with the 'use cache' directive for pages, components, and functions",
    topics: [
      "Understanding 'use cache' directive",
      "Caching pages and components",
      "Cache configuration options",
      "Cache boundaries and composition",
      "Integration with Partial Pre-Rendering (PPR)",
      "Best practices for cache components",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "V16.2: Proxy.ts - Middleware Replacement",
    description:
      "New proxy.ts replaces middleware.ts, making network boundaries explicit and running on Node.js runtime",
    topics: [
      "Migration from middleware.ts to proxy.ts",
      "Proxy.ts function signature",
      "Request/response handling",
      "Network boundary concepts",
      "Runtime differences (Node.js vs Edge)",
      "Migration guide and examples",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "V16.3: Enhanced Caching APIs",
    description:
      "Improved caching APIs including updateTag(), revalidateTag() with cacheLife, and refresh()",
    topics: [
      "updateTag() for read-your-writes semantics",
      "revalidateTag() with cacheLife parameter",
      "refresh() for dynamic data updates",
      "Stale-while-revalidate patterns",
      "Cache invalidation strategies",
      "Server Actions integration",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "V16.4: Turbopack as Default Bundler",
    description:
      "Turbopack is now the default bundler with significant performance improvements and filesystem caching",
    topics: [
      "Turbopack performance benefits",
      "Production build improvements (2-5x faster)",
      "Fast Refresh improvements (10x faster)",
      "Filesystem caching configuration",
      "Migration from Webpack",
      "Turbopack-specific features",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "V16.5: Smart Routing & Prefetching Enhancements",
    description:
      "Layout deduplication, incremental prefetching, and smarter route optimization",
    topics: [
      "Layout deduplication concepts",
      "Incremental prefetching",
      "Prefetch optimization strategies",
      "Network load reduction",
      "Navigation performance improvements",
      "Prefetch configuration options",
    ],
    status: "available",
  },
  {
    id: "lesson-6",
    title: "V16.6: React 19.2 Integration & Features",
    description:
      "Next.js 16 compatibility with React 19.2, including View Transitions API, useEffectEvent, and Activity component",
    topics: [
      "View Transitions API for page transitions",
      "useEffectEvent() hook usage",
      "<Activity /> component for background UI",
      "React 19.2 specific features",
      "Migration considerations",
      "Performance improvements",
    ],
    status: "available",
  },
  {
    id: "lesson-7",
    title: "V16.7: Build Adapters API (Alpha)",
    description:
      "New Build Adapters API for custom deployment targets beyond Vercel",
    topics: [
      "Build Adapters API overview",
      "Custom deployment targets",
      "Cloudflare Workers adapter",
      "Deno and Bun adapters",
      "Custom infrastructure deployment",
      "Adapter configuration and setup",
    ],
    status: "available",
  },
  {
    id: "lesson-8",
    title: "V16.8: Breaking Changes & Migration Guide",
    description:
      "Breaking changes, removals, and comprehensive migration guide from Next.js 15 to 16",
    topics: [
      "AMP support removal",
      "Middleware to Proxy.ts migration",
      "API changes and deprecations",
      "Caching behavior changes",
      "Step-by-step migration guide",
      "Common issues and solutions",
    ],
    status: "available",
  },
];

export default function V16Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/recent-updates"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Recent Updates
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Next.js 16 - New Features & Changes
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive guide to all new features, methods, and concepts
          introduced in Next.js 16 that are not covered in the main learning
          paths.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/recent-updates/v16/${lesson.id}`}
            className="block rounded-lg border-2 border-purple-200 bg-white p-6 transition-all hover:border-purple-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-500"
          >
            <h2 className="mb-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">
              {lesson.title}
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {lesson.description}
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Topics Covered:
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {lesson.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
