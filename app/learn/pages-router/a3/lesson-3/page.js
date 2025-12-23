import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A3.3: getStaticPaths - Next.js Mastery",
  description: "Complete guide to getStaticPaths in Next.js Pages Router",
};

export default function Lesson3Page() {
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
          A3.3: getStaticPaths
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to generate static pages for dynamic routes using
          getStaticPaths.
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
              getStaticPaths
            </code>{" "}
            is required for dynamic routes using getStaticProps. It tells
            Next.js which paths to pre-render at build time.
          </p>

          <CodeBlock
            code={`// pages/posts/[id].js
export async function getStaticPaths() {
  // Fetch all post IDs
  const posts = await fetch('https://api.example.com/posts').then((r) =>
    r.json()
  );
  
  // Return array of paths to pre-render
  return {
    paths: posts.map((post) => ({
      params: { id: post.id.toString() },
    })),
    fallback: false, // or true, or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostById(params.id);
  
  return {
    props: {
      post,
    },
  };
}

export default function Post({ post }) {
  return <article>{post.title}</article>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Key Points
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Required when using getStaticProps with dynamic routes</li>
            <li>Runs at build time</li>
            <li>Returns which paths to pre-render</li>
            <li>Must be used with getStaticProps</li>
            <li>Not needed for getServerSideProps</li>
          </ul>
        </section>

        {/* Section 2: Return Object */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Return Object (paths, fallback)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The return object specifies which paths to pre-render and how to
            handle paths not listed.
          </p>

          <CodeBlock
            code={`export async function getStaticPaths() {
  return {
    // Array of path objects
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    
    // How to handle paths not in the list
    fallback: false, // or true, or 'blocking'
  };
}

// For nested dynamic routes
export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: 'tech', id: '1' } },
      { params: { category: 'tech', id: '2' } },
      { params: { category: 'design', id: '1' } },
    ],
    fallback: false,
  };
}

