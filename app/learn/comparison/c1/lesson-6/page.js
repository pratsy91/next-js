import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C1.6: Environment Variables - Next.js Mastery",
  description:
    "Environment variables work the same in both App Router and Pages Router",
};

export default function Lesson6Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c1"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C1 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C1.6: Environment Variables
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Environment variables work exactly the same in both App Router and
          Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Same Behavior
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Environment variables work identically in both routers.
          </p>

          <CodeBlock
            code={`// .env.local (works in both routers)
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://localhost:5432/db
API_SECRET_KEY=secret123

// Public variables (both routers)
// NEXT_PUBLIC_* prefix exposes to browser
process.env.NEXT_PUBLIC_API_URL

// Server-only variables (both routers)
// No NEXT_PUBLIC_ prefix = server-only
process.env.DATABASE_URL
process.env.API_SECRET_KEY

// Environment files (both routers)
// .env.local - All environments (gitignored)
// .env.development - Development only
// .env.production - Production only
// .env - Default (committed)

// File priority (both routers)
// 1. .env.local
// 2. .env.development / .env.production
// 3. .env`}
            language="text"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Usage Examples
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Examples that work the same in both routers.
          </p>

          <CodeBlock
            code={`// Client-side (both routers)
// App Router: app/components/Client.tsx
'use client';
export default function Client() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return <div>API: {apiUrl}</div>;
}

// Pages Router: components/Client.js
export default function Client() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return <div>API: {apiUrl}</div>;
}

// Server-side (both routers)
// App Router: app/api/route.ts
export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  // Use dbUrl
}

// Pages Router: pages/api/users.js
export default function handler(req, res) {
  const dbUrl = process.env.DATABASE_URL;
  // Use dbUrl
}

// Data fetching (both routers)
// App Router: app/page.tsx
export default async function Page() {
  const apiKey = process.env.API_SECRET_KEY;
  // Fetch data
}

// Pages Router: pages/index.js
export async function getServerSideProps() {
  const apiKey = process.env.API_SECRET_KEY;
  // Fetch data
}

// Same behavior in both routers!`}
            language="javascript"
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. TypeScript Types
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            TypeScript environment variable types work the same.
          </p>

          <CodeBlock
            code={`// types/env.d.ts (both routers)
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    DATABASE_URL: string;
    API_SECRET_KEY: string;
  }
}

// Usage (both routers)
const apiUrl: string = process.env.NEXT_PUBLIC_API_URL;
const dbUrl: string = process.env.DATABASE_URL;

// No differences!
// Environment variables work identically.`}
            language="typescript"
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c1/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: C1.5 Middleware
          </Link>
          <Link
            href="/learn/comparison/c1/lesson-7"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C1.7 Styling →
          </Link>
        </div>
      </div>
    </div>
  );
}
