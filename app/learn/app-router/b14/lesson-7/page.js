import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.7: Metadata API - Most Asked Interview Q&A",
  description:
    "Most asked Next.js interview questions on Metadata API: generateMetadata, Open Graph, sitemap, robots, JSON-LD, and SEO",
};

function LevelBadge({ level }) {
  const styles = {
    Junior:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Mid: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Senior:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  };
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${styles[level]}`}
    >
      {level}
    </span>
  );
}

export default function Lesson7Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b14"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B14 Interview Q&A
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B14.7: Metadata API (B7)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Most asked interview questions on the Metadata API — titles, SEO,
          social sharing, sitemaps, and structured data.
        </p>
      </div>

      <div className="space-y-6">
        {/* Q1 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              1. How do you set page title and description?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Export a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              metadata
            </code>{" "}
            object from any{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              layout.js
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              page.js
            </code>{" "}
            Server Component. Next.js injects{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &lt;title&gt;
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &lt;meta name=&quot;description&quot;&gt;
            </code>{" "}
            automatically — no manual Head component needed.
          </p>
          <CodeBlock
            code={`// app/about/page.js
export const metadata = {
  title: 'About Us',
  description: 'Learn about our company, mission, and team.',
};

export default function AboutPage() {
  return <h1>About Us</h1>;
}

// Rendered in HTML:
// <title>About Us</title>
// <meta name="description" content="Learn about our company..." />`}
            language="javascript"
          />
        </section>

        {/* Q2 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              2. Static metadata vs generateMetadata — when to use each?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use static{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              metadata
            </code>{" "}
            when values are known at build time and don&apos;t depend on route
            params or fetched data. Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              generateMetadata
            </code>{" "}
            for dynamic routes where title, description, or OG image depend on
            database content or URL parameters.
          </p>
          <CodeBlock
            code={`// Static — app/pricing/page.js
export const metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing plans.',
};

// Dynamic — app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
  };
}`}
            language="javascript"
          />
        </section>

        {/* Q3 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              3. How does metadata inheritance and merging work?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Metadata flows from root layout down to the page. Child segments
            override parent values. Objects like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              openGraph
            </code>{" "}
            are shallow-merged — child fields replace parent fields at the same
            key. Title uses template inheritance from the nearest layout with a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              title.template
            </code>
            .
          </p>
          <CodeBlock
            code={`// app/layout.js — root defaults
export const metadata = {
  title: { default: 'My App', template: '%s | My App' },
  description: 'Default site description',
  openGraph: { siteName: 'My App', locale: 'en_US' },
};

// app/blog/layout.js — nested overrides
export const metadata = {
  title: { default: 'Blog', template: '%s | Blog' },
  description: 'Latest articles and tutorials',
};

// app/blog/my-post/page.js
export const metadata = { title: 'My Post' };
// Final title: "My Post | Blog" (uses blog layout template)
// Final description: "Latest articles..." (from blog layout)`}
            language="javascript"
          />
        </section>

        {/* Q4 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              4. What is title.template and how does it work?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Define{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              title.template
            </code>{" "}
            in a layout to automatically suffix child page titles. Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              %s
            </code>{" "}
            as the placeholder for the child title. Set{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              title.absolute
            </code>{" "}
            on a page to bypass the template entirely.
          </p>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  title: {
    default: 'Acme Corp',
    template: '%s | Acme Corp',
  },
};

// app/products/page.js
export const metadata = { title: 'Products' };
// → <title>Products | Acme Corp</title>

// app/home/page.js — skip template
export const metadata = {
  title: { absolute: 'Welcome to Acme Corp' },
};
// → <title>Welcome to Acme Corp</title> (no suffix)`}
            language="javascript"
          />
        </section>

        {/* Q5 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              5. How do you configure Open Graph tags?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              openGraph
            </code>{" "}
            key in metadata. Next.js generates{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:title
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:description
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:image
            </code>
            , and related tags. Set{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              metadataBase
            </code>{" "}
            so relative image URLs resolve correctly for social crawlers.
          </p>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'My App',
    description: 'Build amazing things',
    url: 'https://example.com',
    siteName: 'My App',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'My App preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My App',
    description: 'Build amazing things',
    images: ['/og-default.jpg'],
  },
};`}
            language="javascript"
          />
        </section>

        {/* Q6 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              6. How do you generate dynamic OG images?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create an{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              opengraph-image.js
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              twitter-image.js
            </code>{" "}
            file that exports a default function using the ImageResponse API.
            Place at layout or page level for automatic metadata injection, or
            reference dynamically in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              generateMetadata
            </code>
            .
          </p>
          <CodeBlock
            code={`// app/blog/[slug]/opengraph-image.js
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#1a1a2e',
          color: 'white',
          padding: 48,
        }}
      >
        <h1 style={{ fontSize: 64 }}>{post.title}</h1>
        <p style={{ fontSize: 24, opacity: 0.8 }}>{post.author}</p>
      </div>
    ),
    { ...size }
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q7 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              7. How do sitemap.js and robots.js work?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Export default functions from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/sitemap.js
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/robots.js
            </code>
            . Next.js serves them at{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /sitemap.xml
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /robots.txt
            </code>{" "}
            automatically. Both can be static or dynamically generated from your
            database.
          </p>
          <CodeBlock
            code={`// app/sitemap.js
export default async function sitemap() {
  const posts = await getAllPosts();

  return [
    { url: 'https://example.com', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: 'https://example.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map((post) => ({
      url: \`https://example.com/blog/\${post.slug}\`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];
}

// app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://example.com/sitemap.xml',
  };
}`}
            language="javascript"
          />
        </section>

        {/* Q8 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              8. How do you add JSON-LD structured data?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The Metadata API doesn&apos;t have a built-in JSON-LD export. Add a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &lt;script type=&quot;application/ld+json&quot;&gt;
            </code>{" "}
            tag in your page or layout. Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              JSON.stringify
            </code>{" "}
            with proper escaping for dynamic data.
          </p>
          <CodeBlock
            code={`// app/products/[id]/page.js
export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetails product={product} />
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q9 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              9. Can Client Components export metadata?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            No. Metadata can only be exported from Server Components —{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              layout.js
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              page.js
            </code>{" "}
            files without{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &apos;use client&apos;
            </code>
            . Client Components cannot export{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              metadata
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              generateMetadata
            </code>
            . Keep the page as a Server Component and import client UI as
            children.
          </p>
          <CodeBlock
            code={`// ✅ Correct — Server Component page with client child
// app/dashboard/page.js (no 'use client')
export const metadata = { title: 'Dashboard' };

import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  return <DashboardClient />;
}

// ❌ Wrong — Client Component cannot export metadata
// 'use client';
// export const metadata = { title: 'Dashboard' }; // Error`}
            language="javascript"
          />
        </section>

        {/* Q10 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              10. What is metadataBase and why are absolute URLs important?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Social crawlers (Facebook, Twitter, Slack) need absolute URLs for OG
            images and canonical links. Set{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              metadataBase
            </code>{" "}
            in the root layout so relative paths like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /og.jpg
            </code>{" "}
            resolve to{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              https://example.com/og.jpg
            </code>
            . Without it, OG images may break in production previews.
          </p>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    images: ['/og-default.png'], // resolves to metadataBase + path
  },
  alternates: {
    canonical: '/',
  },
};`}
            language="javascript"
          />
        </section>

        {/* Q11 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              11. How do you configure icons and favicons?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Three approaches: file-based conventions (
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/favicon.ico
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/icon.png
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/apple-icon.png
            </code>
            ), metadata export, or dynamic{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              icon.js
            </code>{" "}
            generation.
          </p>
          <CodeBlock
            code={`// File-based (simplest) — place in app/
// app/favicon.ico
// app/icon.png       → <link rel="icon">
// app/apple-icon.png → <link rel="apple-touch-icon">

// Metadata export
export const metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }],
  },
};

// Dynamic icon — app/icon.js
import { ImageResponse } from 'next/og';
export const size = { width: 32, height: 32 };
export default function Icon() {
  return new ImageResponse(<div style={{ fontSize: 24 }}>A</div>, { ...size });
}`}
            language="javascript"
          />
        </section>

        {/* Q12 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              12. What is the viewport export?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Viewport settings were separated from metadata in Next.js 14. Export
            a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              viewport
            </code>{" "}
            object instead of nesting under metadata. Controls{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &lt;meta name=&quot;viewport&quot;&gt;
            </code>
            , theme color, and color scheme.
          </p>
          <CodeBlock
            code={`// app/layout.js
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'dark light',
};

// ❌ Deprecated — do not put viewport inside metadata
// export const metadata = { viewport: { ... } };`}
            language="javascript"
          />
        </section>

        {/* Q13 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              13. What is an App Router SEO checklist?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Set{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                metadataBase
              </code>{" "}
              in root layout with production URL
            </li>
            <li>Define title template and default description in root layout</li>
            <li>Use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                generateMetadata
              </code>{" "}
              for all dynamic content pages
            </li>
            <li>Configure Open Graph and Twitter cards with 1200×630 images</li>
            <li>Add{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                sitemap.js
              </code>{" "}
              and{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                robots.js
              </code>
            </li>
            <li>Set canonical URLs via{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                alternates.canonical
              </code>
            </li>
            <li>Add JSON-LD for products, articles, and organization</li>
            <li>Use semantic HTML (h1, article, nav) in page components</li>
            <li>Ensure pages are server-rendered or statically generated</li>
            <li>Test with Lighthouse, Google Rich Results, and social debuggers</li>
          </ul>
        </section>

        {/* Q14 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              14. How do you debug social sharing previews?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use platform debuggers to scrape and refresh cached previews:
            Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post
            Inspector. Common fixes: set{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              metadataBase
            </code>
            , use absolute image URLs, ensure OG image is at least 1200×630,
            verify the page is publicly accessible (not auth-gated), and check
            that metadata renders in View Page Source (not just client-side).
          </p>
          <CodeBlock
            code={`// Verify metadata in terminal
curl -s https://example.com/blog/my-post | grep 'og:'

// Common issues:
// 1. Relative image URL without metadataBase → broken preview
// 2. Auth middleware blocking crawlers → empty OG tags
// 3. generateMetadata throwing → fallback to parent metadata
// 4. Cached old preview → use debugger "Scrape Again" button

// Allow crawlers through middleware
// middleware.js — exclude OG routes or public pages
export const config = {
  matcher: ['/((?!api|_next|blog|sitemap|robots).*)'],
};`}
            language="javascript"
          />
        </section>

        {/* Q15 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              15. How does streaming metadata work?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            For dynamic pages, Next.js can stream metadata as it resolves from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              generateMetadata
            </code>
            . The initial HTML may include fallback metadata from parent
            layouts; once async metadata resolves, Next.js updates head tags.
            This prevents blocking page render on slow metadata fetches while
            still delivering correct SEO tags before hydration completes.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Keep{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              generateMetadata
            </code>{" "}
            fast — avoid heavy DB queries. Share data between{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              generateMetadata
            </code>{" "}
            and the page component using React{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              cache()
            </code>{" "}
            to deduplicate fetches.
          </p>
          <CodeBlock
            code={`import { cache } from 'react';

const getPost = cache(async (slug) => {
  return db.post.findUnique({ where: { slug } });
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post.title, description: post.excerpt };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPost(slug); // deduplicated — same request
  return <Article post={post} />;
}`}
            language="javascript"
          />
        </section>

        {/* Q16 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              16. How do robots and noindex directives work?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control indexing per page via the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              robots
            </code>{" "}
            metadata field. Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              index: false
            </code>{" "}
            for private pages, staging content, or thank-you pages. Combine with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              robots.js
            </code>{" "}
            for site-wide crawl rules.
          </p>
          <CodeBlock
            code={`// Prevent indexing of a specific page
export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

// Allow indexing but no snippet
export const metadata = {
  robots: {
    index: true,
    follow: true,
    nocache: true,
    nosnippet: true,
  },
};`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b14/lesson-6"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B14.6 Navigation
          </Link>
          <Link
            href="/learn/app-router/b14/lesson-8"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B14.8 Components & Features →
          </Link>
        </div>
      </div>
    </div>
  );
}
