import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B1.1: Project Setup - Next.js Mastery",
  description: "Complete project setup guide for Next.js App Router",
};

export default function Lesson1Page() {
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
          B1.1: Project Setup
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete guide to setting up a Next.js project with App Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: create-next-app */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. create-next-app with App Router
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The easiest way to start a Next.js project is using create-next-app.
            In Next.js 13+, App Router is the default.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Setup
          </h3>
          <CodeBlock
            code={`npx create-next-app@latest my-app
# or
yarn create next-app my-app
# or
pnpm create next-app my-app
# or
bun create next-app my-app`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Interactive Setup (All Options)
          </h3>
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            When you run create-next-app, you'll be prompted with these options:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>
              <strong>TypeScript:</strong> Yes/No - Adds TypeScript support
            </li>
            <li>
              <strong>ESLint:</strong> Yes/No - Adds ESLint for code quality
            </li>
            <li>
              <strong>Tailwind CSS:</strong> Yes/No - Adds Tailwind CSS
            </li>
            <li>
              <strong>src/ directory:</strong> Yes/No - Uses src/ folder
              structure
            </li>
            <li>
              <strong>App Router:</strong> Yes/No - Uses App Router (default:
              Yes)
            </li>
            <li>
              <strong>Import alias:</strong> Customize @/* import alias
            </li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Non-Interactive Setup (Flags)
          </h3>
          <CodeBlock
            code={`npx create-next-app@latest my-app \\
  --typescript \\
  --eslint \\
  --tailwind \\
  --app \\
  --src-dir \\
  --import-alias "@/*"`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Available Flags
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --typescript
              </code>{" "}
              or{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --ts
              </code>
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --javascript
              </code>{" "}
              or{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --js
              </code>
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --eslint
              </code>
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --tailwind
              </code>
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --app
              </code>{" "}
              - Use App Router
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --src-dir
              </code>{" "}
              - Use src/ directory
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --import-alias
              </code>{" "}
              - Custom import alias
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --turbopack
              </code>{" "}
              - Use Turbopack (experimental)
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --use-npm
              </code>
              ,{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --use-yarn
              </code>
              ,{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --use-pnpm
              </code>
              ,{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                --use-bun
              </code>
            </li>
          </ul>
        </section>

        {/* Section 2: Manual Setup */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Manual Setup with app/ Directory
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            For more control, you can set up Next.js manually.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Step 1: Initialize Project
          </h3>
          <CodeBlock
            code={`mkdir my-app
cd my-app
npm init -y`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Step 2: Install Dependencies
          </h3>
          <CodeBlock
            code={`npm install next@latest react@latest react-dom@latest`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Step 3: Create Directory Structure
          </h3>
          <CodeBlock
            code={`mkdir -p app
mkdir -p public
mkdir -p components
mkdir -p lib`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Step 4: Create Root Layout
          </h3>
          <CodeBlock
            code={`// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Step 5: Create Home Page
          </h3>
          <CodeBlock
            code={`// app/page.js
export default function Home() {
  return <h1>Hello, Next.js!</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Step 6: Update package.json Scripts
          </h3>
          <CodeBlock
            code={`{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}`}
            language="json"
          />
        </section>

        {/* Section 3: Project Structure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Project Structure (app/, public/, components/, lib/)
          </h2>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Standard App Router Structure
          </h3>
          <CodeBlock
            code={`my-app/
├── app/                    # App Router directory (required)
│   ├── layout.js          # Root layout (required)
│   ├── page.js            # Home page
│   ├── loading.js         # Loading UI
│   ├── error.js           # Error boundary
│   ├── not-found.js       # 404 page
│   ├── globals.css        # Global styles
│   └── [routes]/          # Route segments
├── public/                 # Static files
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── components/             # React components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── lib/                   # Utility functions
│   ├── utils.js
│   └── db.js
├── next.config.js         # Next.js configuration
├── package.json
└── .env.local            # Environment variables`}
            language="text"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With src/ Directory
          </h3>
          <CodeBlock
            code={`my-app/
├── src/
│   ├── app/              # App Router
│   ├── components/       # Components
│   └── lib/             # Utilities
├── public/              # Static files
└── next.config.js`}
            language="text"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Directory Purposes
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>app/</strong> - Contains routes, layouts, and special
              files. This is where your App Router lives.
            </li>
            <li>
              <strong>public/</strong> - Static assets served at the root URL.
              Files here are accessible via /filename.
            </li>
            <li>
              <strong>components/</strong> - Reusable React components
              (convention, not required).
            </li>
            <li>
              <strong>lib/</strong> - Utility functions, helpers, and shared
              code (convention, not required).
            </li>
          </ul>
        </section>

        {/* Section 4: next.config.js */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. next.config.js Configuration (All Options)
          </h2>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Configuration
          </h3>
          <CodeBlock
            code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration options
};

module.exports = nextConfig;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complete Configuration with All Options
          </h3>
          <CodeBlock
            code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  // React configuration
  reactStrictMode: true,
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
    emotion: true,
  },
  
  // Experimental features
  experimental: {
    appDir: true, // Already default in Next.js 13+
    serverActions: true,
    serverComponentsExternalPackages: [],
    optimizePackageImports: ['lucide-react'],
    turbotrace: {
      logLevel: 'error',
    },
  },
  
  // Image optimization
  images: {
    domains: ['example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
        port: '',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Output configuration
  output: 'standalone', // or 'export' for static export
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },
  
  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack config
    return config;
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // PoweredByHeader
  poweredByHeader: false,
  
  // Generate ETags
  generateEtags: true,
  
  // Compression
  compress: true,
  
  // Trailing slash
  trailingSlash: false,
  
  // Base path
  basePath: '',
  
  // Asset prefix
  assetPrefix: '',
  
  // Production browser source maps
  productionBrowserSourceMaps: false,
  
  // Optimize fonts
  optimizeFonts: true,
  
  // Modularize imports
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
  },
  
  // Server components external packages
  serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  
  // Transpile packages
  transpilePackages: ['shared-ui', 'shared-utils'],
  
  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // On demand revalidation
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Configuration Options Explained
          </h3>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div>
              <strong className="text-gray-900 dark:text-white">
                reactStrictMode:
              </strong>{" "}
              Enables React's Strict Mode
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">
                compiler:
              </strong>{" "}
              Configure SWC compiler options
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">
                experimental:
              </strong>{" "}
              Enable experimental features
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">images:</strong>{" "}
              Configure next/image optimization
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">output:</strong>{" "}
              'standalone' for Docker, 'export' for static
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">
                redirects/rewrites:
              </strong>{" "}
              URL manipulation
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">
                headers:
              </strong>{" "}
              Custom HTTP headers
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">
                webpack:
              </strong>{" "}
              Custom webpack configuration
            </div>
          </div>
        </section>

        {/* Section 5: Environment Variables */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Environment Variables
          </h2>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Environment Variable Files
          </h3>
          <ul className="mb-4 list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                .env
              </code>{" "}
              - Default for all environments
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                .env.local
              </code>{" "}
              - Local overrides (gitignored)
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                .env.development
              </code>{" "}
              - Development only
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                .env.production
              </code>{" "}
              - Production only
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                .env.test
              </code>{" "}
              - Test environment
            </li>
          </ul>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Public vs Private Variables
          </h3>
          <CodeBlock
            code={`# Public variables (exposed to browser)
# Must be prefixed with NEXT_PUBLIC_
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=abc123

# Private variables (server-only)
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123
JWT_SECRET=your-secret-key`}
            language="text"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using Environment Variables
          </h3>
          <CodeBlock
            code={`// Server Component or Server Action
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const dbUrl = process.env.DATABASE_URL; // Server-only

// Client Component (only NEXT_PUBLIC_*)
'use client';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// process.env.DATABASE_URL is undefined in client`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Runtime vs Build-time
          </h3>
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            By default, environment variables are embedded at build time. For
            runtime variables, use:
          </p>
          <CodeBlock
            code={`// next.config.js
const nextConfig = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Or use serverRuntimeConfig and publicRuntimeConfig (Pages Router only)
};`}
            language="javascript"
          />
        </section>

        {/* Section 6: TypeScript Setup */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. TypeScript Setup for App Router
          </h2>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installation
          </h3>
          <CodeBlock
            code={`npm install --save-dev typescript @types/react @types/node @types/react-dom`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            tsconfig.json Configuration
          </h3>
          <CodeBlock
            code={`{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`}
            language="json"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            App Router TypeScript Files
          </h3>
          <CodeBlock
            code={`// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My app description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx
export default function Home() {
  return <h1>Home</h1>;
}

// app/[slug]/page.tsx
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <div>Slug: {params.slug}</div>;
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Type Definitions for App Router
          </h3>
          <CodeBlock
            code={`// types/next.d.ts
import { NextRequest } from 'next/server';

export interface RouteContext {
  params: Promise<{ [key: string]: string }>;
}

// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello' });
}`}
            language="typescript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to B1 Lessons
          </Link>
          <Link
            href="/learn/app-router/b1/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B1.2 Core Concepts →
          </Link>
        </div>
      </div>
    </div>
  );
}
