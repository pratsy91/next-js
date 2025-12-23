import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A8.2: Internationalization (i18n) - Next.js Mastery",
  description: "Complete guide to i18n in Next.js Pages Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a8"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A8 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A8.2: Internationalization (i18n)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to implement internationalization with built-in i18n
          routing, locale detection, and locale-aware data fetching.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Built-in i18n Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Built-in i18n Routing
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure Next.js built-in i18n routing in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next.config.js
            </code>
            .
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de', 'es'],
    defaultLocale: 'en',
  },
};

// File structure with i18n:
// pages/
//   ├── index.js          → /en, /fr, /de, /es
//   ├── about.js          → /en/about, /fr/about, etc.
//   └── blog/
//       └── [slug].js     → /en/blog/slug, /fr/blog/slug, etc.

// Accessing locale in pages
// pages/index.js
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  
  return (
    <div>
      <p>Current locale: {locale}</p>
      <p>Available locales: {locales.join(', ')}</p>
      <p>Default locale: {defaultLocale}</p>
    </div>
  );
}

// Using locale in Link
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/about" locale="en">English</Link>
      <Link href="/about" locale="fr">Français</Link>
      <Link href="/about" locale="de">Deutsch</Link>
    </nav>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Locale Detection */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Locale Detection
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure how Next.js detects the user's preferred locale.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de', 'es'],
    defaultLocale: 'en',
    localeDetection: true, // Enable automatic detection
  },
};

// Locale detection sources (in order):
// 1. Locale in URL path (/fr/about)
// 2. Accept-Language header from browser
// 3. Default locale

// Disable automatic detection
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de', 'es'],
    defaultLocale: 'en',
    localeDetection: false, // Disable automatic detection
  },
};

// Custom locale detection
// pages/_app.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    // Custom detection logic
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale && router.locale !== storedLocale) {
      router.push(router.asPath, router.asPath, { locale: storedLocale });
    }
  }, []);
  
  return <Component {...pageProps} />;
}

// Reading Accept-Language header
// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.split('-')[0];
      const supportedLocales = ['en', 'fr', 'de', 'es'];
      
      if (supportedLocales.includes(browserLang)) {
        // Redirect to locale if not already set
      }
    }
  }, []);
  
  return <Component {...pageProps} />;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Subdomain Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Subdomain Routing
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure locale routing based on subdomains.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de', 'es'],
    defaultLocale: 'en',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en',
        locales: ['en'],
      },
      {
        domain: 'fr.example.com',
        defaultLocale: 'fr',
        locales: ['fr'],
      },
      {
        domain: 'de.example.com',
        defaultLocale: 'de',
        locales: ['de'],
      },
      {
        domain: 'es.example.com',
        defaultLocale: 'es',
        locales: ['es'],
      },
    ],
  },
};

// How it works:
// - example.com → English (en)
// - fr.example.com → French (fr)
// - de.example.com → German (de)
// - es.example.com → Spanish (es)

// DNS Configuration required:
// - A record for example.com
// - A record for fr.example.com
// - A record for de.example.com
// - A record for es.example.com

// Using with Vercel:
// - Configure domains in Vercel dashboard
// - Add custom domains for each subdomain
// - Next.js automatically routes based on domain

// Accessing domain in pages
// pages/index.js
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { locale, domain } = router;
  
  return (
    <div>
      <p>Current domain: {domain}</p>
      <p>Current locale: {locale}</p>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Domain Routing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Domain Routing
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure locale routing based on different domains.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de', 'es'],
    defaultLocale: 'en',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en',
        locales: ['en'],
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
        locales: ['fr'],
      },
      {
        domain: 'example.de',
        defaultLocale: 'de',
        locales: ['de'],
      },
      {
        domain: 'example.es',
        defaultLocale: 'es',
        locales: ['es'],
      },
    ],
  },
};

// How it works:
// - example.com → English (en)
// - example.fr → French (fr)
// - example.de → German (de)
// - example.es → Spanish (es)

// Multiple locales per domain
module.exports = {
  i18n: {
    locales: ['en', 'en-US', 'en-GB', 'fr', 'fr-CA'],
    defaultLocale: 'en',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en',
        locales: ['en', 'en-US', 'en-GB'],
      },
      {
        domain: 'example.ca',
        defaultLocale: 'fr-CA',
        locales: ['fr-CA', 'en'],
      },
    ],
  },
};

// Programmatic navigation with domain
import { useRouter } from 'next/router';

