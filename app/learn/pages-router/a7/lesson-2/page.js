import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A7.2: Global CSS - Next.js Mastery",
  description: "Complete guide to global CSS in Next.js Pages Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a7"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A7 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A7.2: Global CSS
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use global CSS files for site-wide styling, resets, CSS
          variables, and dark mode.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Importing Global Styles */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Importing Global Styles
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Import global CSS files in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              _app.js
            </code>{" "}
            to apply styles across all pages.
          </p>

          <CodeBlock
            code={`// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// Multiple global stylesheets
import '../styles/reset.css';
import '../styles/variables.css';
import '../styles/globals.css';
import '../styles/utilities.css';

// Import order matters - later imports override earlier ones

// File structure:
// styles/
//   ├── reset.css
//   ├── variables.css
//   ├── globals.css
//   └── utilities.css

// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Important Notes
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              Global CSS must be imported in{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                _app.js
              </code>
            </li>
            <li>Cannot import global CSS in regular pages</li>
            <li>Styles apply to all pages automatically</li>
            <li>Use for resets, variables, and base styles</li>
          </ul>
        </section>

        {/* Section 2: CSS Reset */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. CSS Reset
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Reset browser default styles for consistent rendering across
            browsers.
          </p>

          <CodeBlock
            code={`// styles/reset.css
/* Modern CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}

// Alternative: Use a library
// npm install modern-css-reset

// styles/reset.css
@import 'modern-css-reset';

// Or use normalize.css
// npm install normalize.css

// styles/reset.css
@import 'normalize.css';`}
            language="css"
          />
        </section>

        {/* Section 3: CSS Variables */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. CSS Variables
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use CSS custom properties (variables) for theming and dynamic
            values.
          </p>

          <CodeBlock
            code={`// styles/variables.css
:root {
  /* Colors */
  --color-primary: #0070f3;
  --color-secondary: #7928ca;
  --color-success: #0070f3;
  --color-error: #e00;
  --color-warning: #f5a623;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  --font-family-mono: 'Courier New', monospace;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
  
  /* Layout */
  --max-width: 1200px;
  --border-radius: 8px;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

// Using CSS variables
.button {
  background: var(--color-primary);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius);
  font-family: var(--font-family-sans);
}

// Dynamic variables with JavaScript
// pages/_app.js
import { useEffect } from 'react';
import '../styles/variables.css';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Set CSS variable dynamically
    document.documentElement.style.setProperty('--color-primary', '#ff0000');
  }, []);
  
  return <Component {...pageProps} />;
}

// CSS variables with fallbacks
.button {
  background: var(--color-primary, #0070f3);
  color: var(--color-text, #000);
}`}
            language="css"
          />
        </section>

        {/* Section 4: Dark Mode */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Dark Mode
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement dark mode using CSS variables and media queries or class
            toggles.
          </p>

          <CodeBlock
            code={`// styles/globals.css
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --border-color: #e0e0e0;
}

/* Dark mode using prefers-color-scheme */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #000000;
    --text-color: #ffffff;
    --border-color: #333333;
  }
}

/* Dark mode using class toggle */
.dark {
  --bg-color: #000000;
  --text-color: #ffffff;
  --border-color: #333333;
}

/* Using variables */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

// JavaScript toggle
// components/ThemeToggle.js
'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    // Or check localStorage
    const saved = localStorage.getItem('theme');
    if (saved) {
      setDarkMode(saved === 'dark');
    }
  }, []);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  
  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

// Using data attribute
// styles/globals.css
[data-theme='dark'] {
  --bg-color: #000000;
  --text-color: #ffffff;
}

[data-theme='light'] {
  --bg-color: #ffffff;
  --text-color: #000000;
}

// Toggle with data attribute
document.documentElement.setAttribute('data-theme', 'dark');`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a7/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A7.1 CSS Modules
          </Link>
          <Link
            href="/learn/pages-router/a7/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A7.3 CSS-in-JS →
          </Link>
        </div>
      </div>
    </div>
  );
}
