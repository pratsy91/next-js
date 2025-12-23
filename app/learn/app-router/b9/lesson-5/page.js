import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B9.5: Tailwind CSS - Next.js Mastery",
  description: "Complete guide to Tailwind CSS in Next.js App Router",
};

export default function Lesson5Page() {
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
          B9.5: Tailwind CSS
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use Tailwind CSS in Next.js App Router: setup,
          configuration, custom utilities, and dark mode.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Setup */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Setup
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Install and configure Tailwind CSS in Next.js App Router.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installing Tailwind CSS
          </h3>
          <CodeBlock
            code={`// Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

// Initialize Tailwind
npx tailwindcss init -p

// This creates:
// - tailwind.config.js
// - postcss.config.js`}
            language="bash"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Configuration
          </h3>
          <CodeBlock
            code={`// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// Import in root layout
// app/layout.js
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Configuration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Configuration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Customize Tailwind CSS with your design tokens and theme
            configuration.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Extending Theme
          </h3>
          <CodeBlock
            code={`// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom colors
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#b3d9ff',
          500: '#0070f3',
          600: '#0051cc',
          700: '#003d99',
        },
        secondary: '#e0e0e0',
      },
      // Custom spacing
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      // Custom fonts
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      // Custom breakpoints
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
      },
      // Custom animations
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Configuration
          </h3>
          <CodeBlock
            code={`// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          light: '#3385ff',
          dark: '#0051cc',
        },
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};`}
            language="javascript"
          />
        </section>

        {/* Section 3: Custom Utilities */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Custom Utilities
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create custom utility classes and components with Tailwind CSS.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Custom Utilities in CSS
          </h3>
          <CodeBlock
            code={`// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .bg-gradient-radial {
    background-image: radial-gradient(var(--tw-gradient-stops));
  }
}

/* Custom components */
@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
  
  .card-header {
    @apply font-bold text-xl mb-4;
  }
}

/* Using custom utilities */
export default function Page() {
  return (
    <div>
      <button className="btn-primary">Primary Button</button>
      <button className="btn-secondary">Secondary Button</button>
      
      <div className="card">
        <h2 className="card-header">Card Title</h2>
        <p>Card content</p>
      </div>
    </div>
  );
}`}
            language="css"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Custom Plugin Utilities
          </h3>
          <CodeBlock
            code={`// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities, addComponents, theme }) {
      // Add custom utilities
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
      
      // Add custom components
      addComponents({
        '.btn-primary': {
          backgroundColor: theme('colors.blue.600'),
          color: theme('colors.white'),
          padding: theme('spacing.2') + ' ' + theme('spacing.4'),
          borderRadius: theme('borderRadius.lg'),
          '&:hover': {
            backgroundColor: theme('colors.blue.700'),
          },
        },
      });
    }),
  ],
};`}
            language="javascript"
          />
        </section>

        {/* Section 4: Dark Mode */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Dark Mode
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure and use dark mode with Tailwind CSS.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Configuring Dark Mode
          </h3>
          <CodeBlock
            code={`// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' for system preference
  theme: {
    extend: {},
  },
  plugins: [],
};

// Using class strategy requires adding 'dark' class to html element
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// With media strategy (uses prefers-color-scheme)
// tailwind.config.js
module.exports = {
  darkMode: 'media', // Uses system preference
  // ... rest of config
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using Dark Mode Classes
          </h3>
          <CodeBlock
            code={`// Using dark mode with class strategy
// app/components/Card.js
export default function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-md">
      {children}
    </div>
  );
}

// Dark mode variations
export default function Button({ children }) {
  return (
    <button className="
      bg-blue-600 dark:bg-blue-500
      text-white dark:text-gray-100
      hover:bg-blue-700 dark:hover:bg-blue-600
      px-4 py-2 rounded-lg
      transition-colors
    ">
      {children}
    </button>
  );
}

// Conditional dark mode
export default function Component() {
  return (
    <div className="
      bg-white
      dark:bg-gray-900
      text-gray-900
      dark:text-gray-100
      p-4
    ">
      Content
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dark Mode Toggle
          </h3>
          <CodeBlock
            code={`// app/components/ThemeToggle.js
'use client'

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

// Or using next-themes
// Install: npm install next-themes

// app/providers.js
'use client'

import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

// app/layout.js
import { Providers } from './providers';

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

// app/components/ThemeToggle.js
'use client'

import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b9/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B9.4 Sass/SCSS
          </Link>
          <Link
            href="/learn/app-router/b10"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B10 Advanced Features →
          </Link>
        </div>
      </div>
    </div>
  );
}
