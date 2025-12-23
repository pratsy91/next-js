import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A3.2: getStaticProps - Next.js Mastery",
  description: "Complete guide to getStaticProps in Next.js Pages Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a3"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A3 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A3.2: getStaticProps
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to pre-render pages at build time using Static Site
          Generation (SSG) with getStaticProps.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Basic Usage */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Basic Usage
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            runs at build time to pre-render pages. The HTML is generated once
            and reused for every request.
          </p>

          <CodeBlock
            code={`// pages/about.js
export async function getStaticProps() {
  // Fetch data at build time
  const res = await fetch('https://api.example.com/about');
  const data = await res.json();
  
  return {
    props: {
      data,
    },
  };
}

export default function About({ data }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Points
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Runs only at build time (not on every request)</li>
            <li>Perfect for content that doesn't change frequently</li>
            <li>Fastest page load times</li>
            <li>Great for SEO</li>
            <li>Can be combined with ISR for periodic updates</li>
          </ul>
        </section>

        {/* Section 2: Context Object */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Context Object (params, preview, previewData, locale, locales,
            defaultLocale)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The context object provides access to route parameters, preview
            mode, and locale information.
          </p>

          <CodeBlock
            code={`// pages/posts/[id].js
export async function getStaticProps(context) {
  // params - Dynamic route parameters (from getStaticPaths)
  const { id } = context.params; // { id: '123' }
  
  // preview - Whether in preview mode
  if (context.preview) {
    // Fetch draft content
    const post = await getDraftPost(id);
    return { props: { post } };
  }
  
  // previewData - Preview mode data
  const previewData = context.previewData;
  
  // locale - Current locale (if i18n enabled)
  const locale = context.locale; // 'en'
  
  // locales - Available locales
  const locales = context.locales; // ['en', 'fr', 'de']
  
  // defaultLocale - Default locale
  const defaultLocale = context.defaultLocale; // 'en'
  
  // Fetch data
  const post = await getPostById(id, locale);
  
  return {
    props: {
      post,
      locale,
    },
  };
}

export default function Post({ post, locale }) {
  return <article>{post.title}</article>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Note: No req/res in getStaticProps
          </h3>
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            Unlike getServerSideProps, getStaticProps does NOT have access to{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              req
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              res
            </code>{" "}
            because it runs at build time, not on each request.
          </p>
        </section>

        {/* Section 3: Return Object */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Return Object (props, revalidate, notFound)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            can return props, enable ISR with revalidate, or trigger a 404.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Returning Props
          </h3>
          <CodeBlock
            code={`export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: {
      data,
      buildTime: new Date().toISOString(),
    },
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Returning revalidate (ISR)
          </h3>
          <CodeBlock
            code={`export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: {
      data,
    },
    // Revalidate every 60 seconds (ISR)
    revalidate: 60,
  };
}

// This enables Incremental Static Regeneration
// The page will be regenerated at most once every 60 seconds`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Returning notFound
          </h3>
          <CodeBlock
            code={`export async function getStaticProps(context) {
  const { id } = context.params;
  const post = await getPostById(id);
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      post,
    },
  };
}

// This will render pages/404.js`}
            language="javascript"
          />
        </section>

        {/* Section 4: ISR */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. ISR (Incremental Static Regeneration)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            ISR allows you to update static pages after build time without
            rebuilding the entire site.
          </p>

          <CodeBlock
            code={`// pages/posts/[id].js
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: 'blocking', // or true
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const post = await getPostById(id);
  
  return {
    props: {
      post,
    },
    // Revalidate every 60 seconds
    revalidate: 60,
  };
}

// How ISR works:
// 1. Page is generated at build time
// 2. After 60 seconds, next request triggers regeneration
// 3. While regenerating, stale page is served
// 4. New page replaces old one after regeneration completes`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            ISR Benefits
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Fast page loads (served from CDN)</li>
            <li>Content stays fresh (periodic regeneration)</li>
            <li>No full rebuild needed for updates</li>
            <li>Scales to millions of pages</li>
            <li>Great for blogs, e-commerce, etc.</li>
          </ul>
        </section>

        {/* Section 5: Revalidation Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Revalidation Strategies (time-based, on-demand)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control when pages are regenerated using time-based or on-demand
            revalidation.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Time-based Revalidation
          </h3>
          <CodeBlock
            code={`// Revalidate every 60 seconds
export async function getStaticProps() {
  return {
    props: { data: await fetchData() },
    revalidate: 60, // seconds
  };
}

// Revalidate every hour
export async function getStaticProps() {
  return {
    props: { data: await fetchData() },
    revalidate: 3600, // 1 hour
  };
}

// Revalidate every day
export async function getStaticProps() {
  return {
    props: { data: await fetchData() },
    revalidate: 86400, // 24 hours
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            On-demand Revalidation
          </h3>
          <CodeBlock
            code={`// pages/api/revalidate.js
export default async function handler(req, res) {
  // Check for secret token
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  try {
    // Revalidate specific path
    await res.revalidate('/posts/123');
    
    // Or revalidate multiple paths
    await res.revalidate('/posts/123');
    await res.revalidate('/posts/456');
    
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}

// Trigger revalidation:
// POST /api/revalidate?secret=your-secret-token

// Or from your CMS webhook:
export default async function handler(req, res) {
  const { id } = req.body;
  
  await res.revalidate(\`/posts/\${id}\`);
  await res.revalidate('/posts'); // Revalidate list page too
  
  return res.json({ revalidated: true });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using revalidatePath (Next.js 12.2+)
          </h3>
          <CodeBlock
            code={`// In API route or Server Action
import { revalidatePath } from 'next/cache';

export default async function handler(req, res) {
  const { id } = req.body;
  
  // Revalidate specific path
  revalidatePath('/posts/[id]', 'page');
  revalidatePath('/posts', 'page');
  
  return res.json({ revalidated: true });
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Preview Mode */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Preview Mode
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Preview mode allows you to view draft content from your CMS before
            it's published.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Setting Up Preview Mode
          </h3>
          <CodeBlock
            code={`// pages/api/preview.js
export default async function handler(req, res) {
  // Check secret token
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  // Enable preview mode
  res.setPreviewData({});
  
  // Redirect to the page you want to preview
  res.redirect(req.query.slug || '/');
}

// Access at: /api/preview?secret=your-secret&slug=/posts/123`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using Preview Mode in getStaticProps
          </h3>
          <CodeBlock
            code={`export async function getStaticProps(context) {
  // Check if in preview mode
  if (context.preview) {
    // Fetch draft content
    const post = await getDraftPost(context.params.id);
    return {
      props: {
        post,
        preview: true,
      },
    };
  }
  
  // Normal build-time fetch
  const post = await getPostById(context.params.id);
  
  return {
    props: {
      post,
      preview: false,
    },
  };
}

export default function Post({ post, preview }) {
  return (
    <article>
      {preview && (
        <div className="bg-yellow-200 p-4">
          Preview Mode - This is draft content
        </div>
      )}
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Disabling Preview Mode
          </h3>
          <CodeBlock
            code={`// pages/api/exit-preview.js
export default async function handler(req, res) {
  res.clearPreviewData();
  res.redirect('/');
}

// Access at: /api/exit-preview`}
            language="javascript"
          />
        </section>

        {/* Section 7: TypeScript Types */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. TypeScript Types
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use TypeScript types for type-safe getStaticProps.
          </p>

          <CodeBlock
            code={`// pages/posts/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next';

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
};

type Props = {
  post: Post;
};

// Type-safe getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPostIds();
  
  return {
    paths: posts.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

// Type-safe getStaticProps
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { id } = context.params!;
  
  const post = await getPostById(id as string);
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default function Post({ post }: Props) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Context Types
          </h3>
          <CodeBlock
            code={`import { GetStaticPropsContext } from 'next';

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  // context.params is typed as { id: string } | undefined
  const { id } = context.params!;
  
  // context.preview is boolean
  if (context.preview) {
    // Handle preview
  }
  
  // context.locale is string | undefined
  const locale = context.locale;
  
  return {
    props: {
      id,
      locale,
    },
  };
};`}
            language="typescript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a3/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A3.1 getServerSideProps
          </Link>
          <Link
            href="/learn/pages-router/a3/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A3.3 getStaticPaths →
          </Link>
        </div>
      </div>
    </div>
  );
}
