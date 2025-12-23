import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B9.2: Global CSS - Next.js Mastery",
  description: "Complete guide to global CSS in Next.js App Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b9"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B9 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B9.2: Global CSS
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use global CSS in Next.js App Router: importing in
          layout, CSS reset, CSS variables, and dark mode.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Importing in Layout */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Importing in Layout
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Global CSS files must be imported in the root layout file to apply
            styles across your entire application.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Global CSS Import
          </h3>
          <CodeBlock
            code={`// app/layout.js (Root Layout)
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/globals.css
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

// Import multiple global files
// app/layout.js
import './globals.css';
import './reset.css';
import './variables.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// Order matters - later imports can override earlier ones`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Layout Imports
          </h3>
          <CodeBlock
            code={`// Root layout
// app/layout.js
import './globals.css';  // Global styles for entire app

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// Nested layout
// app/blog/layout.js
import '../blog.css';  // Styles specific to blog section

export default function BlogLayout({ children }) {
  return <div className="blog-container">{children}</div>;
}

// Note: Global CSS imported in nested layouts applies to:
// - The layout itself
// - All child pages and layouts
// - But not sibling routes`}
            language="javascript"
          />
        </section>

        {/* Section 2: CSS Reset */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. CSS Reset
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use CSS resets to normalize browser default styles for consistent
            rendering across browsers.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic CSS Reset
          </h3>
          <CodeBlock
            code={`// app/reset.css
/* Box sizing reset */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margins and padding */
* {
  margin: 0;
  padding: 0;
}

/* Remove list styles */
ul, ol {
  list-style: none;
}

/* Remove default link styles */
a {
  text-decoration: none;
  color: inherit;
}

/* Remove button defaults */
button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

/* Remove input defaults */
input, textarea {
  border: none;
  outline: none;
}

/* Image defaults */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

// Import in layout
// app/layout.js
import './reset.css';
import './globals.css';`}
            language="css"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Modern CSS Reset (Normalize)
          </h3>
          <CodeBlock
            code={`// app/reset.css
/* Modern CSS Reset / Normalize */

/* Box sizing */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Remove default margin */
* {
  margin: 0;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Make images easier to work with */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* Inherit fonts for inputs and buttons */
input, button, textarea, select {
  font: inherit;
}

/* Remove all animations and transitions for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}
            language="css"
          />
        </section>

        {/* Section 3: CSS Variables */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. CSS Variables
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use CSS custom properties (variables) for theming, colors, spacing,
            and other reusable values.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic CSS Variables
          </h3>
          <CodeBlock
            code={`// app/globals.css
:root {
  /* Colors */
  --color-primary: #0070f3;
  --color-secondary: #e0e0e0;
  --color-text: #333;
  --color-background: #fff;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Typography */
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  
  /* Borders */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}

/* Using variables */
.button {
  background-color: var(--color-primary);
  color: var(--color-background);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
}

.card {
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  background-color: var(--color-background);
}`}
            language="css"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            CSS Variable Inheritance
          </h3>
          <CodeBlock
            code={`// CSS variables cascade and can be overridden
// app/globals.css
:root {
  --primary-color: #0070f3;
  --spacing: 16px;
}

/* Override for specific component */
.card {
  --spacing: 24px;  // Overrides root spacing
  padding: var(--spacing);
  background-color: var(--primary-color);
}

/* Nested override */
.card.large {
  --spacing: 32px;  // Further override
}

/* Component-specific variables */
.button {
  --button-padding: 12px 24px;
  --button-radius: 4px;
  
  padding: var(--button-padding);
  border-radius: var(--button-radius);
}

.button.large {
  --button-padding: 16px 32px;
  --button-radius: 8px;
}`}
            language="css"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic CSS Variables
          </h3>
          <CodeBlock
            code={`// Update CSS variables with JavaScript
// app/components/ThemeProvider.js
'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    // Update CSS variables based on theme
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.style.setProperty('--color-background', '#0a0a0a');
      root.style.setProperty('--color-text', '#ededed');
      root.style.setProperty('--color-primary', '#0070f3');
    } else {
      root.style.setProperty('--color-background', '#ffffff');
      root.style.setProperty('--color-text', '#171717');
      root.style.setProperty('--color-primary', '#0070f3');
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// app/globals.css
:root {
  --color-background: #ffffff;
  --color-text: #171717;
  --color-primary: #0070f3;
}

/* Components use variables */
body {
  background-color: var(--color-background);
  color: var(--color-text);
}

.button {
  background-color: var(--color-primary);
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Dark Mode */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Dark Mode
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement dark mode using CSS variables and media queries or
            JavaScript-controlled classes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dark Mode with Media Query
          </h3>
          <CodeBlock
            code={`// app/globals.css
:root {
  /* Light mode (default) */
  --color-background: #ffffff;
  --color-text: #171717;
  --color-primary: #0070f3;
  --color-border: #e0e0e0;
}

/* Dark mode (system preference) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0a0a0a;
    --color-text: #ededed;
    --color-primary: #0070f3;
    --color-border: #333;
  }
}

/* Using variables */
body {
  background-color: var(--color-background);
  color: var(--color-text);
  transition: background-color 0.3s, color 0.3s;
}

.button {
  background-color: var(--color-primary);
  border: 1px solid var(--color-border);
}

// This automatically adapts to user's system preference`}
            language="css"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dark Mode with Class Toggle
          </h3>
          <CodeBlock
            code={`// app/globals.css
:root {
  /* Light mode */
  --color-background: #ffffff;
  --color-text: #171717;
  --color-primary: #0070f3;
}

/* Dark mode class */
.dark {
  --color-background: #0a0a0a;
  --color-text: #ededed;
  --color-primary: #0070f3;
}

/* Or use data attribute */
[data-theme="dark"] {
  --color-background: #0a0a0a;
  --color-text: #ededed;
  --color-primary: #0070f3;
}

// app/components/ThemeToggle.js
'use client'

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dark Mode with next-themes
          </h3>
          <CodeBlock
            code={`// Install: npm install next-themes

// app/providers.js
'use client'

import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

// app/layout.js
import { Providers } from './providers';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

// app/globals.css
:root {
  --color-background: #ffffff;
  --color-text: #171717;
}

.dark {
  --color-background: #0a0a0a;
  --color-text: #ededed;
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
}

// app/components/ThemeToggle.js
'use client'

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complete Dark Mode Setup
          </h3>
          <CodeBlock
            code={`// app/globals.css
/* Light mode variables */
:root {
  /* Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #171717;
  --text-secondary: #666;
  --border-color: #e0e0e0;
  
  /* Accent colors */
  --accent-blue: #0070f3;
  --accent-green: #00c853;
  --accent-red: #f44336;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}

/* Dark mode variables */
[data-theme="dark"],
.dark {
  /* Colors */
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #ededed;
  --text-secondary: #999;
  --border-color: #333;
  
  /* Accent colors (can be same or different) */
  --accent-blue: #0070f3;
  --accent-green: #00c853;
  --accent-red: #f44336;
  
  /* Shadows (lighter in dark mode) */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.4);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.5);
}

/* Base styles */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  transition: background-color 0.3s ease;
}

.button {
  background-color: var(--accent-blue);
  color: white;
}

/* Smooth transitions */
* {
  transition-property: background-color, color, border-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}`}
            language="css"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b9/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B9.1 CSS Modules
          </Link>
          <Link
            href="/learn/app-router/b9/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B9.3 CSS-in-JS →
          </Link>
        </div>
      </div>
    </div>
  );
}
