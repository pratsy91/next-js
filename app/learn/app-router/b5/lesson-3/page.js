import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B5.3: Route Handler Patterns - Next.js Mastery",
  description: "Complete guide to Route Handler patterns and best practices",
};

export default function Lesson3Page() {
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
          B5.3: Route Handler Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn advanced patterns for Route Handlers: RESTful API design, error
          handling, authentication, file uploads, webhooks, and response
          streaming.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: RESTful API Design */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. RESTful API Design
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Follow REST principles to design clean, predictable APIs. Use proper
            HTTP methods, status codes, and resource naming.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            RESTful Resource Structure
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js - Collection endpoint
export async function GET() {
  // GET /api/users - List all users
  const users = await db.user.findMany();
  return Response.json(users);
}

export async function POST(request) {
  // POST /api/users - Create new user
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return Response.json(user, { status: 201 });
}

// app/api/users/[id]/route.js - Individual resource endpoint
export async function GET(request, { params }) {
  // GET /api/users/123 - Get specific user
  const { id } = params;
  const user = await db.user.findUnique({ where: { id } });
  
  if (!user) {
    return Response.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }
  
  return Response.json(user);
}

export async function PUT(request, { params }) {
  // PUT /api/users/123 - Replace user
  const { id } = params;
  const body = await request.json();
  const user = await db.user.update({
    where: { id },
    data: body,
  });
  return Response.json(user);
}

export async function PATCH(request, { params }) {
  // PATCH /api/users/123 - Partial update
  const { id } = params;
  const body = await request.json();
  const user = await db.user.update({
    where: { id },
    data: body,
  });
  return Response.json(user);
}

export async function DELETE(request, { params }) {
  // DELETE /api/users/123 - Delete user
  const { id } = params;
  await db.user.delete({ where: { id } });
  return new Response(null, { status: 204 });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Resources
          </h3>
          <CodeBlock
            code={`// app/api/users/[userId]/posts/route.js - Nested collection
export async function GET(request, { params }) {
  // GET /api/users/123/posts - Get user's posts
  const { userId } = params;
  const posts = await db.post.findMany({
    where: { userId },
  });
  return Response.json(posts);
}

export async function POST(request, { params }) {
  // POST /api/users/123/posts - Create post for user
  const { userId } = params;
  const body = await request.json();
  const post = await db.post.create({
    data: {
      ...body,
      userId,
    },
  });
  return Response.json(post, { status: 201 });
}

// app/api/users/[userId]/posts/[postId]/route.js - Nested resource
export async function GET(request, { params }) {
  // GET /api/users/123/posts/456 - Get specific post
  const { userId, postId } = params;
  const post = await db.post.findFirst({
    where: {
      id: postId,
      userId,
    },
  });
  
  if (!post) {
    return Response.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }
  
  return Response.json(post);
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Query Parameters and Filtering
          </h3>
          <CodeBlock
            code={`// app/api/users/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Pagination
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;
  
  // Filtering
  const search = searchParams.get('search');
  const status = searchParams.get('status');
  
  // Sorting
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  
  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
    ];
  }
  if (status) {
    where.status = status;
  }
  
  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    db.user.count({ where }),
  ]);
  
  return Response.json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Error Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Error Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement consistent error handling across your API. Use proper HTTP
            status codes and error response formats.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Standardized Error Response
          </h3>
          <CodeBlock
            code={`// lib/api-error.js
export class ApiError extends Error {
  constructor(message, statusCode = 500, code = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function createErrorResponse(error, defaultMessage = 'An error occurred') {
  if (error instanceof ApiError) {
    return Response.json(
      {
        error: {
          message: error.message,
          code: error.code || 'ERROR',
        },
      },
      { status: error.statusCode }
    );
  }
  
  // Log unexpected errors
  console.error('Unexpected error:', error);
  
  return Response.json(
    {
      error: {
        message: defaultMessage,
        code: 'INTERNAL_ERROR',
      },
    },
    { status: 500 }
  );
}

// app/api/users/route.js
import { ApiError, createErrorResponse } from '@/lib/api-error';

export async function GET() {
  try {
    const users = await db.user.findMany();
    return Response.json(users);
  } catch (error) {
    return createErrorResponse(error, 'Failed to fetch users');
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.email) {
      throw new ApiError(
        'Name and email are required',
        400,
        'VALIDATION_ERROR'
      );
    }
    
    const user = await db.user.create({ data: body });
    return Response.json(user, { status: 201 });
  } catch (error) {
    return createErrorResponse(error, 'Failed to create user');
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error Handling Middleware
          </h3>
          <CodeBlock
            code={`// lib/error-handler.js
export function withErrorHandler(handler) {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error('Route handler error:', error);
      
      if (error instanceof ApiError) {
        return Response.json(
          {
            error: {
              message: error.message,
              code: error.code,
            },
          },
          { status: error.statusCode }
        );
      }
      
      // Database errors
      if (error.code === 'P2002') {
        return Response.json(
          {
            error: {
              message: 'Duplicate entry',
              code: 'DUPLICATE_ERROR',
            },
          },
          { status: 409 }
        );
      }
      
      if (error.code === 'P2025') {
        return Response.json(
          {
            error: {
              message: 'Record not found',
              code: 'NOT_FOUND',
            },
          },
          { status: 404 }
        );
      }
      
      // Default error
      return Response.json(
        {
          error: {
            message: 'Internal server error',
            code: 'INTERNAL_ERROR',
          },
        },
        { status: 500 }
      );
    }
  };
}

