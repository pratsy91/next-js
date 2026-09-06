import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.9: Styling (B9) - Most Asked Interview Questions",
  description:
    "Most asked Next.js App Router interview questions on CSS Modules, Tailwind, CSS-in-JS, Sass, and styling strategies",
};

export default function Lesson9Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b14"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B14 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B14.9: Styling (B9)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The most frequently asked interview questions on styling in the
          Next.js App Router — CSS Modules, global CSS, Tailwind, CSS-in-JS
          with RSC limitations, Sass, styled-jsx, and when to use what.
        </p>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Questions tagged{" "}
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>{" "}
          /{" "}
          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>{" "}
          /{" "}
          <span className="rounded-full bg-orange-100 px-2 py-0.5 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>{" "}
          based on typical interview depth.
        </p>
      </div>

      <div className="space-y-6">
        {/* Q1 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            1. How does styling work in the App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              The App Router supports multiple styling approaches out of the
              box: <strong>CSS Modules</strong> (scoped, co-located styles),{" "}
              <strong>global CSS</strong> (imported once in a root layout),{" "}
              <strong>Tailwind CSS</strong> (utility classes via PostCSS),{" "}
              <strong>Sass/SCSS</strong>, and <strong>styled-jsx</strong>{" "}
              (built-in, scoped CSS-in-JS). You can mix these in the same
              project.
            </p>
            <p>
              Server Components can import CSS Modules and global CSS directly.
              CSS-in-JS libraries that rely on runtime style injection (styled-components,
              Emotion classic) require Client Components. The App Router does
              not change how CSS is bundled — Next.js uses webpack/Turbopack to
              extract CSS into optimized production bundles with automatic
              code-splitting per route.
            </p>
          </div>
          <CodeBlock
            code={`// app/layout.js — global CSS entry point
import './globals.css';

// app/dashboard/page.js — CSS Module in Server Component
import styles from './dashboard.module.css';

export default function DashboardPage() {
  return <main className={styles.container}>Dashboard</main>;
}

// components/Card.js — Tailwind utilities (works everywhere)
export default function Card({ children }) {
  return (
    <div className="rounded-lg border p-4 shadow-sm dark:border-gray-700">
      {children}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q2 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            2. What are the benefits of CSS Modules?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              CSS Modules automatically scope class names at build time, preventing
              global namespace collisions. A class like{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.button</code>{" "}
              becomes{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">Button_button__x7f2a</code>,
              so two components can both use{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.title</code>{" "}
              without conflict.
            </p>
            <p>
              <strong>Interview highlights:</strong> zero runtime cost (styles
              are extracted at build time), works in Server Components, supports
              composition via{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">composes</code>,
              and pairs well with TypeScript via typed CSS Module imports. Ideal
              for component-level styles when you want traditional CSS syntax
              without Tailwind verbosity.
            </p>
          </div>
          <CodeBlock
            code={`// Button.module.css
.button {
  composes: base from './shared.module.css';
  background: #0070f3;
  color: white;
}

// Button.js
import styles from './Button.module.css';

export default function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}

// Multiple classes
<button className={\`\${styles.button} \${styles.large}\`} />`}
            language="javascript"
          />
        </section>

        {/* Q3 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            3. Where should you import global CSS?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Global CSS must be imported in your{" "}
              <strong>root layout</strong> (
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">app/layout.js</code>
              ). Importing global CSS anywhere else causes a build error — Next.js
              enforces this to prevent duplicate global styles and unpredictable
              ordering.
            </p>
            <p>
              Use global CSS for resets, base typography, CSS custom properties
              (design tokens), and third-party library styles. Component-specific
              styles should use CSS Modules or Tailwind instead.
            </p>
          </div>
          <CodeBlock
            code={`// app/layout.js — ONLY place for global CSS
import './globals.css';
import 'react-datepicker/dist/react-datepicker.css'; // third-party OK here

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// ❌ app/dashboard/page.js
import '../globals.css'; // Build error!`}
            language="javascript"
          />
        </section>

        {/* Q4 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            4. How do you set up Tailwind CSS in Next.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">create-next-app</code>{" "}
              can scaffold Tailwind automatically. Manual setup requires installing{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">tailwindcss</code>,{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">postcss</code>, and{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">autoprefixer</code>,
              then configuring{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">tailwind.config.js</code>{" "}
              content paths to scan{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">app/</code> and{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">components/</code>.
              Add Tailwind directives to{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">globals.css</code>.
            </p>
            <p>
              Tailwind v4 simplifies setup with CSS-first configuration via{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">@import "tailwindcss"</code>{" "}
              in your global stylesheet. Both approaches work with App Router
              Server and Client Components since utilities are just class names.
            </p>
          </div>
          <CodeBlock
            code={`// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
};

// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// Usage in any component (Server or Client)
export default function Hero() {
  return (
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
      Hello
    </h1>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q5 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            5. Why is CSS-in-JS tricky with React Server Components?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Classic CSS-in-JS libraries (styled-components, Emotion) inject
              styles at <strong>runtime</strong> using React context and the
              browser DOM. Server Components render on the server without access
              to the DOM or client-side React context, so runtime CSS-in-JS
              cannot run during RSC rendering.
            </p>
            <p>
              When a styled component is used in a Server Component, you get a
              build error or must mark the entire subtree as a Client Component
              with{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">'use client'</code>,
              which increases JavaScript bundle size and defeats RSC benefits.
              The fix is to use build-time solutions: CSS Modules, Tailwind, or
              zero-runtime CSS-in-JS (Vanilla Extract, Pigment CSS).
            </p>
          </div>
          <CodeBlock
            code={`// ❌ Server Component — runtime CSS-in-JS fails
import styled from 'styled-components';

const Title = styled.h1\`color: blue;\`; // Requires client runtime

export default function Page() {
  return <Title>Hello</Title>; // Error or forced client boundary
}

// ✅ Alternative: CSS Module in Server Component
import styles from './page.module.css';

export default function Page() {
  return <h1 className={styles.title}>Hello</h1>;
}

// ✅ Or: isolate styled-components in a Client Component leaf
// components/StyledTitle.js
'use client';
import styled from 'styled-components';
export const Title = styled.h1\`color: blue;\`;`}
            language="javascript"
          />
        </section>

        {/* Q6 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            6. Which CSS-in-JS libraries support React Server Components?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Libraries that extract styles at <strong>build time</strong> (zero
              runtime) work with RSC:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong>Vanilla Extract</strong> — TypeScript-first, generates
                static CSS files
              </li>
              <li>
                <strong>Pigment CSS</strong> (MUI) — compile-time styled
                components
              </li>
              <li>
                <strong>Linaria</strong> — extracts CSS at build time
              </li>
              <li>
                <strong>styled-jsx</strong> — built into Next.js, scoped styles
                extracted at build
              </li>
              <li>
                <strong>Tailwind CSS</strong> — not CSS-in-JS, but the
                recommended utility approach
              </li>
            </ul>
            <p>
              Runtime libraries (styled-components, Emotion) work only in Client
              Components. Styled-components v6+ offers a registry pattern for
              SSR style collection, but still requires{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">'use client'</code>{" "}
              for styled components themselves.
            </p>
          </div>
        </section>

        {/* Q7 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            7. How do you set up Sass/SCSS in Next.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Install{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">sass</code>{" "}
              and use{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.scss</code>{" "}
              or{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.sass</code>{" "}
              file extensions. CSS Modules work with Sass too — name files{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">*.module.scss</code>.
              Global Sass imports follow the same root-layout-only rule as plain
              CSS.
            </p>
          </div>
          <CodeBlock
            code={`npm install sass

// app/globals.scss (import in layout.js)
$primary: #0070f3;

body {
  font-family: system-ui, sans-serif;
  color: darken($primary, 20%);
}

// components/Card/Card.module.scss
.card {
  padding: 1rem;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
  }
}

// Card.js
import styles from './Card.module.scss';`}
            language="javascript"
          />
        </section>

        {/* Q8 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            8. Is styled-jsx still used in Next.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Yes — styled-jsx is still built into Next.js and works in both App
              Router and Pages Router. It provides component-scoped CSS with a
              familiar CSS-in-JS syntax, but styles are extracted at build time
              (no runtime overhead). It supports Server Components.
            </p>
            <p>
              However, most new projects prefer Tailwind or CSS Modules for
              ecosystem tooling, IDE support, and team familiarity. styled-jsx
              remains useful for quick scoped styles without extra dependencies,
              especially when migrating from Pages Router codebases.
            </p>
          </div>
          <CodeBlock
            code={`export default function Button({ children }) {
  return (
    <button>
      {children}
      <style jsx>{\`
        button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background: #0051cc;
        }
      \`}</style>
    </button>
  );
}

// Global styles with styled-jsx
<style jsx global>{\`
  body { margin: 0; }
\`}</style>`}
            language="javascript"
          />
        </section>

        {/* Q9 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            9. How do CSS variables and theming work in App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Define design tokens as CSS custom properties in{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">globals.css</code>{" "}
              on{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">:root</code>{" "}
              or{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">html</code>.
              Override them for themes (dark mode, brand variants) using class
              selectors or media queries. CSS Modules and Tailwind both consume
              these variables.
            </p>
            <p>
              With Tailwind, extend{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">theme.colors</code>{" "}
              to reference CSS variables for dynamic theming without rebuilding
              Tailwind config.
            </p>
          </div>
          <CodeBlock
            code={`/* globals.css */
:root {
  --color-primary: #0070f3;
  --color-background: #ffffff;
  --color-text: #111827;
}

.dark {
  --color-background: #111827;
  --color-text: #f9fafb;
}

body {
  background: var(--color-background);
  color: var(--color-text);
}

/* Tailwind config referencing CSS vars */
// theme: {
//   extend: {
//     colors: {
//       primary: 'var(--color-primary)',
//     },
//   },
// }`}
            language="css"
          />
        </section>

        {/* Q10 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            10. What are dark mode strategies in Next.js?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Three common approaches:</strong>
            </p>
            <ol className="list-inside list-decimal space-y-2">
              <li>
                <strong>Tailwind dark variant</strong> — add{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">darkMode: 'class'</code>{" "}
                and toggle a{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">dark</code>{" "}
                class on{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">&lt;html&gt;</code>.
                Use{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">dark:bg-gray-900</code>{" "}
                utilities.
              </li>
              <li>
                <strong>CSS media query</strong> —{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">@media (prefers-color-scheme: dark)</code>{" "}
                or Tailwind{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">darkMode: 'media'</code>.
                Respects OS preference, no JS needed.
              </li>
              <li>
                <strong>CSS variables</strong> — swap token values under a{" "}
                <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">.dark</code>{" "}
                class; framework-agnostic.
              </li>
            </ol>
            <p>
              For user-toggleable dark mode, use a Client Component to set the
              class and persist preference in{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">localStorage</code>.
              Add an inline script in layout to prevent flash of wrong theme
              (FOUC).
            </p>
          </div>
          <CodeBlock
            code={`// app/layout.js
<html lang="en" suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: \`
      (function() {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      })();
    \`}} />
  </head>
  <body>{children}</body>
</html>

// components/ThemeToggle.js
'use client';
export function ThemeToggle() {
  function toggle() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  }
  return <button onClick={toggle}>Toggle theme</button>;
}`}
            language="javascript"
          />
        </section>

        {/* Q11 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            11. What is critical CSS and does Next.js handle it?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Critical CSS is the minimal stylesheet needed to render above-the-fold
              content without layout shift or unstyled flashes. Next.js automatically
              inlines critical CSS for each route during production builds and
              code-splits non-critical CSS into separate chunks loaded asynchronously.
            </p>
            <p>
              You do not manually extract critical CSS in most App Router projects.
              Best practices that help: keep global CSS lean, use CSS Modules/Tailwind
              for route-specific styles (automatic splitting), avoid huge third-party
              CSS imports, and use{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">next/font</code>{" "}
              instead of external font CSS to reduce render-blocking resources.
            </p>
          </div>
        </section>

        {/* Q12 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Junior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            12. What are conditional classNames patterns?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Common patterns for dynamic classes: template literals, the{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">clsx</code>{" "}
              or{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">classnames</code>{" "}
              utility, and Tailwind&apos;s official{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">tailwind-merge</code>{" "}
              +{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">clsx</code>{" "}
              combo (often wrapped as{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">cn()</code>{" "}
              in shadcn/ui projects) to resolve conflicting Tailwind utilities.
            </p>
          </div>
          <CodeBlock
            code={`import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// CSS Modules
<div className={clsx(styles.button, isActive && styles.active)} />

// Tailwind with cn() — later classes win, conflicts resolved
<button
  className={cn(
    'px-4 py-2 rounded-md font-medium',
    variant === 'primary' && 'bg-blue-600 text-white',
    variant === 'ghost' && 'bg-transparent text-gray-700',
    disabled && 'opacity-50 cursor-not-allowed',
    className // allow prop overrides
  )}
/>`}
            language="javascript"
          />
        </section>

        {/* Q13 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            13. Tailwind vs CSS Modules — what are the tradeoffs?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b dark:border-gray-600">
                  <th className="py-2 pr-4">Aspect</th>
                  <th className="py-2 pr-4">Tailwind</th>
                  <th className="py-2">CSS Modules</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 pr-4">Speed</td>
                  <td className="py-2 pr-4">Fast prototyping, no context switch</td>
                  <td className="py-2">Separate CSS files, familiar to CSS devs</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 pr-4">Bundle</td>
                  <td className="py-2 pr-4">Purge unused utilities (small prod CSS)</td>
                  <td className="py-2">Only imported modules bundled per route</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 pr-4">Complexity</td>
                  <td className="py-2 pr-4">Long class strings, needs discipline</td>
                  <td className="py-2">Full CSS features (nesting via Sass, animations)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">RSC</td>
                  <td className="py-2 pr-4">Works everywhere</td>
                  <td className="py-2">Works everywhere</td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>Interview answer:</strong> Many teams use Tailwind for layout
              and spacing, CSS Modules for complex component animations or
              third-party overrides. There is no single winner — choose based on
              team preference and design system complexity.
            </p>
          </div>
        </section>

        {/* Q14 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Mid
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            14. How do you style Server Components vs Client Components?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Server Components</strong> can use CSS Modules, global CSS,
              Tailwind classes, Sass, and styled-jsx. They cannot use runtime
              CSS-in-JS. Styles are resolved at build/render time with zero client
              JavaScript for styling.
            </p>
            <p>
              <strong>Client Components</strong> support everything Server
              Components do, plus runtime CSS-in-JS (styled-components, Emotion),
              inline styles with state-driven values, and DOM-based theme toggling.
              Keep styled leaf components as small Client boundaries to minimize
              bundle impact.
            </p>
          </div>
          <CodeBlock
            code={`// Server Component — all static styling approaches OK
import styles from './page.module.css';

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  return (
    <article className="mx-auto max-w-2xl p-6">
      <h1 className={styles.title}>{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <AddToCartButton productId={product.id} /> {/* Client leaf */}
    </article>
  );
}

