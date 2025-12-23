import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B9.3: CSS-in-JS - Next.js Mastery",
  description: "Complete guide to CSS-in-JS in Next.js App Router",
};

export default function Lesson3Page() {
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
          B9.3: CSS-in-JS
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use CSS-in-JS solutions in Next.js App Router:
          styled-components, Emotion, Styled JSX, and theme providers. Note:
          CSS-in-JS only works in Client Components.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: styled-components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. styled-components (Client Components)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              styled-components
            </code>{" "}
            allows you to write CSS-in-JS. It must be used in Client Components.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Setup styled-components
          </h3>
          <CodeBlock
            code={`// Install: npm install styled-components
// Note: styled-components only works in Client Components

// app/providers.js (or app/layout.js)
'use client'

import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#e0e0e0',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
};

export function StyledComponentsProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

// app/layout.js
import { StyledComponentsProvider } from './providers';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsProvider>
          {children}
        </StyledComponentsProvider>
      </body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic styled-components Usage
          </h3>
          <CodeBlock
            code={`// app/components/Button.js
'use client'

import styled from 'styled-components';

const StyledButton = styled.button\`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #0051cc;
  }
  
  &:active {
    transform: scale(0.98);
  }
\`;

export default function Button({ children, onClick }) {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
}

// Using the component
import Button from '@/components/Button';

export default function Page() {
  return <Button onClick={() => alert('Clicked')}>Click me</Button>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            styled-components with Props
          </h3>
          <CodeBlock
            code={`// app/components/Button.js
'use client'

import styled from 'styled-components';

const StyledButton = styled.button\`
  background-color: \${props => props.variant === 'primary' ? '#0070f3' : '#e0e0e0'};
  color: \${props => props.variant === 'primary' ? 'white' : 'black'};
  padding: \${props => props.size === 'large' ? '16px 32px' : '12px 24px'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
\`;

export default function Button({ variant = 'primary', size = 'medium', children, disabled }) {
  return (
    <StyledButton variant={variant} size={size} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

// Using
<Button variant="primary" size="large">Large Primary</Button>
<Button variant="secondary" size="medium">Medium Secondary</Button>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            styled-components with Theme
          </h3>
          <CodeBlock
            code={`// app/components/Button.js
'use client'

import styled from 'styled-components';

const StyledButton = styled.button\`
  background-color: \${props => props.theme.colors.primary};
  color: \${props => props.theme.colors.text};
  padding: \${props => props.theme.spacing.md} \${props => props.theme.spacing.lg};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: \${props => props.theme.typography.fontSize};
  
  &:hover {
    background-color: \${props => props.theme.colors.primaryHover};
  }
\`;

export default function Button({ children }) {
  return <StyledButton>{children}</StyledButton>;
}

// Theme provider
'use client'

import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#0070f3',
    primaryHover: '#0051cc',
    text: '#333',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
  typography: {
    fontSize: '16px',
  },
};

export function AppThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Emotion */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Emotion (Client Components)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              Emotion
            </code>{" "}
            is a performant CSS-in-JS library. It must be used in Client
            Components.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Setup Emotion
          </h3>
          <CodeBlock
            code={`// Install: npm install @emotion/react @emotion/styled

// next.config.js
const nextConfig = {
  compiler: {
    emotion: true,  // Enable Emotion compiler
  },
};

module.exports = nextConfig;

// app/layout.js (no provider needed with compiler)
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// Or with provider (if not using compiler)
'use client'

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({ key: 'css', prepend: true });

export function EmotionProvider({ children }) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Emotion Usage
          </h3>
          <CodeBlock
            code={`// app/components/Button.js
'use client'

import styled from '@emotion/styled';

const StyledButton = styled.button\`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0051cc;
  }
\`;

export default function Button({ children }) {
  return <StyledButton>{children}</StyledButton>;
}

// Or using css prop
'use client'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const buttonStyles = css\`
  background-color: #0070f3;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0051cc;
  }
\`;

export default function Button({ children }) {
  return <button css={buttonStyles}>{children}</button>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Emotion with Props and Theme
          </h3>
          <CodeBlock
            code={`// app/components/Button.js
'use client'

import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

const StyledButton = styled.button\`
  background-color: \${props => 
    props.variant === 'primary' 
      ? props.theme.colors.primary 
      : props.theme.colors.secondary
  };
  color: \${props => props.theme.colors.text};
  padding: \${props => props.theme.spacing.md};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
\`;

export default function Button({ variant, children, disabled }) {
  const theme = useTheme();
  
  return (
    <StyledButton variant={variant} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

// Theme provider
'use client'

import { ThemeProvider } from '@emotion/react';

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#e0e0e0',
    text: '#333',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
};

export function AppThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Styled JSX */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Styled JSX
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              styled-jsx
            </code>{" "}
            is built into Next.js and provides scoped CSS without additional
            setup.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Styled JSX
          </h3>
          <CodeBlock
            code={`// Styled JSX is built into Next.js
// No installation needed

// app/components/Button.js
export default function Button({ children }) {
  return (
    <>
      <button className="button">
        {children}
      </button>
      <style jsx>{\`
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
      \`}</style>
    </>
  );
}

// Or using template literal
export default function Button({ children }) {
  return (
    <>
      <button>
        {children}
      </button>
      <style jsx>{\`
        button {
          background-color: #0070f3;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      \`}</style>
    </>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Styled JSX with Dynamic Styles
          </h3>
          <CodeBlock
            code={`// app/components/Button.js
export default function Button({ variant, children }) {
  const backgroundColor = variant === 'primary' ? '#0070f3' : '#e0e0e0';
  const color = variant === 'primary' ? 'white' : 'black';
  
  return (
    <>
      <button className="button">
        {children}
      </button>
      <style jsx>{\`
        .button {
          background-color: \${backgroundColor};
          color: \${color};
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
        }
      \`}</style>
    </>
  );
}

// Using CSS variables
export default function Button({ children }) {
  return (
    <>
      <button className="button">
        {children}
      </button>
      <style jsx>{\`
        .button {
          background-color: var(--color-primary, #0070f3);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
        }
      \`}</style>
    </>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Global Styles with Styled JSX
          </h3>
          <CodeBlock
            code={`// Global styles with styled-jsx
// app/components/Layout.js
export default function Layout({ children }) {
  return (
    <>
      <div className="container">
        {children}
      </div>
      <style jsx global>{\`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
      \`}</style>
    </>
  );
}

// Scoped vs Global
export default function Component() {
  return (
    <>
      <div className="local">Local scoped</div>
      <div className="global">Global style</div>
      
      <style jsx>{\`
        .local {
          color: blue;  // Scoped to this component
        }
      \`}</style>
      
      <style jsx global>{\`
        .global {
          color: red;  // Global, affects all .global elements
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
            Use theme providers to share design tokens and theme configuration
            across your application.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            styled-components Theme Provider
          </h3>
          <CodeBlock
            code={`// app/providers.js
'use client'

import { ThemeProvider } from 'styled-components';

const lightTheme = {
  colors: {
    primary: '#0070f3',
    secondary: '#e0e0e0',
    background: '#ffffff',
    text: '#171717',
    border: '#e0e0e0',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '16px',
  },
};

const darkTheme = {
  colors: {
    primary: '#0070f3',
    secondary: '#333',
    background: '#0a0a0a',
    text: '#ededed',
    border: '#333',
  },
  spacing: { ...lightTheme.spacing },
  typography: { ...lightTheme.typography },
};

export function StyledComponentsThemeProvider({ children, theme = 'light' }) {
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  
  return (
    <ThemeProvider theme={currentTheme}>
      {children}
    </ThemeProvider>
  );
}

// Using with theme toggle
'use client'

import { useState } from 'react';
import { StyledComponentsThemeProvider } from './providers';

export default function AppLayout({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <StyledComponentsThemeProvider theme={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      {children}
    </StyledComponentsThemeProvider>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Emotion Theme Provider
          </h3>
          <CodeBlock
            code={`// app/providers.js
'use client'

import { ThemeProvider } from '@emotion/react';

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#e0e0e0',
    background: '#ffffff',
    text: '#171717',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export function EmotionThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

// Using theme in components
'use client'

import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

const Container = styled.div\`
  background-color: \${props => props.theme.colors.background};
  color: \${props => props.theme.colors.text};
  padding: \${props => props.theme.spacing.lg};
  
  @media (min-width: \${props => props.theme.breakpoints.md}) {
    padding: \${props => props.theme.spacing.xl};
  }
\`;

export default function Component() {
  const theme = useTheme();
  return <Container>Content</Container>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Custom Theme Provider
          </h3>
          <CodeBlock
            code={`// app/contexts/ThemeContext.js
'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  const themeConfig = {
    colors: {
      primary: theme === 'light' ? '#0070f3' : '#0070f3',
      background: theme === 'light' ? '#ffffff' : '#0a0a0a',
      text: theme === 'light' ? '#171717' : '#ededed',
    },
    spacing: {
      sm: '8px',
      md: '16px',
      lg: '24px',
    },
  };
  
  return (
    <ThemeContext.Provider value={{ theme, themeConfig, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Using in components
'use client'

import { useTheme } from '@/contexts/ThemeContext';

export default function Component() {
  const { themeConfig, toggleTheme } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: themeConfig.colors.background,
      color: themeConfig.colors.text 
    }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b9/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B9.2 Global CSS
          </Link>
          <Link
            href="/learn/app-router/b9/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B9.4 Sass/SCSS →
          </Link>
        </div>
      </div>
    </div>
  );
}
