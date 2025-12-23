import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A5.4: next/font - Next.js Mastery",
  description: "Complete guide to font optimization in Next.js Pages Router",
};

export default function Lesson4Page() {
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
          A5.4: next/font
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to optimize fonts with next/font for better performance and
          user experience.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Font Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Font Optimization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/font
            </code>{" "}
            automatically optimizes fonts by self-hosting them and removing
            external network requests.
          </p>

          <CodeBlock
            code={`// pages/_app.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}

// Benefits:
// - Fonts are self-hosted (no external requests)
// - Automatic font-display: swap
// - Zero layout shift
// - Better performance
// - Privacy-friendly (no Google Fonts tracking)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How It Works
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Fonts are downloaded at build time</li>
            <li>Fonts are self-hosted in your application</li>
            <li>CSS is automatically generated</li>
            <li>Font-display: swap is applied automatically</li>
            <li>No external network requests at runtime</li>
          </ul>
        </section>

        {/* Section 2: next/font/google */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. next/font/google
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use Google Fonts with automatic optimization.
          </p>

          <CodeBlock
            code={`import { Inter, Roboto, Open_Sans } from 'next/font/google';

// Single font
const inter = Inter({ subsets: ['latin'] });

// Multiple weights
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

// Multiple styles
const openSans = Open_Sans({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

// Using in component
export default function Home() {
  return (
    <div className={inter.className}>
      <h1 className={roboto.className}>Roboto Heading</h1>
      <p className={openSans.className}>Open Sans paragraph</p>
    </div>
  );
}

// Available options
const font = Inter({
  subsets: ['latin', 'cyrillic'], // Character subsets
  weight: ['400', '700'],         // Font weights
  style: ['normal', 'italic'],    // Font styles
  display: 'swap',                // Font display strategy
  preload: true,                  // Preload font (default: true)
  fallback: ['Arial', 'sans-serif'], // Fallback fonts
  adjustFontFallback: true,       // Adjust fallback metrics
  variable: '--font-inter',       // CSS variable name
});`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using CSS Variables
          </h3>
          <CodeBlock
            code={`import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.variable}>
      <Component {...pageProps} />
    </div>
  );
}

// Then use in CSS
// styles/globals.css
.heading {
  font-family: var(--font-inter);
}

// Or in Tailwind config
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
};`}
            language="javascript"
          />
        </section>

        {/* Section 3: next/font/local */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. next/font/local
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use local font files from your project.
          </p>

          <CodeBlock
            code={`import localFont from 'next/font/local';

// Single font file
const myFont = localFont({
  src: './fonts/MyFont.woff2',
  display: 'swap',
  variable: '--font-myfont',
});

// Multiple font files (different weights/styles)
const customFont = localFont({
  src: [
    {
      path: './fonts/Custom-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Custom-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Custom-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-custom',
});

// Using in component
export default function Home() {
  return (
    <div className={myFont.className}>
      <h1>Custom Font</h1>
    </div>
  );
}

// File structure:
// public/
//   fonts/
//     MyFont.woff2
//     Custom-Regular.woff2
//     Custom-Bold.woff2
//     Custom-Italic.woff2`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Local Font Options
          </h3>
          <CodeBlock
            code={`const font = localFont({
  src: './fonts/Font.woff2',
  display: 'swap',              // Font display strategy
  preload: true,                // Preload font
  fallback: ['Arial'],          // Fallback fonts
  adjustFontFallback: true,     // Adjust fallback metrics
  variable: '--font-name',      // CSS variable
  declarations: [               // Additional CSS declarations
    {
      prop: 'font-feature-settings',
      value: '"cv02", "cv03", "cv04", "cv11"',
    },
  ],
});`}
            language="javascript"
          />
        </section>

        {/* Section 4: Font Display Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Font Display Strategies
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control how fonts are displayed while loading.
          </p>

          <CodeBlock
            code={`import { Inter } from 'next/font/google';

// swap (default) - Show fallback immediately, swap when font loads
const interSwap = Inter({
  subsets: ['latin'],
  display: 'swap', // Best for most cases
});

// optional - Only show font if already cached
const interOptional = Inter({
  subsets: ['latin'],
  display: 'optional', // Good for non-critical fonts
});

// block - Block text rendering until font loads (not recommended)
const interBlock = Inter({
  subsets: ['latin'],
  display: 'block', // Can cause FOIT (Flash of Invisible Text)
});

// fallback - Short block period, then fallback, then swap
const interFallback = Inter({
  subsets: ['latin'],
  display: 'fallback', // Balance between swap and block
});

// auto - Browser default
const interAuto = Inter({
  subsets: ['latin'],
  display: 'auto',
});`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Display Strategy Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Strategy
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Behavior
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
                      swap
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Show fallback immediately, swap when loaded
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Most cases (default)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      optional
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Only use if cached, otherwise fallback
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Non-critical fonts
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      fallback
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Short block, then fallback, then swap
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Balance performance and appearance
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      block
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Block until font loads
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Not recommended
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Variable Fonts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Variable Fonts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use variable fonts for flexible weight and style variations.
          </p>

          <CodeBlock
            code={`import { Inter } from 'next/font/google';

// Variable fonts support weight ranges
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  // Or use variable font
  variable: '--font-inter',
});

// Using variable font with CSS
// Option 1: CSS Modules (recommended)
// styles.module.css:
// .thin { font-weight: 100; }
// .bold { font-weight: 700; }
// .custom { font-weight: 450; }

import styles from './styles.module.css';

export default function Home() {
  return (
    <div className={inter.variable}>
      <h1 className={styles.thin}>Thin text</h1>
      <h1 className={styles.bold}>Bold text</h1>
      <h1 className={styles.custom}>Custom weight</h1>
    </div>
  );
}

// Option 2: Inline styles
export default function Home() {
  return (
    <div className={inter.variable}>
      <h1 style={{ fontWeight: 100 }}>Thin text</h1>
      <h1 style={{ fontWeight: 700 }}>Bold text</h1>
      <h1 style={{ fontWeight: 450 }}>Custom weight</h1>
    </div>
  );
}

// Local variable font
import localFont from 'next/font/local';

const variableFont = localFont({
  src: './fonts/VariableFont.woff2',
  variable: '--font-variable',
  weight: '100 900', // Weight range
});`}
            language="javascript"
          />
        </section>

        {/* Section 6: Font Preloading */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Font Preloading
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control font preloading for critical fonts.
          </p>

          <CodeBlock
            code={`import { Inter, Roboto } from 'next/font/google';

// Preload critical font (default: true)
const inter = Inter({
  subsets: ['latin'],
  preload: true, // Preload font file
});

// Don't preload non-critical font
const roboto = Roboto({
  subsets: ['latin'],
  preload: false, // Don't preload
});

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}

// Preloading behavior:
// - preload: true - Font is preloaded in <link rel="preload">
// - preload: false - Font loads when first used
// - Default: true for better performance

// Multiple fonts with different preload strategies
const primaryFont = Inter({
  subsets: ['latin'],
  preload: true, // Critical font
  variable: '--font-primary',
});

const secondaryFont = Roboto({
  subsets: ['latin'],
  preload: false, // Non-critical
  variable: '--font-secondary',
});`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Best Practices
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Preload critical fonts (headings, body text)</li>
            <li>Don't preload decorative or rarely used fonts</li>
            <li>Limit the number of preloaded fonts</li>
            <li>Use variable fonts when possible to reduce file count</li>
            <li>Specify fallback fonts for better perceived performance</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a5/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A5.3 next/script
          </Link>
          <Link
            href="/learn/pages-router/a5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to A5 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
