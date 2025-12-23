import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C1.3: next/font - Next.js Mastery",
  description: "next/font works the same in both App Router and Pages Router",
};

export default function Lesson3Page() {
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
          C1.3: next/font
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The{" "}
          <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
            next/font
          </code>{" "}
          API works the same in both App Router and Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Same API in Both Routers
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Font optimization works identically in both routing systems.
          </p>

          <CodeBlock
            code={`// App Router: app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

// Pages Router: pages/_app.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}

// ✅ Same import
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// ✅ Same configuration options
const font = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
});

// ✅ Same usage patterns`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Google Fonts (Same in Both)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Google Fonts work the same way in both routers.
          </p>

          <CodeBlock
            code={`// Google Fonts (both routers)
import { Inter, Roboto, Open_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

// Usage (both routers)
<div className={inter.className}>
  <h1>Inter font</h1>
</div>

// With CSS variables (both routers)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Usage
<div className={inter.variable}>
  <style jsx>{\`
    h1 {
      font-family: var(--font-inter);
    }
  \`}</style>
</div>

// With display option (both routers)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// With preload (both routers)
const inter = Inter({
  subsets: ['latin'],
  preload: true,
});`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Local Fonts (Same in Both)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Local fonts work the same way in both routers.
          </p>

          <CodeBlock
            code={`// Local fonts (both routers)
import localFont from 'next/font/local';

const myFont = localFont({
  src: './fonts/my-font.woff2',
  display: 'swap',
  variable: '--font-my-font',
});

// Multiple font files (both routers)
const myFont = localFont({
  src: [
    {
      path: './fonts/my-font-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/my-font-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-my-font',
});

// Usage (both routers)
<div className={myFont.className}>
  <h1>Custom font</h1>
</div>

// No differences between routers!
// The API is 100% compatible.`}
            language="javascript"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c1/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C1.2 next/script
          </Link>
          <Link
            href="/learn/comparison/c1/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C1.4 next.config.js →
          </Link>
        </div>
      </div>
    </div>
  );
}
