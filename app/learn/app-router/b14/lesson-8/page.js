import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.8: Components & Features - Most Asked Interview Q&A",
  description:
    "Most asked Next.js interview questions on next/image, next/script, next/font, optimization, CLS, and LCP",
};

function LevelBadge({ level }) {
  const styles = {
    Junior:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Mid: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Senior:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  };
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${styles[level]}`}
    >
      {level}
    </span>
  );
}

export default function Lesson8Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b14"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B14 Interview Q&A
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B14.8: Components & Features (B8)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Most asked interview questions on next/image, next/script, and
          next/font — optimization, Core Web Vitals, and common pitfalls.
        </p>
      </div>

      <div className="space-y-6">
        {/* Q1 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              1. Why use next/image instead of a regular &lt;img&gt; tag?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/image
            </code>{" "}
            automatically optimizes images: serves modern formats (WebP/AVIF),
            resizes to the requested width, lazy-loads off-screen images,
            prevents layout shift with reserved space, and can blur-placeholder
            during load. A plain{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &lt;img&gt;
            </code>{" "}
            serves the original file at full size with no format negotiation.
          </p>
          <CodeBlock
            code={`import Image from 'next/image';

// Optimized — auto WebP/AVIF, lazy load, no CLS
<Image src="/hero.jpg" alt="Hero" width={800} height={600} />

// Unoptimized — full-size JPEG, no lazy load strategy, layout shift risk
<img src="/hero.jpg" alt="Hero" />`}
            language="javascript"
          />
        </section>

        {/* Q2 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              2. width/height vs fill — when to use each?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use explicit{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              width
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              height
            </code>{" "}
            when you know the image dimensions (fixed-size images, imported
            static assets). Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              fill
            </code>{" "}
            when the image should fill a responsive container — the parent must
            have{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              position: relative
            </code>{" "}
            and defined dimensions.
          </p>
          <CodeBlock
            code={`import Image from 'next/image';

// Fixed dimensions — reserves space, prevents CLS
<Image src="/avatar.png" alt="Avatar" width={64} height={64} />

// Responsive fill — parent controls size
<div style={{ position: 'relative', width: '100%', height: 400 }}>
  <Image
    src="/banner.jpg"
    alt="Banner"
    fill
    style={{ objectFit: 'cover' }}
    sizes="100vw"
  />
</div>

// Static import — width/height inferred automatically
import heroImg from '@/public/hero.jpg';
<Image src={heroImg} alt="Hero" placeholder="blur" />`}
            language="javascript"
          />
        </section>

        {/* Q3 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              3. What is the priority prop and how does it affect LCP?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              priority
            </code>{" "}
            on above-the-fold hero images that are the Largest Contentful Paint
            (LCP) element. It disables lazy loading, adds a high-priority{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              fetchpriority=&quot;high&quot;
            </code>{" "}
            hint, and preloads the image. Use on at most one image per page —
            overusing priority defeats the purpose.
          </p>
          <CodeBlock
            code={`import Image from 'next/image';

export default function Hero() {
  return (
    <section>
      {/* LCP candidate — above the fold, largest visible element */}
      <Image
        src="/hero.webp"
        alt="Welcome"
        width={1200}
        height={600}
        priority
        sizes="100vw"
      />
      {/* Below fold — default lazy loading, no priority */}
      <Image src="/feature.jpg" alt="Feature" width={400} height={300} />
    </section>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q4 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              4. Why is the sizes prop important?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              sizes
            </code>{" "}
            prop tells the browser how wide the image will render at different
            viewport widths. Without it, the browser assumes{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              100vw
            </code>{" "}
            and may download an oversized image. With correct{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              sizes
            </code>
            , Next.js generates appropriately sized srcset entries, saving
            bandwidth and improving load time.
          </p>
          <CodeBlock
            code={`// Sidebar image: 300px on desktop, full width on mobile
<Image
  src="/sidebar-ad.jpg"
  alt="Ad"
  fill
  sizes="(max-width: 768px) 100vw, 300px"
/>

// Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={400}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>

// Full-width hero
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  priority
  sizes="100vw"
/>`}
            language="javascript"
          />
        </section>

        {/* Q5 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              5. How do remotePatterns and domains work for external images?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            External images must be allowlisted in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next.config.js
            </code>
            . Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              remotePatterns
            </code>{" "}
            (recommended) for granular protocol/hostname/pathname control, or
            the legacy{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              domains
            </code>{" "}
            array for hostname-only allowlisting.
          </p>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    // Legacy (still works):
    // domains: ['cdn.example.com'],
  },
};

// Usage
<Image
  src="https://cdn.example.com/images/product.jpg"
  alt="Product"
  width={400}
  height={400}
/>`}
            language="javascript"
          />
        </section>

        {/* Q6 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              6. How do blur placeholders work?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Set{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              placeholder=&quot;blur&quot;
            </code>{" "}
            with a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              blurDataURL
            </code>{" "}
            (base64 tiny image) for a smooth fade-in. Static imports
            auto-generate blur data. For remote images, provide{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              blurDataURL
            </code>{" "}
            manually or use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              placeholder=&quot;empty&quot;
            </code>{" "}
            (default gray shimmer).
          </p>
          <CodeBlock
            code={`import Image from 'next/image';
import heroImg from '@/public/hero.jpg';

// Static import — blur auto-generated at build time
<Image src={heroImg} alt="Hero" placeholder="blur" />

// Remote with manual blur data URL
<Image
  src="https://cdn.example.com/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>

// Default shimmer while loading (no blur needed)
<Image src="/photo.jpg" alt="Photo" width={800} height={600} />`}
            language="javascript"
          />
        </section>

        {/* Q7 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              7. What are next/script loading strategies?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              beforeInteractive
            </code>{" "}
            loads before hydration (injected into initial HTML, for critical
            scripts).{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              afterInteractive
            </code>{" "}
            (default) loads after page hydration.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              lazyOnload
            </code>{" "}
            loads during idle time — best for analytics and chat widgets.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              worker
            </code>{" "}
            (experimental) loads in a web worker.
          </p>
          <CodeBlock
            code={`import Script from 'next/script';

// Critical — must run before React hydrates (root layout only)
<Script src="/critical-polyfill.js" strategy="beforeInteractive" />

// Default — after page is interactive (most third-party scripts)
<Script src="https://example.com/widget.js" strategy="afterInteractive" />

// Low priority — analytics, chat widgets
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  strategy="lazyOnload"
  onLoad={() => console.log('Analytics loaded')}
/>

// Inline script with id (required for inline)
<Script id="theme-init" strategy="beforeInteractive">
  {\`document.documentElement.classList.add('dark')\`}
</Script>`}
            language="javascript"
          />
        </section>

        {/* Q8 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              8. When to use next/script vs a regular &lt;script&gt; tag?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/script
            </code>{" "}
            for third-party scripts that need controlled loading order and
            deduplication. It prevents duplicate script injection when navigating
            between pages (SPA behavior). Use regular{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &lt;script&gt;
            </code>{" "}
            only in special cases like JSON-LD structured data inline in Server
            Components.
          </p>
          <CodeBlock
            code={`// ✅ Third-party — deduplicated, strategy-controlled
import Script from 'next/script';
<Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="lazyOnload" />

// ✅ JSON-LD in Server Component — no next/script needed
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>

// ❌ Avoid — reloads on every client navigation
<script src="https://cdn.example.com/analytics.js" />`}
            language="javascript"
          />
        </section>

        {/* Q9 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              9. What are the benefits of next/font?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/font
            </code>{" "}
            automatically self-hosts fonts at build time — no external requests
            to Google Fonts CDN. It eliminates layout shift with size-adjusted
            fallbacks, supports CSS variable injection for Tailwind integration,
            and subsets fonts to include only used characters, reducing file
            size.
          </p>
          <CodeBlock
            code={`// app/layout.js
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// Benefits:
// - No render-blocking external font request
// - Zero CLS from font swap
// - Automatic subsetting
// - Privacy-friendly (no Google CDN tracking)`}
            language="javascript"
          />
        </section>

        {/* Q10 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              10. localFont vs Google fonts — when to use each?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/font/google
            </code>{" "}
            for Google Fonts catalog fonts (Inter, Roboto, etc.) — downloaded
            and self-hosted at build time. Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/font/local
            </code>{" "}
            for custom brand fonts, licensed typefaces, or variable font files
            you provide locally.
          </p>
          <CodeBlock
            code={`// Google Font — auto-downloaded and self-hosted
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });

// Local Font — your own font files
import localFont from 'next/font/local';

const brandFont = localFont({
  src: [
    { path: './fonts/Brand-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Brand-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-brand',
  display: 'swap',
});

// Variable font — single file, all weights
const inter = localFont({
  src: './fonts/Inter-Variable.woff2',
  variable: '--font-inter',
});`}
            language="javascript"
          />
        </section>

        {/* Q11 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              11. How do fonts reduce CLS (Cumulative Layout Shift)?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Font swapping causes CLS when fallback and web fonts have different
            metrics (x-height, width).{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/font
            </code>{" "}
            uses{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              size-adjust
            </code>{" "}
            CSS to match fallback font metrics to the web font, minimizing
            layout shift during swap. Combined with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              display: &apos;swap&apos;
            </code>
            , text is visible immediately with a fallback that closely matches
            the final font.
          </p>
          <CodeBlock
            code={`// next/font automatically generates size-adjust fallbacks:
// @font-face {
//   font-family: '__Inter_Fallback';
//   src: local('Arial');
//   size-adjust: 107.4%;  /* matches Inter metrics */
//   ascent-override: 90%;
//   descent-override: 22%;
//   line-gap-override: 0%;
// }

import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // show fallback immediately, swap when loaded
  adjustFontFallback: true, // default — generates metric-matched fallback
});`}
            language="javascript"
          />
        </section>

        {/* Q12 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              12. How does image optimization work on self-hosted deployments?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            On Vercel, image optimization runs automatically. Self-hosted requires
            the Next.js server (or a compatible image optimization loader). Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              output: &apos;standalone&apos;
            </code>{" "}
            for Docker deployments. For static export (
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              output: &apos;export&apos;
            </code>
            ), set{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              images.unoptimized: true
            </code>{" "}
            or use a custom loader (Cloudinary, Imgix).
          </p>
          <CodeBlock
            code={`// next.config.js — custom loader for CDN
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
  },
};

// lib/imageLoader.js
export default function cloudinaryLoader({ src, width, quality }) {
  const params = ['f_auto', 'c_limit', \`w_\${width}\`, \`q_\${quality || 75}\`];
  return \`https://res.cloudinary.com/demo/image/upload/\${params.join(',')}\${src}\`;
}

// Static export — no server-side optimization
const nextConfig = { output: 'export', images: { unoptimized: true } };`}
            language="javascript"
          />
        </section>

        {/* Q13 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              13. AVIF vs WebP — how does Next.js choose formats?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js Image Optimization API negotiates format via the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Accept
            </code>{" "}
            header. AVIF is preferred (smaller files, better compression) when
            the browser supports it, then WebP, then original format as
            fallback. Configure allowed formats in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next.config.js
            </code>
            .
          </p>
          <CodeBlock
            code={`// next.config.js
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Default: ['image/webp'] in older versions
    // AVIF ~50% smaller than JPEG, WebP ~25-35% smaller
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

// Browser Accept: image/avif,image/webp → serves AVIF
// Browser Accept: image/webp → serves WebP
// Old browser → serves original JPEG/PNG`}
            language="javascript"
          />
        </section>

        {/* Q14 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              14. What are common next/image interview pitfalls?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Missing sizes with fill</strong> — downloads full-width
              image even for small containers
            </li>
            <li>
              <strong>priority on every image</strong> — defeats preloading;
              use only on LCP element
            </li>
            <li>
              <strong>Forgetting remotePatterns</strong> — external images fail
              silently or throw in dev
            </li>
            <li>
              <strong>Using fill without relative parent</strong> — image
              collapses or overflows
            </li>
            <li>
              <strong>SVG via next/image</strong> — not optimized by default;
              use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                unoptimized
              </code>{" "}
              or inline SVG
            </li>
            <li>
              <strong>Animated GIF</strong> — optimization strips animation;
              use regular{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                &lt;img&gt;
              </code>{" "}
              or video
            </li>
            <li>
              <strong>Missing alt text</strong> — accessibility and SEO failure
            </li>
            <li>
              <strong>CSS width/height override without sizes</strong> — browser
              still downloads wrong size from srcset
            </li>
          </ul>
          <CodeBlock
            code={`// ❌ Common mistake — fill without sizes
<div style={{ position: 'relative', width: 200, height: 200 }}>
  <Image src="/photo.jpg" alt="Photo" fill />
  {/* Downloads ~1920px image for 200px container! */}
</div>

// ✅ Correct
<div style={{ position: 'relative', width: 200, height: 200 }}>
  <Image src="/photo.jpg" alt="Photo" fill sizes="200px" />
</div>`}
            language="javascript"
          />
        </section>

        {/* Q15 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              15. Can you use next/image in Client Components?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Yes.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/image
            </code>{" "}
            works in both Server and Client Components. The optimization
            happens at request time on the server regardless of where the
            component is rendered. For event handlers on images (click to
            zoom), wrap in a Client Component.
          </p>
          <CodeBlock
            code={`// Client Component with interactive image
'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ZoomableImage({ src, alt }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      onClick={() => setZoomed(!zoomed)}
      style={{ cursor: 'zoom-in', transform: zoomed ? 'scale(2)' : 'scale(1)' }}
    />
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q16 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              16. How do next/image, next/script, and next/font work together for Core Web Vitals?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            These three components target different Core Web Vitals metrics:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>LCP</strong> —{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                priority
              </code>{" "}
              on hero image, correct{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                sizes
              </code>
              , AVIF/WebP formats
            </li>
            <li>
              <strong>CLS</strong> — explicit width/height on images,{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                next/font
              </code>{" "}
              size-adjust fallbacks, no layout-shifting script injection
            </li>
            <li>
              <strong>INP/FID</strong> —{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
                lazyOnload
              </code>{" "}
              for non-critical scripts, defer third-party widgets
            </li>
          </ul>
          <CodeBlock
            code={`// app/layout.js — optimized root layout
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
        {/* Analytics — lazy, doesn't block interactivity */}
        <Script src="/analytics.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

// app/page.js — LCP-optimized hero
import Image from 'next/image';

export default function Home() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={630}
      priority
      sizes="100vw"
      placeholder="blur"
    />
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b14/lesson-7"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B14.7 Metadata API
          </Link>
          <Link
            href="/learn/app-router/b14/lesson-9"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B14.9 Styling →
          </Link>
        </div>
      </div>
    </div>
  );
}
