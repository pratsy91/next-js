import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B10.1: Middleware (App Router) - Next.js Mastery",
  description: "Complete guide to middleware in Next.js App Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b10"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B10 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B10.1: Middleware (App Router)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use middleware in Next.js App Router: file location,
          matcher configuration, request/response manipulation, redirects,
          rewrites, headers, cookies, authentication, and Edge runtime.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: File Location */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. File Location (`middleware.js` in root)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Middleware must be placed in the root of your project as{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              middleware.js
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              middleware.ts
            </code>
            .
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Middleware File
          </h3>
          <CodeBlock
            code={`// middleware.js (in project root)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Middleware logic here
  return NextResponse.next();
}

// Export matcher to specify which routes to run middleware
export const config = {
  matcher: '/about/:path*',
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Middleware File Structure
          </h3>
          <CodeBlock
            code={`// Project structure:
// project-root/
//   middleware.js    ✅ Correct location
//   middleware.ts    ✅ Also valid
//   app/
//   pages/
//   public/
//   ...

// ❌ Wrong locations:
// app/middleware.js  ❌ Not recognized
// src/middleware.js  ❌ Not recognized (unless src is root)

// middleware.js (must be in root)
import { NextResponse } from 'next/server';

export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
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
            Use the{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              matcher
            </code>{" "}
            configuration to specify which routes should run the middleware.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Matcher
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware running for:', request.nextUrl.pathname);
  return NextResponse.next();
}

// Match specific route
export const config = {
  matcher: '/about',
};

// Match all routes under a path
export const config = {
  matcher: '/dashboard/:path*',
};

// Match multiple paths
export const config = {
  matcher: ['/about', '/contact', '/blog/:path*'],
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
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Matcher Patterns
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  return NextResponse.next();
}

// Match with regex patterns
export const config = {
  matcher: [
    '/user/:path*',
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// Match specific file extensions
export const config = {
  matcher: '/:path*.json',
};

// Match all routes except API routes and static files
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.).*)',
  ],
};

// Negative matching (exclude paths)
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - API routes
     * - Static files
     * - Next.js internals
     */
    '/((?!api|_next|.*\\..*).*)',
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
            Access and manipulate request data, and modify responses in
            middleware.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Request Properties
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Access request properties
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const method = request.method;
  const headers = request.headers;
  const cookies = request.cookies;
  
  // Get specific headers
  const userAgent = request.headers.get('user-agent');
  const acceptLanguage = request.headers.get('accept-language');
  const referer = request.headers.get('referer');
  
  // Get cookies
  const sessionId = request.cookies.get('sessionId')?.value;
  const theme = request.cookies.get('theme')?.value;
  
  // Log request info
  console.log('Path:', pathname);
  console.log('Method:', method);
  console.log('User Agent:', userAgent);
  console.log('Session ID:', sessionId);
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Response Manipulation
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Clone the response
  const response = NextResponse.next();
  
  // Modify response headers
  response.headers.set('X-Custom-Header', 'Custom Value');
  response.headers.set('X-Middleware-Executed', 'true');
  
  // Set multiple headers
  response.headers.set('X-Custom-Header-1', 'Value 1');
  response.headers.set('X-Custom-Header-2', 'Value 2');
  
  // Append to existing headers
  response.headers.append('Set-Cookie', 'theme=dark; Path=/');
  
  // Remove headers
  response.headers.delete('X-Powered-By');
  
  return response;
}

