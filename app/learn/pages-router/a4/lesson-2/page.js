import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A4.2: API Route Features - Next.js Mastery",
  description:
    "Complete guide to advanced API route features in Next.js Pages Router",
};

export default function Lesson2Page() {
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
          A4.2: API Route Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn advanced API route features: dynamic routes, middleware, CORS,
          authentication, file uploads, streaming, and Edge runtime.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Dynamic API Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Dynamic API Routes (pages/api/posts/[id].js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create dynamic API routes using square brackets in the filename.
          </p>

          <CodeBlock
            code={`// pages/api/posts/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    // Get post by ID
    const post = getPostById(id);
    res.status(200).json(post);
  } else if (req.method === 'PUT') {
    // Update post
    const updatedPost = updatePost(id, req.body);
    res.status(200).json(updatedPost);
  } else if (req.method === 'DELETE') {
    // Delete post
    deletePost(id);
    res.status(204).end();
  }
}

// Access at:
// GET /api/posts/123
// PUT /api/posts/123
// DELETE /api/posts/123`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Dynamic Segments
          </h3>
          <CodeBlock
            code={`// pages/api/posts/[postId]/comments/[commentId].js
export default function handler(req, res) {
  const { postId, commentId } = req.query;
  
  // Access at: /api/posts/123/comments/456
  // req.query = { postId: '123', commentId: '456' }
  
  if (req.method === 'GET') {
    const comment = getComment(postId, commentId);
    res.status(200).json(comment);
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Catch-all API Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Catch-all API Routes (pages/api/[...params].js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use three dots to create catch-all routes that match multiple path
            segments.
          </p>

          <CodeBlock
            code={`// pages/api/docs/[...slug].js
export default function handler(req, res) {
  const { slug } = req.query;
  
  // slug is an array:
  // /api/docs → slug = []
  // /api/docs/getting-started → slug = ['getting-started']
  // /api/docs/getting-started/installation → slug = ['getting-started', 'installation']
  
  const path = slug ? slug.join('/') : 'index';
  const content = getDocContent(path);
  
  res.status(200).json({ path, content });
}

// Access at:
// GET /api/docs
// GET /api/docs/getting-started
// GET /api/docs/getting-started/installation`}
            language="javascript"
          />
        </section>

        {/* Section 3: Optional Catch-all */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Optional Catch-all (pages/api/[[...params]].js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use double brackets for optional catch-all routes that match both
            the base path and nested paths.
          </p>

          <CodeBlock
            code={`// pages/api/shop/[[...slug]].js
export default function handler(req, res) {
  const { slug } = req.query;
  
  // Matches:
  // /api/shop → slug = undefined
  // /api/shop/electronics → slug = ['electronics']
  // /api/shop/electronics/laptops → slug = ['electronics', 'laptops']
  
  if (!slug) {
    // Return all categories
    return res.status(200).json({ categories: getAllCategories() });
  }
  
  // Return products for the path
  const products = getProductsByPath(slug);
  res.status(200).json({ products });
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Middleware in API Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Middleware in API Routes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create reusable middleware functions for authentication, logging,
            and more.
          </p>

          <CodeBlock
            code={`// lib/api-middleware.js
export function withAuth(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const user = await verifyToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Attach user to request
    req.user = user;
    
    return handler(req, res);
  };
}

export function withLogging(handler) {
  return async (req, res) => {
    const start = Date.now();
    console.log(\`\${req.method} \${req.url}\`);
    
    await handler(req, res);
    
    const duration = Date.now() - start;
    console.log(\`\${req.method} \${req.url} - \${res.statusCode} - \${duration}ms\`);
  };
}

// pages/api/protected.js
import { withAuth, withLogging } from '../../lib/api-middleware';

async function handler(req, res) {
  // req.user is available from withAuth
  res.status(200).json({ user: req.user });
}

export default withLogging(withAuth(handler));`}
            language="javascript"
          />
        </section>

        {/* Section 5: CORS Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. CORS Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Handle Cross-Origin Resource Sharing (CORS) for API routes accessed
            from different domains.
          </p>

          <CodeBlock
            code={`// pages/api/cors-example.js
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  // Or specific origin:
  // res.setHeader('Access-Control-Allow-Origin', 'https://example.com');
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle actual request
  res.status(200).json({ message: 'CORS enabled' });
}

// Reusable CORS middleware
function cors(handler) {
  return async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    return handler(req, res);
  };
}

export default cors(handler);`}
            language="javascript"
          />
        </section>

        {/* Section 6: Authentication */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Authentication in API Routes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement authentication in API routes using tokens, sessions, or
            other methods.
          </p>

          <CodeBlock
            code={`// pages/api/protected.js
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.substring(7);
  
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // Continue with protected logic
    res.status(200).json({ message: 'Protected data', user: req.user });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Using cookies for authentication
export default async function handler(req, res) {
  const sessionId = req.cookies.sessionId;
  
  if (!sessionId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  const session = await getSession(sessionId);
  
  if (!session || session.expires < Date.now()) {
    return res.status(401).json({ error: 'Session expired' });
  }
  
  req.user = session.user;
  res.status(200).json({ data: 'Protected content' });
}

// Using API keys
export default function handler(req, res) {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  res.status(200).json({ data: 'Authorized' });
}`}
            language="javascript"
          />
        </section>

        {/* Section 7: File Uploads */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. File Uploads
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Handle file uploads in API routes using form-data parsing libraries.
          </p>

          <CodeBlock
            code={`// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const form = formidable({
    uploadDir: './public/uploads',
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    const file = files.file;
    const oldPath = file.filepath;
    const newPath = path.join('./public/uploads', file.originalFilename);
    
    // Move file to final location
    fs.renameSync(oldPath, newPath);
    
    res.status(200).json({
      message: 'File uploaded',
      filename: file.originalFilename,
      size: file.size,
      path: \`/uploads/\${file.originalFilename}\`,
    });
  });
}

// Using multer (alternative)
import multer from 'multer';

const upload = multer({
  dest: './public/uploads',
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    res.status(200).json({
      message: 'File uploaded',
      filename: req.file.filename,
    });
  });
}`}
            language="javascript"
          />
        </section>

        {/* Section 8: Streaming Responses */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Streaming Responses
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Stream responses for large datasets or real-time data.
          </p>

          <CodeBlock
            code={`// pages/api/stream.js
export default function handler(req, res) {
  // Set headers for streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Send data in chunks
  let count = 0;
  const interval = setInterval(() => {
    count++;
    res.write(\`data: \${JSON.stringify({ count, time: Date.now() })}\\n\\n\`);
    
    if (count >= 10) {
      clearInterval(interval);
      res.end();
    }
  }, 1000);
  
  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
}

// Streaming large JSON response
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  // Start JSON array
  res.write('[');
  
  const data = await getLargeDataset();
  let first = true;
  
  for (const item of data) {
    if (!first) res.write(',');
    res.write(JSON.stringify(item));
    first = false;
  }
  
  // End JSON array
  res.write(']');
  res.end();
}`}
            language="javascript"
          />
        </section>

        {/* Section 9: Edge Runtime */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            9. Edge Runtime in API Routes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use Edge Runtime for faster, globally distributed API routes with
            reduced cold start times.
          </p>

          <CodeBlock
            code={`// pages/api/edge-example.js
export const config = {
  runtime: 'edge', // Use Edge Runtime
};

export default function handler(req) {
  // Edge Runtime uses Web APIs, not Node.js APIs
  // No access to: fs, path, crypto (Node.js), etc.
  // Has access to: fetch, Headers, Request, Response, etc.
  
  const url = new URL(req.url);
  const name = url.searchParams.get('name') || 'World';
  
  return new Response(
    JSON.stringify({ message: \`Hello, \${name}!\` }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

// Edge Runtime with fetch
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Limitations of Edge Runtime:
// - No Node.js APIs (fs, path, crypto, etc.)
// - Smaller bundle size limit
// - Different request/response objects
// - Faster cold starts
// - Global distribution`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            When to Use Edge Runtime
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Simple API routes that don't need Node.js APIs</li>
            <li>Routes that need low latency and global distribution</li>
            <li>Routes that primarily use fetch and Web APIs</li>
            <li>Routes that need fast cold starts</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a4/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A4.1 API Route Basics
          </Link>
          <Link
            href="/learn/pages-router/a4/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A4.3 API Route Patterns →
          </Link>
        </div>
      </div>
    </div>
  );
}
