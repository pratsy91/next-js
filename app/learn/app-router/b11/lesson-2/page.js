import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B11.2: Caching - Next.js Mastery",
  description: "Complete guide to caching in Next.js App Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b11"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B11 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B11.2: Caching
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how caching works in Next.js App Router: fetch caching, Full
          Route Cache, Router Cache, Request Memoization, Data Cache, and cache
          invalidation.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Fetch Caching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Fetch Caching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js extends the Fetch API with automatic request caching and
            deduplication.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Fetch Caching
          </h3>
          <CodeBlock
            code={`// Next.js automatically caches fetch requests
// app/page.js
export default async function Page() {
  // Cached by default (force-cache)
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  
  return <div>{json.message}</div>;
}

// Cache options:
// 1. force-cache (default) - Cache indefinitely
const data = await fetch('https://api.example.com/data', {
  cache: 'force-cache',
});

// 2. no-store - Don't cache
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});

// 3. no-cache - Revalidate on each request
const data = await fetch('https://api.example.com/data', {
  cache: 'no-cache',
});

// 4. reload - Force reload
const data = await fetch('https://api.example.com/data', {
  cache: 'reload',
});

// 5. only-if-cached - Use cache only
const data = await fetch('https://api.example.com/data', {
  cache: 'only-if-cached',
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Time-Based Revalidation
          </h3>
          <CodeBlock
            code={`// Revalidate after specific time
export default async function Page() {
  // Revalidate every 60 seconds
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 },
  });
  
  return <div>{JSON.stringify(await data.json())}</div>;
}

// Revalidate options:
// - Number: Revalidate after N seconds
// - false: Cache indefinitely
// - 0: Always revalidate

// app/products/page.js
export default async function ProductsPage() {
  // Revalidate every hour
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 },
  });
  
  return <div>{JSON.stringify(await products.json())}</div>;
}

// app/news/page.js
export default async function NewsPage() {
  // Revalidate every 5 minutes
  const news = await fetch('https://api.example.com/news', {
    next: { revalidate: 300 },
  });
  
  return <div>{JSON.stringify(await news.json())}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Full Route Cache */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Full Route Cache
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js caches the entire rendered output of routes at build time.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Full Route Cache Works
          </h3>
          <CodeBlock
            code={`// Full Route Cache stores:
// - Rendered HTML
// - React Server Component payload
// - Static assets

// Routes are cached when:
// 1. Using static data fetching
// 2. No dynamic functions (cookies, headers, searchParams)
// 3. No dynamic route segments
// 4. No revalidate option

// app/page.js - Cached at build time
export default async function Page() {
  // Static fetch (cached)
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache',
  });
  
  return <div>{JSON.stringify(await data.json())}</div>;
}

// app/about/page.js - Cached
export default function AboutPage() {
  return <div>About Us</div>;
}

// Opt out of Full Route Cache:
// 1. Use dynamic functions
export default async function Page({ searchParams }) {
  // Dynamic - not cached
  const query = searchParams.q;
  return <div>Query: {query}</div>;
}

// 2. Use dynamic = 'force-dynamic'
export const dynamic = 'force-dynamic';

export default async function Page() {
  // Always dynamic
  return <div>Dynamic</div>;
}

// 3. Use revalidate = 0
export const revalidate = 0;

export default async function Page() {
  // Always revalidate
  return <div>Revalidated</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Full Route Cache with ISR
          </h3>
          <CodeBlock
            code={`// Incremental Static Regeneration (ISR)
// Revalidate cached routes on demand

// app/blog/[slug]/page.js
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPost({ params }) {
  const { slug } = params;
  
  const post = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    next: { revalidate: 3600 },
  });
  
  return <article>{JSON.stringify(await post.json())}</article>;
}

// On-demand revalidation
// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const { path } = await request.json();
  
  // Revalidate specific path
  revalidatePath(path);
  
  return Response.json({ revalidated: true });
}

