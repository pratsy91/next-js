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
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Data Fetching Best Practices
          </h2>
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
