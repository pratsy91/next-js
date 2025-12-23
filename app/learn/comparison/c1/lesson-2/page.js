import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C1.2: next/script - Next.js Mastery",
  description:
    "next/script component works the same in both App Router and Pages Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c1"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C1 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C1.2: next/script
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The{" "}
          <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
            next/script
          </code>{" "}
          component has the same API in both App Router and Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Same API in Both Routers
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/script
            </code>{" "}
            component works identically in both routing systems.
          </p>

          <CodeBlock
            code={`// App Router: app/components/Analytics.tsx
import Script from 'next/script';

export default function Analytics() {
  return (
    <Script
      src="https://example.com/analytics.js"
      strategy="afterInteractive"
    />
  );
}

// Pages Router: components/Analytics.js
import Script from 'next/script';

export default function Analytics() {
  return (
    <Script
      src="https://example.com/analytics.js"
      strategy="afterInteractive"
    />
  );
}

// ✅ Same import
import Script from 'next/script';

// ✅ Same props
<Script
  src="/script.js"
  strategy="afterInteractive"
/>

// ✅ Same loading strategies work in both:
// - beforeInteractive
// - afterInteractive
// - lazyOnload`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Loading Strategies (Same in Both)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            All loading strategies work the same way in both routers.
          </p>

          <CodeBlock
            code={`// beforeInteractive - Load before page becomes interactive
// Works the same in both routers
<Script
  src="/critical-script.js"
  strategy="beforeInteractive"
/>

// afterInteractive - Load after page becomes interactive (default)
// Works the same in both routers
<Script
  src="/analytics.js"
  strategy="afterInteractive"
/>

// lazyOnload - Load during idle time
// Works the same in both routers
<Script
  src="/non-critical.js"
  strategy="lazyOnload"
/>

// Inline scripts (both routers)
<Script id="inline-script" strategy="afterInteractive">
  {\`console.log('Hello from inline script');\`}
</Script>

// External scripts (both routers)
<Script
  src="https://cdn.example.com/library.js"
  strategy="afterInteractive"
/>

// With onLoad callback (both routers)
<Script
  src="/script.js"
  strategy="afterInteractive"
  onLoad={() => {
    console.log('Script loaded');
  }}
/>

// With onError callback (both routers)
<Script
  src="/script.js"
  strategy="afterInteractive"
  onError={(e) => {
    console.error('Script failed to load', e);
  }}
/>`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Common Use Cases
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Examples that work identically in both routers.
          </p>

          <CodeBlock
            code={`// Google Analytics (both routers)
import Script from 'next/script';

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {\`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        \`}
      </Script>
    </>
  );
}

// Third-party widgets (both routers)
<Script
  src="https://platform.example.com/widget.js"
  strategy="lazyOnload"
/>

// Critical scripts (both routers)
<Script
  src="/critical.js"
  strategy="beforeInteractive"
/>

// No differences between routers!
// The API is 100% compatible.`}
            language="javascript"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c1/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C1.1 next/image
          </Link>
          <Link
            href="/learn/comparison/c1/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C1.3 next/font →
          </Link>
        </div>
      </div>
    </div>
  );
}
