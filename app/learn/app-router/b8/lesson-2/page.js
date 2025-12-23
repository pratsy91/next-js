import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B8.2: next/script - Next.js Mastery",
  description: "Complete guide to Script component in Next.js App Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b8"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B8 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B8.2: next/script
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use the Script component from next/script: loading
          strategies, inline scripts, external scripts, and optimization.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Script Component Basics */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Script Component Basics
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              Script
            </code>{" "}
            component optimizes script loading for better performance. It
            supports different loading strategies and automatic optimization.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Script Usage
          </h3>
          <CodeBlock
            code={`// app/layout.js or app/page.js
import Script from 'next/script';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        
        {/* External script */}
        <Script
          src="https://example.com/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

// Inline script
<Script id="inline-script" strategy="afterInteractive">
  {\`console.log('Hello from inline script');\`}
</Script>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Why Use Script Component
          </h3>
          <CodeBlock
            code={`// Benefits of using Script component:
// 1. Optimized loading order
// 2. Prevents blocking page rendering
// 3. Deduplicates scripts
// 4. Provides loading callbacks
// 5. Better performance metrics

// ❌ Don't use regular <script> tags
<script src="https://example.com/script.js"></script>

// ✅ Use Script component
import Script from 'next/script';

<Script src="https://example.com/script.js" strategy="afterInteractive" />`}
            language="javascript"
          />
        </section>

        {/* Section 2: Loading Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Loading Strategies
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control when scripts are loaded with different strategies to
            optimize performance.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            beforeInteractive Strategy
          </h3>
          <CodeBlock
            code={`// Load before page becomes interactive
// Only works in _document (Pages Router) or root layout (App Router)
// Use for critical scripts like polyfills

// app/layout.js (App Router)
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Critical polyfill - loads before interactive */}
        <Script
          src="https://polyfill.io/v3/polyfill.min.js"
          strategy="beforeInteractive"
        />
        
        {children}
      </body>
    </html>
  );
}

// Use cases:
// - Polyfills
// - Critical security scripts
// - Scripts that must run before React hydration`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            afterInteractive Strategy (Default)
          </h3>
          <CodeBlock
            code={`// Load after page becomes interactive
// Default strategy, works anywhere in the component tree
// Best for analytics, chat widgets, etc.

import Script from 'next/script';

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      
      {/* Analytics - loads after page interactive */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
        strategy="afterInteractive"
      />
      
      <Script id="google-analytics" strategy="afterInteractive">
        {\`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_ID');
        \`}
      </Script>
    </div>
  );
}

// Use cases:
// - Analytics
// - Chat widgets
// - Tag managers
// - Third-party widgets`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            lazyOnload Strategy
          </h3>
          <CodeBlock
            code={`// Load during idle time after page load
// Best for non-critical scripts

import Script from 'next/script';

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      
      {/* Non-critical script - loads during idle time */}
      <Script
        src="https://example.com/non-critical.js"
        strategy="lazyOnload"
      />
      
      {/* Social media widget */}
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
    </div>
  );
}

// Use cases:
// - Social media widgets
// - Non-critical analytics
// - Advertisement scripts
// - Optional features`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            worker Strategy
          </h3>
          <CodeBlock
            code={`// Load script in a web worker
// For offloading heavy computations

import Script from 'next/script';

export default function Page() {
  return (
    <div>
      {/* Worker script */}
      <Script
        src="/worker.js"
        strategy="worker"
      />
    </div>
  );
}

// Use cases:
// - Heavy computations
// - Background processing
// - Offloading main thread work`}
            language="javascript"
          />
        </section>

        {/* Section 3: Inline Scripts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Inline Scripts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use inline scripts for small code snippets that don't need external
            files.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Inline Script
          </h3>
          <CodeBlock
            code={`// Inline script with id (required for inline)
import Script from 'next/script';

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      
      <Script id="my-inline-script" strategy="afterInteractive">
        {\`console.log('This is an inline script');\`}
      </Script>
    </div>
  );
}

// Inline script with template literals
<Script id="config-script" strategy="afterInteractive">
  {\`
    window.appConfig = {
      apiUrl: 'https://api.example.com',
      env: 'production'
    };
  \`}
</Script>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Inline Script Best Practices
          </h3>
          <CodeBlock
            code={`// ✅ Good: Small, critical inline scripts
import Script from 'next/script';

export default function Page() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  
  return (
    <>
      {/* Small analytics init */}
      <Script id="analytics-init" strategy="afterInteractive">
        {\`
          window.analytics = {
            track: function(event) {
              console.log('Track:', event);
            }
          };
        \`}
      </Script>
    </>
  );
}

// ❌ Bad: Large inline scripts (use external file instead)
<Script id="large-script" strategy="afterInteractive">
  {/* 1000+ lines of code */}
</Script>

// ✅ Better: Move to external file
<Script src="/large-script.js" strategy="afterInteractive" />`}
            language="javascript"
          />
        </section>

        {/* Section 4: External Scripts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. External Scripts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Load external scripts from CDNs or your own domain.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Loading External Scripts
          </h3>
          <CodeBlock
            code={`// External script from CDN
import Script from 'next/script';

export default function Page() {
  return (
    <div>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
        strategy="afterInteractive"
      />
      
      {/* External library */}
      <Script
        src="https://cdn.example.com/library.js"
        strategy="lazyOnload"
      />
      
      {/* Same domain script */}
      <Script
        src="/scripts/custom.js"
        strategy="afterInteractive"
      />
    </div>
  );
}