// Client Component — can use runtime styles + interactivity
'use client';
import styled from 'styled-components';

const AnimatedButton = styled.button\`
  transition: transform 0.2s;
  &:hover { transform: scale(1.05); }
\`;

export function AddToCartButton({ productId }) {
  return <AnimatedButton onClick={() => addToCart(productId)}>Add</AnimatedButton>;
}`}
            language="javascript"
          />
        </section>

        {/* Q15 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            15. When should you use which styling approach?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong>Tailwind</strong> — rapid UI development, design systems
                with consistent spacing/colors, teams comfortable with utility-first
              </li>
              <li>
                <strong>CSS Modules</strong> — complex animations, precise CSS
                control, migrating existing CSS codebases, designers who write CSS
              </li>
              <li>
                <strong>Global CSS</strong> — resets, typography base, CSS variables,
                third-party library styles only
              </li>
              <li>
                <strong>CSS-in-JS (zero-runtime)</strong> — type-safe theming with
                Vanilla Extract/Pigment when you need programmatic styles in RSC
              </li>
              <li>
                <strong>Runtime CSS-in-JS</strong> — only when dynamic theme
                generation from props is essential; isolate in Client Components
              </li>
            </ul>
            <p>
              <strong>Senior insight:</strong> Styling choice affects bundle size,
              RSC compatibility, DX, and hiring. Prefer build-time solutions in App
              Router projects unless you have a strong reason for runtime injection.
            </p>
          </div>
        </section>

        {/* Q16 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Senior
          </span>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            16. How do external stylesheets and CSS order work in App Router?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              CSS load order matters for specificity conflicts. Global CSS imported
              in the root layout loads first. Route-level CSS Modules are injected
              when that route renders. Third-party CSS in the root layout affects
              the entire app — prefer importing only what you need.
            </p>
            <p>
              Tailwind&apos;s{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">@layer</code>{" "}
              directive (base, components, utilities) controls cascade order.
              Custom CSS in{" "}
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">@layer components</code>{" "}
              sits between base resets and utilities, preventing specificity wars.
              For component libraries (Radix, Headless UI), use Tailwind to style
              unstyled primitives rather than fighting their default CSS.
            </p>
          </div>
          <CodeBlock
            code={`/* globals.css — controlled layer order */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700;
  }
}

/* Third-party: import once in layout, override with Tailwind layers */
@import 'react-day-picker/dist/style.css';`}
            language="css"
          />
        </section>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
        <Link
          href="/learn/app-router/b14/lesson-8"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ← Previous: B14.8 Components & Features
        </Link>
        <Link
          href="/learn/app-router/b14/lesson-10"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Next: B14.10 Advanced Features →
        </Link>
      </nav>
    </div>
  );
}
