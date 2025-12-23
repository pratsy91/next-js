import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C1.7: Styling - Next.js Mastery",
  description:
    "Styling approaches work the same in both App Router and Pages Router",
};

export default function Lesson7Page() {
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
          C1.7: Styling
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          All styling approaches work the same in both App Router and Pages
          Router.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. CSS Modules (Same in Both)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            CSS Modules work identically in both routers.
          </p>

          <CodeBlock
            code={`// CSS Modules (both routers)
// App Router: app/components/Button.module.css
.button {
  padding: 10px 20px;
  background: blue;
}

// Pages Router: components/Button.module.css
.button {
  padding: 10px 20px;
  background: blue;
}

// Usage (both routers)
import styles from './Button.module.css';

<button className={styles.button}>Click</button>

// ✅ Same file naming: *.module.css
// ✅ Same scoped styles
// ✅ Same composition
// ✅ Same global styles with :global`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Global CSS (Same in Both)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Global CSS works the same, but imported in different places.
          </p>

          <CodeBlock
            code={`// Global CSS (both routers)
// styles/globals.css
body {
  margin: 0;
  font-family: sans-serif;
}

// App Router: app/layout.tsx
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}

// Pages Router: pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// ✅ Same CSS file
// ✅ Same CSS features
// ✅ Only import location differs`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. CSS-in-JS (Same in Both)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            CSS-in-JS libraries work the same in both routers.
          </p>

          <CodeBlock
            code={`// Styled-components (both routers)
import styled from 'styled-components';

const Button = styled.button\`
  padding: 10px 20px;
  background: blue;
\`;

// Emotion (both routers)
import styled from '@emotion/styled';

const Button = styled.button\`
  padding: 10px 20px;
  background: blue;
\`;

// Styled JSX (both routers)
<div>
  <style jsx>{\`
    .button {
      padding: 10px 20px;
      background: blue;
    }
  \`}</style>
  <button className="button">Click</button>
</div>

// ✅ Same libraries
// ✅ Same APIs
// ✅ Same setup (SSR configuration)`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Tailwind CSS (Same in Both)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Tailwind CSS works identically in both routers.
          </p>

          <CodeBlock
            code={`// Tailwind setup (both routers)
// tailwind.config.js (same)
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // App Router
    './pages/**/*.{js,jsx,ts,tsx}',    // Pages Router
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// Usage (both routers)
<div className="flex items-center justify-center">
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    Click
  </button>
</div>

// ✅ Same configuration
// ✅ Same classes
// ✅ Same utilities`}
            language="javascript"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c1/lesson-6"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C1.6 Environment Variables
          </Link>
          <Link
            href="/learn/comparison/c1/lesson-8"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C1.8 Deployment →
          </Link>
        </div>
      </div>
    </div>
  );
}