// Trigger revalidation:
// POST /api/revalidate
// Body: { "path": "/blog/my-post" }`}
            language="javascript"
          />
        </section>

        {/* Section 3: Router Cache */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Router Cache
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Client-side cache that stores route segments in the browser for
            instant navigation.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Router Cache Works
          </h3>
          <CodeBlock
            code={`// Router Cache:
// - Stores route segments in browser
// - Enables instant client-side navigation
// - Automatically managed by Next.js

// When you navigate:
// 1. Next.js checks Router Cache
// 2. If cached, shows instantly
// 3. If not, fetches and caches

// Cache duration:
// - Static routes: Indefinitely
// - Dynamic routes: 30 seconds
// - Prefetched routes: 5 minutes

// app/page.js
export default function HomePage() {
  return (
    <div>
      <Link href="/about">About</Link>
      {/* Prefetched and cached */}
    </div>
  );
}

// Router Cache is automatic
// No configuration needed

// Opt out of prefetching:
import Link from 'next/link';

export default function Page() {
  return (
    <Link href="/about" prefetch={false}>
      About
    </Link>
  );
}

// Clear Router Cache:
// - Hard refresh (Cmd/Ctrl + Shift + R)
// - Or programmatically (not recommended)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Router Cache Behavior
          </h3>
          <CodeBlock
            code={`// Router Cache stores:
// - Rendered route segments
// - Server Component payloads
// - Client Component state

// Cache lifetime:
// - Static: Forever (until hard refresh)
// - Dynamic: 30 seconds
// - Prefetched: 5 minutes

// Example navigation flow:
// 1. User clicks link to /about
// 2. Next.js checks Router Cache
// 3. If cached: Show immediately
// 4. If not: Fetch, render, cache

// app/about/page.js
export default async function AboutPage() {
  // This is cached in Router Cache
  const data = await fetch('https://api.example.com/about');
  
  return <div>{JSON.stringify(await data.json())}</div>;
}

// Dynamic routes have shorter cache
// app/blog/[slug]/page.js
export default async function BlogPost({ params }) {
  // Cached for 30 seconds
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`);
  
  return <article>{JSON.stringify(await post.json())}</article>;
}

// Force fresh data:
export const dynamic = 'force-dynamic';

export default async function Page() {
  // Always fetch fresh (bypass Router Cache)
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store',
  });
  
  return <div>{JSON.stringify(await data.json())}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Request Memoization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Request Memoization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            React automatically deduplicates identical fetch requests within the
            same render pass.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Automatic Request Deduplication
          </h3>
          <CodeBlock
            code={`// React deduplicates identical requests
// app/page.js
export default async function Page() {
  // These are deduplicated (same URL)
  const data1 = await fetch('https://api.example.com/data');
  const data2 = await fetch('https://api.example.com/data');
  const data3 = await fetch('https://api.example.com/data');
  
  // Only one request is made
  // All three get the same response
  
  return <div>Content</div>;
}

// Works across components in same render
// app/components/Header.js
export default async function Header() {
  const user = await fetch('https://api.example.com/user');
  return <header>{JSON.stringify(await user.json())}</header>;
}

// app/components/Sidebar.js
export default async function Sidebar() {
  const user = await fetch('https://api.example.com/user');
  // Same request - deduplicated
  return <aside>{JSON.stringify(await user.json())}</aside>;
}

// app/page.js
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function Page() {
  return (
    <div>
      <Header />
      <Sidebar />
      {/* Only one request to /user */}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Request Memoization with cache()
          </h3>
          <CodeBlock
            code={`// Use React cache() for explicit memoization
import { cache } from 'react';

// Memoize function
const getUser = cache(async (id) => {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  return response.json();
});

// app/page.js
export default async function Page() {
  // These are memoized
  const user1 = await getUser(1);
  const user2 = await getUser(1); // Uses cached result
  
  return <div>{JSON.stringify(user1)}</div>;
}

// Memoize with multiple parameters
const getPost = cache(async (userId, postId) => {
  const response = await fetch(
    \`https://api.example.com/users/\${userId}/posts/\${postId}\`
  );
  return response.json();
});

// Usage
export default async function Page() {
  const post = await getPost(1, 2);
  return <div>{JSON.stringify(post)}</div>;
}

// Memoization works within same request
// Different requests get fresh data`}
            language="javascript"
          />
        </section>

        {/* Section 5: Data Cache */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Data Cache
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Persistent cache for fetch requests stored on the filesystem.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Data Cache Works
          </h3>
          <CodeBlock
            code={`// Data Cache:
// - Persistent filesystem cache
// - Stores fetch responses
// - Shared across builds
// - Survives server restarts

// app/page.js
export default async function Page() {
  // Cached in Data Cache (filesystem)
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // Default
  });
  
  return <div>{JSON.stringify(await data.json())}</div>;
}

// Cache location:
// .next/cache/fetch-cache/

// Cache key:
// Based on URL + options

// Bypass Data Cache:
export default async function Page() {
  // Not cached
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store',
  });
  
  return <div>{JSON.stringify(await data.json())}</div>;
}

// Revalidate Data Cache:
export default async function Page() {
  // Revalidate every 60 seconds
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 },
  });
  
  return <div>{JSON.stringify(await data.json())}</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Data Cache with Tags
          </h3>
          <CodeBlock
            code={`// Use tags for cache invalidation
// app/products/page.js
export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products', {
    next: { tags: ['products'] },
  });
  
  return <div>{JSON.stringify(await products.json())}</div>;
}

// Invalidate by tag
// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';

export async function POST(request) {
  const { tag } = await request.json();
  
  // Invalidate all requests with this tag
  revalidateTag(tag);
  
  return Response.json({ revalidated: true });
}

// Multiple tags
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { 
      tags: ['products', 'inventory'],
      revalidate: 3600,
    },
  });
  
  return <div>{JSON.stringify(await data.json())}</div>;
}

// Invalidate multiple tags
revalidateTag('products');
revalidateTag('inventory');`}
            language="javascript"
          />
        </section>

        {/* Section 6: Cache Invalidation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Cache Invalidation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Invalidate caches when data changes to ensure users see fresh
            content.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Revalidate Path
          </h3>
          <CodeBlock
            code={`// Revalidate specific route
// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const { path } = await request.json();
  
  // Revalidate specific path
  revalidatePath(path);
  
  // Revalidate with type
  revalidatePath(path, 'page'); // Revalidate page
  revalidatePath(path, 'layout'); // Revalidate layout
  
  return Response.json({ revalidated: true });
}

