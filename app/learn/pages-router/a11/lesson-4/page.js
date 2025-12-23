import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A11.4: API Routes Reference - Next.js Mastery",
  description: "API routes reference for Next.js Pages Router",
};

export default function Lesson4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a11"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A11 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A11.4: API Routes Reference
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          API routes, HTTP methods, request/response handling, and middleware
          patterns.
        </p>
      </div>

      <div className="space-y-8">
        {/* API Route Basics */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. API Route Basics
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            API Routes in Pages Router allow you to create backend API endpoints
            as serverless functions. Any file inside the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/api/
            </code>{" "}
            directory becomes an API endpoint, accessible via the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /api/
            </code>{" "}
            URL prefix. Each route exports a default handler function that
            receives Node.js{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              req
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              res
            </code>{" "}
            objects.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Concepts:</strong> API routes are serverless functions
            that run on-demand, have access to the full Node.js runtime, and can
            handle any HTTP method. They're perfect for webhooks, form
            submissions, database operations, or proxying requests to external
            APIs. Unlike App Router's Route Handlers, Pages Router API routes
            use a single handler function that checks{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              req.method
            </code>{" "}
            to handle different HTTP methods. Each route file represents one
            endpoint, and the file path determines the URL structure.
          </p>
          <CodeBlock
            code={`// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello World' });
}
// URL: /api/hello

// Multiple HTTP methods
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ method: 'GET' });
  } else if (req.method === 'POST') {
    res.status(200).json({ method: 'POST' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
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
            API routes in Pages Router use a single handler function that checks{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              req.method
            </code>{" "}
            to determine which HTTP method was used. This follows REST
            principles where different methods have different semantics: GET for
            retrieving data, POST for creating resources, PUT for full updates,
            PATCH for partial updates, and DELETE for removing resources.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Best Practices:</strong> Always check the request method and
            return appropriate status codes (200 for success, 201 for created,
            404 for not found, 400 for bad request, 401 for unauthorized, 500
            for server errors). Set the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Allow
            </code>{" "}
            header when returning 405 (Method Not Allowed) to inform clients
            which methods are supported. Use proper HTTP semantics - GET
            requests should be idempotent and not cause side effects, while
            POST/PUT/DELETE are for mutations.
          </p>
          <CodeBlock
            code={`// pages/api/users/index.js
export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Fetch users
      const users = getUsers();
      res.status(200).json(users);
      break;
      
    case 'POST':
      // Create user
      const user = createUser(req.body);
      res.status(201).json(user);
      break;
      
    case 'PUT':
      // Update user
      const updated = updateUser(req.body);
      res.status(200).json(updated);
      break;
      
    case 'PATCH':
      // Partial update
      const patched = patchUser(req.body);
      res.status(200).json(patched);
      break;
      
    case 'DELETE':
      // Delete user
      deleteUser(req.query.id);
      res.status(200).json({ deleted: true });
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
      res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
}`}
            language="javascript"
          />
        </section>

        {/* Request & Response */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Request & Response Objects
          </h2>
          <CodeBlock
            code={`export default function handler(req, res) {
  // Request properties
  const method = req.method;
  const headers = req.headers;
  const cookies = req.cookies;
  const query = req.query; // Query parameters
  const body = req.body; // Parsed body
  
  // Response methods
  res.status(200); // Set status code
  res.json({ data: 'value' }); // Send JSON
  res.send('Text response'); // Send text
  res.redirect('/login'); // Redirect
  res.setHeader('Content-Type', 'application/json'); // Set header
  res.cookie('name', 'value', options); // Set cookie
  res.clearCookie('name'); // Clear cookie
  res.status(200).end(); // End response
}`}
            language="javascript"
          />
        </section>

        {/* Dynamic API Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Dynamic API Routes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Dynamic API routes use the same bracket syntax as pages (
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [id].js
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [...slug].js
            </code>
            ) to create parameterized API endpoints. The route parameters are
            available via{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              req.query
            </code>
            , allowing you to build RESTful APIs with dynamic segments.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Common Patterns:</strong> Single dynamic segments like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [id].js
            </code>{" "}
            are perfect for resource-specific endpoints (GET /api/users/123, PUT
            /api/users/123, DELETE /api/users/123). Catch-all routes{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [...slug].js
            </code>{" "}
            handle variable-depth paths, useful for proxy endpoints or nested
            resource structures. Always validate dynamic parameters before using
            them, as they're user-controlled and could contain malicious input.
            Use the same validation patterns you'd use for any user input - type
            checking, format validation, and sanitization.
          </p>
          <CodeBlock
            code={`// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    const user = getUser(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    const updated = updateUser(id, req.body);
    res.status(200).json(updated);
  } else if (req.method === 'DELETE') {
    deleteUser(id);
    res.status(200).json({ deleted: true });
  }
}

// Catch-all API routes
// pages/api/users/[...params].js
export default function handler(req, res) {
  const { params } = req.query;
  // params = ['123', 'posts', '1']
  // URL: /api/users/123/posts/1
  res.status(200).json({ params });
}`}
            language="javascript"
          />
        </section>

        {/* Body Parsing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Body Parsing & Validation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically parses request bodies based on Content-Type
            headers. JSON bodies are parsed to objects, FormData is available
            for multipart/form-data, and text bodies can be read as strings.
            However, you must always validate and sanitize input data before
            using it, as user input is inherently untrusted.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Validation Best Practices:</strong> Always validate required
            fields, data types, and formats. Check string lengths, numeric
            ranges, and format patterns (emails, URLs, etc.). Use validation
            libraries like Zod, Yup, or Joi for schema-based validation. Never
            trust user input - validate on the server even if you validate on
            the client. Sanitize data to prevent injection attacks (SQL
            injection, XSS). Return clear error messages for validation failures
            (400 status) to help API consumers fix their requests. Validation
            should happen early in the handler, before any processing or
            database operations.
          </p>
          <CodeBlock
            code={`export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  
  // Body is automatically parsed by Next.js
  const { name, email } = req.body;
  
  // Validation
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required',
    });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({
      error: 'Invalid email format',
    });
  }
  
  // Process request
  const user = createUser({ name, email });
  res.status(201).json(user);
}

