import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.9: Best Practices & Patterns - Next.js Mastery",
  description: "Best practices and patterns for Next.js App Router",
};

export default function Lesson9Page() {
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
          B13.9: Best Practices & Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Production-ready patterns, architecture decisions, and common pitfalls
          to avoid.
        </p>
      </div>

      <div className="space-y-8">
        {/* Component Organization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Component Organization Patterns
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Organizing your codebase effectively is crucial for maintainability
            and scalability. The App Router encourages co-location of related
            files while maintaining a clear separation between routes,
            components, utilities, and server actions. A well-organized
            structure makes it easier to find code, understand relationships,
            and scale the application.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Principles:</strong> Co-locate route-specific components
            and actions near their routes to improve discoverability. Use route
            groups to organize related routes without affecting URLs. Keep
            shared components in a top-level components directory, but organize
            them by feature or type (ui, layout, features). Place utilities and
            helper functions in lib/, and server actions can live in a dedicated
            actions/ directory or be co-located with routes. This organization
            pattern scales well as your application grows and makes it clear
            where different types of code belong.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Interview Tip:</strong> Be able to explain why you organize
            code a certain way. Understanding the trade-offs between co-location
            (easier to find related code) vs. separation (clear boundaries) is
            important. Show that you can think about code organization at scale
            and how it affects maintainability, onboarding new developers, and
            code discoverability.
          </p>
          <CodeBlock
            code={`// Recommended structure:
app/
├── (routes)/          # Route groups
│   ├── dashboard/
│   └── marketing/
├── components/        # Shared components
│   ├── ui/           # UI primitives
│   ├── layout/       # Layout components
│   └── features/     # Feature components
├── lib/              # Utilities
│   ├── utils.ts
│   └── db.ts
└── actions/          # Server Actions
    └── posts.ts

// Co-locate related files
app/dashboard/
├── page.js
├── layout.js
├── components/       # Route-specific components
│   └── DashboardCard.js
└── actions/          # Route-specific actions
    └── dashboard.ts`}
            language="text"
          />
        </section>

        {/* Data Fetching Best Practices */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-300">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Data Fetching Best Practices
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Choosing the right data fetching strategy is one of the most
            important decisions in Next.js applications. The App Router's Server
            Components make data fetching simpler, but understanding when and
            how to fetch data correctly is crucial for performance and user
            experience.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Core Principles:</strong> Always prefer Server Components
            for data fetching - they reduce bundle size, improve security, and
            provide better performance. Fetch data in parallel when sources are
            independent using Promise.all(). Leverage Next.js caching unless you
            specifically need fresh data. Use Suspense boundaries for loading
            states rather than manual loading flags. Only move to Client
            Components when you need interactivity, and then use libraries like
            SWR or React Query for client-side data fetching. Never fetch in
            Client Components what you could fetch in Server Components - this
            is a common anti-pattern that hurts performance.
          </p>
          <CodeBlock
            code={`// ✅ DO: Use Server Components for data fetching
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}

// ❌ DON'T: Fetch in Client Components with useEffect
'use client';
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  // ...
}

// ✅ DO: Fetch in parallel when possible
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
]);

// ✅ DO: Use appropriate caching
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }, // ISR
});

// ❌ DON'T: Opt out of caching unnecessarily
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store', // Only if truly dynamic
});`}
            language="javascript"
          />
        </section>

        {/* Error Boundaries */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Error Boundary Strategies
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Error boundaries catch JavaScript errors anywhere in the component
            tree, log them, and display fallback UI instead of crashing the
            entire application. In App Router, error boundaries are created
            using{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              error.js
            </code>{" "}
            files, which automatically wrap route segments.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How Error Boundaries Work:</strong> An{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              error.js
            </code>{" "}
            file creates an error boundary that catches errors in its route
            segment and children. When an error occurs, the error component is
            rendered instead of the page, and users see a helpful error message
            with a retry option. Error boundaries don't catch errors in event
            handlers, async code, or Server Components (those should use
            try-catch). They only catch errors during rendering, in lifecycle
            methods, and in constructors. Place error boundaries at strategic
            levels - route-level for route-specific errors and a global one at
            the root for catastrophic failures.
          </p>
          <CodeBlock
            code={`// Route-level error boundary
// app/products/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// Global error boundary
// app/error.js
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}

// Error handling in Server Components
export default async function Page() {
  try {
    const data = await fetchData();
    return <div>{data.title}</div>;
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}`}
            language="javascript"
          />
        </section>

        {/* Loading State Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Loading State Patterns
          </h2>
          <CodeBlock
            code={`// Route-level loading
// app/products/loading.js
export default function Loading() {
  return <div>Loading products...</div>;
}

// Suspense boundaries
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncComponent />
      </Suspense>
    </div>
  );
}

// Multiple Suspense boundaries
export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading content...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Authentication Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Authentication Patterns
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implementing authentication in App Router involves checking
            authentication status in Server Components or middleware and
            redirecting unauthenticated users. Unlike Pages Router where you'd
            use getServerSideProps, App Router allows you to handle
            authentication checks directly in components or use
            middleware/proxy.ts for route-level protection.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Implementation Strategies:</strong> Middleware (or proxy.ts
            in Next.js 16) is ideal for route-level authentication checks as it
            runs before the request reaches your routes. Server Components can
            check authentication and use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              redirect()
            </code>{" "}
            for programmatic redirects. Session management typically uses
            cookies with httpOnly flags for security. Consider using libraries
            like NextAuth.js or implementing custom JWT-based authentication.
            Always validate tokens server-side and never trust client-side
            authentication state alone.
          </p>
          <CodeBlock
            code={`// Middleware authentication
// middleware.js (or proxy.ts)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// Server Component authentication
// lib/auth.js
export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token.value);
}

// app/dashboard/page.js
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return <div>Dashboard</div>;
}`}
            language="javascript"
          />
        </section>

        {/* State Management */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. State Management Approaches
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            State management in App Router differs from traditional React apps
            because Server Components reduce the need for client-side state.
            Understanding when to use URL state, Server Component props, React
            Context, or global state management libraries is key to building
            efficient applications.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>State Management Strategies:</strong> URL state (query
            parameters, path params) is perfect for shareable, bookmarkable
            state like filters, search terms, or pagination. Server Component
            props handle server-fetched data that doesn't need client updates.
            React Context is ideal for client-side UI state (theme, sidebar
            open/closed) or user preferences. Global state management (Redux,
            Zustand) is only needed for complex client-side state or shared
            state across many components. Minimize client state when possible -
            much of what traditionally required client state can be handled by
            Server Components and URL parameters in App Router.
          </p>
          <CodeBlock
            code={`// ✅ DO: Use Server Components and URL state
export default function Page({ searchParams }) {
  const filter = searchParams.filter || 'all';
  const data = await fetchData(filter);
  return <div>{/* Render data */}</div>;
}

// ✅ DO: Use React Context for client state
'use client';
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ DO: Use Server Actions for mutations
'use server';
export async function updatePost(id, data) {
  await db.post.update({ where: { id }, data });
  revalidatePath('/posts');
}

// ❌ DON'T: Overuse client state
// Avoid storing server data in client state unnecessarily`}
            language="javascript"
          />
        </section>

        {/* Type Safety */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Type Safety with TypeScript
          </h2>
          <CodeBlock
            code={`// Page props types
// app/products/[id]/page.tsx
type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductPage({ 
  params, 
  searchParams 
}: PageProps) {
  const { id } = await params;
  const { filter } = await searchParams;
  // ...
}

// Server Action types
'use server';

type CreatePostInput = {
  title: string;
  content: string;
};

export async function createPost(input: CreatePostInput) {
  // ...
}

// Metadata types
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Description',
};`}
            language="typescript"
          />
        </section>

        {/* Common Pitfalls */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Common Pitfalls & How to Avoid Them
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Using 'use client' unnecessarily:</strong> Only use when
              you need interactivity or browser APIs
            </li>
            <li>
              <strong>Fetching in Client Components:</strong> Use Server
              Components for data fetching
            </li>
            <li>
              <strong>Not handling errors:</strong> Always implement error
              boundaries and try-catch
            </li>
            <li>
              <strong>Over-fetching data:</strong> Fetch only what you need,
              when you need it
            </li>
            <li>
              <strong>Ignoring caching:</strong> Leverage Next.js caching for
              better performance
            </li>
            <li>
              <strong>Large bundle sizes:</strong> Use dynamic imports and code
              splitting
            </li>
            <li>
              <strong>Blocking the main thread:</strong> Use Suspense and
              streaming
            </li>
            <li>
              <strong>Not optimizing images:</strong> Always use next/image
            </li>
            <li>
              <strong>Incorrect metadata:</strong> Provide comprehensive
              metadata for SEO
            </li>
            <li>
              <strong>Poor error messages:</strong> Provide helpful error
              messages for debugging
            </li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13/lesson-8"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Interview Questions
          </Link>
          <Link
            href="/learn/app-router/b13/lesson-10"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Advanced Patterns →
          </Link>
        </div>
      </div>
    </div>
  );
}
