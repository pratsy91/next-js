import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A7.1: CSS Modules - Next.js Mastery",
  description: "Complete guide to CSS Modules in Next.js Pages Router",
};

export default function Lesson1Page() {
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
          A7.1: CSS Modules
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use CSS Modules for scoped, component-level styling in
          Next.js Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: File Naming */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. File Naming (*.module.css)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            CSS Modules use the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              *.module.css
            </code>{" "}
            naming convention to enable scoped styling.
          </p>

          <CodeBlock
            code={`// Component file
// components/Button.js
import styles from './Button.module.css';

export default function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}

// CSS Module file
// components/Button.module.css
.button {
  padding: 10px 20px;
  background: blue;
  color: white;
  border: none;
  border-radius: 4px;
}

// File naming rules:
// - Must end with .module.css
// - Can be .module.scss or .module.sass for Sass
// - Same directory as component (recommended)
// - Or in a styles/ directory`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Supported Extensions
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                *.module.css
              </code>{" "}
              - Standard CSS
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                *.module.scss
              </code>{" "}
              - SCSS (if Sass installed)
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                *.module.sass
              </code>{" "}
              - Sass (if Sass installed)
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                *.module.less
              </code>{" "}
              - Less (if Less installed)
            </li>
          </ul>
        </section>

        {/* Section 2: Scoped Styles */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Scoped Styles
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            CSS Modules automatically scope class names to prevent style
            conflicts.
          </p>

          <CodeBlock
            code={`// components/Button.module.css
.button {
  padding: 10px 20px;
  background: blue;
  color: white;
}

.primary {
  background: blue;
}

.secondary {
  background: gray;
}

// components/Button.js
import styles from './Button.module.css';

export default function Button({ variant, children }) {
  return (
    <button className={\`\${styles.button} \${styles[variant]}\`}>
      {children}
    </button>
  );
}

// Usage
<Button variant="primary">Click me</Button>
<Button variant="secondary">Cancel</Button>

// Generated class names (example):
// .Button_button__abc123
// .Button_primary__def456
// .Button_secondary__ghi789

// Styles are automatically scoped - no conflicts!`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Scoping Works
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Class names are hashed at build time</li>
            <li>Each module gets unique class names</li>
            <li>No style conflicts between components</li>
            <li>Styles are still CSS (not JavaScript)</li>
            <li>
              Works with all CSS features (pseudo-classes, media queries, etc.)
            </li>
          </ul>
        </section>

        {/* Section 3: Composition */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-900 dark:text-white">
            3. Composition
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Compose styles from multiple classes using CSS Modules composition.
          </p>

          <CodeBlock
            code={`// components/Button.module.css
.base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  composes: base;
  background: blue;
  color: white;
}

.secondary {
  composes: base;
  background: gray;
  color: white;
}

.large {
  padding: 15px 30px;
  font-size: 18px;
}

// Multiple compositions
.primaryLarge {
  composes: primary large;
}

// components/Button.js
import styles from './Button.module.css';

export default function Button({ variant, size, children }) {
  const className = size === 'large' 
    ? styles[\`\${variant}Large\`]
    : styles[variant];
  
  return <button className={className}>{children}</button>;
}

// Composition from other modules
// components/Button.module.css
.common {
  composes: base from './common.module.css';
  /* additional styles */
}

// Multiple compositions
.button {
  composes: base from './common.module.css';
  composes: interactive from './utils.module.css';
  /* additional styles */
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Global Styles in Modules */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Global Styles in Modules
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              :global
            </code>{" "}
            to create global styles within CSS Modules.
          </p>

          <CodeBlock
            code={`// components/Button.module.css
/* Scoped style */
.button {
  padding: 10px 20px;
}

/* Global style */
:global(.global-class) {
  color: red;
}

/* Global selector */
.button :global(.icon) {
  margin-right: 5px;
}

/* Multiple global selectors */
:global(.dark) .button {
  background: black;
  color: white;
}

// Usage in component
import styles from './Button.module.css';

export default function Button({ children }) {
  return (
    <button className={styles.button}>
      <span className="icon">★</span>
      {children}
    </button>
  );
}

// Global styles apply to entire document
// Use sparingly - prefer scoped styles`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            When to Use :global
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Third-party component styles</li>
            <li>Global utility classes</li>
            <li>CSS resets within modules</li>
            <li>Overriding external library styles</li>
            <li>Use sparingly - prefer scoped styles</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a7"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to A7 Lessons
          </Link>
          <Link
            href="/learn/pages-router/a7/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A7.2 Global CSS →
          </Link>
        </div>
      </div>
    </div>
  );
}
