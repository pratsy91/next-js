import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "C1.1: next/image - Next.js Mastery",
  description:
    "next/image component works the same in both App Router and Pages Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/comparison/c1"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to C1 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          C1.1: next/image
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The{" "}
          <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
            next/image
          </code>{" "}
          component has the same API in both App Router and Pages Router.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Same API */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Same API in Both Routers
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/image
            </code>{" "}
            component works identically in both routing systems.
          </p>

          <CodeBlock
            code={`// App Router: app/components/Image.tsx
import Image from 'next/image';

export default function MyImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
    />
  );
}

// Pages Router: components/Image.js
import Image from 'next/image';

export default function MyImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
    />
  );
}

// ✅ Same import
import Image from 'next/image';

// ✅ Same props
<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>

// ✅ Same features work in both:
// - Automatic image optimization
// - Lazy loading
// - Responsive images
// - Placeholder support
// - Priority loading
// - Blur placeholders`}
            language="javascript"
          />
        </section>

        {/* Section 2: Common Props */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Common Props (Work in Both)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            All props work the same way regardless of which router you're using.
          </p>

          <CodeBlock
            code={`// All these props work the same in both routers:
<Image
  src="/image.jpg"           // Required: Image path
  alt="Description"          // Required: Alt text
  width={800}                // Required: Width
  height={600}               // Required: Height
  fill                      // Optional: Fill parent
  sizes="(max-width: 768px) 100vw, 50vw"  // Responsive sizes
  quality={90}              // Image quality (1-100)
  priority                  // Preload image
  placeholder="blur"        // Blur placeholder
  blurDataURL="data:..."    // Blur data URL
  loading="lazy"            // Loading strategy
  unoptimized={false}       // Disable optimization
  onLoad={() => {}}         // Load callback
  onError={() => {}}        // Error callback
/>

// External images (both routers)
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};

// Usage (same in both)
<Image
  src="https://example.com/image.jpg"
  alt="External image"
  width={800}
  height={600}
/>`}
            language="javascript"
          />
        </section>

        {/* Section 3: Usage Examples */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Usage Examples
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Examples that work identically in both routers.
          </p>

          <CodeBlock
            code={`// Basic usage (both routers)
import Image from 'next/image';

export default function ProductImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
    />
  );
}

// Responsive image (both routers)
<Image
  src="/responsive.jpg"
  alt="Responsive"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Priority loading (both routers)
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
/>

// Blur placeholder (both routers)
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Fill parent (both routers)
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src="/fill.jpg"
    alt="Fill"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>

// No differences between routers!
// The API is 100% compatible.`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/comparison/c1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to C1 Lessons
          </Link>
          <Link
            href="/learn/comparison/c1/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: C1.2 next/script →
          </Link>
        </div>
      </div>
    </div>
  );
}
