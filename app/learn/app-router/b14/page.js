import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B14.1: Foundation & Setup (B1)",
    description:
      "Most asked questions on project setup, App Router basics, Server Components, and core concepts",
    topics: [
      "create-next-app & Project Structure",
      "App Router vs Pages Router",
      "Server vs Client Components",
      "RSC Mental Model",
      "Junior → Senior Foundation Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B14.2: Routing System (B2)",
    description:
      "Most asked questions on file-based routing, layouts, loading/error files, and advanced routes",
    topics: [
      "File-based Routing",
      "Layouts & Nested Layouts",
      "loading.js / error.js / not-found.js",
      "Route Groups, Parallel & Intercepting Routes",
      "Junior → Senior Routing Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B14.3: Data Fetching (B3)",
    description:
      "Most asked questions on fetch, caching, static/dynamic rendering, streaming, and Suspense",
    topics: [
      "Server Component Fetching",
      "Cache Options & Revalidation",
      "Static vs Dynamic Rendering",
      "Streaming & Suspense",
      "Junior → Senior Data Fetching Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "B14.4: Server Actions (B4)",
    description:
      "Most asked questions on Server Actions, forms, progressive enhancement, and mutations",
    topics: [
      "Server Actions Basics",
      "Form Actions & Validation",
      "useFormState / useFormStatus / useOptimistic",
      "Revalidation After Mutations",
      "Junior → Senior Server Actions Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "B14.5: Route Handlers (B5)",
    description:
      "Most asked questions on route.js, HTTP methods, Request/Response APIs, and API design",
    topics: [
      "Route Handler Basics",
      "GET/POST/PUT/DELETE/PATCH",
      "Cookies, Headers, Streaming",
      "Auth Patterns in APIs",
      "Junior → Senior Route Handlers Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-6",
    title: "B14.6: Navigation & Routing (B6)",
    description:
      "Most asked questions on next/navigation, Link, prefetching, and URL state",
    topics: [
      "useRouter / usePathname / useSearchParams",
      "Link Prefetching",
      "Client vs Server Navigation",
      "URL as State",
      "Junior → Senior Navigation Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-7",
    title: "B14.7: Metadata API (B7)",
    description:
      "Most asked questions on static/dynamic metadata, Open Graph, and SEO tags",
    topics: [
      "Static Metadata Export",
      "generateMetadata",
      "Open Graph & Twitter Cards",
      "Metadata Inheritance",
      "Junior → Senior Metadata Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-8",
    title: "B14.8: Components & Features (B8)",
    description:
      "Most asked questions on next/image, next/script, and next/font optimization",
    topics: [
      "Image Optimization",
      "Script Loading Strategies",
      "Font Optimization",
      "CLS / LCP Impact",
      "Junior → Senior Components Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-9",
    title: "B14.9: Styling (B9)",
    description:
      "Most asked questions on CSS Modules, Tailwind, CSS-in-JS, and styling in App Router",
    topics: [
      "CSS Modules vs Global CSS",
      "Tailwind in Next.js",
      "CSS-in-JS with RSC",
      "Sass/SCSS Setup",
      "Junior → Senior Styling Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-10",
    title: "B14.10: Advanced Features (B10)",
    description:
      "Most asked questions on Middleware, i18n, env vars, redirects, and draft mode",
    topics: [
      "Middleware / proxy.ts",
      "Route Segment Config",
      "Internationalization",
      "Env Vars & Draft Mode",
      "Junior → Senior Advanced Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-11",
    title: "B14.11: Optimization (B11)",
    description:
      "Most asked questions on performance, caching layers, Core Web Vitals, and SEO",
    topics: [
      "Performance Strategies",
      "Four Caching Layers",
      "Core Web Vitals",
      "SEO Best Practices",
      "Junior → Senior Optimization Q&A",
    ],
    status: "available",
  },
  {
    id: "lesson-12",
    title: "B14.12: Deployment (B12)",
    description:
      "Most asked questions on build process, Vercel/self-hosting, and production config",
    topics: [
      "next build & Output Modes",
      "Vercel vs Self-Hosting",
      "Standalone Output",
      "Production Hardening",
      "Junior → Senior Deployment Q&A",
    ],
    status: "available",
  },
];

export default function B14Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to App Router
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B14: Most Asked Interview Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Module-wise bank of the most frequently asked Next.js App Router
          interview questions — from junior to experienced — mapped to phases
          B1–B12.
        </p>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Each lesson maps to one learning phase (B1→Lesson 1 … B12→Lesson 12).
          Questions are tagged Junior / Mid / Senior based on typical interview
          depth.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b14/${lesson.id}`}
            className="block rounded-lg border-2 border-blue-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
          >
            <h2 className="mb-2 text-xl font-semibold text-blue-600 dark:text-blue-400">
              {lesson.title}
            </h2>
            <p className="mb-3 text-gray-600 dark:text-gray-300">
              {lesson.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {lesson.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
