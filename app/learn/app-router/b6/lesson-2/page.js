import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B6.2: next/link - Next.js Mastery",
  description: "Complete guide to Link component in Next.js App Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b6"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B6 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B6.2: next/link
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use the Link component from next/link: all props,
          prefetching, scroll behavior, and active link styling.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Link Component Basics */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Link Component Basics
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              Link
            </code>{" "}
            component enables client-side navigation between pages. It
            automatically prefetches routes and provides optimized navigation.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Link Usage
          </h3>
          <CodeBlock
            code={`// app/components/Navigation.js
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}

// With children
<Link href="/dashboard">
  <button>Go to Dashboard</button>
</Link>

// With text
<Link href="/blog">Read Blog</Link>

// With custom element
<Link href="/products">
  <div className="card">
    <h2>Products</h2>
  </div>
</Link>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Link with Dynamic Routes
          </h3>
          <CodeBlock
            code={`// app/components/UserList.js
import Link from 'next/link';

export default function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href={\`/users/\${user.id}\`}>
            {user.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// With template literals
const userId = '123';
<Link href={\`/users/\${userId}\`}>User Profile</Link>

// With query parameters
<Link href={\`/search?q=\${encodeURIComponent(query)}\`}>
  Search Results
</Link>

// With hash
<Link href="/page#section">Go to Section</Link>`}
            language="javascript"
          />
        </section>

        {/* Section 2: Link Props */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Link Component Props
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The Link component accepts various props to control its behavior:
            href, prefetch, replace, scroll, shallow, and more.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            href Prop
          </h3>
          <CodeBlock
            code={`// app/components/Links.js
import Link from 'next/link';

export default function Links() {
  return (
    <div>
      {/* String href */}
      <Link href="/about">About</Link>
      
      {/* Object href with pathname */}
      <Link href={{ pathname: '/users', query: { id: '123' } }}>
        User 123
      </Link>
      
      {/* Object href with pathname and hash */}
      <Link href={{ pathname: '/page', hash: 'section' }}>
        Section
      </Link>
      
      {/* External URL (uses regular <a> tag) */}
      <Link href="https://example.com">External</Link>
    </div>
  );
}

// Note: In App Router, object href format is less common
// Prefer string hrefs with query params in the URL`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            prefetch Prop
          </h3>
          <CodeBlock
            code={`// app/components/Navigation.js
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* Default: prefetch={true} - prefetches in viewport */}
      <Link href="/about">About</Link>
      
      {/* Disable prefetching */}
      <Link href="/admin" prefetch={false}>
        Admin (No Prefetch)
      </Link>
      
      {/* Enable prefetching explicitly */}
      <Link href="/dashboard" prefetch={true}>
        Dashboard
      </Link>
    </nav>
  );
}

// When to disable prefetch:
// - Private/authenticated routes
// - Routes that shouldn't be prefetched
// - External links (automatically disabled)
<Link href="/private" prefetch={false}>Private</Link>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            replace Prop
          </h3>
          <CodeBlock
            code={`// app/components/LoginForm.js
import Link from 'next/link';

export default function LoginForm() {
  return (
    <form>
      {/* After login, replace current route in history */}
      <Link href="/dashboard" replace>
        Login and Go to Dashboard
      </Link>
    </form>
  );
}

// Use replace when:
// - User shouldn't go back to previous page
// - After form submission
// - After authentication
<Link href="/success" replace>Submit</Link>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            scroll Prop
          </h3>
          <CodeBlock
            code={`// app/components/Navigation.js
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* Default: scroll={true} - scrolls to top */}
      <Link href="/about">About</Link>
      
      {/* Disable scroll to top */}
      <Link href="/settings" scroll={false}>
        Settings (No Scroll)
      </Link>
      
      {/* Enable scroll explicitly */}
      <Link href="/contact" scroll={true}>
        Contact
      </Link>
    </nav>
  );
}

// Use scroll={false} when:
// - Navigating to same page with different params
// - Preserving scroll position
// - Hash navigation (handled automatically)
<Link href="/page#section" scroll={false}>
  Section
</Link>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            All Link Props
          </h3>
          <CodeBlock
            code={`// app/components/CompleteLink.js
import Link from 'next/link';

export default function CompleteLink() {
  return (
    <Link
      href="/example"
      prefetch={true}        // Prefetch route (default: true)
      replace={false}       // Replace in history (default: false)
      scroll={true}         // Scroll to top (default: true)
      className="link"      // CSS class
      style={{ color: 'blue' }} // Inline styles
      onClick={(e) => {     // Click handler
        console.log('Clicked');
      }}
      onMouseEnter={() => { // Mouse enter handler
        console.log('Hovered');
      }}
      target="_blank"       // Open in new tab (for external links)
      rel="noopener noreferrer" // Security for external links
    >
      Example Link
    </Link>
  );
}

// Link props summary:
// - href: string | object - The destination URL
// - prefetch: boolean - Enable/disable prefetching (default: true)
// - replace: boolean - Replace current history entry (default: false)
// - scroll: boolean - Scroll to top on navigation (default: true)
// - className: string - CSS class name
// - style: object - Inline styles
// - onClick: function - Click event handler
// - onMouseEnter: function - Mouse enter handler
// - target: string - Link target (for external links)
// - rel: string - Link relationship`}
            language="javascript"
          />
        </section>

        {/* Section 3: Prefetching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Prefetching
          </h2>
          <p className="mb-600 dark:text-gray-300">
            Next.js automatically prefetches Link routes to provide instant
            navigation. You can control this behavior with the prefetch prop.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Automatic Prefetching
          </h3>
          <CodeBlock
            code={`// app/components/Navigation.js
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* Automatically prefetched when in viewport */}
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}

// Prefetching behavior:
// - Links in viewport are prefetched
// - Prefetching happens in production builds
// - Only prefetches when link is visible
// - Prefetches on hover (production)
// - Works for static and dynamic routes`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Disabling Prefetching
          </h3>
          <CodeBlock
            code={`// app/components/PrivateLinks.js
import Link from 'next/link';

export default function PrivateLinks() {
  return (
    <nav>
      {/* Disable prefetch for private routes */}
      <Link href="/admin" prefetch={false}>
        Admin Panel
      </Link>
      
      {/* Disable for authenticated routes */}
      <Link href="/dashboard" prefetch={false}>
        Dashboard
      </Link>
      
      {/* Disable for routes that require auth check */}
      <Link href="/settings" prefetch={false}>
        Settings
      </Link>
    </nav>
  );
}

// When to disable prefetch:
// - Routes requiring authentication
// - Routes with sensitive data
// - Routes that shouldn't be cached
// - External links (automatically disabled)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Conditional Prefetching
          </h3>
          <CodeBlock
            code={`// app/components/ConditionalLink.js
'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function ConditionalLink({ href, children }) {
  const [shouldPrefetch, setShouldPrefetch] = useState(false);
  
  return (
    <Link
      href={href}
      prefetch={shouldPrefetch}
      onMouseEnter={() => setShouldPrefetch(true)}
    >
      {children}
    </Link>
  );
}

// Prefetch based on user role
export default function RoleBasedLink({ href, userRole, children }) {
  const canPrefetch = userRole === 'admin';
  
  return (
    <Link href={href} prefetch={canPrefetch}>
      {children}
    </Link>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Scroll Behavior */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Scroll Behavior
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            By default, Next.js scrolls to the top of the page on navigation.
            You can control this behavior with the scroll prop.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Default Scroll Behavior
          </h3>
          <CodeBlock
            code={`// app/components/Navigation.js
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* Default: scrolls to top on navigation */}
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}

// After clicking a link:
// - Page scrolls to top
// - Smooth scroll behavior
// - Works for all route types`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Disabling Scroll
          </h3>
          <CodeBlock
            code={`// app/components/FilterLinks.js
import Link from 'next/link';

export default function FilterLinks() {
  return (
    <div>
      {/* Preserve scroll position when filtering */}
      <Link href="/products?category=electronics" scroll={false}>
        Electronics
      </Link>
      <Link href="/products?category=books" scroll={false}>
        Books
      </Link>
    </div>
  );
}

// Use scroll={false} when:
// - Updating query parameters
// - Preserving scroll position
// - Navigating within same page
// - Hash navigation (handled automatically)

// Example: Pagination
<Link href={\`/posts?page=\${nextPage}\`} scroll={false}>
  Next Page
</Link>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Hash Navigation
          </h3>
          <CodeBlock
            code={`// app/components/AnchorLinks.js
import Link from 'next/link';

export default function AnchorLinks() {
  return (
    <nav>
      {/* Hash navigation - scrolls to element */}
      <Link href="/page#section1">Section 1</Link>
      <Link href="/page#section2">Section 2</Link>
      <Link href="/page#section3">Section 3</Link>
    </nav>
  );
}

// Hash navigation behavior:
// - Automatically scrolls to element with matching id
// - scroll prop doesn't affect hash navigation
// - Works for same-page and cross-page navigation

// Same page hash
<Link href="#contact">Contact Section</Link>

// Cross-page hash
<Link href="/about#team">Team Section</Link>`}
            language="javascript"
          />
        </section>

        {/* Section 5: Shallow Routing Note */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Shallow Routing (Not in App Router)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Important:</strong> Shallow routing is not available in the
            App Router. This feature was available in the Pages Router but has
            been removed in the App Router.
          </p>

          <div className="mt-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> In the Pages Router, you could use{" "}
              <code className="rounded bg-yellow-100 px-2 py-1 dark:bg-yellow-800">
                shallow: true
              </code>{" "}
              to change the URL without running data fetching methods. This is
              not available in the App Router. Use{" "}
              <code className="rounded bg-yellow-100 px-2 py-1 dark:bg-yellow-800">
                router.replace()
              </code>{" "}
              or{" "}
              <code className="rounded bg-yellow-100 px-2 py-1 dark:bg-yellow-800">
                scroll={false}
              </code>{" "}
              for similar behavior.
            </p>
          </div>

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Alternative Approaches
          </h3>
          <CodeBlock
            code={`// Instead of shallow routing, use:

// 1. router.replace() for URL updates without history
'use client'
import { useRouter } from 'next/navigation';

export default function FilterComponent() {
  const router = useRouter();
  
  const updateFilter = (filter) => {
    router.replace(\`/products?filter=\${filter}\`);
  };
  
  return <button onClick={() => updateFilter('new')}>New</button>;
}

// 2. scroll={false} to preserve scroll position
import Link from 'next/link';

<Link href="/products?filter=new" scroll={false}>
  Filter
</Link>

// 3. Search params management (see B6.3)
'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function FilterControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.replace(\`\${pathname}?\${params.toString()}\`);
  };
  
  return <button onClick={() => updateFilter('filter', 'new')}>New</button>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Active Link Styling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Active Link Styling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Style active links by combining Link with usePathname to detect the
            current route.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Active Link
          </h3>
          <CodeBlock
            code={`// app/components/ActiveLink.js
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={isActive ? 'text-blue-600 font-bold' : 'text-gray-600'}
    >
      {children}
    </Link>
  );
}

// Usage
<ActiveLink href="/about">About</ActiveLink>
<ActiveLink href="/contact">Contact</ActiveLink>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Active Link with Pathname Matching
          </h3>
          <CodeBlock
            code={`// app/components/NavLink.js
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children, exact = false }) {
  const pathname = usePathname();
  
  // Exact match
  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href);
  
  return (
    <Link
      href={href}
      className={\`nav-link \${isActive ? 'active' : ''}\`}
    >
      {children}
    </Link>
  );
}

// Usage
<NavLink href="/dashboard" exact>Dashboard</NavLink>
<NavLink href="/dashboard">Dashboard (includes sub-routes)</NavLink>

// CSS
// .nav-link.active {
//   color: blue;
//   font-weight: bold;
// }`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Active Link with Custom Styling
          </h3>
          <CodeBlock
            code={`// app/components/StyledLink.js
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // clsx or similar

export default function StyledLink({ href, children, className }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 rounded transition-colors',
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        className
      )}
    >
      {children}
    </Link>
  );
}

// With Tailwind CSS
export default function TailwindLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={\`px-4 py-2 rounded transition-colors \${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }\`}
    >
      {children}
    </Link>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Navigation Component with Active Links
          </h3>
          <CodeBlock
            code={`// app/components/Navigation.js
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="flex gap-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={\`px-4 py-2 rounded \${
              isActive
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }\`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b6/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B6.1 next/navigation
          </Link>
          <Link
            href="/learn/app-router/b6/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B6.3 URL State Management →
          </Link>
        </div>
      </div>
    </div>
  );
}
