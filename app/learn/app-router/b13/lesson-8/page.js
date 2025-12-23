import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.8: Common Interview Questions & Answers - Next.js Mastery",
  description:
    "Comprehensive interview questions and answers for Next.js App Router",
};

export default function Lesson8Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b13"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B13 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B13.8: Common Interview Questions & Answers
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive collection of interview questions with detailed answers
          for Next.js App Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Q1 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q1: What is the difference between App Router and Pages Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>App Router (app/ directory):</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Uses React Server Components by default</li>
              <li>Nested layouts with layout.js files</li>
              <li>
                Data fetching directly in Server Components with async/await
              </li>
              <li>Built-in loading.js and error.js files</li>
              <li>Server Actions for mutations without API routes</li>
              <li>Parallel routes and intercepting routes</li>
              <li>Streaming and Suspense support</li>
              <li>Route Handlers (route.js) for API endpoints</li>
            </ul>

            <p className="mt-4">
              <strong>Pages Router (pages/ directory):</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Client-side React components by default</li>
              <li>Single _app.js and _document.js files</li>
              <li>
                Data fetching with getServerSideProps, getStaticProps,
                getStaticPaths
              </li>
              <li>Custom loading and error handling</li>
              <li>API routes in pages/api/ directory</li>
              <li>Traditional React patterns</li>
            </ul>

            <p className="mt-4">
              <strong>When to use App Router:</strong> New projects, need for
              Server Components, better performance requirements, modern React
              features.
            </p>
          </div>
        </section>

        {/* Q2 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q2: What are Server Components and Client Components? When should
            you use each?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Server Components:</strong> Render on the server, never
              shipped to client.
            </p>
            <CodeBlock
              code={`// Server Component (default)
export default async function ProductList() {
  // Direct database access
  const products = await db.product.findMany();
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`}
              language="javascript"
            />

            <p>
              <strong>Client Components:</strong> Render on both server and
              client, require 'use client' directive.
            </p>
            <CodeBlock
              code={`'use client'; // Required directive

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}
              language="javascript"
            />

            <p>
              <strong>Use Server Components for:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Data fetching</li>
              <li>Accessing backend resources directly</li>
              <li>Large dependencies that would bloat client bundle</li>
              <li>Sensitive information (API keys, tokens)</li>
              <li>Static content</li>
            </ul>

            <p>
              <strong>Use Client Components for:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Interactivity (onClick, onChange, etc.)</li>
              <li>Browser APIs (localStorage, window, etc.)</li>
              <li>React hooks (useState, useEffect, etc.)</li>
              <li>Event listeners</li>
              <li>Third-party libraries that require client-side JavaScript</li>
            </ul>
          </div>
        </section>

        {/* Q3 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q3: Explain the different rendering strategies in Next.js App
            Router.
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>1. Static Rendering (Default):</strong>
            </p>
            <CodeBlock
              code={`// app/page.js
export default function HomePage() {
  return <h1>Static Content</h1>;
}
// Pre-rendered at build time, cached on CDN`}
              language="javascript"
            />

            <p>
              <strong>2. Dynamic Rendering:</strong>
            </p>
            <CodeBlock
              code={`// app/products/[id]/page.js
export const dynamic = 'force-dynamic'; // Opt into dynamic rendering

export default async function ProductPage({ params }) {
  const product = await db.product.findUnique({
    where: { id: params.id }
  });
  
  return <div>{product.name}</div>;
}
// Renders on-demand for each request`}
              language="javascript"
            />

            <p>
              <strong>3. Streaming with Suspense:</strong>
            </p>
            <CodeBlock
              code={`import { Suspense } from 'react';

async function SlowComponent() {
  await fetch('...'); // Slow operation
  return <div>Loaded</div>;
}

export default function Page() {
  return (
    <div>
      <h1>Fast Content</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
// HTML streams progressively as components render`}
              language="javascript"
            />

            <p>
              <strong>4. Partial Prerendering (Experimental):</strong>
              Static shell with dynamic holes that stream in.
            </p>
          </div>
        </section>

        {/* Q4 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q4: How does caching work in Next.js App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Next.js caches data fetching requests by default. The fetch API is
              extended with cache options.
            </p>
            <CodeBlock
              code={`// Default: Cached indefinitely (Static)
const data = await fetch('https://api.example.com/data');
// Cached until build time

// Revalidate every 60 seconds (ISR)
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
});

// Always fetch fresh (Dynamic)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// Revalidate with tags
const data = await fetch('https://api.example.com/data', {
  next: { tags: ['products'] }
});
// Later: revalidateTag('products')`}
              language="javascript"
            />

            <p>
              <strong>Cache Types:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>
                <strong>Request Memoization:</strong> Deduplicates requests in
                the same render
              </li>
              <li>
                <strong>Data Cache:</strong> Persistent cache across builds
                (using fetch)
              </li>
              <li>
                <strong>Full Route Cache:</strong> Caches rendered routes
              </li>
              <li>
                <strong>Router Cache:</strong> Client-side cache of visited
                routes
              </li>
            </ul>
          </div>
        </section>

        {/* Q5 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q5: What are Server Actions and when should you use them vs API
            Routes?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Server Actions:</strong> Async functions that run on the
              server, can be called from Client Components.
            </p>
            <CodeBlock
              code={`// app/actions.js
'use server';

export async function createPost(formData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
}

// app/components/Form.js
'use client';
import { createPost } from '../actions';

export default function Form() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Submit</button>
    </form>
  );
}`}
              language="javascript"
            />

            <p>
              <strong>Use Server Actions for:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Form submissions</li>
              <li>Mutations (create, update, delete)</li>
              <li>Progressive enhancement (works without JS)</li>
              <li>Simpler API-less mutations</li>
            </ul>

            <p>
              <strong>Use API Routes (Route Handlers) for:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Public APIs</li>
              <li>Webhooks</li>
              <li>Third-party integrations</li>
              <li>When you need REST endpoints</li>
              <li>Custom HTTP methods/status codes</li>
            </ul>
          </div>
        </section>

        {/* Q6 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q6: What is middleware in Next.js and what are common use cases?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <CodeBlock
              code={`// middleware.js (root level)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Runs before request completes
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};`}
              language="javascript"
            />

            <p>
              <strong>Common Use Cases:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 ml-4">
              <li>Authentication & authorization</li>
              <li>Redirects and rewrites</li>
              <li>Setting headers (CORS, security headers)</li>
              <li>A/B testing</li>
              <li>Bot detection</li>
              <li>Internationalization (i18n) routing</li>
              <li>Logging and analytics</li>
            </ul>

            <p>
              <strong>Important:</strong> Middleware runs on Edge Runtime, has
              limitations (no Node.js APIs, size limits).
            </p>
          </div>
        </section>

        {/* Q7 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q7: How do you handle errors in Next.js App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>1. error.js - Route-level error boundary:</strong>
            </p>
            <CodeBlock
              code={`// app/products/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`}
              language="javascript"
            />

            <p>
              <strong>2. Global error.js - Root error boundary:</strong>
            </p>
            <CodeBlock
              code={`// app/error.js (must be client component)
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}`}
              language="javascript"
            />

            <p>
              <strong>3. not-found.js - 404 handling:</strong>
            </p>
            <CodeBlock
              code={`// app/not-found.js
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
}

// Trigger programmatically
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const post = await getPost(params.id);
  if (!post) notFound();
  return <div>{post.title}</div>;
}`}
              language="javascript"
            />
          </div>
        </section>

        {/* Q8 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Q8: What are the best practices for performance optimization in
            Next.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>1. Use Server Components when possible:</strong> Reduces
              bundle size.
            </p>
            <p>
              <strong>2. Optimize Images:</strong>
            </p>
            <CodeBlock
              code={`import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // For above-fold images
  placeholder="blur"
/>`}
              language="javascript"
            />

            <p>
              <strong>3. Code Splitting & Dynamic Imports:</strong>
            </p>
            <CodeBlock
              code={`'use client';
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if needed
});

export default function Page() {
  return <HeavyComponent />;
}`}
              language="javascript"
            />

            <p>
              <strong>4. Font Optimization:</strong>
            </p>
            <CodeBlock
              code={`import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}`}
              language="javascript"
            />

            <p>
              <strong>5. Use Caching Strategically:</strong> Static generation,
              ISR, and proper cache configuration.
            </p>
            <p>
              <strong>6. Minimize Client Components:</strong> Keep interactivity
              at leaf level.
            </p>
            <p>
              <strong>7. Optimize Third-party Scripts:</strong>
            </p>
            <CodeBlock
              code={`import Script from 'next/script';

<Script
  src="https://example.com/script.js"
  strategy="afterInteractive" // or 'lazyOnload'
/>`}
              language="javascript"
            />
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13/lesson-7"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Performance & Optimization
          </Link>
          <Link
            href="/learn/app-router/b13/lesson-9"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Best Practices & Patterns →
          </Link>
        </div>
      </div>
    </div>
  );
}
