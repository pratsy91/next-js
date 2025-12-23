import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B8.1: next/image - Next.js Mastery",
  description: "Complete guide to Image component in Next.js App Router",
};

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b8"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B8 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B8.1: next/image
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to use the Image component from next/image: all props,
          optimization features, loading strategies, placeholders, and
          responsive images.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Image Component Basics */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Image Component Basics
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              Image
            </code>{" "}
            component automatically optimizes images for better performance. It
            provides lazy loading, automatic format selection, and responsive
            sizing.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Image Usage
          </h3>
          <CodeBlock
            code={`// app/page.js
import Image from 'next/image';

export default function Page() {
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

// With local image
import Image from 'next/image';
import heroImage from '/public/hero.jpg';

export default function Page() {
  return (
    <Image
      src={heroImage}
      alt="Hero"
      // width and height automatically inferred
    />
  );
}

// External image (requires next.config.js configuration)
<Image
  src="https://example.com/image.jpg"
  alt="External image"
  width={800}
  height={600}
/>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Required Props
          </h3>
          <CodeBlock
            code={`// Image component requires:
// 1. src - Image source (string or imported image)
// 2. alt - Alt text (for accessibility)
// 3. width and height - For static images (or use fill)

import Image from 'next/image';

export default function Page() {
  return (
    <div>
      {/* Static dimensions */}
      <Image
        src="/photo.jpg"
        alt="Photo"
        width={1920}
        height={1080}
      />
      
      {/* Fill container (responsive) */}
      <div className="relative h-96 w-full">
        <Image
          src="/photo.jpg"
          alt="Photo"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: All Image Props */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. All Image Props
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The Image component accepts many props for fine-grained control over
            image rendering and optimization.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complete Props Reference
          </h3>
          <CodeBlock
            code={`// app/components/ImageExample.js
import Image from 'next/image';

export default function ImageExample() {
  return (
    <Image
      // Required props
      src="/image.jpg"
      alt="Description"
      width={800}
      height={600}
      
      // Optional props
      quality={75}                    // 1-100, default 75
      priority={false}                // true to preload
      placeholder="blur"              // "blur" | "empty" | undefined
      blurDataURL="data:image/..."    // Base64 blur placeholder
      sizes="(max-width: 768px) 100vw, 50vw"  // For responsive
      fill={false}                    // Fill container
      loader={undefined}              // Custom loader function
      
      // Styling
      className="rounded-lg"
      style={{ objectFit: 'cover' }}
      
      // Layout
      objectFit="cover"               // "contain" | "cover" | "fill" | "none" | "scale-down"
      objectPosition="center"         // CSS object-position
      
      // Loading
      loading="lazy"                  // "lazy" | "eager"
      unoptimized={false}             // Skip optimization
      
      // Events
      onLoadingComplete={(img) => {}} // Callback when loaded
      onError={(e) => {}}             // Error handler
      
      // Advanced
      draggable={false}               // Disable dragging
    />
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Common Prop Combinations
          </h3>
          <CodeBlock
            code={`// Responsive hero image
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill
        priority
        quality={90}
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}

// Gallery thumbnail
<Image
  src="/thumbnail.jpg"
  alt="Thumbnail"
  width={300}
  height={300}
  placeholder="blur"
  blurDataURL="/blur-thumbnail.jpg"
  className="rounded-lg"
/>

// Profile picture
<Image
  src="/avatar.jpg"
  alt="Profile"
  width={200}
  height={200}
  className="rounded-full"
  objectFit="cover"
/>`}
            language="javascript"
          />
        </section>

        {/* Section 3: Optimization Features */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Optimization Features
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js Image component automatically optimizes images for web
            delivery.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Automatic Optimization
          </h3>
          <CodeBlock
            code={`// Next.js automatically:
// 1. Converts images to modern formats (WebP, AVIF)
// 2. Resizes images to appropriate sizes
// 3. Generates multiple sizes for responsive images
// 4. Lazy loads images by default
// 5. Blurs placeholder while loading

import Image from 'next/image';

export default function OptimizedImage() {
  return (
    <Image
      src="/large-photo.jpg"
      alt="Photo"
      width={2000}
      height={1500}
      // Automatically optimized:
      // - Served as WebP/AVIF if browser supports
      // - Generated in multiple sizes
      // - Lazy loaded
    />
  );
}

// Disable optimization if needed
<Image
  src="/unoptimized.jpg"
  alt="Unoptimized"
  width={800}
  height={600}
  unoptimized={true}
/>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Quality Control
          </h3>
          <CodeBlock
            code={`// Control image quality (1-100)
import Image from 'next/image';

export default function QualityExample() {
  return (
    <div>
      {/* High quality (larger file) */}
      <Image
        src="/photo.jpg"
        alt="High quality"
        width={1920}
        height={1080}
        quality={100}  // Best quality
      />
      
      {/* Default quality */}
      <Image
        src="/photo.jpg"
        alt="Default quality"
        width={1920}
        height={1080}
        quality={75}  // Default
      />
      
      {/* Lower quality (smaller file) */}
      <Image
        src="/photo.jpg"
        alt="Low quality"
        width={1920}
        height={1080}
        quality={50}  // Smaller file, faster load
      />
    </div>
  );
}

// Use cases:
// - quality={90-100}: Hero images, featured images
// - quality={75}: Default, good balance
// - quality={50-60}: Thumbnails, background images`}
            language="javascript"
          />
        </section>

        {/* Section 4: Loading Strategies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Loading Strategies
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control when and how images are loaded to optimize performance.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Lazy Loading (Default)
          </h3>
          <CodeBlock
            code={`// Images load when they enter the viewport
import Image from 'next/image';

export default function LazyLoadExample() {
  return (
    <div>
      <Image
        src="/image1.jpg"
        alt="Image 1"
        width={800}
        height={600}
        loading="lazy"  // Default behavior
      />
      
      {/* Same as above */}
      <Image
        src="/image2.jpg"
        alt="Image 2"
        width={800}
        height={600}
        // lazy is default, no need to specify
      />
    </div>
  );
}

// Lazy loading benefits:
// - Faster initial page load
// - Saves bandwidth
// - Improves Core Web Vitals`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Priority Loading
          </h3>
          <CodeBlock
            code={`// Load immediately (for above-the-fold images)
import Image from 'next/image';

export default function PriorityExample() {
  return (
    <div>
      {/* Hero image - load immediately */}
      <Image
        src="/hero.jpg"
        alt="Hero"
        width={1920}
        height={1080}
        priority  // Loads immediately, no lazy loading
      />
      
      {/* Logo - also important */}
      <Image
        src="/logo.svg"
        alt="Logo"
        width={200}
        height={50}
        priority
      />
      
      {/* Below fold - lazy load */}
      <Image
        src="/content.jpg"
        alt="Content"
        width={800}
        height={600}
        // No priority, lazy loads
      />
    </div>
  );
}

// Use priority for:
// - Hero images
// - Logos
// - Above-the-fold images
// - Images visible without scrolling`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Eager Loading
          </h3>
          <CodeBlock
            code={`// Alternative to priority for eager loading
import Image from 'next/image';

export default function EagerExample() {
  return (
    <Image
      src="/important.jpg"
      alt="Important"
      width={800}
      height={600}
      loading="eager"  // Load immediately
    />
  );
}

// Note: priority is preferred over loading="eager"
// priority also disables lazy loading AND preloads the image`}
            language="javascript"
          />
        </section>

        {/* Section 5: Placeholders */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Placeholders
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use placeholders to improve perceived performance while images load.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Blur Placeholder
          </h3>
          <CodeBlock
            code={`// Blur placeholder with base64 data URL
import Image from 'next/image';

// Generate blur data URL (can use tools or API)
const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRg...';

export default function BlurPlaceholder() {
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
}

// Using static import (Next.js generates blur automatically)
import heroImage from '/public/hero.jpg';

export default function AutoBlur() {
  return (
    <Image
      src={heroImage}
      alt="Hero"
      placeholder="blur"  // Blur generated automatically
      // No blurDataURL needed when using static import
    />
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Generating Blur Data URLs
          </h3>
          <CodeBlock
            code={`// Method 1: Using next/image placeholder generator
// Install: npm install plaiceholder
import { getPlaiceholder } from 'plaiceholder';
import Image from 'next/image';

export default async function BlurImage() {
  const buffer = await fetch('/api/photo').then(res => res.arrayBuffer());
  const { base64 } = await getPlaiceholder(Buffer.from(buffer));
  
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL={base64}
    />
  );
}

// Method 2: Using CSS with empty placeholder
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  placeholder="empty"  // No placeholder
  className="bg-gray-200"  // Background color while loading
/>

// Method 3: Custom placeholder component
export default function CustomPlaceholder() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src="/photo.jpg"
        alt="Photo"
        width={800}
        height={600}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: Sizes and srcSet */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Sizes and srcSet
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Control responsive image sizing and which image size to load for
            different screen sizes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Sizes Prop
          </h3>
          <CodeBlock
            code={`// Tell browser which image size to load
import Image from 'next/image';

export default function ResponsiveImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1920}
      height={1080}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      // Mobile: full width
      // Tablet: half width
      // Desktop: one third width
    />
  );
}

// Common size patterns
<Image
  src="/image.jpg"
  alt="Image"
  width={2000}
  height={1500}
  sizes="100vw"  // Always full viewport width
/>

<Image
  src="/card.jpg"
  alt="Card"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 400px"  // Full on mobile, fixed on desktop
/>

<Image
  src="/gallery.jpg"
  alt="Gallery"
  width={1600}
  height={1200}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            srcSet Generation
          </h3>
          <CodeBlock
            code={`// Next.js automatically generates srcSet
// You just need to provide sizes prop

import Image from 'next/image';

export default function AutoSrcSet() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={2000}
      height={1500}
      sizes="(max-width: 768px) 100vw, 50vw"
      // Next.js automatically generates:
      // - 640w, 750w, 828w, 1080w, 1200w, 1920w, 2048w, 3840w
      // Browser selects appropriate size based on sizes prop
    />
  );
}

// Custom device sizes (via next.config.js)
// next.config.js
module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};`}
            language="javascript"
          />
        </section>

        {/* Section 7: Priority Loading */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Priority Loading
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Prioritize critical images to improve Largest Contentful Paint
            (LCP).
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using Priority Prop
          </h3>
          <CodeBlock
            code={`// Priority images load immediately and preload
import Image from 'next/image';

export default function PriorityExample() {
  return (
    <div>
      {/* Above-the-fold hero */}
      <Image
        src="/hero.jpg"
        alt="Hero"
        width={1920}
        height={1080}
        priority  // Critical for LCP
      />
      
      {/* Logo in header */}
      <header>
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={50}
          priority
        />
      </header>
      
      {/* Below fold - no priority */}
      <section>
        <Image
          src="/content.jpg"
          alt="Content"
          width={800}
          height={600}
          // Lazy loads when scrolled into view
        />
      </section>
    </div>
  );
}

// Best practices:
// - Use priority for LCP element
// - Limit to 1-2 priority images per page
// - Don't use priority for below-fold images`}
            language="javascript"
          />
        </section>

        {/* Section 8: External Domains */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. External Domains
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Configure external image domains for optimization and security.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Configuring External Domains
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.com',  // Wildcard subdomain
      },
    ],
    
    // Or use domains (legacy, simpler)
    domains: ['example.com', 'cdn.example.com'],
  },
};

