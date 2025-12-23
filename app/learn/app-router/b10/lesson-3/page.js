import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B10.3: Internationalization - Next.js Mastery",
  description: "Complete guide to internationalization in Next.js App Router",
};

export default function Lesson3Page() {
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
          B10.3: Internationalization
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to implement internationalization (i18n) in Next.js App
          Router: manual implementation, locale routing, locale switching,
          next-intl, and next-i18next libraries.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Manual i18n Implementation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Manual i18n Implementation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement internationalization manually without external libraries.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Manual i18n Setup
          </h3>
          <CodeBlock
            code={`// lib/i18n.js
const translations = {
  en: {
    welcome: 'Welcome',
    hello: 'Hello',
    goodbye: 'Goodbye',
  },
  es: {
    welcome: 'Bienvenido',
    hello: 'Hola',
    goodbye: 'Adiós',
  },
  fr: {
    welcome: 'Bienvenue',
    hello: 'Bonjour',
    goodbye: 'Au revoir',
  },
};

export function getTranslations(locale = 'en') {
  return translations[locale] || translations.en;
}

export function t(locale, key) {
  const translations = getTranslations(locale);
  return translations[key] || key;
}

// app/page.js
import { getTranslations } from '@/lib/i18n';

export default function Page({ searchParams }) {
  const locale = searchParams.locale || 'en';
  const t = getTranslations(locale);
  
  return (
    <div>
      <h1>{t.welcome}</h1>
      <p>{t.hello}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Manual i18n
          </h3>
          <CodeBlock
            code={`// lib/i18n.js
const translations = {
  en: {
    common: {
      welcome: 'Welcome',
      hello: 'Hello',
    },
    pages: {
      home: {
        title: 'Home',
        description: 'Welcome to our website',
      },
    },
  },
  es: {
    common: {
      welcome: 'Bienvenido',
      hello: 'Hola',
    },
    pages: {
      home: {
        title: 'Inicio',
        description: 'Bienvenido a nuestro sitio web',
      },
    },
  },
};

export function getTranslations(locale = 'en') {
  return translations[locale] || translations.en;
}

export function t(locale, path) {
  const translations = getTranslations(locale);
  const keys = path.split('.');
  let value = translations;
  
  for (const key of keys) {
    value = value?.[key];
    if (!value) return path;
  }
  
  return value || path;
}

// app/page.js
import { t } from '@/lib/i18n';

export default function Page({ searchParams }) {
  const locale = searchParams.locale || 'en';
  
  return (
    <div>
      <h1>{t(locale, 'pages.home.title')}</h1>
      <p>{t(locale, 'pages.home.description')}</p>
      <p>{t(locale, 'common.welcome')}</p>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Locale Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Locale Routing
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement locale-based routing with dynamic segments.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Locale-Based Routing Structure
          </h3>
          <CodeBlock
            code={`// File structure:
// app/
//   [locale]/
//     page.js
//     about/
//       page.js
//     layout.js

// app/[locale]/layout.js
export default function LocaleLayout({ children, params }) {
  const { locale } = params;
  
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}

// app/[locale]/page.js
import { getTranslations } from '@/lib/i18n';

export default function HomePage({ params }) {
  const { locale } = params;
  const t = getTranslations(locale);
  
  return (
    <div>
      <h1>{t.welcome}</h1>
    </div>
  );
}

// app/[locale]/about/page.js
import { getTranslations } from '@/lib/i18n';

export default function AboutPage({ params }) {
  const { locale } = params;
  const t = getTranslations(locale);
  
  return (
    <div>
      <h1>{t.about}</h1>
    </div>
  );
}

// URLs:
// /en - English home
// /es - Spanish home
// /en/about - English about
// /es/about - Spanish about`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Locale Detection and Redirect
          </h3>
          <CodeBlock
            code={`// middleware.js
import { NextResponse } from 'next/server';

const locales = ['en', 'es', 'fr'];
const defaultLocale = 'en';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(\`/\${locale}/\`) || pathname === \`/\${locale}\`
  );
  
  // Redirect to default locale if no locale in path
  if (!pathnameHasLocale) {
    const locale = getLocale(request) || defaultLocale;
    request.nextUrl.pathname = \`/\${locale}\${pathname}\`;
    return NextResponse.redirect(request.nextUrl);
  }
  
  return NextResponse.next();
}

function getLocale(request) {
  // Get locale from cookie
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }
  
  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    for (const locale of locales) {
      if (acceptLanguage.includes(locale)) {
        return locale;
      }
    }
  }
  
  return defaultLocale;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};`}
            language="javascript"
          />
        </section>

        {/* Section 3: Locale Switching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Locale Switching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement locale switching functionality.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Locale Switcher Component
          </h3>
          <CodeBlock
            code={`// app/components/LocaleSwitcher.js
'use client'

import { useRouter, usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';

const locales = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
];

export default function LocaleSwitcher({ currentLocale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [cookies, setCookie] = useCookies(['locale']);
  
  const switchLocale = (newLocale) => {
    // Update cookie
    setCookie('locale', newLocale, { path: '/' });
    
    // Update URL
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace locale segment
    const newPath = segments.join('/');
    
    router.push(newPath);
    router.refresh();
  };
  
  return (
    <select
      value={currentLocale}
      onChange={(e) => switchLocale(e.target.value)}
    >
      {locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.name}
        </option>
      ))}
    </select>
  );
}

// app/[locale]/layout.js
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function LocaleLayout({ children, params }) {
  const { locale } = params;
  
  return (
    <html lang={locale}>
      <body>
        <LocaleSwitcher currentLocale={locale} />
        {children}
      </body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server-Side Locale Switching
          </h3>
          <CodeBlock
            code={`// app/components/LocaleSwitcher.js
'use client'

import { useRouter, usePathname } from 'next/navigation';

const locales = ['en', 'es', 'fr'];

export default function LocaleSwitcher({ currentLocale }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const switchLocale = (newLocale) => {
    // Extract path without locale
    const pathWithoutLocale = pathname.replace(\`/\${currentLocale}\`, '') || '/';
    
    // Navigate to new locale
    router.push(\`/\${newLocale}\${pathWithoutLocale}\`);
  };
  
  return (
    <div>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={locale === currentLocale ? 'active' : ''}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// Or using Link component
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LocaleSwitcher({ currentLocale }) {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(\`/\${currentLocale}\`, '') || '/';
  
  return (
    <div>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={\`/\${locale}\${pathWithoutLocale}\`}
          className={locale === currentLocale ? 'active' : ''}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: next-intl library */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. next-intl Library
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              next-intl
            </code>{" "}
            for comprehensive i18n support in Next.js App Router.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            next-intl Setup
          </h3>
          <CodeBlock
            code={`// Install: npm install next-intl

// i18n.js (or i18n.ts)
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(\`./messages/\${locale}.json\`)).default
}));

// next.config.js
const withNextIntl = require('next-intl/plugin')(
  './i18n.js'
);

module.exports = withNextIntl({
  // Your Next.js config
});

// messages/en.json
{
  "common": {
    "welcome": "Welcome",
    "hello": "Hello"
  },
  "pages": {
    "home": {
      "title": "Home"
    }
  }
}

// messages/es.json
{
  "common": {
    "welcome": "Bienvenido",
    "hello": "Hola"
  },
  "pages": {
    "home": {
      "title": "Inicio"
    }
  }
}

// middleware.js
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using next-intl
          </h3>
          <CodeBlock
            code={`// app/[locale]/layout.js
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// app/[locale]/page.js
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('hello')}</p>
    </div>
  );
}

// Server Component usage
import { useTranslations } from 'next-intl';

export default async function ServerPage({ params }) {
  const { locale } = params;
  const t = await getTranslations('pages.home');
  
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}

// Client Component usage
'use client'

import { useTranslations } from 'next-intl';

export default function ClientPage() {
  const t = useTranslations('common');
  
  return <div>{t('welcome')}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: next-i18next library */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. next-i18next Library
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Note:{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              next-i18next
            </code>{" "}
            is primarily designed for Pages Router. For App Router, prefer
            next-intl or manual implementation.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            next-i18next with App Router (Limited Support)
          </h3>
          <CodeBlock
            code={`// Install: npm install next-i18next react-i18next i18next

// Note: next-i18next is designed for Pages Router
// For App Router, consider using next-intl instead

// If you must use next-i18next with App Router:

// public/locales/en/common.json
{
  "welcome": "Welcome",
  "hello": "Hello"
}

// public/locales/es/common.json
{
  "welcome": "Bienvenido",
  "hello": "Hola"
}

// lib/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en/common.json';
import es from '../public/locales/es/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      es: { common: es },
    },
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

// app/providers.js
'use client'

import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export function I18nProvider({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}

// app/[locale]/page.js
'use client'

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function Page({ params }) {
  const { locale } = params;
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
  
  return (
    <div>
      <h1>{t('common:welcome')}</h1>
    </div>
  );
}

// Recommendation: Use next-intl for App Router instead`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b10/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B10.2 Route Segment Config
          </Link>
          <Link
            href="/learn/app-router/b10/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B10.4 Redirects & Rewrites →
          </Link>
        </div>
      </div>
    </div>
  );
}
