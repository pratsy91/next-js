import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B8.3: next/font - Next.js Mastery",
  description: "Complete guide to font optimization in Next.js App Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b8"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B8 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B8.3: next/font
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to optimize fonts using next/font: Google Fonts, local
          fonts, font display strategies, variable fonts, and font preloading.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Font Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Font Optimization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically optimizes fonts by self-hosting them, removing
            external network requests, and improving privacy and performance.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Benefits of next/font
          </h3>
          <CodeBlock
            code={`// Benefits:
// 1. Zero layout shift - fonts are automatically optimized
// 2. Improved privacy - no requests to Google/other font services
// 3. Better performance - fonts are self-hosted
// 4. Automatic font subsetting - only used characters are loaded
// 5. CSS size optimization

// ❌ Don't use external font links
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
  rel="stylesheet"
/>

// ✅ Use next/font
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
  return (
    <div className={inter.className}>
      <h1>Optimized font!</h1>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Font Optimization Works
          </h3>
          <CodeBlock
            code={`// Next.js:
// 1. Downloads fonts at build time
// 2. Generates static font files in .next folder
// 3. Automatically generates CSS with font-face
// 4. Injects optimized CSS at build time
// 5. Self-hosts fonts (no external requests)

// Example: Using Inter font
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// This generates:
// - Font files in .next/static/fonts/
// - Optimized CSS with @font-face
// - CSS variable for className

export default function Layout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: next/font/google */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. next/font/google
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use Google Fonts with automatic optimization and self-hosting.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Google Font Usage
          </h3>
          <CodeBlock
            code={`// app/layout.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

// Using with CSS variable
const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <html lang="en" style={inter.style}>
      <body>{children}</body>
    </html>
  );
}

// Multiple fonts
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ['latin'] 
});

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className={roboto.className}>Roboto Heading</h1>
        {children}
      </body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Font Weight Configuration
          </h3>
          <CodeBlock
            code={`// Configure font weights
import { Inter } from 'next/font/google';

// Single weight
const inter = Inter({ 
  weight: '400',
  subsets: ['latin'] 
});

// Multiple weights
const inter = Inter({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'] 
});

// Weight range
const inter = Inter({ 
  weight: '400..700',  // Variable font weight range
  subsets: ['latin'] 
});

// Using different weights
export default function Page() {
  return (
    <div className={inter.className}>
      <p className="font-normal">Normal (400)</p>
      <p className="font-medium">Medium (500)</p>
      <p className="font-semibold">Semibold (600)</p>
      <p className="font-bold">Bold (700)</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Font Style Configuration
          </h3>
          <CodeBlock
            code={`// Configure font styles
import { Roboto } from 'next/font/google';

// Normal style
const roboto = Roboto({ 
  weight: '400',
  subsets: ['latin'] 
});

// Include italic
const roboto = Roboto({ 
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'] 
});

// Using italic
export default function Page() {
  return (
    <div className={roboto.className}>
      <p>Normal text</p>
      <p className="italic">Italic text</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Subsets Configuration
          </h3>
          <CodeBlock
            code={`// Configure character subsets
import { Inter } from 'next/font/google';

// Single subset
const inter = Inter({ subsets: ['latin'] });

// Multiple subsets
const inter = Inter({ 
  subsets: ['latin', 'latin-ext', 'cyrillic'] 
});

// Available subsets depend on font:
// - latin: Basic Latin characters
// - latin-ext: Extended Latin
// - cyrillic: Cyrillic script
// - greek: Greek script
// - vietnamese: Vietnamese characters
// - And more...

export default function Layout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: next/font/local */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. next/font/local
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use local font files from your project with the same optimization
            benefits.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Local Font Usage
          </h3>
          <CodeBlock
            code={`// app/layout.js
import localFont from 'next/font/local';

// Single font file
const customFont = localFont({
  src: './fonts/CustomFont.woff2',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={customFont.className}>
      <body>{children}</body>
    </html>
  );
}

// Multiple font files (different weights/styles)
const customFont = localFont({
  src: [
    {
      path: './fonts/CustomFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/CustomFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/CustomFont-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
});`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Local Font Configuration
          </h3>
          <CodeBlock
            code={`// Full local font configuration
import localFont from 'next/font/local';

const customFont = localFont({
  src: [
    {
      path: './fonts/CustomFont-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/CustomFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/CustomFont-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/CustomFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom',  // CSS variable name
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],  // Fallback fonts
  preload: true,  // Preload font
  adjustFontFallback: true,  // Adjust fallback metrics
});

// Using CSS variable
export default function Layout({ children }) {
  return (
    <html lang="en" className={customFont.variable}>
      <body className="font-custom">{children}</body>
    </html>
  );
}

// Or using className
export default function Layout({ children }) {
  return (
    <html lang="en" className={customFont.className}>
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Font Display Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Font Display Strategies
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control how fonts are displayed during loading to prevent layout
            shift and improve performance.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            display: 'swap' (Default)
          </h3>
          <CodeBlock
            code={`// Shows fallback immediately, swaps when font loads
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',  // Default, recommended
});

// Benefits:
// - Text visible immediately (uses fallback)
// - Swaps to custom font when ready
// - Prevents invisible text
// - Best for most use cases

export default function Layout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Other Display Options
          </h3>
          <CodeBlock
            code={`// display: 'optional'
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'optional',  // Only use if available quickly
});

// Shows fallback, uses custom font only if loaded quickly
// Good for slow connections

// display: 'block'
const inter = Inter({ 
  subsets: ['latin'],
  display: 'block',  // Block text until font loads
});

// Text invisible until font loads
// Use only if you must avoid FOUT

// display: 'fallback'
const inter = Inter({ 
  subsets: ['latin'],
  display: 'fallback',  // Short block period, then fallback
});

// Blocks briefly, then uses fallback if not loaded
// Good balance between swap and block`}
            language="javascript"
          />
        </section>

        {/* Section 5: Variable Fonts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Variable Fonts
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use variable fonts for flexible weight and width control with a
            single font file.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Variable Font from Google
          </h3>
          <CodeBlock
            code={`// Using variable fonts from Google Fonts
import { Inter, Roboto_Flex } from 'next/font/google';

// Inter supports variable weights
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

// Roboto Flex - full variable font
const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
});

export default function Layout({ children }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${robotoFlex.variable}\`}>
      <body>{children}</body>
    </html>
  );
}

// Using variable weights with CSS
// globals.css
// .font-inter {
//   font-family: var(--font-inter);
// }
// .weight-100 { font-variation-settings: 'wght' 100; }
// .weight-900 { font-variation-settings: 'wght' 900; }`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Variable Local Font
          </h3>
          <CodeBlock
            code={`// Variable font from local file
import localFont from 'next/font/local';

const variableFont = localFont({
  src: './fonts/VariableFont.woff2',
  display: 'swap',
  variable: '--font-variable',
  weight: '100 900',  // Variable weight range
});

export default function Layout({ children }) {
  return (
    <html lang="en" className={variableFont.variable}>
      <body>{children}</body>
    </html>
  );
}

// Using variable weights in CSS
export default function Page() {
  return (
    <div>
      <h1 style={{ fontVariationSettings: "'wght' 300" }}>
        Light (300)
      </h1>
      <h1 style={{ fontVariationSettings: "'wght' 500" }}>
        Medium (500)
      </h1>
      <h1 style={{ fontVariationSettings: "'wght' 700" }}>
        Bold (700)
      </h1>
      <h1 style={{ fontVariationSettings: "'wght' 900" }}>
        Black (900)
      </h1>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Font Preloading */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Font Preloading
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Preload critical fonts to improve performance and prevent layout
            shift.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Automatic Preloading
          </h3>
          <CodeBlock
            code={`// next/font automatically preloads fonts
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  preload: true,  // Default, fonts are preloaded
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Next.js automatically adds: */}
        {/* <link rel="preload" href="/_next/static/fonts/..." as="font" /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}

// Disable preload if needed
const inter = Inter({ 
  subsets: ['latin'],
  preload: false,  // Don't preload
});`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Font Subsetting and Optimization
          </h3>
          <CodeBlock
            code={`// Optimize font loading
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],  // Only load Latin characters
  preload: true,  // Preload for faster rendering
  display: 'swap',  // Prevent invisible text
  adjustFontFallback: true,  // Adjust fallback metrics
  fallback: ['Arial', 'sans-serif'],  // Fallback fonts
});

// adjustFontFallback automatically:
// - Calculates fallback font metrics
// - Prevents layout shift
// - Matches line height and size

export default function Layout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

// Best practices:
// 1. Use only needed subsets
// 2. Enable preload for critical fonts
// 3. Use display: 'swap'
// 4. Enable adjustFontFallback
// 5. Provide good fallbacks`}
            language="javascript"
          />
        </section>

        {/* Section 7: CSS Variables */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. CSS Variables
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use CSS variables for flexible font usage across your application.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using CSS Variables
          </h3>
          <CodeBlock
            code={`// Define font with CSS variable
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${roboto.variable}\`}>
      <body>{children}</body>
    </html>
  );
}

// Use in CSS or Tailwind
// globals.css
// :root {
//   font-family: var(--font-inter);
// }
// .heading {
//   font-family: var(--font-roboto);
// }

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         inter: ['var(--font-inter)'],
//         roboto: ['var(--font-roboto)'],
//       },
//     },
//   },
// }

// Using in components
export default function Page() {
  return (
    <div className="font-inter">
      <h1 className="font-roboto">Roboto Heading</h1>
      <p>Inter body text</p>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b8/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B8.2 next/script
          </Link>
          <Link
            href="/learn/app-router/b9"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B9 Middleware →
          </Link>
        </div>
      </div>
    </div>
  );
}
