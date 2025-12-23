import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B9.1: CSS Modules - Next.js Mastery",
  description: "Complete guide to CSS Modules in Next.js App Router",
};

export default function Lesson1Page() {
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
          B9.1: CSS Modules
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use CSS Modules in Next.js App Router: file naming,
          scoped styles, composition, and global styles.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: File Naming */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. File Naming (`*.module.css`)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            CSS Modules use the{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              *.module.css
            </code>{" "}
            naming convention to create scoped styles automatically.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic CSS Module File
          </h3>
          <CodeBlock
            code={`// components/Button/Button.module.css
.button {
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0051cc;
}

// components/Button/Button.js
import styles from './Button.module.css';

export default function Button({ children }) {
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
}

// Rendered class: Button_button__abc123
// Automatically scoped and unique`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            File Naming Conventions
          </h3>
          <CodeBlock
            code={`// ✅ Valid CSS Module file names:
// - Component.module.css
// - component.module.css
// - MyComponent.module.css

// ❌ Not CSS Modules (treated as global):
// - component.css
// - Component.css
// - styles.css

// Examples:
// components/Card/Card.module.css
// components/Header/Header.module.css
// app/dashboard/dashboard.module.css

// Component files
// components/Card/Card.js
import styles from './Card.module.css';  // ✅ CSS Module

// app/page.js
import styles from './page.module.css';  // ✅ CSS Module
import './global.css';  // ❌ Global CSS (no .module.)

export default function Card() {
  return <div className={styles.card}>Card</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Scoped Styles */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Scoped Styles
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            CSS Modules automatically scope class names to prevent style
            conflicts across components.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Scoping Works
          </h3>
          <CodeBlock
            code={`// components/Card/Card.module.css
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

// components/Card/Card.js
import styles from './Card.module.css';

export default function Card() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Card Title</h2>
      <p>Card content</p>
    </div>
  );
}

// Rendered HTML:
// <div class="Card_card__abc123">
//   <h2 class="Card_title__def456">Card Title</h2>
// </div>

// Class names are automatically transformed:
// .card → Card_card__abc123
// .title → Card_title__def456`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Classes
          </h3>
          <CodeBlock
            code={`// components/Button/Button.module.css
.button {
  padding: 12px 24px;
  border: none;
  cursor: pointer;
}

.primary {
  background-color: #0070f3;
  color: white;
}

.secondary {
  background-color: #e0e0e0;
  color: black;
}

.large {
  padding: 16px 32px;
  font-size: 18px;
}

// components/Button/Button.js
import styles from './Button.module.css';

export default function Button({ variant, size, children }) {
  // Combining multiple classes
  const className = \`\${styles.button} \${styles[variant]} \${styles[size]}\`;
  
  return (
    <button className={className}>
      {children}
    </button>
  );
}

// Or using template literals
const className = [
  styles.button,
  styles[variant],
  styles[size]
].filter(Boolean).join(' ');

// Or with clsx/classnames library
import clsx from 'clsx';

const className = clsx(styles.button, {
  [styles.primary]: variant === 'primary',
  [styles.secondary]: variant === 'secondary',
  [styles.large]: size === 'large',
});`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Conditional Classes
          </h3>
          <CodeBlock
            code={`// components/Alert/Alert.module.css
.alert {
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.warning {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
}

// components/Alert/Alert.js
import styles from './Alert.module.css';

export default function Alert({ type, message }) {
  const className = \`\${styles.alert} \${styles[type]}\`;
  
  return (
    <div className={className}>
      {message}
    </div>
  );
}

// Using
<Alert type="success" message="Operation successful!" />
<Alert type="error" message="Something went wrong!" />
<Alert type="warning" message="Please check your input." />`}
            language="javascript"
          />
        </section>

        {/* Section 3: Composition */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Composition
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Compose styles from other CSS Modules using the{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              compose
            </code>{" "}
            property or combine multiple classes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Composition
          </h3>
          <CodeBlock
            code={`// components/common/base.module.css
.base {
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
}

// components/Button/Button.module.css
.button {
  composes: base from '../common/base.module.css';
  background-color: #0070f3;
  color: white;
  border: none;
  cursor: pointer;
}

// components/Button/Button.js
import styles from './Button.module.css';

export default function Button({ children }) {
  // .button now includes .base styles
  return <button className={styles.button}>{children}</button>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Compositions
          </h3>
          <CodeBlock
            code={`// components/common/reset.module.css
.reset {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// components/common/typography.module.css
.heading {
  font-weight: bold;
  line-height: 1.2;
}

// components/Card/Card.module.css
.card {
  composes: reset from '../common/reset.module.css';
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.title {
  composes: heading from '../common/typography.module.css';
  composes: card;  // Also composes from same file
  font-size: 24px;
  margin-bottom: 10px;
}

// Result: .title includes both .heading and .card styles`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Composition Patterns
          </h3>
          <CodeBlock
            code={`// Shared component styles
// components/common/Button.module.css
.button {
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.primary {
  background-color: #0070f3;
  color: white;
}

.secondary {
  background-color: #e0e0e0;
  color: black;
}

// Extended button with composition
// components/IconButton/IconButton.module.css
.iconButton {
  composes: button from '../common/Button.module.css';
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
}

// components/IconButton/IconButton.js
import styles from './IconButton.module.css';

export default function IconButton({ icon, children }) {
  return (
    <button className={styles.iconButton}>
      {icon}
      {children}
    </button>
  );
}

// .iconButton now includes all .button styles plus its own`}
            language="javascript"
          />
        </section>

        {/* Section 4: Global Styles */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Global Styles
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              :global
            </code>{" "}
            to create global styles within CSS Modules for elements that
            shouldn't be scoped.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Global Selectors
          </h3>
          <CodeBlock
            code={`// components/Card/Card.module.css
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

// Global styles within module
:global(.global-button) {
  background-color: red;
  color: white;
}

// Global child selector
.card :global(h2) {
  margin: 0;
  font-size: 24px;
}

// Global descendant selector
.card :global(.content p) {
  color: #666;
  line-height: 1.6;
}

// components/Card/Card.js
import styles from './Card.module.css';

export default function Card() {
  return (
    <div className={styles.card}>
      {/* h2 is not scoped due to :global(h2) */}
      <h2>Card Title</h2>
      <div className="content">
        <p>This paragraph uses global styles</p>
      </div>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Global with CSS Modules
          </h3>
          <CodeBlock
            code={`// Combining scoped and global styles
// components/Article/Article.module.css
.article {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

// Scoped paragraph (only applies within .article)
.article .paragraph {
  margin-bottom: 16px;
  color: #333;
}

// Global paragraph (applies to all .paragraph inside .article)
.article :global(.paragraph) {
  margin-bottom: 16px;
  color: #333;
}

// Global class (can be used anywhere)
:global(.highlight) {
  background-color: yellow;
  padding: 2px 4px;
}

// Using global classes
// components/Article/Article.js
import styles from './Article.module.css';

export default function Article({ content }) {
  return (
    <article className={styles.article}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {/* .highlight class works globally */}
      <span className="highlight">Important!</span>
    </article>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Global CSS Variables
          </h3>
          <CodeBlock
            code={`// Define global CSS variables in CSS Module
// components/Theme/theme.module.css
:global(:root) {
  --primary-color: #0070f3;
  --secondary-color: #e0e0e0;
  --text-color: #333;
  --background-color: #fff;
  --spacing-unit: 8px;
}

// Use variables in scoped styles
// components/Button/Button.module.css
.button {
  background-color: var(--primary-color);
  color: white;
  padding: calc(var(--spacing-unit) * 2);
}

// Or define variables scoped to component
.card {
  --card-padding: 20px;
  --card-border-radius: 8px;
  
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
}

// Override variables
.largeCard {
  composes: card;
  --card-padding: 40px;
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Advanced Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Advanced CSS Module Patterns
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Advanced techniques for using CSS Modules effectively.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Class Names
          </h3>
          <CodeBlock
            code={`// components/Alert/Alert.module.css
.alert {
  padding: 16px;
  border-radius: 4px;
}

[data-type="success"] {
  background-color: #d4edda;
  color: #155724;
}

[data-type="error"] {
  background-color: #f8d7da;
  color: #721c24;
}

// components/Alert/Alert.js
import styles from './Alert.module.css';

export default function Alert({ type, message }) {
  return (
    <div 
      className={styles.alert}
      data-type={type}
    >
      {message}
    </div>
  );
}

// Or using computed class names
import styles from './Alert.module.css';

export default function Alert({ type, message }) {
  const typeClass = styles[type] || styles.default;
  
  return (
    <div className={\`\${styles.alert} \${typeClass}\`}>
      {message}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            TypeScript with CSS Modules
          </h3>
          <CodeBlock
            code={`// components/Button/Button.module.css
.button {
  background-color: #0070f3;
  color: white;
}

.primary {
  background-color: #0070f3;
}

.secondary {
  background-color: #e0e0e0;
}

// TypeScript automatically generates types
// components/Button/Button.tsx
import styles from './Button.module.css';

// TypeScript knows about .button, .primary, .secondary
export default function Button({ variant }: { variant: 'primary' | 'secondary' }) {
  return (
    <button className={\`\${styles.button} \${styles[variant]}\`}>
      Click me
    </button>
  );
}

// Or explicitly type
import styles from './Button.module.css';

interface ButtonProps {
  variant: keyof typeof styles;
}

export default function Button({ variant }: ButtonProps) {
  return <button className={styles[variant]}>Click me</button>;
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            CSS Module Best Practices
          </h3>
          <CodeBlock
            code={`// ✅ Best practices:

// 1. Co-locate CSS Modules with components
// components/Button/Button.js
// components/Button/Button.module.css

// 2. Use descriptive class names
// ✅ .card, .cardTitle, .cardContent
// ❌ .c, .t, .content

// 3. Keep modules focused
// ✅ One component per CSS Module
// ❌ Multiple unrelated components in one module

// 4. Use composition for shared styles
.primaryButton {
  composes: button from './Button.module.css';
  background-color: #0070f3;
}

// 5. Use CSS variables for theming
:root {
  --primary-color: #0070f3;
}

.button {
  background-color: var(--primary-color);
}

// 6. Minimize global styles
// Use :global() sparingly

// 7. Combine with utility classes
import styles from './Button.module.css';
import clsx from 'clsx';

export default function Button({ className, children }) {
  return (
    <button className={clsx(styles.button, className)}>
      {children}
    </button>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b8/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B8.3 next/font
          </Link>
          <Link
            href="/learn/app-router/b9/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B9.2 Global CSS →
          </Link>
        </div>
      </div>
    </div>
  );
}
