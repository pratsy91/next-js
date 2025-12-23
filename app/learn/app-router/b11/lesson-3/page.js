import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B11.3: SEO - Next.js Mastery",
  description: "Complete guide to SEO optimization in Next.js App Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b11"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B11 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B11.3: SEO
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to optimize SEO in Next.js App Router: metadata
          optimization, structured data, sitemap generation, robots.txt, Open
          Graph, and Twitter Cards.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Metadata Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Metadata Optimization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Optimize metadata for better search engine visibility.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Comprehensive Metadata
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  title: {
    default: 'My Website',
    template: '%s | My Website',
  },
  description: 'Comprehensive description of your website',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  authors: [{ name: 'Author Name', url: 'https://example.com' }],
  creator: 'Author Name',
  publisher: 'Publisher Name',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'My Website',
    description: 'Website description',
    url: 'https://example.com',
    siteName: 'My Website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OG Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Website',
    description: 'Website description',
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Metadata
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: \`/blog/\${params.slug}\`,
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await fetchPost(params.slug);
  return <article>{post.content}</article>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Structured Data */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Structured Data
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add structured data (JSON-LD) to help search engines understand your
            content.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Structured Data
          </h3>
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

// app/page.js
import StructuredData from '@/components/StructuredData';

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'My Website',
    url: 'https://example.com',
    description: 'Website description',
  };
  
  return (
    <>
      <StructuredData data={structuredData} />
      <div>Home Page</div>
    </>
  );
}

// Article structured data
// app/blog/[slug]/page.js
export default async function BlogPost({ params }) {
  const post = await fetchPost(params.slug);
  
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'My Website',
      logo: {
        '@type': 'ImageObject',
        url: 'https://example.com/logo.jpg',
      },
    },
  };
  
  return (
    <>
      <StructuredData data={articleStructuredData} />
      <article>{post.content}</article>
    </>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Structured Data
          </h3>
          <CodeBlock
            code={`// Organization structured data
// app/layout.js
export default function RootLayout({ children }) {
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'My Company',
    url: 'https://example.com',
    logo: 'https://example.com/logo.jpg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-555-5555',
      contactType: 'customer service',
    },
    sameAs: [
      'https://twitter.com/company',
      'https://facebook.com/company',
    ],
  };
  
  return (
    <html lang="en">
      <head>
        <StructuredData data={organizationStructuredData} />
      </head>
      <body>{children}</body>
    </html>
  );
}

