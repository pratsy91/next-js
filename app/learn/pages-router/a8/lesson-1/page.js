import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A8.1: Middleware (Pages Router) - Next.js Mastery",
  description: "Complete guide to middleware in Next.js Pages Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a8"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A8 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A8.1: Middleware (Pages Router)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use middleware for request/response manipulation,
          redirects, rewrites, headers, cookies, and authentication in Next.js
          Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: File Location */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. File Location (middleware.js in root)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Middleware must be placed at the root of your project (same level as{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/
            </code>
            ).
          </p>

          <CodeBlock
            code={`// middleware.js (root directory)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Middleware logic here
  return NextResponse.next();
}

// File structure:
// project-root/
//   ├── middleware.js  ← Here
//   ├── pages/
//   ├── public/
//   └── next.config.js

// Alternative: middleware.ts (TypeScript)
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: '/about/:path*',
};`}
            language="javascript"
          />
        </section>

        {/* Section 2: Matcher Configuration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Matcher Configuration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure which routes the middleware should run on using the
            matcher configuration.
          </p>

          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  return NextResponse.next();
}

// Match specific paths
export const config = {
  matcher: '/about/:path*',
};

// Multiple paths
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
};

// Exclude paths (using negative lookahead)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// Match all routes except static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// Match specific file extensions
export const config = {
  matcher: [
    '/((?!.*\\.(?:css|js|jpg|jpeg|gif|png|svg|ico|webp)).*)',
  ],
};

// Conditional matching
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};`}
            language="javascript"
          />
        </section>

        {/* Section 3: Request/Response Manipulation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Request/Response Manipulation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Access and modify request/response objects in middleware.
          </p>

          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Access request properties
  const { pathname, searchParams } = request.nextUrl;
  const userAgent = request.headers.get('user-agent');
  const cookie = request.cookies.get('session');
  
  // Create response
  const response = NextResponse.next();
  
  // Modify response headers
  response.headers.set('x-custom-header', 'custom-value');
  response.headers.set('x-pathname', pathname);
  
  // Modify request (create new URL)
  const url = request.nextUrl.clone();
  url.pathname = '/new-path';
  const rewriteResponse = NextResponse.rewrite(url);
  
  return response;
}

// Access request body (if needed)
export async function middleware(request) {
  // Note: Reading body consumes the stream
  // Only read if absolutely necessary
  if (request.method === 'POST') {
    const body = await request.json();
    // Process body
  }
  
  return NextResponse.next();
}

// Clone request for reading
export async function middleware(request) {
  const clonedRequest = request.clone();
  const body = await clonedRequest.json();
  
  // Original request still available
  return NextResponse.next();
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Redirects */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Redirects
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Redirect users to different URLs using middleware.
          </p>

          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Simple redirect
  if (request.nextUrl.pathname === '/old-path') {
    return NextResponse.redirect(new URL('/new-path', request.url));
  }
  
  // Conditional redirect
  const isAuthenticated = request.cookies.get('token');
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Permanent redirect (308)
  if (request.nextUrl.pathname === '/old') {
    const url = request.nextUrl.clone();
    url.pathname = '/new';
    return NextResponse.redirect(url, { status: 308 });
  }
  
  // External redirect
  if (request.nextUrl.pathname === '/external') {
    return NextResponse.redirect('https://example.com');
  }
  
  return NextResponse.next();
}

// Redirect with query parameters
export function middleware(request) {
  if (request.nextUrl.pathname === '/redirect') {
    const url = new URL('/target', request.url);
    url.searchParams.set('from', 'middleware');
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Rewrites */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Rewrites
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Rewrite URLs internally without changing the browser URL.
          </p>

          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Simple rewrite
  if (request.nextUrl.pathname === '/about') {
    return NextResponse.rewrite(new URL('/about-us', request.url));
  }
  
  // Rewrite with pathname modification
  const url = request.nextUrl.clone();
  if (url.pathname.startsWith('/api/v1')) {
    url.pathname = url.pathname.replace('/api/v1', '/api/v2');
    return NextResponse.rewrite(url);
  }
  
  // Conditional rewrite
  const userAgent = request.headers.get('user-agent');
  if (userAgent?.includes('Mobile')) {
    const url = request.nextUrl.clone();
    url.pathname = \`/mobile\${url.pathname}\`;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

// Rewrite to external URL (proxy)
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/api/proxy')) {
    const url = new URL(request.nextUrl.pathname, 'https://external-api.com');
    url.search = request.nextUrl.search;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Headers */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Headers
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set, modify, and read request/response headers in middleware.
          </p>

          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Read request headers
  const userAgent = request.headers.get('user-agent');
  const acceptLanguage = request.headers.get('accept-language');
  const customHeader = request.headers.get('x-custom-header');
  
  // Create response
  const response = NextResponse.next();
  
  // Set response headers
  response.headers.set('x-custom-header', 'value');
  response.headers.set('x-request-path', request.nextUrl.pathname);
  response.headers.set('x-timestamp', new Date().toISOString());
  
  // Set security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  
  // Modify existing headers
  const contentType = response.headers.get('content-type');
  if (contentType) {
    response.headers.set('content-type', contentType + '; charset=utf-8');
  }
  
  // Delete headers
  response.headers.delete('x-unwanted-header');
  
  return response;
}

// Copy headers from request to response
export function middleware(request) {
  const response = NextResponse.next();
  
  // Copy specific header
  const correlationId = request.headers.get('x-correlation-id');
  if (correlationId) {
    response.headers.set('x-correlation-id', correlationId);
  }
  
  return response;
}`}
            language="javascript"
          />
        </section>

        {/* Section 7: Cookies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Cookies
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Read and set cookies in middleware.
          </p>

          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Read cookies
  const token = request.cookies.get('token');
  const sessionId = request.cookies.get('sessionId');
  const allCookies = request.cookies.getAll();
  
  // Create response
  const response = NextResponse.next();
  
  // Set cookie
  response.cookies.set('theme', 'dark', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  
  // Set cookie with expiration
  response.cookies.set('last-visit', new Date().toISOString(), {
    expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000), // 30 days
    path: '/',
  });
  
  // Delete cookie
  response.cookies.delete('old-cookie');
  
  // Modify existing cookie
  const existingCookie = request.cookies.get('preferences');
  if (existingCookie) {
    response.cookies.set('preferences', existingCookie.value + ';updated=true');
  }
  
  return response;
}

// Cookie options
response.cookies.set('name', 'value', {
  httpOnly: true,        // Not accessible via JavaScript
  secure: true,          // HTTPS only
  sameSite: 'strict',    // 'strict', 'lax', or 'none'
  maxAge: 3600,          // Seconds
  expires: new Date(),   // Expiration date
  path: '/',             // Cookie path
  domain: '.example.com', // Cookie domain
});`}
            language="javascript"
          />
        </section>

        {/* Section 8: Authentication */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Authentication
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement authentication checks in middleware.
          </p>

          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isProtectedPage = request.nextUrl.pathname.startsWith('/dashboard');
  
  // Redirect unauthenticated users
  if (isProtectedPage && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Verify token (example)
  if (token && isProtectedPage) {
    // In production, verify token with your auth service
    // const isValid = await verifyToken(token.value);
    // if (!isValid) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }
  
  return NextResponse.next();
}

// Role-based access control
export function middleware(request) {
  const token = request.cookies.get('token');
  const userRole = request.cookies.get('role'); // In production, decode from token
  
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  
  if (isAdminPage && userRole?.value !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login'],
};`}
            language="javascript"
          />
        </section>

        {/* Section 9: Edge Runtime */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            9. Edge Runtime
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Middleware runs on the Edge Runtime by default for optimal
            performance.
          </p>

          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

// Middleware runs on Edge Runtime by default
export function middleware(request) {
  return NextResponse.next();
}

// Explicitly specify Edge Runtime
export const config = {
  runtime: 'edge',
  matcher: '/about/:path*',
};

// Edge Runtime limitations:
// - No Node.js APIs (fs, path, etc.)
// - Limited npm packages (must be Edge-compatible)
// - Smaller bundle size
// - Faster cold starts
// - Global execution context

// Using Edge-compatible APIs
export function middleware(request) {
  // ✅ Available in Edge Runtime
  const url = new URL(request.url);
  const headers = new Headers();
  const response = new Response();
  
  // ❌ Not available in Edge Runtime
  // const fs = require('fs');
  // const path = require('path');
  
  return NextResponse.next();
}

// Check runtime
export const config = {
  runtime: 'edge', // or 'nodejs' (not recommended for middleware)
};`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a8"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to A8 Lessons
          </Link>
          <Link
            href="/learn/pages-router/a8/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A8.2 Internationalization →
          </Link>
        </div>
      </div>
    </div>
  );
}
