import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C3.3: Migration Strategies - Next.js Mastery",
  description: "Learn how to migrate from Pages Router to App Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c3"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C3 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C3.3: Migration Strategies
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to migrate from Pages Router to App Router incrementally.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Incremental Migration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Migrate gradually, route by route, without breaking existing
            functionality.
          </p>

          <CodeBlock
            code={`// Strategy: Migrate one route at a time
// Both routers can coexist in the same project

// Step 1: Enable App Router
// next.config.js
module.exports = {
  experimental: {
    appDir: true, // Next.js 13
    // Or just use app/ directory (Next.js 13.4+)
  },
};

// Step 2: Create app/ directory
// Keep pages/ directory for existing routes
// Add app/ directory for new routes

// Step 3: Migrate routes incrementally
// Start with simple routes
// Move to complex routes
// Test each migration

// File structure during migration:
project/
  ├── pages/          # Existing Pages Router routes
  │   ├── index.js
  │   ├── about.js
  │   └── api/
  └── app/            # New App Router routes
      ├── layout.js
      ├── dashboard/
      │   └── page.tsx
      └── api/
          └── new-route/
              └── route.ts

// Both work simultaneously!`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Route-by-Route Migration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Migrate routes one at a time, starting with the simplest.
          </p>

          <CodeBlock
            code={`// Migration order (recommended):
// 1. Static pages (easiest)
// 2. Dynamic routes
// 3. API routes
// 4. Complex pages with data fetching
// 5. Pages with special features

// Example: Migrate /about page
// Before (Pages Router):
// pages/about.js
export default function About() {
  return <h1>About</h1>;
}

// After (App Router):
// app/about/page.tsx
export default function About() {
  return <h1>About</h1>;
}

// Simple migration - just move the file!

// Example: Migrate dynamic route
// Before (Pages Router):
// pages/blog/[slug].js
export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post } };
}

export default function BlogPost({ post }) {
  return <article>{post.content}</article>;
}

// After (App Router):
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}

// Simpler - no getStaticProps needed!`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Data Fetching Migration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Convert Pages Router data fetching to App Router patterns.
          </p>

          <CodeBlock
            code={`// Migrate getServerSideProps
// Before (Pages Router):
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

export default function Page({ data }) {
  return <div>{data}</div>;
}

// After (App Router):
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Migrate getStaticProps
// Before (Pages Router):
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data }, revalidate: 60 };
}

export default function Page({ data }) {
  return <div>{data}</div>;
}

// After (App Router):
export const revalidate = 60;

export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Migrate getStaticPaths
// Before (Pages Router):
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'post-1' } }],
    fallback: false,
  };
}

// After (App Router):
export async function generateStaticParams() {
  return [{ slug: 'post-1' }];
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. API Routes Migration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Convert Pages Router API routes to App Router route handlers.
          </p>

          <CodeBlock
            code={`// Migrate API route
// Before (Pages Router):
// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    res.status(201).json({ message: 'Created' });
  }
}

// After (App Router):
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ users: [] });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Created' }, { status: 201 });
}

// Benefits:
// ✅ Cleaner code
// ✅ Type-safe
// ✅ Better organization
// ✅ Named exports per method`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Best Practices
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Follow these best practices for a smooth migration.
          </p>

          <CodeBlock
            code={`// Migration best practices:

// 1. Start small
// - Migrate simple pages first
// - Build confidence
// - Learn patterns

// 2. Test thoroughly
// - Test each migrated route
// - Verify functionality
// - Check performance

// 3. Keep both routers
// - Don't delete pages/ immediately
// - Migrate incrementally
// - Keep old routes working

// 4. Update navigation
// - Update links to new routes
// - Update navigation components
// - Test all links

// 5. Migrate shared code
// - Move components to shared location
// - Update imports
// - Test components

// 6. Handle edge cases
// - Custom _app.js logic
// - Custom _document.js
// - Special routing needs

// 7. Monitor performance
// - Compare before/after
// - Check bundle sizes
// - Monitor load times

// 8. Update documentation
// - Document new routes
// - Update team knowledge
// - Share migration learnings`}
            language="text"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c3/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C3.2 When to use App Router
          </Link>
          <Link
            href="/learn/comparison/c3/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C3.4 Coexistence Patterns →
          </Link>
        </div>
      </div>
    </div>
  );
}
