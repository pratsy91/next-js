import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B10.6: Draft Mode - Next.js Mastery",
  description: "Complete guide to draft mode in Next.js App Router",
};

export default function Lesson6Page() {
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
          B10.6: Draft Mode
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use draft mode in Next.js App Router: enabling draft
          mode, disabling draft mode, draft API route, and preview content.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Enabling Draft Mode */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Enabling Draft Mode
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Enable draft mode to preview draft content that isn't published yet.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Draft Mode Setup
          </h3>
          <CodeBlock
            code={`// app/api/draft/route.js
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  
  // Verify secret token
  if (secret !== process.env.DRAFT_SECRET) {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
  
  // Enable draft mode
  draftMode().enable();
  
  // Redirect to the content
  redirect(\`/blog/\${slug}\`);
}

// Usage:
// Visit: /api/draft?secret=YOUR_SECRET&slug=my-post
// This enables draft mode and redirects to /blog/my-post

// .env.local
DRAFT_SECRET=your-secret-token-here`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Draft Mode with Authentication
          </h3>
          <CodeBlock
            code={`// app/api/draft/route.js
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  
  // Verify secret
  if (!secret || secret !== process.env.DRAFT_SECRET) {
    return Response.json(
      { message: 'Invalid secret' },
      { status: 401 }
    );
  }
  
  // Optional: Verify user authentication
  const token = request.headers.get('authorization');
  if (!isValidToken(token)) {
    return Response.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Enable draft mode
  draftMode().enable();
  
  // Redirect to content
  if (slug) {
    redirect(\`/blog/\${slug}\`);
  } else {
    redirect('/blog');
  }
}

function isValidToken(token) {
  // Implement your token validation
  return token === process.env.ADMIN_TOKEN;
}

// Usage with authentication:
// GET /api/draft?secret=YOUR_SECRET&slug=my-post
// Header: Authorization: Bearer YOUR_TOKEN`}
            language="javascript"
          />
        </section>

        {/* Section 2: Disabling Draft Mode */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Disabling Draft Mode
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Disable draft mode to exit preview and return to published content.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Draft Mode Disable
          </h3>
          <CodeBlock
            code={`// app/api/disable-draft/route.js
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  // Disable draft mode
  draftMode().disable();
  
  // Redirect to home or previous page
  const referer = request.headers.get('referer');
  if (referer) {
    redirect(referer);
  } else {
    redirect('/');
  }
}

// Or with specific redirect
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';
  
  draftMode().disable();
  redirect(path);
}

// Usage:
// Visit: /api/disable-draft
// Or: /api/disable-draft?path=/blog`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Draft Mode Toggle Component
          </h3>
          <CodeBlock
            code={`// app/components/DraftModeToggle.js
'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DraftModeToggle({ isEnabled }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const toggleDraftMode = async () => {
    setLoading(true);
    
    try {
      if (isEnabled) {
        // Disable draft mode
        await fetch('/api/disable-draft');
      } else {
        // Enable draft mode (with secret)
        const secret = prompt('Enter draft secret:');
        if (secret) {
          await fetch(\`/api/draft?secret=\${secret}\`);
        }
      }
      
      router.refresh();
    } catch (error) {
      console.error('Failed to toggle draft mode:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <button
      onClick={toggleDraftMode}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {isEnabled ? 'Exit Draft Mode' : 'Enter Draft Mode'}
    </button>
  );
}

// app/layout.js
import DraftModeToggle from '@/components/DraftModeToggle';
import { draftMode } from 'next/headers';

export default function Layout({ children }) {
  const { isEnabled } = draftMode();
  
  return (
    <html>
      <body>
        {isEnabled && (
          <div className="bg-yellow-200 p-2">
            <DraftModeToggle isEnabled={isEnabled} />
            Draft Mode Enabled
          </div>
        )}
        {children}
      </body>
    </html>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Draft API Route */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Draft API Route
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create a dedicated API route for managing draft mode.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complete Draft API Route
          </h3>
          <CodeBlock
            code={`// app/api/draft/route.js
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'enable';
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const path = searchParams.get('path');
  
  // Verify secret for enable action
  if (action === 'enable') {
    if (!secret || secret !== process.env.DRAFT_SECRET) {
      return Response.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }
    
    // Enable draft mode
    draftMode().enable();
    
    // Redirect to content
    if (slug) {
      redirect(\`/blog/\${slug}\`);
    } else if (path) {
      redirect(path);
    } else {
      redirect('/');
    }
  }
  
  // Disable draft mode
  if (action === 'disable') {
    draftMode().disable();
    
    const redirectPath = path || slug ? \`/blog/\${slug}\` : '/';
    redirect(redirectPath);
  }
  
  return Response.json({ message: 'Invalid action' }, { status: 400 });
}

// Usage:
// Enable: /api/draft?action=enable&secret=YOUR_SECRET&slug=my-post
// Disable: /api/draft?action=disable&path=/blog`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Draft API with POST Method
          </h3>
          <CodeBlock
            code={`// app/api/draft/route.js
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function POST(request) {
  const body = await request.json();
  const { action, secret, slug, path } = body;
  
  if (action === 'enable') {
    // Verify secret
    if (!secret || secret !== process.env.DRAFT_SECRET) {
      return Response.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }
    
    // Enable draft mode
    draftMode().enable();
    
    return Response.json({ 
      message: 'Draft mode enabled',
      redirect: slug ? \`/blog/\${slug}\` : path || '/'
    });
  }
  
  if (action === 'disable') {
    draftMode().disable();
    return Response.json({ message: 'Draft mode disabled' });
  }
  
  return Response.json({ message: 'Invalid action' }, { status: 400 });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'enable';
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  
  if (action === 'enable' && secret === process.env.DRAFT_SECRET) {
    draftMode().enable();
    redirect(slug ? \`/blog/\${slug}\` : '/');
  }
  
  if (action === 'disable') {
    draftMode().disable();
    redirect('/');
  }
  
  return Response.json({ message: 'Invalid request' }, { status: 400 });
}

// Usage:
// POST /api/draft
// Body: { "action": "enable", "secret": "YOUR_SECRET", "slug": "my-post" }`}
            language="javascript"
          />
        </section>

        {/* Section 4: Preview Content */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Preview Content
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use draft mode to preview draft content from your CMS or database.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Checking Draft Mode Status
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const { isEnabled } = draftMode();
  
  // Fetch content based on draft mode
  const post = isEnabled
    ? await getDraftPost(slug)  // Get draft content
    : await getPublishedPost(slug);  // Get published content
  
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      {isEnabled && (
        <div className="bg-yellow-100 p-4">
          ⚠️ Draft Mode: Previewing unpublished content
        </div>
      )}
    </article>
  );
}

// lib/posts.js
export async function getPublishedPost(slug) {
  // Only fetch published posts
  const response = await fetch(
    \`https://cms.example.com/api/posts/\${slug}?status=published\`,
    { cache: 'force-cache' }
  );
  return response.json();
}

export async function getDraftPost(slug) {
  // Fetch draft posts (bypass cache)
  const response = await fetch(
    \`https://cms.example.com/api/posts/\${slug}?status=draft\`,
    { cache: 'no-store' }
  );
  return response.json();
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Draft Mode with CMS Integration
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const { isEnabled } = draftMode();
  
  // Fetch from CMS
  const post = await fetchPost(slug, isEnabled);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

// lib/cms.js
export async function fetchPost(slug, isDraft = false) {
  const baseUrl = 'https://cms.example.com/api';
  const token = process.env.CMS_API_TOKEN;
  
  // Use preview token for draft mode
  const previewToken = isDraft ? process.env.CMS_PREVIEW_TOKEN : null;
  
  const url = isDraft
    ? \`\${baseUrl}/preview/posts/\${slug}\`
    : \`\${baseUrl}/posts/\${slug}\`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': \`Bearer \${previewToken || token}\`,
    },
    cache: isDraft ? 'no-store' : 'force-cache',
  });
  
  if (!response.ok) {
    return null;
  }
  
  return response.json();
}

// Example with Contentful
export async function fetchContentfulPost(slug, isDraft = false) {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = isDraft
    ? process.env.CONTENTFUL_PREVIEW_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = isDraft ? 'preview' : 'master';
  
  const response = await fetch(
    \`https://\${environment}.contentful.com/spaces/\${spaceId}/environments/\${environment}/entries?content_type=post&fields.slug=\${slug}\`,
    {
      headers: {
        'Authorization': \`Bearer \${accessToken}\`,
      },
      cache: isDraft ? 'no-store' : 'force-cache',
    }
  );
  
  return response.json();
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Draft Mode Banner
          </h3>
          <CodeBlock
            code={`// app/components/DraftModeBanner.js
import { draftMode } from 'next/headers';
import Link from 'next/link';

export default function DraftModeBanner() {
  const { isEnabled } = draftMode();
  
  if (!isEnabled) {
    return null;
  }
  
  return (
    <div className="bg-yellow-200 border-b-2 border-yellow-400 p-4 text-center">
      <p className="font-bold">
        ⚠️ Draft Mode Enabled - Previewing unpublished content
      </p>
      <Link
        href="/api/disable-draft"
        className="text-blue-600 underline"
      >
        Exit Draft Mode
      </Link>
    </div>
  );
}

// app/layout.js
import DraftModeBanner from '@/components/DraftModeBanner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DraftModeBanner />
        {children}
      </body>
    </html>
  );
}

// Or in a specific layout
// app/blog/layout.js
import DraftModeBanner from '@/components/DraftModeBanner';

export default function BlogLayout({ children }) {
  return (
    <div>
      <DraftModeBanner />
      {children}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b10/lesson-5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B10.5 Environment Variables
          </Link>
          <Link
            href="/learn/app-router/b11"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B11 Optimization →
          </Link>
        </div>
      </div>
    </div>
  );
}
