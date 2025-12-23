import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C1.5: Middleware - Next.js Mastery",
  description:
    "Middleware has the same API but different routing context in both routers",
};

export default function Lesson5Page() {
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
          C1.5: Middleware
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Middleware has the same API in both routers, but operates in different
          routing contexts.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Same API, Different Context
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The middleware API is identical, but it works with different routing
            systems.
          </p>

          <CodeBlock
            code={`// middleware.js (same file location in both routers)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Same API in both routers
  const { pathname } = request.nextUrl;
  
  // Same response manipulation
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

// Same matcher configuration
export const config = {
  matcher: '/about/:path*',
};

// ✅ Same imports
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ✅ Same request/response API
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// ✅ Same features work in both:
// - Request/Response manipulation
// - Redirects
// - Rewrites
// - Headers
// - Cookies
// - Authentication`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Different Routing Context
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The main difference is the routing context each router provides.
          </p>

          <CodeBlock
            code={`// Pages Router context
// middleware.js
export function middleware(request) {
  // Works with Pages Router routes:
  // - /pages/about → /about
  // - /pages/blog/[slug] → /blog/:slug
  // - /pages/api/users → /api/users
  
  const { pathname } = request.nextUrl;
  
  // Matches Pages Router file structure
  if (pathname.startsWith('/api')) {
    // API routes in pages/api/
  }
  
  return NextResponse.next();
}

// App Router context
// middleware.js
export function middleware(request) {
  // Works with App Router routes:
  // - /app/about/page.tsx → /about
  // - /app/blog/[slug]/page.tsx → /blog/:slug
  // - /app/api/users/route.ts → /api/users
  
  const { pathname } = request.nextUrl;
  
  // Matches App Router file structure
  if (pathname.startsWith('/api')) {
    // API routes in app/api/
  }
  
  return NextResponse.next();
}

// Same middleware code works for both!
// The routing system handles the differences.`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Common Patterns
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Common middleware patterns work the same in both routers.
          </p>

          <CodeBlock
            code={`// Authentication (both routers)
export function middleware(request) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// Redirects (both routers)
export function middleware(request) {
  if (request.nextUrl.pathname === '/old') {
    return NextResponse.redirect(new URL('/new', request.url));
  }
  return NextResponse.next();
}

// Headers (both routers)
export function middleware(request) {
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  return response;
}

// Cookies (both routers)
export function middleware(request) {
  const response = NextResponse.next();
  response.cookies.set('theme', 'dark');
  return response;
}

// The API is identical!
// Only the routing context differs.`}
            language="javascript"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c1/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C1.4 next.config.js
          </Link>
          <Link
            href="/learn/comparison/c1/lesson-6"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C1.6 Environment Variables →
          </Link>
        </div>
      </div>
    </div>
  );
}
