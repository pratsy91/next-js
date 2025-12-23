import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "V16.3: Enhanced Caching APIs - Next.js Mastery",
  description: "Learn about enhanced caching APIs in Next.js 16",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/recent-updates/v16"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Next.js 16 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          V16.3: Enhanced Caching APIs
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about improved caching APIs including updateTag(),
          revalidateTag() with cacheLife, and refresh().
        </p>
      </div>

      <div className="space-y-8">
        {/* updateTag */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. updateTag() - Read-Your-Writes Semantics
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              updateTag()
            </code>{" "}
            function provides "read-your-writes" semantics for Server Actions,
            ensuring changes are immediately reflected.
          </p>
          <CodeBlock
            code={`// app/actions.ts
'use server';

import { updateTag } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  
  // Create post in database
  const post = await db.post.create({
    data: { title },
  });
  
  // Immediately update the cache tag
  // Ensures subsequent reads see the new post
  updateTag('posts');
  updateTag(\`post-\${post.id}\`);
  
  return post;
}

// Usage in component
// app/components/CreatePostForm.tsx
'use client';

import { createPost } from '@/app/actions';

export default function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create Post</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* revalidateTag with cacheLife */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. revalidateTag() with cacheLife Parameter
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            In Next.js 16,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidateTag()
            </code>{" "}
            now requires a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              cacheLife
            </code>{" "}
            parameter for stale-while-revalidate behavior.
          </p>
          <CodeBlock
            code={`import { revalidateTag } from 'next/cache';

// Old way (Next.js 15) - no longer works
// revalidateTag('products'); // ❌ Missing cacheLife parameter

// New way (Next.js 16)
export async function updateProduct(id: string, data: any) {
  await db.product.update({
    where: { id },
    data,
  });
  
  // Revalidate with cacheLife
  // cacheLife: number of seconds the stale data should be served
  revalidateTag('products', { cacheLife: 60 }); // Stale for 60 seconds
  
  // Multiple tags
  revalidateTag('products', { cacheLife: 60 });
  revalidateTag(\`product-\${id}\`, { cacheLife: 30 });
}

// What happens:
// 1. Revalidation is triggered
// 2. Stale data continues to be served for cacheLife seconds
// 3. Fresh data is fetched in the background
// 4. After cacheLife expires, fresh data is served`}
            language="javascript"
          />
        </section>

        {/* refresh */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. refresh() - Refresh Dynamic Data
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              refresh()
            </code>{" "}
            function refreshes dynamic data without invalidating the entire
            cache.
          </p>
          <CodeBlock
            code={`import { refresh } from 'next/cache';

// Refresh specific route data
export async function refreshUserData() {
  // This will refresh the data for the current route
  // without invalidating other cached data
  refresh();
  
  // Or refresh a specific path
  refresh('/dashboard/user');
}

// In a Server Action
'use server';

import { refresh } from 'next/cache';

export async function updateUserProfile(formData: FormData) {
  const name = formData.get('name') as string;
  
  await db.user.update({
    where: { id: currentUserId },
    data: { name },
  });
  
  // Refresh user-related data without full cache invalidation
  refresh('/dashboard');
  
  return { success: true };
}

// Client-side usage
'use client';

import { useRouter } from 'next/navigation';
import { updateUserProfile } from './actions';

export default function ProfileForm() {
  const router = useRouter();
  
  async function handleSubmit(formData: FormData) {
    await updateUserProfile(formData);
    router.refresh(); // Refresh client-side cache
  }
  
  return (
    <form action={handleSubmit}>
      <input name="name" />
      <button type="submit">Update</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Stale-while-revalidate Pattern */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Stale-While-Revalidate Pattern
          </h2>
          <CodeBlock
            code={`// app/api/products/route.ts
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await fetch('https://api.example.com/products', {
    next: { tags: ['products'] },
  }).then(res => res.json());
  
  return NextResponse.json(products);
}

// When updating products
'use server';

import { revalidateTag } from 'next/cache';

export async function updateProduct(id: string) {
  // Update in database
  await db.product.update({ where: { id }, data: { ... } });
  
  // Revalidate with stale-while-revalidate
  // Old data served for 30 seconds while new data is fetched
  revalidateTag('products', { cacheLife: 30 });
}

// Benefits:
// - Users see instant responses (stale data)
// - Fresh data is fetched in background
// - Better user experience
// - Reduced server load`}
            language="javascript"
          />
        </section>

        {/* Comparison Table */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Caching API Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Function
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Purpose
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Use Case
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    updateTag()
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Immediate cache update
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Read-your-writes after mutations
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    revalidateTag(tag, {`{ cacheLife }`})
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Stale-while-revalidate
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Background revalidation
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    refresh()
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Refresh route data
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Selective cache refresh
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/recent-updates/v16/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Proxy.ts
          </Link>
          <Link
            href="/learn/recent-updates/v16/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Turbopack Default →
          </Link>
        </div>
      </div>
    </div>
  );
}
