import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C2.8: API Routes - Next.js Mastery",
  description: "API route differences between App Router and Pages Router",
};

export default function Lesson8Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c2"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C2 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C2.8: API Routes
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Compare API routes: Pages Router uses pages/api/ with default export,
          App Router uses app/api/route.js with named exports.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Pages Router: pages/api/ with Default Export
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router API routes use a default export handler function.
          </p>

          <CodeBlock
            code={`// Pages Router: API route
// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    res.status(201).json({ message: 'Created' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
}

// Dynamic routes
// pages/api/posts/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    res.json({ id, title: 'Post' });
  }
}

// Catch-all routes
// pages/api/posts/[...slug].js
export default function handler(req, res) {
  const { slug } = req.query;
  // slug is an array: ['a', 'b', 'c']
}

// Request/Response objects
export default function handler(req, res) {
  // req: Node.js request object
  // res: Node.js response object
  
  // Access query params
  const { id } = req.query;
  
  // Access body
  const body = req.body;
  
  // Set headers
  res.setHeader('Content-Type', 'application/json');
  
  // Send response
  res.status(200).json({ data: 'value' });
}`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. App Router: app/api/route.js with Named Exports
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router API routes use named exports for HTTP methods.
          </p>

          <CodeBlock
            code={`// App Router: API route
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ users: [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: 'Created' }, { status: 201 });
}

// Dynamic routes
// app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ id: params.id, title: 'Post' });
}

// Catch-all routes
// app/api/posts/[...slug]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  return NextResponse.json({ slug: params.slug });
}

// Request/Response objects
export async function GET(request: NextRequest) {
  // request: Web API Request object
  // Use NextResponse for responses
  
  // Access query params
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  // Access body
  const body = await request.json();
  
  // Set headers
  const response = NextResponse.json({ data: 'value' });
  response.headers.set('Custom-Header', 'value');
  
  return response;
}

// Route segment config
export const runtime = 'edge'; // or 'nodejs'
export const dynamic = 'force-dynamic';
export const revalidate = 60;`}
            language="typescript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Comparison
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Key differences in API routes.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Pages Router
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    App Router
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Directory
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    pages/api/
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    app/api/
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    File Name
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    users.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    route.js/route.ts
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Export
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    default export handler
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    named exports (GET, POST, etc.)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Request Object
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Node.js req
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Web API Request
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Response Object
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Node.js res
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    NextResponse
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Method Handling
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Manual (req.method)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Named export per method
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Edge Runtime
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    config.runtime
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    export const runtime
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c2/lesson-7"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C2.7 Error Handling
          </Link>
          <Link
            href="/learn/comparison/c2/lesson-9"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C2.9 Special Features →
          </Link>
        </div>
      </div>
    </div>
  );
}
