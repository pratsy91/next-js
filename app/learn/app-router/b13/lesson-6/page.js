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
