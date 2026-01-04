import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.3: Routing & Navigation Patterns - Next.js Mastery",
  description: "Complete routing reference for Next.js App Router",
};

export default function Lesson3Page() {
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
          B13.3: Routing & Navigation Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete routing reference, dynamic routes, route groups, parallel
          routes, and intercepting routes.
        </p>
      </div>

      <div className="space-y-8">
        {/* Static & Dynamic Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Static & Dynamic Routes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js App Router uses file-based routing where the file structure
            in the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/
            </code>{" "}
            directory determines the URL structure. Static routes are fixed
            paths that don't change, while dynamic routes use special folder
            names with brackets{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [param]
            </code>{" "}
            to accept variable segments. The routing system automatically maps
            files to URLs and handles parameter extraction, making it intuitive
            and convention-based rather than configuration-based.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Interview Points:</strong> Understand that Next.js
            automatically generates routes from the file system, supports both
            static and dynamic segments, and handles URL parameters through the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              params
            </code>{" "}
            prop in Server Components. Dynamic routes are rendered at request
            time unless using static generation strategies.
          </p>
          <CodeBlock
            code={`// Static Route
// app/about/page.js
export default function AboutPage() {
  return <h1>About</h1>;
}
// URL: /about

// Dynamic Route
// app/products/[id]/page.js
export default function ProductPage({ params }) {
  return <h1>Product {params.id}</h1>;
}
// URL: /products/123, /products/abc

// Multiple Dynamic Segments
// app/shop/[category]/[product]/page.js
export default function ProductDetail({ params }) {
  return (
    <div>
      Category: {params.category}
      Product: {params.product}
    </div>
  );
}
// URL: /shop/electronics/laptop`}
            language="javascript"
          />
        </section>

        {/* Route Groups */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Route Groups & Organizing Routes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route groups are created using parentheses in folder names like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              (groupName)
            </code>
            . They allow you to organize routes logically without affecting the
            URL structure. This is particularly useful for grouping routes that
            share layouts, applying conditional logic, or organizing large
            applications without polluting the URL with unnecessary segments.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Why use route groups?</strong> They enable better code
            organization, allow shared layouts for multiple route segments, and
            support conditional layouts based on route grouping. For example,
            you can have marketing pages and dashboard pages in separate groups,
            each with their own layout, while maintaining clean URLs like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /about
            </code>{" "}
            instead of{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /marketing/about
            </code>
            .
          </p>
          <CodeBlock
            code={`// Route Groups: (groupName)
// Does NOT affect URL structure

// app/(marketing)/about/page.js
// app/(marketing)/contact/page.js
// Both use: /about, /contact (not /marketing/about)

// Benefits:
// - Organize routes without affecting URLs
// - Share layouts within groups
// - Conditional layouts

// app/(marketing)/layout.js
export default function MarketingLayout({ children }) {
  return (
    <div>
      <MarketingHeader />
      {children}
    </div>
  );
}

// app/(dashboard)/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardSidebar />
      {children}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Catch-all Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Dynamic Segments & Catch-all Routes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Catch-all routes use the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [...slug]
            </code>{" "}
            syntax to match multiple dynamic segments. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              params.slug
            </code>{" "}
            is always an array containing all matched segments. Optional
            catch-all routes use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [[...slug]]
            </code>{" "}
            with double brackets and can match zero or more segments, making
            them useful for handling both the base path and nested paths.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Use cases:</strong> Catch-all routes are perfect for
            documentation sites with nested hierarchies, file browsers, or any
            structure where you need to handle variable-depth paths. They're
            commonly used for CMS-driven content where the URL structure mirrors
            the content tree. Optional catch-all routes are ideal when you want
            a single route to handle both the base path and nested paths (like a
            blog index that also handles category filtering).
          </p>
          <CodeBlock
            code={`// Catch-all Routes
// app/docs/[...slug]/page.js
export default function DocsPage({ params }) {
  // params.slug is an array
  return <div>{params.slug.join('/')}</div>;
}
// /docs/getting-started → ['getting-started']
// /docs/getting-started/installation → ['getting-started', 'installation']

// Optional Catch-all
// app/shop/[[...slug]]/page.js
export default function ShopPage({ params }) {
  if (!params.slug) {
    return <div>Shop Home</div>;
  }
  return <div>{params.slug.join('/')}</div>;
}
// /shop → params.slug is undefined
// /shop/electronics → ['electronics']
// /shop/electronics/laptops → ['electronics', 'laptops']`}
            language="javascript"
          />
        </section>

        {/* Parallel Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Parallel Routes & Slots
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Parallel routes allow you to simultaneously render multiple pages
            within the same layout using the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              @folder
            </code>{" "}
            syntax. Each parallel route (slot) is a separate page component that
            can load independently, enabling independent error and loading
            states. This pattern is useful for dashboard layouts where you want
            to show analytics, notifications, and content side-by-side.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it works:</strong> When you define slots like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              @analytics
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              @team
            </code>
            , Next.js renders them as props in the parent layout. Each slot can
            have its own loading and error states, making the UI more resilient.
            If a slot fails or is missing, you can render a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              default.js
            </code>{" "}
            fallback.
          </p>
          <CodeBlock
            code={`// Parallel Routes use @folder syntax
// app/dashboard/@analytics/page.js
export default function Analytics() {
  return <div>Analytics</div>;
}

// app/dashboard/@team/page.js
export default function Team() {
  return <div>Team</div>;
}

// app/dashboard/layout.js
export default function DashboardLayout({ children, analytics, team }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid">
        <div>{analytics}</div>
        <div>{team}</div>
      </div>
      {children}
    </div>
  );
}

// URL: /dashboard
// Shows: analytics slot + team slot + children

// Conditional Rendering
export default function Layout({ analytics, team }) {
  return (
    <div>
      {analytics}
      {team}
      {/* Only render if slot exists */}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Intercepting Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Intercepting Routes & Modals
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Intercepting routes allow you to "intercept" a route's render at a
            different level in the route hierarchy, commonly used for modal
            dialogs. When a user clicks a link to a route, the intercepted route
            (typically a modal) is shown instead of navigating to the full page.
            However, when accessing the URL directly (refresh or share), the
            full page is rendered.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Syntax patterns:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              (.)
            </code>{" "}
            intercepts at the same level,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              (..)
            </code>{" "}
            intercepts one level up,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              (..)(..)
            </code>{" "}
            two levels up, and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              (...)
            </code>{" "}
            intercepts from the root. This pattern is perfect for photo
            galleries, product quick views, or any scenario where you want
            modal-like behavior while maintaining proper URLs.
          </p>
          <CodeBlock
            code={`// Intercepting Routes use (.) syntax
// Intercept same level: (.)
// Intercept one level up: (..)
// Intercept two levels up: (..)(..)
// Intercept root: (...)

// Example: Modal on Photo Click
// app/photos/[id]/page.js (full page)
export default function PhotoPage({ params }) {
  return <div>Photo {params.id} - Full Page</div>;
}

// app/@modal/(.)photos/[id]/page.js (intercepted)
'use client';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';

export default function PhotoModal({ params }) {
  const router = useRouter();
  
  return (
    <Modal onClose={() => router.back()}>
      <div>Photo {params.id} - Modal</div>
    </Modal>
  );
}

// Behavior:
// - Click link → Shows modal (intercepted)
// - Refresh page → Shows full page (not intercepted)
// - Direct URL → Shows full page`}
            language="javascript"
          />
        </section>

        {/* Navigation Hooks */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Navigation Hooks
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router provides several navigation hooks from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/navigation
            </code>{" "}
            that work only in Client Components. Unlike Pages Router's{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useRouter
            </code>
            , these hooks are optimized for the App Router's architecture and
            provide more granular control over navigation state.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Hooks:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useRouter
            </code>{" "}
            provides programmatic navigation methods,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              usePathname
            </code>{" "}
            gives the current pathname without needing to access router object,
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useSearchParams
            </code>{" "}
            provides access to URL search parameters with reactivity. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.refresh()
            </code>{" "}
            method is particularly important as it refreshes the current route
            by re-fetching data from the server without losing client-side
            state.
          </p>
          <CodeBlock
            code={`'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function NavigationExample() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Programmatic navigation
  function handleClick() {
    router.push('/dashboard');
    router.replace('/dashboard'); // Replace history
    router.back(); // Go back
    router.forward(); // Go forward
    router.refresh(); // Refresh current route
  }
  
  // Get current pathname
  console.log(pathname); // '/dashboard/settings'
  
  // Get search params
  const id = searchParams.get('id'); // ?id=123
  
  return (
    <div>
      <p>Current path: {pathname}</p>
      <button onClick={handleClick}>Navigate</button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Link Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Link Component & Prefetching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Link
            </code>{" "}
            component from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/link
            </code>{" "}
            enables client-side navigation between pages, which is faster than
            full page reloads because it only fetches the necessary JavaScript
            and data for the new page. Next.js automatically prefetches linked
            pages when the link enters the viewport or on hover, making
            navigation feel instant.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Prefetching Behavior:</strong> By default, Next.js
            prefetches pages linked with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Link
            </code>{" "}
            when they enter the viewport (using Intersection Observer) or when
            hovered. This happens in the background, so by the time the user
            clicks, the page is already loaded. You can disable prefetching with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              prefetch={false}
            </code>{" "}
            for low-priority links or links that shouldn't be prefetched (like
            logout links). In Next.js 16, prefetching is smarter - it only
            downloads necessary chunks, not the entire page bundle.
          </p>
          <CodeBlock
            code={`import Link from 'next/link';

// Basic Link
<Link href="/about">About</Link>

// With prefetching
<Link href="/about" prefetch={true}>About</Link>
<Link href="/about" prefetch={false}>About</Link>

// Scroll behavior
<Link href="/about" scroll={false}>About</Link>

// Replace history
<Link href="/about" replace>About</Link>

// With query params
<Link href={{
  pathname: '/products',
  query: { category: 'electronics' }
}}>
  Electronics
</Link>

// With hash
<Link href="/about#team">Team Section</Link>`}
            language="javascript"
          />
        </section>

        {/* Middleware */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Middleware & Route Protection
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Middleware (or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              proxy.ts
            </code>{" "}
            in Next.js 16) runs before requests complete, allowing you to modify
            requests, redirect users, rewrite URLs, set headers, or block
            requests based on conditions. It executes on the Edge Runtime,
            providing low latency but with limitations on Node.js APIs.
            Middleware is perfect for authentication, authorization, A/B
            testing, geolocation-based routing, bot detection, and logging.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How Middleware Works:</strong> Middleware runs on every
            request that matches the configured matcher pattern, before the
            request reaches your routes. It can inspect cookies, headers, query
            parameters, and the pathname. Based on these values, middleware can
            return a modified response (with headers), redirect to another URL,
            rewrite the URL (serving different content at the same URL), or
            continue with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NextResponse.next()
            </code>
            . The matcher configuration determines which routes the middleware
            applies to, using path patterns or regular expressions.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Route Protection Pattern:</strong> One of the most common
            use cases is protecting routes that require authentication.
            Middleware checks for authentication tokens in cookies or headers
            before allowing access to protected routes. If no valid token is
            found, it redirects to a login page. This happens before any route
            code executes, providing efficient protection without loading
            unnecessary page code. You can also implement role-based access
            control (RBAC) by checking user roles or permissions in middleware.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Edge Runtime Limitations:</strong> Middleware runs on the
            Edge Runtime, which means it has access to Web Standard APIs but not
            full Node.js APIs. You cannot use the file system, native Node.js
            modules, or certain Node.js globals. However, Edge Runtime provides
            faster execution with lower latency since it runs closer to users.
            If you need Node.js APIs, you should handle that logic in Route
            Handlers or Server Components instead.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Interview Points:</strong> Understand that middleware runs
            before routes execute, making it ideal for cross-cutting concerns.
            Know the difference between redirect (changes URL) and rewrite
            (serves different content at same URL). Understand the matcher
            configuration and how to use path patterns effectively. Be aware of
            Edge Runtime limitations and when to use middleware vs. Server
            Components or Route Handlers. Know how to properly implement
            authentication checks and handle edge cases (like public routes, API
            routes, static assets).
          </p>
          <CodeBlock
            code={`// middleware.js (or proxy.ts in Next.js 16)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/protected/:path*',
  ],
};`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Data Fetching & Caching
          </Link>
          <Link
            href="/learn/app-router/b13/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Server Actions & Forms →
          </Link>
        </div>
      </div>
    </div>
  );
}
