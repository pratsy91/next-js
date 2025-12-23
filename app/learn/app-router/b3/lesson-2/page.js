import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B3.2: Caching Functions - Next.js Mastery",
  description: "Complete guide to caching functions in Next.js App Router",
};

export default function Lesson2Page() {
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
          B3.2: Caching Functions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master caching functions: unstable_cache, cache, revalidatePath,
          revalidateTag, cache strategies, and cache invalidation.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: unstable_cache */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. unstable_cache Function
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              unstable_cache
            </code>{" "}
            function allows you to manually cache the result of any function.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`// app/products/page.js
import { unstable_cache } from 'next/cache';

async function getProducts() {
  // Expensive operation
  const products = await db.products.findMany();
  return products;
}

// Cache the function result
const getCachedProducts = unstable_cache(
  async () => getProducts(),
  ['products'], // Cache key
  {
    revalidate: 3600, // Revalidate every hour
  }
);

export default async function ProductsPage() {
  const products = await getCachedProducts();
  
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Tags
          </h3>
          <CodeBlock
            code={`// app/posts/page.js
import { unstable_cache } from 'next/cache';

const getCachedPosts = unstable_cache(
  async () => {
    return await db.posts.findMany();
  },
  ['posts'], // Cache key
  {
    tags: ['posts', 'blog'], // Tags for revalidation
    revalidate: 3600,
  }
);

export default async function PostsPage() {
  const posts = await getCachedPosts();
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// Revalidate with:
// import { revalidateTag } from 'next/cache';
// revalidateTag('posts');`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Parameters
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
import { unstable_cache } from 'next/cache';

const getCachedProduct = unstable_cache(
  async (id) => {
    return await db.products.findUnique({ where: { id } });
  },
  ['product'], // Base cache key
  {
    revalidate: 3600,
  }
);

export default async function ProductPage({ params }) {
  const { id } = await params;
  
  // Include id in cache key
  const product = await getCachedProduct(id);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

// Note: Parameters should be included in cache key for uniqueness`}
            language="javascript"
          />
        </section>

        {/* Section 2: cache function */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. cache Function (React cache)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              cache
            </code>{" "}
            function from React deduplicates function calls within a single
            render pass.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`// app/products/page.js
import { cache } from 'react';

// Wrap function with cache
const getProduct = cache(async (id) => {
  return await db.products.findUnique({ where: { id } });
});

export default async function ProductsPage() {
  // Multiple calls to same function with same params
  // Only executes once
  const product1 = await getProduct('1');
  const product2 = await getProduct('1'); // Uses cached result
  const product3 = await getProduct('2'); // New call (different param)
  
  return (
    <div>
      <h1>Products</h1>
      <div>{product1.name}</div>
      <div>{product2.name}</div> {/* Same as product1 */}
      <div>{product3.name}</div>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Request Deduplication
          </h3>
          <CodeBlock
            code={`// app/posts/page.js
import { cache } from 'react';

const fetchPost = cache(async (id) => {
  const res = await fetch(\`https://api.example.com/posts/\${id}\`);
  return res.json();
});

export default async function PostsPage() {
  // Even if called multiple times, only one request is made
  const post1 = await fetchPost('123');
  const post2 = await fetchPost('123'); // Deduplicated
  const post3 = await fetchPost('123'); // Deduplicated
  
  return (
    <div>
      <h1>{post1.title}</h1>
      <p>{post2.content}</p> {/* Same data as post1 */}
    </div>
  );
}

// cache() deduplicates within a single request/render
// Different from unstable_cache which persists across requests`}
            language="javascript"
          />
        </section>

        {/* Section 3: revalidatePath */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. revalidatePath Function
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidatePath
            </code>{" "}
            function invalidates cached data for a specific path.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { path } = await request.json();
  
  // Revalidate specific path
  revalidatePath(path);
  
  return NextResponse.json({ revalidated: true });
}

// Usage examples:
// POST /api/revalidate
// Body: { "path": "/products" }
// Revalidates all /products routes

// Body: { "path": "/products/123" }
// Revalidates /products/123 page`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            RevalidatePath Options
          </h3>
          <CodeBlock
            code={`import { revalidatePath } from 'next/cache';

// Revalidate page
revalidatePath('/products');
revalidatePath('/products/[id]', 'page');

// Revalidate layout
revalidatePath('/products', 'layout');

// Revalidate both page and layout
revalidatePath('/products', 'page');
revalidatePath('/products', 'layout');

// Type options:
// - 'page': Revalidate page data
// - 'layout': Revalidate layout data
// Default: 'page'`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server Action Example
          </h3>
          <CodeBlock
            code={`// app/actions.js
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

export async function createPost(title, content) {
  await db.posts.create({
    data: { title, content },
  });
  
  // Revalidate posts page after creating
  revalidatePath('/posts');
  
  return { success: true };
}

// app/posts/page.js
export default async function PostsPage() {
  const posts = await db.posts.findMany();
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// After createPost() runs, /posts is automatically revalidated`}
            language="javascript"
          />
        </section>

        {/* Section 4: revalidateTag */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. revalidateTag Function
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidateTag
            </code>{" "}
            function invalidates all cached data associated with a specific tag.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { tag } = await request.json();
  
  // Revalidate all data with this tag
  revalidateTag(tag);
  
  return NextResponse.json({ revalidated: true });
}

// Usage:
// POST /api/revalidate
// Body: { "tag": "posts" }
// Invalidates all fetches tagged with 'posts'`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Tag-based Revalidation Example
          </h3>
          <CodeBlock
            code={`// app/posts/page.js
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] },
  }).then((res) => res.json());
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// app/api/posts/route.js (Server Action or API route)
import { revalidateTag } from 'next/cache';

export async function POST() {
  // After creating/updating a post
  revalidateTag('posts'); // Invalidates all 'posts' tagged data
  
  return { success: true };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Tags
          </h3>
          <CodeBlock
            code={`// Revalidate multiple tags at once
import { revalidateTag } from 'next/cache';

export async function updateProduct() {
  // Update product in database
  await db.products.update({ /* ... */ });
  
  // Revalidate related tags
  revalidateTag('products');
  revalidateTag('inventory');
  revalidateTag('categories');
  
  return { success: true };
}

// All fetches with any of these tags are invalidated`}
            language="javascript"
          />
        </section>

        {/* Section 5: Cache Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Cache Strategies
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Different caching strategies for different use cases.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Static Data (Long Cache)
          </h3>
          <CodeBlock
            code={`// app/about/page.js
// Static content that rarely changes
export default async function AboutPage() {
  const content = await fetch('https://api.example.com/about', {
    cache: 'force-cache', // Cache indefinitely
    next: { revalidate: false },
  }).then((res) => res.json());
  
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Data (ISR)
          </h3>
          <CodeBlock
            code={`// app/products/page.js
// Data that changes but can be cached
export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }, // Revalidate every hour
  }).then((res) => res.json());
  
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Real-time Data (No Cache)
          </h3>
          <CodeBlock
            code={`// app/dashboard/page.js
// Always fresh data
export default async function DashboardPage() {
  const stats = await fetch('https://api.example.com/stats', {
    cache: 'no-store', // Never cache
  }).then((res) => res.json());
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Users: {stats.totalUsers}</p>
      <p>Orders: {stats.totalOrders}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            On-demand Revalidation
          </h3>
          <CodeBlock
            code={`// app/posts/page.js
export default async function PostsPage() {
  // Cache with tag for on-demand revalidation
  const posts = await fetch('https://api.example.com/posts', {
    next: { 
      tags: ['posts'],
      revalidate: 3600, // Fallback: revalidate after 1 hour
    },
  }).then((res) => res.json());
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// Revalidate when needed:
// import { revalidateTag } from 'next/cache';
// revalidateTag('posts'); // Immediate revalidation`}
            language="javascript"
          />
        </section>

        {/* Section 6: Cache Invalidation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Cache Invalidation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Strategies for invalidating cached data when it changes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Invalidation Strategies
          </h3>
          <CodeBlock
            code={`// Strategy 1: Time-based (Automatic)
// Data revalidates after specified time
const data = await fetch(url, {
  next: { revalidate: 3600 }, // Auto-revalidate after 1 hour
});

// Strategy 2: Tag-based (On-demand)
// Revalidate when specific tag is invalidated
const data = await fetch(url, {
  next: { tags: ['posts'] },
});
// Later: revalidateTag('posts');

// Strategy 3: Path-based (On-demand)
// Revalidate specific route
revalidatePath('/posts');

// Strategy 4: No cache (Always fresh)
const data = await fetch(url, {
  cache: 'no-store',
});`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complete Invalidation Example
          </h3>
          <CodeBlock
            code={`// app/api/posts/route.js
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request) {
  const { title, content } = await request.json();
  
  // Create post
  const post = await db.posts.create({
    data: { title, content },
  });
  
  // Invalidate caches
  revalidatePath('/posts'); // Revalidate posts page
  revalidatePath('/posts/[id]', 'page'); // Revalidate dynamic routes
  revalidateTag('posts'); // Revalidate all 'posts' tagged data
  
  return NextResponse.json({ post });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  
  // Delete post
  await db.posts.delete({ where: { id } });
  
  // Invalidate caches
  revalidatePath('/posts');
  revalidatePath(\`/posts/\${id}\`);
  revalidateTag('posts');
  
  return NextResponse.json({ deleted: true });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Webhook Invalidation
          </h3>
          <CodeBlock
            code={`// app/api/webhook/route.js
import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  
  // Verify webhook signature (security)
  // ...
  
  // Invalidate based on webhook event
  if (body.event === 'post.created' || body.event === 'post.updated') {
    revalidateTag('posts');
    revalidatePath('/posts');
  }
  
  if (body.event === 'product.updated') {
    revalidateTag('products');
    revalidatePath('/products');
    revalidatePath(\`/products/\${body.id}\`);
  }
  
  return NextResponse.json({ received: true });
}

// This can be called by your CMS, database, or external service`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b3/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B3.1 Server Components Data Fetching
          </Link>
          <Link
            href="/learn/app-router/b3/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B3.3 Client-Side Data Fetching →
          </Link>
        </div>
      </div>
    </div>
  );
}
