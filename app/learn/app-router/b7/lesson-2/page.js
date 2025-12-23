import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B7.2: Dynamic Metadata - Next.js Mastery",
  description: "Complete guide to dynamic metadata in Next.js App Router",
};

export default function Lesson2Page() {
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
          B7.2: Dynamic Metadata
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to generate dynamic metadata using the generateMetadata
          function, including metadata based on params, searchParams, and data
          fetching.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: generateMetadata Function */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. generateMetadata Function
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              generateMetadata
            </code>{" "}
            function allows you to dynamically generate metadata based on
            runtime data. It receives the same props as the page component.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic generateMetadata
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export async function generateMetadata() {
  return {
    title: 'Dynamic Blog Post',
    description: 'This metadata is generated dynamically',
  };
}

export default function BlogPostPage() {
  return <div>Blog post content</div>;
}

// With async data fetching
export async function generateMetadata() {
  const post = await fetchPost();
  
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage() {
  const post = await fetchPost();
  return <div>{post.content}</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            generateMetadata Signature
          </h3>
          <CodeBlock
            code={`// app/page.js or app/[id]/page.js
export async function generateMetadata({ params, searchParams }) {
  // params - Dynamic route segments (for [id], [slug], etc.)
  // searchParams - URL search parameters
  
  return {
    title: 'Dynamic Title',
    description: 'Dynamic Description',
  };
}

// Both params and searchParams are optional
export async function generateMetadata({ params }) {
  // Only using params
}

export async function generateMetadata({ searchParams }) {
  // Only using searchParams
}

export async function generateMetadata() {
  // No params or searchParams needed
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Async Metadata Generation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Async Metadata Generation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            generateMetadata can be async, allowing you to fetch data from APIs
            or databases to generate metadata.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Fetching Data for Metadata
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  // Fetch post data
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`).then(
    (res) => res.json()
  );
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`).then(
    (res) => res.json()
  );
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Database Queries for Metadata
          </h3>
          <CodeBlock
            code={`// app/products/[id]/page.js
import { db } from '@/lib/db';

export async function generateMetadata({ params }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
    select: {
      name: true,
      description: true,
      image: true,
      price: true,
    },
  });
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'product',
      price: {
        amount: product.price,
        currency: 'USD',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error Handling in generateMetadata
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  try {
    const post = await fetchPost(params.slug);
    
    return {
      title: post.title,
      description: post.description,
    };
  } catch (error) {
    // Fallback metadata
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found',
    };
  }
}

// Or return null for default metadata
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  if (!post) {
    return null; // Uses parent layout metadata
  }
  
  return {
    title: post.title,
    description: post.description,
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Metadata with Params */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Metadata with Params
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use dynamic route parameters to generate metadata specific to each
            route segment.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Single Dynamic Parameter
          </h3>
          <CodeBlock
            code={`// app/users/[id]/page.js
export async function generateMetadata({ params }) {
  const userId = params.id;
  const user = await fetchUser(userId);
  
  return {
    title: \`\${user.name} - Profile\`,
    description: \`View \${user.name}'s profile\`,
    openGraph: {
      title: \`\${user.name} - Profile\`,
      description: \`View \${user.name}'s profile\`,
      images: [user.avatar],
    },
  };
}

export default async function UserPage({ params }) {
  const user = await fetchUser(params.id);
  return <div>User profile: {user.name}</div>;
}

// app/posts/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    title: post.title,
    description: post.summary,
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Dynamic Parameters
          </h3>
          <CodeBlock
            code={`// app/posts/[postId]/comments/[commentId]/page.js
export async function generateMetadata({ params }) {
  const { postId, commentId } = params;
  
  const post = await fetchPost(postId);
  const comment = await fetchComment(commentId);
  
  return {
    title: \`Comment on \${post.title}\`,
    description: \`View comment by \${comment.author}\`,
  };
}

export default async function CommentPage({ params }) {
  const { postId, commentId } = params;
  const comment = await fetchComment(commentId);
  return <div>{comment.content}</div>;
}

// app/category/[category]/product/[productId]/page.js
export async function generateMetadata({ params }) {
  const { category, productId } = params;
  
  const product = await fetchProduct(productId);
  
  return {
    title: \`\${product.name} - \${category}\`,
    description: product.description,
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Catch-All Route Params
          </h3>
          <CodeBlock
            code={`// app/docs/[...slug]/page.js
export async function generateMetadata({ params }) {
  const slug = params.slug; // Array: ['getting-started', 'installation']
  const docPath = Array.isArray(slug) ? slug.join('/') : slug;
  
  const doc = await fetchDocumentation(docPath);
  
  return {
    title: doc.title,
    description: doc.description,
  };
}

// Optional catch-all
// app/docs/[[...slug]]/page.js
export async function generateMetadata({ params }) {
  const slug = params.slug;
  
  if (!slug) {
    return {
      title: 'Documentation',
      description: 'Browse our documentation',
    };
  }
  
  const docPath = Array.isArray(slug) ? slug.join('/') : slug;
  const doc = await fetchDocumentation(docPath);
  
  return {
    title: doc.title,
    description: doc.description,
  };
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Metadata with searchParams */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Metadata with searchParams
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Generate metadata based on URL search parameters for filtered or
            searched content.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic searchParams Usage
          </h3>
          <CodeBlock
            code={`// app/search/page.js
export async function generateMetadata({ searchParams }) {
  const query = searchParams.q || 'Search';
  const page = searchParams.page || '1';
  
  return {
    title: \`Search Results for "\${query}"\`,
    description: \`Page \${page} of search results for \${query}\`,
  };
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  const results = await search(query);
  
  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {/* Render results */}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Filter-Based Metadata
          </h3>
          <CodeBlock
            code={`// app/products/page.js
export async function generateMetadata({ searchParams }) {
  const category = searchParams.category || 'all';
  const sortBy = searchParams.sortBy || 'relevance';
  
  const categoryName = category === 'all' 
    ? 'All Products' 
    : \`\${category.charAt(0).toUpperCase() + category.slice(1)} Products\`;
  
  return {
    title: \`\${categoryName} - Sorted by \${sortBy}\`,
    description: \`Browse our \${category} products sorted by \${sortBy}\`,
    openGraph: {
      title: categoryName,
      description: \`Discover our \${category} collection\`,
    },
  };
}

export default async function ProductsPage({ searchParams }) {
  const category = searchParams.category || 'all';
  const products = await fetchProducts(category);
  
  return (
    <div>
      <h1>Products: {category}</h1>
      {/* Render products */}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Combined Params and searchParams
          </h3>
          <CodeBlock
            code={`// app/blog/[slug]/page.js
export async function generateMetadata({ params, searchParams }) {
  const post = await fetchPost(params.slug);
  const view = searchParams.view || 'default';
  
  return {
    title: view === 'print' ? \`Print: \${post.title}\` : post.title,
    description: post.description,
    robots: {
      index: view !== 'preview', // Don't index preview mode
    },
  };
}

export default async function BlogPostPage({ params, searchParams }) {
  const post = await fetchPost(params.slug);
  const view = searchParams.view;
  
  return (
    <article>
      <h1>{post.title}</h1>
      {view === 'print' && <div className="print-only">Print version</div>}
      <div>{post.content}</div>
    </article>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Metadata Inheritance */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Metadata Inheritance
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Child pages inherit metadata from parent layouts. You can override
            or extend parent metadata.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Inheritance
          </h3>
          <CodeBlock
            code={`// app/layout.js (Root Layout)
export const metadata = {
  title: {
    default: 'My Website',
    template: '%s | My Website',
  },
  description: 'Default description',
  openGraph: {
    siteName: 'My Website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/blog/layout.js (Blog Layout)
export const metadata = {
  title: {
    default: 'Blog',
    template: '%s | Blog',
  },
  description: 'Blog posts and articles',
};

export default function BlogLayout({ children }) {
  return <div>{children}</div>;
}

// app/blog/post-1/page.js
export const metadata = {
  title: 'My First Post', 
  // Renders as: "My First Post | Blog | My Website"
  description: 'First blog post',
  // Inherits openGraph.siteName and openGraph.locale from root
};
`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Overriding Parent Metadata
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  title: 'Default Title',
  description: 'Default description',
  openGraph: {
    title: 'Default OG Title',
    description: 'Default OG description',
    images: ['/default-og-image.jpg'],
  },
};

// app/blog/post/page.js
export const metadata = {
  title: 'Post Title', // Overrides parent
  description: 'Post description', // Overrides parent
  openGraph: {
    title: 'Post OG Title', // Overrides parent
    // description and images inherited from parent
  },
};

// To override entire openGraph object
export const metadata = {
  openGraph: {
    title: 'New Title',
    description: 'New Description',
    images: ['/new-image.jpg'],
    // Must redefine all values to completely override
  },
};`}
            language="javascript"
          />
        </section>

        {/* Section 6: Metadata Merging */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Metadata Merging
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js merges metadata from layouts and pages. Understanding how
            merging works helps you structure metadata effectively.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            How Merging Works
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  title: 'Default',
  description: 'Default description',
  keywords: ['default', 'keywords'],
  openGraph: {
    title: 'OG Default',
    description: 'OG Default Description',
    images: ['/default-og.jpg'],
  },
};

// app/page.js
export const metadata = {
  title: 'Home', // Overrides 'Default'
  // description: inherited from parent
  keywords: ['home', 'main'], // Replaces parent keywords (array replaced, not merged)
  openGraph: {
    title: 'OG Home', // Overrides parent openGraph.title
    // description: inherited from parent
    images: ['/home-og.jpg'], // Replaces parent images
  },
};

// Final result:
// {
//   title: 'Home',
//   description: 'Default description', // from parent
//   keywords: ['home', 'main'], // replaced, not merged
//   openGraph: {
//     title: 'OG Home',
//     description: 'OG Default Description', // from parent
//     images: ['/home-og.jpg'], // replaced
//   },
// }
`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Deep Merging Objects
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  openGraph: {
    siteName: 'My Site',
    locale: 'en_US',
    images: [
      {
        url: '/default-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@mysite',
  },
};

// app/page.js
export const metadata = {
  openGraph: {
    title: 'Page Title', // Merged with parent
    description: 'Page Description', // Merged with parent
    // siteName and locale inherited from parent
    images: [
      // Images array is replaced, not merged
      {
        url: '/page-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: 'Twitter Title', // Merged with parent
    // card and site inherited from parent
  },
};

// Result:
// openGraph: {
//   title: 'Page Title',
//   description: 'Page Description',
//   siteName: 'My Site', // from parent
//   locale: 'en_US', // from parent
//   images: [/* replaced with page image */],
// }
// twitter: {
//   card: 'summary', // from parent
//   site: '@mysite', // from parent
//   title: 'Twitter Title',
// }
`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Merging with generateMetadata
          </h3>
          <CodeBlock
            code={`// app/layout.js
export const metadata = {
  title: 'My Blog',
  openGraph: {
    siteName: 'My Blog',
    locale: 'en_US',
  },
};

// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    title: post.title, // Merges with layout title template
    description: post.description,
    openGraph: {
      title: post.title, // Merges with parent
      description: post.description, // Merges with parent
      images: [post.image], // Replaces parent images
      // siteName and locale inherited from layout
    },
  };
}

// Result for /blog/my-post:
// {
//   title: 'My Post | My Blog', // template applied
//   description: post.description,
//   openGraph: {
//     title: 'My Post',
//     description: post.description,
//     images: [post.image],
//     siteName: 'My Blog', // from layout
//     locale: 'en_US', // from layout
//   },
// }
`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b7/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B7.1 Static Metadata
          </Link>
          <Link
            href="/learn/app-router/b7/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B7.3 Metadata Patterns →
          </Link>
        </div>
      </div>
    </div>
  );
}