// With additional attributes
<Script
  src="https://example.com/script.js"
  strategy="afterInteractive"
  integrity="sha384-..."
  crossOrigin="anonymous"
/>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Third-Party Scripts
          </h3>
          <CodeBlock
            code={`// Common third-party scripts
import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {\`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        \`}
      </Script>
      
      {/* Facebook Pixel */}
      <Script id="fb-pixel" strategy="afterInteractive">
        {\`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID');
          fbq('track', 'PageView');
        \`}
      </Script>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Script Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Script Optimization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Optimize script loading with callbacks, deduplication, and proper
            strategy selection.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Loading Callbacks
          </h3>
          <CodeBlock
            code={`// Execute code when script loads
import Script from 'next/script';
import { useState } from 'react';

export default function Page() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
  return (
    <div>
      <Script
        src="https://example.com/script.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Script loaded!');
          setScriptLoaded(true);
          // Initialize third-party library
          window.MyLibrary.init();
        }}
        onReady={() => {
          console.log('Script ready!');
          // Script is ready to use
        }}
        onError={(e) => {
          console.error('Script failed to load:', e);
        }}
      />
      
      {scriptLoaded && <div>Script is ready!</div>}
    </div>
  );
}

// Using onLoad for initialization
<Script
  src="https://cdn.example.com/library.js"
  strategy="afterInteractive"
  onLoad={() => {
    // Library is loaded, initialize it
    window.MyLibrary.config({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    });
  }}
/>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Script Deduplication
          </h3>
          <CodeBlock
            code={`// Next.js automatically deduplicates scripts
// Multiple instances of same script = single load

import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* Same script loaded multiple times */}
      <Script src="https://example.com/script.js" strategy="afterInteractive" />
      <Script src="https://example.com/script.js" strategy="afterInteractive" />
      <Script src="https://example.com/script.js" strategy="afterInteractive" />
      
      {/* Only loads once, even with different strategies */}
      {/* Last strategy wins if strategies differ */}
    </>
  );
}

// Deduplication works by:
// - Same src URL
// - Same id (for inline scripts)
// - Same integrity hash (if provided)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Conditional Script Loading
          </h3>
          <CodeBlock
            code={`// Load scripts conditionally
'use client'

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function ConditionalScript() {
  const [shouldLoad, setShouldLoad] = useState(false);
  
  useEffect(() => {
    // Condition: user accepted cookies
    const accepted = localStorage.getItem('cookies-accepted');
    setShouldLoad(accepted === 'true');
  }, []);
  
  return (
    <>
      {shouldLoad && (
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

// Conditional based on environment
export default function EnvScript() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return (
    <>
      {isProduction && (
        <Script
          src="https://analytics.example.com/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Script Loading Best Practices
          </h3>
          <CodeBlock
            code={`// ✅ Best practices:

// 1. Use appropriate strategy
<Script
  src="/critical.js"
  strategy="beforeInteractive"  // Critical
/>

<Script
  src="/analytics.js"
  strategy="afterInteractive"  // Standard
/>

<Script
  src="/optional.js"
  strategy="lazyOnload"  // Non-critical
/>

// 2. Use onLoad for initialization
<Script
  src="https://cdn.example.com/lib.js"
  strategy="afterInteractive"
  onLoad={() => {
    window.MyLib.init();
  }}
/>

// 3. Provide id for inline scripts
<Script id="inline-config" strategy="afterInteractive">
  {\`window.config = {...};\`}
</Script>

// 4. Use integrity for security
<Script
  src="https://cdn.example.com/script.js"
  strategy="afterInteractive"
  integrity="sha384-..."
  crossOrigin="anonymous"
/>

// 5. Avoid blocking critical rendering
// Use afterInteractive or lazyOnload for non-critical scripts`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b8/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B8.1 next/image
          </Link>
          <Link
            href="/learn/app-router/b8/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B8.3 next/font →
          </Link>
        </div>
      </div>
    </div>
  );
}