// For catch-all routes
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: [] } }, // matches /docs
      { params: { slug: ['getting-started'] } }, // matches /docs/getting-started
      { params: { slug: ['getting-started', 'installation'] } }, // matches /docs/getting-started/installation
    ],
    fallback: false,
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Fallback Modes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Fallback Modes: false, true, 'blocking'
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The fallback option controls what happens when a path is not
            pre-rendered at build time.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            fallback: false
          </h3>
          <CodeBlock
            code={`export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: false, // Any path not in the list returns 404
  };
}

// Behavior:
// - /posts/1 → ✅ Pre-rendered at build time
// - /posts/2 → ✅ Pre-rendered at build time
// - /posts/3 → ❌ 404 (not in paths list)
// - /posts/999 → ❌ 404 (not in paths list)

// Use when:
// - You know all possible paths at build time
// - Small, finite number of pages
// - Don't need dynamic generation`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            fallback: true
          </h3>
          <CodeBlock
            code={`export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: true, // Generate missing paths on-demand
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostById(params.id);
  
  if (!post) {
    return { notFound: true };
  }
  
  return {
    props: { post },
    revalidate: 60, // ISR
  };
}

export default function Post({ post }) {
  const router = useRouter();
  
  // Show loading state while generating
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return <article>{post.title}</article>;
}

// Behavior:
// - /posts/1 → ✅ Pre-rendered at build time
// - /posts/2 → ✅ Pre-rendered at build time
// - /posts/3 → ⏳ Generated on first request, then cached
// - /posts/999 → ⏳ Generated on first request, then cached

// Use when:
// - Large number of pages
// - New pages added frequently
// - Want fast initial build`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            fallback: 'blocking'
          </h3>
          <CodeBlock
            code={`export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: 'blocking', // Wait for page generation
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostById(params.id);
  
  if (!post) {
    return { notFound: true };
  }
  
  return {
    props: { post },
    revalidate: 60,
  };
}

export default function Post({ post }) {
  // No need to check router.isFallback
  // Page is generated before response is sent
  return <article>{post.title}</article>;
}

// Behavior:
// - /posts/1 → ✅ Pre-rendered at build time
// - /posts/2 → ✅ Pre-rendered at build time
// - /posts/3 → ⏳ First request waits for generation, then serves
// - /posts/999 → ⏳ First request waits for generation, then serves

// Use when:
// - Want to avoid loading state
// - Prefer SEO over initial response time
// - Can wait for generation`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Comparison Table
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Fallback
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Unknown Path
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Loading State
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Use Case
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      false
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    404
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    No
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Small, known set of pages
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      true
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Generated on-demand
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Yes (router.isFallback)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Large, growing set of pages
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      'blocking'
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Generated on-demand
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    No (waits for generation)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    SEO-critical pages
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Dynamic Route Generation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Dynamic Route Generation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Generate paths dynamically from your data source.
          </p>

          <CodeBlock
            code={`// Fetch from API
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return {
    paths: posts.map((post) => ({
      params: { id: post.id.toString() },
    })),
    fallback: false,
  };
}

// Fetch from database
export async function getStaticPaths() {
  const posts = await db.post.findMany({
    select: { id: true },
  });
  
  return {
    paths: posts.map((post) => ({
      params: { id: post.id.toString() },
    })),
    fallback: false,
  };
}

// Multiple dynamic segments
export async function getStaticPaths() {
  const categories = await getCategories();
  const posts = await getPosts();
  
  const paths = [];
  
  for (const category of categories) {
    for (const post of posts) {
      paths.push({
        params: {
          category: category.slug,
          id: post.id.toString(),
        },
      });
    }
  }
  
  return {
    paths,
    fallback: false,
  };
}

// Catch-all routes
export async function getStaticPaths() {
  const docs = await getDocsStructure();
  
  const paths = docs.map((doc) => ({
    params: {
      slug: doc.path.split('/').filter(Boolean),
    },
  }));
  
  return {
    paths,
    fallback: true,
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: TypeScript Types */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. TypeScript Types
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use TypeScript types for type-safe getStaticPaths.
          </p>

          <CodeBlock
            code={`// pages/posts/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';

// Define params type
type Params = {
  id: string;
};

// Type-safe getStaticPaths
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await getAllPostIds();
  
  return {
    paths: posts.map((id) => ({
      params: { id: id.toString() },
    })),
    fallback: false,
  };
};

// Type-safe getStaticProps
export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { id } = context.params!;
  
  const post = await getPostById(id);
  
  return {
    props: {
      post,
    },
  };
};

// Multiple params
type MultiParams = {
  category: string;
  id: string;
};

export const getStaticPaths: GetStaticPaths<MultiParams> = async () => {
  return {
    paths: [
      { params: { category: 'tech', id: '1' } },
      { params: { category: 'design', id: '2' } },
    ],
    fallback: false,
  };
};

// Catch-all params
type CatchAllParams = {
  slug: string[];
};

export const getStaticPaths: GetStaticPaths<CatchAllParams> = async () => {
  return {
    paths: [
      { params: { slug: [] } },
      { params: { slug: ['docs'] } },
      { params: { slug: ['docs', 'api'] } },
    ],
    fallback: false,
  };
}`}
            language="typescript"
          />
        </section>

        {/* Section 6: Combining with getStaticProps */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Combining with getStaticProps
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            getStaticPaths and getStaticProps work together to pre-render
            dynamic pages.
          </p>

          <CodeBlock
            code={`// pages/posts/[id].js
// Step 1: Define which paths to pre-render
export async function getStaticPaths() {
  const posts = await getAllPostIds();
  
  return {
    paths: posts.map((id) => ({
      params: { id: id.toString() },
    })),
    fallback: 'blocking',
  };
}

// Step 2: Fetch data for each path
export async function getStaticProps({ params }) {
  const { id } = params;
  
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
    revalidate: 60, // ISR
  };
}

// Step 3: Render the page
export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// Execution flow:
// 1. Build time: getStaticPaths runs → returns paths
// 2. Build time: getStaticProps runs for each path
// 3. Build time: Pages are pre-rendered
// 4. Runtime: Pages served from CDN
// 5. Runtime: After revalidate time, pages regenerated on-demand`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complete Example with ISR
          </h3>
          <CodeBlock
            code={`// pages/blog/[slug].js
export async function getStaticPaths() {
  // Pre-render top 10 most popular posts
  const popularPosts = await getPopularPosts(10);
  
  return {
    paths: popularPosts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: 'blocking', // Generate others on-demand
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return { notFound: true };
  }
  
  return {
    props: {
      post,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
}

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a3/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A3.2 getStaticProps
          </Link>
          <Link
            href="/learn/pages-router/a3/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A3.4 getInitialProps →
          </Link>
        </div>
      </div>
    </div>
  );
}
