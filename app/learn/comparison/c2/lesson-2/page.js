import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C2.2: Data Fetching - Next.js Mastery",
  description: "Data fetching differences between App Router and Pages Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c2"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C2 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C2.2: Data Fetching
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Compare data fetching approaches: Pages Router uses
          getServerSideProps/getStaticProps, while App Router uses async Server
          Components and Server Actions.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Pages Router Data Fetching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Pages Router: getServerSideProps, getStaticProps, getStaticPaths
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router uses special functions for data fetching.
          </p>

          <CodeBlock
            code={`// Pages Router: Server-side rendering
// pages/profile.js
export async function getServerSideProps(context) {
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  
  return {
    props: {
      user,
    },
  };
}

export default function Profile({ user }) {
  return <div>{user.name}</div>;
}

// Pages Router: Static generation
// pages/blog/[slug].js
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'post-1' } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  
  return {
    props: {
      post,
    },
    revalidate: 60, // ISR
  };
}

export default function BlogPost({ post }) {
  return <article>{post.title}</article>;
}

// Pages Router: Client-side fetching
// pages/dashboard.js
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data?.message}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: App Router Data Fetching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. App Router: Async Server Components, Server Actions, fetch with
            Caching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router uses async Server Components and Server Actions for data
            fetching.
          </p>

          <CodeBlock
            code={`// App Router: Server Component (automatic SSR)
// app/profile/page.tsx
export default async function Profile() {
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  
  return <div>{user.name}</div>;
}

// App Router: Static generation with caching
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  return [{ slug: 'post-1' }];
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  
  return <article>{post.title}</article>;
}

// Revalidation
export const revalidate = 60; // ISR

// App Router: Server Actions
// app/actions.ts
'use server';

export async function createPost(data) {
  // Server-side action
  await savePost(data);
}

// app/create/page.tsx
import { createPost } from './actions';

export default function CreatePage() {
  async function handleSubmit(formData) {
    'use server';
    await createPost(formData);
  }
  
  return <form action={handleSubmit}>...</form>;
}

// App Router: Client-side fetching
// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data?.message}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Comparison Table */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Comparison
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Side-by-side comparison of data fetching methods.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Pages Router
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    App Router
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Server-side Rendering
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    getServerSideProps
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Async Server Component
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Static Generation
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    getStaticProps
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Async Server Component (default)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Dynamic Routes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    getStaticPaths
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    generateStaticParams
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    ISR (Revalidation)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    revalidate in getStaticProps
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    revalidate export
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Mutations
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    API Routes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Server Actions
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    Fetch Caching
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Manual caching
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Automatic with fetch options
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c2/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C2.1 Routing
          </Link>
          <Link
            href="/learn/comparison/c2/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C2.3 Navigation →
          </Link>
        </div>
      </div>
    </div>
  );
}
