import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A7.5: Tailwind CSS - Next.js Mastery",
  description: "Complete guide to Tailwind CSS in Next.js Pages Router",
};

export default function Lesson5Page() {
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
          A7.5: Tailwind CSS
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to set up and use Tailwind CSS for utility-first styling in
          Next.js Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Setup */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Setup
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Install and configure Tailwind CSS in your Next.js Pages Router
            project.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installation
          </h3>
          <CodeBlock
            code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Configuration Files
          </h3>
          <CodeBlock
            code={`// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Import in _app.js
          </h3>
          <CodeBlock
            code={`// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
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
            Customize Tailwind CSS to match your design system.
          </p>

          <CodeBlock
            code={`// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Custom colors
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        brand: '#0070f3',
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // Custom fonts
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      
      // Custom breakpoints
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      
      // Custom utilities
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

// Override default theme
module.exports = {
  theme: {
    // Completely replace default theme
    colors: {
      primary: '#0070f3',
      secondary: '#7928ca',
    },
  },
}

// Or extend (recommended)
module.exports = {
  theme: {
    extend: {
      // Add to existing theme
      colors: {
        brand: '#0070f3',
      },
    },
  },
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: PurgeCSS */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. PurgeCSS
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Tailwind automatically removes unused CSS in production builds
            (built-in PurgeCSS).
          </p>

          <CodeBlock
            code={`// tailwind.config.js
module.exports = {
  content: [
    // Specify all files that might contain Tailwind classes
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './layouts/**/*.{js,jsx,ts,tsx}',
  ],
  // ... rest of config
}

// How it works:
// 1. Scans all files in content paths
// 2. Finds all Tailwind class names
// 3. Removes unused classes from final CSS
// 4. Results in much smaller CSS bundle

// Important: Include all file paths that use Tailwind classes
// If a file is not in content array, its classes will be removed!

// Dynamic class names
// If you use dynamic class names, safelist them:
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    'bg-red-500',
    'text-blue-500',
    {
      pattern: /bg-(red|blue|green)-(100|500|900)/,
      variants: ['hover', 'focus'],
    },
  ],
}

// Example: Dynamic classes
function Button({ color }) {
  // This class might be removed if not safelisted
  return <button className={\`bg-\${color}-500\`}>Click</button>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            PurgeCSS Best Practices
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Include all file paths that contain Tailwind classes</li>
            <li>Use safelist for dynamic class names</li>
            <li>Test production build to ensure classes aren't removed</li>
            <li>Check bundle size to verify PurgeCSS is working</li>
          </ul>
        </section>

        {/* Section 4: Custom Utilities */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Custom Utilities
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create custom utility classes using Tailwind's plugin system.
          </p>

          <CodeBlock
            code={`// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function ({ addUtilities, addComponents, theme }) {
      // Add custom utilities
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
      });
      
      // Add custom components
      addComponents({
        '.btn': {
          padding: theme('spacing.2'),
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.bold'),
        },
        '.btn-primary': {
          backgroundColor: theme('colors.blue.500'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.blue.600'),
          },
        },
      });
    }),
  ],
}

// Using custom utilities
<div className="scrollbar-hide">
  {/* Content */}
</div>

<button className="btn btn-primary">
  Click me
</button>

// Custom utilities with variants
plugin(function ({ addUtilities, theme }) {
  addUtilities({
    '.gradient-text': {
      background: 'linear-gradient(to right, var(--tw-gradient-stops))',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-clip': 'text',
    },
  });
}, {
  variants: ['hover', 'focus'],
});

// Using in component
<h1 className="gradient-text hover:opacity-80">
  Gradient Text
</h1>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using @apply Directive
          </h3>
          <CodeBlock
            code={`// styles/components.css
@layer components {
  .btn {
    @apply px-4 py-2 rounded font-semibold;
  }
  
  .btn-primary {
    @apply bg-blue-500 text-white;
    @apply hover:bg-blue-600;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}

// Using in components
<button className="btn btn-primary">Click me</button>
<div className="card">Card content</div>

// @layer directives:
// - base: Base styles (resets, defaults)
// - components: Component classes
// - utilities: Utility classes (highest specificity)`}
            language="css"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a7/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A7.4 Sass/SCSS
          </Link>
          <Link
            href="/learn/pages-router/a7"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to A7 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
