import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.10: Advanced Patterns & Real-World Scenarios - Next.js Mastery",
  description:
    "Advanced patterns and real-world scenarios for Next.js App Router",
};

export default function Lesson10Page() {
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
          B13.10: Advanced Patterns & Real-World Scenarios
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Advanced use cases, edge cases, and solutions for complex scenarios.
        </p>
      </div>

      <div className="space-y-8">
        {/* Authentication */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Authentication & Authorization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implementing authentication in App Router involves managing user
            sessions, verifying credentials, and protecting routes. JWT (JSON
            Web Tokens) is a common approach for stateless authentication,
            stored in secure, httpOnly cookies to prevent XSS attacks. Session
            management can be handled through cookies, with tokens verified on
            each request.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Security Best Practices:</strong> Always use httpOnly
            cookies to store session tokens, preventing JavaScript access. Set
            secure flag in production to ensure cookies only transmit over
            HTTPS. Use sameSite='strict' to prevent CSRF attacks. Verify tokens
            server-side on every protected request - never trust client-side
            authentication state. Implement proper token expiration and refresh
            mechanisms. Store secrets in environment variables, never in code.
            Consider using established libraries like NextAuth.js for production
            applications, which handle many security concerns automatically.
          </p>
          <CodeBlock
            code={`// Session-based authentication
// lib/auth.js
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

export async function createSession(userId: string) {
  const session = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession() {
  const session = cookies().get('session');
  
  if (!session) {
    return null;
  }
  
  try {
    const { payload } = await jwtVerify(
      session.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch {
    return null;
  }
}

// Protected route
export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return <div>Dashboard</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Internationalization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Internationalization (i18n)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Internationalization involves making your application support
            multiple languages and locales. This typically requires detecting
            the user's preferred language, storing translations, and rendering
            content in the appropriate language. Next.js App Router supports
            i18n through routing strategies and libraries like next-intl.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Implementation Approaches:</strong> URL-based routing uses
            the locale in the URL path (e.g., /en/about, /fr/about), making
            locales explicit and SEO-friendly. Cookie/header-based detection
            reads Accept-Language headers or stored preferences. Libraries like
            next-intl provide utilities for translation, date/number formatting,
            and locale-specific content. Middleware can detect locale and
            redirect users to the appropriate language version. Consider
            performance implications - you may need to generate static pages for
            each locale, increasing build time. Always provide a language
            switcher and ensure fallback to a default locale.
          </p>
          <CodeBlock
            code={`// Using next-intl or similar
// app/[locale]/layout.js
export default function LocaleLayout({ children, params }) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  );
}

// Middleware for locale detection
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const locale = request.headers.get('accept-language')?.split(',')[0] || 'en';
  
  if (!request.nextUrl.pathname.startsWith(\`/\${locale}\`)) {
    return NextResponse.redirect(
      new URL(\`/\${locale}\${request.nextUrl.pathname}\`, request.url)
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*|$).*)'],
};`}
            language="javascript"
          />
        </section>

        {/* Multi-tenant */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Multi-tenant Applications
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Multi-tenant applications serve multiple customers (tenants) from a
            single codebase, with each tenant's data isolated. The tenant
            identifier typically comes from the subdomain, path segment, or
            header, and all data operations must be scoped to the current tenant
            to ensure proper isolation.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Implementation Considerations:</strong> Tenant isolation is
            critical - always filter queries by tenant ID, never trust
            client-provided tenant information, and validate tenant access on
            every request. Use middleware to extract and validate tenant
            information before routes execute. Consider database strategies:
            separate databases per tenant (strongest isolation, higher cost),
            shared database with tenant_id columns (most common), or
            schema-per-tenant (middle ground). Cache tenant-specific data
            appropriately, and ensure background jobs and cron tasks respect
            tenant boundaries. Always include tenant validation in your data
            access layer to prevent accidental data leaks between tenants.
          </p>
          <CodeBlock
            code={`// app/[tenant]/layout.js
export default async function TenantLayout({ children, params }) {
  const tenant = await getTenant(params.tenant);
  
  if (!tenant) {
    notFound();
  }
  
  return (
    <div>
      <TenantHeader tenant={tenant} />
      {children}
    </div>
  );
}

// Tenant isolation in data fetching
async function getTenantData(tenantId: string) {
  return db.data.findMany({
    where: { tenantId }, // Always filter by tenant
  });
}

// Middleware for tenant validation
export function middleware(request) {
  const tenant = request.nextUrl.pathname.split('/')[1];
  
  if (!isValidTenant(tenant)) {
    return NextResponse.redirect(new URL('/404', request.url));
  }
  
  return NextResponse.next();
}`}
            language="javascript"
          />
        </section>

        {/* File Upload */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. File Upload & Processing
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            File uploads in Server Actions handle FormData containing File
            objects. Files can be processed, saved to disk, uploaded to cloud
            storage (S3, Cloudinary), or passed to other services. Proper
            validation, size limits, and security measures are essential.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Security & Best Practices:</strong> Always validate file
            types by MIME type (never trust file extensions), enforce size
            limits to prevent DoS attacks, use unique filenames to prevent
            conflicts and directory traversal, store files outside web root or
            in cloud storage, scan files for malware if accepting user uploads,
            and implement rate limiting on upload endpoints. For large files,
            consider using multipart uploads with progress tracking. Use cloud
            storage services (AWS S3, Cloudinary, etc.) rather than local
            storage for scalability and reliability. Generate secure, unique
            filenames and never use user-provided filenames directly.
          </p>
          <CodeBlock
            code={`// Server Action for file upload
'use server';

import { writeFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';

export async function uploadFile(formData) {
  const file = formData.get('file');
  
  if (!file) {
    return { error: 'No file provided' };
  }
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const path = \`./uploads/\${Date.now()}-\${file.name}\`;
  await writeFile(path, buffer);
  
  revalidatePath('/uploads');
  
  return { success: true, path };
}

// Client component
'use client';
import { uploadFile } from './actions';

export default function FileUpload() {
  async function handleSubmit(formData) {
    const result = await uploadFile(formData);
    if (result.error) {
      alert(result.error);
    } else {
      alert('Upload successful!');
    }
  }
  
  return (
    <form action={handleSubmit} encType="multipart/form-data">
      <input type="file" name="file" accept="image/*" />
      <button type="submit">Upload</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Real-time Features */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Real-time Features
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Real-time features require persistent connections between client and
            server to push updates as they happen. Server-Sent Events (SSE)
            provide a simple way to stream data from server to client, while
            WebSockets enable bidirectional communication for more complex
            real-time applications.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Implementation Approaches:</strong> Server-Sent Events (SSE)
            are simpler and one-way (server → client), perfect for live feeds,
            notifications, or progress updates. They use standard HTTP and
            automatically reconnect. WebSockets provide full bidirectional
            communication, better for chat, collaborative editing, or gaming.
            Route Handlers can create streaming responses using ReadableStream
            for SSE. For production applications, consider using dedicated
            services (Pusher, Ably, Socket.io) that handle scaling,
            reconnection, and cross-browser compatibility. Always handle
            connection cleanup, implement reconnection logic, and consider rate
            limiting for real-time endpoints.
          </p>
          <CodeBlock
            code={`// Using Server-Sent Events
// app/api/events/route.js
export async function GET(request) {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      
      const send = (data) => {
        controller.enqueue(encoder.encode(\`data: \${JSON.stringify(data)}\n\n\`));
      };
      
      // Simulate real-time updates
      const interval = setInterval(() => {
        send({ timestamp: Date.now(), data: 'update' });
      }, 1000);
      
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// Client component
'use client';
import { useEffect, useState } from 'react';

export default function RealTimeUpdates() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const eventSource = new EventSource('/api/events');
    
    eventSource.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
    
    return () => eventSource.close();
  }, []);
  
  return <div>{data && <p>{JSON.stringify(data)}</p>}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Analytics */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Analytics & Monitoring
          </h2>
          <CodeBlock
            code={`// Route handler for analytics
// app/api/analytics/route.js
export async function POST(request) {
  const body = await request.json();
  
  // Log to analytics service
  await logEvent({
    event: body.event,
    page: body.page,
    userId: body.userId,
    timestamp: new Date(),
  });
  
  return NextResponse.json({ success: true });
}

// Client component
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function Analytics() {
  const pathname = usePathname();
  
  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'pageview',
        page: pathname,
      }),
    });
  }, [pathname]);
  
  return null;
}`}
            language="javascript"
          />
        </section>

        {/* Error Tracking */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Error Tracking & Logging
          </h2>
          <CodeBlock
            code={`// Error logging utility
// lib/logger.js
export async function logError(error, context) {
  console.error('Error:', error, context);
  
  // Send to error tracking service
  await fetch('https://error-tracking.example.com/api/errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    }),
  });
}

// Error boundary with logging
'use client';
import { logError } from '@/lib/logger';

export default function Error({ error, reset }) {
  useEffect(() => {
    logError(error, { component: 'ErrorBoundary' });
  }, [error]);
  
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Testing Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Testing Strategies
          </h2>
          <CodeBlock
            code={`// Unit test example
// __tests__/actions.test.js
import { createPost } from '@/app/actions';

describe('createPost', () => {
  it('creates a post', async () => {
    const formData = new FormData();
    formData.append('title', 'Test Post');
    formData.append('content', 'Test Content');
    
    const result = await createPost(formData);
    expect(result.success).toBe(true);
  });
});

// Integration test
// __tests__/page.test.js
import { render } from '@testing-library/react';
import Page from '@/app/page';

describe('Page', () => {
  it('renders correctly', async () => {
    const { getByText } = render(await Page());
    expect(getByText('Welcome')).toBeInTheDocument();
  });
});

// E2E test with Playwright
// e2e/app.spec.js
import { test, expect } from '@playwright/test';

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page).toHaveURL('/about');
});`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13/lesson-9"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Best Practices
          </Link>
          <Link
            href="/learn/app-router/b13"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Back to B13 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
