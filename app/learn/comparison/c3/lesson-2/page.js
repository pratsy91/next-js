import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C3.2: When to use App Router - Next.js Mastery",
  description: "Understand when App Router is the right choice",
};

export default function Lesson2Page() {
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
          C3.2: When to use App Router
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn when App Router is the right choice for your Next.js project.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. New Projects
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router is the recommended choice for new Next.js projects.
          </p>

          <CodeBlock
            code={`// App Router is the future of Next.js
// ✅ Recommended for new projects
// ✅ Active development and improvements
// ✅ Modern React features
// ✅ Better performance
// ✅ Improved developer experience

// Starting a new project?
// → Use App Router

// Benefits for new projects:
// - No migration needed
// - Access to latest features
// - Better long-term support
// - Modern patterns from the start
// - Better performance out of the box

// Example: New SaaS application
// - Start with App Router
// - Use Server Components
// - Implement Server Actions
// - Leverage streaming
// → Best choice for new projects`}
            language="text"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Server Components Benefits
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router's Server Components provide significant benefits.
          </p>

          <CodeBlock
            code={`// App Router: Server Components
// app/products/page.tsx
export default async function Products() {
  // Runs on server
  const products = await getProducts();
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Benefits:
// ✅ Smaller client bundle
// ✅ Direct database access
// ✅ No API routes needed
// ✅ Better security
// ✅ Faster page loads
// ✅ Automatic code splitting

// Use App Router when:
// ✅ Want smaller JavaScript bundles
// ✅ Need direct server-side data access
// ✅ Building data-heavy applications
// ✅ Want better performance
// ✅ Need to reduce API routes`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Server Actions Needs
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions are only available in App Router.
          </p>

          <CodeBlock
            code={`// App Router: Server Actions
// app/actions.ts
'use server';

export async function createPost(data: FormData) {
  // Server-side mutation
  await savePost(data);
}

// app/create/page.tsx
import { createPost } from './actions';

export default function CreatePage() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}

// Benefits:
// ✅ No API routes needed
// ✅ Type-safe mutations
// ✅ Progressive enhancement
// ✅ Better security
// ✅ Simpler code

// Pages Router: Must use API routes
// pages/api/posts.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle mutation
  }
}

// Use App Router when:
// ✅ Need form mutations
// ✅ Want type-safe server functions
// ✅ Building interactive forms
// ✅ Need progressive enhancement
// ✅ Want simpler mutation code`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Streaming Requirements
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router has built-in streaming support for better UX.
          </p>

          <CodeBlock
            code={`// App Router: Streaming
// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile />
      </Suspense>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
    </div>
  );
}

// Components stream independently
// User sees content as it loads
// Better perceived performance

// Pages Router: No streaming
// Must wait for all data before rendering

// Use App Router when:
// ✅ Need streaming for better UX
// ✅ Have slow data sources
// ✅ Want progressive page rendering
// ✅ Building complex dashboards
// ✅ Need better perceived performance`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Modern React Features
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router leverages modern React features like Suspense and Server
            Components.
          </p>

          <CodeBlock
            code={`// App Router: Modern React
// - Server Components
// - Suspense boundaries
// - Streaming
// - Concurrent features
// - React 18+ features

// Use App Router when:
// ✅ Want to use latest React features
// ✅ Need concurrent rendering
// ✅ Building with React 18+
// ✅ Want future-proof code
// ✅ Need advanced React patterns

// Pages Router: Traditional React
// - Client Components only
// - No Server Components
// - Limited Suspense support
// - Traditional patterns

// App Router advantages:
// ✅ Better performance
// ✅ Smaller bundles
// ✅ Modern patterns
// ✅ Future-proof
// ✅ Better DX`}
            language="text"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c3/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C3.1 When to use Pages Router
          </Link>
          <Link
            href="/learn/comparison/c3/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C3.3 Migration Strategies →
          </Link>
        </div>
      </div>
    </div>
  );
}
