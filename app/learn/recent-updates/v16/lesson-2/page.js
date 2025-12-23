import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "V16.2: Proxy.ts - Middleware Replacement - Next.js Mastery",
  description: "Learn about proxy.ts replacing middleware.ts in Next.js 16",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/recent-updates/v16"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Next.js 16 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          V16.2: Proxy.ts - Middleware Replacement
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about the new proxy.ts file that replaces middleware.ts, making
          network boundaries explicit and running on Node.js runtime.
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Why Proxy.ts Replaces Middleware.ts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            In Next.js 16, the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              middleware.ts
            </code>{" "}
            file has been replaced with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              proxy.ts
            </code>{" "}
            to make the application's network boundary explicit. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              proxy.ts
            </code>{" "}
            file runs on the Node.js runtime and serves as the entry point for
            handling requests.
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Explicit network boundary definition</li>
            <li>Node.js runtime (not Edge Runtime)</li>
            <li>Full access to Node.js APIs</li>
            <li>Better performance for complex operations</li>
            <li>Clearer separation of concerns</li>
          </ul>
        </section>

        {/* Migration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Migration from middleware.ts to proxy.ts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            To migrate, simply rename your{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              middleware.ts
            </code>{" "}
            file to{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              proxy.ts
            </code>{" "}
            and update the exported function.
          </p>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Before (middleware.ts)
          </h3>
          <CodeBlock
            code={`// middleware.ts (Next.js 15 and earlier)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
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

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            After (proxy.ts)
          </h3>
          <CodeBlock
            code={`// proxy.ts (Next.js 16+)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
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
        </section>

        {/* Function Signature */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Proxy.ts Function Signature
          </h2>
          <CodeBlock
            code={`// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Main proxy function
export function proxy(request: NextRequest): NextResponse | Promise<NextResponse> {
  // Your proxy logic here
  return NextResponse.next();
}

// Optional: Config for route matching
export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    // ... other paths
  ],
};

// Optional: Runtime configuration (defaults to 'nodejs')
export const runtime = 'nodejs';`}
            language="javascript"
          />
        </section>

        {/* Request/Response Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Request & Response Handling
          </h2>
          <CodeBlock
            code={`// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Access request properties
  const { pathname, searchParams } = request.nextUrl;
  const userAgent = request.headers.get('user-agent');
  const token = request.cookies.get('token');
  
  // Modify request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-custom-header', 'value');
  
  // Create responses
  // 1. Continue to next handler
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // 2. Redirect
  // return NextResponse.redirect(new URL('/login', request.url));
  
  // 3. Rewrite
  // return NextResponse.rewrite(new URL('/api/proxy', request.url));
  
  // 4. Return custom response
  // return new NextResponse('Unauthorized', { status: 401 });
}

export const config = {
  matcher: '/api/:path*',
};`}
            language="javascript"
          />
        </section>

        {/* Network Boundary Concepts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Network Boundary Concepts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The proxy.ts file defines the explicit network boundary of your
            application. All incoming requests pass through proxy.ts before
            reaching your routes.
          </p>
          <CodeBlock
            code={`// Request Flow:
// 1. Client Request
// 2. proxy.ts (network boundary)
// 3. Route Handler / Page / API Route

// proxy.ts - Network boundary
export function proxy(request: NextRequest) {
  // Authenticate
  const isAuthenticated = checkAuth(request);
  
  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Log request
  console.log(\`[\${new Date().toISOString()}] \${request.method} \${request.nextUrl.pathname}\`);
  
  return response;
}`}
            language="javascript"
          />
        </section>

        {/* Runtime Differences */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Runtime Differences: Node.js vs Edge
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    proxy.ts (Node.js)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    middleware.ts (Edge)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Runtime
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Node.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Edge (Web APIs)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Node.js APIs
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    ✅ Full access
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    ❌ Limited
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Performance
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Good for complex operations
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Ultra-fast startup
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    File size limit
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Larger allowed
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    ~1MB limit
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Use case
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Complex auth, database queries
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Simple redirects, headers
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Practical Examples */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Practical Examples
          </h2>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Authentication & Authorization
          </h3>
          <CodeBlock
            code={`// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth'; // Can use Node.js modules

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const { pathname } = request.nextUrl;
  
  // Public routes
  if (pathname.startsWith('/api/public') || pathname === '/login') {
    return NextResponse.next();
  }
  
  // Protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/protected')) {
    if (!token || !verifyToken(token.value)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Rate Limiting
          </h3>
          <CodeBlock
            code={`// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimiter } from '@/lib/rate-limit'; // Node.js module

export function proxy(request: NextRequest) {
  const ip = request.ip || 'unknown';
  
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const isAllowed = rateLimiter.check(ip);
    
    if (!isAllowed) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
        },
      });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Security Headers
          </h3>
          <CodeBlock
            code={`// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline';"
  );
  
  return response;
}`}
            language="javascript"
          />
        </section>

        {/* Migration Checklist */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Migration Checklist
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              ✅ Rename{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                middleware.ts
              </code>{" "}
              to{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                proxy.ts
              </code>
            </li>
            <li>
              ✅ Change{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                export function middleware
              </code>{" "}
              to{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                export function proxy
              </code>
            </li>
            <li>✅ Update any imports that reference middleware</li>
            <li>✅ Test all protected routes and redirects</li>
            <li>✅ Verify Node.js APIs work if you're using any</li>
            <li>✅ Update documentation and team knowledge base</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/recent-updates/v16/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Cache Components
          </Link>
          <Link
            href="/learn/recent-updates/v16/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Enhanced Caching APIs →
          </Link>
        </div>
      </div>
    </div>
  );
}
