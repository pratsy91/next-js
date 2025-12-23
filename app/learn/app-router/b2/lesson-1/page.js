import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B2.1: Basic Routing - Next.js Mastery",
  description: "Complete guide to basic routing in Next.js App Router",
};

export default function Lesson1Page() {
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
          B2.1: Basic Routing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn the fundamentals of routing in Next.js App Router: route
          segments, nested routes, layouts, and advanced routing patterns.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Route Segments */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Route Segments (app/page.js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            In App Router, routes are created using the file system. Each folder
            in the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app
            </code>{" "}
            directory represents a route segment.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Route Segment
          </h3>
          <CodeBlock
            code={`// app/page.js
// This creates the route: /
export default function Home() {
  return <h1>Home Page</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Route Segments Work
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Folder = Route Segment:</strong> Each folder in{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                app/
              </code>{" "}
              becomes a URL segment
            </li>
            <li>
              <strong>page.js = Route:</strong> A{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                page.js
              </code>{" "}
              file makes the route publicly accessible
            </li>
            <li>
              <strong>layout.js = Layout:</strong> A{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                layout.js
              </code>{" "}
              file wraps child routes
            </li>
            <li>
              <strong>Nested Structure:</strong> Folders can be nested to create
              nested routes
            </li>
          </ul>
        </section>

        {/* Section 2: Nested Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Nested Routes (app/about/page.js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create nested routes by creating folders with page.js files inside.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Creating a Nested Route
          </h3>
          <CodeBlock
            code={`// app/about/page.js
// This creates the route: /about
export default function About() {
  return <h1>About Page</h1>;
}

// app/contact/page.js
// This creates the route: /contact
export default function Contact() {
  return <h1>Contact Page</h1>;
}

// app/blog/page.js
// This creates the route: /blog
export default function Blog() {
  return <h1>Blog Page</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Deeply Nested Routes
          </h3>
          <CodeBlock
            code={`// app/products/electronics/page.js
// This creates the route: /products/electronics
export default function Electronics() {
  return <h1>Electronics</h1>;
}

// app/products/electronics/laptops/page.js
// This creates the route: /products/electronics/laptops
export default function Laptops() {
  return <h1>Laptops</h1>;
}

// Directory structure:
// app/
//   ├── page.js                    → /
//   ├── products/
//   │   └── electronics/
//   │       ├── page.js            → /products/electronics
//   │       └── laptops/
//   │           └── page.js        → /products/electronics/laptops`}
            language="text"
          />
        </section>

        {/* Section 3: Layouts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Layouts (app/layout.js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Layouts wrap pages and persist across navigation. They're perfect
            for shared UI like headers, footers, and navigation.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Root Layout (Required)
          </h3>
          <CodeBlock
            code={`// app/layout.js
// This is REQUIRED - wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>Navigation</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Layout Characteristics
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Layouts wrap their route segment and all children</li>
            <li>Layouts persist across navigation (don't re-render)</li>
            <li>Layouts can be nested</li>
            <li>Layouts share state across pages</li>
            <li>Only one layout.js per route segment</li>
          </ul>
        </section>

        {/* Section 4: Nested Layouts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Nested Layouts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            You can create layouts at any level of your route hierarchy.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Layout Example
          </h3>
          <CodeBlock
            code={`// app/layout.js (Root Layout)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div className="app-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}

// app/dashboard/layout.js (Dashboard Layout)
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <aside>Dashboard Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}

// app/dashboard/page.js
// This page is wrapped by both RootLayout and DashboardLayout
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}

// Resulting structure:
// <html>
//   <body>
//     <div className="app-wrapper">
//       <div className="dashboard">
//         <aside>Dashboard Sidebar</aside>
//         <main>
//           <h1>Dashboard</h1>
//         </main>
//       </div>
//     </div>
//   </body>
// </html>`}
            language="javascript"
          />
        </section>

        {/* Section 5: Route Groups */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Route Groups (folder) - Parentheses Syntax
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Route groups allow you to organize routes without affecting the URL
            structure. Use parentheses in folder names:{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              (folder)
            </code>
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Route Group
          </h3>
          <CodeBlock
            code={`// Directory structure:
// app/
//   ├── (marketing)/
//   │   ├── about/
//   │   │   └── page.js    → /about (NOT /marketing/about)
//   │   └── contact/
//   │       └── page.js    → /contact (NOT /marketing/contact)
//   └── (shop)/
//       ├── products/
//       │   └── page.js    → /products (NOT /shop/products)
//       └── cart/
//           └── page.js    → /cart (NOT /shop/cart)

// app/(marketing)/about/page.js
export default function About() {
  return <h1>About</h1>;
}

// app/(shop)/products/page.js
export default function Products() {
  return <h1>Products</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Route Groups with Layouts
          </h3>
          <CodeBlock
            code={`// app/(marketing)/layout.js
// This layout only applies to routes in (marketing) group
export default function MarketingLayout({ children }) {
  return (
    <div className="marketing-layout">
      <nav>Marketing Nav</nav>
      {children}
    </div>
  );
}

// app/(marketing)/about/page.js
// Uses MarketingLayout, but URL is still /about
export default function About() {
  return <h1>About</h1>;
}

// app/(shop)/layout.js
// Different layout for shop routes
export default function ShopLayout({ children }) {
  return (
    <div className="shop-layout">
      <nav>Shop Nav</nav>
      {children}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Use Cases for Route Groups
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Organize routes by feature or section</li>
            <li>Apply different layouts to route groups</li>
            <li>Group routes without changing URLs</li>
            <li>Separate authentication requirements</li>
            <li>Organize large applications</li>
          </ul>
        </section>

        {/* Section 6: Parallel Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Parallel Routes @folder - @ Prefix Syntax
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Parallel routes allow you to simultaneously render multiple pages in
            the same layout. Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              @folder
            </code>{" "}
            syntax.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Parallel Route
          </h3>
          <CodeBlock
            code={`// Directory structure:
// app/
//   ├── layout.js
//   ├── page.js
//   ├── @analytics/
//   │   └── page.js
//   └── @team/
//       └── page.js

// app/layout.js
export default function Layout({ children, analytics, team }) {
  return (
    <div>
      {children}
      <div className="sidebar">
        {analytics}
        {team}
      </div>
    </div>
  );
}

// app/@analytics/page.js
export default function Analytics() {
  return <div>Analytics Dashboard</div>;
}

// app/@team/page.js
export default function Team() {
  return <div>Team Members</div>;
}

// app/page.js
export default function Home() {
  return <h1>Home</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Parallel Routes with Slots
          </h3>
          <CodeBlock
            code={`// app/dashboard/layout.js
export default function DashboardLayout({ 
  children, 
  @analytics, 
  @notifications 
}) {
  return (
    <div className="dashboard">
      <main>{children}</main>
      <aside>
        <div className="analytics-slot">{@analytics}</div>
        <div className="notifications-slot">{@notifications}</div>
      </aside>
    </div>
  );
}

// app/dashboard/@analytics/page.js
export default function Analytics() {
  return <div>Analytics</div>;
}

// app/dashboard/@notifications/page.js
export default function Notifications() {
  return <div>Notifications</div>;
}

// app/dashboard/page.js
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Default Slots with default.js
          </h3>
          <CodeBlock
            code={`// If a parallel route doesn't match, use default.js
// app/dashboard/@analytics/default.js
export default function DefaultAnalytics() {
  return <div>No analytics data</div>;
}

// This renders when /dashboard/@analytics doesn't have a matching route`}
            language="javascript"
          />
        </section>

        {/* Section 7: Intercepting Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Intercepting Routes (.), (..), (...) - Relative Path Syntax
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Intercepting routes allow you to show a route in a modal or overlay
            while keeping the URL unchanged. Use special folder syntax.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Intercepting Route Syntax
          </h3>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                (.)
              </code>{" "}
              - Intercept routes at the same level
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                (..)
              </code>{" "}
              - Intercept routes one level up
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                (..)(..)
              </code>{" "}
              - Intercept routes two levels up
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                (...)
              </code>{" "}
              - Intercept routes from the root
            </li>
          </ul>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Modal Example with Intercepting Routes
          </h3>
          <CodeBlock
            code={`// Directory structure:
// app/
//   ├── @modal/
//   │   └── (.)photo/
//   │       └── [id]/
//   │           └── page.js    → Intercepts /photo/[id]
//   └── photo/
//       └── [id]/
//           └── page.js        → Regular /photo/[id] route

// app/@modal/(.)photo/[id]/page.js
export default function PhotoModal({ params }) {
  return (
    <div className="modal">
      <h1>Photo {params.id}</h1>
      {/* Modal content */}
    </div>
  );
}

// app/photo/[id]/page.js
export default function PhotoPage({ params }) {
  return (
    <div>
      <h1>Photo {params.id}</h1>
      {/* Full page content */}
    </div>
  );
}

// When navigating to /photo/123:
// - If coming from another route: shows modal
// - If directly accessed: shows full page`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Intercepting One Level Up
          </h3>
          <CodeBlock
            code={`// app/feed/(..)photo/[id]/page.js
// This intercepts /photo/[id] from /feed

// Directory structure:
// app/
//   ├── feed/
//   │   └── (..)photo/
//   │       └── [id]/
//   │           └── page.js
//   └── photo/
//       └── [id]/
//           └── page.js`}
            language="javascript"
          />
        </section>

        {/* Section 8: Dynamic Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Dynamic Routes (app/[id]/page.js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Dynamic routes use square brackets to create routes with dynamic
            segments.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Single Dynamic Segment
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
// Matches: /products/1, /products/abc, /products/anything
export default async function ProductPage({ params }) {
  // In Next.js 15+, params is a Promise
  const { id } = await params;
  
  return <h1>Product {id}</h1>;
}

// TypeScript version:
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <h1>Product {id}</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Dynamic Segments
          </h3>
          <CodeBlock
            code={`// app/shop/[category]/[product]/page.js
// Matches: /shop/electronics/laptop, /shop/clothing/shirt
export default async function ProductPage({ params }) {
  const { category, product } = await params;
  
  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Product: {product}</h2>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 9: Catch-All Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            9. Catch-All Routes (app/[...slug]/page.js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Catch-all routes match multiple segments using the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [...slug]
            </code>{" "}
            syntax.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Catch-All Route
          </h3>
          <CodeBlock
            code={`// app/docs/[...slug]/page.js
// Matches: /docs, /docs/getting-started, /docs/getting-started/installation
export default async function DocsPage({ params }) {
  const { slug } = await params;
  // slug is an array: ['getting-started', 'installation']
  
  return (
    <div>
      <h1>Docs</h1>
      <p>Path: {slug.join('/')}</p>
    </div>
  );
}

// Examples:
// /docs → slug = []
// /docs/getting-started → slug = ['getting-started']
// /docs/getting-started/installation → slug = ['getting-started', 'installation']`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Catch-All with Dynamic Route
          </h3>
          <CodeBlock
            code={`// app/shop/[...slug]/page.js
// Matches: /shop, /shop/category, /shop/category/product, etc.
export default async function ShopPage({ params }) {
  const { slug } = await params;
  
  if (slug.length === 0) {
    return <h1>Shop Home</h1>;
  }
  
  if (slug.length === 1) {
    return <h1>Category: {slug[0]}</h1>;
  }
  
  return <h1>Product: {slug.join(' / ')}</h1>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 10: Optional Catch-All */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            10. Optional Catch-All Routes (app/[[...slug]]/page.js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Optional catch-all routes use double brackets{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [[...slug]]
            </code>{" "}
            and match zero or more segments.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Optional Catch-All Example
          </h3>
          <CodeBlock
            code={`// app/blog/[[...slug]]/page.js
// Matches: /blog, /blog/post-1, /blog/category/post-1
export default async function BlogPage({ params }) {
  const { slug } = await params;
  
  if (!slug || slug.length === 0) {
    return <h1>Blog Home - All Posts</h1>;
  }
  
  if (slug.length === 1) {
    return <h1>Blog Post: {slug[0]}</h1>;
  }
  
  return <h1>Category: {slug[0]}, Post: {slug[1]}</h1>;
}

// Examples:
// /blog → slug = undefined or []
// /blog/my-post → slug = ['my-post']
// /blog/tech/react → slug = ['tech', 'react']`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Difference: Catch-All vs Optional Catch-All
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    Route Pattern
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    Matches /blog
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    Matches /blog/post
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    [...slug]
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ❌ No
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ✅ Yes
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    [[...slug]]
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ✅ Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ✅ Yes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 11: Nested Dynamic Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            11. Nested Dynamic Routes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            You can combine dynamic routes, catch-all routes, and static
            segments in any combination.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complex Nested Dynamic Route
          </h3>
          <CodeBlock
            code={`// app/shop/[category]/products/[...filters]/page.js
// Matches: /shop/electronics/products, /shop/electronics/products/price-low, etc.
export default async function ProductsPage({ params }) {
  const { category, filters } = await params;
  
  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Filters: {filters?.join(', ') || 'None'}</h2>
    </div>
  );
}

// Examples:
// /shop/electronics/products → category='electronics', filters=[]
// /shop/electronics/products/price-low → category='electronics', filters=['price-low']
// /shop/electronics/products/price-low/brand-samsung → category='electronics', filters=['price-low', 'brand-samsung']`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Route Priority
          </h3>
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            Next.js matches routes in this order:
          </p>
          <ol className="list-inside list-decimal space-y-1 text-gray-600 dark:text-gray-300">
            <li>Static routes (highest priority)</li>
            <li>Dynamic routes ([id])</li>
            <li>Catch-all routes ([...slug])</li>
            <li>Optional catch-all routes ([[...slug]])</li>
          </ol>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to B2 Lessons
          </Link>
          <Link
            href="/learn/app-router/b2/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B2.2 Special Files →
          </Link>
        </div>
      </div>
    </div>
  );
}
