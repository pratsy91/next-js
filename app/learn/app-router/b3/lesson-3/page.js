import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B3.3: Client-Side Data Fetching - Next.js Mastery",
  description: "Complete guide to client-side data fetching in Next.js",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b3"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B3 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B3.3: Client-Side Data Fetching
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn client-side data fetching: fetch in Client Components,
          useEffect, SWR, React Query, loading states, and error handling.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Client Components with fetch */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Client Components with Fetch
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Client Components can use fetch, but it doesn't have Next.js
            automatic caching. Use it for client-side data fetching.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Client Fetch
          </h3>
          <CodeBlock
            code={`// app/components/UserList.js
'use client';

import { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    }
    
    fetchUsers();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Fetch with Options
          </h3>
          <CodeBlock
            code={`// app/components/PostList.js
'use client';

import { useState, useEffect } from 'react';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Note: cache options don't work the same in Client Components
        cache: 'no-store', // Still works but different behavior
      });
      
      const data = await response.json();
      setPosts(data);
    }
    
    fetchPosts();
  }, []);
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: useEffect Data Fetching */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. useEffect Data Fetching
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            useEffect is the standard way to fetch data in Client Components.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic useEffect Fetch
          </h3>
          <CodeBlock
            code={`// app/components/Products.js
'use client';

import { useState, useEffect } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadProducts();
  }, []); // Empty deps: run once on mount
  
  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Fetch with Dependencies
          </h3>
          <CodeBlock
            code={`// app/components/UserPosts.js
'use client';

import { useState, useEffect } from 'react';

export default function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}/posts\`);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    }
    
    fetchPosts();
  }, [userId]); // Re-fetch when userId changes
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Cleanup Function
          </h3>
          <CodeBlock
            code={`// app/components/SearchResults.js
'use client';

import { useState, useEffect } from 'react';

export default function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    let cancelled = false;
    
    async function search() {
      const response = await fetch(\`/api/search?q=\${query}\`);
      const data = await response.json();
      
      // Only update if not cancelled
      if (!cancelled) {
        setResults(data);
      }
    }
    
    search();
    
    // Cleanup: cancel if component unmounts or query changes
    return () => {
      cancelled = true;
    };
  }, [query]);
  
  return (
    <div>
      {results.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: SWR Integration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. SWR Integration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            SWR (stale-while-revalidate) provides powerful data fetching with
            caching, revalidation, and more.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installation
          </h3>
          <CodeBlock code={`npm install swr`} language="bash" />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic SWR Usage
          </h3>
          <CodeBlock
            code={`// app/components/Users.js
'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Users() {
  const { data, error, isLoading } = useSWR('/api/users', fetcher);
  
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            SWR with Options
          </h3>
          <CodeBlock
            code={`// app/components/Posts.js
'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Posts() {
  const { data, error, isLoading, mutate } = useSWR('/api/posts', fetcher, {
    revalidateOnFocus: true, // Revalidate when window gains focus
    revalidateOnReconnect: true, // Revalidate when network reconnects
    refreshInterval: 5000, // Poll every 5 seconds
    dedupingInterval: 2000, // Dedupe requests within 2 seconds
  });
  
  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <button onClick={() => mutate()}>Refresh</button>
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            SWR with Dynamic Keys
          </h3>
          <CodeBlock
            code={`// app/components/UserProfile.js
'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserProfile({ userId }) {
  // Key changes when userId changes
  const { data, error } = useSWR(
    userId ? \`/api/users/\${userId}\` : null,
    fetcher
  );
  
  if (error) return <div>Error loading user</div>;
  if (!data) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: React Query Integration */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. React Query Integration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            React Query (TanStack Query) provides powerful data fetching,
            caching, and synchronization.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installation
          </h3>
          <CodeBlock
            code={`npm install @tanstack/react-query`}
            language="bash"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Setup Provider
          </h3>
          <CodeBlock
            code={`// app/providers.js
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// app/layout.js
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic React Query Usage
          </h3>
          <CodeBlock
            code={`// app/components/Products.js
'use client';

import { useQuery } from '@tanstack/react-query';

async function fetchProducts() {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default function Products() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            React Query with Options
          </h3>
          <CodeBlock
            code={`// app/components/Posts.js
'use client';

import { useQuery } from '@tanstack/react-query';

export default function Posts() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3, // Retry 3 times on error
    retryDelay: 1000, // 1 second between retries
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Loading States */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Loading States
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Proper loading states improve user experience during data fetching.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Loading State
          </h3>
          <CodeBlock
            code={`// app/components/Users.js
'use client';

import { useState, useEffect } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    }
    
    fetchUsers();
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="spinner">Loading users...</div>
      </div>
    );
  }
  
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Skeleton Loading
          </h3>
          <CodeBlock
            code={`// app/components/ProductList.js
'use client';

import { useState, useEffect } from 'react';

function ProductSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-gray-200 rounded"></div>
      ))}
    </div>
  );
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    }
    
    fetchProducts();
  }, []);
  
  if (loading) return <ProductSkeleton />;
  
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
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
            Proper error handling ensures a good user experience when data
            fetching fails.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Error Handling
          </h3>
          <CodeBlock
            code={`// app/components/Users.js
'use client';

import { useState, useEffect } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error with Retry
          </h3>
          <CodeBlock
            code={`// app/components/Posts.js
'use client';

import { useState, useEffect } from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const fetchPosts = async (retries = 0) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/posts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data);
      setRetryCount(0);
    } catch (err) {
      if (retries < 3) {
        // Retry up to 3 times
        setTimeout(() => {
          setRetryCount(retries + 1);
          fetchPosts(retries + 1);
        }, 1000 * (retries + 1)); // Exponential backoff
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  if (loading) return <div>Loading... {retryCount > 0 && \`(Retry \${retryCount})\`}</div>;
  if (error) {
    return (
      <div>
        <div>Error: {error}</div>
        <button onClick={() => fetchPosts()}>Retry</button>
      </div>
    );
  }
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b3/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B3.2 Caching Functions
          </Link>
          <Link
            href="/learn/app-router/b3/lesson-4"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B3.4 Streaming & Suspense →
          </Link>
        </div>
      </div>
    </div>
  );
}