export const config = {
  matcher: '/:path*',
};`}
            language="javascript"
          />
        </section>

        {/* Section 4: Redirects */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Redirects
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use middleware to redirect requests to different URLs.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Redirect
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Redirect old path to new path
  if (url.pathname === '/old-path') {
    url.pathname = '/new-path';
    return NextResponse.redirect(url);
  }
  
  // Permanent redirect (308)
  if (url.pathname === '/old') {
    url.pathname = '/new';
    return NextResponse.redirect(url, 308);
  }
  
  // Temporary redirect (307)
  if (url.pathname === '/temp') {
    url.pathname = '/temporary';
    return NextResponse.redirect(url, 307);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Conditional Redirects
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Redirect based on authentication
  const token = request.cookies.get('token')?.value;
  if (!token && url.pathname.startsWith('/dashboard')) {
    url.pathname = '/login';
    url.searchParams.set('from', url.pathname);
    return NextResponse.redirect(url);
  }
  
  // Redirect based on user role
  const role = request.cookies.get('role')?.value;
  if (url.pathname.startsWith('/admin') && role !== 'admin') {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }
  
  // Redirect based on locale
  const locale = request.cookies.get('locale')?.value || 'en';
  if (!url.pathname.startsWith(\`/\${locale}\`)) {
    url.pathname = \`/\${locale}\${url.pathname}\`;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};`}
            language="javascript"
          />
        </section>

        {/* Section 5: Rewrites */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Rewrites
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use middleware to rewrite URLs without changing the browser URL.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Rewrite
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Rewrite path
  if (url.pathname === '/old-path') {
    url.pathname = '/new-path';
    return NextResponse.rewrite(url);
  }
  
  // Rewrite with query params
  if (url.pathname === '/products') {
    url.pathname = '/shop';
    url.searchParams.set('category', 'all');
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Rewrites
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Rewrite based on A/B testing
  const variant = request.cookies.get('ab-variant')?.value || 'a';
  if (url.pathname === '/home') {
    url.pathname = variant === 'a' ? '/home-a' : '/home-b';
    return NextResponse.rewrite(url);
  }
  
  // Rewrite based on user type
  const userType = request.cookies.get('user-type')?.value || 'guest';
  if (url.pathname === '/dashboard') {
    url.pathname = \`/dashboard/\${userType}\`;
    return NextResponse.rewrite(url);
  }
  
  // Rewrite API routes
  if (url.pathname.startsWith('/api/v1/')) {
    url.pathname = url.pathname.replace('/api/v1', '/api/v2');
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};`}
            language="javascript"
          />
        </section>

        {/* Section 6: Headers */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Headers
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Modify request and response headers in middleware.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Setting Headers
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Clone request headers
  const requestHeaders = new Headers(request.headers);
  
  // Add custom request headers
  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  requestHeaders.set('x-user-agent', request.headers.get('user-agent') || '');
  
  // Modify response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // Add response headers
  response.headers.set('X-Custom-Header', 'Custom Value');
  response.headers.set('X-Edge-Runtime', 'true');
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: '/:path*',
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            CORS Headers
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  const response = NextResponse.next();
  
  // Add CORS headers to response
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}

export const config = {
  matcher: '/api/:path*',
};`}
            language="javascript"
          />
        </section>

        {/* Section 7: Cookies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Cookies
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Read and write cookies in middleware.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Reading Cookies
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Read cookies
  const token = request.cookies.get('token')?.value;
  const theme = request.cookies.get('theme')?.value;
  const locale = request.cookies.get('locale')?.value;
  
  // Get all cookies
  const allCookies = request.cookies.getAll();
  
  // Check if cookie exists
  const hasSession = request.cookies.has('sessionId');
  
  // Use cookie value
  if (!token) {
    // Redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Setting Cookies
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Set cookie
  response.cookies.set('theme', 'dark', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  
  // Set multiple cookies
  response.cookies.set('locale', 'en', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  
  response.cookies.set('sessionId', 'abc123', {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  
  // Delete cookie
  response.cookies.delete('old-cookie');
  
  return response;
}

export const config = {
  matcher: '/:path*',
};`}
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

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Authentication Check
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  
  // Protected routes
  const isProtectedRoute = pathname.startsWith('/dashboard') ||
                          pathname.startsWith('/admin') ||
                          pathname.startsWith('/profile');
  
  // Public routes
  const isPublicRoute = pathname === '/login' ||
                       pathname === '/register' ||
                       pathname === '/';
  
  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  // Redirect to dashboard if accessing login with token
  if (isPublicRoute && token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/login',
    '/register',
  ],
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Role-Based Access Control
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;
  const { pathname } = request.nextUrl;
  
  // Check if token is valid (in production, verify JWT)
  if (!token) {
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
  
  // Admin routes
  if (pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  
  // Manager routes
  if (pathname.startsWith('/manager')) {
    if (!['admin', 'manager'].includes(role || '')) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  
  // Add user info to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-role', role || 'user');
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/manager/:path*',
  ],
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
            Middleware runs on the Edge runtime by default for optimal
            performance.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Edge Runtime Configuration
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

// Middleware runs on Edge runtime by default
export const runtime = 'edge'; // Optional, default is 'edge'

export function middleware(request) {
  // Edge runtime limitations:
  // - No Node.js APIs (fs, path, etc.)
  // - Limited Web APIs
  // - Fast execution
  // - Low latency
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

// Edge runtime features:
// - Web APIs (fetch, Headers, Request, Response, etc.)
// - URL API
// - TextEncoder/TextDecoder
// - Crypto API (subtle crypto)

// ❌ Not available in Edge:
// - Node.js fs module
// - Node.js path module
// - Node.js Buffer (use TextEncoder/TextDecoder)
// - Database connections (use fetch to API routes)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Edge-Compatible Code
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // ✅ Use Web APIs
  const url = new URL(request.url);
  const headers = new Headers(request.headers);
  
  // ✅ Use fetch (Edge compatible)
  // Note: Can't await in middleware, but can make synchronous checks
  
  // ✅ Use Crypto API
  // const encoder = new TextEncoder();
  // const data = encoder.encode('data');
  
  // ✅ Use URL API
  const searchParams = new URLSearchParams();
  searchParams.set('key', 'value');
  
  // ❌ Don't use Node.js APIs
  // const fs = require('fs');  // ❌ Not available
  // const path = require('path');  // ❌ Not available
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};`}
            language="javascript"
          />
        </section>

        {/* Section 10: NextResponse API */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            10. NextResponse API
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use NextResponse API for advanced response manipulation.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            NextResponse Methods
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // NextResponse.next() - Continue with request
  return NextResponse.next();
  
  // NextResponse.redirect(url, status)
  const url = request.nextUrl.clone();
  url.pathname = '/new-path';
  return NextResponse.redirect(url, 307);
  
  // NextResponse.rewrite(url) - Rewrite without changing URL
  url.pathname = '/internal-path';
  return NextResponse.rewrite(url);
  
  // NextResponse.json(data, init) - Return JSON response
  return NextResponse.json({ message: 'Hello' }, { status: 200 });
  
  // NextResponse.text(text, init) - Return text response
  return NextResponse.text('Hello', { status: 200 });
  
  // NextResponse.html(html, init) - Return HTML response
  return NextResponse.html('<h1>Hello</h1>', { status: 200 });
}

export const config = {
  matcher: '/:path*',
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced NextResponse Usage
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Create response with custom options
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });
  
  // Modify response
  response.headers.set('X-Custom', 'Value');
  response.cookies.set('theme', 'dark');
  
  // Chain operations
  return NextResponse.next()
    .setHeader('X-Custom', 'Value')
    .setCookie('theme', 'dark', { path: '/' });
  
  // Redirect with status and headers
  const url = request.nextUrl.clone();
  url.pathname = '/new-path';
  return NextResponse.redirect(url, {
    status: 307,
    headers: {
      'X-Redirect-Reason': 'Maintenance',
    },
  });
  
  // Rewrite with modified request
  url.pathname = '/internal';
  return NextResponse.rewrite(url, {
    request: {
      headers: request.headers,
    },
  });
}

export const config = {
  matcher: '/:path*',
};`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b9/lesson-5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B9.5 Tailwind CSS
          </Link>
          <Link
            href="/learn/app-router/b10/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B10.2 Route Segment Config →
          </Link>
        </div>
      </div>
    </div>
  );
}
