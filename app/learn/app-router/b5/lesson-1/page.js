import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B5.1: Route Handler Basics - Next.js Mastery",
  description: "Complete guide to Route Handler basics in Next.js App Router",
};

export default function Lesson1Page() {
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
          B5.1: Route Handler Basics
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn the fundamentals of Route Handlers: file structure, HTTP
          methods, request/response handling, and TypeScript types.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: File Structure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. File Structure
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Handlers are defined in files named{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              route.js
            </code>{" "}
            (or{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              route.ts
            </code>{" "}
            for TypeScript) within the{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              app
            </code>{" "}
            directory. They create API endpoints.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Route Handler Structure
          </h3>
          <CodeBlock
            code={`// app/api/route.js
export async function GET(request) {
  return Response.json({ message: 'Hello World' });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ received: body });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Route Handler File Locations
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Handlers can be placed at any level of the app directory:
          </p>
          <CodeBlock
            code={`// app/api/route.js
// Handles: /api

// app/api/users/route.js
// Handles: /api/users

// app/api/users/[id]/route.js
// Handles: /api/users/123 (dynamic)

// app/api/posts/[...slug]/route.js
// Handles: /api/posts/a/b/c (catch-all)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Exporting HTTP Method Handlers
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Each HTTP method is handled by exporting a function with the method
            name (GET, POST, PUT, DELETE, etc.).
          </p>
          <CodeBlock
            code={`// app/api/users/route.js
export async function GET() {
  // Handle GET requests
}

export async function POST() {
  // Handle POST requests
}

export async function PUT() {
  // Handle PUT requests
}

export async function DELETE() {
  // Handle DELETE requests
}

// If a method is not exported, requests to that method will return 405 Method Not Allowed`}
            language="javascript"
          />
        </section>

        {/* Section 2: HTTP Methods */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. HTTP Methods
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Handlers support all standard HTTP methods. Each method
            handler receives a Request object and returns a Response.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            GET - Retrieve Data
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js
export async function GET(request) {
  const users = await db.user.findMany();
  
  return Response.json(users, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// With query parameters
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  
  const users = await db.user.findMany({
    skip: (parseInt(page) - 1) * parseInt(limit),
    take: parseInt(limit),
  });
  
  return Response.json(users);
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            POST - Create Data
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;
    
    const user = await db.user.create({
      data: { name, email },
    });
    
    return Response.json(user, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to create user' },
      { status: 400 }
    );
  }
}

// With FormData
export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  
  const user = await db.user.create({
    data: { name, email },
  });
  
  return Response.json(user, { status: 201 });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            PUT - Update/Replace Data
          </h3>
          <CodeBlock
            code={`// app/api/users/[id]/route.js
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  
  const user = await db.user.update({
    where: { id },
    data: body,
  });
  
  return Response.json(user);
}

// Full replacement
export async function PUT(request, { params }) {
  const { id } = params;
  const { name, email, age } = await request.json();
  
  const user = await db.user.update({
    where: { id },
    data: {
      name,
      email,
      age,
      // All other fields are replaced/cleared
    },
  });
  
  return Response.json(user);
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            PATCH - Partial Update
          </h3>
          <CodeBlock
            code={`// app/api/users/[id]/route.js
export async function PATCH(request, { params }) {
  const { id } = params;
  const body = await request.json();
  
  // Only update provided fields
  const user = await db.user.update({
    where: { id },
    data: body, // Only fields in body are updated
  });
  
  return Response.json(user);
}

// Example: Only update email
// PATCH /api/users/123
// Body: { "email": "new@example.com" }
// Only email is updated, other fields remain unchanged`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            DELETE - Remove Data
          </h3>
          <CodeBlock
            code={`// app/api/users/[id]/route.js
export async function DELETE(request, { params }) {
  const { id } = params;
  
  await db.user.delete({
    where: { id },
  });
  
  return new Response(null, { status: 204 });
}

// With error handling
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await db.user.delete({
      where: { id },
    });
    
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error.code === 'P2025') {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return Response.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            HEAD - Get Headers Only
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js
export async function HEAD(request) {
  const count = await db.user.count();
  
  return new Response(null, {
    status: 200,
    headers: {
      'X-Total-Count': count.toString(),
      'Content-Type': 'application/json',
    },
  });
}

// Useful for checking resource existence
export async function HEAD(request, { params }) {
  const { id } = params;
  const user = await db.user.findUnique({ where: { id } });
  
  if (!user) {
    return new Response(null, { status: 404 });
  }
  
  return new Response(null, {
    status: 200,
    headers: {
      'Last-Modified': user.updatedAt.toUTCString(),
    },
  });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            OPTIONS - CORS Preflight
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Or use NextResponse for convenience
import { NextResponse } from 'next/server';

export async function OPTIONS(request) {
  return NextResponse.json(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Request/Response Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Request/Response Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Handlers receive a Request object and return a Response
            object. You can access request data and send various response types.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Request Object Properties
          </h3>
          <CodeBlock
            code={`// app/api/example/route.js
export async function GET(request) {
  // URL and search params
  const url = request.url;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  // Headers
  const headers = request.headers;
  const contentType = request.headers.get('content-type');
  const authorization = request.headers.get('authorization');
  
  // Method
  const method = request.method;
  
  // Body (for POST, PUT, PATCH)
  // const body = await request.json();
  // const formData = await request.formData();
  // const text = await request.text();
  // const blob = await request.blob();
  // const arrayBuffer = await request.arrayBuffer();
  
  return Response.json({
    url,
    id,
    contentType,
    method,
  });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Reading Request Body
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js
export async function POST(request) {
  // JSON body
  const jsonData = await request.json();
  
  // FormData
  const formData = await request.formData();
  const name = formData.get('name');
  const file = formData.get('file');
  
  // Text
  const textData = await request.text();
  
  // ArrayBuffer (for binary data)
  const binaryData = await request.arrayBuffer();
  
  // Blob
  const blobData = await request.blob();
  
  return Response.json({ received: true });
}

// Reading JSON with error handling
export async function POST(request) {
  try {
    const body = await request.json();
    // Process body
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Response Object Creation
          </h3>
          <CodeBlock
            code={`// app/api/example/route.js
export async function GET() {
  // Using Response.json() (most common)
  return Response.json({ message: 'Hello' });
  
  // With status and headers
  return Response.json(
    { message: 'Created' },
    {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'value',
      },
    }
  );
}

// Using new Response()
export async function GET() {
  return new Response('Hello World', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

// JSON string
export async function GET() {
  return new Response(JSON.stringify({ message: 'Hello' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// HTML response
export async function GET() {
  return new Response('<h1>Hello</h1>', {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

// Redirect
export async function GET() {
  return Response.redirect('https://example.com', 302);
}

// Error response
export async function GET() {
  return Response.json(
    { error: 'Not found' },
    { status: 404 }
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using NextResponse
          </h3>
          <CodeBlock
            code={`// app/api/example/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  // JSON response
  return NextResponse.json({ message: 'Hello' });
  
  // With status
  return NextResponse.json(
    { message: 'Created' },
    { status: 201 }
  );
  
  // Redirect
  return NextResponse.redirect('https://example.com');
  
  // Rewrite
  return NextResponse.rewrite('https://example.com');
  
  // With cookies
  const response = NextResponse.json({ message: 'Hello' });
  response.cookies.set('token', 'value', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600,
  });
  return response;
  
  // With headers
  return NextResponse.json(
    { message: 'Hello' },
    {
      headers: {
        'X-Custom-Header': 'value',
      },
    }
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Route Parameters
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

// Multiple parameters
// app/api/posts/[postId]/comments/[commentId]/route.js
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

// Await params in async context
export async function GET(request, { params }) {
  const { id } = await params; // If params is a Promise
  
  return Response.json({ id });
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: TypeScript Types */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. TypeScript Types
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            TypeScript provides excellent type safety for Route Handlers. Use
            proper types for requests, responses, and route parameters.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic TypeScript Route Handler
          </h3>
          <CodeBlock
            code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await db.user.findMany();
  
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const user = await db.user.create({
    data: body,
  });
  
  return NextResponse.json(user, { status: 201 });
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Typed Request Body
          </h3>
          <CodeBlock
            code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
}

export async function POST(request: NextRequest) {
  const body: CreateUserRequest = await request.json();
  
  const user = await db.user.create({
    data: {
      name: body.name,
      email: body.email,
      age: body.age,
    },
  });
  
  return NextResponse.json(user, { status: 201 });
}

// With validation
export async function POST(request: NextRequest) {
  try {
    const body: CreateUserRequest = await request.json();
    
    // Validate
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    const user = await db.user.create({
      data: body,
    });
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Typed Route Parameters
          </h3>
          <CodeBlock
            code={`// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = params;
  
  const user = await db.user.findUnique({
    where: { id },
  });
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(user);
}

// Multiple parameters
// app/api/posts/[postId]/comments/[commentId]/route.ts
interface CommentRouteParams {
  params: {
    postId: string;
    commentId: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: CommentRouteParams
) {
  const { postId, commentId } = params;
  
  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  
  return NextResponse.json(comment);
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Typed Response
          </h3>
          <CodeBlock
            code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

interface UserResponse {
  success: boolean;
  data?: User;
  error?: string;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<UserResponse>> {
  try {
    const users: User[] = await db.user.findMany();
    
    return NextResponse.json({
      success: true,
      data: users[0], // Example: return first user
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user',
      },
      { status: 500 }
    );
  }
}

// Generic response type
type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<User[]>>> {
  try {
    const users = await db.user.findMany();
    
    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch users',
      },
      { status: 500 }
    );
  }
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Query Parameters Types
          </h3>
          <CodeBlock
            code={`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface QueryParams {
  page?: string;
  limit?: string;
  search?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const query: QueryParams = {
    page: searchParams.get('page') || undefined,
    limit: searchParams.get('limit') || undefined,
    search: searchParams.get('search') || undefined,
  };
  
  const page = parseInt(query.page || '1');
  const limit = parseInt(query.limit || '10');
  
  const users = await db.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: query.search
      ? {
          name: {
            contains: query.search,
          },
        }
      : undefined,
  });
  
  return NextResponse.json(users);
}`}
            language="typescript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b4/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B4.3 Server Actions Patterns
          </Link>
          <Link
            href="/learn/app-router/b5/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B5.2 Route Handler Features →
          </Link>
        </div>
      </div>
    </div>
  );
}
