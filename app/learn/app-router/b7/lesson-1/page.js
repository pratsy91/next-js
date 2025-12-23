import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B7.1: Static Metadata - Next.js Mastery",
  description: "Complete guide to static metadata in Next.js App Router",
};

export default function Lesson1Page() {
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
          B7.1: Static Metadata
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to configure static metadata using the metadata object
          export: titles, descriptions, Open Graph, Twitter Cards, icons, and
          more.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Metadata Object Export */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Metadata Object Export
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            In the App Router, you can export a{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              metadata
            </code>{" "}
            object or a{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              generateMetadata
            </code>{" "}
            function from any page or layout to define metadata.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Metadata Export
          </h3>
          <CodeBlock
            code={`// app/page.js or app/layout.js
export const metadata = {
  title: 'Home Page',
  description: 'Welcome to our website',
};

export default function Page() {
  return <div>Home Page</div>;
}

// app/about/page.js
export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
};

export default function AboutPage() {
  return <div>About Page</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Metadata in Layouts
          </h3>
          <CodeBlock
            code={`// app/layout.js (Root Layout)
export const metadata = {
  title: {
    default: 'My Website',
    template: '%s | My Website', // Template for child pages
  },
  description: 'Default description for all pages',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/blog/layout.js (Nested Layout)
export const metadata = {
  title: {
    default: 'Blog',
    template: '%s | Blog', // Overrides parent template
  },
  description: 'Blog posts and articles',
};

export default function BlogLayout({ children }) {
  return <div>{children}</div>;
}

// app/blog/post-1/page.js
export const metadata = {
  title: 'My First Post', // Renders as "My First Post | Blog | My Website"
  description: 'This is my first blog post',
};

export default function PostPage() {
  return <div>Post content...</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Basic Metadata Types */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Basic Metadata Types
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The metadata object supports various properties for SEO and page
            information.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Title and Description
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  // String title
  title: 'Home Page',
  
  // Or object with template
  title: {
    default: 'Home',
    template: '%s | My Site',
    absolute: 'Home - My Site', // Ignores template
  },
  
  description: 'This is the home page description',
  
  // Keywords (deprecated but still used)
  keywords: ['nextjs', 'react', 'web development'],
};

export default function Page() {
  return <div>Content</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Authors and Creator
          </h3>
          <CodeBlock
            code={`// app/blog/post/page.js
export const metadata = {
  title: 'Blog Post',
  description: 'Post description',
  
  // Single author (string)
  authors: [{ name: 'John Doe' }],
  
  // Multiple authors (array)
  authors: [
    { name: 'John Doe', url: 'https://johndoe.com' },
    { name: 'Jane Smith', url: 'https://janesmith.com' },
  ],
  
  // Creator (different from author)
  creator: 'John Doe',
  publisher: 'My Publishing Company',
  
  // Application name
  applicationName: 'My App',
};

export default function PostPage() {
  return <div>Post content</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Additional Metadata Properties
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  
  // Category
  category: 'Technology',
  
  // Classification
  classification: 'Business',
  
  // Referrer policy
  referrer: 'origin-when-cross-origin',
  
  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Metadata base URL
  metadataBase: new URL('https://example.com'),
  
  // Alternates (for translations, etc.)
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};

export default function Page() {
  return <div>Content</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Open Graph Metadata */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Open Graph Metadata
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Open Graph metadata is used by social media platforms (Facebook,
            LinkedIn, etc.) to display rich previews when your page is shared.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Open Graph
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  title: 'My Page',
  description: 'Page description',
  
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    url: 'https://example.com',
    siteName: 'My Website',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <div>Content</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Open Graph for Articles
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export const metadata = {
  title: 'Article Title',
  description: 'Article description',
  
  openGraph: {
    title: 'Article Title',
    description: 'Article description',
    url: 'https://example.com/blog/article',
    siteName: 'My Blog',
    images: [
      {
        url: 'https://example.com/blog/article-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Article image',
      },
    ],
    locale: 'en_US',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00.000Z',
    authors: ['John Doe'],
    tags: ['technology', 'web development'],
  },
};

export default function ArticlePage() {
  return <div>Article content</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Open Graph
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    url: 'https://example.com',
    siteName: 'My Website',
    
    // Multiple images
    images: [
      {
        url: 'https://example.com/image1.jpg',
        width: 1200,
        height: 630,
        alt: 'Image 1',
      },
      {
        url: 'https://example.com/image2.jpg',
        width: 1200,
        height: 630,
        alt: 'Image 2',
      },
    ],
    
    // Video (for video content)
    videos: [
      {
        url: 'https://example.com/video.mp4',
        width: 1200,
        height: 630,
        type: 'video/mp4',
      },
    ],
    
    locale: 'en_US',
    alternateLocale: ['es_ES', 'fr_FR'],
    type: 'website',
    
    // Country name
    countryName: 'United States',
  },
};

export default function Page() {
  return <div>Content</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Twitter Card Metadata */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Twitter Card Metadata
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Twitter Cards provide rich previews when your page is shared on
            Twitter/X.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Twitter Card
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  title: 'My Page',
  description: 'Page description',
  
  twitter: {
    card: 'summary',
    title: 'My Page',
    description: 'Page description',
    images: ['https://example.com/twitter-image.jpg'],
  },
};

export default function Page() {
  return <div>Content</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Twitter Card Types
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  // Summary Card (default)
  twitter: {
    card: 'summary',
    title: 'Page Title',
    description: 'Page description',
    images: ['https://example.com/image.jpg'],
    creator: '@username',
    site: '@sitename',
  },
  
  // Summary Card with Large Image
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    description: 'Page description',
    images: ['https://example.com/large-image.jpg'],
    creator: '@username',
  },
  
  // App Card
  twitter: {
    card: 'app',
    title: 'App Name',
    description: 'App description',
    site: '@sitename',
    creator: '@username',
    app: {
      name: {
        iphone: 'iPhone App',
        ipad: 'iPad App',
        googleplay: 'Android App',
      },
      id: {
        iphone: '123456789',
        ipad: '123456789',
        googleplay: 'com.example.app',
      },
      url: {
        iphone: 'https://example.com/iphone',
        ipad: 'https://example.com/ipad',
        googleplay: 'https://example.com/android',
      },
    },
  },
  
  // Player Card (for videos)
  twitter: {
    card: 'player',
    title: 'Video Title',
    description: 'Video description',
    images: ['https://example.com/video-thumb.jpg'],
    players: {
      url: 'https://example.com/video.mp4',
      width: 1280,
      height: 720,
    },
  },
};

export default function Page() {
  return <div>Content</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Icons and Manifest */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Icons and Manifest
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure favicons, app icons, and web app manifest for PWA support.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Icons
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  title: 'My App',
  description: 'App description',
  
  // Single icon (favicon.ico)
  icons: {
    icon: '/favicon.ico',
  },
  
  // Multiple icon sizes
  icons: {
    icon: [
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
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
            Advanced Icons Configuration
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  icons: {
    // Regular icons
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    
    // Shortcut icon
    shortcut: '/shortcut-icon.ico',
    
    // Apple touch icon
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    
    // Other icons
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
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
            Web App Manifest
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  title: 'My PWA',
  description: 'Progressive Web App',
  
  manifest: '/manifest.json',
  
  // Or inline manifest
  manifest: {
    name: 'My PWA',
    short_name: 'PWA',
    description: 'Progressive Web App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
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

        {/* Section 6: Robots Metadata */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Robots Metadata
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control how search engines index and crawl your pages.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Robots Configuration
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  
  // Simple robots configuration
  robots: {
    index: true, // Allow indexing
    follow: true, // Follow links
    nocache: false, // Allow caching
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Page() {
  return <div>Content</div>;
}

// Or use string shorthand
export const metadata = {
  robots: 'index, follow',
  // Or
  robots: 'noindex, nofollow',
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Advanced Robots Configuration
          </h3>
          <CodeBlock
            code={`// app/page.js
export const metadata = {
  robots: {
    // Main robots
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': 5, // 5 seconds
      'max-image-preview': 'standard', // none, standard, large
      'max-snippet': 100, // 100 characters
    },
    
    // Additional robots directives
    notranslate: true, // Don't offer translation
    noarchive: true, // Don't show cached link
    nosnippet: true, // Don't show snippet
    noimageindex: true, // Don't index images
    unavailable_after: '2025-12-31T23:59:59Z', // Remove after date
  },
};

export default function Page() {
  return <div>Content</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 7: Verification Metadata */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Verification Metadata
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Verify ownership of your website with various services (Google
            Search Console, Bing, etc.).
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Verification Codes
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  title: 'My Website',
  
  // Google Search Console verification
  verification: {
    google: 'your-google-verification-code',
    
    // Other verification services
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      me: ['https://example.com/verify.html'],
      'example-service': 'verification-code',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// Or use separate properties
export const metadata = {
  verification: {
    google: 'abc123',
    yandex: 'def456',
  },
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Additional Verification
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  // Multiple verification methods
  verification: {
    // Google Search Console
    google: 'your-google-code',
    
    // Bing Webmaster Tools
    other: {
      'msvalidate.01': 'your-bing-code',
      'facebook-domain-verification': 'your-facebook-code',
    },
  },
  
  // Apple App verification
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'My App',
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
            href="/learn/app-router/b6/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B6.3 URL State Management
          </Link>
          <Link
            href="/learn/app-router/b7/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B7.2 Dynamic Metadata →
          </Link>
        </div>
      </div>
    </div>
  );
}
