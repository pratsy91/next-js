import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B10.5: Environment Variables - Next.js Mastery",
  description: "Complete guide to environment variables in Next.js App Router",
};

export default function Lesson5Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b10"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B10 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B10.5: Environment Variables
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use environment variables in Next.js App Router: public
          variables, server-only variables, runtime vs build-time, and
          TypeScript types.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Public Variables */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Public Variables
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Variables prefixed with{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              NEXT_PUBLIC_
            </code>{" "}
            are exposed to the browser.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Public Variables
          </h3>
          <CodeBlock
            code={`// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_ANALYTICS_ID=GA-123456

// Access in Client Components
'use client'

export default function ClientComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  
  return (
    <div>
      <h1>{appName}</h1>
      <p>API: {apiUrl}</p>
    </div>
  );
}

// Access in Server Components
export default function ServerComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return <div>API: {apiUrl}</div>;
}

// Access in API routes
export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return Response.json({ apiUrl });
}

// ⚠️ Security Note:
// NEXT_PUBLIC_ variables are exposed in the browser
// Never put secrets in NEXT_PUBLIC_ variables`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Public Variables Use Cases
          </h3>
          <CodeBlock
            code={`// .env.local
// ✅ Safe to expose:
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_ANALYTICS_ID=GA-123456
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_ENVIRONMENT=production

// ❌ Never expose:
// API_SECRET_KEY=secret123  // ❌ Don't use NEXT_PUBLIC_
// DATABASE_PASSWORD=pass123  // ❌ Don't use NEXT_PUBLIC_

// app/components/Analytics.js
'use client'

export default function Analytics() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: \`
          gtag('config', '\${analyticsId}');
        \`,
      }}
    />
  );
}

// app/components/APIButton.js
'use client'

export default function APIButton() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const handleClick = async () => {
    const response = await fetch(\`\${apiUrl}/data\`);
    const data = await response.json();
    console.log(data);
  };
  
  return <button onClick={handleClick}>Fetch Data</button>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Server-Only Variables */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Server-Only Variables
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Variables without{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              NEXT_PUBLIC_
            </code>{" "}
            prefix are only available on the server.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Server Variables
          </h3>
          <CodeBlock
            code={`// .env.local
DATABASE_URL=postgresql://user:pass@localhost:5432/db
API_SECRET_KEY=secret123
JWT_SECRET=my-secret-key
STRIPE_SECRET_KEY=sk_test_123

// Access in Server Components
export default async function ServerComponent() {
  const dbUrl = process.env.DATABASE_URL;
  const secret = process.env.API_SECRET_KEY;
  
  // Use in server-side operations
  const data = await fetch('https://api.example.com/data', {
    headers: {
      'Authorization': \`Bearer \${secret}\`,
    },
  });
  
  return <div>Server Component</div>;
}

// Access in API routes
export async function GET() {
  const secret = process.env.API_SECRET_KEY;
  
  // Use secret for authentication
  return Response.json({ message: 'Authenticated' });
}

// Access in Server Actions
'use server'

export async function serverAction() {
  const secret = process.env.API_SECRET_KEY;
  // Use secret
  return { success: true };
}

// ❌ Not accessible in Client Components
'use client'

export default function ClientComponent() {
  // const secret = process.env.API_SECRET_KEY; // ❌ undefined
  // Only NEXT_PUBLIC_ variables work here
  return <div>Client Component</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server Variables Use Cases
          </h3>
          <CodeBlock
            code={`// .env.local
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123
JWT_SECRET=my-secret
STRIPE_SECRET_KEY=sk_test_123
EMAIL_SERVICE_API_KEY=key123

// lib/db.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export default prisma;

// lib/api.js
export async function fetchProtectedData() {
  const apiKey = process.env.API_SECRET_KEY;
  
  const response = await fetch('https://api.example.com/data', {
    headers: {
      'Authorization': \`Bearer \${apiKey}\`,
    },
  });
  
  return response.json();
}

// app/api/stripe/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const session = await stripe.checkout.sessions.create({
    // ...
  });
  
  return Response.json({ sessionId: session.id });
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Runtime vs Build-Time */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Runtime vs Build-Time
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Understand when environment variables are evaluated and embedded.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Build-Time Variables
          </h3>
          <CodeBlock
            code={`// Build-time variables are embedded at build time
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App

// These are embedded during 'next build'
// Changing them requires a rebuild

// app/page.js
export default function Page() {
  // This value is embedded at build time
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return <div>API: {apiUrl}</div>;
}

// To use different values:
// 1. Create .env.production, .env.development
// 2. Or use runtime configuration

// .env.development
NEXT_PUBLIC_API_URL=http://localhost:3000/api

// .env.production
NEXT_PUBLIC_API_URL=https://api.example.com`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Runtime Variables
          </h3>
          <CodeBlock
            code={`// Runtime variables are read at request time
// Server-only variables are always runtime

// .env.local
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123

// These are read at runtime (each request)
// No rebuild needed to change them

// app/api/data/route.js
export async function GET() {
  // Read at runtime
  const apiKey = process.env.API_SECRET_KEY;
  
  // Can change without rebuild
  const response = await fetch('https://api.example.com/data', {
    headers: {
      'Authorization': \`Bearer \${apiKey}\`,
    },
  });
  
  return Response.json(await response.json());
}

// For NEXT_PUBLIC_ variables to be runtime:
// Use next.config.js runtime configuration
// next.config.js
module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL, // Runtime
  },
};`}
            language="javascript"
          />
        </section>

        {/* Section 4: TypeScript Types */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. TypeScript Types
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add TypeScript types for environment variables.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic TypeScript Types
          </h3>
          <CodeBlock
            code={`// env.d.ts (or add to existing types file)
declare namespace NodeJS {
  interface ProcessEnv {
    // Public variables
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_ANALYTICS_ID?: string;
    
    // Server-only variables
    DATABASE_URL: string;
    API_SECRET_KEY: string;
    JWT_SECRET: string;
    STRIPE_SECRET_KEY?: string;
  }
}

// Now TypeScript knows about these variables
// app/page.tsx
export default function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ✅ Typed
  const appName = process.env.NEXT_PUBLIC_APP_NAME; // ✅ Typed
  
  // TypeScript error if variable doesn't exist
  // const missing = process.env.MISSING_VAR; // ❌ Error
  
  return (
    <div>
      <h1>{appName}</h1>
      <p>API: {apiUrl}</p>
    </div>
  );
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced TypeScript Types
          </h3>
          <CodeBlock
            code={`// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // Public variables (required)
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_APP_NAME: string;
    
    // Public variables (optional)
    NEXT_PUBLIC_ANALYTICS_ID?: string;
    NEXT_PUBLIC_SENTRY_DSN?: string;
    
    // Server variables (required)
    DATABASE_URL: string;
    API_SECRET_KEY: string;
    JWT_SECRET: string;
    
    // Server variables (optional)
    STRIPE_SECRET_KEY?: string;
    EMAIL_SERVICE_API_KEY?: string;
    
    // Environment
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

// lib/env.ts - Type-safe environment access
export const env = {
  // Public
  public: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    appName: process.env.NEXT_PUBLIC_APP_NAME!,
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  },
  
  // Server
  server: {
    databaseUrl: process.env.DATABASE_URL!,
    apiSecretKey: process.env.API_SECRET_KEY!,
    jwtSecret: process.env.JWT_SECRET!,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  },
  
  // Environment
  nodeEnv: process.env.NODE_ENV!,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Usage
import { env } from '@/lib/env';

export default function Page() {
  return <div>API: {env.public.apiUrl}</div>;
}

// Server Component
export default async function ServerPage() {
  const data = await fetch(env.server.databaseUrl);
  return <div>Server Page</div>;
}`}
            language="typescript"
          />
        </section>

        {/* Section 5: Environment File Types */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Environment File Types
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Different environment files for different environments.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Environment File Priority
          </h3>
          <CodeBlock
            code={`// Environment file priority (highest to lowest):
// 1. .env.local (always loaded, ignored by git)
// 2. .env.development / .env.production (based on NODE_ENV)
// 3. .env (default, loaded in all environments)

// .env (default, committed to git)
NEXT_PUBLIC_APP_NAME=My App
DATABASE_URL=postgresql://localhost:5432/db

// .env.local (local overrides, NOT committed)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://localhost:5432/localdb

// .env.development (development only)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DEBUG=true

// .env.production (production only)
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://prod-server/db

// .env.test (test environment)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
DATABASE_URL=postgresql://test-db/db

// Loading order:
// 1. .env
// 2. .env.local
// 3. .env.[NODE_ENV]
// 4. .env.[NODE_ENV].local

// Later files override earlier ones`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Best Practices
          </h3>
          <CodeBlock
            code={`// ✅ Best practices:

// 1. Use .env.local for local development secrets
// .env.local (gitignored)
DATABASE_URL=postgresql://localhost:5432/localdb
API_SECRET_KEY=local-secret-key

// 2. Use .env for default values (committed)
// .env
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_API_URL=http://localhost:3000/api

// 3. Use .env.production for production defaults
// .env.production
NEXT_PUBLIC_API_URL=https://api.example.com

// 4. Never commit secrets
// .gitignore
.env.local
.env*.local

// 5. Document required variables
// .env.example (committed)
NEXT_PUBLIC_API_URL=
DATABASE_URL=
API_SECRET_KEY=

// 6. Validate environment variables
// lib/env.ts
function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(\`Missing required environment variable: \${name}\`);
  }
  return value || '';
}

export const env = {
  public: {
    apiUrl: getEnvVar('NEXT_PUBLIC_API_URL'),
  },
  server: {
    databaseUrl: getEnvVar('DATABASE_URL'),
    apiSecretKey: getEnvVar('API_SECRET_KEY'),
  },
};`}
            language="typescript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b10/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B10.4 Redirects & Rewrites
          </Link>
          <Link
            href="/learn/app-router/b10/lesson-6"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B10.6 Draft Mode →
          </Link>
        </div>
      </div>
    </div>
  );
}
