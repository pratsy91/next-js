import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A4.1: API Route Basics - Next.js Mastery",
  description: "Complete guide to API route basics in Next.js Pages Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a4"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A4 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A4.1: API Route Basics
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn the fundamentals of creating API routes in Next.js Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: File Structure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. File Structure (pages/api/)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            API routes are created by adding files to the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/api/
            </code>{" "}
            directory. Each file becomes an API endpoint.
          </p>

          <CodeBlock
            code={`pages/
└── api/
    ├── hello.js              → /api/hello
    ├── users.js              → /api/users
    ├── posts/
    │   ├── index.js          → /api/posts
    │   └── [id].js           → /api/posts/:id
    └── auth/
        ├── login.js          → /api/auth/login
        └── logout.js         → /api/auth/logout`}
            language="text"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic API Route File
          </h3>
          <CodeBlock
            code={`// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API' });
}

// Access at: http://localhost:3000/api/hello`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Points
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              Files in{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                pages/api/
              </code>{" "}
              become API endpoints
            </li>
            <li>Route paths match the file structure</li>
            <li>API routes run only on the server</li>
            <li>They don't increase client-side bundle size</li>
            <li>Can use all Node.js features</li>
          </ul>
        </section>

        {/* Section 2: Route Handlers */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Route Handlers (All HTTP Methods)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Handle different HTTP methods by checking{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              req.method
            </code>
            .
          </p>

          <CodeBlock
            code={`// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    // Handle POST request
    const { name, email } = req.body;
    res.status(201).json({ message: 'User created', user: { name, email } });
  } else if (req.method === 'PUT') {
    // Handle PUT request
    res.status(200).json({ message: 'User updated' });
  } else if (req.method === 'DELETE') {
    // Handle DELETE request
    res.status(200).json({ message: 'User deleted' });
  } else if (req.method === 'PATCH') {
    // Handle PATCH request
    res.status(200).json({ message: 'User partially updated' });
  } else if (req.method === 'HEAD') {
    // Handle HEAD request
    res.status(200).end();
  } else if (req.method === 'OPTIONS') {
    // Handle OPTIONS request (CORS preflight)
    res.status(200).end();
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']);
    res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using Switch Statement
          </h3>
          <CodeBlock
            code={`export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    case 'PATCH':
      return handlePatch(req, res);
    case 'HEAD':
      return res.status(200).end();
    case 'OPTIONS':
      return res.status(200).end();
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
      return res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
}

async function handleGet(req, res) {
  const users = await getUsers();
  res.status(200).json(users);
}

async function handlePost(req, res) {
  const user = await createUser(req.body);
  res.status(201).json(user);
}

// ... other handlers`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            HTTP Methods Overview
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Purpose
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Idempotent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      GET
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Retrieve data
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Yes
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      POST
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Create resource
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ No
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      PUT
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Replace resource
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Yes
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      DELETE
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Delete resource
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Yes
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      PATCH
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Partial update
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ No
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      HEAD
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Get headers only
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Yes
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      OPTIONS
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    CORS preflight
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Yes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Request/Response Objects */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Request/Response Objects
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The handler receives Node.js request and response objects with
            Next.js extensions.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Request Object (req)
          </h3>
          <CodeBlock
            code={`export default function handler(req, res) {
  // HTTP method
  const method = req.method; // 'GET', 'POST', etc.
  
  // Query parameters
  const { id, page } = req.query; // { id: '123', page: '2' }
  
  // Request body (parsed automatically for JSON)
  const body = req.body; // Parsed JSON or raw body
  
  // Headers
  const contentType = req.headers['content-type'];
  const authorization = req.headers.authorization;
  const userAgent = req.headers['user-agent'];
  
  // Cookies
  const token = req.cookies.token;
  
  // URL
  const url = req.url; // '/api/users?id=123'
  
  // IP address
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // HTTP version
  const httpVersion = req.httpVersion;
  
  // Check if request is secure
  const isSecure = req.headers['x-forwarded-proto'] === 'https';
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Response Object (res)
          </h3>
          <CodeBlock
            code={`export default function handler(req, res) {
  // Set status code
  res.status(200);
  res.status(404);
  res.status(500);
  
  // Send JSON response
  res.json({ message: 'Success', data: {} });
  
  // Send text response
  res.send('Hello World');
  
  // Send HTML response
  res.send('<h1>Hello</h1>');
  
  // Set headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Custom-Header', 'value');
  
  // Set multiple headers
  res.setHeader('Set-Cookie', [
    'token=abc123; HttpOnly; Secure',
    'session=xyz789; HttpOnly',
  ]);
  
  // Redirect
  res.redirect(302, '/login');
  res.redirect('/login'); // Default 307
  
  // End response
  res.end();
  
  // Set status and end
  res.status(404).end();
  
  // Chain methods
  res.status(200).json({ success: true });
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
            Use TypeScript types for type-safe API routes.
          </p>

          <CodeBlock
            code={`// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
  id: string;
  name: string;
  email: string;
};

type Data = {
  users?: User[];
  message?: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const users: User[] = [
      { id: '1', name: 'John', email: 'john@example.com' },
    ];
    res.status(200).json({ users });
  } else if (req.method === 'POST') {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' });
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
    };
    
    res.status(201).json({ users: [newUser] });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: \`Method \${req.method} not allowed\` });
  }
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Typed Request Body
          </h3>
          <CodeBlock
            code={`import type { NextApiRequest, NextApiResponse } from 'next';

type CreateUserRequest = {
  name: string;
  email: string;
  age?: number;
};

type CreateUserResponse = {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
};

export default function handler(
  req: NextApiRequest & { body: CreateUserRequest },
  res: NextApiResponse<CreateUserResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  
  const { name, email, age } = req.body;
  
  // TypeScript knows the types
  const user = {
    id: '1',
    name, // string
    email, // string
    age, // number | undefined
  };
  
  res.status(201).json({ success: true, user });
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Typed Query Parameters
          </h3>
          <CodeBlock
            code={`// pages/api/posts/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';

type QueryParams = {
  id: string;
};

type Data = {
  post?: {
    id: string;
    title: string;
  };
  error?: string;
};

export default function handler(
  req: NextApiRequest<QueryParams>,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  
  // TypeScript knows id is string
  const post = {
    id,
    title: 'Post Title',
  };
  
  res.status(200).json({ post });
}`}
            language="typescript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to A4 Lessons
          </Link>
          <Link
            href="/learn/pages-router/a4/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A4.2 API Route Features →
          </Link>
        </div>
      </div>
    </div>
  );
}
