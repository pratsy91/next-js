import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C3.4: Coexistence Patterns - Next.js Mastery",
  description: "Run both routers in the same Next.js application",
};

export default function Lesson4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c3"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C3 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C3.4: Coexistence Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to run both Pages Router and App Router in the same Next.js
          application.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Running Both Routers
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js supports both routers in the same project.
          </p>

          <CodeBlock
            code={`// File structure with both routers
project/
  ├── pages/              # Pages Router
  │   ├── index.js       → / (Pages Router)
  │   ├── about.js       → /about (Pages Router)
  │   └── api/
  │       └── old.js     → /api/old (Pages Router)
  └── app/                # App Router
      ├── layout.js
      ├── dashboard/
      │   └── page.tsx   → /dashboard (App Router)
      └── api/
          └── new/
              └── route.ts → /api/new (App Router)

// Route priority:
// - App Router takes precedence
// - If route exists in app/, it's used
// - Otherwise, pages/ route is used

// Example:
// app/about/page.tsx exists → /about uses App Router
// pages/contact.js exists → /contact uses Pages Router
// Both work in the same project!`}
            language="text"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Gradual Migration Pattern
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use coexistence for gradual migration.
          </p>

          <CodeBlock
            code={`// Migration strategy with coexistence:

// Phase 1: Setup
// - Create app/ directory
// - Keep all pages/ routes
// - Test that everything still works

// Phase 2: Migrate simple routes
// - Migrate static pages
// - Test each migration
// - Keep old routes until verified

// Phase 3: Migrate complex routes
// - Migrate dynamic routes
// - Migrate data fetching
// - Update navigation

// Phase 4: Migrate API routes
// - Migrate API endpoints
// - Update client code
// - Test API functionality

// Phase 5: Cleanup
// - Remove unused pages/ routes
// - Remove pages/ directory (if empty)
// - Update documentation

// Example timeline:
// Week 1: Setup coexistence
// Week 2-4: Migrate simple pages
// Week 5-8: Migrate complex pages
// Week 9-10: Migrate API routes
// Week 11: Cleanup and testing`}
            language="text"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Shared Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Share components between both routers.
          </p>

          <CodeBlock
            code={`// Shared components directory
components/
  ├── Button.tsx
  ├── Card.tsx
  └── Header.tsx

// Use in Pages Router
// pages/about.js
import Button from '../components/Button';

export default function About() {
  return <Button>Click me</Button>;
}

// Use in App Router
// app/dashboard/page.tsx
import Button from '@/components/Button';

export default function Dashboard() {
  return <Button>Click me</Button>;
}

// Client components (both routers)
// components/ClientButton.tsx
'use client';

export default function ClientButton() {
  return <button>Click</button>;
}

// Use in both routers
// Works the same way!

// Shared utilities
// lib/utils.ts
export function formatDate(date: Date) {
  return date.toLocaleDateString();
}

// Use in both routers
import { formatDate } from '@/lib/utils';`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Configuration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure Next.js to support both routers.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  // Both routers work by default
  // No special configuration needed!
  
  // Shared configuration
  images: {
    domains: ['example.com'],
  },
  
  // Redirects (work for both)
  async redirects() {
    return [
      {
        source: '/old',
        destination: '/new',
        permanent: true,
      },
    ];
  },
  
  // Rewrites (work for both)
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};

// TypeScript configuration
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

// Works for both routers!

// Environment variables
// .env.local
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=https://...

// Works in both routers!`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Common Patterns
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Common patterns for running both routers together.
          </p>

          <CodeBlock
            code={`// Pattern 1: Route-by-route migration
// Keep old route until new one is tested
pages/
  └── about.js        # Keep until migration verified
app/
  └── about/
      └── page.tsx    # New route

// Pattern 2: Feature-based migration
// Migrate entire features
pages/
  └── blog/          # Keep blog in Pages Router
app/
  └── dashboard/     # New dashboard in App Router

// Pattern 3: API-first migration
// Migrate API routes first
pages/
  └── api/
      └── old.js     # Old API
app/
  └── api/
      └── new/
          └── route.ts # New API

// Pattern 4: Shared layout
// Use App Router layout for shared UI
app/
  └── layout.js      # Shared layout
pages/
  └── legacy.js      # Legacy pages

// Pattern 5: Gradual component migration
// Migrate components to Server Components
components/
  ├── old/            # Client components
  └── new/            # Server Components

// Best practices:
// ✅ Test each migration
// ✅ Keep old routes working
// ✅ Update navigation gradually
// ✅ Share components when possible
// ✅ Document migration progress`}
            language="text"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Navigation Between Routers
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Navigate between Pages Router and App Router routes seamlessly.
          </p>

          <CodeBlock
            code={`// next/link works for both routers
import Link from 'next/link';

// Link to Pages Router route
<Link href="/about">About</Link>  // pages/about.js

// Link to App Router route
<Link href="/dashboard">Dashboard</Link>  // app/dashboard/page.tsx

// Both work the same way!

// Navigation hooks
// Pages Router
import { useRouter } from 'next/router';
const router = useRouter();
router.push('/about');  // Pages Router route

// App Router
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/dashboard');  // App Router route

// Cross-router navigation works!
// You can navigate from Pages Router to App Router
// and vice versa seamlessly.

// Example: Shared navigation component
// components/Nav.tsx
'use client';

import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>        {/* Pages Router */}
      <Link href="/about">About</Link>  {/* Pages Router */}
      <Link href="/dashboard">Dashboard</Link>  {/* App Router */}
    </nav>
  );
}

// Works in both routers!`}
            language="javascript"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c3/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C3.3 Migration Strategies
          </Link>
          <Link
            href="/learn/comparison/c3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to C3 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
