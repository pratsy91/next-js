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
