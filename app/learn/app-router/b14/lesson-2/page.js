import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.2: Routing System - Next.js Mastery",
  description:
    "Most asked interview questions on file-based routing, layouts, and advanced routes",
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

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b14"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B14 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B14.2: Routing System
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Most asked interview questions on file-based routing, layouts,
          special files, and advanced routing patterns (maps to B2).
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            How does file-based routing work in App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Folders in{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">app/</code>{" "}
              map to URL segments. A{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">page.js</code>{" "}
              file makes a route publicly accessible.
            </p>
            <CodeBlock
              code={`app/dashboard/settings/page.js  →  /dashboard/settings
app/blog/[slug]/page.js           →  /blog/:slug
app/(shop)/products/page.js       →  /products  (group omitted from URL)`}
              language="text"
            />
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Only page.js (or route.js for APIs) defines a route segment</li>
              <li>layout.js wraps sibling pages and nested routes</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            What is the difference between page.js and layout.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>page.js:</strong> Unique UI for a route segment; renders the actual page content</li>
              <li><strong>layout.js:</strong> Shared UI wrapper; persists across navigations within that segment</li>
              <li>Layouts receive a <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">children</code> prop for nested pages/layouts</li>
              <li>Root layout.js must include html and body tags</li>
            </ul>
            <CodeBlock
              code={`// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div>
      <nav>Dashboard Nav</nav>
      {children}
    </div>
  );
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Do layouts re-render on navigation?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Layouts do <strong>not</strong> re-render
              when navigating between child pages that share the same layout.
              Only the page.js segment and below re-render. Layout state in Client
              Components is preserved during soft navigation.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Shared sidebar/header stays mounted — key UX benefit over Pages Router</li>
              <li>template.js is the exception — it re-mounts on every navigation</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is the difference between template.js and layout.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>layout.js:</strong> Persists across navigations; state preserved</li>
              <li><strong>template.js:</strong> Creates a new instance on every navigation; remounts children</li>
            </ul>
            <p>Use template.js for enter animations, resetting form state on route change, or analytics that fire per navigation.</p>
            <CodeBlock
              code={`// app/dashboard/template.js
export default function Template({ children }) {
  return <div className="animate-fade-in">{children}</div>;
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is loading.js and how does it relate to Suspense?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> loading.js is a convention that automatically
              wraps page.js in a React Suspense boundary with your loading UI as the fallback.
            </p>
            <CodeBlock
              code={`// app/dashboard/loading.js
export default function Loading() {
  return <div className="spinner">Loading dashboard...</div>;
}

// Equivalent to:
// <Suspense fallback={<Loading />}>
//   <Page />
// </Suspense>`}
              language="javascript"
            />
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Enables instant loading states during soft navigation</li>
              <li>Works with streaming — partial UI shows while slow segments load</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Does error.js have to be a Client Component?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Yes. error.js must include{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">&apos;use client&apos;</code>{" "}
              because it uses error boundaries, which require client-side React APIs
              and the reset() function to retry rendering.
            </p>
            <CodeBlock
              code={`'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            When do you use not-found.js vs redirect()?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>not-found.js / notFound():</strong> Resource does not exist — return 404 UI (e.g., invalid blog slug)</li>
              <li><strong>redirect():</strong> Resource moved or user should go elsewhere — 307/308 redirect (e.g., old URL to new URL)</li>
            </ul>
            <CodeBlock
              code={`import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();           // 404 page
  if (post.archived) redirect('/archive');
  return <Article post={post} />;
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is the purpose of route groups (parentheses folders)?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Route groups organize routes without affecting
              the URL. Folders like{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">(marketing)</code>{" "}
              and <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">(shop)</code>{" "}
              are omitted from the path.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Apply different layouts to route sections</li>
              <li>Organize large codebases by feature or team</li>
              <li>Enable multiple root layouts (each group can have its own root layout.js)</li>
            </ul>
            <CodeBlock
              code={`app/(marketing)/about/page.js   → /about
app/(shop)/cart/page.js           → /cart`}
              language="text"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            How do dynamic route params work in Next.js 15+?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> In Next.js 15+,{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">params</code>{" "}
              and <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">searchParams</code>{" "}
              are Promises and must be awaited in Server Components.
            </p>
            <CodeBlock
              code={`// app/blog/[slug]/page.js
export default async function BlogPost({ params, searchParams }) {
  const { slug } = await params;
  const { tab } = await searchParams;
  const post = await getPost(slug);
  return <Article post={post} tab={tab} />;
}`}
              language="javascript"
            />
            <p>This async API enables better static optimization and aligns with streaming.</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is the difference between catch-all and optional catch-all routes?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>[...slug]:</strong> Matches one or more segments — /docs/a, /docs/a/b</li>
              <li><strong>[[...slug]]:</strong> Matches zero or more — also matches /docs (base path)</li>
            </ul>
            <CodeBlock
              code={`app/docs/[...slug]/page.js   // /docs/getting-started — params.slug = ['getting-started']
app/shop/[[...slug]]/page.js   // /shop — params.slug = undefined
                               // /shop/electronics/phones — params.slug = ['electronics','phones']`}
              language="text"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            What are parallel routes and common use cases?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Parallel routes render multiple pages in the
              same layout using named slots (
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">@folder</code>).
            </p>
            <CodeBlock
              code={`app/dashboard/layout.js
app/dashboard/page.js
app/dashboard/@analytics/page.js
app/dashboard/@team/page.js

// layout.js
export default function Layout({ children, analytics, team }) {
  return (
    <>
      {children}
      <div className="grid grid-cols-2">
        {analytics}
        {team}
      </div>
    </>
  );
}`}
              language="javascript"
            />
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Dashboards with independent panels</li>
              <li>Split views that load and navigate independently</li>
              <li>Conditional slots (e.g., @modal for intercepting routes)</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            How do intercepting routes enable modal patterns?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Intercepting routes load a route in the
              current layout while preserving the URL context — ideal for modals
              that overlay the current page on soft navigation.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">(.)</code> — same level</li>
              <li><code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">(..)</code> — one level up</li>
              <li><code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">(...)</code> — from app root</li>
            </ul>
            <CodeBlock
              code={`app/photos/page.js
app/photos/[id]/page.js              // full page on direct visit / refresh
app/@modal/(.)photos/[id]/page.js    // modal overlay on client navigation from /photos`}
              language="text"
            />
            <p>Direct URL visit or refresh still shows the full page — good for shareable links.</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Why is default.js needed for parallel routes?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> When navigating to a URL that does not
              match a parallel slot&apos;s active segment, Next.js needs a fallback.
              default.js renders when a slot has no matching page for the current URL.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Without default.js, unmatched slots may show 404 on hard navigation</li>
              <li>Common pattern: return null from default.js to hide a modal slot</li>
              <li>Preserves slot state during soft navigation when applicable</li>
            </ul>
            <CodeBlock
              code={`// app/@modal/default.js
export default function Default() {
  return null; // hide modal when no intercepting route is active
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            How does nested layout composition work?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Layouts nest automatically by folder depth.
              Each layout wraps its children; the final tree is root → nested layouts → page.
            </p>
            <CodeBlock
              code={`app/layout.js           // wraps everything
  └── app/dashboard/layout.js  // wraps /dashboard/*
        └── app/dashboard/settings/page.js

// Rendered as:
// <RootLayout>
//   <DashboardLayout>
//     <SettingsPage />
//   </DashboardLayout>
// </RootLayout>`}
              language="text"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Can you have multiple root layouts?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Yes, using route groups. Each top-level group
              can define its own layout.js with html/body — useful for completely
              different sections (marketing vs authenticated app).
            </p>
            <CodeBlock
              code={`app/(marketing)/layout.js  // html + body for public pages
app/(app)/layout.js          // html + body for authenticated app`}
              language="text"
            />
            <p>Navigating between different root layout groups triggers a full page load.</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            How do soft navigation and shared layouts work together?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> On Link click, Next.js fetches only changed RSC segments. Shared parent layouts stay mounted — no re-fetch of layout UI, faster transitions, preserved scroll/state in layout Client Components.</p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>loading.js shows in the changing segment while new page streams</li>
              <li>Prefetching on Link hover makes navigation feel instant</li>
              <li>Full reload only when crossing root layout boundaries or hard refresh</li>
            </ul>
          </div>
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b14/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Foundation & Setup
          </Link>
          <Link
            href="/learn/app-router/b14/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Data Fetching →
          </Link>
        </div>
      </div>
    </div>
  );
}
