import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A11.6: Head & Metadata Management - Next.js Mastery",
  description:
    "Head and metadata management reference for Next.js Pages Router",
};

export default function Lesson6Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a11"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A11 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A11.6: Head & Metadata Management
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          next/head usage, SEO optimization, dynamic meta tags, and Open Graph.
        </p>
      </div>

      <div className="space-y-8">
        {/* next/head Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. next/head Component
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/head
            </code>{" "}
            component allows you to add elements to the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              head
            </code>{" "}
            section of your HTML document. Unlike regular React where you'd use
            libraries like react-helmet, Next.js provides a built-in solution
            that properly handles server-side rendering and client-side updates.
            When multiple{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Head
            </code>{" "}
            components are used, Next.js automatically deduplicates tags like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              title
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              meta
            </code>{" "}
            tags.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Important Behavior:</strong> The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Head
            </code>{" "}
            component merges its contents with any existing head tags. Lower
            priority tags (like page-level) override higher priority tags (like
            layout-level). Tags are automatically cleaned up when the component
            unmounts, preventing memory leaks. For interview purposes,
            understand that{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/head
            </code>{" "}
            works on both server and client, ensures proper SSR for SEO, and
            handles tag deduplication automatically.
          </p>
          <CodeBlock
            code={`import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="Page description" />
      </Head>
      <h1>My Page</h1>
    </>
  );
}

// Multiple Head components are merged
export default function Page() {
  return (
    <>
      <Head>
        <title>Page Title</title>
      </Head>
      <Head>
        <meta name="description" content="Description" />
      </Head>
      {/* Both tags are added to <head> */}
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Static Meta Tags */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Static Meta Tags
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Static meta tags are defined directly in your components using{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/head
            </code>
            . They're perfect for pages where metadata doesn't change based on
            data or route parameters. Essential meta tags include title,
            description, keywords, viewport settings, and canonical URLs.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Essential Meta Tags:</strong> The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              title
            </code>{" "}
            tag is critical for SEO and appears in browser tabs and search
            results. Keep it under 60 characters for optimal display. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              description
            </code>{" "}
            meta tag should be 150-160 characters and compelling enough to
            encourage clicks from search results. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              viewport
            </code>{" "}
            tag ensures proper mobile rendering. Canonical URLs prevent
            duplicate content issues. Robots meta tags control how search
            engines index your pages. Always include these core tags for every
            page.
          </p>
          <CodeBlock
            code={`import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="Page description" />
        <meta name="keywords" content="keyword1, keyword2" />
        <meta name="author" content="Author Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="canonical" href="https://example.com/page" />
        <meta name="robots" content="index, follow" />
      </Head>
      <div>Content</div>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Dynamic Meta Tags */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Dynamic Meta Tags
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Dynamic meta tags allow you to customize page metadata based on data
            fetched from APIs, databases, or route parameters. This is essential
            for SEO when each page has unique content that needs unique
            metadata. You can set meta tags in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            and pass the data to the page component, which then uses{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/head
            </code>{" "}
            to set the tags.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Best Practices:</strong> Always fetch metadata in data
            fetching functions (not in useEffect) to ensure proper SSR and SEO.
            Use descriptive titles that include the specific content (like
            product name), write compelling descriptions that summarize the page
            content, and ensure Open Graph and Twitter Card tags match your
            dynamic content. This ensures that when pages are shared on social
            media or indexed by search engines, they have accurate, specific
            metadata rather than generic values.
          </p>
          <CodeBlock
            code={`import Head from 'next/head';

export default function ProductPage({ product }) {
  return (
    <>
      <Head>
        <title>{product.name} - My Store</title>
        <meta name="description" content={product.description} />
      </Head>
      <div>{product.name}</div>
    </>
  );
}

// With getServerSideProps
export async function getServerSideProps({ params }) {
  const product = await fetchProduct(params.id);
  return { props: { product } };
}

// With getStaticProps
export async function getStaticProps({ params }) {
  const product = await fetchProduct(params.id);
  return { props: { product } };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}`}
            language="javascript"
          />
        </section>

        {/* Open Graph Tags */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Open Graph Tags
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Open Graph (OG) tags are meta tags that control how your pages
            appear when shared on social media platforms like Facebook,
            LinkedIn, or Twitter. They enable rich previews with custom titles,
            descriptions, images, and other metadata, significantly improving
            click-through rates from social shares.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Essential Tags:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:title
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:description
            </code>{" "}
            should be compelling and specific,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:image
            </code>{" "}
            should be at least 1200x630 pixels for optimal display,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:url
            </code>{" "}
            should be the canonical URL, and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:type
            </code>{" "}
            specifies whether it's a website, article, product, etc. For
            articles, include{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              article:published_time
            </code>{" "}
            and author information.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Why it matters:</strong> Without proper OG tags, social
            platforms will generate generic previews from your page content,
            which often look unprofessional and may not accurately represent
            your content. Proper OG tags ensure your content stands out in
            social feeds, leading to higher engagement and click-through rates.
            Always test your OG tags using tools like Facebook's Sharing
            Debugger or Twitter's Card Validator.
          </p>
          <CodeBlock
            code={`import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>My Page</title>
        <meta property="og:title" content="My Page Title" />
        <meta property="og:description" content="Page description" />
        <meta property="og:image" content="https://example.com/image.jpg" />
        <meta property="og:url" content="https://example.com/page" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="My Site" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <div>Content</div>
    </>
  );
}

