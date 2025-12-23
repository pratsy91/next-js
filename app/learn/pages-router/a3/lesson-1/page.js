import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A3.1: getServerSideProps - Next.js Mastery",
  description: "Complete guide to getServerSideProps in Next.js Pages Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a3"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A3 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A3.1: getServerSideProps
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to fetch data on each request using Server-Side Rendering
          (SSR) with getServerSideProps.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Basic Usage */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Basic Usage
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>{" "}
            runs on the server on every request. It's perfect for pages that
            need to fetch data that changes frequently or is user-specific.
          </p>

          <CodeBlock
            code={`// pages/profile.js
export async function getServerSideProps(context) {
  // Fetch data from an API
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  
  return {
    props: {
      user,
    },
  };
}

export default function Profile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Points
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Runs on every request (not at build time)</li>
            <li>Only runs on the server, never on the client</li>
            <li>Can access request/response objects</li>
            <li>Perfect for user-specific or frequently changing data</li>
            <li>Slower than static generation but always up-to-date</li>
          </ul>
        </section>

        {/* Section 2: Context Object */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Context Object (params, req, res, query, preview, previewData,
            resolvedUrl, locale, locales, defaultLocale)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The context object provides access to route parameters,
            request/response objects, query strings, and more.
          </p>

          <CodeBlock
            code={`// pages/posts/[id].js
export async function getServerSideProps(context) {
  // All available context properties:
  
  // params - Dynamic route parameters
  const { id } = context.params; // { id: '123' }
  
  // req - HTTP request object (Node.js)
  const { headers, cookies } = context.req;
  const userAgent = context.req.headers['user-agent'];
  
  // res - HTTP response object (Node.js)
  context.res.setHeader('Cache-Control', 'public, s-maxage=10');
  
  // query - Query string parameters
  const { sort, page } = context.query; // ?sort=date&page=2
  
  // preview - Whether in preview mode
  if (context.preview) {
    // Handle preview content
  }
  
  // previewData - Preview mode data
  const previewData = context.previewData;
  
  // resolvedUrl - The actual URL path
  const url = context.resolvedUrl; // '/posts/123?sort=date'
  
  // locale - Current locale (if i18n enabled)
  const locale = context.locale; // 'en'
  
  // locales - Available locales
  const locales = context.locales; // ['en', 'fr', 'de']
  
  // defaultLocale - Default locale
  const defaultLocale = context.defaultLocale; // 'en'
  
  // Fetch data using these values
  const res = await fetch(\`https://api.example.com/posts/\${id}\`);
  const post = await res.json();
  
  return {
    props: {
      post,
      id,
      sort,
    },
  };
}

export default function Post({ post, id, sort }) {
  return <article>{post.title}</article>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Common Use Cases
          </h3>
          <CodeBlock
            code={`// Accessing cookies for authentication
export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  // Fetch user data
  const user = await getUserFromToken(token);
  
  return { props: { user } };
}

// Using query parameters
export async function getServerSideProps(context) {
  const { category, page = '1' } = context.query;
  
  const products = await getProducts({
    category,
    page: parseInt(page),
  });
  
  return { props: { products } };
}

// Using dynamic route parameters
export async function getServerSideProps(context) {
  const { id } = context.params;
  
  const post = await getPostById(id);
  
  if (!post) {
    return { notFound: true };
  }
  
  return { props: { post } };
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Return Object */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Return Object (props, notFound, redirect)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              getServerSideProps
            </code>{" "}
            can return props, trigger a 404, or redirect to another page.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Returning Props
          </h3>
          <CodeBlock
            code={`export async function getServerSideProps(context) {
  const data = await fetchData();
  
  return {
    props: {
      data,
      timestamp: new Date().toISOString(),
    },
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Returning notFound
          </h3>
          <CodeBlock
            code={`export async function getServerSideProps(context) {
  const { id } = context.params;
  const post = await getPostById(id);
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      post,
    },
  };
}

// This will render pages/404.js`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Returning redirect
          </h3>
          <CodeBlock
            code={`export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false, // 307 redirect (temporary)
      },
    };
  }
  
  // Permanent redirect (301)
  if (context.req.url === '/old-page') {
    return {
      redirect: {
        destination: '/new-page',
        permanent: true, // 301 redirect (permanent)
      },
    };
  }
  
  return {
    props: {},
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Setting Response Headers
          </h3>
          <CodeBlock
            code={`export async function getServerSideProps(context) {
  // Set cache headers
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  );
  
  // Set custom headers
  context.res.setHeader('X-Custom-Header', 'value');
  
  const data = await fetchData();
  
  return {
    props: {
      data,
    },
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Error Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Error Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Handle errors gracefully in getServerSideProps.
          </p>

          <CodeBlock
            code={`export async function getServerSideProps(context) {
  try {
    const res = await fetch('https://api.example.com/data');
    
    if (!res.ok) {
      throw new Error(\`API error: \${res.status}\`);
    }
    
    const data = await res.json();
    
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Option 1: Return error in props
    return {
      props: {
        error: error.message,
        data: null,
      },
    };
    
    // Option 2: Redirect to error page
    // return {
    //   redirect: {
    //     destination: '/error',
    //     permanent: false,
    //   },
    // };
    
    // Option 3: Show 500 page
    // throw error; // Will show pages/500.js
  }
}

export default function MyPage({ data, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return <div>{JSON.stringify(data)}</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Timeout Handling
          </h3>
          <CodeBlock
            code={`export async function getServerSideProps(context) {
  // Create a timeout promise
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timeout')), 5000)
  );
  
  try {
    // Race between fetch and timeout
    const data = await Promise.race([
      fetch('https://api.example.com/data').then((r) => r.json()),
      timeout,
    ]);
    
    return { props: { data } };
  } catch (error) {
    return {
      props: {
        error: 'Request timed out',
      },
    };
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Authentication */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Authentication in getServerSideProps
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use getServerSideProps to check authentication and protect pages.
          </p>

          <CodeBlock
            code={`// pages/dashboard.js
export async function getServerSideProps(context) {
  // Get token from cookies
  const token = context.req.cookies.token;
  
  if (!token) {
    return {
      redirect: {
        destination: '/login?redirect=/dashboard',
        permanent: false,
      },
    };
  }
  
  try {
    // Verify token and get user
    const user = await verifyToken(token);
    
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    
    // Fetch user-specific data
    const dashboardData = await getDashboardData(user.id);
    
    return {
      props: {
        user,
        dashboardData,
      },
    };
  } catch (error) {
    // Token invalid or expired
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default function Dashboard({ user, dashboardData }) {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {/* Dashboard content */}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using Authorization Headers
          </h3>
          <CodeBlock
            code={`export async function getServerSideProps(context) {
  // Get token from Authorization header
  const authHeader = context.req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  const token = authHeader.substring(7);
  const user = await verifyToken(token);
  
  return {
    props: {
      user,
    },
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: API Calls */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. API Calls in getServerSideProps
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Make API calls to external services or your own API routes.
          </p>

          <CodeBlock
            code={`export async function getServerSideProps(context) {
  // Call external API
  const res = await fetch('https://api.example.com/posts', {
    headers: {
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json',
    },
  });
  
  const posts = await res.json();
  
  // Call your own API route
  const userRes = await fetch('http://localhost:3000/api/user', {
    headers: {
      'Cookie': context.req.headers.cookie,
    },
  });
  
  const user = await userRes.json();
  
  return {
    props: {
      posts,
      user,
    },
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using Absolute URLs
          </h3>
          <CodeBlock
            code={`export async function getServerSideProps(context) {
  // In production, use absolute URL
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const host = context.req.headers.host;
  const baseUrl = \`\${protocol}://\${host}\`;
  
  const res = await fetch(\`\${baseUrl}/api/data\`);
  const data = await res.json();
  
  return { props: { data } };
}

// Or use environment variable
export async function getServerSideProps(context) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  const res = await fetch(\`\${apiUrl}/api/data\`);
  const data = await res.json();
  
  return { props: { data } };
}`}
            language="javascript"
          />
        </section>

        {/* Section 7: Database Queries */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Database Queries
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Query databases directly in getServerSideProps.
          </p>

          <CodeBlock
            code={`// Using Prisma
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const { id } = context.params;
  
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
      comments: true,
    },
  });
  
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)), // Serialize for props
    },
  };
}

// Using MongoDB
import { MongoClient } from 'mongodb';

export async function getServerSideProps(context) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  
  const posts = await db.collection('posts').find({}).toArray();
  
  client.close();
  
  return {
    props: {
      posts: posts.map((post) => ({
        ...post,
        _id: post._id.toString(),
      })),
    },
  };
}

// Using SQL (with pg)
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getServerSideProps(context) {
  const { id } = context.params;
  
  const result = await pool.query(
    'SELECT * FROM posts WHERE id = $1',
    [id]
  );
  
  return {
    props: {
      post: result.rows[0],
    },
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 8: Caching Behavior */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Caching Behavior
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            By default, pages using getServerSideProps are not cached. You can
            control caching with response headers.
          </p>

          <CodeBlock
            code={`export async function getServerSideProps(context) {
  // Set cache headers
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  
  // Cache-Control values:
  // - public: Can be cached by CDN
  // - private: Only browser can cache
  // - no-cache: Must revalidate
  // - no-store: No caching
  // - s-maxage: CDN cache duration (seconds)
  // - stale-while-revalidate: Serve stale content while revalidating
  
  const data = await fetchData();
  
  return {
    props: {
      data,
    },
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Caching Strategies
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Strategy
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Cache-Control
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Use Case
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    No Cache
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      no-store
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    User-specific data
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Short Cache
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      s-maxage=10
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Frequently changing data
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Stale-While-Revalidate
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      s-maxage=60, stale-while-revalidate=120
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Balance freshness and performance
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to A3 Lessons
          </Link>
          <Link
            href="/learn/pages-router/a3/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A3.2 getStaticProps →
          </Link>
        </div>
      </div>
    </div>
  );
}