// Using external validation library
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export default function handler(req, res) {
  try {
    const validated = userSchema.parse(req.body);
    // Process validated data
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
}`}
            language="javascript"
          />
        </section>

        {/* Error Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Error Handling
          </h2>
          <CodeBlock
            code={`export default function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({
        error: 'Method not allowed',
      });
    }
    
    const data = await fetchData();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}

// Custom error handling
class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export default function handler(req, res) {
  try {
    throw new ApiError(404, 'Resource not found');
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json({
        error: error.message,
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
}`}
            language="javascript"
          />
        </section>

        {/* Authentication */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Authentication & Authorization
          </h2>
          <CodeBlock
            code={`// pages/api/protected/route.js
export default function handler(req, res) {
  // Get token from headers or cookies
  const token = req.headers.authorization?.replace('Bearer ', '') ||
                req.cookies.token;
  
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }
  
  // Verify token
  const user = verifyToken(token);
  
  if (!user) {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }
  
  // Authorized - process request
  res.status(200).json({
    message: 'Protected data',
    user,
  });
}

// Role-based authorization
export default function handler(req, res) {
  const user = getCurrentUser(req);
  
  if (user.role !== 'admin') {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }
  
  // Admin only operation
  res.status(200).json({ success: true });
}`}
            language="javascript"
          />
        </section>

        {/* Middleware Pattern */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. API Route Middleware Pattern
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Higher-order functions (HOFs) can wrap API route handlers to add
            cross-cutting concerns like authentication, logging, error handling,
            or rate limiting. This pattern promotes code reuse and separation of
            concerns by extracting common logic into reusable middleware
            functions.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Benefits:</strong> Middleware functions reduce code
            duplication by extracting shared logic. They make routes cleaner and
            more focused on business logic. Middleware can be composed, allowing
            you to chain multiple concerns (authentication → authorization →
            logging → handler). This pattern is particularly useful for
            authentication checks, request logging, error handling, CORS, rate
            limiting, or request transformation. Each middleware function
            receives the handler, can modify the request/response, and must call
            the handler or return early. For interview purposes, understand how
            to compose middleware, handle async operations, and maintain proper
            error propagation.
          </p>
          <CodeBlock
            code={`// Middleware helper
function withAuth(handler) {
  return async (req, res) => {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    req.user = await verifyToken(token);
    return handler(req, res);
  };
}

// Usage
export default withAuth(async function handler(req, res) {
  // req.user is available here
  res.status(200).json({
    message: 'Hello ' + req.user.name,
  });
});

// Multiple middleware
function withAuth(handler) {
  return withRole(['admin', 'user'], handler);
}

function withRole(roles, handler) {
  return async (req, res) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    return handler(req, res);
  };
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a11/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Routing & Navigation
          </Link>
          <Link
            href="/learn/pages-router/a11/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Custom App & Document →
          </Link>
        </div>
      </div>
    </div>
  );
}
