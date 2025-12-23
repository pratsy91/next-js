import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B11.1: Performance - Next.js Mastery",
  description:
    "Complete guide to performance optimization in Next.js App Router",
};

export default function Lesson1Page() {
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
          B11.1: Performance
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to optimize performance in Next.js App Router: code
          splitting, dynamic imports, lazy loading, bundle analysis, tree
          shaking, and streaming optimization.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Code Splitting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Code Splitting
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically splits your code into smaller chunks for
            optimal loading performance.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Automatic Code Splitting
          </h3>
          <CodeBlock
            code={`// Next.js automatically splits code by route
// Each route gets its own bundle

// app/page.js - Bundle 1
export default function HomePage() {
  return <div>Home</div>;
}

// app/about/page.js - Bundle 2
export default function AboutPage() {
  return <div>About</div>;
}

// app/blog/page.js - Bundle 3
export default function BlogPage() {
  return <div>Blog</div>;
}

// Benefits:
// - Only load code needed for current route
// - Faster initial page load
// - Better caching (unchanged routes don't re-download)

// Manual code splitting with dynamic imports
import dynamic from 'next/dynamic';

// Component is split into separate bundle
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'));

export default function Page() {
  return (
    <div>
      <HeavyComponent />
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Route-Based Code Splitting
          </h3>
          <CodeBlock
            code={`// Next.js automatically creates separate bundles for:
// - Each route segment
// - Shared components
// - Third-party libraries

// app/layout.js - Shared bundle
export default function Layout({ children }) {
  return <div>{children}</div>;
}

// app/page.js - Home bundle
export default function HomePage() {
  return <div>Home</div>;
}

// app/dashboard/page.js - Dashboard bundle
export default function DashboardPage() {
  return <div>Dashboard</div>;
}

// Bundle structure:
// - _app.js (shared)
// - _layout.js (shared)
// - page.js (route-specific)
// - dashboard/page.js (route-specific)

// Each route only loads its own bundle + shared bundles`}
            language="javascript"
          />
        </section>

        {/* Section 2: Dynamic Imports */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Dynamic Imports
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use dynamic imports to load components and modules only when needed.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Dynamic Import
          </h3>
          <CodeBlock
            code={`// app/page.js
import dynamic from 'next/dynamic';

// Dynamically import component
const DynamicComponent = dynamic(() => import('@/components/DynamicComponent'));

export default function Page() {
  return (
    <div>
      <DynamicComponent />
    </div>
  );
}

// Component is loaded only when needed
// Creates separate bundle for DynamicComponent

// With loading state
const DynamicComponent = dynamic(
  () => import('@/components/DynamicComponent'),
  {
    loading: () => <p>Loading...</p>,
  }
);

// With SSR disabled (client-only)
const ClientOnlyComponent = dynamic(
  () => import('@/components/ClientOnlyComponent'),
  {
    ssr: false, // Don't render on server
  }
);`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Dynamic Imports
          </h3>
          <CodeBlock
            code={`// Conditional dynamic import
import dynamic from 'next/dynamic';
import { useState } from 'react';

export default function Page() {
  const [showChart, setShowChart] = useState(false);
  
  // Only import when needed
  const Chart = dynamic(
    () => import('@/components/Chart'),
    {
      loading: () => <div>Loading chart...</div>,
      ssr: false, // Chart library might not support SSR
    }
  );
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && <Chart />}
    </div>
  );
}

// Dynamic import with named exports
const { Chart, Table } = dynamic(
  () => import('@/components/DataVisualization'),
  {
    loading: () => <div>Loading...</div>,
  }
);

// Dynamic import with custom loading component
const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <Skeleton />,
  }
);

// Dynamic import with error boundary
const ErrorProneComponent = dynamic(
  () => import('@/components/ErrorProneComponent'),
  {
    loading: () => <div>Loading...</div>,
    error: (error) => <div>Error: {error.message}</div>,
  }
);`}
            language="javascript"
          />
        </section>

        {/* Section 3: Lazy Loading */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Lazy Loading
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Load components and resources only when they're needed or visible.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Component Lazy Loading
          </h3>
          <CodeBlock
            code={`// Lazy load components below the fold
import dynamic from 'next/dynamic';

// Above-the-fold content (load immediately)
export default function Page() {
  return (
    <div>
      <HeroSection />
      <DynamicBelowFold />
    </div>
  );
}

// Below-the-fold content (lazy load)
const DynamicBelowFold = dynamic(
  () => import('@/components/BelowFoldContent'),
  {
    loading: () => <div>Loading content...</div>,
  }
);

// Lazy load on interaction
'use client'

import dynamic from 'next/dynamic';
import { useState } from 'react';

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  
  // Only load modal when needed
  const Modal = dynamic(() => import('@/components/Modal'));
  
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Image Lazy Loading
          </h3>
          <CodeBlock
            code={`// next/image automatically lazy loads
import Image from 'next/image';

export default function Page() {
  return (
    <div>
      {/* Priority image (above fold) */}
      <Image
        src="/hero.jpg"
        alt="Hero"
        width={1920}
        height={1080}
        priority // Load immediately
      />
      
      {/* Lazy loaded images (below fold) */}
      <Image
        src="/image1.jpg"
        alt="Image 1"
        width={800}
        height={600}
        // No priority = lazy loads
      />
      
      <Image
        src="/image2.jpg"
        alt="Image 2"
        width={800}
        height={600}
        loading="lazy" // Explicit lazy loading
      />
    </div>
  );
}

// Script lazy loading
import Script from 'next/script';

export default function Page() {
  return (
    <div>
      {/* Load script after page loads */}
      <Script
        src="https://example.com/analytics.js"
        strategy="lazyOnload"
      />
      
      {/* Load script after interaction */}
      <Script
        src="https://example.com/widget.js"
        strategy="afterInteractive"
      />
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Bundle Analysis */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Bundle Analysis
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Analyze your bundle size to identify optimization opportunities.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Built-in Bundle Analysis
          </h3>
          <CodeBlock
            code={`// Next.js provides built-in bundle analysis
// Run: npm run build

// The build output shows:
// - Route bundles
// - Shared chunks
// - First Load JS size
// - Page size

// Example output:
// Route (app)                              Size     First Load JS
// ┌ ○ /                                    5.2 kB         87.3 kB
// ├ ○ /about                               2.1 kB         87.3 kB
// ├ ○ /blog                                8.4 kB         90.5 kB
// └ ○ /dashboard                           12.1 kB        94.2 kB

// First Load JS shared by all:
//   - _app.js: 87.3 kB
//   - _layout.js: 12.1 kB

// Analyze bundle composition:
// @next/bundle-analyzer

// Install: npm install @next/bundle-analyzer

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
    "analyze": "ANALYZE=true npm run build"
  }
}

// Run: npm run analyze
// Opens interactive bundle visualization`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Bundle Analyzer Setup
          </h3>
          <CodeBlock
            code={`// Install bundle analyzer
// npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your config
};

module.exports = withBundleAnalyzer(nextConfig);

// package.json
{
  "scripts": {
    "build": "next build",
    "analyze": "ANALYZE=true next build"
  }
}

// Run analysis
// npm run analyze

// This will:
// 1. Build your app
// 2. Generate bundle analysis
// 3. Open interactive visualization
// 4. Show:
//    - Bundle sizes
//    - Module dependencies
//    - Duplicate dependencies
//    - Optimization opportunities

// Use results to:
// - Identify large dependencies
// - Find duplicate code
// - Optimize imports
// - Split large bundles`}
            language="javascript"
          />
        </section>

        {/* Section 5: Tree Shaking */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Tree Shaking
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Remove unused code from your bundles automatically.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Automatic Tree Shaking
          </h3>
          <CodeBlock
            code={`// Next.js automatically tree-shakes unused code
// Only imports what you use

// ✅ Good: Named imports (tree-shakeable)
import { Button, Input } from '@/components/ui';

export default function Page() {
  return (
    <div>
      <Button>Click</Button>
      <Input />
    </div>
  );
}
// Only Button and Input are included in bundle

// ❌ Bad: Default import (includes everything)
import UI from '@/components/ui';

export default function Page() {
  return <div><UI.Button /></div>;
}
// Entire UI library might be included

// ✅ Good: Specific imports
import { debounce } from 'lodash-es';

// ❌ Bad: Entire library
import _ from 'lodash';

// ✅ Good: ESM modules (better tree shaking)
import { format } from 'date-fns';

// ❌ Bad: CommonJS (harder to tree shake)
const format = require('date-fns/format');`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Optimizing for Tree Shaking
          </h3>
          <CodeBlock
            code={`// 1. Use named exports
// components/ui.js
export const Button = () => <button>Button</button>;
export const Input = () => <input />;
export const Card = () => <div>Card</div>;

// Import only what you need
import { Button, Input } from '@/components/ui';
// Card is not included in bundle

// 2. Use ESM modules
// Prefer libraries that support ESM
import { format } from 'date-fns'; // ✅ ESM
// Better tree shaking than CommonJS

// 3. Avoid side effects
// ❌ Bad: Side effects prevent tree shaking
import './styles.css'; // Side effect
import '@/lib/init'; // Side effect

// ✅ Good: Explicit imports
import { init } from '@/lib/init';
init();

// 4. Use modular CSS
// ✅ Good: CSS Modules (scoped)
import styles from './Button.module.css';

// ❌ Bad: Global CSS (harder to optimize)
import './global.css';

// 5. Configure webpack for better tree shaking
// next.config.js
module.exports = {
  webpack: (config) => {
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;
    return config;
  },
};`}
            language="javascript"
          />
        </section>

        {/* Section 6: Streaming Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Streaming Optimization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use streaming SSR to send content to users as soon as it's ready.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Streaming SSR
          </h3>
          <CodeBlock
            code={`// Next.js App Router uses streaming by default
// Content streams as it's ready

// app/page.js
export default async function Page() {
  // Fast data (streams first)
  const fastData = await fetch('https://api.example.com/fast', {
    cache: 'no-store',
  });
  
  // Slow data (streams later)
  const slowData = await fetch('https://api.example.com/slow', {
    cache: 'no-store',
  });
  
  return (
    <div>
      <FastContent data={await fastData.json()} />
      <SlowContent data={await slowData.json()} />
    </div>
  );
}

// With Suspense boundaries
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <FastContent />
      <Suspense fallback={<Loading />}>
        <SlowContent />
      </Suspense>
    </div>
  );
}

async function SlowContent() {
  const data = await fetch('https://api.example.com/slow');
  return <div>{JSON.stringify(await data.json())}</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Optimizing Streaming
          </h3>
          <CodeBlock
            code={`// 1. Use Suspense boundaries strategically
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      {/* Critical content (no Suspense) */}
      <Hero />
      
      {/* Non-critical content (with Suspense) */}
      <Suspense fallback={<Skeleton />}>
        <RelatedContent />
      </Suspense>
      
      <Suspense fallback={<Skeleton />}>
        <Comments />
      </Suspense>
    </div>
  );
}

// 2. Prioritize above-the-fold content
export default async function Page() {
  // Load critical data first
  const heroData = await fetchHeroData();
  
  return (
    <div>
      {/* Render immediately */}
      <Hero data={heroData} />
      
      {/* Stream later */}
      <Suspense fallback={<Loading />}>
        <BelowFoldContent />
      </Suspense>
    </div>
  );
}

// 3. Use loading.js for route-level loading
// app/blog/loading.js
export default function Loading() {
  return <div>Loading blog...</div>;
}

// 4. Optimize data fetching
// Fetch in parallel when possible
export default async function Page() {
  // Parallel fetching (faster)
  const [data1, data2, data3] = await Promise.all([
    fetch('/api/data1'),
    fetch('/api/data2'),
    fetch('/api/data3'),
  ]);
  
  return <div>Content</div>;
}

// 5. Use React Server Components
// Server Components stream better than Client Components
export default async function ServerComponent() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// vs Client Component (requires hydration)
'use client'
export default function ClientComponent() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  return <div>{data}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b10/lesson-6"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B10.6 Draft Mode
          </Link>
          <Link
            href="/learn/app-router/b11/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B11.2 Caching →
          </Link>
        </div>
      </div>
    </div>
  );
}
