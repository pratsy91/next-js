import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.7: Performance & Optimization - Next.js Mastery",
  description: "Performance optimization reference for Next.js App Router",
};

export default function Lesson7Page() {
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
          B13.7: Performance & Optimization
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Performance optimization strategies, code splitting, image
          optimization, and caching.
        </p>
      </div>

      <div className="space-y-8">
        {/* Code Splitting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Code Splitting & Bundle Optimization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Code splitting is the practice of dividing your JavaScript bundle
            into smaller chunks that can be loaded on-demand. Next.js
            automatically splits code by route, but you can use dynamic imports
            for additional, manual code splitting to further optimize bundle
            sizes and improve initial load performance.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Why it matters:</strong> Large JavaScript bundles slow down
            initial page load, especially on slower networks or devices. By
            splitting code, you ensure users only download what they need, when
            they need it. Dynamic imports allow you to load components,
            libraries, or modules conditionally or lazily, reducing the initial
            bundle size. This is particularly important for heavy components
            like charts, editors, or third-party libraries that aren't needed on
            every page.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Best Practices:</strong> Use dynamic imports for components
            that are heavy, conditionally rendered, or below the fold. Always
            provide loading states for better UX. Consider disabling SSR for
            client-only components (like chart libraries) to avoid hydration
            issues. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              loading
            </code>{" "}
            prop provides a fallback UI while the chunk is being loaded.
          </p>
          <CodeBlock
            code={`// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Disable SSR if needed
});

export default function Page() {
  return <HeavyComponent />;
}

// With named exports
const Chart = dynamic(
  () => import('./Chart').then(mod => mod.Chart),
  { ssr: false }
);

// Multiple dynamic imports
const Component1 = dynamic(() => import('./Component1'));
const Component2 = dynamic(() => import('./Component2'));`}
            language="javascript"
          />
        </section>

        {/* Image Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Image Optimization (next/image)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/image
            </code>{" "}
            component provides automatic image optimization, lazy loading, and
            responsive images. It automatically serves images in modern formats
            (WebP, AVIF) when supported, resizes images on-demand, and only
            loads images when they enter the viewport.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it works:</strong> Next.js maintains an image
            optimization API that generates optimized versions of images
            on-demand. Images are automatically converted to modern formats,
            resized based on device size, and lazy-loaded by default. The
            component uses{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              srcset
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              sizes
            </code>{" "}
            attributes to serve appropriately sized images. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              priority
            </code>{" "}
            prop disables lazy loading for above-the-fold images, which is
            important for Largest Contentful Paint (LCP) optimization.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Interview Points:</strong> Always use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/image
            </code>{" "}
            instead of regular{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              img
            </code>{" "}
            tags. Understand that it prevents layout shift by requiring
            width/height, improves Core Web Vitals, and reduces bandwidth usage.
            Know when to use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              priority
            </code>{" "}
            for LCP optimization and how to configure remote image domains.
          </p>
          <CodeBlock
            code={`import Image from 'next/image';

// Basic usage
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
/>

// Priority for above-fold images
<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority
/>

// Placeholder
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/..."
/>

// Responsive images
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// External images
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};`}
            language="javascript"
          />
        </section>

        {/* Font Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Font Optimization (next/font)
          </h2>
          <CodeBlock
            code={`import { Inter, Roboto } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

// Usage
export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

// Local fonts
import localFont from 'next/font/local';

const myFont = localFont({
  src: './fonts/MyFont.woff2',
  display: 'swap',
});`}
            language="javascript"
          />
        </section>

        {/* Script Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Script Optimization (next/script)
          </h2>
          <CodeBlock
            code={`import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* afterInteractive - After page becomes interactive */}
      <Script
        src="https://example.com/script.js"
        strategy="afterInteractive"
      />
      
      {/* lazyOnload - During idle time */}
      <Script
        src="https://analytics.example.com/script.js"
        strategy="lazyOnload"
      />
      
      {/* beforeInteractive - Before page becomes interactive */}
      <Script
        src="/critical-script.js"
        strategy="beforeInteractive"
      />
      
      {/* worker - In a web worker (experimental) */}
      <Script
        src="/worker-script.js"
        strategy="worker"
      />
      
      {/* Inline scripts */}
      <Script id="my-script" strategy="afterInteractive">
        {\`console.log('Hello');\`}
      </Script>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Streaming & PPR */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Streaming & Partial Prerendering
          </h2>
          <CodeBlock
            code={`import { Suspense } from 'react';

// Streaming with Suspense
export default function Page() {
  return (
    <div>
      <h1>Fast Content</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

// Partial Prerendering (Experimental)
// next.config.js
module.exports = {
  experimental: {
    ppr: true,
  },
};

// Static shell with dynamic holes
export default function Page() {
  return (
    <div>
      {/* Static - prerendered */}
      <Header />
      
      {/* Dynamic - streamed */}
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicContent />
      </Suspense>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Caching Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Caching Strategies
          </h2>
          <CodeBlock
            code={`// Time-based revalidation
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }, // 60 seconds
});

// Tag-based revalidation
const data = await fetch('https://api.example.com/data', {
  next: { tags: ['products'] },
});

// On-demand revalidation
import { revalidateTag } from 'next/cache';
revalidateTag('products', { cacheLife: 60 });

// Force dynamic (no cache)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});

// Route segment config
export const revalidate = 3600; // 1 hour`}
            language="javascript"
          />
        </section>

        {/* Bundle Analyzer */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Bundle Analyzer & Performance Metrics
          </h2>
          <CodeBlock
            code={`// Install
npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your config
});

// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}

// Run
npm run analyze

// Performance monitoring
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              if (typeof window !== 'undefined') {
                window.addEventListener('load', () => {
                  console.log('Performance:', performance.timing);
                });
              }
            \`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Core Web Vitals */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Core Web Vitals Optimization
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>LCP (Largest Contentful Paint):</strong> Use priority
              images, optimize fonts, reduce render-blocking resources
            </li>
            <li>
              <strong>FID (First Input Delay):</strong> Reduce JavaScript
              execution time, use code splitting
            </li>
            <li>
              <strong>CLS (Cumulative Layout Shift):</strong> Set image
              dimensions, reserve space for dynamic content
            </li>
            <li>
              <strong>TTFB (Time to First Byte):</strong> Use ISR, optimize
              server response times
            </li>
            <li>
              <strong>FCP (First Contentful Paint):</strong> Minimize critical
              CSS, optimize fonts
            </li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13/lesson-6"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Metadata & SEO
          </Link>
          <Link
            href="/learn/app-router/b13/lesson-8"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Interview Questions →
          </Link>
        </div>
      </div>
    </div>
  );
}
