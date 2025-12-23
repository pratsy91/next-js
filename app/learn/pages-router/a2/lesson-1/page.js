import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A2.1: Basic Routing - Next.js Mastery",
  description: "Complete guide to basic routing in Next.js Pages Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a2"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A2 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A2.1: Basic Routing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn all the basic routing patterns in Next.js Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Index Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Index Routes (pages/index.js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/index.js
            </code>{" "}
            file creates the home page route at{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /
            </code>
            .
          </p>

          <CodeBlock
            code={`// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the root route (/)</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Index Routes
          </h3>
          <CodeBlock
            code={`// pages/blog/index.js - Creates /blog route
export default function Blog() {
  return <h1>Blog Home</h1>;
}

// pages/products/index.js - Creates /products route
export default function Products() {
  return <h1>Products Home</h1>;
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Nested Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Nested Routes (pages/about.js, pages/contact.js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create routes by adding files directly in the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pages/
            </code>{" "}
            directory.
          </p>

          <CodeBlock
            code={`// pages/about.js - Creates /about route
export default function About() {
  return <h1>About Us</h1>;
}

// pages/contact.js - Creates /contact route
export default function Contact() {
  return <h1>Contact Us</h1>;
}

// pages/team.js - Creates /team route
export default function Team() {
  return <h1>Our Team</h1>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Nested Folder Routes
          </h3>
          <CodeBlock
            code={`// pages/dashboard/settings.js - Creates /dashboard/settings route
export default function Settings() {
  return <h1>Dashboard Settings</h1>;
}

// pages/dashboard/profile.js - Creates /dashboard/profile route
export default function Profile() {
  return <h1>User Profile</h1>;
}

// File structure:
// pages/
//   ├── dashboard/
//   │   ├── settings.js
//   │   └── profile.js
//   ├── about.js
//   └── contact.js`}
            language="javascript"
          />
        </section>

        {/* Section 3: Dynamic Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Dynamic Routes (pages/[id].js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use square brackets{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [param]
            </code>{" "}
            to create dynamic routes that match any value.
          </p>

          <CodeBlock
            code={`// pages/posts/[id].js - Matches /posts/123, /posts/abc, etc.
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  
  return (
    <div>
      <h1>Post ID: {id}</h1>
      <p>This page matches /posts/[id]</p>
    </div>
  );
}

// Access the route: /posts/123
// router.query.id will be "123"`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Dynamic Segments
          </h3>
          <CodeBlock
            code={`// pages/shop/[category]/[product].js
// Matches /shop/electronics/laptop, /shop/clothing/shirt, etc.
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  const { category, product } = router.query;
  
  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Product: {product}</h2>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Important Notes
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              Dynamic route parameters are available in{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                router.query
              </code>
            </li>
            <li>
              Parameters are always strings (convert to numbers if needed)
            </li>
            <li>
              During static generation,{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                router.query
              </code>{" "}
              is empty - use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                getStaticProps
              </code>{" "}
              or{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                getServerSideProps
              </code>
            </li>
            <li>
              Query parameters from the URL are also available in{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                router.query
              </code>
            </li>
          </ul>
        </section>

        {/* Section 4: Catch-all Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Catch-all Routes (pages/[...slug].js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use three dots{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [...slug]
            </code>{" "}
            to catch all routes that match the path prefix. The parameter will
            be an array.
          </p>

          <CodeBlock
            code={`// pages/docs/[...slug].js
// Matches /docs, /docs/getting-started, /docs/getting-started/installation, etc.
import { useRouter } from 'next/router';

export default function Docs() {
  const router = useRouter();
  const { slug } = router.query;
  
  // slug will be an array:
  // /docs → slug = []
  // /docs/getting-started → slug = ['getting-started']
  // /docs/getting-started/installation → slug = ['getting-started', 'installation']
  
  return (
    <div>
      <h1>Documentation</h1>
      <p>Path segments: {slug?.join(' / ') || 'home'}</p>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Example: File System Router
          </h3>
          <CodeBlock
            code={`// pages/files/[...path].js
// Matches /files/any/nested/path
import { useRouter } from 'next/router';

export default function FileViewer() {
  const router = useRouter();
  const { path } = router.query;
  
  // /files/images/photo.jpg → path = ['images', 'photo.jpg']
  // /files/documents/report.pdf → path = ['documents', 'report.pdf']
  
  const filePath = path ? path.join('/') : '';
  
  return (
    <div>
      <h1>Viewing: {filePath}</h1>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Optional Catch-all Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Optional Catch-all Routes (pages/[[...slug]].js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use double brackets{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              [[...slug]]
            </code>{" "}
            to create optional catch-all routes. This matches both the base path
            and all nested paths.
          </p>

          <CodeBlock
            code={`// pages/shop/[[...slug]].js
// Matches:
//   /shop → slug = undefined
//   /shop/electronics → slug = ['electronics']
//   /shop/electronics/laptops → slug = ['electronics', 'laptops']
import { useRouter } from 'next/router';

export default function Shop() {
  const router = useRouter();
  const { slug } = router.query;
  
  if (!slug) {
    return <h1>Shop Home - Browse All Categories</h1>;
  }
  
  return (
    <div>
      <h1>Shop: {slug.join(' / ')}</h1>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Difference: Catch-all vs Optional Catch-all
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Route Pattern
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Matches /shop
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Matches /shop/electronics
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      [...slug].js
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ❌ No
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Yes (slug = ['electronics'])
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                      [[...slug]].js
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Yes (slug = undefined)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    ✅ Yes (slug = ['electronics'])
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Route Groups */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Route Groups with Parentheses (Not Supported in Pages Router)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Important:</strong> Route groups using parentheses syntax{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              (folder)
            </code>{" "}
            are <strong>NOT supported</strong> in Pages Router. This is an App
            Router-only feature.
          </p>

          <div className="rounded-lg bg-yellow-50 border-2 border-yellow-200 p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> In Pages Router, all folders in{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                pages/
              </code>{" "}
              create routes. If you want to organize files without creating
              routes, you'll need to use a different approach:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-yellow-800 dark:text-yellow-200">
              <li>
                Use the{" "}
                <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                  src/
                </code>{" "}
                directory structure
              </li>
              <li>
                Organize components outside the{" "}
                <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                  pages/
                </code>{" "}
                directory
              </li>
              <li>
                Use the{" "}
                <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                  components/
                </code>{" "}
                folder for shared components
              </li>
            </ul>
          </div>

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            What You Can Do Instead
          </h3>
          <CodeBlock
            code={`// ❌ This doesn't work in Pages Router:
// pages/(marketing)/about.js - Creates /(marketing)/about route

// ✅ Instead, organize like this:
// pages/
//   ├── about.js          → /about
//   ├── contact.js        → /contact
//   └── blog/
//       └── index.js      → /blog

// Or use src/ directory:
// src/
//   ├── pages/
//   │   ├── about.js
//   │   └── contact.js
//   └── components/
//       └── marketing/    ← Organize components here
//           ├── Header.js
//           └── Footer.js`}
            language="text"
          />
        </section>

        {/* Section 7: Nested Dynamic Routes */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Nested Dynamic Routes (pages/posts/[id]/[comment].js)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            You can nest dynamic routes to create complex routing patterns.
          </p>

          <CodeBlock
            code={`// pages/posts/[id]/[comment].js
// Matches /posts/123/comment-456
import { useRouter } from 'next/router';

export default function Comment() {
  const router = useRouter();
  const { id, comment } = router.query;
  
  return (
    <div>
      <h1>Post ID: {id}</h1>
      <h2>Comment ID: {comment}</h2>
      <p>Route: /posts/{id}/{comment}</p>
    </div>
  );
}

// File structure:
// pages/
//   └── posts/
//       └── [id]/
//           └── [comment].js`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complex Nested Example
          </h3>
          <CodeBlock
            code={`// pages/users/[userId]/posts/[postId]/comments/[commentId].js
// Matches /users/123/posts/456/comments/789
import { useRouter } from 'next/router';

export default function CommentDetail() {
  const router = useRouter();
  const { userId, postId, commentId } = router.query;
  
  return (
    <div>
      <h1>User: {userId}</h1>
      <h2>Post: {postId}</h2>
      <h3>Comment: {commentId}</h3>
    </div>
  );
}

// File structure:
// pages/
//   └── users/
//       └── [userId]/
//           └── posts/
//               └── [postId]/
//                   └── comments/
//                       └── [commentId].js`}
            language="javascript"
          />

          <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Combining Dynamic and Static Segments
          </h3>
          <CodeBlock
            code={`// pages/blog/[year]/[month]/[slug].js
// Matches /blog/2024/01/my-post
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { year, month, slug } = router.query;
  
  return (
    <article>
      <h1>{slug}</h1>
      <p>Published: {year}-{month}</p>
    </article>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to A2 Lessons
          </Link>
          <Link
            href="/learn/pages-router/a2/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A2.2 Special Pages →
          </Link>
        </div>
      </div>
    </div>
  );
}
