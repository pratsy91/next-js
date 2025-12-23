import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B1.2: Core Concepts - Next.js Mastery",
  description:
    "React Server Components, Server vs Client Components, and core App Router concepts",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b1"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B1 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B1.2: Core Concepts
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Understanding React Server Components, Server vs Client Components,
          and the App Router architecture.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: React Server Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. React Server Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            React Server Components (RSC) are a new paradigm that allows
            components to render on the server. They're the default in App
            Router.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Characteristics
          </h3>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Zero bundle size:</strong> Server Components don't ship
              JavaScript to the client
            </li>
            <li>
              <strong>Direct database access:</strong> Can directly query
              databases and APIs
            </li>
            <li>
              <strong>Secure:</strong> API keys and secrets never exposed to
              client
            </li>
            <li>
              <strong>Fast initial load:</strong> Content rendered on server,
              sent as HTML
            </li>
            <li>
              <strong>Automatic code splitting:</strong> Only Client Components
              are bundled
            </li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Example Server Component
          </h3>
          <CodeBlock
            code={`// app/products/page.js
// This is a Server Component by default
import { db } from '@/lib/db';

export default async function ProductsPage() {
  // Direct database access - no API route needed!
  const products = await db.query('SELECT * FROM products');
  
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            What You CAN Do in Server Components
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Fetch data directly (databases, APIs, file system)</li>
            <li>Use async/await</li>
            <li>Access backend resources (databases, internal APIs)</li>
            <li>Keep sensitive information (API keys, tokens) on server</li>
            <li>Use Node.js modules (fs, path, etc.)</li>
            <li>Use Server-only packages</li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            What You CANNOT Do in Server Components
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Use React hooks (useState, useEffect, etc.)</li>
            <li>Use browser-only APIs (window, document, localStorage)</li>
            <li>Add event listeners (onClick, onChange, etc.)</li>
            <li>Use state or lifecycle methods</li>
            <li>Use browser-only libraries</li>
          </ul>
        </section>

        {/* Section 2: Server vs Client Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Server Components vs Client Components
          </h2>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Making a Client Component
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            To create a Client Component, add the 'use client' directive at the
            top of the file.
          </p>
          <CodeBlock
            code={`'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Comparison Table
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    Feature
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    Server Component
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                    Client Component
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Directive
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Default (no directive)
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    'use client'
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Bundle Size
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Zero (not sent to client)
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Included in bundle
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Rendering
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Server only
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Client (hydrated)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Data Fetching
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Direct (DB, APIs)
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Via API routes/fetch
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    React Hooks
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ❌ No
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ✅ Yes
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Event Handlers
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ❌ No
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ✅ Yes
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Browser APIs
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ❌ No
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ✅ Yes
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    Async/Await
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ✅ Yes
                  </td>
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">
                    ❌ No (in component body)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            When to Use Each
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-300">
                Use Server Components for:
              </h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>Fetching data</li>
                <li>Accessing backend resources</li>
                <li>Keeping sensitive information on server</li>
                <li>Large dependencies that shouldn't be in client bundle</li>
                <li>Static content</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <h4 className="mb-2 font-semibold text-green-900 dark:text-green-300">
                Use Client Components for:
              </h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-green-800 dark:text-green-200">
                <li>Interactivity (onClick, onChange, etc.)</li>
                <li>State management (useState, useReducer)</li>
                <li>Effects (useEffect, useLayoutEffect)</li>
                <li>Browser APIs (localStorage, window, etc.)</li>
                <li>Third-party libraries that need client-side features</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Component Tree Structure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Component Tree Structure
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            In App Router, Server and Client Components can be composed
            together. The 'use client' boundary creates a client component tree.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Component Composition Example
          </h3>
          <CodeBlock
            code={`// app/page.js (Server Component)
import { db } from '@/lib/db';
import UserProfile from '@/components/UserProfile'; // Server Component
import InteractiveButton from '@/components/InteractiveButton'; // Client Component

export default async function Page() {
  const users = await db.query('SELECT * FROM users');
  
  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          {/* Server Component - can pass data directly */}
          <UserProfile user={user} />
          
          {/* Client Component - receives serialized props */}
          <InteractiveButton userId={user.id} />
        </div>
      ))}
    </div>
  );
}

// components/UserProfile.js (Server Component)
export default function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// components/InteractiveButton.js (Client Component)
'use client';

import { useState } from 'react';

export default function InteractiveButton({ userId }) {
  const [liked, setLiked] = useState(false);
  
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'} Like
    </button>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Important Rules
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Server Components can import Client Components:</strong>{" "}
              ✅ Allowed
            </li>
            <li>
              <strong>
                Client Components CANNOT import Server Components:
              </strong>{" "}
              ❌ Not allowed
            </li>
            <li>
              <strong>Props must be serializable:</strong> Can't pass functions,
              classes, or non-serializable data from Server to Client
            </li>
            <li>
              <strong>'use client' creates a boundary:</strong> All children
              become Client Components unless they have their own 'use client'
            </li>
            <li>
              <strong>
                You can nest Client Components in Server Components:
              </strong>{" "}
              ✅ Allowed
            </li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Component Boundary Visualization
          </h3>
          <CodeBlock
            code={`Server Component Tree (app/)
│
├── Server Component (page.js)
│   ├── Server Component (Header.js)
│   ├── Client Component (InteractiveButton.js) ← 'use client' boundary
│   │   ├── Client Component (Icon.js) ← Still client (inherited)
│   │   └── Client Component (Tooltip.js) ← Still client (inherited)
│   └── Server Component (Footer.js)
│
Client Component Bundle (sent to browser)
│
└── InteractiveButton.js
    ├── Icon.js
    └── Tooltip.js`}
            language="text"
          />
        </section>

        {/* Section 4: Streaming and Suspense */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Streaming and Suspense
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router supports React Suspense for streaming server-rendered
            content. This allows parts of the page to render progressively.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Suspense Example
          </h3>
          <CodeBlock
            code={`// app/page.js
import { Suspense } from 'react';
import Loading from './loading';

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return <div>Slow content loaded!</div>;
}

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <Suspense fallback={<Loading />}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

// app/loading.js (automatic loading UI)
export default function Loading() {
  return <div>Loading...</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Suspense Boundaries
          </h3>
          <CodeBlock
            code={`// app/page.js
import { Suspense } from 'react';

async function UserProfile({ userId }) {
  const user = await fetchUser(userId);
  return <div>{user.name}</div>;
}

async function UserPosts({ userId }) {
  const posts = await fetchPosts(userId);
  return <div>{posts.length} posts</div>;
}

export default function Page({ params }) {
  return (
    <div>
      <h1>User Dashboard</h1>
      
      {/* Each Suspense boundary streams independently */}
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile userId={params.userId} />
      </Suspense>
      
      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPosts userId={params.userId} />
      </Suspense>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Benefits of Streaming
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Faster Time to First Byte (TTFB):</strong> Server starts
              sending HTML immediately
            </li>
            <li>
              <strong>Progressive Rendering:</strong> Content appears as it's
              ready
            </li>
            <li>
              <strong>Better UX:</strong> Users see content faster, even if some
              parts are still loading
            </li>
            <li>
              <strong>Parallel Data Fetching:</strong> Multiple data sources can
              load simultaneously
            </li>
          </ul>
        </section>

        {/* Section 5: Server Actions */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Server Actions
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions are async functions that run on the server. They can
            be called from Client Components and are perfect for mutations.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Server Action
          </h3>
          <CodeBlock
            code={`// app/actions.js
'use server';

export async function createPost(title, content) {
  // This runs on the server
  const post = await db.posts.create({
    title,
    content,
  });
  
  return post;
}

// app/components/CreatePostForm.js (Client Component)
'use client';

import { createPost } from '@/app/actions';

export default function CreatePostForm() {
  async function handleSubmit(formData) {
    const title = formData.get('title');
    const content = formData.get('content');
    
    await createPost(title, content);
    // Post is created on server
  }
  
  return (
    <form action={handleSubmit}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">Create Post</button>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server Action with Form
          </h3>
          <CodeBlock
            code={`// app/actions.js
'use server';

export async function addToCart(productId) {
  'use server';
  
  await db.cart.add(productId);
  revalidatePath('/cart');
}

// app/components/AddToCartButton.js
'use client';

import { addToCart } from '@/app/actions';

export default function AddToCartButton({ productId }) {
  return (
    <form action={addToCart}>
      <input type="hidden" name="productId" value={productId} />
      <button type="submit">Add to Cart</button>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Features
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>
              <strong>'use server' directive:</strong> Marks functions as Server
              Actions
            </li>
            <li>
              <strong>Direct server execution:</strong> No API routes needed
            </li>
            <li>
              <strong>Type-safe:</strong> Full TypeScript support
            </li>
            <li>
              <strong>Automatic serialization:</strong> Props and return values
              are serialized
            </li>
            <li>
              <strong>Revalidation:</strong> Can call
              revalidatePath/revalidateTag
            </li>
          </ul>
        </section>

        {/* Section 6: Progressive Enhancement */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Progressive Enhancement
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions work with native HTML forms, providing functionality
            even without JavaScript enabled.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Form with Progressive Enhancement
          </h3>
          <CodeBlock
            code={`// app/components/SearchForm.js
'use client';

import { useFormStatus } from 'react-dom';
import { search } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Searching...' : 'Search'}
    </button>
  );
}

export default function SearchForm() {
  return (
    <form action={search}>
      {/* Works with JavaScript disabled! */}
      <input name="query" placeholder="Search..." />
      <SubmitButton />
    </form>
  );
}

// app/actions.js
'use server';

export async function search(formData) {
  const query = formData.get('query');
  // Process search on server
  const results = await db.search(query);
  redirect(\`/search?q=\${query}\`);
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Benefits
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Works without JavaScript:</strong> Forms submit normally
            </li>
            <li>
              <strong>Enhanced with JavaScript:</strong> Better UX when JS is
              available
            </li>
            <li>
              <strong>Accessibility:</strong> Native form behavior
            </li>
            <li>
              <strong>SEO friendly:</strong> Search engines can crawl forms
            </li>
            <li>
              <strong>Resilient:</strong> Degrades gracefully
            </li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            useFormStatus Hook
          </h3>
          <CodeBlock
            code={`'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// Must be used inside a <form> with action prop
// Must be a child of the form, not a sibling`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b1/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B1.1 Project Setup
          </Link>
          <Link
            href="/learn/app-router/b2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B2 Routing System →
          </Link>
        </div>
      </div>
    </div>
  );
}
