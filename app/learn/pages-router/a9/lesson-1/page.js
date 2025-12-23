import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A9.1: Performance - Next.js Mastery",
  description:
    "Complete guide to performance optimization in Next.js Pages Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a9"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A9 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A9.1: Performance
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to optimize performance with code splitting, dynamic
          imports, lazy loading, bundle analysis, and webpack configuration.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Code Splitting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Code Splitting
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically splits code by route, but you can optimize
            further with dynamic imports.
          </p>

          <CodeBlock
            code={`// Automatic code splitting
// Next.js automatically splits code for each page
// pages/index.js → separate chunk
// pages/about.js → separate chunk
// pages/blog/[slug].js → separate chunk

// Each page only loads its own code
// pages/index.js
export default function Home() {
  return <h1>Home</h1>;
}

// pages/about.js
export default function About() {
  return <h1>About</h1>;
}

// Automatic splitting benefits:
// - Smaller initial bundle
// - Faster page loads
// - Better caching
// - Parallel loading

// Manual code splitting with dynamic imports
import dynamic from 'next/dynamic';

// Component-level splitting
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'));

export default function Page() {
  return (
    <div>
      <h1>Page</h1>
      <HeavyComponent />
    </div>
  );
}

// Route-level splitting
// pages/dashboard.js
const Dashboard = dynamic(() => import('../components/Dashboard'));

export default function DashboardPage() {
  return <Dashboard />;
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Dynamic Imports */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Dynamic Imports
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use dynamic imports to load components, libraries, and modules only
            when needed.
          </p>

          <CodeBlock
            code={`// Basic dynamic import
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/MyComponent'));

export default function Page() {
  return <DynamicComponent />;
}

// With loading state
const DynamicComponent = dynamic(
  () => import('../components/MyComponent'),
  {
    loading: () => <p>Loading...</p>,
  }
);

// With SSR disabled
const DynamicComponent = dynamic(
  () => import('../components/ClientOnlyComponent'),
  {
    ssr: false, // Don't render on server
  }
);

// With custom loading component
const DynamicComponent = dynamic(
  () => import('../components/MyComponent'),
  {
    loading: () => <div className="spinner">Loading...</div>,
  }
);

// Importing named exports
const { Chart, Table } = dynamic(
  () => import('../components/DataVisualization'),
  {
    loading: () => <p>Loading charts...</p>,
  }
);

// Conditional dynamic import
import { useState } from 'react';
import dynamic from 'next/dynamic';

export default function Page() {
  const [showChart, setShowChart] = useState(false);
  const Chart = dynamic(() => import('../components/Chart'));
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && <Chart />}
    </div>
  );
}

// Dynamic import with libraries
const Plotly = dynamic(() => import('react-plotly.js'), {
  ssr: false,
});

export default function ChartPage() {
  return <Plotly data={data} />;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Lazy Loading Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Lazy Loading Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Lazy load components that aren't immediately visible to reduce
            initial bundle size.
          </p>

          <CodeBlock
            code={`// Lazy load below-the-fold content
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div>Loading footer...</div>,
});

const Sidebar = dynamic(() => import('../components/Sidebar'));

export default function Page() {
  return (
    <div>
      <h1>Above the fold content</h1>
      {/* Below the fold - lazy loaded */}
      <Sidebar />
      <Footer />
    </div>
  );
}

// Lazy load modals
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('../components/Modal'));

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}

// Lazy load heavy libraries
const Editor = dynamic(() => import('../components/RichTextEditor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

export default function EditorPage() {
  return <Editor />;
}

// Lazy load with intersection observer
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const LazyComponent = dynamic(() => import('../components/LazyComponent'));

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref}>
      {isVisible && <LazyComponent />}
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

          <CodeBlock
            code={`// Install bundle analyzer
npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});

// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}

// Run analysis
npm run analyze

// This opens a visual representation of your bundle:
// - Largest dependencies
// - Code splitting effectiveness
// - Duplicate dependencies
// - Unused code

// Manual bundle inspection
// Build your app
npm run build

// Check .next/analyze/ directory for reports

// Using webpack-bundle-analyzer directly
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }
    return config;
  },
};

// Analyzing specific chunks
// Check .next/static/chunks/ directory
// Each chunk file shows:
// - File size
// - Dependencies
// - Code splitting points`}
            language="javascript"
          />
        </section>

        {/* Section 5: Webpack Configuration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Webpack Configuration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Customize webpack configuration to optimize bundle size and
            performance.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Modify config
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    };
    
    return config;
  },
};

// Exclude large dependencies from bundle
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

// Alias configuration
module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '.'),
      '@components': path.resolve(__dirname, 'components'),
      '@utils': path.resolve(__dirname, 'utils'),
    };
    
    return config;
  },
};

// Ignore specific modules
module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );
    
    return config;
  },
};

// Performance hints
module.exports = {
  webpack: (config) => {
    config.performance = {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };
    
    return config;
  },
};`}
            language="javascript"
          />
        </section>

        {/* Section 6: Tree Shaking */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Tree Shaking
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Tree shaking removes unused code from your bundle automatically.
          </p>

          <CodeBlock
            code={`// Tree shaking works automatically with ES modules
// ✅ Good - only imports what you need
import { debounce } from 'lodash-es';
import { format } from 'date-fns';

// ❌ Bad - imports entire library
import _ from 'lodash';
import * as dateFns from 'date-fns';

// Using specific imports
// ✅ Good
import { Button } from '@mui/material';
import { useState } from 'react';

// ❌ Bad
import * as MUI from '@mui/material';
import * as React from 'react';

// Configure tree shaking in next.config.js
module.exports = {
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      usedExports: true, // Enable tree shaking
      sideEffects: false, // Mark as side-effect free
    };
    
    return config;
  },
};

// package.json sideEffects
{
  "sideEffects": false, // All files are side-effect free
}

// Or specify files with side effects
{
  "sideEffects": [
    "*.css",
    "./src/polyfills.js"
  ]
}

// Using babel-plugin-import for better tree shaking
// Install: npm install babel-plugin-import

// .babelrc
{
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}

// This transforms:
import { Button } from 'antd';

// To:
import Button from 'antd/es/button';
import 'antd/es/button/style/css';

// Better tree shaking with specific imports
// ✅ Good
import debounce from 'lodash/debounce';
import format from 'date-fns/format';

// ❌ Bad
import { debounce } from 'lodash';
import { format } from 'date-fns';`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a9"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to A9 Lessons
          </Link>
          <Link
            href="/learn/pages-router/a9/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A9.2 Caching →
          </Link>
        </div>
      </div>
    </div>
  );
}
