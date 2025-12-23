import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B13.1: Core Concepts Quick Reference",
    description:
      "Essential Next.js App Router concepts, architecture, and key differences from Pages Router",
    topics: [
      "Server vs Client Components",
      "React Server Components (RSC)",
      "Component Tree & Composition",
      "File-based Routing System",
      "Layouts & Nested Layouts",
      "Special Files (loading, error, not-found)",
      "Streaming & Suspense",
      "Server Actions & Progressive Enhancement",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B13.2: Data Fetching & Caching Cheatsheet",
    description:
      "Complete reference for data fetching patterns, caching strategies, and revalidation",
    topics: [
      "Server Components Data Fetching",
      "fetch API & Cache Options",
      "Static vs Dynamic Rendering",
      "Incremental Static Regeneration (ISR)",
      "On-Demand Revalidation",
      "Cache Tags & Cache Keys",
      "Time-based Revalidation",
      "Data Fetching Patterns & Best Practices",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B13.3: Routing & Navigation Patterns",
    description:
      "Complete routing reference, dynamic routes, route groups, parallel routes, and intercepting routes",
    topics: [
      "Static & Dynamic Routes",
      "Route Groups & Organizing Routes",
      "Dynamic Segments & Catch-all Routes",
      "Parallel Routes & Slots",
      "Intercepting Routes & Modals",
      "Navigation Hooks (useRouter, usePathname, useSearchParams)",
      "Link Component & Prefetching",
      "Middleware & Route Protection",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "B13.4: Server Actions & Forms",
    description:
      "Server Actions reference, form handling, mutations, error handling, and progressive enhancement",
    topics: [
      "Server Actions Basics",
      "Form Actions & useFormState",
      "useFormStatus Hook",
      "Optimistic Updates",
      "Revalidation Patterns",
      "Error Handling & Validation",
      "Progressive Enhancement",
      "File Uploads & Mutations",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "B13.5: API Routes & Route Handlers",
    description:
      "Route handlers, HTTP methods, request/response handling, and API patterns",
    topics: [
      "Route Handler Basics",
      "HTTP Methods (GET, POST, PUT, DELETE, PATCH)",
      "Request & Response APIs",
      "Headers, Cookies, & Query Params",
      "Streaming Responses",
      "Route Segment Config",
      "API Error Handling",
      "Authentication & Authorization",
    ],
    status: "available",
  },
  {
    id: "lesson-6",
    title: "B13.6: Metadata & SEO",
    description:
      "Static and dynamic metadata, SEO optimization, Open Graph, and social media tags",
    topics: [
      "Metadata API Basics",
      "Static Metadata",
      "Dynamic Metadata & generateMetadata",
      "Open Graph & Twitter Cards",
      "Sitemap & Robots.txt",
      "Structured Data (JSON-LD)",
      "SEO Best Practices",
      "Metadata Patterns & Templates",
    ],
    status: "available",
  },
  {
    id: "lesson-7",
    title: "B13.7: Performance & Optimization",
    description:
      "Performance optimization strategies, code splitting, image optimization, and caching",
    topics: [
      "Code Splitting & Bundle Optimization",
      "Image Optimization (next/image)",
      "Font Optimization (next/font)",
      "Script Optimization (next/script)",
      "Streaming & Partial Prerendering",
      "Caching Strategies",
      "Bundle Analyzer & Performance Metrics",
      "Core Web Vitals Optimization",
    ],
    status: "available",
  },
  {
    id: "lesson-8",
    title: "B13.8: Common Interview Questions & Answers",
    description:
      "Comprehensive collection of interview questions with detailed answers",
    topics: [
      "App Router vs Pages Router",
      "Server Components vs Client Components",
      "When to use each rendering strategy",
      "How caching works in Next.js",
      "Server Actions vs API Routes",
      "Middleware use cases",
      "Error handling strategies",
      "Performance optimization techniques",
    ],
    status: "available",
  },
  {
    id: "lesson-9",
    title: "B13.9: Best Practices & Patterns",
    description:
      "Production-ready patterns, architecture decisions, and common pitfalls to avoid",
    topics: [
      "Component Organization Patterns",
      "Data Fetching Best Practices",
      "Error Boundary Strategies",
      "Loading State Patterns",
      "Authentication Patterns",
      "State Management Approaches",
      "Type Safety with TypeScript",
      "Common Pitfalls & How to Avoid Them",
    ],
    status: "available",
  },
  {
    id: "lesson-10",
    title: "B13.10: Advanced Patterns & Real-World Scenarios",
    description:
      "Advanced use cases, edge cases, and solutions for complex scenarios",
    topics: [
      "Authentication & Authorization",
      "Internationalization (i18n)",
      "Multi-tenant Applications",
      "File Upload & Processing",
      "Real-time Features",
      "Analytics & Monitoring",
      "Error Tracking & Logging",
      "Testing Strategies",
    ],
    status: "available",
  },
];

export default function B13Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to App Router Chapters
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B13: Interview Cheatsheet - App Router
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive interview preparation guide covering all Next.js App
          Router concepts, patterns, and best practices.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b13/${lesson.id}`}
            className="block rounded-lg border-2 border-blue-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
          >
            <h2 className="mb-2 text-2xl font-semibold text-blue-600 dark:text-blue-400">
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