// Product structured data
// app/products/[id]/page.js
export default async function ProductPage({ params }) {
  const product = await fetchProduct(params.id);
  
  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: \`https://example.com/products/\${params.id}\`,
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };
  
  return (
    <>
      <StructuredData data={productStructuredData} />
      <div>{product.name}</div>
    </>
  );
}

// Breadcrumb structured data
export function BreadcrumbStructuredData({ items }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  
  return <StructuredData data={structuredData} />;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Sitemap Generation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Sitemap Generation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Generate sitemaps to help search engines discover and index your
            pages.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Static Sitemap
          </h3>
          <CodeBlock
            code={`// app/sitemap.js (or sitemap.ts)
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://example.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}

// Accessible at: /sitemap.xml

// Dynamic sitemap
// app/sitemap.js
export default async function sitemap() {
  // Fetch all blog posts
  const posts = await fetchAllPosts();
  
  const postUrls = posts.map((post) => ({
    url: \`https://example.com/blog/\${post.slug}\`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://example.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...postUrls,
  ];
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Sitemap
          </h3>
          <CodeBlock
            code={`// app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'https://example.com';
  
  // Fetch dynamic content
  const [posts, products, categories] = await Promise.all([
    fetchAllPosts(),
    fetchAllProducts(),
    fetchAllCategories(),
  ]);
  
  // Generate URLs
  const postUrls = posts.map((post) => ({
    url: \`\${baseUrl}/blog/\${post.slug}\`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  const productUrls = products.map((product) => ({
    url: \`\${baseUrl}/products/\${product.id}\`,
    lastModified: product.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));
  
  const categoryUrls = categories.map((category) => ({
    url: \`\${baseUrl}/categories/\${category.slug}\`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: \`\${baseUrl}/about\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...postUrls,
    ...productUrls,
    ...categoryUrls,
  ];
}

// Sitemap index (for large sites)
// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
    },
  ];
}

// app/sitemap-posts.js
export default async function sitemap() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({
    url: \`https://example.com/blog/\${post.slug}\`,
    lastModified: post.updatedAt,
  }));
}

// app/sitemap-products.js
export default async function sitemap() {
  const products = await fetchAllProducts();
  return products.map((product) => ({
    url: \`https://example.com/products/\${product.id}\`,
    lastModified: product.updatedAt,
  }));
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: robots.txt */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. robots.txt
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure robots.txt to control how search engines crawl your site.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Static robots.txt
          </h3>
          <CodeBlock
            code={`// app/robots.js (or robots.ts)
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: 'https://example.com/sitemap.xml',
  };
}

// Generates: /robots.txt

// Dynamic robots.txt
// app/robots.js
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/_next/'],
    },
    sitemap: \`\${baseUrl}/sitemap.xml\`,
  };
}

// Environment-based robots.txt
export default function robots() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    rules: {
      userAgent: '*',
      allow: isProduction ? '/' : '/',
      disallow: isProduction ? ['/admin/', '/api/'] : ['/'],
    },
    sitemap: isProduction
      ? 'https://example.com/sitemap.xml'
      : undefined,
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced robots.txt
          </h3>
          <CodeBlock
            code={`// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: [
      'https://example.com/sitemap.xml',
      'https://example.com/sitemap-posts.xml',
      'https://example.com/sitemap-products.xml',
    ],
  };
}

// Or use static file
// public/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://example.com/sitemap.xml`}
            language="text"
          />
        </section>

        {/* Section 5: Open Graph */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Open Graph
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Optimize Open Graph metadata for better social media sharing.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Comprehensive Open Graph
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  openGraph: {
    title: 'My Website',
    description: 'Website description',
    url: 'https://example.com',
    siteName: 'My Website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OG Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

// Dynamic Open Graph
// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: \`https://example.com/blog/\${params.slug}\`,
      siteName: 'My Blog',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

// Article Open Graph
export const metadata = {
  openGraph: {
    type: 'article',
    publishedTime: '2024-01-01T00:00:00.000Z',
    modifiedTime: '2024-01-02T00:00:00.000Z',
    authors: ['Author Name'],
    tags: ['tag1', 'tag2'],
  },
};`}
            language="javascript"
          />
        </section>

        {/* Section 6: Twitter Cards */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Twitter Cards
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Optimize Twitter Card metadata for better Twitter/X sharing.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Twitter Card Types
          </h3>
          <CodeBlock
            code={`// Summary Card (default)
// app/layout.js
export const metadata = {
  twitter: {
    card: 'summary',
    title: 'My Website',
    description: 'Website description',
    images: ['/twitter-image.jpg'],
    creator: '@username',
    site: '@sitename',
  },
};

// Summary Card with Large Image
export const metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'My Website',
    description: 'Website description',
    images: ['/large-image.jpg'],
    creator: '@username',
  },
};

// Dynamic Twitter Cards
// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      creator: post.author.twitter,
      site: '@myblog',
    },
  };
}

// App Card
export const metadata = {
  twitter: {
    card: 'app',
    title: 'My App',
    description: 'App description',
    site: '@myapp',
    creator: '@developer',
    app: {
      name: {
        iphone: 'My App iOS',
        ipad: 'My App iPad',
        googleplay: 'My App Android',
      },
      id: {
        iphone: '123456789',
        ipad: '123456789',
        googleplay: 'com.example.app',
      },
      url: {
        iphone: 'https://apps.apple.com/app/id123456789',
        ipad: 'https://apps.apple.com/app/id123456789',
        googleplay: 'https://play.google.com/store/apps/details?id=com.example.app',
      },
    },
  },
};`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b11/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B11.2 Caching
          </Link>
          <Link
            href="/learn/app-router/b12"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B12 Deployment →
          </Link>
        </div>
      </div>
    </div>
  );
}
