import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B5.2: Route Handler Features - Next.js Mastery",
  description: "Complete guide to Route Handler features in Next.js App Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b5"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B5 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B5.2: Route Handler Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn advanced Route Handler features: dynamic routes, catch-all
          routes, route segment config, Edge/Node.js runtime, streaming
          responses, and CORS handling.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Dynamic Route Handlers */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Dynamic Route Handlers
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Dynamic routes use square brackets{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              [param]
            </code>{" "}
            in the folder name to create dynamic route segments.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Single Dynamic Parameter
          </h3>
          <CodeBlock
            code={`// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params;
  
  const user = await db.user.findUnique({
    where: { id },
  });
  
  if (!user) {
    return Response.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }
  
  return Response.json(user);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  
  const user = await db.user.update({
    where: { id },
    data: body,
  });
  
  return Response.json(user);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  
  await db.user.delete({
    where: { id },
  });
  
  return new Response(null, { status: 204 });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Dynamic Parameters
          </h3>
          <CodeBlock
            code={`// app/api/posts/[postId]/comments/[commentId]/route.js
export async function GET(request, { params }) {
  const { postId, commentId } = params;
  
  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  
  return Response.json(comment);
}

// app/api/users/[userId]/posts/[postId]/route.js
export async function GET(request, { params }) {
  const { userId, postId } = params;
  
  const post = await db.post.findFirst({
    where: {
      id: postId,
      userId: userId,
    },
  });
  
  return Response.json(post);
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Catch-All Route Handlers */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Catch-All Route Handlers
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Catch-all routes use{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              [...slug]
            </code>{" "}
            to match multiple segments. The parameter is an array of all
            segments.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Catch-All Route
          </h3>
          <CodeBlock
            code={`// app/api/posts/[...slug]/route.js
export async function GET(request, { params }) {
  const { slug } = params;
  
  // slug is an array: ['a', 'b', 'c'] for /api/posts/a/b/c
  console.log(slug); // ['a', 'b', 'c']
  
  // Use slug array to navigate nested resources
  if (slug.length === 1) {
    // /api/posts/category
    const category = slug[0];
    const posts = await db.post.findMany({
      where: { category },
    });
    return Response.json(posts);
  }
  
  if (slug.length === 2) {
    // /api/posts/category/tag
    const [category, tag] = slug;
    const posts = await db.post.findMany({
      where: { category, tags: { has: tag } },
    });
    return Response.json(posts);
  }
  
  return Response.json(
    { error: 'Invalid route' },
    { status: 400 }
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Catch-All for API Proxy
          </h3>
          <CodeBlock
            code={`// app/api/proxy/[...path]/route.js
export async function GET(request, { params }) {
  const { path } = params;
  const pathString = path.join('/');
  
  // Proxy to external API
  const response = await fetch(
    \`https://api.example.com/\${pathString}\`,
    {
      headers: {
        'Authorization': request.headers.get('authorization') || '',
      },
    }
  );
  
  const data = await response.json();
  return Response.json(data);
}

export async function POST(request, { params }) {
  const { path } = params;
  const pathString = path.join('/');
  const body = await request.json();
  
  const response = await fetch(
    \`https://api.example.com/\${pathString}\`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
      },
      body: JSON.stringify(body),
    }
  );
  
  const data = await response.json();
  return Response.json(data, { status: response.status });
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Optional Catch-All */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Optional Catch-All
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Optional catch-all routes use{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              [[...slug]]
            </code>{" "}
            (double brackets) to match zero or more segments. The parameter can
            be undefined.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Optional Catch-All Example
          </h3>
          <CodeBlock
            code={`// app/api/docs/[[...slug]]/route.js
export async function GET(request, { params }) {
  const { slug } = params;
  
  // /api/docs -> slug is undefined
  // /api/docs/getting-started -> slug is ['getting-started']
  // /api/docs/getting-started/installation -> slug is ['getting-started', 'installation']
  
  if (!slug || slug.length === 0) {
    // Return docs index
    return Response.json({
      title: 'Documentation',
      sections: ['getting-started', 'api', 'examples'],
    });
  }
  
  // Handle specific doc path
  const docPath = slug.join('/');
  const doc = await getDoc(docPath);
  
  if (!doc) {
    return Response.json(
      { error: 'Document not found' },
      { status: 404 }
    );
  }
  
  return Response.json(doc);
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Route Segment Config */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Route Segment Config
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Segment Config exports configuration options that control how
            the route is rendered, cached, and accessed.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Route Segment
          </h3>
          <CodeBlock
            code={`// app/api/users/[id]/route.js
export const dynamic = 'force-dynamic'; // or 'auto' | 'force-dynamic' | 'error' | 'force-static'

export async function GET(request, { params }) {
  const { id } = params;
  // This route will always be rendered dynamically
  const user = await db.user.findUnique({ where: { id } });
  return Response.json(user);
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Route Segment Config Options
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js
// Dynamic rendering
export const dynamic = 'force-dynamic'; // Always dynamic
export const dynamic = 'auto'; // Default, dynamic when needed
export const dynamic = 'error'; // Error if dynamic is needed
export const dynamic = 'force-static'; // Always static

// Revalidation
export const revalidate = 60; // Revalidate every 60 seconds
export const revalidate = false; // Never revalidate (static)

// Fetch cache
export const fetchCache = 'auto'; // Default
export const fetchCache = 'default-cache';
export const fetchCache = 'only-cache';
export const fetchCache = 'force-cache';
export const fetchCache = 'force-no-store';
export const fetchCache = 'default-no-store';
export const fetchCache = 'only-no-store';

// Runtime
export const runtime = 'nodejs'; // Node.js runtime
export const runtime = 'edge'; // Edge runtime

// Preferred region
export const preferredRegion = 'auto';
export const preferredRegion = 'home';
export const preferredRegion = ['iad1', 'sfo1'];

// Example with multiple options
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'edge';

export async function GET() {
  return Response.json({ message: 'Dynamic edge route' });
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Edge Runtime */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Edge Runtime
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Edge Runtime runs on the Edge Network, providing low latency and
            global distribution. It has limitations but is faster for simple
            operations.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Edge Route Handler
          </h3>
          <CodeBlock
            code={`// app/api/hello/route.js
export const runtime = 'edge';

export async function GET(request) {
  return Response.json({
    message: 'Hello from Edge Runtime',
    timestamp: new Date().toISOString(),
  });
}

// Edge runtime has access to:
// - Web APIs (fetch, Request, Response, Headers, etc.)
// - URL, URLSearchParams
// - TextEncoder, TextDecoder
// - crypto (Web Crypto API)
// - AbortController, AbortSignal`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Edge Runtime Limitations
          </h3>
          <CodeBlock
            code={`// app/api/example/route.js
export const runtime = 'edge';

export async function GET(request) {
  // ✅ Available in Edge Runtime:
  // - fetch()
  // - Web APIs
  // - crypto
  // - Headers, URL, etc.
  
  // ❌ NOT Available in Edge Runtime:
  // - Node.js APIs (fs, path, etc.)
  // - Database clients that use Node.js APIs
  // - Some npm packages that depend on Node.js
  
  // Example: Using fetch (available)
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  
  return Response.json(data);
}

// Edge-compatible database client
import { createClient } from '@vercel/postgres';

export const runtime = 'edge';

export async function GET() {
  const client = createClient();
  const { rows } = await client.sql\`SELECT * FROM users\`;
  return Response.json(rows);
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Node.js Runtime */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Node.js Runtime
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Node.js Runtime (default) has full access to Node.js APIs and is
            better for complex operations, database access, and file system
            operations.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Node.js Route Handler
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js
export const runtime = 'nodejs'; // Default, can be omitted

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  // Full Node.js API access
  const filePath = join(process.cwd(), 'data', 'users.json');
  const data = await readFile(filePath, 'utf-8');
  const users = JSON.parse(data);
  
  return Response.json(users);
}

export async function POST(request) {
  const body = await request.json();
  
  // Use Node.js APIs
  const filePath = join(process.cwd(), 'data', 'users.json');
  const existingData = await readFile(filePath, 'utf-8');
  const users = JSON.parse(existingData);
  users.push(body);
  
  await writeFile(filePath, JSON.stringify(users, null, 2));
  
  return Response.json(body, { status: 201 });
}

// Database access (Node.js compatible)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}`}
            language="javascript"
          />
        </section>

        {/* Section 7: Streaming Responses */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Streaming Responses
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Streaming allows you to send data incrementally to the client,
            useful for large responses or real-time data.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Streaming Response
          </h3>
          <CodeBlock
            code={`// app/api/stream/route.js
export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        const data = encoder.encode(\`Data chunk \${i}\\n\`);
        controller.enqueue(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      controller.close();
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    },
  });
}

// Server-Sent Events (SSE)
export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data) => {
        const message = \`data: \${JSON.stringify(data)}\\n\\n\`;
        controller.enqueue(encoder.encode(message));
      };
      
      // Send events periodically
      const interval = setInterval(() => {
        sendEvent({ time: new Date().toISOString() });
      }, 1000);
      
      // Clean up after 30 seconds
      setTimeout(() => {
        clearInterval(interval);
        controller.close();
      }, 30000);
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Streaming Large Data
          </h3>
          <CodeBlock
            code={`// app/api/large-data/route.js
export async function GET() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Stream large dataset
        const cursor = await db.user.findMany({
          take: 1000,
        });
        
        for (const user of cursor) {
          const chunk = JSON.stringify(user) + '\\n';
          controller.enqueue(encoder.encode(chunk));
        }
        
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson', // Newline-delimited JSON
      'Transfer-Encoding': 'chunked',
    },
  });
}`}
            language="javascript"
          />
        </section>

        {/* Section 8: CORS Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. CORS Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            CORS (Cross-Origin Resource Sharing) allows your API to be accessed
            from different origins. Handle CORS headers in your Route Handlers.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic CORS Setup
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js
export async function GET(request) {
  const users = await db.user.findMany();
  
  return Response.json(users, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Handle OPTIONS for preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours
    },
  });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            CORS Helper Function
          </h3>
          <CodeBlock
            code={`// lib/cors.js
export function corsHeaders(origin) {
  const allowedOrigins = [
    'https://example.com',
    'https://app.example.com',
    'http://localhost:3000',
  ];
  
  const isAllowed = allowedOrigins.includes(origin);
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// app/api/users/route.js
import { corsHeaders } from '@/lib/cors';

export async function GET(request) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);
  
  const users = await db.user.findMany();
  
  return Response.json(users, { headers });
}

export async function OPTIONS(request) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);
  
  return new Response(null, {
    status: 200,
    headers: {
      ...headers,
      'Access-Control-Max-Age': '86400',
    },
  });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            CORS Middleware Pattern
          </h3>
          <CodeBlock
            code={`// lib/middleware.js
export function withCORS(handler) {
  return async (request, context) => {
    const origin = request.headers.get('origin');
    const corsHeaders = {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }
    
    // Call handler and add CORS headers
    const response = await handler(request, context);
    
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  };
}

// app/api/users/route.js
import { withCORS } from '@/lib/middleware';

async function handler(request) {
  const users = await db.user.findMany();
  return Response.json(users);
}

export const GET = withCORS(handler);
export const POST = withCORS(async (request) => {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return Response.json(user, { status: 201 });
});`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b5/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B5.1 Route Handler Basics
          </Link>
          <Link
            href="/learn/app-router/b5/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B5.3 Route Handler Patterns →
          </Link>
        </div>
      </div>
    </div>
  );
}
