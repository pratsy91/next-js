import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B3.1: Server Components Data Fetching - Next.js Mastery",
  description: "Complete guide to data fetching in Server Components",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b3"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B3 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B3.1: Server Components Data Fetching
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to fetch data in Server Components using async/await, Fetch
          API, caching, revalidation, and direct database access.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Async Server Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Async Server Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Components can be async functions, allowing you to use await
            directly in the component body.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Async Server Component
          </h3>
          <CodeBlock
            code={`// app/products/page.js
// Server Component - can be async
export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products').then(
    (res) => res.json()
  );
  
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Async with Direct Await
          </h3>
          <CodeBlock
            code={`// app/blog/page.js
export default async function BlogPage() {
  // Direct await in component body
  const posts = await getPosts();
  
  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}

async function getPosts() {
  // This runs on the server
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Fetch API in Server Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Fetch API in Server Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js extends the native Fetch API with automatic request
            deduplication and caching.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Fetch
          </h3>
          <CodeBlock
            code={`// app/users/page.js
export default async function UsersPage() {
  const response = await fetch('https://api.example.com/users');
  const users = await response.json();
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Fetch with Options
          </h3>
          <CodeBlock
            code={`// app/posts/page.js
export default async function PostsPage() {
  const response = await fetch('https://api.example.com/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token',
    },
    // Caching options (see next section)
    cache: 'force-cache',
    next: { revalidate: 3600 },
  });
  
  const posts = await response.json();
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Fetch Caching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Fetch Caching (All Cache Options)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js provides multiple caching strategies for fetch requests.
            Each option has different behavior.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Cache Options
          </h3>
          <CodeBlock
            code={`// 1. force-cache (Default)
// Caches the request indefinitely
const response1 = await fetch('https://api.example.com/data', {
  cache: 'force-cache',
});

// 2. no-store
// Always fetch fresh data, never cache
const response2 = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});

// 3. no-cache
// Revalidates on every request but uses cache
const response3 = await fetch('https://api.example.com/data', {
  cache: 'no-cache',
});

// 4. reload
// Always fetches from server, bypasses cache
const response4 = await fetch('https://api.example.com/data', {
  cache: 'reload',
});

// 5. only-if-cached
// Only uses cache, never fetches from network
const response5 = await fetch('https://api.example.com/data', {
  cache: 'only-if-cached',
});`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Cache Options Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    Option
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    Behavior
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    Use Case
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    force-cache
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Caches indefinitely
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Static data that rarely changes
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    no-store
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Never caches, always fresh
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Real-time data, user-specific data
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    no-cache
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Revalidates but uses cache
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Data that needs freshness check
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    reload
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Bypasses cache, fetches fresh
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Force refresh
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    only-if-cached
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Only uses cache, no network
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Offline mode, cached data only
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Fetch Revalidation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Fetch Revalidation (next.revalidate, next.revalidatePath,
            next.revalidateTag)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Revalidation allows you to control when cached data is refreshed.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            next.revalidate (Time-based)
          </h3>
          <CodeBlock
            code={`// app/products/page.js
export default async function ProductsPage() {
  // Revalidate every 3600 seconds (1 hour)
  const response = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 },
  });
  
  const products = await response.json();
  
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// Revalidation options:
// - Number: Revalidate after N seconds
// - false: Never revalidate (same as force-cache)
// - 0: Revalidate on every request`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            next.revalidateTag (Tag-based)
          </h3>
          <CodeBlock
            code={`// app/posts/page.js
export default async function PostsPage() {
  // Tag this fetch with 'posts' tag
  const response = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] },
  });
  
  const posts = await response.json();
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// Later, revalidate by tag:
// import { revalidateTag } from 'next/cache';
// revalidateTag('posts'); // Invalidates all fetches with 'posts' tag`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            next.revalidatePath (Path-based)
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export default async function BlogPost({ params }) {
  const { slug } = await params;
  
  const post = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

// Revalidate specific path:
// import { revalidatePath } from 'next/cache';
// revalidatePath('/blog'); // Revalidates all /blog routes
// revalidatePath('/blog/[slug]', 'page'); // Revalidates specific route`}
            language="javascript"
          />
        </section>

        {/* Section 5: Time-based Revalidation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Time-based Revalidation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Automatically revalidate cached data after a specified time period.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            ISR (Incremental Static Regeneration)
          </h3>
          <CodeBlock
            code={`// app/products/page.js
export default async function ProductsPage() {
  // Revalidate every 60 seconds
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 },
  }).then((res) => res.json());
  
  return (
    <div>
      <h1>Products</h1>
      <p>Last updated: {new Date().toLocaleString()}</p>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// How it works:
// 1. First request: Fetches and caches data
// 2. Subsequent requests: Serves cached data
// 3. After 60 seconds: Next request triggers revalidation in background
// 4. User gets cached data immediately, fresh data updates in background`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Revalidation Examples
          </h3>
          <CodeBlock
            code={`// Revalidate every 1 second
const data1 = await fetch(url, {
  next: { revalidate: 1 },
});

// Revalidate every 1 minute
const data2 = await fetch(url, {
  next: { revalidate: 60 },
});

// Revalidate every 1 hour
const data3 = await fetch(url, {
  next: { revalidate: 3600 },
});

// Revalidate every 1 day
const data4 = await fetch(url, {
  next: { revalidate: 86400 },
});

// Never revalidate (static)
const data5 = await fetch(url, {
  next: { revalidate: false },
});

// Revalidate on every request
const data6 = await fetch(url, {
  next: { revalidate: 0 },
});`}
            language="javascript"
          />
        </section>

        {/* Section 6: On-demand Revalidation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. On-demand Revalidation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Manually trigger cache revalidation when data changes, without
            waiting for the time-based interval.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            RevalidatePath
          </h3>
          <CodeBlock
            code={`// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { path } = await request.json();
  
  // Revalidate specific path
  revalidatePath(path);
  
  return NextResponse.json({ revalidated: true, path });
}

// Usage:
// POST /api/revalidate
// Body: { "path": "/products" }

// RevalidatePath options:
revalidatePath('/products'); // Revalidate all /products routes
revalidatePath('/products/[id]', 'page'); // Revalidate specific page
revalidatePath('/products/[id]', 'layout'); // Revalidate layout`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            RevalidateTag
          </h3>
          <CodeBlock
            code={`// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { tag } = await request.json();
  
  // Revalidate all fetches with this tag
  revalidateTag(tag);
  
  return NextResponse.json({ revalidated: true, tag });
}

// In your page:
// app/posts/page.js
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] },
  }).then((res) => res.json());
  
  return <div>{/* render posts */}</div>;
}

// When you call revalidateTag('posts'), all fetches tagged with 'posts' are invalidated`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Webhook Example
          </h3>
          <CodeBlock
            code={`// app/api/webhook/route.js
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // Verify webhook (security)
  const body = await request.json();
  
  // Revalidate when CMS content changes
  if (body.model === 'post') {
    revalidateTag('posts');
  }
  
  return NextResponse.json({ success: true });
}

// This webhook can be called by your CMS when content updates`}
            language="javascript"
          />
        </section>

        {/* Section 7: Tag-based Revalidation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Tag-based Revalidation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use tags to group related data and revalidate them together.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Tags
          </h3>
          <CodeBlock
            code={`// app/products/page.js
export default async function ProductsPage() {
  // Tag with multiple tags
  const products = await fetch('https://api.example.com/products', {
    next: { tags: ['products', 'inventory'] },
  }).then((res) => res.json());
  
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// Revalidate by any tag:
// revalidateTag('products'); // Invalidates this fetch
// revalidateTag('inventory'); // Also invalidates this fetch`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Tag Strategy Example
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
export default async function ProductPage({ params }) {
  const { id } = await params;
  
  // Tag with product ID for granular revalidation
  const product = await fetch(\`https://api.example.com/products/\${id}\`, {
    next: { tags: ['products', \`product-\${id}\`] },
  }).then((res) => res.json());
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

// Revalidation strategies:
// revalidateTag('products'); // Revalidates all products
// revalidateTag('product-123'); // Revalidates only product 123`}
            language="javascript"
          />
        </section>

        {/* Section 8: Database Queries */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Database Queries in Server Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Components can directly query databases without API routes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Direct Database Access
          </h3>
          <CodeBlock
            code={`// app/users/page.js
import { db } from '@/lib/db';

export default async function UsersPage() {
  // Direct database query - no API route needed!
  const users = await db.user.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  });
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Benefits:
// - No API route overhead
// - Direct database connection
// - Better performance
// - Type-safe with Prisma/Drizzle`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Prisma Example
          </h3>
          <CodeBlock
            code={`// app/posts/page.js
import { prisma } from '@/lib/prisma';

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: true,
      categories: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>By {post.author.name}</p>
          <div>{post.content}</div>
        </article>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            SQL Example
          </h3>
          <CodeBlock
            code={`// app/products/page.js
import { sql } from '@vercel/postgres';

export default async function ProductsPage() {
  const { rows } = await sql\`
    SELECT * FROM products 
    WHERE active = true 
    ORDER BY created_at DESC
    LIMIT 20
  \`;
  
  return (
    <div>
      <h1>Products</h1>
      {rows.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 9: API Calls */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            9. API Calls in Server Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Components can call external APIs and internal API routes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            External API
          </h3>
          <CodeBlock
            code={`// app/weather/page.js
export default async function WeatherPage() {
  const apiKey = process.env.WEATHER_API_KEY; // Server-only, secure
  
  const weather = await fetch(
    \`https://api.weather.com/v1/current?key=\${apiKey}\`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  ).then((res) => res.json());
  
  return (
    <div>
      <h1>Weather</h1>
      <p>Temperature: {weather.temp}°F</p>
      <p>Condition: {weather.condition}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Internal API Route
          </h3>
          <CodeBlock
            code={`// app/dashboard/page.js
export default async function DashboardPage() {
  // Call your own API route
  const stats = await fetch('http://localhost:3000/api/stats', {
    cache: 'no-store', // Always fresh for dashboard
  }).then((res) => res.json());
  
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Orders: {stats.totalOrders}</p>
      </div>
    </div>
  );
}

// Note: For internal routes, direct database access is usually better`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple API Calls
          </h3>
          <CodeBlock
            code={`// app/dashboard/page.js
export default async function DashboardPage() {
  // Parallel fetching
  const [users, posts, stats] = await Promise.all([
    fetch('https://api.example.com/users').then((res) => res.json()),
    fetch('https://api.example.com/posts').then((res) => res.json()),
    fetch('https://api.example.com/stats').then((res) => res.json()),
  ]);
  
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <p>Users: {users.length}</p>
        <p>Posts: {posts.length}</p>
        <p>Stats: {stats.total}</p>
      </div>
    </div>
  );
}

// All fetches happen in parallel, improving performance`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to B3 Lessons
          </Link>
          <Link
            href="/learn/app-router/b3/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B3.2 Caching Functions →
          </Link>
        </div>
      </div>
    </div>
  );
}
