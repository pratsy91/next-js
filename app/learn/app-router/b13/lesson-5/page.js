import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.5: API Routes & Route Handlers - Next.js Mastery",
  description: "Route handlers and API routes reference for Next.js App Router",
};

export default function Lesson5Page() {
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
          B13.5: API Routes & Route Handlers
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Route handlers, HTTP methods, request/response handling, and API
          patterns.
        </p>
      </div>

      <div className="space-y-8">
        {/* Route Handler Basics */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Route Handler Basics
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Handlers (previously called API Routes in Pages Router) are
            server-side endpoints created using{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              route.js
            </code>{" "}
            files in the App Router. They provide full access to Web Request and
            Response APIs, allowing you to create REST endpoints, handle
            webhooks, or build custom API logic. Unlike Pages Router API routes,
            Route Handlers use named exports for HTTP methods (GET, POST, etc.)
            rather than checking{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              req.method
            </code>
            .
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Differences from Pages Router:</strong> Route Handlers
            use the Web Request/Response APIs instead of Node.js req/res
            objects, can export multiple HTTP method functions in a single file,
            and can return different response types including streams. They run
            on the Node.js runtime by default but can be configured to run on
            Edge Runtime for lower latency. Route Handlers are ideal when you
            need a traditional REST API, webhook endpoints, or integration with
            third-party services that expect standard HTTP endpoints.
          </p>
          <CodeBlock
            code={`// app/api/hello/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ message: 'Hello World' });
}

// URL: /api/hello

// Multiple HTTP methods in one file
export async function GET(request) {
  return NextResponse.json({ method: 'GET' });
}

export async function POST(request) {
  return NextResponse.json({ method: 'POST' });
}

export async function PUT(request) {
  return NextResponse.json({ method: 'PUT' });
}

export async function DELETE(request) {
  return NextResponse.json({ method: 'DELETE' });
}

export async function PATCH(request) {
  return NextResponse.json({ method: 'PATCH' });
}`}
            language="javascript"
          />
        </section>

        {/* HTTP Methods */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. HTTP Methods (GET, POST, PUT, DELETE, PATCH)
          </h2>
          <CodeBlock
            code={`// app/api/users/route.js
import { NextResponse } from 'next/server';

// GET - Fetch resources
export async function GET(request) {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

// POST - Create resource
export async function POST(request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}

// PUT - Update/replace resource
export async function PUT(request) {
  const { id, ...data } = await request.json();
  const user = await db.user.update({
    where: { id },
    data,
  });
  return NextResponse.json(user);
}

// PATCH - Partial update
export async function PATCH(request) {
  const { id, ...data } = await request.json();
  const user = await db.user.update({
    where: { id },
    data,
  });
  return NextResponse.json(user);
}

// DELETE - Delete resource
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  await db.user.delete({ where: { id } });
  return NextResponse.json({ deleted: true });
}`}
            language="javascript"
          />
        </section>

        {/* Request & Response APIs */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Request & Response APIs
          </h2>
          <CodeBlock
            code={`import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Request properties
  const url = request.url;
  const method = request.method;
  const headers = request.headers;
  const cookies = request.cookies;
  
  // Read body
  const body = await request.json(); // JSON
  const formData = await request.formData(); // Form data
  const text = await request.text(); // Plain text
  
  // Query parameters
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  // Response
  return NextResponse.json(
    { data: 'value' },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Custom-Header': 'value',
      },
      statusText: 'OK',
    }
  );
}`}
            language="javascript"
          />
        </section>

        {/* Headers, Cookies, Query Params */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Headers, Cookies, & Query Params
          </h2>
          <CodeBlock
            code={`export async function GET(request) {
  // Headers
  const authHeader = request.headers.get('authorization');
  const userAgent = request.headers.get('user-agent');
  
  // Cookies
  const token = request.cookies.get('token');
  const allCookies = request.cookies.getAll();
  
  // Set cookies in response
  const response = NextResponse.json({ data: 'value' });
  response.cookies.set('session', 'abc123', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  
  // Query parameters
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const tags = searchParams.getAll('tag'); // Multiple values
  
  return response;
}`}
            language="javascript"
          />
        </section>

        {/* Streaming Responses */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Streaming Responses
          </h2>
          <CodeBlock
            code={`import { NextResponse } from 'next/server';

export async function GET(request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        controller.enqueue(encoder.encode(\`Data chunk \${i}\n\`));
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      controller.close();
    },
  });
  
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}`}
            language="javascript"
          />
        </section>

        {/* Route Segment Config */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Route Segment Config
          </h2>
          <CodeBlock
            code={`// app/api/data/route.js
export const dynamic = 'force-dynamic'; // or 'auto', 'force-static'
export const dynamicParams = true; // Handle dynamic segments
export const revalidate = 60; // ISR revalidation
export const fetchCache = 'auto'; // Cache behavior
export const runtime = 'nodejs'; // or 'edge'
export const preferredRegion = 'auto'; // or specific region

export async function GET(request) {
  return NextResponse.json({ data: 'value' });
}

// Edge Runtime example
export const runtime = 'edge';

export async function GET(request) {
  // Limited APIs in Edge Runtime
  return NextResponse.json({ data: 'value' });
}`}
            language="javascript"
          />
        </section>

        {/* Error Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. API Error Handling
          </h2>
          <CodeBlock
            code={`import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// Validation error
export async function POST(request) {
  const body = await request.json();
  
  if (!body.email) {
    return NextResponse.json(
      { error: 'Email required' },
      { status: 400 }
    );
  }
  
  // Process...
}

// Not found
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  const item = await db.item.findUnique({ where: { id } });
  
  if (!item) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(item);
}`}
            language="javascript"
          />
        </section>

        {/* Authentication */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Authentication & Authorization
          </h2>
          <CodeBlock
            code={`import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  const token = request.cookies.get('token');
  
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const user = await verifyToken(token.value);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
  
  // Authorized - return data
  const data = await getProtectedData(user.id);
  return NextResponse.json(data);
}

// Role-based authorization
export async function DELETE(request) {
  const user = await getCurrentUser(request);
  
  if (user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }
  
  // Admin only operation
  await deleteResource();
  return NextResponse.json({ success: true });
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Server Actions & Forms
          </Link>
          <Link
            href="/learn/app-router/b13/lesson-6"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Metadata & SEO →
          </Link>
        </div>
      </div>
    </div>
  );
}
