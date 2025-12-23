"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: "🏠",
  },
  {
    name: "Learning Hub",
    href: "/learn",
    icon: "📚",
  },
  {
    name: "App Router",
    href: "/learn/app-router",
    icon: "⚡",
    children: [
      {
        name: "B1: Foundation & Setup",
        href: "/learn/app-router/b1",
        children: [
          {
            name: "B1.1: Project Setup",
            href: "/learn/app-router/b1/lesson-1",
          },
          {
            name: "B1.2: Core Concepts",
            href: "/learn/app-router/b1/lesson-2",
          },
        ],
      },
      {
        name: "B2: Routing System",
        href: "/learn/app-router/b2",
        children: [
          {
            name: "B2.1: Basic Routing",
            href: "/learn/app-router/b2/lesson-1",
          },
          {
            name: "B2.2: Special Files",
            href: "/learn/app-router/b2/lesson-2",
          },
          {
            name: "B2.3: Layout System",
            href: "/learn/app-router/b2/lesson-3",
          },
          {
            name: "B2.4: Loading States",
            href: "/learn/app-router/b2/lesson-4",
          },
          {
            name: "B2.5: Error Handling",
            href: "/learn/app-router/b2/lesson-5",
          },
          {
            name: "B2.6: Not Found Handling",
            href: "/learn/app-router/b2/lesson-6",
          },
        ],
      },
      {
        name: "B3: Data Fetching",
        href: "/learn/app-router/b3",
        children: [
          {
            name: "B3.1: Server Components Data Fetching",
            href: "/learn/app-router/b3/lesson-1",
          },
          {
            name: "B3.2: Caching Functions",
            href: "/learn/app-router/b3/lesson-2",
          },
          {
            name: "B3.3: Client-Side Data Fetching",
            href: "/learn/app-router/b3/lesson-3",
          },
          {
            name: "B3.4: Streaming & Suspense",
            href: "/learn/app-router/b3/lesson-4",
          },
        ],
      },
      {
        name: "B4: Server Actions",
        href: "/learn/app-router/b4",
        children: [
          {
            name: "B4.1: Server Actions Basics",
            href: "/learn/app-router/b4/lesson-1",
          },
          {
            name: "B4.2: Form Actions",
            href: "/learn/app-router/b4/lesson-2",
          },
          {
            name: "B4.3: Server Actions Patterns",
            href: "/learn/app-router/b4/lesson-3",
          },
        ],
      },
      {
        name: "B5: Route Handlers",
        href: "/learn/app-router/b5",
        children: [
          {
            name: "B5.1: Route Handler Basics",
            href: "/learn/app-router/b5/lesson-1",
          },
          {
            name: "B5.2: Route Handler Features",
            href: "/learn/app-router/b5/lesson-2",
          },
          {
            name: "B5.3: Route Handler Patterns",
            href: "/learn/app-router/b5/lesson-3",
          },
        ],
      },
      {
        name: "B6: Navigation & Routing",
        href: "/learn/app-router/b6",
        children: [
          {
            name: "B6.1: next/navigation",
            href: "/learn/app-router/b6/lesson-1",
          },
          {
            name: "B6.2: next/link",
            href: "/learn/app-router/b6/lesson-2",
          },
          {
            name: "B6.3: URL State Management",
            href: "/learn/app-router/b6/lesson-3",
          },
        ],
      },
      {
        name: "B7: Metadata API",
        href: "/learn/app-router/b7",
        children: [
          {
            name: "B7.1: Static Metadata",
            href: "/learn/app-router/b7/lesson-1",
          },
          {
            name: "B7.2: Dynamic Metadata",
            href: "/learn/app-router/b7/lesson-2",
          },
          {
            name: "B7.3: Metadata Patterns",
            href: "/learn/app-router/b7/lesson-3",
          },
        ],
      },
      {
        name: "B8: Components & Features",
        href: "/learn/app-router/b8",
        children: [
          {
            name: "B8.1: next/image",
            href: "/learn/app-router/b8/lesson-1",
          },
          {
            name: "B8.2: next/script",
            href: "/learn/app-router/b8/lesson-2",
          },
          {
            name: "B8.3: next/font",
            href: "/learn/app-router/b8/lesson-3",
          },
        ],
      },
      {
        name: "B9: Styling",
        href: "/learn/app-router/b9",
        children: [
          {
            name: "B9.1: CSS Modules",
            href: "/learn/app-router/b9/lesson-1",
          },
          {
            name: "B9.2: Global CSS",
            href: "/learn/app-router/b9/lesson-2",
          },
          {
            name: "B9.3: CSS-in-JS",
            href: "/learn/app-router/b9/lesson-3",
          },
          {
            name: "B9.4: Sass/SCSS",
            href: "/learn/app-router/b9/lesson-4",
          },
          {
            name: "B9.5: Tailwind CSS",
            href: "/learn/app-router/b9/lesson-5",
          },
        ],
      },
      {
        name: "B10: Advanced Features",
        href: "/learn/app-router/b10",
        children: [
          {
            name: "B10.1: Middleware",
            href: "/learn/app-router/b10/lesson-1",
          },
          {
            name: "B10.2: Route Segment Config",
            href: "/learn/app-router/b10/lesson-2",
          },
          {
            name: "B10.3: Internationalization",
            href: "/learn/app-router/b10/lesson-3",
          },
          {
            name: "B10.4: Redirects & Rewrites",
            href: "/learn/app-router/b10/lesson-4",
          },
          {
            name: "B10.5: Environment Variables",
            href: "/learn/app-router/b10/lesson-5",
          },
          {
            name: "B10.6: Draft Mode",
            href: "/learn/app-router/b10/lesson-6",
          },
        ],
      },
      {
        name: "B11: Optimization",
        href: "/learn/app-router/b11",
        children: [
          {
            name: "B11.1: Performance",
            href: "/learn/app-router/b11/lesson-1",
          },
          {
            name: "B11.2: Caching",
            href: "/learn/app-router/b11/lesson-2",
          },
          {
            name: "B11.3: SEO",
            href: "/learn/app-router/b11/lesson-3",
          },
        ],
      },
      {
        name: "B12: Deployment",
        href: "/learn/app-router/b12",
        children: [
          {
            name: "B12.1: Build Process",
            href: "/learn/app-router/b12/lesson-1",
          },
          {
            name: "B12.2: Deployment Platforms",
            href: "/learn/app-router/b12/lesson-2",
          },
          {
            name: "B12.3: Production Configuration",
            href: "/learn/app-router/b12/lesson-3",
          },
        ],
      },
      {
        name: "B13: Interview Cheatsheet",
        href: "/learn/app-router/b13",
        children: [
          {
            name: "B13.1: Core Concepts Quick Reference",
            href: "/learn/app-router/b13/lesson-1",
          },
          {
            name: "B13.2: Data Fetching & Caching",
            href: "/learn/app-router/b13/lesson-2",
          },
          {
            name: "B13.3: Routing & Navigation Patterns",
            href: "/learn/app-router/b13/lesson-3",
          },
          {
            name: "B13.4: Server Actions & Forms",
            href: "/learn/app-router/b13/lesson-4",
          },
          {
            name: "B13.5: API Routes & Route Handlers",
            href: "/learn/app-router/b13/lesson-5",
          },
          {
            name: "B13.6: Metadata & SEO",
            href: "/learn/app-router/b13/lesson-6",
          },
          {
            name: "B13.7: Performance & Optimization",
            href: "/learn/app-router/b13/lesson-7",
          },
          {
            name: "B13.8: Common Interview Questions",
            href: "/learn/app-router/b13/lesson-8",
          },
          {
            name: "B13.9: Best Practices & Patterns",
            href: "/learn/app-router/b13/lesson-9",
          },
          {
            name: "B13.10: Advanced Patterns",
            href: "/learn/app-router/b13/lesson-10",
          },
        ],
      },
    ],
  },
  {
    name: "Pages Router",
    href: "/learn/pages-router",
    icon: "📄",
    children: [
      {
        name: "A1: Foundation & Setup",
        href: "/learn/pages-router/a1",
        children: [
          {
            name: "A1.1: Project Setup",
            href: "/learn/pages-router/a1/lesson-1",
          },
          {
            name: "A1.2: Core Concepts",
            href: "/learn/pages-router/a1/lesson-2",
          },
        ],
      },
      {
        name: "A2: Routing System",
        href: "/learn/pages-router/a2",
        children: [
          {
            name: "A2.1: Basic Routing",
            href: "/learn/pages-router/a2/lesson-1",
          },
          {
            name: "A2.2: Special Pages",
            href: "/learn/pages-router/a2/lesson-2",
          },
          {
            name: "A2.3: Routing Features",
            href: "/learn/pages-router/a2/lesson-3",
          },
        ],
      },
      {
        name: "A3: Data Fetching",
        href: "/learn/pages-router/a3",
        children: [
          {
            name: "A3.1: getServerSideProps",
            href: "/learn/pages-router/a3/lesson-1",
          },
          {
            name: "A3.2: getStaticProps",
            href: "/learn/pages-router/a3/lesson-2",
          },
          {
            name: "A3.3: getStaticPaths",
            href: "/learn/pages-router/a3/lesson-3",
          },
          {
            name: "A3.4: getInitialProps (Legacy)",
            href: "/learn/pages-router/a3/lesson-4",
          },
          {
            name: "A3.5: Client-Side Data Fetching",
            href: "/learn/pages-router/a3/lesson-5",
          },
        ],
      },
      {
        name: "A4: API Routes",
        href: "/learn/pages-router/a4",
        children: [
          {
            name: "A4.1: API Route Basics",
            href: "/learn/pages-router/a4/lesson-1",
          },
          {
            name: "A4.2: API Route Features",
            href: "/learn/pages-router/a4/lesson-2",
          },
          {
            name: "A4.3: API Route Patterns",
            href: "/learn/pages-router/a4/lesson-3",
          },
        ],
      },
      {
        name: "A5: Components & Features",
        href: "/learn/pages-router/a5",
        children: [
          {
            name: "A5.1: next/head",
            href: "/learn/pages-router/a5/lesson-1",
          },
          {
            name: "A5.2: next/image",
            href: "/learn/pages-router/a5/lesson-2",
          },
          {
            name: "A5.3: next/script",
            href: "/learn/pages-router/a5/lesson-3",
          },
          {
            name: "A5.4: next/font",
            href: "/learn/pages-router/a5/lesson-4",
          },
        ],
      },
      {
        name: "A6: Custom App & Document",
        href: "/learn/pages-router/a6",
        children: [
          {
            name: "A6.1: Custom _app.js",
            href: "/learn/pages-router/a6/lesson-1",
          },
          {
            name: "A6.2: Custom _document.js",
            href: "/learn/pages-router/a6/lesson-2",
          },
        ],
      },
      {
        name: "A7: Styling",
        href: "/learn/pages-router/a7",
        children: [
          {
            name: "A7.1: CSS Modules",
            href: "/learn/pages-router/a7/lesson-1",
          },
          {
            name: "A7.2: Global CSS",
            href: "/learn/pages-router/a7/lesson-2",
          },
          {
            name: "A7.3: CSS-in-JS",
            href: "/learn/pages-router/a7/lesson-3",
          },
          {
            name: "A7.4: Sass/SCSS",
            href: "/learn/pages-router/a7/lesson-4",
          },
          {
            name: "A7.5: Tailwind CSS",
            href: "/learn/pages-router/a7/lesson-5",
          },
        ],
      },
      {
        name: "A8: Advanced Features",
        href: "/learn/pages-router/a8",
        children: [
          {
            name: "A8.1: Middleware (Pages Router)",
            href: "/learn/pages-router/a8/lesson-1",
          },
          {
            name: "A8.2: Internationalization (i18n)",
            href: "/learn/pages-router/a8/lesson-2",
          },
          {
            name: "A8.3: Preview Mode",
            href: "/learn/pages-router/a8/lesson-3",
          },
          {
            name: "A8.4: Redirects & Rewrites",
            href: "/learn/pages-router/a8/lesson-4",
          },
          {
            name: "A8.5: Environment Variables",
            href: "/learn/pages-router/a8/lesson-5",
          },
        ],
      },
      {
        name: "A9: Optimization",
        href: "/learn/pages-router/a9",
        children: [
          {
            name: "A9.1: Performance",
            href: "/learn/pages-router/a9/lesson-1",
          },
          {
            name: "A9.2: Caching",
            href: "/learn/pages-router/a9/lesson-2",
          },
          {
            name: "A9.3: SEO",
            href: "/learn/pages-router/a9/lesson-3",
          },
        ],
      },
      {
        name: "A10: Deployment",
        href: "/learn/pages-router/a10",
        children: [
          {
            name: "A10.1: Build Process",
            href: "/learn/pages-router/a10/lesson-1",
          },
          {
            name: "A10.2: Deployment Platforms",
            href: "/learn/pages-router/a10/lesson-2",
          },
          {
            name: "A10.3: Production Configuration",
            href: "/learn/pages-router/a10/lesson-3",
          },
        ],
      },
      {
        name: "A11: Interview Cheatsheet",
        href: "/learn/pages-router/a11",
        children: [
          {
            name: "A11.1: Core Concepts Quick Reference",
            href: "/learn/pages-router/a11/lesson-1",
          },
          {
            name: "A11.2: Data Fetching Methods",
            href: "/learn/pages-router/a11/lesson-2",
          },
          {
            name: "A11.3: Routing & Navigation Patterns",
            href: "/learn/pages-router/a11/lesson-3",
          },
          {
            name: "A11.4: API Routes Reference",
            href: "/learn/pages-router/a11/lesson-4",
          },
          {
            name: "A11.5: Custom App & Document",
            href: "/learn/pages-router/a11/lesson-5",
          },
          {
            name: "A11.6: Head & Metadata Management",
            href: "/learn/pages-router/a11/lesson-6",
          },
          {
            name: "A11.7: Performance & Optimization",
            href: "/learn/pages-router/a11/lesson-7",
          },
          {
            name: "A11.8: Common Interview Questions",
            href: "/learn/pages-router/a11/lesson-8",
          },
          {
            name: "A11.9: Best Practices & Patterns",
            href: "/learn/pages-router/a11/lesson-9",
          },
          {
            name: "A11.10: Advanced Patterns",
            href: "/learn/pages-router/a11/lesson-10",
          },
        ],
      },
    ],
  },
  {
    name: "Comparison & Common Features",
    href: "/learn/comparison",
    icon: "🔄",
    children: [
      {
        name: "C1: Common Features (Work in Both)",
        href: "/learn/comparison/c1",
        children: [
          {
            name: "C1.1: next/image",
            href: "/learn/comparison/c1/lesson-1",
          },
          {
            name: "C1.2: next/script",
            href: "/learn/comparison/c1/lesson-2",
          },
          {
            name: "C1.3: next/font",
            href: "/learn/comparison/c1/lesson-3",
          },
          {
            name: "C1.4: next.config.js",
            href: "/learn/comparison/c1/lesson-4",
          },
          {
            name: "C1.5: Middleware",
            href: "/learn/comparison/c1/lesson-5",
          },
          {
            name: "C1.6: Environment Variables",
            href: "/learn/comparison/c1/lesson-6",
          },
          {
            name: "C1.7: Styling",
            href: "/learn/comparison/c1/lesson-7",
          },
          {
            name: "C1.8: Deployment",
            href: "/learn/comparison/c1/lesson-8",
          },
          {
            name: "C1.9: Optimization",
            href: "/learn/comparison/c1/lesson-9",
          },
        ],
      },
      {
        name: "C2: Key Differences",
        href: "/learn/comparison/c2",
        children: [
          {
            name: "C2.1: Routing",
            href: "/learn/comparison/c2/lesson-1",
          },
          {
            name: "C2.2: Data Fetching",
            href: "/learn/comparison/c2/lesson-2",
          },
          {
            name: "C2.3: Navigation",
            href: "/learn/comparison/c2/lesson-3",
          },
          {
            name: "C2.4: Layouts",
            href: "/learn/comparison/c2/lesson-4",
          },
          {
            name: "C2.5: Metadata",
            href: "/learn/comparison/c2/lesson-5",
          },
          {
            name: "C2.6: Loading States",
            href: "/learn/comparison/c2/lesson-6",
          },
          {
            name: "C2.7: Error Handling",
            href: "/learn/comparison/c2/lesson-7",
          },
          {
            name: "C2.8: API Routes",
            href: "/learn/comparison/c2/lesson-8",
          },
          {
            name: "C2.9: Special Features",
            href: "/learn/comparison/c2/lesson-9",
          },
        ],
      },
      {
        name: "C3: Migration Considerations",
        href: "/learn/comparison/c3",
        children: [
          {
            name: "C3.1: When to use Pages Router",
            href: "/learn/comparison/c3/lesson-1",
          },
          {
            name: "C3.2: When to use App Router",
            href: "/learn/comparison/c3/lesson-2",
          },
          {
            name: "C3.3: Migration Strategies",
            href: "/learn/comparison/c3/lesson-3",
          },
          {
            name: "C3.4: Coexistence Patterns",
            href: "/learn/comparison/c3/lesson-4",
          },
        ],
      },
    ],
  },
  {
    name: "Recent Updates",
    href: "/learn/recent-updates",
    icon: "🆕",
    children: [
      {
        name: "Next.js 16 - New Features",
        href: "/learn/recent-updates/v16",
        children: [
          {
            name: "V16.1: Cache Components",
            href: "/learn/recent-updates/v16/lesson-1",
          },
          {
            name: "V16.2: Proxy.ts",
            href: "/learn/recent-updates/v16/lesson-2",
          },
          {
            name: "V16.3: Enhanced Caching APIs",
            href: "/learn/recent-updates/v16/lesson-3",
          },
          {
            name: "V16.4: Turbopack Default",
            href: "/learn/recent-updates/v16/lesson-4",
          },
          {
            name: "V16.5: Smart Routing",
            href: "/learn/recent-updates/v16/lesson-5",
          },
          {
            name: "V16.6: React 19.2 Integration",
            href: "/learn/recent-updates/v16/lesson-6",
          },
          {
            name: "V16.7: Build Adapters API",
            href: "/learn/recent-updates/v16/lesson-7",
          },
          {
            name: "V16.8: Breaking Changes",
            href: "/learn/recent-updates/v16/lesson-8",
          },
        ],
      },
    ],
  },
];

