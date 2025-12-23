import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A11.10: Advanced Patterns & Real-World Scenarios - Next.js Mastery",
  description:
    "Advanced patterns and real-world scenarios for Next.js Pages Router",
};

export default function Lesson10Page() {
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
          A11.10: Advanced Patterns & Real-World Scenarios
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Advanced use cases, edge cases, and solutions for complex scenarios.
        </p>
      </div>

      <div className="space-y-8">
        {/* Authentication */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Authentication & Session Management
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Authentication in Pages Router is typically handled through{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>
            , where you check authentication status on each request. Sessions
            can be managed using JWTs in cookies, server-side sessions, or
            external authentication providers.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Implementation Approaches:</strong> JWT-based authentication
            stores tokens in httpOnly cookies for security. Session-based
            authentication uses server-side sessions stored in databases or
            Redis.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>{" "}
            runs on every request, making it perfect for authentication checks
            and redirects. Always validate tokens server-side, use secure cookie
            settings (httpOnly, secure, sameSite), implement token expiration
            and refresh mechanisms, and handle both authenticated and
            unauthenticated states gracefully. Consider using libraries like
            NextAuth.js for production applications as they handle many security
            concerns and edge cases.
          </p>
          <CodeBlock
            code={`// Session management with JWT
// lib/auth.js
import jwt from 'jsonwebtoken';

export function createSession(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

export function verifySession(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// pages/api/login.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = createSession(user.id);
  
  res.setHeader('Set-Cookie', \`token=\${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800\`);
  res.status(200).json({ success: true });
}

// Protected page
export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  const session = verifySession(token);
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  const user = await getUser(session.userId);
  
  return {
    props: { user },
  };
}`}
            language="javascript"
          />
        </section>

        {/* Internationalization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Internationalization (i18n)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implementing i18n in Pages Router involves detecting user locale,
            managing translations, and rendering content in the appropriate
            language. Libraries like next-i18next provide utilities for
            translation management, locale detection, and route localization.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Implementation Strategy:</strong> Use locale-based routing
            where the locale is part of the URL (e.g., /en/page, /fr/page) for
            better SEO and explicit language selection. Libraries handle
            translation loading, date/number formatting, and locale-specific
            content.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticPaths
            </code>{" "}
            can generate pages for each locale, and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            loads the appropriate translations. Middleware can detect locale
            from headers and redirect to the appropriate version. Consider
            performance - generating static pages for multiple locales
            multiplies build time. Always provide a language switcher and ensure
            proper fallback handling for missing translations.
          </p>
          <CodeBlock
            code={`// Using next-i18next
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'],
  },
};

// pages/_app.js
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);

// pages/index.js
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

// Using translations
import { useTranslation } from 'next-i18next';

export default function Page() {
  const { t } = useTranslation('common');
  return <h1>{t('welcome')}</h1>;
}

// Manual i18n
// pages/[locale]/index.js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { locale: 'en' } },
      { params: { locale: 'fr' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const translations = await getTranslations(params.locale);
  return {
    props: { translations, locale: params.locale },
  };
}`}
            language="javascript"
          />
        </section>

        {/* Preview Mode */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Preview Mode
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Preview Mode allows content editors to preview draft or unpublished
            content without affecting the production site. It's particularly
            useful for headless CMS integrations where editors need to see how
            content will look before publishing.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it Works:</strong> Preview Mode sets a cookie that
            enables preview mode for the current user. When enabled,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            receives{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              preview: true
            </code>{" "}
            in the context, allowing you to fetch draft content instead of
            published content. The preview data is stored in the cookie,
            allowing you to pass additional context like which draft to preview.
            Always protect preview endpoints with authentication - you don't
            want unauthorized users accessing draft content. Provide clear
            visual indicators when preview mode is active, and make it easy to
            exit preview mode.
          </p>
          <CodeBlock
            code={`// pages/api/preview.js
export default async function handler(req, res) {
  const { secret, slug } = req.query;
  
  if (secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  res.setPreviewData({ slug });
  res.redirect(\`/\${slug}\`);
}

// pages/api/exit-preview.js
export default function handler(req, res) {
  res.clearPreviewData();
  res.redirect('/');
}

// Using preview mode
export async function getStaticProps(context) {
  const { preview, previewData } = context;
  
  const data = preview
    ? await fetchDraftPost(previewData.slug)
    : await fetchPublishedPost(previewData?.slug);
  
  return {
    props: { data },
  };
}

// Access preview in component
export default function Page({ data }) {
  return (
    <>
      {context.preview && (
        <div>Preview Mode Active</div>
      )}
      <div>{data.content}</div>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Redirects & Rewrites */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Redirects & Rewrites
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Redirects send users to a different URL (useful for moved pages or
            URL changes), while rewrites internally forward requests to
            different paths without changing the URL (useful for proxying or URL
            masking). Both are configured in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next.config.js
            </code>
            .
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>When to Use Each:</strong> Use redirects when you've moved
            content permanently (301/308) or temporarily (307) and want search
            engines to update their indexes. Use rewrites when you want to mask
            URLs, proxy to external APIs, or serve content from different paths
            without exposing the internal structure. Redirects are visible to
            users (URL changes), while rewrites are invisible (URL stays the
            same). Be careful with redirect chains - they hurt SEO and
            performance. Always use permanent redirects (301/308) for permanent
            moves and temporary (307) for temporary redirects. Rewrites can be
            used to proxy API requests, hide internal routing structure, or
            serve content from different sources.
          </p>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 308
      },
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: false, // 307
      },
    ];
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
      {
        source: '/dashboard',
        destination: '/dashboard/index',
      },
    ];
  },
};

// Programmatic redirects
// In getServerSideProps
export async function getServerSideProps(context) {
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
}`}
            language="javascript"
          />
        </section>

        {/* Middleware & Edge Functions */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Middleware & Edge Functions
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Middleware runs before requests reach your pages or API routes,
            making it perfect for authentication, A/B testing, logging, or
            request modification. Edge Functions run on Vercel's Edge Network,
            providing ultra-low latency but with limitations (Web APIs only, no
            Node.js APIs, smaller bundle size).
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Use Cases:</strong> Middleware is ideal for authentication
            checks, redirects based on conditions, setting headers, bot
            detection, geolocation-based routing, or A/B testing. Edge Runtime
            provides faster response times (closer to users) but has
            limitations: no Node.js APIs, smaller bundle size limits (~1MB), and
            Web Standard APIs only. Use Edge Runtime for simple operations that
            benefit from low latency. Use Node.js runtime for complex operations
            requiring full Node.js capabilities. Middleware can modify
            requests/responses, redirect, rewrite, or set headers before the
            request reaches your route handlers.
          </p>
          <CodeBlock
            code={`// middleware.js (or proxy.ts in Next.js 16)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  // Redirect if not authenticated
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Add headers
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

export const config = {
  matcher: '/dashboard/:path*',
};

// Edge Runtime
export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  return new Response('Hello from Edge!');
}`}
            language="javascript"
          />
        </section>

        {/* Multi-zone */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Multi-zone Deployments
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Multi-zone deployments allow you to split your application into
            multiple Next.js applications that are deployed independently but
            appear as a single application to users. Each zone can have its own
            deployment pipeline, version, and domain while sharing the same
            domain through rewrites or proxies.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>When to Use:</strong> Multi-zone is useful when you have a
            large application where different teams own different sections
            (e.g., marketing site and application), when you want independent
            deployments for different parts, or when you need different scaling
            strategies for different zones. Each zone is a separate Next.js app
            with its own{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              basePath
            </code>{" "}
            configuration. They can be deployed separately, allowing independent
            versioning and deployment cycles. Cross-zone navigation requires
            full URLs or careful Link configuration. Consider SEO implications -
            each zone should have proper canonical URLs and sitemaps.
          </p>
          <CodeBlock
            code={`// Multi-zone setup
// next.config.js (main app)
module.exports = {
  basePath: '',
};

// next.config.js (blog sub-app)
module.exports = {
  basePath: '/blog',
};

// Cross-zone linking
import Link from 'next/link';

// Link to different zone
<Link href="https://blog.example.com/post-1">
  Blog Post
</Link>

// Or use rewrite to same domain
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:path*',
        destination: 'https://blog.example.com/:path*',
      },
    ];
  },
};`}
            language="javascript"
          />
        </section>

        {/* Analytics */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Analytics & Monitoring
          </h2>
          <CodeBlock
            code={`// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: url,
        });
      }
      
      // Custom analytics
      fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify({ url, timestamp: Date.now() }),
      });
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  return <Component {...pageProps} />;
}

// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);`}
            language="javascript"
          />
        </section>

        {/* Testing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Testing Strategies
          </h2>
          <CodeBlock
            code={`// Unit tests
// __tests__/components/Button.test.js
import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});

// Integration tests
// __tests__/pages/index.test.js
import { render, screen } from '@testing-library/react';
import HomePage, { getStaticProps } from '@/pages/index';

describe('HomePage', () => {
  it('renders with static props', async () => {
    const { props } = await getStaticProps();
    render(<HomePage {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });
});

// E2E tests with Playwright
// e2e/app.spec.js
import { test, expect } from '@playwright/test';

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page).toHaveURL('/about');
});

// API route tests
// __tests__/api/users.test.js
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/users';

describe('/api/users', () => {
  it('returns users', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });
    
    await handler(req, res);
    
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty('users');
  });
});`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a11/lesson-9"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Best Practices
          </Link>
          <Link
            href="/learn/pages-router/a11"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Back to A11 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