module.exports = nextConfig;

// Using external images
import Image from 'next/image';

export default function ExternalImage() {
  return (
    <Image
      src="https://example.com/images/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      // Automatically optimized by Next.js
    />
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Custom Loader for External Images
          </h3>
          <CodeBlock
            code={`// Custom loader for specific image sources
import Image from 'next/image';

const customLoader = ({ src, width, quality }) => {
  return \`https://cdn.example.com/\${src}?w=\${width}&q=\${quality || 75}\`;
};

export default function CustomLoaderImage() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      loader={customLoader}  // Custom loader function
    />
  );
}

// Or configure globally in next.config.js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
  },
};

// lib/imageLoader.js
export default function imageLoader({ src, width, quality }) {
  return \`https://cdn.example.com/\${src}?w=\${width}&q=\${quality || 75}\`;
}`}
            language="javascript"
          />
        </section>

        {/* Section 9: Image Formats */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            9. Image Formats
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js automatically serves images in modern formats when supported
            by the browser.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Automatic Format Selection
          </h3>
          <CodeBlock
            code={`// Next.js automatically serves:
// - AVIF (if browser supports)
// - WebP (if browser supports)
// - Original format (fallback)

import Image from 'next/image';

export default function FormatExample() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      // Automatically served as:
      // - AVIF on Chrome/Edge (if enabled)
      // - WebP on modern browsers
      // - JPG as fallback
    />
  );
}

// Configure formats in next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Disable AVIF: remove 'image/avif'
    // Only WebP: ['image/webp']
  },
};`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Format Benefits
          </h3>
          <CodeBlock
            code={`// AVIF: Best compression (~50% smaller than JPEG)
// WebP: Good compression, wide browser support
// JPEG/PNG: Fallback for older browsers

// Example file sizes:
// - photo.jpg (original): 500KB
// - photo.webp (WebP): 200KB (~60% reduction)
// - photo.avif (AVIF): 150KB (~70% reduction)

// Next.js automatically:
// 1. Checks browser support
// 2. Serves best supported format
// 3. Falls back to original if needed

import Image from 'next/image';

export default function OptimizedFormats() {
  return (
    <Image
      src="/large-photo.jpg"
      alt="Large Photo"
      width={4000}
      height={3000}
      quality={80}
      // Automatically optimized to AVIF/WebP
      // Significantly smaller file size
    />
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 10: Responsive Images */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            10. Responsive Images
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create responsive images that adapt to different screen sizes and
            device pixel ratios.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Using Fill for Responsive Images
          </h3>
          <CodeBlock
            code={`// Fill container with responsive image
import Image from 'next/image';

export default function ResponsiveFill() {
  return (
    <div className="relative w-full h-96">
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}

// Responsive card image
export default function Card() {
  return (
    <div className="w-full max-w-md">
      <div className="relative aspect-video">
        <Image
          src="/card-image.jpg"
          alt="Card"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Responsive Grid Layout
          </h3>
          <CodeBlock
            code={`// Gallery with responsive images
import Image from 'next/image';

export default function Gallery({ images }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-square">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}

// Responsive hero with different sizes
export default function ResponsiveHero() {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={90}
      />
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b7/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B7.3 Metadata Patterns
          </Link>
          <Link
            href="/learn/app-router/b8/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B8.2 next/script →
          </Link>
        </div>
      </div>
    </div>
  );
}
