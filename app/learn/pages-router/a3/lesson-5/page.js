import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A3.5: Client-Side Data Fetching - Next.js Mastery",
  description:
    "Complete guide to client-side data fetching in Next.js Pages Router",
};

export default function Lesson5Page() {
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
          A3.5: Client-Side Data Fetching
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to fetch data on the client side using useEffect, SWR, React
          Query, and other libraries.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: useEffect with fetch */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. useEffect with fetch
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useEffect
            </code>{" "}
            with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              fetch
            </code>{" "}
            to load data on the client side.
          </p>

          <CodeBlock
            code={`import { useState, useEffect } from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch('/api/posts');
        
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []); // Empty dependency array = run once on mount
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Dependencies
          </h3>
          <CodeBlock
            code={`import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PostComments() {
  const router = useRouter();
  const { id } = router.query;
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    if (!id) return; // Wait for router to be ready
    
    async function fetchComments() {
      const res = await fetch(\`/api/posts/\${id}/comments\`);
      const data = await res.json();
      setComments(data);
    }
    
    fetchComments();
  }, [id]); // Re-fetch when id changes
  
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: SWR Integration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. SWR Integration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            SWR (stale-while-revalidate) provides data fetching with caching,
            revalidation, and error handling.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installation
          </h3>
          <CodeBlock code={`npm install swr`} language="bash" />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Posts() {
  const { data, error, isLoading } = useSWR('/api/posts', fetcher);
  
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Dynamic Routes
          </h3>
          <CodeBlock
            code={`import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  
  const { data: post, error } = useSWR(
    id ? \`/api/posts/\${id}\` : null, // Don't fetch until id is available
    fetcher
  );
  
  if (error) return <div>Error loading post</div>;
  if (!post) return <div>Loading...</div>;
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            SWR Configuration
          </h3>
          <CodeBlock
            code={`import useSWR from 'swr';
import { SWRConfig } from 'swr';

// pages/_app.js
function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((r) => r.json()),
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 0,
        dedupingInterval: 2000,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;

// Now you can use useSWR without passing fetcher
export default function Posts() {
  const { data, error } = useSWR('/api/posts');
  // fetcher is provided by SWRConfig
  return <div>{/* ... */}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: React Query Integration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. React Query Integration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            React Query (TanStack Query) provides powerful data fetching with
            caching, synchronization, and background updates.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installation
          </h3>
          <CodeBlock
            code={`npm install @tanstack/react-query`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Setup
          </h3>
          <CodeBlock
            code={`// pages/_app.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            cacheTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      })
  );
  
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Usage
          </h3>
          <CodeBlock
            code={`import { useQuery } from '@tanstack/react-query';

export default function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      return res.json();
    },
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            With Dynamic Routes
          </h3>
          <CodeBlock
            code={`import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await fetch(\`/api/posts/\${id}\`);
      return res.json();
    },
    enabled: !!id, // Only fetch when id is available
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Data Fetching Libraries */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Data Fetching Libraries
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Popular libraries for client-side data fetching in Next.js.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                SWR
              </h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                <li>Lightweight and simple</li>
                <li>Built-in caching and revalidation</li>
                <li>Great for REST APIs</li>
                <li>Created by Vercel</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                React Query (TanStack Query)
              </h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                <li>Feature-rich and powerful</li>
                <li>Advanced caching strategies</li>
                <li>Background updates and synchronization</li>
                <li>Great for complex data fetching needs</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Apollo Client
              </h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                <li>Designed for GraphQL</li>
                <li>Normalized cache</li>
                <li>Real-time subscriptions</li>
                <li>Best for GraphQL APIs</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Axios
              </h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                <li>HTTP client library</li>
                <li>Request/response interceptors</li>
                <li>Automatic JSON parsing</li>
                <li>Use with useEffect or other libraries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Loading States */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Loading States
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Provide feedback to users while data is loading.
          </p>

          <CodeBlock
            code={`import { useState, useEffect } from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);
  
  // Skeleton loading
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}

// With SWR
import useSWR from 'swr';

export default function Posts() {
  const { data, isLoading } = useSWR('/api/posts', fetcher);
  
  if (isLoading) {
    return <div>Loading posts...</div>;
  }
  
  return <div>{/* posts */}</div>;
}

// With React Query
import { useQuery } from '@tanstack/react-query';

export default function Posts() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  
  if (isLoading) {
    return <div>Initial loading...</div>;
  }
  
  return (
    <div>
      {isFetching && <div>Refreshing...</div>}
      {/* posts */}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Error Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Error Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Handle errors gracefully in client-side data fetching.
          </p>

          <CodeBlock
            code={`import { useState, useEffect } from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts');
        
        if (!res.ok) {
          throw new Error(\`HTTP error! status: \${res.status}\`);
        }
        
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);
  
  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }
  
  if (loading) return <div>Loading...</div>;
  
  return <div>{/* posts */}</div>;
}

// With SWR
import useSWR from 'swr';

export default function Posts() {
  const { data, error, mutate } = useSWR('/api/posts', fetcher);
  
  if (error) {
    return (
      <div>
        <p>Failed to load posts</p>
        <button onClick={() => mutate()}>Retry</button>
      </div>
    );
  }
  
  return <div>{/* posts */}</div>;
}

// With React Query
import { useQuery } from '@tanstack/react-query';

export default function Posts() {
  const { data, error, refetch, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    retry: 3, // Retry 3 times on error
    retryDelay: 1000, // Wait 1 second between retries
  });
  
  if (isError) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  
  return <div>{/* posts */}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a3/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A3.4 getInitialProps
          </Link>
          <Link
            href="/learn/pages-router/a3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to A3 Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
