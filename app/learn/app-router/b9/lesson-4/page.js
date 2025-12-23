import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B9.4: Sass/SCSS - Next.js Mastery",
  description: "Complete guide to Sass/SCSS in Next.js App Router",
};

export default function Lesson4Page() {
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
          B9.4: Sass/SCSS
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use Sass/SCSS in Next.js App Router: setup, variables and
          mixins, and nested styles.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Setup */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Setup
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Install and configure Sass/SCSS support in Next.js.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installing Sass
          </h3>
          <CodeBlock
            code={`// Install Sass
npm install sass

// Or with yarn
yarn add sass

// Or with pnpm
pnpm add sass

// Next.js automatically configures Sass
// No additional configuration needed!`}
            language="bash"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Sass Usage
          </h3>
          <CodeBlock
            code={`// app/page.module.scss (SCSS syntax)
.button {
  background-color: #0070f3;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0051cc;
  }
}

// app/page.js
import styles from './page.module.scss';

export default function Page() {
  return <button className={styles.button}>Click me</button>;
}

// Or with .sass syntax (indented)
// app/page.module.sass
.button
  background-color: #0070f3
  color: white
  padding: 12px 24px
  
  &:hover
    background-color: #0051cc`}
            language="javascript"
          />
        </section>

        {/* Section 2: Variables and Mixins */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Variables and Mixins
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use Sass variables and mixins for reusable styles.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Sass Variables
          </h3>
          <CodeBlock
            code={`// app/styles/_variables.scss
// Colors
$primary-color: #0070f3;
$secondary-color: #e0e0e0;
$text-color: #333;
$background-color: #fff;

// Spacing
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// Typography
$font-size-sm: 14px;
$font-size-base: 16px;
$font-size-lg: 18px;
$font-size-xl: 24px;

// Breakpoints
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;

// app/components/Button/Button.module.scss
@import '../styles/variables';

.button {
  background-color: $primary-color;
  color: white;
  padding: $spacing-md $spacing-lg;
  font-size: $font-size-base;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}`}
            language="scss"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Sass Mixins
          </h3>
          <CodeBlock
            code={`// app/styles/_mixins.scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button-reset {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

@mixin responsive($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: 640px) {
      @content;
    }
  } @else if $breakpoint == md {
    @media (min-width: 768px) {
      @content;
    }
  } @else if $breakpoint == lg {
    @media (min-width: 1024px) {
      @content;
    }
  }
}

@mixin card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

// app/components/Button/Button.module.scss
@import '../styles/mixins';

.button {
  @include button-reset;
  @include flex-center;
  background-color: #0070f3;
  color: white;
  padding: 12px 24px;
  
  @include responsive(md) {
    padding: 16px 32px;
    font-size: 18px;
  }
}

// app/components/Card/Card.module.scss
@import '../styles/mixins';

.card {
  @include card;
  
  .title {
    font-size: 24px;
    margin-bottom: 10px;
  }
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
            Use Sass nesting to organize styles hierarchically.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Nesting
          </h3>
          <CodeBlock
            code={`// app/components/Card/Card.module.scss
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  
  // Nested title
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  // Nested content
  .content {
    color: #666;
    line-height: 1.6;
    
    // Nested paragraph
    p {
      margin-bottom: 16px;
      
      // Nested link
      a {
        color: #0070f3;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  
  // Nested button
  .button {
    background-color: #0070f3;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #0051cc;
    }
  }
}

// Compiled CSS:
// .Card_card__abc123 { ... }
// .Card_card__abc123 .title { ... }
// .Card_card__abc123 .content { ... }
// .Card_card__abc123 .content p { ... }
// .Card_card__abc123 .content p a { ... }
// .Card_card__abc123 .content p a:hover { ... }`}
            language="scss"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Pseudo-classes and Pseudo-elements
          </h3>
          <CodeBlock
            code={`// app/components/Button/Button.module.scss
.button {
  background-color: #0070f3;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  // Pseudo-classes
  &:hover {
    background-color: #0051cc;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:focus {
    outline: 2px solid #0070f3;
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  // Pseudo-elements
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  &::after {
    content: '';
    display: block;
  }
}

// Parent selector variations
.card {
  &--large {
    padding: 40px;
  }
  
  &__title {
    font-size: 24px;
  }
  
  &__content {
    color: #666;
  }
}

// Compiled:
// .card--large { ... }
// .card__title { ... }
// .card__content { ... }`}
            language="scss"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Media Query Nesting
          </h3>
          <CodeBlock
            code={`// app/components/Button/Button.module.scss
.button {
  background-color: #0070f3;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  // Media queries nested
  @media (min-width: 768px) {
    padding: 16px 32px;
    font-size: 18px;
  }
  
  @media (min-width: 1024px) {
    padding: 20px 40px;
    font-size: 20px;
  }
}

// Or using variables
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;

.container {
  padding: 20px;
  
  @media (min-width: $breakpoint-md) {
    padding: 32px;
  }
  
  @media (min-width: $breakpoint-lg) {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

// Nested within selectors
.card {
  padding: 20px;
  
  @media (min-width: 768px) {
    padding: 32px;
    
    .title {
      font-size: 28px;
    }
  }
}`}
            language="scss"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b9/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B9.3 CSS-in-JS
          </Link>
          <Link
            href="/learn/app-router/b9/lesson-5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B9.5 Tailwind CSS →
          </Link>
        </div>
      </div>
    </div>
  );
}