function NavItem({ item, pathname, level = 0 }) {
  const [isOpen, setIsOpen] = useState(
    item.children?.some(
      (child) =>
        child.href === pathname ||
        child.children?.some((grandchild) => grandchild.href === pathname)
    ) || false
  );

  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;

  if (item.disabled) {
    return (
      <div className="cursor-not-allowed opacity-50">
        <div className="flex items-center gap-2 px-4 py-2 text-gray-400">
          <span>{item.icon}</span>
          <span>{item.name}</span>
          <span className="ml-auto text-xs">🔒</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {hasChildren ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex w-full items-center gap-2 px-4 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActive
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
            style={{ paddingLeft: `${level * 1 + 1}rem` }}
          >
            <span>{item.icon}</span>
            <span className="flex-1">{item.name}</span>
            <span
              className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
            >
              ▶
            </span>
          </button>
          {isOpen && (
            <div className="ml-4">
              {item.children.map((child) => (
                <NavItem
                  key={child.href}
                  item={child}
                  pathname={pathname}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          className={`flex items-center gap-2 px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isActive
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300"
          }`}
          style={{ paddingLeft: `${level * 1 + 1}rem` }}
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      )}
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="sticky top-0 h-screen overflow-y-auto p-4">
        <Link href="/" className="mb-6 block">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Next.js Mastery
          </h1>
        </Link>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
