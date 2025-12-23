import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A5.3: next/script - Next.js Mastery",
  description: "Complete guide to Script component in Next.js Pages Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a5"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A5 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A5.3: next/script
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to optimize script loading with the Script component for
          better performance.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Script Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Script Component
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Script
            </code>{" "}
            component optimizes third-party script loading for better
            performance.
          </p>

          <CodeBlock
            code={`import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script src="https://example.com/script.js" />
      <main>
        <h1>Welcome</h1>
      </main>
    </>
  );
}

// All available props
<Script
  src="/script.js"                    // Script source URL
  strategy="afterInteractive"         // Loading strategy
  onLoad={() => {}}                   // Callback when loaded
  onReady={() => {}}                  // Callback when ready
  onError={(e) => {}}                 // Error handler
  id="my-script"                      // Unique ID
  dangerouslySetInnerHTML={{}}       // Inline script content
/>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Benefits
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Optimized loading strategies</li>
            <li>Prevents blocking page rendering</li>
            <li>Automatic deduplication</li>
            <li>Better performance than regular script tags</li>
          </ul>
        </section>

        {/* Section 2: Loading Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Loading Strategies (beforeInteractive, afterInteractive,
            lazyOnload)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control when scripts are loaded using different strategies.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            beforeInteractive
          </h3>
          <CodeBlock
            code={`import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* Loads before page becomes interactive */}
      {/* Injected into initial HTML, blocks page load */}
      <Script
        src="https://polyfill.io/v3/polyfill.min.js"
        strategy="beforeInteractive"
      />
      <main>Content</main>
    </>
  );
}

// Use for:
// - Polyfills needed before React hydrates
// - Critical scripts that must run early
// - Scripts that modify the DOM before hydration`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            afterInteractive (Default)
          </h3>
          <CodeBlock
            code={`import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* Loads after page becomes interactive */}
      {/* Non-blocking, loads in parallel */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
        strategy="afterInteractive"
      />
      <main>Content</main>
    </>
  );
}

// Use for:
// - Analytics scripts
// - Chat widgets
// - Third-party embeds
// - Most common use case`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            lazyOnload
          </h3>
          <CodeBlock
            code={`import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* Loads after all resources are loaded */}
      {/* Lowest priority, doesn't affect page load */}
      <Script
        src="https://example.com/non-critical.js"
        strategy="lazyOnload"
      />
      <main>Content</main>
    </>
  );
}

// Use for:
// - Non-critical scripts
// - Social media widgets
// - Delayed analytics
// - Scripts that can wait`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Strategy Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Strategy
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    When Loaded
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Blocks Render
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Use Case
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      beforeInteractive
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Before page interactive
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Yes
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Critical polyfills
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      afterInteractive
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    After page interactive
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ No
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Analytics, widgets
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      lazyOnload
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    After all resources loaded
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ No
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Non-critical scripts
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Inline Scripts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Inline Scripts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add inline scripts using dangerouslySetInnerHTML.
          </p>

          <CodeBlock
            code={`import Script from 'next/script';

export default function InlineScript() {
  return (
    <>
      <Script id="inline-script" strategy="afterInteractive">
        {\`console.log('Inline script executed');\`}
      </Script>
      
      {/* Or using dangerouslySetInnerHTML */}
      <Script
        id="analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: \`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          \`,
        }}
      />
      
      <main>Content</main>
    </>
  );
}

// Important: Always provide an id for inline scripts
// This prevents duplicate execution`}
            language="javascript"
          />
        </section>

        {/* Section 4: External Scripts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. External Scripts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Load external scripts from CDNs or other domains.
          </p>

          <CodeBlock
            code={`import Script from 'next/script';

export default function ExternalScripts() {
  return (
    <>
      {/* Google Analytics */}
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
      
      {/* Facebook Pixel */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: \`
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
          \`,
        }}
      />
      
      {/* Chat widget */}
      <Script
        src="https://widget.example.com/chat.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log('Chat widget loaded');
        }}
      />
      
      <main>Content</main>
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
            Best practices for optimizing script loading and execution.
          </p>

          <CodeBlock
            code={`import Script from 'next/script';
import { useState } from 'react';

export default function OptimizedScripts() {
  const [loadAnalytics, setLoadAnalytics] = useState(false);
  
  return (
    <>
      {/* Conditional loading */}
      {loadAnalytics && (
        <Script
          src="https://analytics.example.com/script.js"
          strategy="afterInteractive"
        />
      )}
      
      {/* Script with callbacks */}
      <Script
        src="https://example.com/script.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Script loaded successfully');
          // Initialize script functionality
        }}
        onReady={() => {
          console.log('Script ready to use');
        }}
        onError={(e) => {
          console.error('Script failed to load', e);
          // Handle error gracefully
        }}
      />
      
      {/* Multiple scripts with proper ordering */}
      <Script
        src="https://example.com/library.js"
        strategy="afterInteractive"
        id="library"
      />
      <Script
        src="https://example.com/app.js"
        strategy="afterInteractive"
        id="app"
        // This will wait for library.js if needed
      />
      
      <main>Content</main>
    </>
  );
}

// Best practices:
// 1. Use appropriate strategy for each script
// 2. Provide unique IDs for inline scripts
// 3. Handle errors gracefully
// 4. Load scripts conditionally when possible
// 5. Use onLoad/onReady for initialization
// 6. Avoid blocking scripts in beforeInteractive unless necessary`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Script Deduplication
          </h3>
          <CodeBlock
            code={`import Script from 'next/script';

export default function Deduplication() {
  return (
    <>
      {/* Same script loaded multiple times - only loads once */}
      <Script src="https://example.com/script.js" />
      <Script src="https://example.com/script.js" />
      <Script src="https://example.com/script.js" />
      
      {/* Next.js automatically deduplicates based on src */}
      {/* Result: Script loads only once */}
    </>
  );
}

// Deduplication also works with inline scripts if they have the same id
<Script id="analytics">
  {\`console.log('Script 1');\`}
</Script>
<Script id="analytics">
  {\`console.log('Script 2');\`}
</Script>
// Only the last one executes`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a5/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A5.2 next/image
          </Link>
          <Link
            href="/learn/pages-router/a5/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A5.4 next/font →
          </Link>
        </div>
      </div>
    </div>
  );
}