// Dynamic Open Graph
export default function ArticlePage({ article }) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishedAt} />
      </Head>
      <article>{article.content}</article>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Twitter Cards */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Twitter Cards
          </h2>
          <CodeBlock
            code={`import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Title" />
        <meta name="twitter:description" content="Page description" />
        <meta name="twitter:image" content="https://example.com/image.jpg" />
        <meta name="twitter:site" content="@username" />
        <meta name="twitter:creator" content="@username" />
      </Head>
      <div>Content</div>
    </>
  );
}

// Card types:
// - summary: Small card with title, description, and thumbnail
// - summary_large_image: Large card with prominent image
// - app: Mobile app card
// - player: Video/audio player card`}
            language="javascript"
          />
        </section>

        {/* Structured Data */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Structured Data (JSON-LD)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Structured data (also called Schema.org markup or JSON-LD) helps
            search engines understand your content better, enabling rich
            snippets in search results. Rich snippets can include ratings,
            prices, dates, authors, and more, making your listings more
            attractive and informative.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it works:</strong> JSON-LD (JavaScript Object Notation
            for Linked Data) is a format for embedding structured data in HTML
            using a script tag with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              type="application/ld+json"
            </code>
            . The data follows Schema.org vocabulary, which is a standardized
            way to describe things. Common schemas include Article, Product,
            Organization, BreadcrumbList, and FAQPage. Search engines parse this
            data and may display it as rich results, which can significantly
            improve click-through rates. Always validate your structured data
            using Google's Rich Results Test tool to ensure it's properly
            formatted.
          </p>
          <CodeBlock
            code={`import Head from 'next/head';

export default function ProductPage({ product }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
    },
  };
  
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <div>{product.name}</div>
    </>
  );
}

// Article structured data
export default function ArticlePage({ article }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.publishedAt,
    image: article.image,
  };
  
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <article>{article.content}</article>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* SEO Best Practices */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. SEO Best Practices
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Use unique, descriptive titles for each page</li>
            <li>Write compelling meta descriptions (150-160 characters)</li>
            <li>Include relevant keywords naturally</li>
            <li>Use canonical URLs to prevent duplicate content</li>
            <li>Add Open Graph tags for social media sharing</li>
            <li>Implement Twitter Cards for better Twitter sharing</li>
            <li>Use structured data (JSON-LD) for rich snippets</li>
            <li>Ensure mobile-friendly meta viewport tags</li>
            <li>Set appropriate robots meta tags</li>
            <li>Optimize images with alt text</li>
          </ul>
        </section>

        {/* Meta Tag Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Meta Tag Patterns
          </h2>
          <CodeBlock
            code={`// Reusable Head component
// components/SEOHead.js
import Head from 'next/head';

export default function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
}) {
  const fullTitle = title ? \`\${title} - My Site\` : 'My Site';
  const fullUrl = \`https://example.com\${url || ''}\`;
  const fullImage = image || 'https://example.com/og-default.jpg';
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Head>
  );
}

// Usage
import SEOHead from '@/components/SEOHead';

export default function Page() {
  return (
    <>
      <SEOHead
        title="My Page"
        description="Page description"
        url="/my-page"
      />
      <div>Content</div>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a11/lesson-5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Custom App & Document
          </Link>
          <Link
            href="/learn/pages-router/a11/lesson-7"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Performance & Optimization →
          </Link>
        </div>
      </div>
    </div>
  );
}
