import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B10.2: Route Segment Config - Next.js Mastery",
  description:
    "Complete guide to route segment configuration in Next.js App Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b10"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B10 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B10.2: Route Segment Config
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to configure route segments in Next.js App Router: dynamic,
          dynamicParams, revalidate, fetchCache, runtime, preferredRegion, and
          export options.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: dynamic option */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. `dynamic` Option
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control whether a route segment is rendered statically or
            dynamically at request time.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic dynamic Configuration
          </h3>
          <CodeBlock
            code={`// app/page.js
// Force static rendering
export const dynamic = 'force-static';

export default function Page() {
  return <div>Static Page</div>;
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function DynamicPage() {
  const data = await fetch('https://api.example.com/data');
  return <div>Dynamic Page</div>;
}

// Auto (default) - Next.js decides
export const dynamic = 'auto';

export default function AutoPage() {
  return <div>Auto Page</div>;
}

// Options:
// - 'auto' (default): Next.js decides based on usage
// - 'force-dynamic': Always render dynamically
// - 'force-static': Always render statically
// - 'error': Error if dynamic rendering is needed`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            dynamic Use Cases
          </h3>
          <CodeBlock
            code={`// app/dashboard/page.js
// Force dynamic for user-specific content
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser(); // Requires request-time data
  return <div>Dashboard for {user.name}</div>;
}

// app/blog/page.js
// Force static for pre-rendered blog listing
export const dynamic = 'force-static';

export default async function BlogPage() {
  const posts = await getAllPosts(); // Can be pre-rendered
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// app/api/data/route.js
// Force dynamic for API routes with dynamic data
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const data = await fetchRealTimeData();
  return Response.json(data);
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: dynamicParams option */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. `dynamicParams` Option
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control how dynamic route segments handle unknown parameters not
            defined at build time.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic dynamicParams Configuration
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
// Allow unknown dynamic params (default: true)
export const dynamicParams = true;

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);
  
  if (!post) {
    notFound(); // Show 404 if post not found
  }
  
  return <article>{post.content}</article>;
}

// Block unknown dynamic params
export const dynamicParams = false;

export default async function BlogPostPage({ params }) {
  // Only known slugs from generateStaticParams are allowed
  const { slug } = params;
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}

// Generate known params at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// Options:
// - true (default): Allow unknown params, render 404 if not found
// - false: Block unknown params, show 404 for unknown routes`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            dynamicParams with generateStaticParams
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
// Generate known products at build time
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map(product => ({
    id: product.id,
  }));
}

// Block unknown product IDs
export const dynamicParams = false;

export default async function ProductPage({ params }) {
  // This will only be called for IDs in generateStaticParams
  const { id } = params;
  const product = await getProduct(id);
  return <div>{product.name}</div>;
}

// Allow unknown IDs (default)
export const dynamicParams = true;

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);
  
  // Handle unknown IDs
  if (!product) {
    notFound();
  }
  
  return <div>{product.name}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: revalidate option */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. `revalidate` Option
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set the revalidation time in seconds for ISR (Incremental Static
            Regeneration).
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic revalidate Configuration
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}

// Revalidate on demand only
export const revalidate = false;

export default async function StaticPage({ params }) {
  // Static at build time, no revalidation
  const data = await getData();
  return <div>{data}</div>;
}

// Revalidate every request (similar to force-dynamic)
export const revalidate = 0;

export default async function DynamicPage({ params }) {
  // Always fetch fresh data
  const data = await getFreshData();
  return <div>{data}</div>;
}

// Options:
// - false: Static, no revalidation
// - 0: Always revalidate (force dynamic)
// - number: Revalidate after N seconds`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            revalidate Use Cases
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
// Revalidate product pages every hour
export const revalidate = 3600; // 1 hour

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);
  return <div>{product.name}</div>;
}

// app/news/[slug]/page.js
// Revalidate news articles every 5 minutes
export const revalidate = 300; // 5 minutes

export default async function NewsPage({ params }) {
  const { slug } = params;
  const article = await getNewsArticle(slug);
  return <article>{article.content}</article>;
}

// app/dashboard/page.js
// Always fetch fresh data (no caching)
export const revalidate = 0;

export default async function DashboardPage() {
  const data = await getRealTimeData();
  return <div>{data}</div>;
}

// app/about/page.js
// Static, never revalidate
export const revalidate = false;

