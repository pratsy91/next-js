import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B7.3: Metadata Patterns - Next.js Mastery",
  description: "Common patterns for using metadata in Next.js App Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b7"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B7 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B7.3: Metadata Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn practical patterns for optimizing metadata: SEO best practices,
          social media sharing, dynamic titles, canonical URLs, and alternate
          languages.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: SEO Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. SEO Optimization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Best practices for optimizing metadata for search engines.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Comprehensive SEO Metadata
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  // Essential SEO fields
  title: {
    default: 'My Website - Best Solutions',
    template: '%s | My Website',
  },
  description: 'Discover the best solutions for your needs. We provide top-quality services.',
  
  // Keywords (less important now, but still used)
  keywords: ['solution', 'service', 'quality', 'best'],
  
  // Open Graph for social sharing (important for SEO)
  openGraph: {
    title: 'My Website - Best Solutions',
    description: 'Discover the best solutions for your needs.',
    url: 'https://example.com',
    siteName: 'My Website',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My Website Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'My Website - Best Solutions',
    description: 'Discover the best solutions for your needs.',
    images: ['https://example.com/twitter-image.jpg'],
  },
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://example.com',
  },
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function HomePage() {
  return <div>Home content</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            SEO-Optimized Dynamic Pages
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  // Generate SEO-friendly metadata
  const seoTitle = \`\${post.title} | Blog\`;
  const seoDescription = post.excerpt || post.content.slice(0, 160);
  const seoKeywords = post.tags.join(', ');
  
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: \`https://example.com/blog/\${params.slug}\`,
      siteName: 'My Blog',
      images: [
        {
          url: post.image || '/default-og.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [post.image || '/default-twitter.jpg'],
    },
    
    alternates: {
      canonical: \`https://example.com/blog/\${params.slug}\`,
    },
    
    robots: {
      index: !post.draft, // Don't index drafts
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await fetchPost(params.slug);
  return <article>{post.content}</article>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Structured Data with JSON-LD
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    title: post.title,
    description: post.description,
    // ... other metadata
  };
}

export default async function BlogPostPage({ params }) {
  const post = await fetchPost(params.slug);
  
  // Structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'My Blog',
      logo: {
        '@type': 'ImageObject',
        url: 'https://example.com/logo.png',
      },
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <h1>{post.title}</h1>
        <div>{post.content}</div>
      </article>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Social Media Sharing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Social Media Sharing
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Optimize metadata for social media platforms to ensure rich previews
            when your content is shared.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Rich Social Media Previews
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    title: post.title,
    description: post.description,
    
    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: post.title,
      description: post.description,
      url: \`https://example.com/blog/\${params.slug}\`,
      siteName: 'My Blog',
      images: [
        {
          url: post.ogImage || post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
    },
    
    // Twitter/X Card
    twitter: {
      card: 'summary_large_image',
      site: '@mysite',
      creator: post.author.twitter,
      title: post.title,
      description: post.description,
      images: [post.twitterImage || post.image],
    },
    
    // Additional social metadata
    other: {
      'article:published_time': post.publishedAt,
      'article:modified_time': post.updatedAt,
      'article:author': post.author.name,
      'article:section': post.category,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await fetchPost(params.slug);
  return <article>{post.content}</article>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Video Content Sharing
          </h3>
          <CodeBlock
            code={`// app/videos/[id]/page.js
export async function generateMetadata({ params }) {
  const video = await fetchVideo(params.id);
  
  return {
    title: video.title,
    description: video.description,
    
    openGraph: {
      title: video.title,
      description: video.description,
      url: \`https://example.com/videos/\${params.id}\`,
      type: 'video.other',
      images: [
        {
          url: video.thumbnail,
          width: 1200,
          height: 630,
          alt: video.title,
        },
      ],
      videos: [
        {
          url: video.url,
          width: video.width || 1920,
          height: video.height || 1080,
          type: 'video/mp4',
        },
      ],
      duration: video.duration,
      releaseDate: video.publishedAt,
    },
    
    twitter: {
      card: 'player',
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
      players: {
        url: video.url,
        width: video.width || 1920,
        height: video.height || 1080,
      },
    },
  };
}

export default async function VideoPage({ params }) {
  const video = await fetchVideo(params.id);
  return (
    <div>
      <h1>{video.title}</h1>
      <video src={video.url} controls />
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Dynamic Titles */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Dynamic Titles
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Generate dynamic, context-aware page titles based on data, routes,
            and user actions.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Title Templates
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  title: {
    default: 'My Website',
    template: '%s | My Website',
  },
};

// app/blog/layout.js
export const metadata = {
  title: {
    default: 'Blog',
    template: '%s | Blog | My Website',
  },
};

// app/blog/post/page.js
export const metadata = {
  title: 'My First Post',
  // Result: "My First Post | Blog | My Website"
};

// Using absolute title to ignore template
export const metadata = {
  title: {
    absolute: 'My First Post',
    // Result: "My First Post" (ignores templates)
  },
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Titles with generateMetadata
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
export async function generateMetadata({ params, searchParams }) {
  const product = await fetchProduct(params.id);
  const view = searchParams.view;
  
  let title = product.name;
  
  // Add context based on view
  if (view === 'compare') {
    title = \`Compare: \${product.name}\`;
  } else if (view === 'preview') {
    title = \`Preview: \${product.name}\`;
  }
  
  return {
    title: title,
    // Template from layout will be applied
  };
}

// app/search/page.js
export async function generateMetadata({ searchParams }) {
  const query = searchParams.q || 'Search';
  const page = searchParams.page || '1';
  const totalResults = await getSearchResultsCount(query);
  
  return {
    title: totalResults > 0
      ? \`\${totalResults} results for "\${query}"\`
      : \`No results for "\${query}"\`,
  };
}

// app/users/[id]/settings/[tab]/page.js
export async function generateMetadata({ params }) {
  const { id, tab } = params;
  const user = await fetchUser(id);
  const tabName = tab.charAt(0).toUpperCase() + tab.slice(1);
  
  return {
    title: \`\${tabName} Settings - \${user.name}\`,
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Canonical URLs */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Canonical URLs
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Canonical URLs help search engines understand the preferred version
            of a page, preventing duplicate content issues.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Canonical URLs
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  title: 'Home',
  alternates: {
    canonical: 'https://example.com',
  },
};

// app/about/page.js
export const metadata = {
  title: 'About',
  alternates: {
    canonical: 'https://example.com/about',
  },
};

// Using metadataBase (set in root layout)
// app/layout.js
export const metadata = {
  metadataBase: new URL('https://example.com'),
};

// app/products/page.js
export const metadata = {
  title: 'Products',
  alternates: {
    canonical: '/products', // Automatically resolves to https://example.com/products
  },
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Canonical URLs
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    title: post.title,
    alternates: {
      canonical: \`https://example.com/blog/\${params.slug}\`,
    },
  };
}

// app/products/page.js (with search params handling)
export async function generateMetadata({ searchParams }) {
  const category = searchParams.category;
  
  // Canonical URL without query params (preferred version)
  const canonicalUrl = category
    ? \`https://example.com/products?category=\${category}\`
    : 'https://example.com/products';
  
  return {
    title: 'Products',
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Preventing duplicate content with canonical
// app/blog/[slug]/page.js
export async function generateMetadata({ params, searchParams }) {
  const post = await fetchPost(params.slug);
  const source = searchParams.source;
  
  // Canonical always points to clean URL (no source param)
  return {
    title: post.title,
    alternates: {
      canonical: \`https://example.com/blog/\${params.slug}\`,
      // source param variations won't create duplicate content
    },
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Canonical for Paginated Content
          </h3>
          <CodeBlock
            code={`// app/blog/page.js
export async function generateMetadata({ searchParams }) {
  const page = parseInt(searchParams.page || '1');
  
  return {
    title: \`Blog - Page \${page}\`,
    alternates: {
      // First page is canonical
      canonical: page === 1
        ? 'https://example.com/blog'
        : \`https://example.com/blog?page=\${page}\`,
    },
  };
}

// app/products/page.js
export async function generateMetadata({ searchParams }) {
  const page = searchParams.page || '1';
  const category = searchParams.category || '';
  
  // Build canonical URL
  let canonicalUrl = 'https://example.com/products';
  const params = new URLSearchParams();
  
  if (category && category !== 'all') {
    params.append('category', category);
  }
  
  if (page !== '1') {
    params.append('page', page);
  }
  
  if (params.toString()) {
    canonicalUrl += \`?\${params.toString()}\`;
  }
  
  return {
    title: 'Products',
    alternates: {
      canonical: canonicalUrl,
    },
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Alternate Languages */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Alternate Languages
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure alternate language versions of your pages for
            international SEO and user experience.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Alternate Languages
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  title: 'Home',
  alternates: {
    canonical: 'https://example.com',
    languages: {
      'en-US': 'https://example.com/en',
      'es-ES': 'https://example.com/es',
      'fr-FR': 'https://example.com/fr',
      'de-DE': 'https://example.com/de',
    },
  },
};

// app/[locale]/page.js
export async function generateMetadata({ params }) {
  const locale = params.locale; // 'en', 'es', 'fr', etc.
  
  return {
    title: getLocalizedTitle(locale),
    alternates: {
      canonical: \`https://example.com/\${locale}\`,
      languages: {
        'en-US': 'https://example.com/en',
        'es-ES': 'https://example.com/es',
        'fr-FR': 'https://example.com/fr',
      },
    },
  };
}

export default function LocalizedPage({ params }) {
  const locale = params.locale;
  const content = getLocalizedContent(locale);
  return <div>{content}</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Dynamic Alternate Languages
          </h3>
          <CodeBlock
            code={`// app/[locale]/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const { locale, slug } = params;
  const post = await fetchPost(slug, locale);
  const availableLocales = await getAvailableLocales(slug);
  
  // Build languages object dynamically
  const languages = {};
  availableLocales.forEach((loc) => {
    languages[loc.code] = \`https://example.com/\${loc.code}/blog/\${slug}\`;
  });
  
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: \`https://example.com/\${locale}/blog/\${slug}\`,
      languages: languages,
    },
    openGraph: {
      locale: locale,
      alternateLocale: availableLocales.map((loc) => loc.code),
    },
  };
}

export default async function LocalizedBlogPost({ params }) {
  const { locale, slug } = params;
  const post = await fetchPost(slug, locale);
  return <article>{post.content}</article>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            x-default Language
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  title: 'Home',
  alternates: {
    canonical: 'https://example.com',
    languages: {
      'x-default': 'https://example.com/en', // Default language
      'en-US': 'https://example.com/en',
      'es-ES': 'https://example.com/es',
      'fr-FR': 'https://example.com/fr',
    },
  },
};

// Using in root layout
// app/layout.js
export const metadata = {
  metadataBase: new URL('https://example.com'),
  alternates: {
    languages: {
      'x-default': '/en',
      'en': '/en',
      'es': '/es',
      'fr': '/fr',
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
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b7/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B7.2 Dynamic Metadata
          </Link>
          <Link
            href="/learn/app-router/b8"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B8 Components & Features →
          </Link>
        </div>
      </div>
    </div>
  );
}
