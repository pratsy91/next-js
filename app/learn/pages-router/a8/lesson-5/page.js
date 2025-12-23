import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A8.5: Environment Variables - Next.js Mastery",
  description:
    "Complete guide to environment variables in Next.js Pages Router",
};

export default function Lesson5Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a8"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A8 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A8.5: Environment Variables
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use environment variables in Next.js Pages Router: public
          vs server-only, runtime vs build-time.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Public Variables (NEXT_PUBLIC_*) */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Public Variables (NEXT_PUBLIC_*)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Variables prefixed with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NEXT_PUBLIC_
            </code>{" "}
            are exposed to the browser.
          </p>

          <CodeBlock
            code={`// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_ANALYTICS_ID=UA-123456789

// Using in client-side code
// pages/index.js
export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  
  return (
    <div>
      <h1>{appName}</h1>
      <p>API URL: {apiUrl}</p>
    </div>
  );
}

// Using in client-side JavaScript
// components/Analytics.js
export default function Analytics() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  
  useEffect(() => {
    // Initialize analytics
    gtag('config', analyticsId);
  }, [analyticsId]);
  
  return null;
}

// Important: NEXT_PUBLIC_ variables are embedded in the client bundle
// Never put sensitive data in NEXT_PUBLIC_ variables!

// ❌ DON'T DO THIS:
NEXT_PUBLIC_SECRET_KEY=secret123  // Exposed to browser!

// ✅ DO THIS:
SECRET_KEY=secret123  // Server-only`}
            language="javascript"
          />
        </section>

        {/* Section 2: Server-only Variables */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Server-only Variables
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Variables without{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              NEXT_PUBLIC_
            </code>{" "}
            prefix are only available on the server.
          </p>

          <CodeBlock
            code={`// .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/db
API_SECRET_KEY=secret123
JWT_SECRET=my-jwt-secret

// Using in server-side code
// pages/api/users.js
export default async function handler(req, res) {
  const dbUrl = process.env.DATABASE_URL;
  const apiSecret = process.env.API_SECRET_KEY;
  
  // Connect to database
  const db = await connect(dbUrl);
  
  // Use secret key
  const token = sign({ userId: 123 }, apiSecret);
  
  res.json({ token });
}

// Using in getServerSideProps
// pages/profile.js
export async function getServerSideProps() {
  const apiKey = process.env.API_SECRET_KEY;
  
  const response = await fetch('https://api.example.com/data', {
    headers: {
      'Authorization': \`Bearer \${apiKey}\`,
    },
  });
  
  const data = await response.json();
  
  return {
    props: {
      data,
    },
  };
}

// Using in getStaticProps
// pages/blog/[slug].js
export async function getStaticProps({ params }) {
  const dbUrl = process.env.DATABASE_URL;
  
  const post = await getPostFromDatabase(dbUrl, params.slug);
  
  return {
    props: {
      post,
    },
  };
}

// Server-only variables are NOT accessible in client-side code
// pages/index.js
export default function Home() {
  // ❌ This will be undefined in the browser
  const secret = process.env.API_SECRET_KEY;
  
  return <div>{secret}</div>; // undefined
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Runtime vs Build-time */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Runtime vs Build-time
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Understand when environment variables are evaluated: at build time
            or runtime.
          </p>

          <CodeBlock
            code={`// Build-time variables (embedded during build)
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com

// These are embedded at build time
// Changing them requires a rebuild

// Runtime variables (evaluated at request time)
// .env.local
DATABASE_URL=postgresql://localhost:5432/db

// Available in:
// - getServerSideProps (runtime)
// - API routes (runtime)
// - getStaticProps (build-time for static pages)

// getServerSideProps - Runtime
// pages/dynamic.js
export async function getServerSideProps() {
  // This runs on every request
  const dbUrl = process.env.DATABASE_URL; // Runtime value
  const data = await fetchData(dbUrl);
  
  return {
    props: {
      data,
    },
  };
}

// getStaticProps - Build-time (for static pages)
// pages/blog/[slug].js
export async function getStaticProps({ params }) {
  // This runs at build time
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Build-time value
  
  const post = await fetch(\`\${apiUrl}/posts/\${params.slug}\`);
  
  return {
    props: {
      post: await post.json(),
    },
  };
}

// API Routes - Runtime
// pages/api/data.js
export default async function handler(req, res) {
  // This runs on every request
  const secret = process.env.API_SECRET_KEY; // Runtime value
  
  const data = await fetchData(secret);
  
  res.json({ data });
}

// Client-side - Build-time
// pages/index.js
export default function Home() {
  // This is embedded at build time
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return <div>API: {apiUrl}</div>;
}

// Environment-specific files
// .env.development.local (development only)
// .env.production.local (production only)
// .env.local (all environments, gitignored)
// .env (all environments, committed)`}
            language="javascript"
          />
        </section>

        {/* Section 4: TypeScript Types */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. TypeScript Types
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add TypeScript types for environment variables for better type
            safety.
          </p>

          <CodeBlock
            code={`// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // Public variables
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_ANALYTICS_ID: string;
    
    // Server-only variables
    DATABASE_URL: string;
    API_SECRET_KEY: string;
    JWT_SECRET: string;
    
    // Optional variables
    OPTIONAL_VAR?: string;
  }
}

// Using typed environment variables
// pages/index.tsx
export default function Home() {
  // TypeScript knows the type
  const apiUrl: string = process.env.NEXT_PUBLIC_API_URL;
  const appName: string = process.env.NEXT_PUBLIC_APP_NAME;
  
  return (
    <div>
      <h1>{appName}</h1>
      <p>API: {apiUrl}</p>
    </div>
  );
}

// API route with types
// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TypeScript knows the type
  const dbUrl: string = process.env.DATABASE_URL;
  const apiSecret: string = process.env.API_SECRET_KEY;
  
  // Use variables
  const data = await fetchData(dbUrl, apiSecret);
  
  res.json({ data });
}

// Type-safe environment variable accessor
// lib/env.ts
export const env = {
  // Public
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME!,
  
  // Server-only
  DATABASE_URL: process.env.DATABASE_URL!,
  API_SECRET_KEY: process.env.API_SECRET_KEY!,
} as const;

// Using the accessor
import { env } from '@/lib/env';

export default function Home() {
  return <div>{env.NEXT_PUBLIC_APP_NAME}</div>;
}

// Runtime validation
// lib/env.ts
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(\`Missing environment variable: \${name}\`);
  }
  return value;
}

export const env = {
  NEXT_PUBLIC_API_URL: getEnvVar('NEXT_PUBLIC_API_URL'),
  DATABASE_URL: getEnvVar('DATABASE_URL'),
} as const;`}
            language="typescript"
          />
        </section>

        {/* Section 5: Environment Files */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Environment File Priority
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Understand the priority order of environment files in Next.js.
          </p>

          <CodeBlock
            code={`// Environment file priority (highest to lowest):
// 1. .env.local (always loaded, gitignored)
// 2. .env.development / .env.production (based on NODE_ENV)
// 3. .env (default, committed to git)

// Example files:
// .env (committed)
NEXT_PUBLIC_APP_NAME=My App
DATABASE_URL=postgresql://localhost:5432/db

// .env.local (gitignored, local overrides)
DATABASE_URL=postgresql://localhost:5432/local_db
API_SECRET_KEY=local-secret-key

// .env.development.local (development only, gitignored)
DEBUG=true
LOG_LEVEL=debug

// .env.production.local (production only, gitignored)
DATABASE_URL=postgresql://prod-server:5432/db
API_SECRET_KEY=production-secret-key

// .env.development (development, committed)
NEXT_PUBLIC_API_URL=http://localhost:3000

// .env.production (production, committed)
NEXT_PUBLIC_API_URL=https://api.example.com

// Loading order example:
// In development:
// 1. .env
// 2. .env.development
// 3. .env.local
// 4. .env.development.local (highest priority)

// In production:
// 1. .env
// 2. .env.production
// 3. .env.local
// 4. .env.production.local (highest priority)

// Best practices:
// - .env: Default values, committed to git
// - .env.local: Local overrides, gitignored
// - .env.production.local: Production secrets, gitignored
// - Never commit .env.local or .env.*.local files`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a8/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A8.4 Redirects & Rewrites
          </Link>
          <Link
            href="/learn/pages-router/a8"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to A8 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
