import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A9.3: SEO - Next.js Mastery",
  description: "Complete guide to SEO optimization in Next.js Pages Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a9"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A9 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A9.3: SEO
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn SEO optimization: meta tags, structured data, sitemap
          generation, robots.txt, Open Graph, and Twitter Cards.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Meta Tags Optimization */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Meta Tags Optimization
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Optimize meta tags using{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/head
            </code>{" "}
            for better search engine visibility.
          </p>

          <CodeBlock
            code={`// pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Website - Home</title>
        <meta name="description" content="Welcome to my website" />
        <meta name="keywords" content="website, blog, articles" />
        <meta name="author" content="Your Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://example.com" />
      </Head>
      <main>
        <h1>Welcome</h1>
      </main>
    </>
  );
}

// Dynamic meta tags
// pages/blog/[slug].js
import Head from 'next/head';

export async function getServerSideProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post } };
}

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} - My Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={\`https://example.com/blog/\${post.slug}\`} />
      </Head>
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}

// Language and locale meta tags
export default function Page() {
  return (
    <>
      <Head>
        <html lang="en" />
        <meta httpEquiv="content-language" content="en" />
        <link rel="alternate" hreflang="en" href="https://example.com" />
        <link rel="alternate" hreflang="fr" href="https://example.com/fr" />
      </Head>
    </>
  );
}

// Mobile optimization
export default function Page() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
    </>
  );
}

// SEO best practices
export default function Page() {
  return (
    <>
      <Head>
        {/* Primary meta tags */}
        <title>Page Title (50-60 characters)</title>
        <meta name="title" content="Page Title" />
        <meta name="description" content="Page description (150-160 characters)" />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://example.com/page" />
        
        {/* Language */}
        <html lang="en" />
      </Head>
    </>
  );
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

          <CodeBlock
            code={`// pages/blog/[slug].js
import Head from 'next/head';

export default function BlogPost({ post }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": "My Blog",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png",
      },
    },
  };
  
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <article>
        <h1>{post.title}</h1>
      </article>
    </>
  );
}

// Organization structured data
// pages/_app.js
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "My Company",
    "url": "https://example.com",
    "logo": "https://example.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-555-5555",
      "contactType": "customer service",
    },
  };
  
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

// Article structured data
export default function Article({ article }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "My Site",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png",
      },
    },
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
  };
  
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>
    </>
  );
}

// Breadcrumb structured data
export default function Page({ breadcrumbs }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url,
    })),
  };
  
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
    </>
  );
}

