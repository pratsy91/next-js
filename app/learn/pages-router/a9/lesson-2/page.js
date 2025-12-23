import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A9.2: Caching - Next.js Mastery",
  description: "Complete guide to caching strategies in Next.js Pages Router",
};

export default function Lesson2Page() {
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
          A9.2: Caching
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn caching strategies: static page caching, API route caching, ISR
          caching, CDN caching, and browser caching.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Static Page Caching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Static Page Caching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Static pages generated with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getStaticProps
            </code>{" "}
            are cached at build time.
          </p>

          <CodeBlock
            code={`// pages/blog/[slug].js
export async function getStaticPaths() {
  const posts = await getPosts();
  
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  
  return {
    props: {
      post,
    },
    // Revalidate after 60 seconds (ISR)
    revalidate: 60,
  };
}

// Static pages are:
// - Generated at build time
// - Cached on CDN
// - Served instantly
// - No server computation needed

// Cache headers for static pages
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

// Conditional caching
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/dynamic/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },
};`}
            language="javascript"
          />
        </section>

        {/* Section 2: API Route Caching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. API Route Caching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure caching for API routes to improve performance and reduce
            server load.
          </p>

          <CodeBlock
            code={`// pages/api/data.js
export default function handler(req, res) {
  // Set cache headers
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  
  const data = fetchData();
  
  res.json(data);
}

// Cache-Control values:
// - public: Can be cached by CDN and browsers
// - private: Only cached by browser
// - no-cache: Must revalidate before using
// - no-store: Don't cache at all
// - max-age: Cache duration in seconds
// - s-maxage: CDN cache duration
// - stale-while-revalidate: Serve stale content while revalidating

// Different cache strategies
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Cache for 1 hour
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    const data = getCachedData();
    res.json(data);
  }
}

// Conditional caching
export default function handler(req, res) {
  const { userId } = req.query;
  
  if (userId) {
    // User-specific data - shorter cache
    res.setHeader('Cache-Control', 'private, max-age=60');
  } else {
    // Public data - longer cache
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
  
  res.json(data);
}

// Using ISR-like caching
export default async function handler(req, res) {
  // Check cache
  const cached = await getFromCache(req.url);
  
  if (cached) {
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.json(cached);
  }
  
  // Fetch fresh data
  const data = await fetchData();
  await setCache(req.url, data);
  
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  res.json(data);
}

// ETag support
export default function handler(req, res) {
  const data = getData();
  const etag = generateETag(data);
  
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end(); // Not Modified
  }
  
  res.setHeader('ETag', etag);
  res.json(data);
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: ISR Caching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. ISR Caching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Incremental Static Regeneration (ISR) caches pages and regenerates
            them in the background.
          </p>

          <CodeBlock
            code={`// pages/blog/[slug].js
export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  
  return {
    props: {
      post,
    },
    // Revalidate every 60 seconds
    revalidate: 60,
  };
}

// How ISR works:
// 1. First request: Generate page (may be slow)
// 2. Subsequent requests: Serve cached page (fast)
// 3. After revalidate time: Next request triggers regeneration
// 4. Background regeneration: Update cache without blocking request
// 5. Future requests: Serve updated page

// Time-based revalidation
export async function getStaticProps() {
  return {
    props: {
      data: await fetchData(),
    },
    revalidate: 3600, // 1 hour
  };
}

// On-demand revalidation
// pages/api/revalidate.js
export default async function handler(req, res) {
  // Check secret token
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  try {
    // Revalidate specific path
    await res.revalidate(req.query.path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}

// Usage: POST /api/revalidate?secret=xxx&path=/blog/my-post

// Revalidate multiple paths
export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  const paths = req.query.paths.split(',');
  
  try {
    await Promise.all(paths.map((path) => res.revalidate(path)));
    return res.json({ revalidated: true, paths });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}

// Fallback modes
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // or 'true'
  };
}

// fallback: 'blocking'
// - First request waits for page generation
// - Subsequent requests served from cache

// fallback: true
// - First request shows loading state
// - Page generated in background
// - Subsequent requests served from cache`}
            language="javascript"
          />
        </section>

        {/* Section 4: CDN Caching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. CDN Caching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure CDN caching headers to cache content at the edge for
            faster delivery.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=31536000, stale-while-revalidate',
          },
        ],
      },
    ];
  },
};

// CDN-specific headers
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
    ];
  },
};

// Different cache strategies per route
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

// Vercel Edge Network caching
// Automatically configured on Vercel
// - Static assets: Long cache
// - Pages: Based on revalidate
// - API routes: Based on Cache-Control headers

// Custom CDN configuration
// For other CDNs (Cloudflare, AWS CloudFront, etc.)
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'X-CDN-Cache',
            value: 'HIT',
          },
        ],
      },
    ];
  },
};

// Cache-Control directives for CDN:
// - s-maxage: CDN cache duration
// - stale-while-revalidate: Serve stale while updating
// - public: Can be cached by CDN
// - private: Don't cache on CDN`}
            language="javascript"
          />
        </section>

        {/* Section 5: Browser Caching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Browser Caching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure browser caching to reduce server requests and improve user
            experience.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
};

// Browser cache strategies
// 1. Long-term caching (static assets)
module.exports = {
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

// 2. Short-term caching (dynamic content)
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, max-age=60',
          },
        ],
      },
    ];
  },
};

// 3. No caching (sensitive data)
module.exports = {
  async headers() {
    return [
      {
        source: '/api/user',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
    ];
  },
};

// ETag for conditional requests
// pages/api/data.js
export default function handler(req, res) {
  const data = getData();
  const etag = generateETag(data);
  
  // Check if client has cached version
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end(); // Not Modified
  }
  
  res.setHeader('ETag', etag);
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.json(data);
}

// Last-Modified header
export default function handler(req, res) {
  const data = getData();
  const lastModified = new Date(data.updatedAt).toUTCString();
  
  if (req.headers['if-modified-since'] === lastModified) {
    return res.status(304).end();
  }
  
  res.setHeader('Last-Modified', lastModified);
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.json(data);
}

// Cache-Control values:
// - max-age=3600: Cache for 1 hour
// - immutable: Content never changes
// - no-cache: Must revalidate
// - no-store: Don't cache
// - private: Only browser cache
// - public: Can be cached by CDN and browser`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a9/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A9.1 Performance
          </Link>
          <Link
            href="/learn/pages-router/a9/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A9.3 SEO →
          </Link>
        </div>
      </div>
    </div>
  );
}
