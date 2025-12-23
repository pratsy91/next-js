import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B2.3: Layout System - Next.js Mastery",
  description: "Complete guide to the layout system in Next.js App Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b2"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B2 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B2.3: Layout System
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master the layout system: root layouts, nested layouts, composition,
          props, state persistence, and re-rendering behavior.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Root Layout */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Root Layout (Required)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The root layout is required and must be in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/layout.js
            </code>
            . It wraps all pages in your application.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Root Layout
          </h3>
          <CodeBlock
            code={`// app/layout.js - REQUIRED
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Root Layout Requirements
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>
              Must include{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                &lt;html&gt;
              </code>{" "}
              and{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                &lt;body&gt;
              </code>{" "}
              tags
            </li>
            <li>
              Must accept{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                children
              </code>{" "}
              prop
            </li>
            <li>
              Cannot use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                route groups
              </code>{" "}
              for root layout
            </li>
            <li>
              Cannot be a Client Component (but can contain Client Components)
            </li>
          </ul>
        </section>

        {/* Section 2: Nested Layouts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Nested Layouts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            You can create layouts at any level of your route hierarchy. Each
            layout wraps its route segment and all child routes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Layout Structure
          </h3>
          <CodeBlock
            code={`// app/layout.js (Root)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div className="app">{children}</div>
      </body>
    </html>
  );
}

// app/dashboard/layout.js (Nested)
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <nav>Dashboard Nav</nav>
      <main>{children}</main>
    </div>
  );
}

// app/dashboard/settings/layout.js (Deeply Nested)
export default function SettingsLayout({ children }) {
  return (
    <div className="settings">
      <aside>Settings Sidebar</aside>
      <div>{children}</div>
    </div>
  );
}

// Final structure for /dashboard/settings:
// <html>
//   <body>
//     <div className="app">
//       <div className="dashboard">
//         <nav>Dashboard Nav</nav>
//         <main>
//           <div className="settings">
//             <aside>Settings Sidebar</aside>
//             <div>{/* page.js content */}</div>
//           </div>
//         </main>
//       </div>
//     </div>
//   </body>
// </html>`}
            language="javascript"
          />
        </section>

        {/* Section 3: Layout Composition */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Layout Composition
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Layouts compose together, with each layout wrapping the next. You
            can mix Server and Client Components in layouts.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Composing Server and Client Components
          </h3>
          <CodeBlock
            code={`// app/layout.js (Server Component)
import ClientNav from '@/components/ClientNav';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClientNav /> {/* Client Component */}
        {children}
      </body>
    </html>
  );
}

// components/ClientNav.js
'use client';

export default function ClientNav() {
  const [isOpen, setIsOpen] = useState(false);
  return <nav>...</nav>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Layout with Metadata
          </h3>
          <CodeBlock
            code={`// app/layout.js
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My app description',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// Metadata in layouts is inherited by child routes`}
            language="javascript"
          />
        </section>

        {/* Section 4: Layout Props */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Layout Props (children, params)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Layouts receive{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              children
            </code>{" "}
            and optionally{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              params
            </code>{" "}
            props.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Children Prop
          </h3>
          <CodeBlock
            code={`// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>Header</header>
        <main>{children}</main> {/* Renders the page */}
        <footer>Footer</footer>
      </body>
    </html>
  );
}

// children is React.ReactNode
// It contains the page.js content for that route segment`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Params Prop (Dynamic Routes)
          </h3>
          <CodeBlock
            code={`// app/products/[id]/layout.js
export default async function ProductLayout({ children, params }) {
  // In Next.js 15+, params is a Promise
  const { id } = await params;
  
  return (
    <div>
      <nav>Product {id} Navigation</nav>
      {children}
    </div>
  );
}

// TypeScript version:
export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <nav>Product {id}</nav>
      {children}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Layout State Persistence */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Layout State Persistence
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Layouts persist across navigation, meaning they don't re-render when
            navigating between pages. This allows state to persist.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            State Persistence Example
          </h3>
          <CodeBlock
            code={`// app/dashboard/layout.js
'use client';

import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="dashboard">
      <aside className={sidebarOpen ? 'open' : 'closed'}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          Toggle
        </button>
        Sidebar
      </aside>
      <main>{children}</main>
    </div>
  );
}

// When navigating from /dashboard to /dashboard/settings:
// - Layout doesn't re-render
// - sidebarOpen state persists
// - Only the page content changes`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Benefits of State Persistence
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Form inputs don't lose data</li>
            <li>Scroll position can be maintained</li>
            <li>Expanded/collapsed UI states persist</li>
            <li>Better performance (no re-renders)</li>
            <li>Smoother user experience</li>
          </ul>
        </section>

        {/* Section 6: Layout Re-rendering Behavior */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Layout Re-rendering Behavior
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Understanding when layouts re-render is crucial for performance and
            state management.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            When Layouts DON'T Re-render
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Navigating between pages in the same layout segment</li>
            <li>Client-side navigation (using Link)</li>
            <li>Changing search params (query strings)</li>
            <li>Hash changes (#anchor)</li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            When Layouts DO Re-render
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Navigating to a route outside the layout segment</li>
            <li>Full page refresh</li>
            <li>Server-side navigation</li>
            <li>When params change (for dynamic route layouts)</li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Re-rendering Example
          </h3>
          <CodeBlock
            code={`// app/dashboard/layout.js
'use client';

import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  useEffect(() => {
    console.log('Layout rendered');
  });
  
  return (
    <div>
      <nav>Dashboard</nav>
      {children}
    </div>
  );
}

// Navigation scenarios:
// /dashboard → /dashboard/settings
//   → Layout does NOT re-render (same segment)

// /dashboard → /about
//   → Layout DOES re-render (different segment)

// /dashboard/products/1 → /dashboard/products/2
//   → Layout does NOT re-render (same segment, different params)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Route Layout Re-rendering
          </h3>
          <CodeBlock
            code={`// app/products/[id]/layout.js
export default async function ProductLayout({ children, params }) {
  const { id } = await params;
  
  // This layout re-renders when:
  // - Navigating from /products/1 to /products/2
  // - Because params.id changes
  
  return (
    <div>
      <h1>Product {id}</h1>
      {children}
    </div>
  );
}

// To prevent re-rendering, use route groups:
// app/(products)/[id]/layout.js
// This keeps the layout stable while params change`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b2/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B2.2 Special Files
          </Link>
          <Link
            href="/learn/app-router/b2/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B2.4 Loading States →
          </Link>
        </div>
      </div>
    </div>
  );
}
