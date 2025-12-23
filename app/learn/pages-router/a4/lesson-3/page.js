import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A4.3: API Route Patterns - Next.js Mastery",
  description:
    "Complete guide to API route patterns and best practices in Next.js Pages Router",
};

export default function Lesson3Page() {
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
          A4.3: API Route Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn best practices for designing RESTful APIs, handling errors,
          formatting responses, and managing requests.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: RESTful API Design */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. RESTful API Design
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Follow REST principles for clean, predictable API design.
          </p>

          <CodeBlock
            code={`// RESTful API structure
// GET    /api/posts          → List all posts
// GET    /api/posts/:id      → Get single post
// POST   /api/posts          → Create new post
// PUT    /api/posts/:id      → Update entire post
// PATCH  /api/posts/:id      → Partially update post
// DELETE /api/posts/:id      → Delete post

// pages/api/posts/index.js - List and create
export default function handler(req, res) {
  if (req.method === 'GET') {
    // GET /api/posts
    const posts = getAllPosts();
    res.status(200).json({ posts });
  } else if (req.method === 'POST') {
    // POST /api/posts
    const newPost = createPost(req.body);
    res.status(201).json({ post: newPost });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// pages/api/posts/[id].js - Get, update, delete
export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    // GET /api/posts/:id
    const post = getPostById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ post });
  } else if (req.method === 'PUT') {
    // PUT /api/posts/:id
    const updatedPost = updatePost(id, req.body);
    res.status(200).json({ post: updatedPost });
  } else if (req.method === 'PATCH') {
    // PATCH /api/posts/:id
    const updatedPost = partialUpdatePost(id, req.body);
    res.status(200).json({ post: updatedPost });
  } else if (req.method === 'DELETE') {
    // DELETE /api/posts/:id
    deletePost(id);
    res.status(204).end();
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            RESTful Best Practices
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Use nouns for resources, not verbs</li>
            <li>Use HTTP methods correctly (GET, POST, PUT, PATCH, DELETE)</li>
            <li>Use proper status codes</li>
            <li>Return consistent response formats</li>
            <li>Use plural nouns for collections</li>
            <li>
              Nest resources for relationships:{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                /api/posts/:id/comments
              </code>
            </li>
          </ul>
        </section>

        {/* Section 2: Error Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Error Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement consistent error handling across your API routes.
          </p>

          <CodeBlock
            code={`// lib/api-error.js
export class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function handleError(error, res) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        details: error.details,
      },
    });
  }
  
  // Log unexpected errors
  console.error('Unexpected error:', error);
  
  // Don't expose internal errors in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : error.message;
  
  return res.status(500).json({
    error: {
      message,
    },
  });
}

