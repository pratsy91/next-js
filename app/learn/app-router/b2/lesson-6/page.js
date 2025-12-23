import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B2.6: Not Found Handling - Next.js Mastery",
  description: "Complete guide to not-found handling in Next.js App Router",
};

export default function Lesson6Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b2"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B2 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B2.6: Not Found Handling
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about not-found.js files, notFound() function, custom 404 pages,
          and nested not-found handling.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: not-found.js file */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. not-found.js File
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              not-found.js
            </code>{" "}
            file creates a 404 UI for the route segment. It shows when a route
            doesn't exist or when{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              notFound()
            </code>{" "}
            is called.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Not Found Page
          </h3>
          <CodeBlock
            code={`// app/not-found.js (Root level)
export default function NotFound() {
  return (
    <div className="not-found">
      <h2>404 - Not Found</h2>
      <p>Could not find requested resource</p>
      <a href="/">Go home</a>
    </div>
  );
}

// app/products/[id]/not-found.js (Nested level)
export default function ProductNotFound() {
  return (
    <div className="product-not-found">
      <h2>Product Not Found</h2>
      <p>The product you're looking for doesn't exist.</p>
      <a href="/products">Browse all products</a>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How not-found.js Works
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>Shows when a route doesn't exist</li>
            <li>Shows when notFound() is called</li>
            <li>Can be nested at any route level</li>
            <li>Returns 404 HTTP status code</li>
            <li>Can be a Server or Client Component</li>
          </ul>
        </section>

        {/* Section 2: notFound() function */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. notFound() Function
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              notFound()
            </code>{" "}
            function allows you to programmatically trigger the not-found UI.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
import { notFound } from 'next/navigation';

async function getProduct(id) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) {
    notFound(); // Triggers app/products/[id]/not-found.js
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            notFound() in Server Components
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

export default async function BlogPost({ params }) {
  const { slug } = await params;
  
  const post = await db.posts.findUnique({
    where: { slug },
  });
  
  if (!post) {
    notFound(); // Shows not-found.js
  }
  
  // Check if post is published
  if (!post.published) {
    notFound(); // Also shows not-found for unpublished posts
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Custom 404 Pages */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Custom 404 Pages
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            You can create custom, styled 404 pages that match your application
            design.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Styled Not Found Page
          </h3>
          <CodeBlock
            code={`// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link 
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Not Found with Suggestions
          </h3>
          <CodeBlock
            code={`// app/not-found.js
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const pathname = usePathname();
  
  // Suggest similar routes
  const suggestions = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
  ];
  
  return (
    <div className="not-found-page">
      <div className="container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page <code>{pathname}</code> could not be found.
        </p>
        
        <div className="suggestions">
          <h3>You might be looking for:</h3>
          <ul>
            {suggestions.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        <Link href="/" className="home-button">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Nested Not Found */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Nested Not Found
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Not-found pages can be nested at different route levels, providing
            context-specific 404 pages.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Not Found Hierarchy
          </h3>
          <CodeBlock
            code={`// Directory structure:
// app/
//   ├── not-found.js              → Root 404
//   ├── products/
//   │   ├── not-found.js          → Products 404
//   │   └── [id]/
//   │       ├── not-found.js      → Product 404
//   │       └── page.js

// app/not-found.js
export default function RootNotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>This page doesn't exist.</p>
    </div>
  );
}

// app/products/not-found.js
export default function ProductsNotFound() {
  return (
    <div>
      <h2>Product Category Not Found</h2>
      <p>This product category doesn't exist.</p>
      <a href="/products">View all products</a>
    </div>
  );
}

// app/products/[id]/not-found.js
export default function ProductNotFound() {
  return (
    <div>
      <h2>Product Not Found</h2>
      <p>This product doesn't exist or has been removed.</p>
      <a href="/products">Browse products</a>
    </div>
  );
}

// When accessing /products/invalid-id:
// - Shows ProductNotFound (closest not-found.js)
// - If ProductNotFound doesn't exist, shows ProductsNotFound
// - If ProductsNotFound doesn't exist, shows RootNotFound`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Not Found Priority
          </h3>
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            The closest not-found.js to the route takes precedence:
          </p>
          <ol className="list-inside list-decimal space-y-1 text-gray-600 dark:text-gray-300">
            <li>Route-specific not-found.js (highest priority)</li>
            <li>Parent route not-found.js</li>
            <li>Root not-found.js (lowest priority)</li>
          </ol>
        </section>

        {/* Section 5: Best Practices */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Best Practices
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Following best practices ensures a good user experience when pages
            are not found.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Not Found Best Practices
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Provide helpful messages:</strong> Explain what went wrong
              and what the user can do
            </li>
            <li>
              <strong>Include navigation:</strong> Add links to home, related
              pages, or search
            </li>
            <li>
              <strong>Match your design:</strong> Keep not-found pages
              consistent with your app's design
            </li>
            <li>
              <strong>Use nested not-found:</strong> Create context-specific 404
              pages for different sections
            </li>
            <li>
              <strong>Log missing routes:</strong> Track 404s to identify broken
              links or missing content
            </li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complete Example
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

export default async function ProductPage({ params }) {
  const { id } = await params;
  
  try {
    const product = await db.products.findUnique({
      where: { id },
      include: { category: true },
    });
    
    if (!product) {
      notFound();
    }
    
    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    );
  } catch (error) {
    // Handle errors
    notFound();
  }
}

// app/products/[id]/not-found.js
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="product-not-found">
      <h2>Product Not Found</h2>
      <p>This product doesn't exist or has been removed.</p>
      <div className="actions">
        <Link href="/products">Browse All Products</Link>
        <Link href="/">Go Home</Link>
      </div>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b2/lesson-5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B2.5 Error Handling
          </Link>
          <Link
            href="/learn/app-router/b3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B3 Data Fetching →
          </Link>
        </div>
      </div>
    </div>
  );
}
