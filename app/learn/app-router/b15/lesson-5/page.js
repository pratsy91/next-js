import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.5: Route Handler Incidents - Next.js Mastery",
  description:
    "API route outages: Response objects, CORS, webhooks, auth gaps, and edge runtime (maps to B5)",
};

function LevelBadge({ level }) {
  const styles = {
    Junior:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Mid: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Senior: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[level]}`}
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
          href="/learn/app-router/b15"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B15 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B15.5: Route Handler Incidents
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Route Handlers power webhooks and mobile clients until someone returns
          a plain object, forgets OPTIONS, or runs fs on the edge. These twelve
          scenarios show up in senior App Router interviews and real on-call.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            API 500 — must return a Response
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Mobile app calls /api/health and receives 500 with message about
              invalid return value. Handler returns a plain object like in Express res.json shorthand.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              App Router route.js handlers must return Response or a Promise of
              Response. Plain objects are not coerced automatically.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Wrap payloads with Response.json(data, status).</li>
              <li>Use new Response(body, init) for non-JSON.</li>
              <li>Return explicit error responses instead of throwing for expected cases.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — app/api/health/route.js
export async function GET() {
  return { ok: true };
}

// FIXED
export async function GET() {
  return Response.json({ ok: true });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            POST body empty — double JSON parse or wrong content-type
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Frontend sends JSON but server logs empty body. Sometimes request.json()
              throws or returns undefined because the stream was already consumed.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Request body is a one-time readable stream. Calling json() twice fails.
              Form clients sending application/x-www-form-urlencoded need request.formData(), not json().
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Parse once: const body = await request.json() and reuse the variable.</li>
              <li>Match parser to Content-Type header from the client.</li>
              <li>Validate body presence and return 400 with clear message.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN
export async function POST(request) {
  await request.json();
  const data = await request.json(); // empty / fails
  return Response.json(data);
}

// FIXED
export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  return Response.json({ received: data });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            GET handler returns stale JSON forever
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              /api/status serves yesterday deployment flag. Ops toggled feature
              in DB but CDN and fetch cache keep old JSON until redeploy.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Route Handlers participate in caching unless marked dynamic. Default
              fetch caching inside the handler can also reuse Data Cache entries.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>export const dynamic = 'force-dynamic' or revalidate = 0 on the route.</li>
              <li>Use fetch(url, cache: 'no-store') for live status reads inside GET.</li>
              <li>Set Cache-Control: no-store on the Response for operational endpoints.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`export const dynamic = 'force-dynamic';

export async function GET() {
  const status = await db.flag.findFirst();
  return Response.json(status, {
    headers: { 'Cache-Control': 'no-store' },
  });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            CORS error from browser on another origin
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Marketing site on www.example.com fetch to app.example.com/api fails
              preflight. Mobile web view shows blocked by CORS policy.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Browsers enforce cross-origin rules. Route Handlers do not add CORS
              headers automatically. OPTIONS preflight must return allowed methods and headers.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Implement OPTIONS on the same path with Access-Control-Allow-Origin.</li>
              <li>Mirror Allow-Methods and Allow-Headers expected by the client.</li>
              <li>For credentialed requests, set Allow-Credentials and explicit origin, not star.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`const cors = {
  'Access-Control-Allow-Origin': 'https://www.example.com',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: cors });
}

export async function GET() {
  return Response.json({ ok: true }, { headers: cors });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Set-Cookie from Route Handler invisible in browser
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Login API returns 200 and logs Set-Cookie but document.cookie stays
              empty. Safari users never stay signed in.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Cross-site fetch needs SameSite=None; Secure on HTTPS. Missing Path,
              wrong Domain, or setting cookies from a cross-origin XHR without
              credentials: 'include' all break persistence.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Prefer cookies() from next/headers in Server Actions or auth library on same site.</li>
              <li>Set Path=/, HttpOnly, Secure, SameSite=lax or none as appropriate.</li>
              <li>For API routes, use Response headers append Set-Cookie with full attributes.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`import { cookies } from 'next/headers';

export async function POST() {
  const store = await cookies();
  store.set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return Response.json({ ok: true });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Dynamic route id undefined — params is a Promise
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              DELETE /api/users/42 returns 404 user undefined. Logs print params
              as a Promise after Next 15 upgrade.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              In Next 15+, route handler context params is async. Accessing
              params.id synchronously yields undefined behavior.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Signature export async function DELETE(request, context) and await context.params.</li>
              <li>Apply to GET, PATCH, and generateStaticParams siblings for consistency.</li>
              <li>Add integration test hitting the handler with a real param segment.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// app/api/users/[id]/route.js
export async function DELETE(request, { params }) {
  const { id } = await params;
  await db.user.delete({ where: { id } });
  return new Response(null, { status: 204 });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Stripe webhook retries create duplicate charges
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Network blip caused Stripe to retry checkout.session.completed.
              Finance sees two identical orders for one payment intent.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Webhooks guarantee at-least-once delivery. Handlers must be
              idempotent on event.id or payment intent id, not assume one delivery.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Verify signature with stripe.webhooks.constructEvent on raw body.</li>
              <li>Insert processed event id in DB with unique constraint before side effects.</li>
              <li>Return 200 quickly when event already processed.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`export async function POST(request) {
  const sig = request.headers.get('stripe-signature');
  const raw = await request.text();
  const event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);

  const seen = await db.webhookEvent.findUnique({ where: { id: event.id } });
  if (seen) return Response.json({ received: true });

  await db.$transaction([
    db.webhookEvent.create({ data: { id: event.id } }),
    fulfillCheckout(event.data.object),
  ]);
  return Response.json({ received: true });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Unauthenticated DELETE works on production API
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Researcher deletes blog post id 1 with curl -X DELETE. Route existed
              from a tutorial and shipped without auth middleware check.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Route Handlers are public HTTP endpoints. middleware.ts (in Next 16
              increasingly documented alongside proxy.ts naming) can gate paths but
              each mutating handler still needs explicit session and authorization checks.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Call auth() at start of DELETE; return 401 without session.</li>
              <li>Verify resource owner or admin role before db.delete.</li>
              <li>Add middleware matcher for /api/admin and rate limit destructive verbs.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`import { auth } from '@/auth';

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });
  if (!post || post.authorId !== session.user.id) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  await db.post.delete({ where: { id } });
  return new Response(null, { status: 204 });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            fs or Node SDK with runtime edge crashes in prod
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              PDF generation route works locally but 500s in Vercel edge region.
              Error: fs module not found or native binding unavailable.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              export const runtime = 'edge' opts into a limited API surface. Node
              core modules, child_process, and many SDKs require runtime = 'nodejs'.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Remove edge runtime for Node-only code or split edge lightweight routes.</li>
              <li>Set export const runtime = 'nodejs' on handlers using fs or bcrypt.</li>
              <li>Read deployment logs for runtime mismatch, not just local dev defaults.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// app/api/report/route.js
export const runtime = 'nodejs';

import fs from 'fs/promises';

export async function GET() {
  const template = await fs.readFile('./template.html', 'utf8');
  return new Response(template, { headers: { 'Content-Type': 'text/html' } });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Streaming response never flushes
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              AI endpoint should stream tokens but client receives one chunk after
              30 seconds. Developer returned a growing string instead of a ReadableStream.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Response buffers until the handler completes unless you return a
              stream with appropriate headers like text/event-stream or chunked encoding.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Return new Response(readable, headers) where readable enqueues partial data.</li>
              <li>Use TransformStream or AI SDK toReadableStream helpers.</li>
              <li>Disable buffering on proxies where needed for SSE.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`export async function GET() {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  (async () => {
    for (const chunk of ['Hello', ' ', 'world']) {
      await writer.write(new TextEncoder().encode(chunk));
    }
    writer.close();
  })();
  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Large JSON response times out on serverless
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              /api/export returns 80 MB JSON and function hits max duration.
              Clients OOM on mobile when trying to parse at once.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Serverless limits payload size and execution time. Building one giant
              JSON array in memory scales poorly.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Paginate with cursor query params and stable sort keys.</li>
              <li>Stream NDJSON lines or CSV for exports instead of one blob.</li>
              <li>Offload huge exports to a background job and return a download URL.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor');
  const rows = await db.row.findMany({ take: 500, skip: cursor ? 1 : 0, cursor: cursor ? { id: cursor } : undefined });
  return Response.json({ rows, nextCursor: rows.at(-1)?.id ?? null });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Route Handler for simple form — lost progressive enhancement
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Team built POST /api/contact for a marketing form. JS fetch works but
              native submit shows raw JSON in the browser. Product wants same-origin
              form without client bundle for accessibility.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Route Handlers are HTTP APIs — great for webhooks, mobile, and third
              parties. Same-site HTML forms fit Server Actions with built-in POST
              handling and RSC revalidation without manual fetch glue.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use Server Action with form action for first-party mutations and no-JS users.</li>
              <li>Keep Route Handler when external systems POST webhooks or non-browser clients call you.</li>
              <li>If you must keep API route, accept form POST and redirect with 303 See Other after success.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// Prefer Server Action for site form
'use server';
export async function contact(formData) {
  await sendEmail(formData);
  redirect('/thanks');
}

// Webhook stays Route Handler — app/api/stripe/webhook/route.js
export async function POST(request) {
  const event = await verifyStripe(request);
  await handleEvent(event);
  return Response.json({ ok: true });
}`}
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b15/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Server Action Incidents
          </Link>
          <Link
            href="/learn/app-router/b15/lesson-6"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Navigation Incidents →
          </Link>
        </div>
      </div>
    </div>
  );
}
