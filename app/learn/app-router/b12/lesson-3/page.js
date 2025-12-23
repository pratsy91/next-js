import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B12.3: Production Configuration - Next.js Mastery",
  description:
    "Complete guide to production configuration in Next.js App Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b12"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B12 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B12.3: Production Configuration
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to configure Next.js App Router for production: environment
          variables, error tracking, analytics, monitoring, and performance
          budgets.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Environment Variables */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Environment Variables
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure environment variables for production deployment.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Production Environment Variables
          </h3>
          <CodeBlock
            code={`// .env.production
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://prod-server/db
API_SECRET_KEY=prod-secret-key
STRIPE_SECRET_KEY=sk_live_...

// Platform-specific variables (Vercel):
// Set in dashboard: Settings → Environment Variables

// Docker environment variables:
// docker-compose.yml
services:
  app:
    environment:
      - DATABASE_URL=postgresql://...
      - API_SECRET_KEY=secret
    env_file:
      - .env.production

// Kubernetes:
apiVersion: v1
kind: Secret
metadata:
  name: nextjs-secrets
type: Opaque
data:
  DATABASE_URL: <base64-encoded>
  API_SECRET_KEY: <base64-encoded>

// Validate environment variables:
// lib/env.ts
function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(\`Missing required environment variable: \${name}\`);
  }
  return value || '';
}

export const env = {
  public: {
    apiUrl: getEnvVar('NEXT_PUBLIC_API_URL'),
  },
  server: {
    databaseUrl: getEnvVar('DATABASE_URL'),
    apiSecretKey: getEnvVar('API_SECRET_KEY'),
  },
};

// Check on startup:
// app/layout.js or middleware.js
if (process.env.NODE_ENV === 'production') {
  // Validate required env vars
  require('@/lib/env');
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Environment Variable Security
          </h3>
          <CodeBlock
            code={`// ✅ Best practices:

// 1. Never commit secrets
// .gitignore
.env
.env.local
.env*.local

// 2. Use different values per environment
// .env.development
DATABASE_URL=postgresql://localhost:5432/dev

// .env.production
DATABASE_URL=postgresql://prod-server/db

// 3. Use secret management services
// - Vercel Environment Variables
// - AWS Secrets Manager
// - HashiCorp Vault
// - Kubernetes Secrets

// 4. Rotate secrets regularly
// 5. Use least privilege principle
// 6. Monitor for exposed secrets

// 7. Validate on startup
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

// 8. Use TypeScript for type safety
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    API_SECRET_KEY: string;
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Error Tracking */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Error Tracking
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set up error tracking to monitor and debug production issues.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Sentry Integration
          </h3>
          <CodeBlock
            code={`// Install Sentry
npm install @sentry/nextjs

// Setup:
npx @sentry/wizard@latest -i nextjs

// Or manually:
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

// sentry.server.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

// next.config.js
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  // Your config
};

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: "your-org",
  project: "your-project",
});

// Error boundary:
// app/error.js
'use client'

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Custom Error Tracking
          </h3>
          <CodeBlock
            code={`// Custom error tracking service
// lib/error-tracking.js
export function trackError(error, context = {}) {
  // Send to your error tracking service
  fetch('https://api.example.com/errors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      context,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
    }),
  });
}

// Error boundary
'use client'

import { trackError } from '@/lib/error-tracking';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    trackError(error, {
      component: 'ErrorBoundary',
    });
  }, [error]);

  return (
    <div>
      <h2>Error occurred</h2>
      <button onClick={reset}>Retry</button>
    </div>
  );
}

