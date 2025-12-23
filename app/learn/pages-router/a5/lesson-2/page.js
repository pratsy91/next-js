import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A5.2: next/image - Next.js Mastery",
  description: "Complete guide to Image component in Next.js Pages Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a5"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A5 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A5.2: next/image
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use the Image component from next/image: all props,
          optimization features, loading strategies, placeholders, and
          responsive images.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Image Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Image Component (All Props)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Image
            </code>{" "}
            component automatically optimizes images for better performance.
          </p>

          <CodeBlock
            code={`// pages/index.js
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={800}
        height={600}
      />
    </div>
  );
}

// All available props
<Image
  src="/image.jpg"              // Required: Image source
  alt="Description"             // Required: Alt text
  width={800}                   // Required (unless using fill)
  height={600}                  // Required (unless using fill)
  fill={false}                  // Fill parent container
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={75}                  // Image quality (1-100)
  priority={false}              // Priority loading
  placeholder="blur"            // Placeholder type
  blurDataURL="data:..."       // Blur placeholder data
  loader={customLoader}        // Custom loader function
  unoptimized={false}          // Disable optimization
  onLoadingComplete={(img) => {}} // Callback when loaded
  onError={(err) => {}}        // Error handler
  loading="lazy"               // Loading strategy
  className="my-image"         // CSS class
  style={{ objectFit: 'cover' }} // Inline styles
/>`}
            language="javascript"
          />
        </section>

        {/* Section 2: Optimization Features */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Optimization Features
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically optimizes images with format conversion,
            sizing, and lazy loading.
          </p>

          <CodeBlock
            code={`import Image from 'next/image';

export default function OptimizedImage() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={1200}
      height={800}
      quality={90} // Higher quality (default: 75)
      // Automatically:
      // - Converts to WebP/AVIF when supported
      // - Generates multiple sizes
      // - Lazy loads by default
      // - Optimizes file size
    />
  );
}

// Automatic optimizations:
// 1. Format conversion (WebP, AVIF)
// 2. Responsive sizing
// 3. Lazy loading
// 4. File size reduction
// 5. CDN delivery`}
            language="javascript"
          />
        </section>

        {/* Section 3: Loading Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Loading Strategies (lazy, eager)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control when images are loaded using loading strategies.
          </p>

          <CodeBlock
            code={`import Image from 'next/image';

export default function LoadingExamples() {
  return (
    <div>
      {/* Lazy loading (default) - loads when near viewport */}
      <Image
        src="/image1.jpg"
        alt="Lazy loaded"
        width={800}
        height={600}
        loading="lazy"
      />
      
      {/* Eager loading - loads immediately */}
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        loading="eager"
        priority // Also use priority for above-the-fold images
      />
      
      {/* Priority loading - loads immediately, high priority */}
      <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={200}
        priority // Highest priority, loads immediately
      />
    </div>
  );
}

// When to use each:
// - lazy: Below the fold images (default)
// - eager: Images that should load immediately
// - priority: Critical images (hero, logo, etc.)`}
            language="javascript"
          />
        </section>

        {/* Section 4: Placeholder */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Placeholder (blur, empty)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Add placeholders to improve perceived performance while images load.
          </p>

          <CodeBlock
            code={`import Image from 'next/image';

export default function PlaceholderExamples() {
  return (
    <div>
      {/* Blur placeholder */}
      <Image
        src="/photo.jpg"
        alt="Photo"
        width={800}
        height={600}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Base64 encoded small image
      />
      
      {/* Empty placeholder (default) */}
      <Image
        src="/photo.jpg"
        alt="Photo"
        width={800}
        height={600}
        placeholder="empty" // or omit placeholder prop
      />
    </div>
  );
}

// Generating blur placeholder
import { getPlaiceholder } from 'plaiceholder';

export async function getStaticProps() {
  const { base64 } = await getPlaiceholder('/photo.jpg');
  
  return {
    props: {
      blurDataURL: base64,
    },
  };
}

// Using in component
export default function Page({ blurDataURL }) {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Sizes and srcSet */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Sizes and srcSet
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control responsive image sizing with sizes and srcSet props.
          </p>

          <CodeBlock
            code={`import Image from 'next/image';

export default function ResponsiveImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1920}
      height={1080}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      // Next.js automatically generates srcSet based on sizes
      // Mobile: full width
      // Tablet: half width
      // Desktop: one-third width
    />
  );
}

