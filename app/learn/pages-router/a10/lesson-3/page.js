import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A10.3: Production Configuration - Next.js Mastery",
  description:
    "Complete guide to production configuration for Next.js Pages Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a10"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A10 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A10.3: Production Configuration
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn production configuration: environment variables, error tracking,
          analytics, monitoring, and performance budgets.
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

          <CodeBlock
            code={`// Production environment variables
// .env.production
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/db
API_URL=https://api.example.com
NEXT_PUBLIC_APP_URL=https://example.com

// Setting environment variables
// Vercel: Dashboard → Settings → Environment Variables
// Docker: docker-compose.yml or Dockerfile ENV
// Server: .env file or system environment

// Vercel environment variables
// Set in dashboard or CLI:
vercel env add DATABASE_URL production

// Docker environment variables
// docker-compose.yml
services:
  nextjs:
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://...
    env_file:
      - .env.production

// Server environment variables
// Create .env.production file
NODE_ENV=production
DATABASE_URL=postgresql://...

// Load with dotenv
require('dotenv').config({ path: '.env.production' });

// Environment variable validation
// lib/env.js
function getEnvVar(name, defaultValue) {
  const value = process.env[name] || defaultValue;
  if (!value) {
    throw new Error(\`Missing required environment variable: \${name}\`);
  }
  return value;
}

module.exports = {
  databaseUrl: getEnvVar('DATABASE_URL'),
  apiUrl: getEnvVar('API_URL'),
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Type-safe environment variables
// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    API_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

// Secure environment variables
// Never commit secrets to Git
// Use:
// - Vercel secrets
// - AWS Secrets Manager
// - HashiCorp Vault
// - Environment variable management tools

// Environment-specific configs
// config/production.js
module.exports = {
  apiUrl: process.env.API_URL,
  databaseUrl: process.env.DATABASE_URL,
  logLevel: 'error',
  enableAnalytics: true,
};

// config/development.js
module.exports = {
  apiUrl: 'http://localhost:3000',
  databaseUrl: 'postgresql://localhost:5432/dev',
  logLevel: 'debug',
  enableAnalytics: false,
};`}
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

          <CodeBlock
            code={`// Sentry integration
// npm install @sentry/nextjs

// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// sentry.server.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// sentry.edge.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// pages/_error.js
import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';

const CustomErrorComponent = (props) => {
  return <NextErrorComponent statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData) => {
  await Sentry.captureUnderscoreErrorException(contextData);
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;

// Custom error boundary
// components/ErrorBoundary.js
import React from 'react';
import * as Sentry from '@sentry/nextjs';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// LogRocket integration
// npm install logrocket logrocket-react

// pages/_app.js
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

if (typeof window !== 'undefined') {
  LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_APP_ID);
  setupLogRocketReact(LogRocket);
}

// Custom error logging
// lib/logger.js
class Logger {
  error(message, error, context = {}) {
    console.error(message, error);
    
    // Send to error tracking service
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        extra: { message, ...context },
      });
    }
  }

  warn(message, context = {}) {
    console.warn(message, context);
  }

  info(message, context = {}) {
    console.info(message, context);
  }
}

export default new Logger();

// API route error handling
// pages/api/[...all].js
export default async function handler(req, res) {
  try {
    // Your API logic
  } catch (error) {
    console.error('API Error:', error);
    
    // Log to error tracking
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error);
    }
    
    res.status(500).json({ error: 'Internal server error' });
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

          <CodeBlock
            code={`// Google Analytics
// npm install react-ga4

// lib/analytics.js
import ReactGA from 'react-ga4';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    ReactGA.initialize(GA_TRACKING_ID);
  }
};

export const logPageView = (url) => {
  if (typeof window !== 'undefined') {
    ReactGA.send({ hitType: 'pageview', page: url });
  }
};

export const logEvent = (category, action, label) => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};

// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initGA, logPageView } from '@/lib/analytics';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    initGA();
    logPageView(router.asPath);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      logPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

// Vercel Analytics
// Built-in analytics for Vercel deployments
// Automatically enabled on Vercel

// Plausible Analytics
// components/Plausible.js
import Script from 'next/script';

export default function Plausible() {
  return (
    <Script
      strategy="afterInteractive"
      data-domain="example.com"
      src="https://plausible.io/js/script.js"
    />
  );
}

// Mixpanel
// npm install mixpanel-browser

// lib/mixpanel.js
import mixpanel from 'mixpanel-browser';

if (typeof window !== 'undefined') {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);
}