export default function AboutPage() {
  return <div>About Us</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: fetchCache option */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. `fetchCache` Option
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Override the default fetch caching behavior for a route segment.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic fetchCache Configuration
          </h3>
          <CodeBlock
            code={`// app/page.js
// Use default fetch caching
export const fetchCache = 'default-auto';

export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  // Uses default caching rules
  return <div>{JSON.stringify(data)}</div>;
}

// Force cache all fetches
export const fetchCache = 'force-cache';

export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  // All fetches are cached
  return <div>{JSON.stringify(data)}</div>;
}

// Force no cache
export const fetchCache = 'force-no-store';

export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  // All fetches bypass cache
  return <div>{JSON.stringify(data)}</div>;
}

// Only cache static rendering
export const fetchCache = 'only-cache';

export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  // Only cache if page is statically rendered
  return <div>{JSON.stringify(data)}</div>;
}

// Options:
// - 'default-auto': Use default caching
// - 'force-cache': Cache all fetches
// - 'force-no-store': Don't cache any fetches
// - 'only-cache': Only cache for static rendering`}
            language="javascript"
          />
        </section>

        {/* Section 5: runtime option */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. `runtime` Option
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Specify the runtime environment for a route segment (Edge or
            Node.js).
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic runtime Configuration
          </h3>
          <CodeBlock
            code={`// app/page.js
// Use Edge runtime (default for middleware)
export const runtime = 'edge';

export default function Page() {
  // Edge runtime limitations:
  // - No Node.js APIs
  // - Fast execution
  // - Low latency
  return <div>Edge Runtime</div>;
}

// Use Node.js runtime (default for routes)
export const runtime = 'nodejs';

export default async function Page() {
  // Full Node.js APIs available
  const fs = require('fs');
  const path = require('path');
  return <div>Node.js Runtime</div>;
}

// Use automatic runtime selection
export const runtime = 'auto'; // Default for routes

export default function Page() {
  return <div>Auto Runtime</div>;
}

// Options:
// - 'edge': Edge runtime (fast, limited APIs)
// - 'nodejs': Node.js runtime (full APIs)
// - 'auto': Automatic selection (default)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            runtime Use Cases
          </h3>
          <CodeBlock
            code={`// app/api/data/route.js
// Edge runtime for low latency
export const runtime = 'edge';

export async function GET(request) {
  // Fast response, limited APIs
  return Response.json({ data: 'from edge' });
}

// app/api/files/route.js
// Node.js runtime for file system access
export const runtime = 'nodejs';

import fs from 'fs';
import path from 'path';

export async function GET(request) {
  // Full Node.js APIs available
  const filePath = path.join(process.cwd(), 'data', 'file.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return Response.json(JSON.parse(data));
}

// app/page.js
// Auto runtime (default)
export const runtime = 'auto';

export default function Page() {
  return <div>Page</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: preferredRegion option */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. `preferredRegion` Option
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Specify the preferred deployment region for a route segment (for
            multi-region deployments).
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic preferredRegion Configuration
          </h3>
          <CodeBlock
            code={`// app/page.js
// Deploy to specific region
export const preferredRegion = 'iad1'; // US East

export default function Page() {
  return <div>US East Region</div>;
}

// Deploy to auto (default)
export const preferredRegion = 'auto';

export default function Page() {
  return <div>Auto Region</div>;
}

// Deploy to multiple regions
export const preferredRegion = ['iad1', 'sfo1'];

export default function Page() {
  return <div>Multi-Region</div>;
}

// Available regions:
// - 'iad1': US East (Virginia)
// - 'sfo1': US West (San Francisco)
// - 'dub1': EU (Dublin)
// - 'sin1': Asia Pacific (Singapore)
// - 'auto': Automatic selection
// - Array of regions: ['iad1', 'sfo1']`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            preferredRegion Use Cases
          </h3>
          <CodeBlock
            code={`// app/api/us-only/route.js
// Deploy to US regions only
export const preferredRegion = ['iad1', 'sfo1'];

export async function GET(request) {
  return Response.json({ region: 'US' });
}

// app/api/global/route.js
// Deploy to all regions
export const preferredRegion = ['iad1', 'sfo1', 'dub1', 'sin1'];

export async function GET(request) {
  return Response.json({ region: 'global' });
}

// app/page.js
// Auto region selection (optimal for users)
export const preferredRegion = 'auto';

export default function Page() {
  return <div>Auto Region</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 7: Export Options */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Export Options
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Additional export options for route segments.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complete Route Segment Config
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
// All route segment config options
export const dynamic = 'auto';
export const dynamicParams = true;
export const revalidate = 3600;
export const fetchCache = 'default-auto';
export const runtime = 'auto';
export const preferredRegion = 'auto';

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}

// Layout config
// app/dashboard/layout.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function DashboardLayout({ children }) {
  return <div>{children}</div>;
}

// Route handler config
// app/api/data/route.js
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  return Response.json({ data: 'from edge' });
}

// Config inheritance:
// - Child routes inherit from parent layouts
// - Can override parent config
// - Most specific config wins`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Config Examples by Use Case
          </h3>
          <CodeBlock
            code={`// Static page
// app/about/page.js
export const dynamic = 'force-static';
export const revalidate = false;

export default function AboutPage() {
  return <div>About Us</div>;
}

// Dynamic page with ISR
// app/products/[id]/page.js
export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600; // 1 hour

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);
  return <div>{product.name}</div>;
}

// Fully dynamic page
// app/dashboard/page.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return <div>Dashboard for {user.name}</div>;
}

// Edge API route
// app/api/edge/route.js
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  return Response.json({ runtime: 'edge' });
}

// Node.js API route
// app/api/node/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import fs from 'fs';

export async function GET(request) {
  const data = fs.readFileSync('data.json', 'utf8');
  return Response.json(JSON.parse(data));
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b10/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B10.1 Middleware
          </Link>
          <Link
            href="/learn/app-router/b10/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B10.3 Internationalization →
          </Link>
        </div>
      </div>
    </div>
  );
}
