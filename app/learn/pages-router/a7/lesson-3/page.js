import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A7.3: CSS-in-JS - Next.js Mastery",
  description: "Complete guide to CSS-in-JS in Next.js Pages Router",
};

export default function Lesson3Page() {
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
          A7.3: CSS-in-JS
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use CSS-in-JS libraries: styled-components, Emotion, and
          Styled JSX in Next.js Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Styled-components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Styled-components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use styled-components for component-scoped styling with JavaScript.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installation
          </h3>
          <CodeBlock
            code={`npm install styled-components
npm install --save-dev @types/styled-components`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`// components/Button.js
import styled from 'styled-components';

const Button = styled.button\`
  padding: 10px 20px;
  background: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: darkblue;
  }
\`;

export default function MyButton({ children }) {
  return <Button>{children}</Button>;
}

// With props
const Button = styled.button\`
  padding: 10px 20px;
  background: \${props => props.primary ? 'blue' : 'gray'};
  color: white;
  border: none;
  border-radius: 4px;
\`;

<Button primary>Primary</Button>
<Button>Secondary</Button>

// Extending styles
const PrimaryButton = styled(Button)\`
  background: blue;
  font-weight: bold;
\`;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            SSR Setup (Required)
          </h3>
          <CodeBlock
            code={`// pages/_document.js
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      
      const initialProps = await Document.getInitialProps(ctx);
      
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  
  render() {
    return (
      <Html>
        <Head>
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Emotion */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Emotion
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use Emotion for performant CSS-in-JS with excellent developer
            experience.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installation
          </h3>
          <CodeBlock
            code={`npm install @emotion/react @emotion/styled`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`// components/Button.js
import styled from '@emotion/styled';

const Button = styled.button\`
  padding: 10px 20px;
  background: blue;
  color: white;
  border: none;
  border-radius: 4px;
  
  &:hover {
    background: darkblue;
  }
\`;

export default function MyButton({ children }) {
  return <Button>{children}</Button>;
}

// Using css prop
import { css } from '@emotion/react';

const buttonStyle = css\`
  padding: 10px 20px;
  background: blue;
  color: white;
\`;

export default function Button() {
  return <button css={buttonStyle}>Click me</button>;
}

// With props
const Button = styled.button\`
  padding: 10px 20px;
  background: \${props => props.variant === 'primary' ? 'blue' : 'gray'};
  color: white;
\`;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            SSR Setup
          </h3>
          <CodeBlock
            code={`// pages/_document.js
import Document from 'next/document';
import { extractCritical } from '@emotion/server';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }
  
  render() {
    return (
      <Html>
        <Head>
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Styled JSX */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Styled JSX (Built-in)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Styled JSX is built into Next.js and requires no additional setup.
          </p>

          <CodeBlock
            code={`// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <style jsx>{\`
        h1 {
          color: blue;
          font-size: 2rem;
        }
        div {
          padding: 2rem;
        }
      \`}</style>
    </div>
  );
}

// Scoped styles (default)
export default function Button() {
  return (
    <>
      <button className="btn">Click me</button>
      <style jsx>{\`
        .btn {
          padding: 10px 20px;
          background: blue;
          color: white;
        }
      \`}</style>
    </>
  );
}

// Global styles
export default function Page() {
  return (
    <div>
      <h1 className="global-title">Title</h1>
      <style jsx global>{\`
        .global-title {
          font-size: 3rem;
          color: red;
        }
      \`}</style>
    </div>
  );
}

// Dynamic styles
export default function Button({ color }) {
  return (
    <>
      <button>Click me</button>
      <style jsx>{\`
        button {
          background: \${color};
          padding: 10px 20px;
        }
      \`}</style>
    </>
  );
}

// With CSS modules-like composition
export default function Button() {
  return (
    <>
      <button className="btn primary">Click me</button>
      <style jsx>{\`
        .btn {
          padding: 10px 20px;
          border: none;
        }
        .primary {
          background: blue;
          color: white;
        }
      \`}</style>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Theme Providers */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Theme Providers
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set up theme providers for consistent theming across your
            application.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Styled-components Theme
          </h3>
          <CodeBlock
            code={`// pages/_app.js
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#7928ca',
    success: '#0070f3',
    error: '#e00',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
  },
};

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// Using theme in components
import styled from 'styled-components';

const Button = styled.button\`
  background: \${props => props.theme.colors.primary};
  padding: \${props => props.theme.spacing.md};
  
  @media (max-width: \${props => props.theme.breakpoints.mobile}) {
    padding: \${props => props.theme.spacing.sm};
  }
\`;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Emotion Theme
          </h3>
          <CodeBlock
            code={`// pages/_app.js
import { ThemeProvider } from '@emotion/react';

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#7928ca',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
  },
};

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// Using theme
import styled from '@emotion/styled';

const Button = styled.button\`
  background: \${props => props.theme.colors.primary};
  padding: \${props => props.theme.spacing.md};
\`;

// Or with useTheme hook
import { useTheme } from '@emotion/react';

export default function Button() {
  const theme = useTheme();
  
  return (
    <button style={{ background: theme.colors.primary }}>
      Click me
    </button>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a7/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A7.2 Global CSS
          </Link>
          <Link
            href="/learn/pages-router/a7/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A7.4 Sass/SCSS →
          </Link>
        </div>
      </div>
    </div>
  );
}
