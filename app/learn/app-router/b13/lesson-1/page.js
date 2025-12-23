import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.1: Core Concepts Quick Reference - Next.js Mastery",
  description: "Essential Next.js App Router concepts for interviews",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b13"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B13 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B13.1: Core Concepts Quick Reference
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Essential Next.js App Router concepts, architecture, and key
          differences from Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Server vs Client Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Server Components vs Client Components
          </h2>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server Components (Default)
          </h3>
          <CodeBlock
            code={`// app/components/ServerComponent.js
// No 'use client' directive = Server Component
export default async function ServerComponent() {
  // Can directly access databases, file system, APIs
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  
  return (
    <div>
      <h1>Server Component</h1>
      <p>{json.message}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Client Components
          </h3>
          <CodeBlock
            code={`// app/components/ClientComponent.js
'use client'; // Required directive

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  
  // Can use browser APIs, hooks, event handlers
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Differences
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Server Component
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Client Component
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Directive
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    None (default)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    'use client'
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Rendering
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Server only
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Client + Server
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Data Fetching
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Direct async/await
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    useEffect, SWR, etc.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Browser APIs
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    ❌ Not available
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    ✅ Available
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    React Hooks
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    ❌ Not available
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    ✅ Available
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Event Handlers
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    ❌ Not available
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    ✅ Available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* React Server Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. React Server Components (RSC)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            React Server Components (RSC) are a fundamental shift in how React
            applications are built. Unlike traditional Client Components, Server
            Components render exclusively on the server and their code never
            ships to the browser. Only the rendered output (HTML) and necessary
            data are sent to the client, dramatically reducing bundle size and
            improving performance.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Core Concept:</strong> Server Components enable direct
            access to backend resources without API boundaries. You can query
            databases, read files, or call internal APIs directly from
            components. This eliminates the need for separate API routes for
            simple data fetching and reduces the number of round trips between
            client and server. The component tree is split between server and
            client: Server Components handle data fetching and rendering, while
            Client Components (marked with 'use client') handle interactivity
            and browser APIs.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Components are React components that render on the server and
            are never sent to the client. They enable:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Direct access to backend resources (databases, APIs)</li>
            <li>Smaller JavaScript bundles (code stays on server)</li>
            <li>Better security (API keys never exposed)</li>
            <li>Improved performance (no hydration needed)</li>
            <li>Automatic code splitting</li>
          </ul>

          <CodeBlock
            code={`// Server Component - runs on server
export default async function ProductPage({ params }) {
  // Direct database access
  const product = await db.product.findUnique({
    where: { id: params.id }
  });
  
  // This component is never sent to the client
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Client Component boundary */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// Client Component - runs on client
'use client';
export function AddToCartButton({ productId }) {
  const handleClick = () => {
    // Client-side interactivity
    addToCart(productId);
  };
  
  return <button onClick={handleClick}>Add to Cart</button>;
}`}
            language="javascript"
          />
        </section>

        {/* Component Tree */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Component Tree & Composition
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The component tree in App Router can contain both Server and Client
            Components, with the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              'use client'
            </code>{" "}
            directive creating a boundary between server and client code.
            Understanding how these boundaries work is crucial for building
            efficient applications.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Composition Rules:</strong> Server Components can import and
            render Client Components directly - the Client Component code will
            be included in the client bundle. Client Components can receive
            Server Components as children, allowing you to pass server-rendered
            content into interactive components. However, you cannot import
            Server Components directly into Client Components - they must be
            passed as props or children. The 'use client' directive creates a
            boundary where everything below it runs on the client, so be
            strategic about where you place it to minimize bundle size.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server and Client Components can be composed together. The 'use
            client' directive creates a boundary.
          </p>

          <CodeBlock
            code={`// app/page.js - Server Component (root)
import ServerComponent from './components/ServerComponent';
import ClientComponent from './components/ClientComponent';

export default function HomePage() {
  return (
    <div>
      {/* Server Component */}
      <ServerComponent />
      
      {/* Client Component boundary starts here */}
      <ClientComponent>
        {/* Can pass Server Components as children */}
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}

// ✅ Valid: Server Component can import Client Component
// ✅ Valid: Client Component can receive Server Component as children
// ❌ Invalid: Client Component cannot directly import Server Component
// ❌ Invalid: Cannot pass functions/props that include Server-only code`}
            language="javascript"
          />
        </section>

        {/* File-based Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. File-based Routing System
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Routes are created by organizing files in the app/ directory.
          </p>

          <CodeBlock
            code={`app/
├── page.js                 → / (home)
├── about/
│   └── page.js            → /about
├── blog/
│   ├── page.js            → /blog
│   └── [slug]/
│       └── page.js        → /blog/[slug]
├── shop/
│   ├── page.js            → /shop
│   └── [...categories]/
│       └── page.js        → /shop/[...categories]
└── (marketing)/
    ├── landing/
    │   └── page.js        → /landing (route group)
    └── pricing/
        └── page.js        → /pricing`}
            language="text"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Route Types
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Static:</strong> app/page.js → /page
            </li>
            <li>
              <strong>Dynamic:</strong> app/[id]/page.js → /123, /abc
            </li>
            <li>
              <strong>Catch-all:</strong> app/[...slug]/page.js → /a, /a/b,
              /a/b/c
            </li>
            <li>
              <strong>Optional Catch-all:</strong> app/[[...slug]]/page.js → /,
              /a, /a/b
            </li>
            <li>
              <strong>Route Groups:</strong> app/(group)/page.js (doesn't affect
              URL)
            </li>
          </ul>
        </section>

        {/* Layouts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Layouts & Nested Layouts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Layouts are React components that wrap pages and preserve state and
            DOM structure across navigation. Unlike pages, layouts don't
            re-render when navigating between child routes, which means
            expensive operations like API calls or animations don't need to
            re-run. This is a major advantage over Pages Router's single{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _app.js
            </code>
            .
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Nested Layouts:</strong> You can create nested layouts by
            placing{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              layout.js
            </code>{" "}
            files at different route levels. Each layout wraps its children,
            creating a component tree. This allows you to have shared layouts
            for specific route groups (like a dashboard layout) while
            maintaining a different layout for marketing pages. Layouts are
            perfect for navigation bars, sidebars, or any UI that should persist
            across route changes. The layout structure is composable - a page at{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/dashboard/settings/page.js
            </code>{" "}
            will be wrapped by both the root layout and the dashboard layout.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Layouts wrap pages and preserve state across navigation.
          </p>

          <CodeBlock
            code={`// app/layout.js - Root Layout (required)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// app/dashboard/layout.js - Nested Layout
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

// app/dashboard/settings/page.js - Uses both layouts
export default function SettingsPage() {
  return <div>Settings</div>;
}
// Renders: <RootLayout><DashboardLayout><SettingsPage /></DashboardLayout></RootLayout>`}
            language="javascript"
          />
        </section>

        {/* Special Files */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Special Files
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router has several special files that provide built-in
            functionality for common scenarios. These files follow naming
            conventions and are automatically recognized by Next.js, providing
            functionality like layouts, loading states, error boundaries, and
            API endpoints without additional configuration.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Understanding Special Files:</strong> Each special file has
            a specific purpose and runs at different times in the request
            lifecycle. They're scoped to their route segment, meaning a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              loading.js
            </code>{" "}
            in a folder only handles loading for that segment and its children.
            This granular control allows you to have different loading states,
            error handling, and layouts at different levels of your application.
            Special files are a powerful feature that eliminates the need for
            manual setup of common patterns.
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>layout.js:</strong> Shared UI for a segment and its
              children
            </li>
            <li>
              <strong>page.js:</strong> Unique UI for a route (required for
              routes)
            </li>
            <li>
              <strong>loading.js:</strong> Loading UI (shown while content
              loads)
            </li>
            <li>
              <strong>error.js:</strong> Error boundary (catches errors in
              segment)
            </li>
            <li>
              <strong>not-found.js:</strong> 404 UI (for that segment)
            </li>
            <li>
              <strong>template.js:</strong> Re-renders on navigation (unlike
              layout)
            </li>
            <li>
              <strong>route.js:</strong> API endpoint (Route Handler)
            </li>
            <li>
              <strong>default.js:</strong> Fallback UI for parallel routes
            </li>
          </ul>
        </section>

        {/* Streaming & Suspense */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Streaming & Suspense
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js streams HTML progressively as Server Components render,
            sending HTML to the client as soon as it's ready rather than waiting
            for the entire page to render. This dramatically improves Time to
            First Byte (TTFB) and allows users to see content faster.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How Streaming Works:</strong> When a Server Component
            wrapped in Suspense encounters an async operation (like await),
            Next.js can pause rendering that component, send the HTML generated
            so far to the client, and resume when the async operation completes.
            This means fast components render immediately while slow ones are
            still loading. The browser progressively renders the streamed HTML,
            so users see content as it becomes available.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              loading.js
            </code>{" "}
            files provide fallback UI during streaming. This pattern is
            particularly powerful for pages with mixed fast and slow content -
            critical content can appear immediately while secondary content
            loads in the background.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js streams HTML progressively as Server Components render.
          </p>

          <CodeBlock
            code={`// app/page.js
import { Suspense } from 'react';

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return <div>Loaded!</div>;
}

export default function Page() {
  return (
    <div>
      <h1>Fast Content</h1>
      
      {/* Shows loading.js while waiting */}
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

// app/loading.js - Automatic fallback
export default function Loading() {
  return <div>Loading...</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Server Actions */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Server Actions & Progressive Enhancement
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions are async functions that run on the server and can be
            called directly from forms or Client Components. They provide a
            simpler alternative to API routes for mutations, with built-in
            progressive enhancement that ensures forms work even without
            JavaScript enabled.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Progressive Enhancement:</strong> Server Actions work with
            native HTML forms - if JavaScript is disabled or fails to load, the
            form still submits and the Server Action executes. This ensures your
            application remains functional even in degraded conditions. When
            JavaScript is available, Server Actions provide a better experience
            with client-side validation, optimistic updates, and no page
            reloads. This pattern is fundamental to building resilient web
            applications that work for all users, regardless of their browser
            capabilities or network conditions. Progressive enhancement means
            building from a solid base (HTML forms) and enhancing with
            JavaScript when available.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions enable form submissions and mutations without API
            routes.
          </p>

          <CodeBlock
            code={`// app/actions.js
'use server';

export async function createPost(formData) {
  const title = formData.get('title');
  // Server-side mutation
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
}

// app/components/Form.js
'use client';

import { createPost } from '../actions';

export default function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}

// Progressive Enhancement:
// - Works without JavaScript
// - Enhanced with JavaScript if available
// - No API route needed`}
            language="javascript"
          />
        </section>

        {/* Key Differences from Pages Router */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Key Differences: App Router vs Pages Router
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Aspect
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    App Router
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Pages Router
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Directory
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    app/
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    pages/
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Default Components
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Server Components
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Client Components
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Data Fetching
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    async Server Components
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    getServerSideProps, getStaticProps
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Layouts
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    layout.js (nested)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    _app.js (single)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    API Routes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    route.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    api/ directory
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Loading States
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    loading.js
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Custom implementation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to B13 Lessons
          </Link>
          <Link
            href="/learn/app-router/b13/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Data Fetching & Caching →
          </Link>
        </div>
      </div>
    </div>
  );
}