export default function LocaleSwitcher() {
  const router = useRouter();
  
  const switchLocale = (locale) => {
    router.push(router.asPath, router.asPath, { locale });
  };
  
  return (
    <div>
      <button onClick={() => switchLocale('en')}>English</button>
      <button onClick={() => switchLocale('fr')}>Français</button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Locale Switching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Locale Switching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement locale switching in your application.
          </p>

          <CodeBlock
            code={`// components/LocaleSwitcher.js
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locale, locales, asPath } = router;
  
  return (
    <div>
      {locales.map((loc) => (
        <Link
          key={loc}
          href={asPath}
          locale={loc}
          className={locale === loc ? 'active' : ''}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

// Programmatic locale switching
import { useRouter } from 'next/router';

export default function LocaleButton() {
  const router = useRouter();
  
  const changeLocale = (newLocale) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };
  
  return (
    <div>
      <button onClick={() => changeLocale('en')}>English</button>
      <button onClick={() => changeLocale('fr')}>Français</button>
      <button onClick={() => changeLocale('de')}>Deutsch</button>
    </div>
  );
}

// Preserve query parameters
export default function LocaleSwitcher() {
  const router = useRouter();
  const { locale, asPath } = router;
  
  const switchLocale = (newLocale) => {
    router.push(router.asPath, router.asPath, { locale: newLocale });
  };
  
  return (
    <select value={locale} onChange={(e) => switchLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
    </select>
  );
}

// Store locale preference
export default function LocaleSwitcher() {
  const router = useRouter();
  
  const switchLocale = (newLocale) => {
    localStorage.setItem('locale', newLocale);
    router.push(router.asPath, router.asPath, { locale: newLocale });
  };
  
  return (
    <div>
      {router.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={router.locale === loc ? 'active' : ''}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: getStaticProps with Locales */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. getStaticProps with Locales
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Fetch locale-specific data in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>
            .
          </p>

          <CodeBlock
            code={`// pages/blog/[slug].js
export async function getStaticPaths() {
  // Generate paths for all locales
  const locales = ['en', 'fr', 'de', 'es'];
  const posts = await getPosts();
  
  const paths = [];
  for (const locale of locales) {
    for (const post of posts) {
      paths.push({
        params: { slug: post.slug },
        locale,
      });
    }
  }
  
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, locale }) {
  // Fetch locale-specific content
  const post = await getPostBySlug(params.slug, locale);
  
  return {
    props: {
      post,
      locale,
    },
  };
}

export default function BlogPost({ post, locale }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Using locale in API calls
export async function getStaticProps({ locale }) {
  const res = await fetch(\`https://api.example.com/content?locale=\${locale}\`);
  const content = await res.json();
  
  return {
    props: {
      content,
      locale,
    },
  };
}

// Loading translations
// lib/translations.js
const translations = {
  en: {
    title: 'Welcome',
    description: 'This is a description',
  },
  fr: {
    title: 'Bienvenue',
    description: 'Ceci est une description',
  },
  de: {
    title: 'Willkommen',
    description: 'Dies ist eine Beschreibung',
  },
};

export function getTranslations(locale) {
  return translations[locale] || translations.en;
}

// pages/index.js
export async function getStaticProps({ locale }) {
  const t = getTranslations(locale);
  
  return {
    props: {
      translations: t,
      locale,
    },
  };
}

export default function Home({ translations, locale }) {
  return (
    <div>
      <h1>{translations.title}</h1>
      <p>{translations.description}</p>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 7: getServerSideProps with Locales */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. getServerSideProps with Locales
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Fetch locale-specific data in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>
            .
          </p>

          <CodeBlock
            code={`// pages/profile.js
export async function getServerSideProps({ locale, req }) {
  // Access locale in server-side function
  const user = await getUserFromRequest(req);
  const profile = await getProfile(user.id, locale);
  
  return {
    props: {
      profile,
      locale,
    },
  };
}

export default function Profile({ profile, locale }) {
  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
    </div>
  );
}

// Using locale with API routes
export async function getServerSideProps({ locale }) {
  const res = await fetch(\`\${process.env.API_URL}/content?locale=\${locale}\`, {
    headers: {
      'Authorization': \`Bearer \${process.env.API_TOKEN}\`,
    },
  });
  
  const data = await res.json();
  
  return {
    props: {
      data,
      locale,
    },
  };
}

// Locale-aware database queries
export async function getServerSideProps({ locale }) {
  const db = await getDatabase();
  const content = await db.query(
    'SELECT * FROM content WHERE locale = ?',
    [locale]
  );
  
  return {
    props: {
      content,
      locale,
    },
  };
}

// Accessing locale in context
export async function getServerSideProps(context) {
  const { locale, locales, defaultLocale } = context;
  
  // Determine if locale is default
  const isDefaultLocale = locale === defaultLocale;
  
  // Get all available locales for content
  const allContent = {};
  for (const loc of locales) {
    allContent[loc] = await getContent(loc);
  }
  
  return {
    props: {
      currentContent: allContent[locale],
      allContent,
      locale,
      isDefaultLocale,
    },
  };
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a8/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A8.1 Middleware
          </Link>
          <Link
            href="/learn/pages-router/a8/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A8.3 Preview Mode →
          </Link>
        </div>
      </div>
    </div>
  );
}
