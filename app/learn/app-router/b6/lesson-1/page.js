import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B6.1: next/navigation - Next.js Mastery",
  description: "Complete guide to next/navigation hooks and functions",
};

export default function Lesson1Page() {
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
          B6.1: next/navigation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn all navigation hooks and functions from next/navigation:
          useRouter, usePathname, useSearchParams, useParams, redirect,
          permanentRedirect, notFound, and navigation methods.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: useRouter hook */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. useRouter Hook
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              useRouter
            </code>{" "}
            hook provides programmatic navigation methods. It must be used in
            Client Components.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic useRouter Usage
          </h3>
          <CodeBlock
            code={`// app/components/Navigation.js
'use client'

import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  
  return (
    <div>
      <button onClick={() => router.push('/about')}>
        Go to About
      </button>
      <button onClick={() => router.replace('/home')}>
        Replace with Home
      </button>
      <button onClick={() => router.refresh()}>
        Refresh
      </button>
      <button onClick={() => router.back()}>
        Go Back
      </button>
      <button onClick={() => router.forward()}>
        Go Forward
      </button>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.push() - Navigate to Route
          </h3>
          <CodeBlock
            code={`// app/components/UserNavigation.js
'use client'

import { useRouter } from 'next/navigation';

export default function UserNavigation() {
  const router = useRouter();
  
  // Navigate to a route
  const goToProfile = () => {
    router.push('/profile');
  };
  
  // Navigate with query parameters
  const goToUser = (userId) => {
    router.push(\`/users/\${userId}\`);
  };
  
  // Navigate with search params
  const goToSearch = (query) => {
    router.push(\`/search?q=\${encodeURIComponent(query)}\`);
  };
  
  // Navigate with hash
  const goToSection = (sectionId) => {
    router.push(\`/page#\${sectionId}\`);
  };
  
  return (
    <div>
      <button onClick={goToProfile}>View Profile</button>
      <button onClick={() => goToUser('123')}>View User 123</button>
      <button onClick={() => goToSearch('nextjs')}>Search</button>
      <button onClick={() => goToSection('contact')}>Contact Section</button>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.replace() - Replace Current Route
          </h3>
          <CodeBlock
            code={`// app/components/LoginForm.js
'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Login logic
      await loginUser();
      
      // Replace current route (don't add to history)
      router.replace('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// Redirect after form submission
const handleSubmit = async () => {
  await submitForm();
  router.replace('/success'); // User can't go back to form
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.refresh() - Refresh Current Route
          </h3>
          <CodeBlock
            code={`// app/components/RefreshButton.js
'use client'

import { useRouter } from 'next/navigation';

export default function RefreshButton() {
  const router = useRouter();
  
  const handleRefresh = () => {
    // Refresh the current route and re-fetch data
    router.refresh();
  };
  
  return (
    <button onClick={handleRefresh}>
      Refresh Data
    </button>
  );
}

// Refresh after mutation
const handleUpdate = async () => {
  await updateData();
  router.refresh(); // Re-fetch Server Component data
};

// Refresh with loading state
const [isRefreshing, setIsRefreshing] = useState(false);

const handleRefresh = async () => {
  setIsRefreshing(true);
  router.refresh();
  // Note: refresh is async, but doesn't return a promise
  setTimeout(() => setIsRefreshing(false), 1000);
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.back() - Navigate Back
          </h3>
          <CodeBlock
            code={`// app/components/BackButton.js
'use client'

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  
  return (
    <button onClick={() => router.back()}>
      ← Back
    </button>
  );
}

// Back with fallback
const handleBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/'); // Fallback to home
  }
};

// Back after action
const handleCancel = () => {
  // Cancel action and go back
  router.back();
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.forward() - Navigate Forward
          </h3>
          <CodeBlock
            code={`// app/components/ForwardButton.js
'use client'

import { useRouter } from 'next/navigation';

export default function ForwardButton() {
  const router = useRouter();
  
  return (
    <button onClick={() => router.forward()}>
      Forward →
    </button>
  );
}

// Forward with check
const handleForward = () => {
  // Only forward if there's history to go forward to
  if (window.history.length > 0) {
    router.forward();
  }
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            router.prefetch() - Prefetch Route
          </h3>
          <CodeBlock
            code={`// app/components/LinkPreview.js
'use client'

import { useRouter } from 'next/navigation';

export default function LinkPreview({ href }) {
  const router = useRouter();
  
  // Prefetch on hover
  const handleMouseEnter = () => {
    router.prefetch(href);
  };
  
  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      className="hover:underline"
    >
      {href}
    </a>
  );
}

// Prefetch multiple routes
const prefetchRoutes = ['/about', '/contact', '/blog'];
prefetchRoutes.forEach(route => router.prefetch(route));

// Conditional prefetch
if (shouldPrefetch) {
  router.prefetch('/dashboard');
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: usePathname hook */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. usePathname Hook
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              usePathname
            </code>{" "}
            hook returns the current pathname. It's useful for active link
            styling and conditional rendering.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic usePathname Usage
          </h3>
          <CodeBlock
            code={`// app/components/Navigation.js
'use client'

import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav>
      <p>Current path: {pathname}</p>
      <ul>
        <li>
          <a href="/" className={pathname === '/' ? 'active' : ''}>
            Home
          </a>
        </li>
        <li>
          <a href="/about" className={pathname === '/about' ? 'active' : ''}>
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Active Link Styling
          </h3>
          <CodeBlock
            code={`// app/components/NavLink.js
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
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

// With pathname matching
export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  
  return (
    <Link
      href={href}
      className={isActive ? 'active' : ''}
    >
      {children}
    </Link>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Conditional Rendering Based on Pathname
          </h3>
          <CodeBlock
            code={`// app/components/ConditionalContent.js
'use client'

import { usePathname } from 'next/navigation';

export default function ConditionalContent() {
  const pathname = usePathname();
  
  // Show different content based on pathname
  if (pathname.startsWith('/admin')) {
    return <AdminPanel />;
  }
  
  if (pathname.startsWith('/dashboard')) {
    return <Dashboard />;
  }
  
  return <DefaultContent />;
}

// Show/hide components
export default function Header() {
  const pathname = usePathname();
  const showHeader = !pathname.startsWith('/login');
  
  return showHeader ? <header>Header</header> : null;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: useSearchParams hook */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. useSearchParams Hook
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              useSearchParams
            </code>{" "}
            hook returns the current URL's search parameters. It returns a
            ReadonlyURLSearchParams object.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic useSearchParams Usage
          </h3>
          <CodeBlock
            code={`// app/components/SearchResults.js
'use client'

import { useSearchParams } from 'next/navigation';

export default function SearchResults() {
  const searchParams = useSearchParams();
  
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'relevance';
  
  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <p>Page: {page}</p>
      <p>Sort: {sort}</p>
    </div>
  );
}

// Get all search params
export default function FilterPanel() {
  const searchParams = useSearchParams();
  
  // Get all params as object
  const params = Object.fromEntries(searchParams.entries());
  
  return (
    <div>
      {Object.entries(params).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Updating Search Params
          </h3>
          <CodeBlock
            code={`// app/components/FilterControls.js
'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function FilterControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(\`\${pathname}?\${params.toString()}\`);
  };
  
  return (
    <div>
      <select onChange={(e) => updateFilter('sort', e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="date">Date</option>
        <option value="price">Price</option>
      </select>
      
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => updateFilter('q', e.target.value)}
      />
    </div>
  );
}

// Replace search params (no history entry)
const replaceFilter = (key, value) => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  router.replace(\`\${pathname}?\${params.toString()}\`);
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Search Params
          </h3>
          <CodeBlock
            code={`// app/components/MultiFilter.js
'use client'

import { useSearchParams } from 'next/navigation';

export default function MultiFilter() {
  const searchParams = useSearchParams();
  
  // Get all values for a key
  const categories = searchParams.getAll('category');
  // URL: /products?category=electronics&category=books
  // categories = ['electronics', 'books']
  
  // Check if param exists
  const hasDiscount = searchParams.has('discount');
  
  // Get with default
  const minPrice = searchParams.get('minPrice') || '0';
  const maxPrice = searchParams.get('maxPrice') || '1000';
  
  return (
    <div>
      <p>Categories: {categories.join(', ')}</p>
      <p>Has discount: {hasDiscount ? 'Yes' : 'No'}</p>
      <p>Price range: {minPrice} - {maxPrice}</p>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: useParams hook */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. useParams Hook
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              useParams
            </code>{" "}
            hook returns the dynamic route parameters for the current route.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic useParams Usage
          </h3>
          <CodeBlock
            code={`// app/users/[id]/page.js
'use client'

import { useParams } from 'next/navigation';

export default function UserPage() {
  const params = useParams();
  const { id } = params;
  
  return (
    <div>
      <h1>User ID: {id}</h1>
    </div>
  );
}

// app/posts/[postId]/comments/[commentId]/page.js
export default function CommentPage() {
  const params = useParams();
  const { postId, commentId } = params;
  
  return (
    <div>
      <p>Post ID: {postId}</p>
      <p>Comment ID: {commentId}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Catch-All Route Params
          </h3>
          <CodeBlock
            code={`// app/docs/[...slug]/page.js
'use client'

import { useParams } from 'next/navigation';

export default function DocsPage() {
  const params = useParams();
  const { slug } = params;
  
  // slug is an array: ['getting-started', 'installation']
  // for URL: /docs/getting-started/installation
  
  const path = Array.isArray(slug) ? slug.join('/') : slug;
  
  return (
    <div>
      <h1>Documentation: {path}</h1>
    </div>
  );
}

// Optional catch-all
// app/docs/[[...slug]]/page.js
export default function DocsPage() {
  const params = useParams();
  const { slug } = params;
  
  // slug can be undefined, string, or array
  if (!slug) {
    return <DocsIndex />;
  }
  
  const path = Array.isArray(slug) ? slug.join('/') : slug;
  return <DocContent path={path} />;
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: redirect function */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. redirect Function
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              redirect
            </code>{" "}
            function redirects to a different route. It can be used in Server
            Components, Server Actions, and Route Handlers.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic redirect Usage
          </h3>
          <CodeBlock
            code={`// app/dashboard/page.js
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return <div>Dashboard</div>;
}

// In Server Action
'use server'

import { redirect } from 'next/navigation';

export async function loginUser(formData) {
  const user = await authenticateUser(formData);
  
  if (user) {
    redirect('/dashboard');
  } else {
    redirect('/login?error=invalid');
  }
}

// In Route Handler
// app/api/auth/login/route.js
import { redirect } from 'next/navigation';

export async function POST(request) {
  const body = await request.json();
  const user = await authenticate(body);
  
  if (user) {
    redirect('/dashboard');
  }
  
  return Response.json({ error: 'Invalid credentials' }, { status: 401 });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            redirect with Status Code
          </h3>
          <CodeBlock
            code={`// app/api/old-route/route.js
import { redirect } from 'next/navigation';

export async function GET() {
  // Redirect with 307 (Temporary Redirect)
  redirect('/new-route', 307);
}

// app/moved/page.js
import { redirect } from 'next/navigation';

export default function MovedPage() {
  // Redirect with 301 (Permanent Redirect)
  redirect('/new-location', 301);
}

// Status codes:
// - 307: Temporary Redirect (default)
// - 301: Permanent Redirect
// - 302: Found (temporary)
// - 303: See Other`}
            language="javascript"
          />
        </section>

        {/* Section 6: permanentRedirect function */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. permanentRedirect Function
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              permanentRedirect
            </code>{" "}
            function performs a permanent redirect (301) to a different route.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            permanentRedirect Usage
          </h3>
          <CodeBlock
            code={`// app/old-page/page.js
import { permanentRedirect } from 'next/navigation';

export default function OldPage() {
  permanentRedirect('/new-page');
}

// app/api/v1/users/route.js
import { permanentRedirect } from 'next/navigation';

export async function GET() {
  // API endpoint moved permanently
  permanentRedirect('/api/v2/users');
}

// In Server Action
'use server'

import { permanentRedirect } from 'next/navigation';

export async function handleOldRoute() {
  permanentRedirect('/new-route');
}

// Note: permanentRedirect always uses 301 status code
// Use it when a resource has permanently moved`}
            language="javascript"
          />
        </section>

        {/* Section 7: notFound function */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. notFound Function
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              notFound
            </code>{" "}
            function triggers the nearest not-found boundary. It can be used in
            Server Components, Server Actions, and Route Handlers.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic notFound Usage
          </h3>
          <CodeBlock
            code={`// app/users/[id]/page.js
import { notFound } from 'next/navigation';

export default async function UserPage({ params }) {
  const { id } = params;
  const user = await getUser(id);
  
  if (!user) {
    notFound();
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}

// In Server Action
'use server'

import { notFound } from 'next/navigation';

export async function getUserData(userId) {
  const user = await db.user.findUnique({
    where: { id: userId }
  });
  
  if (!user) {
    notFound();
  }
  
  return user;
}

// In Route Handler
// app/api/users/[id]/route.js
import { notFound } from 'next/navigation';

export async function GET(request, { params }) {
  const { id } = params;
  const user = await db.user.findUnique({ where: { id } });
  
  if (!user) {
    notFound();
  }
  
  return Response.json(user);
}`}
            language="javascript"
          />
        </section>

        {/* Section 8: Prefetching Behavior */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Prefetching Behavior
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically prefetches routes when using Link components.
            You can control prefetching behavior and manually prefetch routes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Automatic Prefetching
          </h3>
          <CodeBlock
            code={`// Next.js automatically prefetches Link routes:
// - Routes in the viewport are prefetched
// - Routes become visible as user scrolls
// - Prefetching happens in production builds

// app/components/Navigation.js
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* Automatically prefetched when in viewport */}
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}

// Prefetching happens:
// - On hover (production)
// - When Link is in viewport
// - For static routes
// - For dynamic routes (if possible)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Manual Prefetching
          </h3>
          <CodeBlock
            code={`// app/components/CustomLink.js
'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CustomLink({ href, children }) {
  const router = useRouter();
  
  // Prefetch on mount
  useEffect(() => {
    router.prefetch(href);
  }, [href, router]);
  
  return (
    <a href={href} onClick={(e) => {
      e.preventDefault();
      router.push(href);
    }}>
      {children}
    </a>
  );
}

// Prefetch on hover
export default function HoverLink({ href, children }) {
  const router = useRouter();
  
  return (
    <a
      href={href}
      onMouseEnter={() => router.prefetch(href)}
      onClick={(e) => {
        e.preventDefault();
        router.push(href);
      }}
    >
      {children}
    </a>
  );
}

// Prefetch multiple routes
useEffect(() => {
  const routes = ['/about', '/contact', '/blog'];
  routes.forEach(route => router.prefetch(route));
}, [router]);`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b5/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B5.3 Route Handler Patterns
          </Link>
          <Link
            href="/learn/app-router/b6/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B6.2 next/link →
          </Link>
        </div>
      </div>
    </div>
  );
}