// Usage:
// POST /api/revalidate
// Body: { "path": "/blog/my-post" }

// Revalidate multiple paths
export async function POST(request) {
  const { paths } = await request.json();
  
  paths.forEach(path => {
    revalidatePath(path);
  });
  
  return Response.json({ revalidated: true });
}

// Revalidate in Server Action
'use server'

import { revalidatePath } from 'next/cache';

export async function updatePost(id, data) {
  // Update post in database
  await updatePostInDB(id, data);
  
  // Revalidate the post page
  revalidatePath(\`/blog/\${id}\`);
  
  // Revalidate blog listing
  revalidatePath('/blog');
  
  return { success: true };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Revalidate Tag
          </h3>
          <CodeBlock
            code={`// Revalidate by cache tag
// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';

export async function POST(request) {
  const { tag } = await request.json();
  
  // Revalidate all requests with this tag
  revalidateTag(tag);
  
  return Response.json({ revalidated: true });
}

// Usage:
// POST /api/revalidate
// Body: { "tag": "products" }

// Revalidate multiple tags
export async function POST(request) {
  const { tags } = await request.json();
  
  tags.forEach(tag => {
    revalidateTag(tag);
  });
  
  return Response.json({ revalidated: true });
}

// Revalidate in Server Action
'use server'

import { revalidateTag } from 'next/cache';

export async function createProduct(data) {
  // Create product in database
  await createProductInDB(data);
  
  // Revalidate all product-related caches
  revalidateTag('products');
  revalidateTag('inventory');
  
  return { success: true };
}

// Webhook example
// app/api/webhooks/product-updated/route.js
import { revalidateTag } from 'next/cache';

export async function POST(request) {
  const event = await request.json();
  
  if (event.type === 'product.updated') {
    revalidateTag('products');
    revalidateTag(\`product-\${event.productId}\`);
  }
  
  return Response.json({ received: true });
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b11/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B11.1 Performance
          </Link>
          <Link
            href="/learn/app-router/b11/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B11.3 SEO →
          </Link>
        </div>
      </div>
    </div>
  );
}
