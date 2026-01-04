import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.6: Metadata & SEO - Next.js Mastery",
  description: "Metadata and SEO reference for Next.js App Router",
};

export default function Lesson6Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b13"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B13 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B13.6: Metadata & SEO
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Static and dynamic metadata, SEO optimization, Open Graph, and social
          media tags.
        </p>
      </div>

      <div className="space-y-8">
        {/* Metadata API Basics */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Metadata API Basics
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The Metadata API in App Router replaces{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/head
            </code>{" "}
            with a more powerful, type-safe system for managing page metadata.
            Instead of manually adding{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Head
            </code>{" "}
            components, you export a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              metadata
            </code>{" "}
            object or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              generateMetadata
            </code>{" "}
            function that Next.js automatically injects into the document head.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Benefits:</strong> The Metadata API is type-safe, prevents
            common SEO mistakes, automatically merges metadata from layouts and
            pages, supports dynamic metadata generation, and provides better
            TypeScript support. Metadata can be defined at the layout level
            (shared across routes) or page level (specific to a route), and
            Next.js intelligently merges them. This is a significant improvement
            over Pages Router where you had to manually manage head tags and be
            careful about deduplication.
          </p>
          <CodeBlock
            code={`// app/layout.js or app/page.js
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
};

export default function Page() {
  return <h1>My Page</h1>;
}`}
            language="javascript"
          />
        </section>

        {/* Static Metadata */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Static Metadata
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Static metadata is defined using a metadata object that contains all
            the metadata properties for your page. This is used when metadata
            doesn't change based on route parameters or data - it's constant for
            that route. The metadata object supports comprehensive SEO
            properties including title templates, descriptions, Open Graph tags,
            Twitter Cards, robots directives, and more.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Features:</strong> Title templates allow you to define a
            default title and a template for nested routes (e.g., "About | My
            Site"). The metadata object supports nested objects for Open Graph,
            Twitter Cards, and robots directives, providing fine-grained
            control.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              metadataBase
            </code>{" "}
            sets a base URL for relative URLs in metadata.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              formatDetection
            </code>{" "}
            controls automatic detection of emails, addresses, and phone
            numbers.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              alternates
            </code>{" "}
            supports canonical URLs and language alternatives for
            internationalization.
          </p>
          <CodeBlock
            code={`export const metadata: Metadata = {
  title: {
    default: 'Default Title',
    template: '%s | My Site',
  },
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  authors: [{ name: 'Author Name' }],
  creator: 'Creator Name',
  publisher: 'Publisher Name',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://example.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    url: 'https://example.com',
    siteName: 'My Site',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Title',
    description: 'Twitter Description',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};`}
            language="javascript"
          />
        </section>

        {/* Dynamic Metadata */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Dynamic Metadata & generateMetadata
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            For dynamic routes where metadata depends on the route parameters or
            fetched data, use the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              generateMetadata
            </code>{" "}
            async function. This function receives the same parameters as your
            page component (
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              params
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              searchParams
            </code>
            ) and can fetch data to generate metadata dynamically.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it works:</strong> Next.js calls{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              generateMetadata
            </code>{" "}
            before rendering the page, allowing you to fetch data specifically
            for metadata (like fetching a product name for the page title). The
            function runs in parallel with page data fetching when possible, and
            can await promises just like Server Components. This ensures SEO
            metadata is always accurate and reflects the actual content, which
            is crucial for social media sharing and search engine indexing.
          </p>
          <CodeBlock
            code={`// app/products/[id]/page.js
export async function generateMetadata({ params, searchParams }) {
  const product = await fetchProduct(params.id);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await fetchProduct(params.id);
  return <div>{product.name}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Open Graph & Twitter */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Open Graph & Twitter Cards
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Open Graph and Twitter Cards are metadata protocols that control how
            your content appears when shared on social media platforms. When
            someone shares a link to your site on Facebook, LinkedIn, Twitter/X,
            or other platforms, these tags determine the title, description,
            image, and other preview information shown in the social media post.
            Without proper Open Graph and Twitter Card metadata, your shared
            links will show generic previews with minimal information, reducing
            click-through rates significantly.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Open Graph Protocol:</strong> Open Graph is a protocol
            created by Facebook that allows web pages to become rich objects in
            social graphs. It uses{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:
            </code>{" "}
            prefixed meta tags to define how content should appear when shared.
            Essential Open Graph tags include{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:title
            </code>{" "}
            (the title of your content),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:description
            </code>{" "}
            (a brief description),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:image
            </code>{" "}
            (the preview image, ideally 1200x630 pixels),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:url
            </code>{" "}
            (canonical URL), and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:type
            </code>{" "}
            (website, article, product, etc.). Most major platforms (Facebook,
            LinkedIn, WhatsApp, Slack) support Open Graph tags.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Twitter Cards:</strong> Twitter Cards are Twitter/X-specific
            metadata tags that enhance how tweets display when they contain
            links to your content. While Twitter also reads Open Graph tags,
            using dedicated Twitter Card tags gives you more control over how
            content appears specifically on Twitter/X. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              twitter:card
            </code>{" "}
            property defines the card type:{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              summary
            </code>{" "}
            (small card with thumbnail),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              summary_large_image
            </code>{" "}
            (large prominent image, most common for articles),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app
            </code>{" "}
            (mobile app installs), or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              player
            </code>{" "}
            (video/audio embeds). Twitter Cards significantly improve engagement
            rates compared to plain text links.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Image Requirements:</strong> Images are crucial for social
            media sharing. Open Graph images should be at least 1200x630 pixels
            with a 1.91:1 aspect ratio. Twitter Cards work best with images that
            are at least 1200x675 pixels. Always use absolute URLs (with
            https://) for images, not relative paths. Images should be optimized
            (compressed) to load quickly while maintaining quality. Consider
            creating unique Open Graph images for different content types (blog
            posts, products, landing pages) to make shares more visually
            appealing and recognizable.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Best Practices:</strong> Always include Open Graph tags even
            if you also include Twitter Cards, as most platforms use Open Graph.
            Use descriptive, compelling titles and descriptions that encourage
            clicks. Keep descriptions under 160 characters for optimal display.
            Use high-quality, relevant images that accurately represent your
            content. Set{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:type
            </code>{" "}
            appropriately (website for homepages, article for blog posts,
            product for product pages). Include{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              og:locale
            </code>{" "}
            for international sites. Test your tags using Facebook's Sharing
            Debugger, Twitter's Card Validator, or LinkedIn's Post Inspector to
            ensure they display correctly.
          </p>
          <CodeBlock
            code={`export const metadata: Metadata = {
  openGraph: {
    title: 'My Page',
    description: 'Description',
    url: 'https://example.com',
    siteName: 'My Site',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Image alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Title',
    description: 'Twitter Description',
    images: ['/twitter-image.jpg'],
    creator: '@username',
  },
};`}
            language="javascript"
          />
        </section>

        {/* Sitemap & Robots */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Sitemap & Robots.txt
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Sitemaps and robots.txt are two critical files for search engine
            optimization (SEO) that help search engines understand and crawl
            your website more effectively. A sitemap (XML format) provides a
            structured list of all pages on your site, while robots.txt tells
            search engine crawlers which parts of your site they can or cannot
            access. Together, they help ensure search engines discover and index
            your content efficiently while avoiding unnecessary crawling of
            private or duplicate content.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>XML Sitemaps:</strong> An XML sitemap is a file that lists
            all URLs on your website along with metadata about each URL, such as
            when it was last modified, how often it changes, and its relative
            importance (priority). Search engines use sitemaps to discover pages
            they might not find through normal crawling, understand site
            structure, and prioritize which pages to crawl first. Sitemaps are
            especially important for large sites, new sites with few external
            links, sites with dynamic content, or sites with pages that aren't
            well-connected through internal links. In Next.js App Router, you
            create sitemaps by exporting a default function from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/sitemap.js
            </code>{" "}
            that returns an array of URL objects.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Sitemap Properties:</strong> Each sitemap entry can include
            several optional properties:{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              url
            </code>{" "}
            (required, absolute URL),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              lastModified
            </code>{" "}
            (when the page was last updated, helps crawlers know if re-crawling
            is needed),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              changeFrequency
            </code>{" "}
            (always, hourly, daily, weekly, monthly, yearly, never - indicates
            how often content changes), and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              priority
            </code>{" "}
            (0.0 to 1.0, relative importance compared to other pages on your
            site). While these hints help, search engines may not strictly
            follow them - they're suggestions, not commands.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Robots.txt:</strong> The robots.txt file is a text file
            placed at the root of your website (
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /robots.txt
            </code>
            ) that instructs web crawlers which pages or directories they should
            or shouldn't crawl. It uses a simple format with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              User-agent
            </code>{" "}
            (which crawler the rule applies to, * means all),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Allow
            </code>{" "}
            (paths crawlers can access), and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Disallow
            </code>{" "}
            (paths to block). You can also include the location of your sitemap.
            In Next.js App Router, create{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/robots.js
            </code>{" "}
            (or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              app/robots.txt
            </code>
            ) to generate robots.txt dynamically.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Best Practices:</strong> For sitemaps, include all important
            pages, use absolute URLs with https://, keep sitemaps under 50,000
            URLs or 50MB (split into multiple sitemaps if needed), update
            lastModified dates when content changes, and submit your sitemap to
            Google Search Console and Bing Webmaster Tools. For robots.txt,
            explicitly allow important paths if you use disallow rules, block
            access to admin areas, API endpoints that shouldn't be indexed,
            private user areas, and duplicate content (like print versions),
            always include your sitemap location, and test your robots.txt using
            Google Search Console's robots.txt tester. Remember that robots.txt
            is not a security mechanism - it's a suggestion that well-behaved
            crawlers follow, but malicious bots may ignore it.
          </p>
          <CodeBlock
            code={`// app/sitemap.js
export default async function sitemap() {
  const posts = await fetchPosts();
  
  const postEntries = posts.map((post) => ({
    url: \`https://example.com/posts/\${post.id}\`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...postEntries,
  ];
}

// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: 'https://example.com/sitemap.xml',
  };
}`}
            language="javascript"
          />
        </section>

        {/* Structured Data */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Structured Data (JSON-LD)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Structured data (also known as Schema.org markup or JSON-LD) is a
            standardized way to annotate your content with metadata that helps
            search engines understand what your content is about. Unlike regular
            HTML text that humans can read, structured data provides
            machine-readable information about entities, relationships, and
            content types. This enables search engines to display rich snippets
            in search results - enhanced listings that can include ratings,
            prices, dates, authors, images, and more, making your content more
            attractive and informative in search results.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>JSON-LD Format:</strong> JSON-LD (JavaScript Object Notation
            for Linked Data) is a format for embedding structured data in HTML
            using a script tag with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              type="application/ld+json"
            </code>
            . The data follows the Schema.org vocabulary, which is a
            collaborative, community-driven standard for describing things on
            the web. JSON-LD is preferred over other structured data formats
            (microdata, RDFa) because it's clean, easy to maintain, and doesn't
            clutter your HTML markup - it's kept separate in script tags. Google
            recommends JSON-LD as the preferred format for structured data.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Schema.org Vocabulary:</strong> Schema.org provides a
            standardized vocabulary of schemas (types) and properties for
            describing common things like articles, products, organizations,
            events, recipes, reviews, FAQs, and more. Each schema has specific
            required and optional properties. For example, an Article schema
            might require{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              headline
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              author
            </code>
            , and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              datePublished
            </code>
            , while a Product schema requires{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              name
            </code>{" "}
            and can include{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              offers
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              aggregateRating
            </code>
            , and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              brand
            </code>
            . Using the correct schema helps search engines understand your
            content and enables rich result features.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Rich Results & Benefits:</strong> Properly implemented
            structured data can enable rich results (also called rich snippets)
            in search engines, which significantly improve click-through rates.
            Rich results can display star ratings, prices, availability, event
            dates, article publish dates, FAQ answers, recipe cooking times, and
            much more directly in search results. This makes your listings stand
            out and provides users with more information before they click,
            improving both visibility and user experience. Google's Rich Results
            Test tool can validate whether your structured data is correctly
            formatted and eligible for rich results.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Common Schema Types:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Article
            </code>{" "}
            for blog posts and news articles (enables article rich results),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Product
            </code>{" "}
            for e-commerce products (shows price, rating, availability),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Organization
            </code>{" "}
            for business information (logo in search results),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              BreadcrumbList
            </code>{" "}
            for navigation breadcrumbs (shows site hierarchy in search),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              FAQPage
            </code>{" "}
            for frequently asked questions (shows Q&A directly in search),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Recipe
            </code>{" "}
            for cooking recipes, and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Event
            </code>{" "}
            for event listings. Each schema has specific requirements and
            optional properties that enhance the rich result.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Best Practices:</strong> Always use valid Schema.org
            vocabulary and follow Google's structured data guidelines. Include
            only accurate, visible information that matches what users see on
            the page - don't add hidden structured data. Use the most specific
            schema type available (e.g., use Article instead of CreativeWork
            when appropriate). Validate your structured data using Google's Rich
            Results Test or Schema.org validator before deploying. Keep
            structured data minimal and focused - include only relevant
            properties, don't add unnecessary data. For dynamic content,
            generate structured data server-side based on actual page data.
            Ensure your structured data stays in sync with your actual content -
            outdated structured data can hurt SEO.
          </p>
          <CodeBlock
            code={`// app/components/StructuredData.js
export function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Usage
export default function ProductPage({ product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
  };
  
  return (
    <>
      <StructuredData data={jsonLd} />
      <div>{product.name}</div>
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
            <li>Use descriptive titles and descriptions</li>
            <li>Include relevant keywords naturally</li>
            <li>Optimize images with alt text</li>
            <li>Use canonical URLs</li>
            <li>Create XML sitemap</li>
            <li>Configure robots.txt properly</li>
            <li>Use structured data (JSON-LD)</li>
            <li>Optimize Open Graph and Twitter cards</li>
            <li>Ensure fast page load times</li>
            <li>Use semantic HTML</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13/lesson-5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: API Routes & Route Handlers
          </Link>
          <Link
            href="/learn/app-router/b13/lesson-7"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Performance & Optimization →
          </Link>
        </div>
      </div>
    </div>
  );
}
