import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A7.4: Sass/SCSS - Next.js Mastery",
  description: "Complete guide to Sass/SCSS in Next.js Pages Router",
};

export default function Lesson4Page() {
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
          A7.4: Sass/SCSS
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use Sass/SCSS for advanced CSS features like variables,
          mixins, and nested styles in Next.js Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Setup and Configuration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Setup and Configuration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Install and configure Sass/SCSS in your Next.js project.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installation
          </h3>
          <CodeBlock code={`npm install sass`} language="bash" />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`// Import SCSS files
// pages/_app.js
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// Component-level SCSS
// components/Button.js
import styles from './Button.module.scss';

export default function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}

// components/Button.module.scss
.button {
  padding: 10px 20px;
  background: blue;
  color: white;
}

// File extensions supported:
// - .scss (SCSS syntax - recommended)
// - .sass (Sass syntax - indented)`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Configuration
          </h3>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: \`@import "variables.scss";\`,
  },
};

// Or with additional options
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    outputStyle: 'compressed', // or 'expanded'
    sourceMap: true,
  },
};`}
            language="javascript"
          />
        </section>

        {/* Section 2: Variables and Mixins */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Variables and Mixins
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use Sass variables and mixins for reusable styles and logic.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Variables
          </h3>
          <CodeBlock
            code={`// styles/variables.scss
// SCSS variables (use $)
$primary-color: #0070f3;
$secondary-color: #7928ca;
$font-size-base: 16px;
$spacing-unit: 8px;

// Using variables
.button {
  background: $primary-color;
  font-size: $font-size-base;
  padding: $spacing-unit * 2;
}

// Variable scope
$global-color: blue;

.component {
  $local-color: red; // Local to this block
  color: $local-color;
  border-color: $global-color;
}

// Variable interpolation
$property: color;
$value: blue;

.element {
  #{$property}: $value; // Results in: color: blue;
}`}
            language="scss"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Mixins
          </h3>
          <CodeBlock
            code={`// styles/mixins.scss
// Define mixin
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

// Mixin with parameters
@mixin button-variant($bg-color, $text-color) {
  background: $bg-color;
  color: $text-color;
  
  &:hover {
    background: darken($bg-color, 10%);
  }
}

@mixin responsive($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}

// Using mixins
.button {
  @include button-base;
  @include button-variant(blue, white);
  @include flex-center;
}

// Using mixin with content block
.container {
  @include responsive(768px) {
    padding: 1rem;
    font-size: 14px;
  }
}

// Import mixins
@import './mixins';

.button {
  @include button-base;
}`}
            language="scss"
          />
        </section>

        {/* Section 3: Nested Styles */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Nested Styles
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use Sass nesting to write more organized and maintainable CSS.
          </p>

          <CodeBlock
            code={`// styles/components.scss
// Basic nesting
.button {
  padding: 10px 20px;
  background: blue;
  
  &:hover {
    background: darkblue;
  }
  
  &:active {
    background: navy;
  }
  
  &.primary {
    background: blue;
  }
  
  &.secondary {
    background: gray;
  }
}

// Nested selectors
.card {
  padding: 1rem;
  border: 1px solid #ccc;
  
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .content {
    margin-top: 1rem;
  }
  
  .footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #ccc;
  }
}

// Pseudo-elements and pseudo-classes
.link {
  color: blue;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:visited {
    color: purple;
  }
  
  &::before {
    content: '→ ';
  }
}

// Media queries nesting
.container {
  width: 100%;
  
  @media (min-width: 768px) {
    width: 750px;
    margin: 0 auto;
  }
  
  @media (min-width: 1024px) {
    width: 1000px;
  }
}

// Parent selector (&)
.button {
  background: blue;
  
  .dark & {
    background: lightblue;
  }
  
  body.dark & {
    background: darkblue;
  }
}

// Compiled output:
// .button { background: blue; }
// .dark .button { background: lightblue; }
// body.dark .button { background: darkblue; }`}
            language="scss"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Best Practices
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Don't nest more than 3-4 levels deep</li>
            <li>Use nesting for related styles</li>
            <li>Avoid overly specific selectors</li>
            <li>Keep nesting shallow for maintainability</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a7/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A7.3 CSS-in-JS
          </Link>
          <Link
            href="/learn/pages-router/a7/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A7.5 Tailwind CSS →
          </Link>
        </div>
      </div>
    </div>
  );
}
