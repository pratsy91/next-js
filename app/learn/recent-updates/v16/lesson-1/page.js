import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "V16.1: Cache Components & 'use cache' Directive - Next.js Mastery",
  description:
    "Learn about the new cache components and 'use cache' directive in Next.js 16",
};

export default function Lesson1Page() {
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
          V16.1: Cache Components & 'use cache' Directive
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about the new explicit caching mechanism with the 'use cache'
          directive for pages, components, and functions.
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Introduction to Cache Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js 16 introduces Cache Components, providing explicit and
            flexible caching mechanisms through the new{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              "use cache"
            </code>{" "}
            directive. This allows developers to cache pages, components, and
            functions with greater control over caching behavior.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            By default, all dynamic code executes at request time, aligning with
            expectations for full-stack applications. Cache Components build
            upon Partial Pre-Rendering (PPR), enabling portions of static pages
            to opt into dynamic rendering without compromising initial load
            performance.
          </p>
        </section>

        {/* Basic Usage */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Basic 'use cache' Directive
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              "use cache"
            </code>{" "}
            directive marks a component or function as cacheable.
          </p>
          <CodeBlock
            code={`// app/components/CachedComponent.js
"use cache";

export default async function CachedComponent() {
  // This component will be cached
  const data = await fetchData();
  
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}

// Using the cached component
// app/page.js
import CachedComponent from './components/CachedComponent';

export default function Page() {
  return (
    <div>
      <CachedComponent />
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Caching Functions */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Caching Functions
          </h2>
          <CodeBlock
            code={`// lib/cached-functions.js
"use cache";

export async function getCachedData(id) {
  // This function result will be cached
  const response = await fetch(\`https://api.example.com/data/\${id}\`);
  return response.json();
}

// lib/uncached-functions.js
// No "use cache" directive
export async function getFreshData(id) {
  // This function always fetches fresh data
  const response = await fetch(\`https://api.example.com/data/\${id}\`);
  return response.json();
}

// Usage in a component
// app/page.js
import { getCachedData } from '@/lib/cached-functions';
import { getFreshData } from '@/lib/uncached-functions';

export default async function Page() {
  const cachedData = await getCachedData('123'); // Cached
  const freshData = await getFreshData('456'); // Not cached
  
  return (
    <div>
      <div>{cachedData.name}</div>
      <div>{freshData.name}</div>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Cache Configuration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Cache Configuration Options
          </h2>
          <CodeBlock
            code={`// Cache with revalidation
"use cache";
export const revalidate = 60; // Revalidate every 60 seconds

export default async function TimeBasedCache() {
  const data = await fetchData();
  return <div>{data.content}</div>;
}

// Cache with tags for on-demand revalidation
"use cache";
export const tags = ['products', 'user-123'];

export default async function TaggedCache() {
  const data = await fetchData();
  return <div>{data.content}</div>;
}

// Cache with custom key
"use cache";
export const cacheKey = (props) => \`product-\${props.id}\`;

export default async function KeyedCache({ id }) {
  const data = await fetchProduct(id);
  return <div>{data.name}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Cache Boundaries */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Cache Boundaries & Composition
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Cache Components create boundaries that determine what gets cached.
            You can compose cached and uncached components together.
          </p>
          <CodeBlock
            code={`// Cached component
// app/components/CachedHeader.js
"use cache";

export default async function CachedHeader() {
  const menu = await fetchMenu(); // Cached
  return <header>{/* Menu items */}</header>;
}

// Uncached component
// app/components/UserProfile.js
// No "use cache" directive
export default async function UserProfile() {
  const user = await fetchCurrentUser(); // Always fresh
  return <div>{user.name}</div>;
}

// Composing both
// app/page.js
import CachedHeader from './components/CachedHeader';
import UserProfile from './components/UserProfile';

export default function Page() {
  return (
    <div>
      <CachedHeader /> {/* Cached */}
      <main>
        <UserProfile /> {/* Dynamic */}
      </main>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Partial Pre-Rendering Integration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Integration with Partial Pre-Rendering (PPR)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Cache Components work seamlessly with Partial Pre-Rendering,
            allowing static shells with dynamic holes.
          </p>
          <CodeBlock
            code={`// app/page.js
// Static shell with dynamic cached components
import CachedProductList from './components/CachedProductList';
import DynamicUserCart from './components/DynamicUserCart';

export default function Page() {
  return (
    <div>
      {/* Static shell */}
      <h1>Shop</h1>
      
      {/* Cached component - rendered at build time */}
      <CachedProductList />
      
      {/* Dynamic component - rendered at request time */}
      <DynamicUserCart />
    </div>
  );
}

// app/components/CachedProductList.js
"use cache";

export default async function CachedProductList() {
  const products = await fetchProducts(); // Cached
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// app/components/DynamicUserCart.js
// No "use cache" - always dynamic
export default async function DynamicUserCart() {
  const cart = await fetchUserCart(); // Always fresh
  return <div>Items in cart: {cart.length}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Best Practices */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Best Practices
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Use for stable content:</strong> Cache components that
              display data that doesn't change frequently
            </li>
            <li>
              <strong>Keep boundaries small:</strong> Cache at component level
              rather than entire pages for better flexibility
            </li>
            <li>
              <strong>Use tags for invalidation:</strong> Tag cached components
              for on-demand revalidation
            </li>
            <li>
              <strong>Combine with PPR:</strong> Use cached components within
              static shells for optimal performance
            </li>
            <li>
              <strong>Avoid caching user-specific data:</strong> Don't cache
              components that display personalized content
            </li>
            <li>
              <strong>Set appropriate revalidation:</strong> Use revalidate
              times that match your data update frequency
            </li>
          </ul>
        </section>

        {/* Comparison Table */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Cache Components vs Traditional Caching
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Aspect
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Cache Components
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Traditional fetch() caching
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Declaration
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    "use cache" directive
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    next: {`{ revalidate }`} option
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Scope
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Component/function level
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Request level
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    Composition
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Easy to compose
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Request-level only
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    PPR Integration
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Native support
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Limited
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/recent-updates/v16"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to Next.js 16 Lessons
          </Link>
          <Link
            href="/learn/recent-updates/v16/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Proxy.ts →
          </Link>
        </div>
      </div>
    </div>
  );
}