// FAQ structured data
export default function FAQPage({ faqs }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
  
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
    </>
  );
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
            Generate XML sitemaps to help search engines discover and index your
            pages.
          </p>

          <CodeBlock
            code={`// pages/sitemap.xml.js
function generateSiteMap(posts) {
  return \`<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://example.com</loc>
       <lastmod>\${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://example.com/about</loc>
       <lastmod>\${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     \${posts
       .map((post) => {
         return \`
       <url>
           <loc>https://example.com/blog/\${post.slug}</loc>
           <lastmod>\${post.updatedAt}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.6</priority>
       </url>
     \`;
       })
       .join('')}
   </urlset>
 \`;
}

export async function getServerSideProps({ res }) {
  // Fetch posts from database
  const posts = await getPosts();
  
  // Generate the XML sitemap
  const sitemap = generateSiteMap(posts);
  
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  
  return {
    props: {},
  };
}

// Dynamic sitemap with getStaticProps
// pages/sitemap.xml.js
export async function getStaticProps() {
  const posts = await getPosts();
  const pages = await getPages();
  
  const allUrls = [
    { url: 'https://example.com', priority: 1.0 },
    { url: 'https://example.com/about', priority: 0.8 },
    ...posts.map((post) => ({
      url: \`https://example.com/blog/\${post.slug}\`,
      priority: 0.6,
      lastmod: post.updatedAt,
    })),
    ...pages.map((page) => ({
      url: \`https://example.com/\${page.slug}\`,
      priority: 0.7,
    })),
  ];
  
  const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${allUrls
  .map(
    (item) => \`  <url>
    <loc>\${item.url}</loc>
    <lastmod>\${item.lastmod || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>\${item.priority}</priority>
  </url>\`
  )
  .join('\\n')}
</urlset>\`;
  
  return {
    props: { sitemap },
  };
}

export default function Sitemap({ sitemap }) {
  return null;
}

// Using next-sitemap package
// npm install next-sitemap

// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/server-sitemap-index.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
};

// postbuild.js
const { generateSitemap } = require('next-sitemap');

generateSitemap({
  baseUrl: 'https://example.com',
  pagesDirectory: __dirname + '/pages',
  targetDirectory: 'public',
});`}
            language="javascript"
          />
        </section>

        {/* Section 4: robots.txt */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. robots.txt
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create a robots.txt file to control how search engines crawl your
            site.
          </p>

          <CodeBlock
            code={`// public/robots.txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow specific paths
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Sitemap location
Sitemap: https://example.com/sitemap.xml

# Or create dynamically
// pages/robots.txt.js
export async function getServerSideProps({ res }) {
  const robotsTxt = \`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml\`;
  
  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();
  
  return {
    props: {},
  };
}

// Dynamic robots.txt
export async function getServerSideProps({ res }) {
  const isProduction = process.env.NODE_ENV === 'production';
  
  const robotsTxt = isProduction
    ? \`User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://example.com/sitemap.xml\`
    : \`User-agent: *
Disallow: /\`;
  
  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();
  
  return {
    props: {},
  };
}

// Multiple user agents
const robotsTxt = \`# Google
User-agent: Googlebot
Allow: /
Disallow: /admin/

# Bing
User-agent: Bingbot
Allow: /
Disallow: /admin/

# All others
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://example.com/sitemap.xml\`;

// Crawl delay
const robotsTxt = \`User-agent: *
Allow: /
Crawl-delay: 10
Sitemap: https://example.com/sitemap.xml\`;`}
            language="text"
          />
        </section>

        {/* Section 5: Open Graph */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Open Graph
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add Open Graph meta tags for better social media sharing.
          </p>

          <CodeBlock
            code={`// pages/blog/[slug].js
import Head from 'next/head';

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={\`https://example.com/blog/\${post.slug}\`} />
        <meta property="og:site_name" content="My Blog" />
        <meta property="og:locale" content="en_US" />
        
        {/* Article specific */}
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:author" content={post.author} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Head>
      <article>
        <h1>{post.title}</h1>
      </article>
    </>
  );
}

// Website Open Graph
export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="My Website" />
        <meta property="og:description" content="Welcome to my website" />
        <meta property="og:image" content="https://example.com/og-image.png" />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:site_name" content="My Website" />
      </Head>
    </>
  );
}

// Open Graph image dimensions
// Recommended: 1200x630px
export default function Page() {
  return (
    <>
      <Head>
        <meta property="og:image" content="https://example.com/image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Image description" />
      </Head>
    </>
  );
}

// Multiple Open Graph images
export default function Page() {
  return (
    <>
      <Head>
        <meta property="og:image" content="https://example.com/image1.png" />
        <meta property="og:image" content="https://example.com/image2.png" />
        <meta property="og:image" content="https://example.com/image3.png" />
      </Head>
    </>
  );
}

// Open Graph video
export default function VideoPage({ video }) {
  return (
    <>
      <Head>
        <meta property="og:type" content="video" />
        <meta property="og:video" content={video.url} />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
      </Head>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Twitter Cards */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Twitter Cards
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add Twitter Card meta tags for enhanced Twitter sharing.
          </p>

          <CodeBlock
            code={`// pages/blog/[slug].js
import Head from 'next/head';

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourusername" />
        <meta name="twitter:creator" content="@authorusername" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <meta name="twitter:image:alt" content={post.title} />
      </Head>
      <article>
        <h1>{post.title}</h1>
      </article>
    </>
  );
}

// Twitter Card types:
// - summary: Small card with image
// - summary_large_image: Large card with image
// - app: App card
// - player: Video/audio player card

// Summary card
export default function Page() {
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@username" />
        <meta name="twitter:title" content="Page Title" />
        <meta name="twitter:description" content="Page description" />
        <meta name="twitter:image" content="https://example.com/image.png" />
      </Head>
    </>
  );
}

// Summary large image card
export default function Page() {
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@username" />
        <meta name="twitter:title" content="Page Title" />
        <meta name="twitter:description" content="Page description" />
        <meta name="twitter:image" content="https://example.com/large-image.png" />
        <meta name="twitter:image:alt" content="Image description" />
      </Head>
    </>
  );
}

// App card
export default function AppPage() {
  return (
    <>
      <Head>
        <meta name="twitter:card" content="app" />
        <meta name="twitter:site" content="@username" />
        <meta name="twitter:app:name:iphone" content="My App" />
        <meta name="twitter:app:id:iphone" content="123456789" />
        <meta name="twitter:app:url:iphone" content="myapp://" />
        <meta name="twitter:app:name:ipad" content="My App" />
        <meta name="twitter:app:id:ipad" content="123456789" />
        <meta name="twitter:app:url:ipad" content="myapp://" />
        <meta name="twitter:app:name:googleplay" content="My App" />
        <meta name="twitter:app:id:googleplay" content="com.example.app" />
        <meta name="twitter:app:url:googleplay" content="myapp://" />
      </Head>
    </>
  );
}

// Player card (for video/audio)
export default function VideoPage({ video }) {
  return (
    <>
      <Head>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="@username" />
        <meta name="twitter:title" content={video.title} />
        <meta name="twitter:description" content={video.description} />
        <meta name="twitter:image" content={video.thumbnail} />
        <meta name="twitter:player" content={video.playerUrl} />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
      </Head>
    </>
  );
}

// Combined Open Graph and Twitter Cards
export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={\`https://example.com/blog/\${post.slug}\`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@username" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Head>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a9/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A9.2 Caching
          </Link>
          <Link
            href="/learn/pages-router/a9"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to A9 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