export const track = (eventName, properties) => {
  mixpanel.track(eventName, properties);
};

// Custom analytics hook
// hooks/useAnalytics.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { logPageView, logEvent } from '@/lib/analytics';

export function useAnalytics() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      logPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return {
    trackEvent: logEvent,
  };
}

// Privacy-friendly analytics
// Consider using:
// - Plausible (privacy-focused)
// - Fathom (privacy-focused)
// - Simple Analytics
// - Self-hosted solutions`}
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

          <CodeBlock
            code={`// Vercel Analytics
// Built-in monitoring for Vercel deployments
// Tracks:
// - Page views
// - Performance metrics
// - Web Vitals
// - Real User Monitoring (RUM)

// Custom monitoring
// lib/monitoring.js
export function reportWebVitals(metric) {
  // Send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

// pages/_app.js
export function reportWebVitals(metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  
  // Send to monitoring service
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
    headers: { 'Content-Type': 'application/json' },
  });
}

// Health check endpoint
// pages/api/health.js
export default function handler(req, res) {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  };

  res.status(200).json(health);
}

// Uptime monitoring
// Use services like:
// - UptimeRobot
// - Pingdom
// - StatusCake
// - Custom health checks

// Performance monitoring
// lib/performance.js
export function measurePerformance() {
  if (typeof window !== 'undefined' && window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0];
    
    return {
      dns: navigation.dnsEnd - navigation.dnsStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      request: navigation.responseStart - navigation.requestStart,
      response: navigation.responseEnd - navigation.responseStart,
      dom: navigation.domContentLoadedEventEnd - navigation.domLoading,
      load: navigation.loadEventEnd - navigation.domLoading,
    };
  }
  return null;
}

// Error rate monitoring
// Track error rates and alert on thresholds
// lib/errorMonitor.js
let errorCount = 0;
let requestCount = 0;

export function trackRequest() {
  requestCount++;
}

export function trackError() {
  errorCount++;
}

export function getErrorRate() {
  return requestCount > 0 ? errorCount / requestCount : 0;
}

// Log monitoring
// Use log aggregation services:
// - Datadog
// - New Relic
// - LogRocket
// - ELK Stack
// - CloudWatch

// Application Performance Monitoring (APM)
// Services:
// - New Relic
// - Datadog APM
// - AppDynamics
// - Sentry Performance Monitoring`}
            language="javascript"
          />
        </section>

        {/* Section 5: Performance Budgets */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Performance Budgets
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set performance budgets to ensure optimal application performance.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  // Performance budgets
  experimental: {
    optimizeCss: true,
  },
  
  // Webpack performance hints
  webpack: (config) => {
    config.performance = {
      hints: 'warning',
      maxEntrypointSize: 512000, // 500 KB
      maxAssetSize: 512000, // 500 KB
    };
    return config;
  },
};

// Bundle size budgets
// package.json
{
  "scripts": {
    "build": "next build",
    "analyze": "ANALYZE=true next build"
  }
}

// Lighthouse CI
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
};

// Web Vitals thresholds
// lib/webVitals.js
export const WEB_VITALS_THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
};

export function checkWebVitals(metric) {
  const threshold = WEB_VITALS_THRESHOLDS[metric.name];
  if (threshold && metric.value > threshold) {
    console.warn(
      \`\${metric.name} exceeded threshold: \${metric.value} > \${threshold}\`
    );
  }
}

// Performance monitoring script
// scripts/check-performance.js
const { execSync } = require('child_process');

const budgets = {
  'first-contentful-paint': 2000,
  'largest-contentful-paint': 2500,
  'total-blocking-time': 300,
  'cumulative-layout-shift': 0.1,
};

try {
  const output = execSync('lighthouse http://localhost:3000 --json', {
    encoding: 'utf-8',
  });
  const results = JSON.parse(output);
  
  Object.entries(budgets).forEach(([metric, threshold]) => {
    const value = results.audits[metric].numericValue;
    if (value > threshold) {
      console.error(
        \`\${metric} exceeded budget: \${value} > \${threshold}\`
      );
      process.exit(1);
    }
  });
  
  console.log('All performance budgets met!');
} catch (error) {
  console.error('Performance check failed:', error);
  process.exit(1);
}

// CI/CD integration
// .github/workflows/performance.yml
name: Performance Check

on: [push, pull_request]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm start &
      - run: npm run check-performance`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a10/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A10.2 Deployment Platforms
          </Link>
          <Link
            href="/learn/pages-router/a10"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to A10 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
