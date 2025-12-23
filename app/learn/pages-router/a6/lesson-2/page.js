import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A6.2: Custom _document.js - Next.js Mastery",
  description:
    "Complete guide to custom Document component in Next.js Pages Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a6"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A6 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A6.2: Custom _document.js
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to customize the Document component to modify the HTML
          structure and add custom elements.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Document Structure */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Document Structure
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _document.js
            </code>{" "}
            file customizes the HTML document structure.
          </p>

          <CodeBlock
            code={`// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Required structure:
// - Html component (wraps everything)
// - Head component (for document-level head elements)
// - body tag
//   - Main component (where pages render)
//   - NextScript component (Next.js scripts)

// Key points:
// - Only rendered on the server
// - Runs once per request
// - Cannot use client-side features (hooks, event handlers)
// - Must be a class component or default export function`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Class Component Version
          </h3>
          <CodeBlock
            code={`// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Html, Head, Main, NextScript Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Html, Head, Main, NextScript Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Understand each component's purpose and usage.
          </p>

          <CodeBlock
            code={`import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      {/* Html component - wraps entire document */}
      {/* Props: lang, dir, etc. */}
      
      <Head>
        {/* Head component - document-level head elements */}
        {/* Different from next/head - only for document-level tags */}
        {/* Meta tags, links, etc. that should be in document head */}
      </Head>
      
      <body>
        {/* body tag - standard HTML body */}
        
        <Main />
        {/* Main component - where page content renders */}
        {/* This is where your pages/components are rendered */}
        
        <NextScript />
        {/* NextScript component - Next.js JavaScript bundles */}
        {/* Includes React, Next.js runtime, and your app code */}
        {/* Must be included for app to work */}
      </body>
    </Html>
  );
}

// Component purposes:
// - Html: Document root, can set lang, dir attributes
// - Head: Document head, for meta tags, links, etc.
// - Main: Page content container
// - NextScript: JavaScript bundles (required)`}
            language="javascript"
          />
        </section>

        {/* Section 3: Custom HTML Attributes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Custom HTML Attributes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add custom attributes to the HTML and body tags.
          </p>

          <CodeBlock
            code={`import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      lang="en"
      dir="ltr"
      className="no-js"
      data-theme="light"
    >
      <Head />
      <body
        className="custom-body"
        data-scroll="enabled"
        suppressHydrationWarning
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Common attributes:
// Html:
// - lang: Language code (en, fr, etc.)
// - dir: Text direction (ltr, rtl)
// - className: CSS class
// - data-*: Custom data attributes

// body:
// - className: CSS class
// - id: Element ID
// - data-*: Custom data attributes
// - suppressHydrationWarning: Suppress hydration warnings

// Dynamic attributes
export default class Document extends Document {
  render() {
    const theme = this.props.__NEXT_DATA__.props.pageProps?.theme || 'light';
    
    return (
      <Html lang="en" data-theme={theme}>
        <Head />
        <body className={\`theme-\${theme}\`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Custom Meta Tags */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Custom Meta Tags
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add document-level meta tags that apply to all pages.
          </p>

          <CodeBlock
            code={`import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Character encoding */}
        <meta charSet="utf-8" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#000000" />
        
        {/* Description (default for all pages) */}
        <meta name="description" content="Default site description" />
        
        {/* Open Graph (default) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="My Site" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://api.example.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Note: Use next/head in pages for page-specific meta tags
// Use _document.js Head for document-level meta tags`}
            language="javascript"
          />
        </section>

        {/* Section 5: Script Injection */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Script Injection
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add scripts to the document head or body.
          </p>

          <CodeBlock
            code={`import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* External script in head */}
        <script
          src="https://example.com/script.js"
          async
        />
        
        {/* Inline script in head */}
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              window.__APP_CONFIG__ = {
                apiUrl: 'https://api.example.com',
                env: 'production'
              };
            \`,
          }}
        />
      </Head>
      <body>
        <Main />
        
        {/* Script before NextScript */}
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              // Initialize something before Next.js loads
              console.log('Before Next.js');
            \`,
          }}
        />
        
        <NextScript />
        
        {/* Script after NextScript */}
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              // Initialize after Next.js loads
              console.log('After Next.js');
            \`,
          }}
        />
      </body>
    </Html>
  );
}

// Note: For better performance, use next/script instead
// Script injection in _document.js is for critical scripts only`}
            language="javascript"
          />
        </section>

        {/* Section 6: Styled-components Setup */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Styled-components Setup
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure styled-components for server-side rendering.
          </p>

          <CodeBlock
            code={`// pages/_document.js
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      
      const initialProps = await Document.getInitialProps(ctx);
      
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  
  render() {
    return (
      <Html>
        <Head>
          {/* Styled-components styles are injected here */}
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Installation
// npm install styled-components
// npm install --save-dev @types/styled-components`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How It Works
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>ServerStyleSheet collects styles during SSR</li>
            <li>Styles are injected into the document head</li>
            <li>Prevents FOUC (Flash of Unstyled Content)</li>
            <li>Required for styled-components SSR support</li>
          </ul>
        </section>

        {/* Section 7: Emotion Setup */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Emotion Setup
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure Emotion for server-side rendering.
          </p>

          <CodeBlock
            code={`// pages/_document.js
import Document from 'next/document';
import { extractCritical } from '@emotion/server';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    
    const styles = extractCritical(page.html);
    
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }
  
  render() {
    return (
      <Html>
        <Head>
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Installation
// npm install @emotion/react @emotion/server

// With @emotion/cache (for custom cache)
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { extractCritical } from '@emotion/server';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const cache = createCache({ key: 'css' });
    const { extractCritical } = createEmotionServer(cache);
    
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage({
      enhanceApp: (App) => (props) =>
        (
          <CacheProvider value={cache}>
            <App {...props} />
          </CacheProvider>
        ),
    });
    
    const styles = extractCritical(page.html);
    
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 8: Language Attributes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Language Attributes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set language and text direction attributes for internationalization.
          </p>

          <CodeBlock
            code={`import { Html, Head, Main, NextScript } from 'next/document';

// Static language
export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Dynamic language based on locale
export default class Document extends Document {
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    
    return (
      <Html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// With i18n configuration
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'ar'],
    defaultLocale: 'en',
  },
};

// _document.js
export default class Document extends Document {
  render() {
    const { locale, defaultLocale } = this.props.__NEXT_DATA__;
    const lang = locale || defaultLocale;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    return (
      <Html lang={lang} dir={dir}>
        <Head>
          {/* Language-specific meta tags */}
          <meta httpEquiv="content-language" content={lang} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Common language codes:
// - en: English
// - fr: French
// - de: German
// - es: Spanish
// - ar: Arabic (RTL)
// - he: Hebrew (RTL)
// - ja: Japanese
// - zh: Chinese`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a6/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A6.1 Custom _app.js
          </Link>
          <Link
            href="/learn/pages-router/a6"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to A6 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
