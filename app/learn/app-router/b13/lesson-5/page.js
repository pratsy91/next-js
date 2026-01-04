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
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Handlers support all standard HTTP methods through named
            exports. Each method has semantic meaning: GET for retrieving data
            (should be idempotent), POST for creating resources, PUT for full
            resource replacement, PATCH for partial updates, and DELETE for
            removing resources. This follows REST principles and allows you to
            build proper RESTful APIs.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Best Practices:</strong> GET requests should be idempotent
            and never cause side effects. POST is typically used for creating
            resources and returns 201 (Created) with the new resource. PUT
            replaces the entire resource, while PATCH updates only specified
            fields. DELETE removes resources and typically returns 204 (No
            Content) or 200 with confirmation. Always return appropriate HTTP
            status codes (200 for success, 201 for created, 400 for bad request,
            401 for unauthorized, 404 for not found, 500 for server errors).
          </p>
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
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Handlers use Web Request and Response APIs, which are standard
            Web APIs available in modern JavaScript runtimes. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NextRequest
            </code>{" "}
            extends the standard Request API with Next.js-specific features,
            while{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NextResponse
            </code>{" "}
            extends Response with additional utilities.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Features:</strong> The Request object provides access to
            URL, headers, cookies, method, and body. You can read the body as
            JSON, FormData, or text depending on the content type. The Response
            object allows setting status codes, headers, and cookies. Unlike
            Pages Router API routes that use Node.js req/res objects, Route
            Handlers use standard Web APIs, making code more portable and
            aligned with web standards. This also enables better compatibility
            with Edge Runtime.
          </p>
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
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Request headers, cookies, and query parameters are three fundamental
            ways to pass data and context in HTTP requests. Each serves
            different purposes: headers contain metadata about the request,
            cookies store persistent client-side data, and query parameters
            provide URL-based data that's visible and shareable. Understanding
            how to read and set these is essential for building robust APIs.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>HTTP Headers:</strong> Headers are key-value pairs sent with
            every HTTP request and response. Common request headers include{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Authorization
            </code>{" "}
            for authentication tokens,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Content-Type
            </code>{" "}
            indicating the request body format,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              User-Agent
            </code>{" "}
            identifying the client, and custom headers for application-specific
            data. Response headers control caching (
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Cache-Control
            </code>
            ), CORS policies, and content negotiation. Headers are
            case-insensitive and can contain multiple values for the same key.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Cookies:</strong> Cookies are small pieces of data stored in
            the browser and automatically sent with requests to the same domain.
            They're ideal for authentication tokens, session identifiers, user
            preferences, or tracking data. Unlike headers, cookies persist
            across browser sessions when given an expiration date. Security is
            crucial: use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              httpOnly
            </code>{" "}
            to prevent JavaScript access (preventing XSS attacks),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              secure
            </code>{" "}
            to only send over HTTPS, and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              sameSite
            </code>{" "}
            to prevent CSRF attacks. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              maxAge
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              expires
            </code>{" "}
            options control cookie lifetime.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Query Parameters:</strong> Query parameters are URL-encoded
            key-value pairs appended to URLs after a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              ?
            </code>{" "}
            (e.g.,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /api/users?page=1&limit=10
            </code>
            ). They're perfect for filtering, pagination, search terms, or any
            data that should be shareable via URL. Query parameters are visible
            in URLs, browser history, and server logs, so never put sensitive
            data (passwords, tokens) in them. Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              searchParams.get()
            </code>{" "}
            for single values and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              searchParams.getAll()
            </code>{" "}
            for parameters that appear multiple times (like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              ?tag=react&tag=nextjs
            </code>
            ).
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>When to Use Each:</strong> Use headers for request metadata
            (authentication, content type, caching directives), cookies for
            persistent client data (session tokens, user preferences), and query
            parameters for shareable, URL-based data (filters, pagination,
            search). Headers are not persisted and must be set on every request.
            Cookies persist automatically until expiration. Query parameters are
            visible in URLs, making them ideal for shareable links and
            bookmarkable states. Always validate and sanitize input from all
            three sources, as they're all user-controlled and potentially
            malicious.
          </p>
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
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Streaming responses allow you to send data incrementally to the
            client as it becomes available, rather than waiting for all data to
            be ready. This is useful for long-running operations, Server-Sent
            Events (SSE), or progressive data loading where you want to show
            partial results immediately.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Use Cases:</strong> Streaming is perfect for real-time
            updates (chat applications, live feeds), long-running data
            processing where you can show progress, or when you want to improve
            Time to First Byte (TTFB) by starting to send data before all
            processing is complete. The stream uses the ReadableStream API,
            which is a Web Standard, and you control when data chunks are sent
            using the controller. Set appropriate headers like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Content-Type: text/event-stream
            </code>{" "}
            for SSE or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Cache-Control: no-cache
            </code>{" "}
            to prevent caching of streaming responses.
          </p>
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
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Segment Config allows you to configure route-level behavior
            through exported constants. These settings control rendering
            strategy, caching, runtime environment, and dynamic parameter
            handling. This provides fine-grained control over how each route
            behaves without modifying the actual handler logic.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Options:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              dynamic
            </code>{" "}
            controls whether the route is statically or dynamically rendered,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              dynamicParams
            </code>{" "}
            determines if unknown dynamic segments return 404 or are generated
            on-demand,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidate
            </code>{" "}
            sets ISR revalidation time,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              runtime
            </code>{" "}
            chooses between Node.js and Edge runtime, and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              preferredRegion
            </code>{" "}
            controls geographic deployment. These configs are particularly
            useful for API routes where you want different caching or runtime
            behavior than your pages.
          </p>
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
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Proper error handling in Route Handlers is crucial for building
            robust APIs. Always wrap async operations in try-catch blocks and
            return appropriate HTTP status codes with meaningful error messages.
            Good error handling improves debugging, provides better user
            experience, and helps with monitoring and logging.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Best Practices:</strong> Use try-catch for all async
            operations, return appropriate status codes (400 for client errors
            like validation failures, 401 for authentication issues, 403 for
            authorization problems, 404 for not found, 500 for server errors),
            include error messages in development but sanitize them in
            production, log errors for debugging while not exposing sensitive
            information to clients, and validate input early to catch errors
            before processing. Consider using error classes or error handling
            utilities for consistency across your API.
          </p>
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
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Authentication verifies who the user is, while authorization
            determines what they can do. In Route Handlers, you typically check
            authentication tokens from headers (Authorization header) or
            cookies, verify them (JWT validation, session checks), and then
            check permissions before allowing access to protected resources.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Security Best Practices:</strong> Always validate tokens on
            the server side, never trust client-side authentication alone. Use
            secure, httpOnly cookies for session tokens to prevent XSS attacks.
            Implement proper CORS policies if your API is accessed from
            different origins. Return 401 (Unauthorized) when authentication
            fails and 403 (Forbidden) when authentication succeeds but
            authorization fails. Consider using middleware for route-level
            authentication checks to avoid code duplication. Rate limiting
            should be implemented to prevent brute force attacks on
            authentication endpoints.
          </p>
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