// Usage
import { withErrorHandler } from '@/lib/error-handler';

async function handler(request) {
  const users = await db.user.findMany();
  return Response.json(users);
}

export const GET = withErrorHandler(handler);`}
            language="javascript"
          />
        </section>

        {/* Section 3: Authentication */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Authentication
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement authentication in Route Handlers using various methods:
            JWT tokens, API keys, session cookies, etc.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            JWT Token Authentication
          </h3>
          <CodeBlock
            code={`// lib/auth.js
import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getAuthToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

// app/api/users/route.js
import { verifyToken, getAuthToken } from '@/lib/auth';

export async function GET(request) {
  const token = getAuthToken(request);
  
  if (!token) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const user = verifyToken(token);
  
  if (!user) {
    return Response.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
  
  const users = await db.user.findMany();
  return Response.json(users);
}

// Authentication middleware
export function withAuth(handler) {
  return async (request, context) => {
    const token = getAuthToken(request);
    
    if (!token) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const user = verifyToken(token);
    
    if (!user) {
      return Response.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Add user to request context
    request.user = user;
    
    return handler(request, context);
  };
}

// Usage
async function handler(request) {
  // request.user is available
  const users = await db.user.findMany();
  return Response.json(users);
}

export const GET = withAuth(handler);`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            API Key Authentication
          </h3>
          <CodeBlock
            code={`// lib/api-key.js
export function verifyApiKey(apiKey) {
  const validKeys = process.env.API_KEYS?.split(',') || [];
  return validKeys.includes(apiKey);
}

export function getApiKey(request) {
  // Check header
  const headerKey = request.headers.get('x-api-key');
  if (headerKey) return headerKey;
  
  // Check query parameter
  const { searchParams } = new URL(request.url);
  return searchParams.get('apiKey');
}

// app/api/data/route.js
import { verifyApiKey, getApiKey } from '@/lib/api-key';

export async function GET(request) {
  const apiKey = getApiKey(request);
  
  if (!apiKey || !verifyApiKey(apiKey)) {
    return Response.json(
      { error: 'Invalid API key' },
      { status: 401 }
    );
  }
  
  const data = await fetchData();
  return Response.json(data);
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: File Uploads */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. File Uploads
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Handle file uploads in Route Handlers. Process multipart/form-data
            and save files to storage.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic File Upload
          </h3>
          <CodeBlock
            code={`// app/api/upload/route.js
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save file
    const filename = \`\${Date.now()}-\${file.name}\`;
    const filepath = join(process.cwd(), 'public', 'uploads', filename);
    await writeFile(filepath, buffer);
    
    return Response.json({
      success: true,
      filename,
      url: \`/uploads/\${filename}\`,
      size: file.size,
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            File Upload with Validation
          </h3>
          <CodeBlock
            code={`// app/api/upload/route.js
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  
  if (!file) {
    return Response.json(
      { error: 'No file provided' },
      { status: 400 }
    );
  }
  
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return Response.json(
      { error: 'Invalid file type' },
      { status: 400 }
    );
  }
  
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return Response.json(
      { error: 'File too large' },
      { status: 400 }
    );
  }
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const filename = \`\${Date.now()}-\${file.name}\`;
  const filepath = join(process.cwd(), 'public', 'uploads', filename);
  await writeFile(filepath, buffer);
  
  return Response.json({
    success: true,
    filename,
    url: \`/uploads/\${filename}\`,
  });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple File Upload
          </h3>
          <CodeBlock
            code={`// app/api/upload/route.js
export async function POST(request) {
  const formData = await request.formData();
  const files = formData.getAll('files');
  
  if (files.length === 0) {
    return Response.json(
      { error: 'No files provided' },
      { status: 400 }
    );
  }
  
  const uploadedFiles = [];
  
  for (const file of files) {
    if (file.size === 0) continue;
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filename = \`\${Date.now()}-\${file.name}\`;
    const filepath = join(process.cwd(), 'public', 'uploads', filename);
    await writeFile(filepath, buffer);
    
    uploadedFiles.push({
      originalName: file.name,
      filename,
      url: \`/uploads/\${filename}\`,
      size: file.size,
    });
  }
  
  return Response.json({
    success: true,
    files: uploadedFiles,
  });
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Webhooks */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Webhooks
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Handle incoming webhooks from external services. Verify signatures
            and process webhook events.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Webhook Handler
          </h3>
          <CodeBlock
            code={`// app/api/webhooks/stripe/route.js
export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  // Verify webhook signature
  const isValid = verifyStripeSignature(body, signature);
  
  if (!isValid) {
    return Response.json(
      { error: 'Invalid signature' },
      { status: 401 }
    );
  }
  
  const event = JSON.parse(body);
  
  // Process webhook event
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    case 'payment_intent.failed':
      await handlePaymentFailure(event.data.object);
      break;
    default:
      console.log(\`Unhandled event type: \${event.type}\`);
  }
  
  return Response.json({ received: true });
}

function verifyStripeSignature(body, signature) {
  // Implement signature verification
  // This is a simplified example
  const expectedSignature = crypto
    .createHmac('sha256', process.env.STRIPE_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
  
  return signature === expectedSignature;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            GitHub Webhook Handler
          </h3>
          <CodeBlock
            code={`// app/api/webhooks/github/route.js
import crypto from 'crypto';

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('x-hub-signature-256');
  
  // Verify GitHub webhook signature
  const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(body).digest('hex');
  
  if (signature !== digest) {
    return Response.json(
      { error: 'Invalid signature' },
      { status: 401 }
    );
  }
  
  const event = JSON.parse(body);
  const eventType = request.headers.get('x-github-event');
  
  // Process GitHub webhook
  switch (eventType) {
    case 'push':
      await handlePush(event);
      break;
    case 'pull_request':
      await handlePullRequest(event);
      break;
    case 'issues':
      await handleIssue(event);
      break;
    default:
      console.log(\`Unhandled event: \${eventType}\`);
  }
  
  return Response.json({ received: true });
}

async function handlePush(event) {
  // Process push event
  console.log('Push event:', event.repository.name);
}

async function handlePullRequest(event) {
  // Process pull request event
  console.log('PR event:', event.action);
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Response Streaming */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Response Streaming
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Stream responses for real-time data, large datasets, or progressive
            rendering.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server-Sent Events (SSE)
          </h3>
          <CodeBlock
            code={`// app/api/events/route.js
export async function GET() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data) => {
        const message = \`data: \${JSON.stringify(data)}\\n\\n\`;
        controller.enqueue(encoder.encode(message));
      };
      
      // Send initial connection message
      sendEvent({ type: 'connected', timestamp: Date.now() });
      
      // Send periodic updates
      const interval = setInterval(() => {
        sendEvent({
          type: 'update',
          data: { time: new Date().toISOString() },
        });
      }, 1000);
      
      // Clean up on client disconnect
      // Note: In production, you'd handle client disconnection properly
      setTimeout(() => {
        clearInterval(interval);
        sendEvent({ type: 'closed' });
        controller.close();
      }, 60000); // Close after 60 seconds
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
            Streaming Large Dataset
          </h3>
          <CodeBlock
            code={`// app/api/users/stream/route.js
export async function GET() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Stream users in batches
        const batchSize = 100;
        let skip = 0;
        let hasMore = true;
        
        while (hasMore) {
          const users = await db.user.findMany({
            skip,
            take: batchSize,
          });
          
          if (users.length === 0) {
            hasMore = false;
            break;
          }
          
          // Send each user as a JSON line
          for (const user of users) {
            const line = JSON.stringify(user) + '\\n';
            controller.enqueue(encoder.encode(line));
          }
          
          skip += batchSize;
          
          // Small delay to prevent overwhelming
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
        
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Transfer-Encoding': 'chunked',
    },
  });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Progressive Data Loading
          </h3>
          <CodeBlock
            code={`// app/api/data/progressive/route.js
export async function GET() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial data immediately
      controller.enqueue(
        encoder.encode(JSON.stringify({ status: 'loading', data: [] }) + '\\n')
      );
      
      // Fetch and send data progressively
      const fetchData = async () => {
        // Fast data (cached)
        const fastData = await getCachedData();
        controller.enqueue(
          encoder.encode(
            JSON.stringify({ status: 'partial', data: fastData }) + '\\n'
          )
        );
        
        // Slow data (database)
        const slowData = await getDatabaseData();
        controller.enqueue(
          encoder.encode(
            JSON.stringify({ status: 'complete', data: slowData }) + '\\n'
          )
        );
        
        controller.close();
      };
      
      fetchData().catch((error) => {
        controller.enqueue(
          encoder.encode(
            JSON.stringify({ status: 'error', error: error.message }) + '\\n'
          )
        );
        controller.close();
      });
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Transfer-Encoding': 'chunked',
    },
  });
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b5/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B5.2 Route Handler Features
          </Link>
          <Link
            href="/learn/app-router/b6"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B6 Navigation & Routing →
          </Link>
        </div>
      </div>
    </div>
  );
}