// pages/api/posts/[id].js
import { ApiError, handleError } from '../../../lib/api-error';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    
    if (req.method === 'GET') {
      const post = await getPostById(id);
      
      if (!post) {
        throw new ApiError(404, 'Post not found');
      }
      
      res.status(200).json({ post });
    } else if (req.method === 'POST') {
      const { title, content } = req.body;
      
      if (!title || !content) {
        throw new ApiError(400, 'Title and content are required', {
          missing: {
            title: !title,
            content: !content,
          },
        });
      }
      
      const post = await createPost({ title, content });
      res.status(201).json({ post });
    }
  } catch (error) {
    return handleError(error, res);
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Response Formatting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Response Formatting
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use consistent response formats for better API usability.
          </p>

          <CodeBlock
            code={`// Standard success response format
export default function handler(req, res) {
  const data = { id: 1, name: 'John' };
  
  // Single resource
  res.status(200).json({
    success: true,
    data: data,
  });
  
  // Collection
  res.status(200).json({
    success: true,
    data: [data],
    meta: {
      total: 1,
      page: 1,
      limit: 10,
    },
  });
  
  // Error response
  res.status(400).json({
    success: false,
    error: {
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: {
        field: 'email',
        reason: 'Invalid email format',
      },
    },
  });
}

// Response wrapper utility
function successResponse(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
  });
}

function errorResponse(res, message, statusCode = 400, details = null) {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      details,
    },
  });
}

// Usage
export default function handler(req, res) {
  if (req.method === 'GET') {
    const posts = getPosts();
    return successResponse(res, posts);
  }
  
  return errorResponse(res, 'Method not allowed', 405);
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Status Codes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Status Codes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use appropriate HTTP status codes to communicate request results.
          </p>

          <CodeBlock
            code={`export default function handler(req, res) {
  // 2xx Success
  res.status(200).json({ message: 'OK' }); // Success
  res.status(201).json({ message: 'Created' }); // Resource created
  res.status(204).end(); // No content (successful delete)
  
  // 4xx Client Errors
  res.status(400).json({ error: 'Bad Request' }); // Invalid input
  res.status(401).json({ error: 'Unauthorized' }); // Not authenticated
  res.status(403).json({ error: 'Forbidden' }); // Authenticated but not authorized
  res.status(404).json({ error: 'Not Found' }); // Resource not found
  res.status(405).json({ error: 'Method Not Allowed' }); // Wrong HTTP method
  res.status(409).json({ error: 'Conflict' }); // Resource conflict
  res.status(422).json({ error: 'Unprocessable Entity' }); // Validation error
  res.status(429).json({ error: 'Too Many Requests' }); // Rate limit
  
  // 5xx Server Errors
  res.status(500).json({ error: 'Internal Server Error' }); // Server error
  res.status(502).json({ error: 'Bad Gateway' }); // Upstream error
  res.status(503).json({ error: 'Service Unavailable' }); // Temporarily unavailable
}

// Common status code patterns
export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = getData();
    if (!data) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.status(200).json({ data });
  }
  
  if (req.method === 'POST') {
    try {
      const newData = createData(req.body);
      return res.status(201).json({ data: newData });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(422).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal error' });
    }
  }
  
  if (req.method === 'DELETE') {
    const deleted = deleteData(req.query.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.status(204).end();
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Headers Manipulation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Headers Manipulation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set and read HTTP headers for caching, security, and metadata.
          </p>

          <CodeBlock
            code={`export default function handler(req, res) {
  // Set single header
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('X-Custom-Header', 'value');
  
  // Set multiple headers
  res.setHeader('Set-Cookie', [
    'token=abc123; HttpOnly; Secure; SameSite=Strict',
    'session=xyz789; HttpOnly',
  ]);
  
  // Read request headers
  const contentType = req.headers['content-type'];
  const authorization = req.headers.authorization;
  const userAgent = req.headers['user-agent'];
  
  // Common headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  res.status(200).json({ message: 'Headers set' });
}

// Caching headers
export default function handler(req, res) {
  // No cache
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Cache for 1 hour
  res.setHeader('Cache-Control', 'public, max-age=3600');
  
  // Cache with revalidation
  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  
  res.status(200).json({ data: 'cached' });
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Cookies Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Cookies Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Read and set cookies in API routes for session management and
            authentication.
          </p>

          <CodeBlock
            code={`import { serialize } from 'cookie';

export default function handler(req, res) {
  // Read cookies
  const token = req.cookies.token;
  const sessionId = req.cookies.sessionId;
  
  // All cookies
  const allCookies = req.cookies; // { token: 'abc', sessionId: 'xyz' }
  
  // Set cookie
  res.setHeader(
    'Set-Cookie',
    serialize('token', 'abc123', {
      httpOnly: true, // Not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict', // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/', // Available site-wide
    })
  );
  
  // Set multiple cookies
  res.setHeader('Set-Cookie', [
    serialize('token', 'abc123', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    }),
    serialize('session', 'xyz789', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    }),
  ]);
  
  // Delete cookie
  res.setHeader(
    'Set-Cookie',
    serialize('token', '', {
      httpOnly: true,
      expires: new Date(0), // Set to past date
      path: '/',
    })
  );
  
  res.status(200).json({ message: 'Cookie set' });
}

// Login example
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = generateToken(user);
  
  res.setHeader(
    'Set-Cookie',
    serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
  );
  
  res.status(200).json({ user: { id: user.id, email: user.email } });
}`}
            language="javascript"
          />
        </section>

        {/* Section 7: Body Parsing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Body Parsing (JSON, form-data, text)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Parse different request body formats in API routes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            JSON (Default)
          </h3>
          <CodeBlock
            code={`// pages/api/json-example.js
// JSON is parsed automatically by Next.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // req.body is already parsed JSON
    const { name, email } = req.body;
    
    res.status(200).json({
      received: {
        name,
        email,
      },
    });
  }
}

// Client sends:
// Content-Type: application/json
// Body: { "name": "John", "email": "john@example.com" }`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Form Data
          </h3>
          <CodeBlock
            code={`// pages/api/form-example.js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    // For application/x-www-form-urlencoded
    // req.body is parsed automatically
    const { name, email } = req.body;
    
    res.status(200).json({ name, email });
  }
}

// For multipart/form-data (file uploads)
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable default parser
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable();
    
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      
      // fields contains text fields
      // files contains uploaded files
      res.status(200).json({
        fields,
        files,
      });
    });
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Text/Plain
          </h3>
          <CodeBlock
            code={`// pages/api/text-example.js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    // For text/plain, req.body is a string
    const text = req.body;
    
    res.status(200).json({
      received: text,
      length: text.length,
    });
  }
}

// Raw body (disable parsing)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      // body is raw string
      res.status(200).json({ received: body });
    });
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Body Parser Configuration
          </h3>
          <CodeBlock
            code={`// Disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Custom size limit
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

// Custom parser
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default function handler(req, res) {
  // req.body is parsed based on Content-Type header
  // application/json → parsed as JSON
  // application/x-www-form-urlencoded → parsed as object
  // text/plain → parsed as string
  // multipart/form-data → requires custom parsing (formidable, multer, etc.)
  
  res.status(200).json({ body: req.body });
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a4/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A4.2 API Route Features
          </Link>
          <Link
            href="/learn/pages-router/a4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to A4 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
