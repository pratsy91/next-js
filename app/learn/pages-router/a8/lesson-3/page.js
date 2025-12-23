import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A8.3: Preview Mode - Next.js Mastery",
  description: "Complete guide to preview mode in Next.js Pages Router",
};

export default function Lesson3Page() {
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
          A8.3: Preview Mode
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use preview mode to view draft content before it's
          published.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Enabling Preview Mode */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Enabling Preview Mode
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Enable preview mode through an API route to view draft content.
          </p>

          <CodeBlock
            code={`// pages/api/preview.js
export default async function handler(req, res) {
  // Check for secret token
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  // Enable Preview Mode by setting cookies
  res.setPreviewData({});
  
  // Redirect to the path from the query parameter
  res.redirect(req.query.slug || '/');
}

// Usage:
// Visit: /api/preview?secret=YOUR_SECRET&slug=/blog/my-post

// With additional data
export default async function handler(req, res) {
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  // Set preview data
  res.setPreviewData({
    postId: req.query.postId,
    draft: true,
  });
  
  res.redirect(req.query.slug || '/');
}

// Environment variable
// .env.local
PREVIEW_SECRET=your-secret-token-here

// Accessing preview data
export default async function handler(req, res) {
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  const { slug } = req.query;
  
  // Fetch draft content
  const post = await getDraftPost(slug);
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  res.setPreviewData({ postId: post.id });
  res.redirect(\`/blog/\${slug}\`);
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Disabling Preview Mode */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Disabling Preview Mode
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create an API route to disable preview mode and clear preview
            cookies.
          </p>

          <CodeBlock
            code={`// pages/api/exit-preview.js
export default function handler(req, res) {
  // Clear preview mode cookies
  res.clearPreviewData();
  
  // Redirect to home page or specified path
  res.redirect(req.query.slug || '/');
}

// Usage:
// Visit: /api/exit-preview
// Or: /api/exit-preview?slug=/blog

// With confirmation
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  res.clearPreviewData();
  res.json({ message: 'Preview mode disabled' });
}

// Client-side exit
// components/ExitPreview.js
import { useRouter } from 'next/router';

export default function ExitPreview() {
  const router = useRouter();
  
  const exitPreview = async () => {
    await fetch('/api/exit-preview', { method: 'POST' });
    router.reload();
  };
  
  return (
    <button onClick={exitPreview}>
      Exit Preview Mode
    </button>
  );
}

// Automatic exit on page load (optional)
// pages/_app.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    // Exit preview mode after 1 hour
    const timer = setTimeout(() => {
      fetch('/api/exit-preview', { method: 'POST' });
    }, 60 * 60 * 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return <Component {...pageProps} />;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Preview API Route */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Preview API Route
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create a complete preview API route with authentication and error
            handling.
          </p>

          <CodeBlock
            code={`// pages/api/preview.js
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  // Check for secret token
  const { secret, slug } = req.query;
  
  if (!secret) {
    return res.status(401).json({ message: 'No secret token provided' });
  }
  
  if (secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  // Validate slug
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Invalid slug' });
  }
  
  try {
    // Fetch draft content to verify it exists
    const content = await getDraftContent(slug);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    // Enable Preview Mode
    res.setPreviewData({
      contentId: content.id,
      slug: content.slug,
    });
    
    // Redirect to the content page
    res.redirect(\`/blog/\${slug}\`);
  } catch (error) {
    console.error('Preview error:', error);
    return res.status(500).json({ message: 'Error enabling preview' });
  }
}

// Integration with CMS (e.g., Contentful, Sanity)
export default async function handler(req, res) {
  const { secret, slug } = req.query;
  
  if (secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  // Verify content exists in CMS
  const entry = await contentfulClient.getEntry(slug, {
    preview: true, // Use preview API
  });
  
  if (!entry) {
    return res.status(404).json({ message: 'Entry not found' });
  }
  
  res.setPreviewData({ entryId: entry.sys.id });
  res.redirect(\`/blog/\${slug}\`);
}

// With expiration
export default async function handler(req, res) {
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  // Set preview data with expiration (1 hour)
  res.setPreviewData(
    { timestamp: Date.now() },
    {
      maxAge: 60 * 60, // 1 hour in seconds
    }
  );
  
  res.redirect(req.query.slug || '/');
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: getStaticProps with Preview */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. getStaticProps with Preview
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use preview mode in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            to fetch draft content.
          </p>

          <CodeBlock
            code={`// pages/blog/[slug].js
export async function getStaticProps({ params, preview, previewData }) {
  // Check if preview mode is enabled
  if (preview) {
    // Fetch draft content
    const post = await getDraftPost(params.slug, previewData);
    
    return {
      props: {
        post,
        preview: true,
      },
    };
  }
  
  // Fetch published content
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      post,
      preview: false,
    },
  };
}

// Using previewData
export async function getStaticProps({ params, preview, previewData }) {
  let post;
  
  if (preview && previewData) {
    // Use preview data to fetch specific draft
    post = await getDraftPostById(previewData.postId);
  } else if (preview) {
    // Fetch draft by slug
    post = await getDraftPost(params.slug);
  } else {
    // Fetch published post
    post = await getPost(params.slug);
  }
  
  return {
    props: {
      post,
      preview: !!preview,
    },
  };
}

// With revalidation
export async function getStaticProps({ params, preview }) {
  const post = preview
    ? await getDraftPost(params.slug)
    : await getPost(params.slug);
  
  return {
    props: {
      post,
      preview: !!preview,
    },
    // Revalidate every 60 seconds (ISR)
    revalidate: 60,
  };
}

// CMS integration example
export async function getStaticProps({ params, preview }) {
  const client = preview ? previewClient : productionClient;
  
  const post = await client.fetch(
    \`*[_type == "post" && slug.current == $slug][0]\`,
    { slug: params.slug }
  );
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      post,
      preview: !!preview,
    },
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Draft Content Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Draft Content Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Display draft content and preview indicators in your pages.
          </p>

          <CodeBlock
            code={`// pages/blog/[slug].js
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function BlogPost({ post, preview }) {
  const router = useRouter();
  
  // Show preview banner
  if (preview) {
    return (
      <>
        <div className="preview-banner">
          <p>You are viewing a draft version of this post.</p>
          <Link href="/api/exit-preview">
            <a>Exit Preview Mode</a>
          </Link>
        </div>
        <article>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </>
    );
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Preview banner component
// components/PreviewBanner.js
import Link from 'next/link';

export default function PreviewBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-400 p-4 text-center">
      <p className="font-bold">
        Preview Mode Active -{' '}
        <Link href="/api/exit-preview">
          <a className="underline">Exit Preview</a>
        </Link>
      </p>
    </div>
  );
}

// pages/_app.js
import { useRouter } from 'next/router';
import PreviewBanner from '@/components/PreviewBanner';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isPreview = router.isPreview;
  
  return (
    <>
      {isPreview && <PreviewBanner />}
      <Component {...pageProps} />
    </>
  );
}

// Check preview mode in component
// pages/blog/[slug].js
import { useRouter } from 'next/router';

export default function BlogPost({ post, preview }) {
  const router = useRouter();
  const isPreview = router.isPreview || preview;
  
  return (
    <div>
      {isPreview && (
        <div className="mb-4 rounded bg-yellow-100 p-4">
          <p className="font-semibold">Draft Content</p>
          <p className="text-sm">This is a preview of unpublished content.</p>
        </div>
      )}
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}

// Conditional rendering based on preview
export default function BlogPost({ post, preview }) {
  return (
    <article>
      <h1>
        {post.title}
        {preview && <span className="draft-badge">DRAFT</span>}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      
      {preview && (
        <div className="mt-4 rounded bg-gray-100 p-4">
          <p className="text-sm text-gray-600">
            Last modified: {new Date(post.updatedAt).toLocaleString()}
          </p>
        </div>
      )}
    </article>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a8/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A8.2 Internationalization
          </Link>
          <Link
            href="/learn/pages-router/a8/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A8.4 Redirects & Rewrites →
          </Link>
        </div>
      </div>
    </div>
  );
}
