import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A11.7: Performance & Optimization - Next.js Mastery",
  description: "Performance optimization reference for Next.js Pages Router",
};

export default function Lesson7Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a11"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A11 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A11.7: Performance & Optimization
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Performance optimization, code splitting, image optimization, and
          caching strategies.
        </p>
      </div>

      <div className="space-y-8">
        {/* Automatic Code Splitting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Automatic Code Splitting
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically splits your code per page during the build
            process. Each page in the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/
            </code>{" "}
            directory becomes its own JavaScript bundle, meaning users only
            download the code needed for the pages they visit. This is a
            fundamental performance optimization that happens without any
            configuration.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it works:</strong> When you navigate to a page, Next.js
            only loads that page's JavaScript bundle and any shared dependencies
            (like React). The initial bundle is smaller, leading to faster page
            loads. Shared code is automatically extracted into separate chunks
            that can be cached across page navigations. This automatic code
            splitting is one of Next.js's core features and differs from
            create-react-app or manual webpack configuration where you'd need to
            set up code splitting yourself.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Interview Points:</strong> Understand that automatic code
            splitting reduces initial bundle size, improves Time to Interactive
            (TTI), and enables better caching strategies. Each route is split
            automatically, and shared dependencies are extracted. Dynamic
            imports can be used for additional manual splitting when needed.
          </p>
          <CodeBlock
            code={`// Next.js automatically splits code per page
// pages/index.js → one bundle
// pages/about.js → separate bundle
// pages/products/[id].js → separate bundle per dynamic route

// Benefits:
// - Smaller initial bundle
// - Faster page loads
// - Only loads code needed for current page

// Each page only loads its own code
export default function HomePage() {
  return <h1>Home</h1>;
}
// Only HomePage code is loaded, not About or Products`}
            language="javascript"
          />
        </section>

        {/* Dynamic Imports */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Dynamic Imports & Lazy Loading
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Dynamic imports with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/dynamic
            </code>{" "}
            allow you to code-split components and load them only when needed.
            This is essential for reducing initial bundle size, especially for
            heavy components like charts, editors, or third-party libraries that
            aren't needed on every page.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>When to use:</strong> Use dynamic imports for components
            that are conditionally rendered, below the fold, or in
            modals/dropdowns that may never be opened. They're also useful for
            components that rely on browser-only APIs and shouldn't be
            server-side rendered. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              ssr: false
            </code>{" "}
            option prevents server-side rendering of the component, which is
            important for libraries that use browser globals like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              window
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              document
            </code>
            .
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Performance Impact:</strong> Dynamic imports split code at
            build time, creating separate chunks that are loaded on-demand. This
            can reduce initial bundle size by 30-50% or more depending on what
            you're splitting. Always provide a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              loading
            </code>{" "}
            component for better UX while the chunk is being fetched and parsed.
          </p>
          <CodeBlock
            code={`import dynamic from 'next/dynamic';

// Basic dynamic import
const HeavyComponent = dynamic(() => import('../components/Heavy'));

export default function Page() {
  return <HeavyComponent />;
}

// With loading state
const HeavyComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <div>Loading...</div>,
});

// Disable SSR
const Chart = dynamic(() => import('../components/Chart'), {
  ssr: false,
});

// With named exports
const Chart = dynamic(
  () => import('../components/Chart').then(mod => mod.Chart),
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
            3. Image Optimization (next/image)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/image
            </code>{" "}
            component is one of Next.js's most important performance features.
            It automatically optimizes images by serving them in modern formats,
            generating multiple sizes, and implementing lazy loading. This
            significantly improves page load times and Core Web Vitals scores,
            particularly Largest Contentful Paint (LCP).
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Technical Details:</strong> Next.js runs an image
            optimization service that processes images on-demand, converting
            them to WebP or AVIF when the browser supports these formats. The
            service generates multiple image sizes based on the device's pixel
            density and screen size. Images are lazy-loaded by default (only
            load when entering viewport), preventing unnecessary bandwidth
            usage. The component uses the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              srcset
            </code>{" "}
            attribute to serve the appropriately sized image, and the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              sizes
            </code>{" "}
            prop tells the browser how wide the image will be displayed.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Why it's crucial:</strong> Images often account for the
            largest portion of page weight. Optimizing them can reduce page size
            by 50-80%, dramatically improving load times. The automatic format
            conversion and responsive sizing ensure users get the best image for
            their device without manual optimization work. Always specify width
            and height to prevent Cumulative Layout Shift (CLS), and use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              priority
            </code>{" "}
            for images that are the LCP element.
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
    domains: ['example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
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
            4. Font Optimization (next/font)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/font
            </code>{" "}
            package optimizes fonts automatically by downloading and
            self-hosting them at build time. This eliminates external font
            requests, reduces layout shift, improves privacy, and ensures fonts
            are always available.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Benefits:</strong> Fonts are self-hosted, so there are no
            requests to external services (like Google Fonts), improving privacy
            and eliminating external dependencies. Next.js automatically
            generates font-face CSS and optimizes font files. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              display: 'swap'
            </code>{" "}
            option shows fallback text immediately, preventing invisible text
            during font load (FOIT). Font subsetting includes only characters
            used in your app, reducing file size. This prevents render-blocking
            font requests and eliminates the flash of unstyled text (FOUT) or
            invisible text (FOIT) that can hurt user experience.
          </p>
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

// Usage in _app.js
export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
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
            5. Script Optimization (next/script)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/script
            </code>{" "}
            component optimizes third-party script loading by controlling when
            scripts execute. This prevents scripts from blocking page rendering
            and improves Core Web Vitals, particularly First Input Delay (FID)
            and Time to Interactive (TTI).
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Loading Strategies Explained:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              afterInteractive
            </code>{" "}
            loads scripts after the page becomes interactive, perfect for
            analytics and chat widgets that don't need to run immediately.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              lazyOnload
            </code>{" "}
            defers scripts until browser idle time, ideal for non-critical
            scripts like social media embeds.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              beforeInteractive
            </code>{" "}
            loads before hydration, only for critical scripts like polyfills.
            Always use the least aggressive strategy - most third-party scripts
            don't need to block rendering. This can improve page load times by
            20-30% or more depending on the number and size of third-party
            scripts.
          </p>
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

        {/* Static Export */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Static Export
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Static export generates a fully static version of your Next.js
            application that can be deployed to any static hosting service
            (GitHub Pages, Netlify, Vercel, AWS S3, etc.). This creates
            pre-rendered HTML files for all pages, eliminating the need for a
            Node.js server.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>When to Use:</strong> Static export is ideal for sites with
            all static content, blogs, documentation sites, marketing pages, or
            JAMstack applications. It provides the best performance and lowest
            cost since there's no server to maintain. However, it has
            limitations: no API routes (they're excluded), no{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>{" "}
            (only static generation), no image optimization (unless using
            external service), and no rewrites or redirects at runtime. All
            routes must be pre-determinable at build time. For dynamic features,
            you'd need to use client-side data fetching or external APIs.
          </p>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
};

// Build command
// npm run build
// Generates static HTML files in 'out' directory

// Limitations:
// - No API routes
// - No getServerSideProps
// - No rewrites or redirects
// - No image optimization (unless using external service)

// Use cases:
// - Static sites
// - Documentation
// - Marketing pages
// - JAMstack deployments`}
            language="javascript"
          />
        </section>

        {/* Bundle Analyzer */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Bundle Analyzer
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Bundle analyzers help you understand what's in your JavaScript
            bundles, identify large dependencies, find duplicate code, and
            optimize bundle sizes. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              @next/bundle-analyzer
            </code>{" "}
            package provides interactive visualizations of your bundle
            composition.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How to Use:</strong> The analyzer generates interactive
            treemaps showing bundle sizes, module sizes, and which packages
            contribute the most to bundle size. This helps you identify
            optimization opportunities - large libraries that could be
            dynamically imported, duplicate code that could be deduplicated, or
            unnecessary dependencies. Regular bundle analysis should be part of
            your performance optimization workflow. Look for packages over
            100KB, opportunities for code splitting, and duplicate dependencies
            that could be resolved through better dependency management.
          </p>
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

// Opens bundle analysis in browser
// Shows:
// - Bundle sizes
// - Chunk sizes
// - Module sizes
// - Duplicate modules`}
            language="javascript"
          />
        </section>

        {/* Performance Monitoring */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Performance Monitoring
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Monitoring real user performance metrics is essential for
            understanding how your application performs in production. Core Web
            Vitals (LCP, FID, CLS) are Google's metrics for measuring user
            experience, and they directly impact SEO rankings.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Core Web Vitals Explained:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Largest Contentful Paint (LCP)
            </code>{" "}
            measures loading performance - should be under 2.5 seconds.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              First Input Delay (FID)
            </code>{" "}
            measures interactivity - should be under 100ms.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Cumulative Layout Shift (CLS)
            </code>{" "}
            measures visual stability - should be under 0.1. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              web-vitals
            </code>{" "}
            library makes it easy to measure and report these metrics. You
            should send these metrics to your analytics service to track
            performance over time and identify regressions. Set up alerts for
            performance degradation to catch issues early.
          </p>
          <CodeBlock
            code={`// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    // Web Vitals
    const reportWebVitals = (metric) => {
      console.log(metric);
      // Send to analytics
      fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(metric),
      });
    };
    
    // Measure Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(reportWebVitals);
      getFID(reportWebVitals);
      getFCP(reportWebVitals);
      getLCP(reportWebVitals);
      getTTFB(reportWebVitals);
    });
  }, []);
  
  return <Component {...pageProps} />;
}

// Performance API
useEffect(() => {
  if (typeof window !== 'undefined' && window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0];
    console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart);
  }
}, []);`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a11/lesson-6"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Head & Metadata
          </Link>
          <Link
            href="/learn/pages-router/a11/lesson-8"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Interview Questions →
          </Link>
        </div>
      </div>
    </div>
  );
}
