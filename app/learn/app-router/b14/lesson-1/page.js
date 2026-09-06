import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.1: Foundation & Setup - Next.js Mastery",
  description:
    "Most asked interview questions on App Router basics, Server Components, and project setup",
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

export default function Lesson1Page() {
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
          B14.1: Foundation & Setup
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Most asked interview questions on project setup, App Router basics,
          Server vs Client Components, and the RSC mental model (maps to B1).
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            What is App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> App Router is Next.js&apos;s routing
              system built around the <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">app/</code>{" "}
              directory. It uses React Server Components by default, supports
              nested layouts, streaming, Server Actions, and file-based special
              files like <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">loading.js</code>{" "}
              and <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">error.js</code>.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Introduced in Next.js 13; default for new projects in 13+</li>
              <li>Routes are folders; a URL maps to a folder tree under app/</li>
              <li>Coexists with Pages Router (pages/) in the same project during migration</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            What is the difference between App Router and Pages Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Pages Router uses <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">pages/</code>{" "}
              with client-side React by default and data APIs like{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">getServerSideProps</code>.
              App Router uses <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">app/</code>{" "}
              with Server Components by default and async Server Components for data.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>App Router:</strong> nested layouts, RSC, Server Actions, streaming, route.js handlers</li>
              <li><strong>Pages Router:</strong> _app.js/_document.js, getStaticProps/getStaticPaths, pages/api/</li>
              <li><strong>When to choose App Router:</strong> new projects, better performance, modern React features</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            What are Server Components and Client Components?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Server Components render on the server
              only — their JavaScript is not sent to the browser. Client
              Components render on both server (initial HTML) and client (for
              interactivity) and require the{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">&apos;use client&apos;</code>{" "}
              directive at the top of the file.
            </p>
            <CodeBlock
              code={`// Server Component (default) — app/products/page.js
export default async function ProductsPage() {
  const products = await db.product.findMany();
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// Client Component — app/components/Counter.js
'use client';
import { useState } from 'react';
export default function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            When should you use Server Components vs Client Components?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Default to Server Components. Opt into Client Components only when you need client-only capabilities.</p>
            <p><strong>Use Server Components for:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Data fetching (DB, APIs, file system)</li>
              <li>Keeping secrets and large dependencies off the client bundle</li>
              <li>Static or server-rendered content without interactivity</li>
            </ul>
            <p><strong>Use Client Components for:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Event handlers (onClick, onChange)</li>
              <li>React hooks (useState, useEffect, useContext)</li>
              <li>Browser APIs (window, localStorage, geolocation)</li>
              <li>Third-party libraries that rely on hooks or browser APIs</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            What does &apos;use client&apos; do?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> It marks the entry point of the Client
              Component boundary. Everything imported into that file (transitively)
              becomes part of the client bundle unless another boundary splits it.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Must be at the very top of the file (before imports)</li>
              <li>Enables hooks, state, effects, and event listeners</li>
              <li>Does not mean &quot;only runs on client&quot; — still pre-rendered on server for HTML</li>
            </ul>
            <CodeBlock
              code={`'use client'; // boundary starts here

import { useState } from 'react';
import ServerOnlyHelper from './server-only'; // ❌ cannot import Server Component`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Can Server Components import Client Components and vice versa?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>Server → Client:</strong> ✅ Yes. Pass Server-fetched data as props.</li>
              <li><strong>Client → Server:</strong> ❌ No. Client Components cannot import Server Components.</li>
            </ul>
            <p>
              Pattern: Server Component fetches data and wraps a Client leaf for interactivity.
            </p>
            <CodeBlock
              code={`// app/page.js — Server Component
import Counter from './Counter'; // Client Component

export default async function Page() {
  const user = await getUser();
  return (
    <div>
      <h1>Hello {user.name}</h1>
      <Counter initialCount={0} />
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
            Why are Server Components the default in App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Defaulting to Server Components optimizes performance and security out of the box.</p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Smaller JavaScript bundles — server code never ships to the browser</li>
              <li>Direct backend access without exposing API keys</li>
              <li>Faster initial page load — less JS to download, parse, and execute</li>
              <li>Better SEO — fully rendered HTML from the server</li>
              <li>Aligns with React&apos;s direction (RSC is a React feature, not Next-only)</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            What cannot run in Server Components?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Anything that requires the browser or client-only React APIs:</p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>React hooks: useState, useEffect, useReducer, useContext, etc.</li>
              <li>Event handlers: onClick, onChange, onSubmit</li>
              <li>Browser APIs: window, document, localStorage, navigator</li>
              <li>Class components with lifecycle methods tied to client behavior</li>
            </ul>
            <p>Server Components CAN use async/await directly in the component body.</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            How does hydration work with React Server Components?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> The server sends HTML plus an RSC payload (a serialized component tree).
              Server Components are not hydrated — they never run in the browser.
              Only Client Components hydrate: React attaches event listeners and state to existing DOM nodes.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Server renders Server + Client Components to HTML on the server</li>
              <li>RSC payload describes Server Component output for client reconciliation</li>
              <li>Client Components download JS and hydrate their subtrees</li>
              <li>Mismatch between server HTML and client render causes hydration errors</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            What is the typical project structure of the app/ directory?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <CodeBlock
              code={`app/
├── layout.js          # Root layout (required html/body)
├── page.js            # Home route (/)
├── globals.css
├── favicon.ico
├── (marketing)/       # Route group — not in URL
│   └── about/page.js  # /about
├── blog/
│   ├── layout.js      # Nested layout for /blog/*
│   ├── page.js        # /blog
│   └── [slug]/page.js # /blog/my-post
├── api/
│   └── hello/route.js # Route Handler — /api/hello
└── components/        # Not a route — no page.js`}
              language="text"
            />
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Only folders with page.js (or route.js) create URL segments</li>
              <li>Colocate components, lib, and utils inside app/ or use src/app/</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            What is create-next-app?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Official CLI scaffolding tool for new Next.js
              projects. It sets up App Router, TypeScript/ESLint/Tailwind options,
              and standard scripts.
            </p>
            <CodeBlock
              code={`npx create-next-app@latest my-app

# Common flags
npx create-next-app@latest my-app --typescript --eslint --tailwind --app --src-dir`}
              language="bash"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is the difference between rendering on the server vs the client?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>Server rendering:</strong> HTML generated on server per request or at build time; good for SEO and fast first paint</li>
              <li><strong>Client rendering:</strong> Browser downloads JS and builds UI; needed for interactivity after load</li>
              <li><strong>App Router blend:</strong> Server Components stay on server; Client Components get SSR HTML then hydrate</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            How do you pass data from a Server Component to a Client Component?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Fetch on the server, pass serializable props
              to the Client Component. Props must be JSON-serializable (no functions,
              class instances, or Dates without serialization).
            </p>
            <CodeBlock
              code={`// Server Component
import LikeButton from './LikeButton';

export default async function Post({ params }) {
  const post = await getPost(params.id);
  return <LikeButton postId={post.id} likeCount={post.likes} />;
}

// Client Component
'use client';
export default function LikeButton({ postId, likeCount }) {
  const [count, setCount] = useState(likeCount);
  return <button onClick={() => setCount(c => c + 1)}>{count} likes</button>;
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Can you use React hooks in Server Components?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> No. Hooks like useState, useEffect, and
              useContext only work in Client Components. Server Components can be
              async functions and use server-only APIs instead.
            </p>
            <CodeBlock
              code={`// ❌ Invalid in Server Component
export default function Page() {
  const [x, setX] = useState(0); // Error
}

// ✅ Valid — async Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* ... */}</div>;
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            What is the RSC payload?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> The RSC (React Server Components) payload is
              a compact serialized format sent from server to client during navigation
              or initial load. It describes Server Component output and references
              Client Component modules to load — not full component source code.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Enables soft navigation without full page reload</li>
              <li>Client merges payload with existing tree via React&apos;s flight protocol</li>
              <li>Reduces over-fetching compared to shipping all component JS upfront</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is soft navigation vs full reload in Next.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>Soft navigation:</strong> next/link or useRouter fetches RSC payload + updates DOM; shared layouts persist; faster UX</li>
              <li><strong>Full reload:</strong> Browser reloads entire document; all JS/CSS re-fetched; state lost</li>
              <li>Soft nav preserves React state in layouts and Client Components outside changed segments</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What are common junior mistakes with &apos;use client&apos;?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Adding &apos;use client&apos; to every file — bloats bundle unnecessarily</li>
              <li>Putting &apos;use client&apos; on layout.js when only a small child needs interactivity</li>
              <li>Fetching data with useEffect in Client Components when Server Components would suffice</li>
              <li>Importing server-only code (DB, fs) into Client Components</li>
              <li>Placing &apos;use client&apos; below imports — must be first line</li>
            </ul>
            <p><strong>Best practice:</strong> Push &apos;use client&apos; to leaf components (buttons, forms, widgets).</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            What are the default package.json scripts in a Next.js project?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <CodeBlock
              code={`{
  "scripts": {
    "dev": "next dev",       // Local dev server with HMR
    "build": "next build",   // Production build
    "start": "next start",   // Serve production build
    "lint": "next lint"      // ESLint (if configured)
  }
}`}
              language="json"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            TypeScript vs JavaScript — how does setup differ?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Choose at create-next-app time. TypeScript adds tsconfig.json and .ts/.tsx files; JavaScript uses .js/.jsx.</p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Both support App Router identically — file names change, APIs do not</li>
              <li>TypeScript gives typed params, props, and Server Action signatures</li>
              <li>Can migrate later by renaming files and adding types incrementally</li>
            </ul>
          </div>
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b14"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to B14 Lessons
          </Link>
          <Link
            href="/learn/app-router/b14/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Routing System →
          </Link>
        </div>
      </div>
    </div>
  );
}