// Common sizes patterns
<Image
  src="/image.jpg"
  alt="Image"
  width={1200}
  height={800}
  sizes="100vw" // Always full viewport width
/>

<Image
  src="/image.jpg"
  alt="Image"
  width={1200}
  height={800}
  sizes="(max-width: 640px) 100vw, 640px" // Full width on mobile, fixed on desktop
/>

<Image
  src="/image.jpg"
  alt="Image"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>`}
            language="javascript"
          />
        </section>

        {/* Section 6: Priority Loading */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Priority Loading
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Mark critical images for priority loading to improve LCP (Largest
            Contentful Paint).
          </p>

          <CodeBlock
            code={`import Image from 'next/image';

export default function Hero() {
  return (
    <div>
      {/* Priority image - loads immediately */}
      <Image
        src="/hero.jpg"
        alt="Hero"
        width={1920}
        height={1080}
        priority // Critical for LCP
      />
      
      {/* Non-priority images load lazily */}
      <Image
        src="/gallery-1.jpg"
        alt="Gallery"
        width={800}
        height={600}
        // No priority - loads when near viewport
      />
    </div>
  );
}

// Use priority for:
// - Hero images
// - Above-the-fold images
// - Logo images
// - Critical visual content

// Don't use priority for:
// - Below-the-fold images
// - Gallery images
// - Decorative images`}
            language="javascript"
          />
        </section>

        {/* Section 7: External Domains */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. External Domains Configuration
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure external image domains in next.config.js to use next/image
            with external sources.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  images: {
    // Allow specific domains
    domains: ['example.com', 'cdn.example.com'],
    
    // Or use remotePatterns (recommended)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],
  },
};

// Using external images
import Image from 'next/image';

export default function ExternalImage() {
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="External image"
      width={800}
      height={600}
    />
  );
}

// Custom loader for external images
const customLoader = ({ src, width, quality }) => {
  return \`https://example.com/api/image?url=\${src}&w=\${width}&q=\${quality || 75}\`;
};

<Image
  loader={customLoader}
  src="https://example.com/image.jpg"
  alt="Image"
  width={800}
  height={600}
/>`}
            language="javascript"
          />
        </section>

        {/* Section 8: Image Formats */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. Image Formats (WebP, AVIF)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically serves modern image formats when supported by
            the browser.
          </p>

          <CodeBlock
            code={`// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'], // Default
    // Next.js tries AVIF first, then WebP, then original format
  },
};

// Image component automatically uses best format
import Image from 'next/image';

export default function FormatExample() {
  return (
    <Image
      src="/photo.jpg" // Original format
      alt="Photo"
      width={800}
      height={600}
      // Automatically served as:
      // - AVIF (if browser supports it)
      // - WebP (if browser supports it)
      // - Original JPEG (fallback)
    />
  );
}

// Format priority:
// 1. AVIF (best compression, newer browsers)
// 2. WebP (good compression, wider support)
// 3. Original format (fallback)`}
            language="javascript"
          />
        </section>

        {/* Section 9: Responsive Images */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            9. Responsive Images
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create responsive images that adapt to different screen sizes.
          </p>

          <CodeBlock
            code={`import Image from 'next/image';

export default function ResponsiveExamples() {
  return (
    <div>
      {/* Using fill for responsive containers */}
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Image
          src="/hero.jpg"
          alt="Hero"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      {/* Fixed width with responsive sizing */}
      <Image
        src="/photo.jpg"
        alt="Photo"
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <Image
            key={img.id}
            src={img.src}
            alt={img.alt}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ))}
      </div>
    </div>
  );
}

// Fill mode for responsive containers
<div style={{ position: 'relative', aspectRatio: '16/9' }}>
  <Image
    src="/video-thumbnail.jpg"
    alt="Thumbnail"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    style={{ objectFit: 'cover' }}
  />
</div>`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a5/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A5.1 next/head
          </Link>
          <Link
            href="/learn/pages-router/a5/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A5.3 next/script →
          </Link>
        </div>
      </div>
    </div>
  );
}