// API route error handling:
export async function GET(request) {
  try {
    const data = await fetchData();
    return Response.json(data);
  } catch (error) {
    trackError(error, {
      route: '/api/data',
      method: 'GET',
    });
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Analytics */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Analytics
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Integrate analytics to track user behavior and application
            performance.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Google Analytics
          </h3>
          <CodeBlock
            code={`// Install GA
// Or use next/script

// app/components/GoogleAnalytics.js
'use client'

import Script from 'next/script';

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={\`https://www.googletagmanager.com/gtag/js?id=\${gaId}\`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: \`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '\${gaId}');
          \`,
        }}
      />
    </>
  );
}

// app/layout.js
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

// Custom events:
// lib/analytics.js
export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
};

// Usage:
trackEvent('button_click', {
  button_name: 'subscribe',
  location: 'header',
});`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Vercel Analytics
          </h3>
          <CodeBlock
            code={`// Install Vercel Analytics
npm install @vercel/analytics

// app/layout.js
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

// Vercel Speed Insights
npm install @vercel/speed-insights

// app/layout.js
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

// Custom analytics:
// lib/analytics.js
export function trackPageView(url) {
  if (typeof window !== 'undefined') {
    // Send to your analytics service
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'pageview', url }),
    });
  }
}

// Track in client component:
'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export default function Page() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return <div>Page content</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Monitoring */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Monitoring
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set up monitoring to track application health and performance.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Health Check Endpoint
          </h3>
          <CodeBlock
            code={`// app/api/health/route.js
export async function GET() {
  try {
    // Check database connection
    await checkDatabase();
    
    // Check external services
    const services = await Promise.all([
      checkRedis(),
      checkS3(),
    ]);
    
    const healthy = services.every(status => status === 'ok');
    
    return Response.json({
      status: healthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        database: 'ok',
        redis: services[0],
        s3: services[1],
      },
    }, {
      status: healthy ? 200 : 503,
    });
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    }, {
      status: 503,
    });
  }
}

// Usage:
// GET /api/health
// Returns: { status: 'healthy', ... }

// Docker health check:
// Dockerfile
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Performance Monitoring
          </h3>
          <CodeBlock
            code={`// Monitor API response times
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const start = Date.now();
  
  const response = NextResponse.next();
  
  const duration = Date.now() - start;
  
  // Log slow requests
  if (duration > 1000) {
    console.warn(\`Slow request: \${request.nextUrl.pathname} took \${duration}ms\`);
  }
  
  // Add custom header
  response.headers.set('X-Response-Time', \`\${duration}ms\`);
  
  return response;
}

// Monitor server performance
// lib/monitoring.js
export function trackPerformance(metric, value) {
  if (process.env.NODE_ENV === 'production') {
    // Send to monitoring service
    fetch('https://api.example.com/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric,
        value,
        timestamp: Date.now(),
      }),
    });
  }
}

// Usage:
const start = Date.now();
await fetchData();
const duration = Date.now() - start;
trackPerformance('api.fetchData.duration', duration);

// Logging:
// Use structured logging
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

logger.info({ userId: 123, action: 'login' }, 'User logged in');
logger.error({ error: err }, 'Database connection failed');`}
            language="javascript"
          />
        </section>

        {/* Section 5: Performance Budgets */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Performance Budgets
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set performance budgets to ensure your application stays fast.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Bundle Size Budgets
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Warn if bundle exceeds size
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
            maxSize: 200000, // 200 KB
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            maxSize: 300000, // 300 KB
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;

// CI/CD check:
// package.json
{
  "scripts": {
    "check-bundle-size": "npm run build && node scripts/check-bundle-size.js"
  }
}

// scripts/check-bundle-size.js
const fs = require('fs');
const path = require('path');

const MAX_SIZE = 500 * 1024; // 500 KB

const chunksDir = path.join(__dirname, '../.next/static/chunks');
const files = fs.readdirSync(chunksDir);

files.forEach(file => {
  const filePath = path.join(chunksDir, file);
  const stats = fs.statSync(filePath);
  
  if (stats.size > MAX_SIZE) {
    console.error(\`Bundle \${file} exceeds size limit: \${stats.size} bytes\`);
    process.exit(1);
  }
});

console.log('All bundles are within size limits');`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Lighthouse CI
          </h3>
          <CodeBlock
            code={`// Install Lighthouse CI
npm install -g @lhci/cli

// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm start',
      startServerReadyPattern: 'ready',
      startServerReadyTimeout: 10000,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

// Run Lighthouse CI:
lhci autorun

// GitHub Actions:
// .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
      - run: npm start &
      - run: lhci autorun`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b12/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B12.2 Deployment Platforms
          </Link>
          <Link
            href="/learn/app-router"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to App Router Chapters →
          </Link>
        </div>
      </div>
    </div>
  );
}
