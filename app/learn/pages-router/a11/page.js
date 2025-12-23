import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "A11.1: Core Concepts Quick Reference",
    description:
      "Essential Next.js Pages Router concepts, file-based routing, and pre-rendering strategies",
    topics: [
      "File-based Routing System",
      "Static Site Generation (SSG)",
      "Server-Side Rendering (SSR)",
      "Incremental Static Regeneration (ISR)",
      "Client-Side Rendering (CSR)",
      "Automatic Code Splitting",
      "Custom App (_app.js)",
      "Custom Document (_document.js)",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "A11.2: Data Fetching Methods Cheatsheet",
    description:
      "Complete reference for getStaticProps, getServerSideProps, getStaticPaths, and data fetching patterns",
    topics: [
      "getStaticProps (SSG)",
      "getServerSideProps (SSR)",
      "getStaticPaths (Dynamic Routes)",
      "Incremental Static Regeneration (ISR)",
      "Context Parameter",
      "Return Values & Types",
      "Data Fetching Patterns",
      "When to use each method",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "A11.3: Routing & Navigation Patterns",
    description:
      "Routing reference, dynamic routes, catch-all routes, optional catch-all, and navigation",
    topics: [
      "Static Routes",
      "Dynamic Routes [id]",
      "Catch-all Routes [...slug]",
      "Optional Catch-all [[...slug]]",
      "Link Component & Prefetching",
      "useRouter Hook",
      "Programmatic Navigation",
      "Route Protection Patterns",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "A11.4: API Routes Reference",
    description:
      "API routes, HTTP methods, request/response handling, and middleware patterns",
    topics: [
      "API Route Basics",
      "HTTP Methods (GET, POST, PUT, DELETE, PATCH)",
      "Request & Response Objects",
      "Dynamic API Routes",
      "API Route Middleware",
      "Error Handling",
      "Authentication & Authorization",
      "Body Parsing & Validation",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "A11.5: Custom App & Document",
    description:
      "_app.js, _document.js, page initialization, global styles, and custom configuration",
    topics: [
      "_app.js Structure & Use Cases",
      "Page Props & getInitialProps",
      "Global Error Handling",
      "_document.js Structure",
      "Custom HTML Structure",
      "Font Optimization",
      "CSS-in-JS Setup",
      "Analytics & Third-party Scripts",
    ],
    status: "available",
  },
  {
    id: "lesson-6",
    title: "A11.6: Head & Metadata Management",
    description:
      "next/head usage, SEO optimization, dynamic meta tags, and Open Graph",
    topics: [
      "next/head Component",
      "Static Meta Tags",
      "Dynamic Meta Tags",
      "Open Graph Tags",
      "Twitter Cards",
      "Structured Data",
      "SEO Best Practices",
      "Meta Tag Patterns",
    ],
    status: "available",
  },
  {
    id: "lesson-7",
    title: "A11.7: Performance & Optimization",
    description:
      "Performance optimization, code splitting, image optimization, and caching strategies",
    topics: [
      "Automatic Code Splitting",
      "Dynamic Imports & Lazy Loading",
      "Image Optimization (next/image)",
      "Font Optimization (next/font)",
      "Script Optimization (next/script)",
      "Static Export",
      "Bundle Analyzer",
      "Performance Monitoring",
    ],
    status: "available",
  },
  {
    id: "lesson-8",
    title: "A11.8: Common Interview Questions & Answers",
    description:
      "Comprehensive collection of interview questions with detailed answers",
    topics: [
      "SSG vs SSR vs ISR",
      "When to use getStaticProps vs getServerSideProps",
      "getStaticPaths explained",
      "API Routes vs Serverless Functions",
      "Custom App vs Custom Document",
      "Middleware use cases",
      "Performance optimization techniques",
      "Migration to App Router considerations",
    ],
    status: "available",
  },
  {
    id: "lesson-9",
    title: "A11.9: Best Practices & Patterns",
    description:
      "Production-ready patterns, architecture decisions, and common pitfalls",
    topics: [
      "Project Structure Best Practices",
      "Data Fetching Patterns",
      "Error Handling Strategies",
      "Loading State Patterns",
      "Authentication Patterns",
      "State Management Approaches",
      "Type Safety with TypeScript",
      "Common Pitfalls & Solutions",
    ],
    status: "available",
  },
  {
    id: "lesson-10",
    title: "A11.10: Advanced Patterns & Real-World Scenarios",
    description:
      "Advanced use cases, edge cases, and solutions for complex scenarios",
    topics: [
      "Authentication & Session Management",
      "Internationalization (i18n)",
      "Preview Mode",
      "Redirects & Rewrites",
      "Middleware & Edge Functions",
      "Multi-zone Deployments",
      "Analytics & Monitoring",
      "Testing Strategies",
    ],
    status: "available",
  },
];

export default function A11Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Pages Router Chapters
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A11: Interview Cheatsheet - Pages Router
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive interview preparation guide covering all Next.js Pages
          Router concepts, patterns, and best practices.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/pages-router/a11/${lesson.id}`}
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
