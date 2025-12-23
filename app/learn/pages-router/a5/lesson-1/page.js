import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A5.1: next/head - Next.js Mastery",
  description: "Complete guide to next/head component in Next.js Pages Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a5"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A5 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A5.1: next/head
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to manage document head elements using the Head component
          for SEO and metadata.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Head Component Usage */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Head Component Usage
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Head
            </code>{" "}
            component allows you to modify the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &lt;head&gt;
            </code>{" "}
            of your HTML document.
          </p>

          <CodeBlock
            code={`import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="Page description" />
      </Head>
      <main>
        <h1>Welcome</h1>
      </main>
    </>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Points
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Can be used in any page component</li>
            <li>Elements are merged into the document head</li>
            <li>Duplicate tags are automatically handled</li>
            <li>Useful for SEO and social media sharing</li>
          </ul>
        </section>

        {/* Section 2: All Meta Tags */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. All Meta Tags (title, description, og tags, twitter cards, etc.)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add comprehensive meta tags for SEO and social media sharing.
          </p>

          <CodeBlock
            code={`import Head from 'next/head';

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        {/* Basic meta tags */}
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta name="author" content={post.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        
        {/* Open Graph tags (Facebook, LinkedIn, etc.) */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={\`https://example.com/posts/\${post.id}\`} />
        <meta property="og:site_name" content="My Blog" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <meta name="twitter:site" content="@myblog" />
        <meta name="twitter:creator" content="@author" />
        
        {/* Additional meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={\`https://example.com/posts/\${post.id}\`} />
      </Head>
      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
    </>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Common Meta Tags
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Tag
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      title
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Page title (shown in browser tab)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      description
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Page description (SEO)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      og:*
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Open Graph (social sharing)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      twitter:*
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Twitter Card (Twitter sharing)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      robots
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Search engine indexing
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Script Tags in Head */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Script Tags in Head
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add script tags to the document head for analytics, third-party
            libraries, and more.
          </p>

          <CodeBlock
            code={`import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        {/* External script */}
        <script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        
        {/* Inline script */}
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            \`,
          }}
        />
        
        {/* Script with async */}
        <script
          src="https://example.com/script.js"
          async
        />
        
        {/* Script with defer */}
        <script
          src="https://example.com/script.js"
          defer
        />
      </Head>
      <main>Content</main>
    </>
  );
}

// Note: For better performance, use next/script instead of script tags in Head`}
            language="javascript"
          />
        </section>

        {/* Section 4: Link Tags in Head */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Link Tags in Head
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add link tags for stylesheets, icons, preconnect, and more.
          </p>

          <CodeBlock
            code={`import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        {/* Stylesheet */}
        <link rel="stylesheet" href="/styles/custom.css" />
        
        {/* Preconnect for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://api.example.com" />
        
        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Alternate languages */}
        <link rel="alternate" hrefLang="en" href="https://example.com/en" />
        <link rel="alternate" hrefLang="fr" href="https://example.com/fr" />
        
        {/* RSS feed */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/custom.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <main>Content</main>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Multiple Head Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Multiple Head Components
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            You can use multiple Head components in the same page. Next.js will
            merge them intelligently.
          </p>

          <CodeBlock
            code={`import Head from 'next/head';
import Layout from '../components/Layout';

export default function BlogPost({ post }) {
  return (
    <Layout>
      {/* First Head component */}
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      
      {/* Second Head component - merged with first */}
      <Head>
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={post.image} />
      </Head>
      
      {/* Third Head component - also merged */}
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
    </Layout>
  );
}

// Result: All meta tags are merged into a single <head>
// Duplicate tags (like multiple titles) are handled intelligently`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Head Merging Behavior
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              Multiple{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                title
              </code>{" "}
              tags: Last one wins
            </li>
            <li>
              Multiple{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                meta
              </code>{" "}
              tags: All are included
            </li>
            <li>
              Multiple{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                link
              </code>{" "}
              tags: All are included
            </li>
            <li>
              Multiple{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                script
              </code>{" "}
              tags: All are included
            </li>
          </ul>
        </section>

        {/* Section 6: Conditional Rendering */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Conditional Rendering
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Conditionally render head elements based on props, state, or other
            conditions.
          </p>

          <CodeBlock
            code={`import Head from 'next/head';
import { useState } from 'react';

export default function DynamicPage({ post, user }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <>
      <Head>
        {/* Conditional title */}
        {post ? (
          <title>{post.title} | My Blog</title>
        ) : (
          <title>Loading... | My Blog</title>
        )}
        
        {/* Conditional meta tags */}
        {post && (
          <>
            <meta name="description" content={post.excerpt} />
            <meta property="og:image" content={post.image} />
          </>
        )}
        
        {/* Conditional based on user */}
        {user?.isAdmin && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        
        {/* Conditional theme color */}
        <meta
          name="theme-color"
          content={theme === 'dark' ? '#000000' : '#ffffff'}
        />
        
        {/* Conditional script */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: \`
                // Production-only analytics
                console.log('Analytics loaded');
              \`,
            }}
          />
        )}
        
        {/* Conditional stylesheet */}
        {theme === 'dark' && (
          <link rel="stylesheet" href="/styles/dark.css" />
        )}
      </Head>
      <main>
        <h1>{post?.title || 'Loading...'}</h1>
      </main>
    </>
  );
}

// Using with getServerSideProps
export async function getServerSideProps(context) {
  const post = await getPost(context.query.id);
  
  return {
    props: {
      post,
    },
  };
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to A5 Lessons
          </Link>
          <Link
            href="/learn/pages-router/a5/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A5.2 next/image →
          </Link>
        </div>
      </div>
    </div>
  );
}
