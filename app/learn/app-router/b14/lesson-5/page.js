import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.5: Route Handlers - Most Asked Interview Q&A",
  description:
    "Most asked Next.js interview questions on Route Handlers: route.js, HTTP methods, NextRequest/NextResponse, cookies, CORS, streaming, and auth",
};

function LevelBadge({ level }) {
  const styles = {
    Junior:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Mid: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Senior:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  };
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${styles[level]}`}
    >
      {level}
    </span>
  );
}

export default function Lesson5Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b14"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B14 Interview Q&A
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B14.5: Route Handlers (B5)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Most asked interview questions on Route Handlers — from junior
          fundamentals to senior API design decisions.
        </p>
      </div>

      <div className="space-y-6">
        {/* Q1 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              1. What are Route Handlers?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Handlers are server-side HTTP endpoints defined in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              route.js
            </code>{" "}
            (or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              route.ts
            </code>
            ) files inside the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app
            </code>{" "}
            directory. They replace Pages Router API routes and let you build
            REST APIs, webhooks, and custom HTTP logic using standard Web
            Request/Response APIs.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Unlike React pages, Route Handlers do not render UI — they only
            handle HTTP requests and return responses. They can live anywhere in
            the app tree (commonly under{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/api/
            </code>
            ) and follow the same file-based routing conventions as pages.
          </p>
          <CodeBlock
            code={`// app/api/health/route.js
export async function GET() {
  return Response.json({ status: 'ok' });
}

// URL: GET /api/health`}
            language="javascript"
          />
        </section>

        {/* Q2 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              2. How do you create GET, POST, PUT, DELETE, and PATCH handlers?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Export named async functions matching HTTP method names from a
            single{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              route.js
            </code>{" "}
            file. Next.js routes incoming requests to the matching export.
            Unsupported methods automatically return{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              405 Method Not Allowed
            </code>
            .
          </p>
          <CodeBlock
            code={`// app/api/users/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}

export async function PUT(request) {
  const { id, ...data } = await request.json();
  const updated = await db.user.update({ where: { id }, data });
  return NextResponse.json(updated);
}

export async function PATCH(request) {
  const { id, ...data } = await request.json();
  const updated = await db.user.update({ where: { id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await db.user.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}`}
            language="javascript"
          />
        </section>

        {/* Q3 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              3. Route Handlers vs Server Actions vs Pages Router API routes?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Route Handlers</strong> are general-purpose HTTP endpoints.
            Use them for REST APIs, webhooks, third-party integrations, mobile
            app backends, or anything that needs standard HTTP semantics
            (status codes, headers, CORS).
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Server Actions</strong> are RPC-style mutations tied to
            forms and React. Use them for in-app data mutations with progressive
            enhancement — not for public APIs or webhooks.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Pages Router API routes</strong> (
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/api/*.js
            </code>
            ) use Node.js{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              req/res
            </code>{" "}
            objects and a single default export. Route Handlers use Web
            Request/Response, support multiple method exports per file, and
            integrate with App Router caching and segment config.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600 dark:text-gray-300">
              <thead>
                <tr className="border-b dark:border-gray-600">
                  <th className="py-2 pr-4 text-left font-semibold">Feature</th>
                  <th className="py-2 pr-4 text-left font-semibold">Route Handler</th>
                  <th className="py-2 pr-4 text-left font-semibold">Server Action</th>
                  <th className="py-2 text-left font-semibold">Pages API</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 pr-4">Protocol</td>
                  <td className="py-2 pr-4">HTTP REST</td>
                  <td className="py-2 pr-4">RPC / form POST</td>
                  <td className="py-2">HTTP REST</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 pr-4">Best for</td>
                  <td className="py-2 pr-4">APIs, webhooks</td>
                  <td className="py-2 pr-4">Form mutations</td>
                  <td className="py-2">Legacy APIs</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">CORS / webhooks</td>
                  <td className="py-2 pr-4">Yes</td>
                  <td className="py-2 pr-4">No</td>
                  <td className="py-2">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Q4 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              4. How do you read the request body, query params, and cookies?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The first argument to every handler is a Web{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Request
            </code>{" "}
            (or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NextRequest
            </code>
            ). Parse query strings via{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              new URL(request.url).searchParams
            </code>
            , JSON bodies via{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              request.json()
            </code>
            , and cookies via the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              cookies()
            </code>{" "}
            helper from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/headers
            </code>
            .
          </p>
          <CodeBlock
            code={`// app/api/search/route.js
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const page = searchParams.get('page') ?? '1';

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  const results = await search(q, { page: Number(page), sessionId });
  return NextResponse.json(results);
}

export async function POST(request) {
  const body = await request.json();
  const formData = await request.formData(); // for multipart forms

  // Dynamic route params come as second argument:
  // export async function GET(request, { params }) { ... }
  return NextResponse.json({ received: body });
}`}
            language="javascript"
          />
        </section>

        {/* Q5 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              5. Why must Route Handlers return a Response?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route Handlers are built on the Web Fetch API standard. The runtime
            expects a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Response
            </code>{" "}
            (or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NextResponse
            </code>
            ) object so it can set status codes, headers, and body correctly.
            Returning nothing or a plain object causes runtime errors.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            This differs from Pages Router API routes where you called{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              res.json()
            </code>{" "}
            imperatively. In App Router, the return value{" "}
            <em>is</em> the response — a functional, composable pattern that
            works identically on Edge and Node runtimes.
          </p>
          <CodeBlock
            code={`// Valid returns:
return Response.json({ ok: true });
return NextResponse.json({ ok: true }, { status: 201 });
return new Response('Plain text', { status: 200 });
return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });

// Invalid — will throw:
// return { ok: true };
// res.json({ ok: true }); // no res object exists`}
            language="javascript"
          />
        </section>

        {/* Q6 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              6. How do dynamic segments work in Route Handlers?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Dynamic folders like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [id]
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [...slug]
            </code>
            , and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [[...slug]]
            </code>{" "}
            work the same as pages. The second argument to the handler receives
            a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              params
            </code>{" "}
            promise (Next.js 15+) containing the captured segments.
          </p>
          <CodeBlock
            code={`// app/api/posts/[id]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

// app/api/files/[...path]/route.js — catch-all
export async function GET(request, { params }) {
  const { path } = await params; // string[]
  const filePath = path.join('/');
  return NextResponse.json({ filePath });
}`}
            language="javascript"
          />
        </section>

        {/* Q7 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              7. How do you stream responses from Route Handlers?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Return a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              ReadableStream
            </code>{" "}
            as the response body for Server-Sent Events, large file downloads,
            or AI token streaming. Set appropriate{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Content-Type
            </code>{" "}
            and caching headers.
          </p>
          <CodeBlock
            code={`// app/api/stream/route.js
export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 5; i++) {
        controller.enqueue(encoder.encode(\`chunk \${i}\\n\`));
        await new Promise((r) => setTimeout(r, 500));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}

// AI streaming example
export async function POST(request) {
  const { prompt } = await request.json();
  const aiStream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of aiStream) {
        const text = chunk.choices[0]?.delta?.content ?? '';
        if (text) controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}`}
            language="javascript"
          />
        </section>

        {/* Q8 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              8. How does caching work for GET Route Handlers?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            GET handlers are static by default if they use no dynamic APIs (
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              cookies()
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              headers()
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              searchParams
            </code>
            ). Opt out with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              export const dynamic = 'force-dynamic'
            </code>{" "}
            or configure fetch cache/revalidate inside the handler.
          </p>
          <CodeBlock
            code={`// app/api/products/route.js
export const revalidate = 60; // ISR-like: revalidate every 60s

export async function GET() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 60, tags: ['products'] },
  }).then((r) => r.json());

  return Response.json(products);
}

// Force dynamic — reads cookies or auth
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  return Response.json({ user: session.user });
}`}
            language="javascript"
          />
        </section>

        {/* Q9 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              9. How do you handle CORS in Route Handlers?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set CORS headers on responses manually, or handle preflight{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              OPTIONS
            </code>{" "}
            requests. For App-wide CORS, prefer{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next.config.js
            </code>{" "}
            headers or Middleware.
          </p>
          <CodeBlock
            code={`// app/api/public/route.js
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  return NextResponse.json(
    { data: 'public' },
    { headers: corsHeaders }
  );
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json(
    { created: body },
    { status: 201, headers: corsHeaders }
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q10 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              10. What are NextRequest and NextResponse?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NextRequest
            </code>{" "}
            extends the Web Request with helpers like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              nextUrl
            </code>{" "}
            (parsed pathname/searchParams),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              cookies
            </code>
            , and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              geo
            </code>
            .{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NextResponse
            </code>{" "}
            extends Response with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              .json()
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              .redirect()
            </code>
            , and cookie manipulation via{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              cookies.set()
            </code>
            .
          </p>
          <CodeBlock
            code={`import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;

  const response = NextResponse.json({ pathname, authenticated: !!token });
  response.cookies.set('visited', 'true', { httpOnly: true, maxAge: 3600 });
  return response;
}

export async function POST(request) {
  const data = await request.json();
  if (!data.email) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.json({ ok: true });
}`}
            language="javascript"
          />
        </section>

        {/* Q11 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              11. How do you implement auth in Route Handlers?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Validate sessions or JWTs on every protected handler. Read tokens
            from cookies or the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Authorization
            </code>{" "}
            header, verify with your auth library (NextAuth, Clerk, custom JWT),
            and return{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              401
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              403
            </code>{" "}
            early. Never trust client-supplied user IDs without server-side
            verification.
          </p>
          <CodeBlock
            code={`// app/api/protected/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  const data = await db.getPrivateData(session.userId);
  return NextResponse.json(data);
}

// Bearer token pattern for mobile/API clients
export async function POST(request) {
  const auth = request.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 });
  }
  const token = auth.slice(7);
  const user = await verifyJwt(token);
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  // ...
}`}
            language="javascript"
          />
        </section>

        {/* Q12 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              12. How do you handle webhooks in Route Handlers?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Webhooks need raw body access for signature verification, fast{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              200
            </code>{" "}
            responses, and idempotent processing. Verify HMAC signatures
            (Stripe, GitHub, etc.) before acting on payload data. Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidateTag
            </code>{" "}
            or background jobs for heavy work.
          </p>
          <CodeBlock
            code={`// app/api/webhooks/stripe/route.js
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { revalidateTag } from 'next/cache';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text(); // raw body for signature
  const sig = (await headers()).get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckout(event.data.object);
      revalidateTag('subscriptions');
      break;
    default:
      console.log(\`Unhandled event: \${event.type}\`);
  }

  return NextResponse.json({ received: true });
}`}
            language="javascript"
          />
        </section>

        {/* Q13 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              13. Edge Runtime vs Node.js Runtime — which to choose?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              export const runtime = 'edge'
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              'nodejs'
            </code>{" "}
            (default). Edge offers lower cold-start latency and global
            distribution but lacks full Node.js APIs (no native fs, limited npm
            packages). Use Edge for auth checks, geo-routing, and lightweight
            transforms; use Node for database drivers, file I/O, and heavy
            libraries.
          </p>
          <CodeBlock
            code={`// app/api/geo/route.js — good Edge candidate
export const runtime = 'edge';

export async function GET(request) {
  const country = request.geo?.country ?? 'US';
  return Response.json({ country });
}

// app/api/upload/route.js — needs Node
export const runtime = 'nodejs';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  // Use Node fs, sharp, prisma, etc.
  return Response.json({ uploaded: true });
}`}
            language="javascript"
          />
        </section>

        {/* Q14 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              14. What are error handling best practices?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Wrap handler logic in try/catch, return meaningful HTTP status
            codes, and never leak stack traces in production. Use consistent
            error response shapes. Log server-side details; return safe messages
            to clients.
          </p>
          <CodeBlock
            code={`// app/api/users/[id]/route.js
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('GET /api/users/[id]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const data = userSchema.parse(body);
    // ...
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', details: error.flatten() } },
        { status: 400 }
      );
    }
    throw error;
  }
}`}
            language="javascript"
          />
        </section>

        {/* Q15 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              15. How do the headers() and cookies() APIs work in handlers?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Import{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              headers
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              cookies
            </code>{" "}
            from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/headers
            </code>{" "}
            to read incoming request metadata. To set response cookies, use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NextResponse.cookies.set()
            </code>
            . Reading these APIs opts the route into dynamic rendering.
          </p>
          <CodeBlock
            code={`import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const headerStore = await headers();
  const userAgent = headerStore.get('user-agent');
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? 'light';

  return NextResponse.json({ userAgent, theme });
}

export async function POST() {
  const response = NextResponse.json({ loggedIn: true });
  response.cookies.set('session', 'abc123', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  response.cookies.delete('temp-token');
  return response;
}`}
            language="javascript"
          />
        </section>

        {/* Q16 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              16. When should you NOT use Route Handlers?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Avoid Route Handlers when:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Mutating from your own React UI</strong> — use Server
              Actions for simpler form flows with built-in revalidation.
            </li>
            <li>
              <strong>Fetching data for Server Components</strong> — fetch
              directly in the component or a server utility; no HTTP round-trip
              needed.
            </li>
            <li>
              <strong>Proxying every request</strong> — use Middleware or{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                next.config.js
              </code>{" "}
              rewrites instead.
            </li>
            <li>
              <strong>Long-running background jobs</strong> — Route Handlers
              have execution time limits; queue work to a job processor.
            </li>
            <li>
              <strong>Replacing Server Actions for internal mutations</strong> —
              adds unnecessary HTTP overhead and loses progressive enhancement.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300">
            Rule of thumb: Route Handlers are for HTTP clients outside your
            React tree (mobile apps, third parties, webhooks). Server Actions
            are for mutations initiated from your UI.
          </p>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b14/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B14.4 Server Actions
          </Link>
          <Link
            href="/learn/app-router/b14/lesson-6"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B14.6 Navigation →
          </Link>
        </div>
      </div>
    </div>
  );
}
