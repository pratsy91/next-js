import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.8: Image, Script, and Font Incidents (B8)",
  description:
    "Production incidents for next/image, remote patterns, LCP and CLS, next/script, next/font, and self-hosted image optimization load",
};

function LevelBadge({ level }) {
  const styles = {
    Junior:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Mid: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Senior: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[level]}`}
    >
      {level}
    </span>
  );
}

function IncidentScenario({ number, level, title, incident, why, fixSteps, code }) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
      <h2 className="mb-4 flex flex-wrap items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
        <LevelBadge level={level} />
        <span>
          {number}. {title}
        </span>
      </h2>
      <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
        <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
          The incident
        </h3>
        <p className="text-red-700 dark:text-red-300">{incident}</p>
      </div>
      <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
        <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
          Why it happens
        </h3>
        <p className="text-yellow-700 dark:text-yellow-300">{why}</p>
      </div>
      <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
        <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
          How to fix
        </h3>
        <ul className="list-inside list-disc space-y-1 text-green-700 dark:text-green-300">
          {fixSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
      <CodeBlock code={code} language="javascript" />
    </section>
  );
}

export default function Lesson8Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b15"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B15 Incidents
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B15.8: Image, Script, and Font Incidents (B8)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Core Web Vitals regressions from images, third-party scripts, fonts,
          and image optimizer overload on self-hosted Node.
        </p>
      </div>

      <div className="space-y-6">
        <IncidentScenario
          number={1}
          level="Junior"
          title="next/image missing width and height"
          incident="Dev shows images fine but production build fails with an error that width or height is missing, or layout shifts wildly at runtime when only src was passed."
          why="The Image component needs explicit dimensions or fill with a sized parent to reserve space and generate srcset. Without them, Next cannot compute aspect ratio or optimization sizes in strict mode."
          fixSteps={[
            "Pass width and height for fixed-size assets.",
            "Use fill with sizes and a relative parent for responsive layouts.",
            "Replace raw img tags on marketing heroes with sized Image components.",
          ]}
          code={`import Image from 'next/image';

export function Avatar({ user }) {
  return (
    <Image
      src={user.avatarUrl}
      alt={user.name}
      width={48}
      height={48}
      className="rounded-full"
    />
  );
}

export function Hero() {
  return (
    <div className="relative h-[420px] w-full">
      <Image src="/hero.jpg" alt="Hero" fill priority sizes="100vw" />
    </div>
  );
}`}
        />

        <IncidentScenario
          number={2}
          level="Junior"
          title="Remote images return 400 hostname not configured"
          incident="Product photos from the CDN work in the browser tab but next/image responses return 400 invalid url in production. Only local static files render through the optimizer."
          why="The image optimizer only fetches remote hosts allowlisted in next.config. New CDNs or S3 buckets must be declared via images.remotePatterns in modern Next versions."
          fixSteps={[
            "Add remotePatterns with protocol, hostname, and optional pathname.",
            "Do not rely on deprecated images.domains alone for new projects.",
            "Redeploy after config change; verify one SKU image through _next/image.",
          ]}
          code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.acme.com',
        pathname: '/products/**',
      },
    ],
  },
};

module.exports = nextConfig;`}
        />

        <IncidentScenario
          number={3}
          level="Mid"
          title="CLS spike from images without sizes"
          incident="Search ranking drops after a release. CrUX shows CLS regression on listing pages where responsive images load and push filters down the viewport."
          why="Without sizes, the browser picks a wrong intrinsic width from srcset and layout reflows when the image decodes. Wrong aspect ratio boxes also collapse or expand when media arrives."
          fixSteps={[
            "Provide accurate sizes for responsive images matching CSS breakpoints.",
            "Match width and height ratio to the actual asset or use object-fit.",
            "Reserve min-height on card shells until media loads.",
          ]}
          code={`import Image from 'next/image';

export function ProductCard({ product }) {
  return (
    <article className="w-full max-w-sm">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
      </div>
      <h2>{product.name}</h2>
    </article>
  );
}`}
        />

        <IncidentScenario
          number={4}
          level="Mid"
          title="LCP hero image not prioritized"
          incident="Lighthouse flags LCP over 4s on the homepage. The hero is a large Image but it lazy-loads like below-the-fold thumbnails."
          why="next/image lazy-loads by default. The largest above-the-fold paint candidate must load immediately with priority so it is not deferred behind less important assets."
          fixSteps={[
            "Add priority to the single LCP image per page.",
            "Avoid priority on every image — only the main hero or banner.",
            "Preload critical font and reduce competing script work on first paint.",
          ]}
          code={`import Image from 'next/image';

export function HomeHero() {
  return (
    <section className="relative h-[560px] w-full">
      <Image
        src="/hero.webp"
        alt="Welcome to Acme"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </section>
  );
}`}
        />

        <IncidentScenario
          number={5}
          level="Mid"
          title="Four megabyte PNGs bypass optimization"
          incident="Network panel shows full-size PNGs despite using next/image. Page weight matches the origin CDN bytes with no WebP or AVIF variants."
          why="unoptimized true, a custom loader that passthroughs URLs, or static export settings can skip the default optimizer. Broken loader config serves the raw URL."
          fixSteps={[
            "Remove unoptimized unless you offload optimization to the CDN.",
            "Fix or remove custom loaders that do not resize or transcode.",
            "Confirm _next/image URLs appear in production responses.",
          ]}
          code={`import Image from 'next/image';

// Broken: bypasses optimizer
// <Image src="/big.png" width={1200} height={800} unoptimized />

export function PromoBanner() {
  return (
    <Image
      src="https://cdn.acme.com/promo/banner.png"
      alt="Promo"
      width={1200}
      height={400}
      quality={80}
    />
  );
}`}
        />

        <IncidentScenario
          number={6}
          level="Mid"
          title="Raw script tag in root layout blocks hydration"
          incident="First Input Delay spikes after pasting Google Analytics snippet directly into layout.js head. Main thread busy before React hydrates interactive header."
          why="Inline or synchronous third-party scripts in the root layout run during initial parse and compete with React hydration unless deferred with Next script strategies."
          fixSteps={[
            "Move analytics to next/script with strategy afterInteractive or lazyOnload.",
            "Keep layout.js free of blocking inline script except structured data on pages.",
            "Load tags after the app shell is interactive for better INP.",
          ]}
          code={`// app/layout.js
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXX');",
          }}
        />
      </body>
    </html>
  );
}`}
        />

        <IncidentScenario
          number={7}
          level="Senior"
          title="Chat widget lazyOnload still tanks INP"
          incident="Support chat vendor script uses lazyOnload but main-thread long tasks still spike on first scroll. Mobile INP fails Core Web Vitals guardrails."
          why="Third-party bundles often execute heavy initialization even when loaded late. lazyOnload only delays download start, not main-thread cost once the script runs."
          fixSteps={[
            "Load chat only after user clicks Help or after requestIdleCallback.",
            "Facade pattern: lightweight button swaps in the real widget on interaction.",
            "Measure INP with and without vendor in production RUM.",
          ]}
          code={`'use client';

import { useState } from 'react';
import Script from 'next/script';

export function ChatLauncher() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setEnabled(true)}>
        Chat with us
      </button>
      {enabled ? (
        <Script src="https://vendor.example/chat.js" strategy="lazyOnload" />
      ) : null}
    </>
  );
}`}
        />

        <IncidentScenario
          number={8}
          level="Senior"
          title="next/font Google fetch fails in CI"
          incident="Pipeline build fails with font fetch error because CI has no outbound network. When builds pass, custom font still causes layout shift on first paint."
          why="next/font downloads Google fonts at build time by default. Air-gapped CI breaks builds. Poor fallback metric alignment causes CLS when webfont swaps in."
          fixSteps={[
            "Self-host woff2 with next/font/local in restricted environments.",
            "Tune fallback with adjustFontFallback to match metrics.",
            "Commit font files or use private registry mirrors for CI.",
          ]}
          code={`// app/layout.js
import localFont from 'next/font/local';

const brand = localFont({
  src: [
    { path: './fonts/Brand-Regular.woff2', weight: '400' },
    { path: './fonts/Brand-Bold.woff2', weight: '700' },
  ],
  display: 'swap',
  adjustFontFallback: 'Arial',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={brand.className}>
      <body>{children}</body>
    </html>
  );
}`}
        />

        <IncidentScenario
          number={9}
          level="Mid"
          title="fill image inside zero-height parent"
          incident="Product gallery thumbnails exist in the DOM but are invisible in QA. Inspect shows img with zero computed height despite fill prop."
          why="fill positions absolute inside a relative parent. If the parent collapses to height zero because it has no intrinsic size or aspect ratio, the image has no box to fill."
          fixSteps={[
            "Give the wrapper explicit height, aspect-ratio, or padding-bottom hack.",
            "Ensure position relative is on the sizing wrapper, not an outer flex item without height.",
            "Use width and height instead of fill for fixed thumbnails.",
          ]}
          code={`import Image from 'next/image';

export function Thumb({ src, alt }) {
  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
      <Image src={src} alt={alt} fill sizes="96px" className="object-cover" />
    </div>
  );
}`}
        />

        <IncidentScenario
          number={10}
          level="Mid"
          title="Untrusted SVG and user URLs in next/image"
          incident="Security review flags user avatar URLs passed to Image optimizer. Pen test shows SSRF probes against internal IPs via image fetch on the server."
          why="The optimizer fetches remote URLs server-side. SVG can embed scripts. Unrestricted remotePatterns turn the image route into a server-side request gadget."
          fixSteps={[
            "Restrict remotePatterns to known CDNs only.",
            "Serve user SVGs as static download or sanitize; rasterize avatars when possible.",
            "Use unoptimized img with CSP for untrusted origins instead of optimizer fetch.",
          ]}
          code={`// next.config.js — narrow patterns, no wildcard internet
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'avatars.acme-cdn.com' },
  ],
},

// Untrusted user URL — do not pipe through optimizer
export function ExternalAvatar({ url, alt }) {
  return <img src={url} alt={alt} width={40} height={40} referrerPolicy="no-referrer" />;
}`}
        />

        <IncidentScenario
          number={11}
          level="Junior"
          title="Plain img for above-the-fold hero"
          incident="Marketing drops in a raw img tag for the homepage hero to move fast. Lighthouse LCP fails and the audit recommends proper sizing and modern formats."
          why="Native img skips automatic srcset, priority hints integration, and default optimization path. LCP element loads later without priority and correct sizes."
          fixSteps={[
            "Convert hero to next/image with fill or explicit dimensions.",
            "Add priority on the LCP candidate.",
            "Serve WebP or AVIF via optimizer or pre-compressed static files.",
          ]}
          code={`import Image from 'next/image';

// Before: <img src="/hero.png" className="w-full" />

export function Hero() {
  return (
    <div className="relative aspect-[16/9] w-full max-h-[70vh]">
      <Image
        src="/hero.png"
        alt="Campaign hero"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}`}
        />

        <IncidentScenario
          number={12}
          level="Senior"
          title="Self-hosted image optimizer CPU pegged"
          incident="Single Node instance hits 100% CPU during traffic spike. Logs show thousands of unique _next/image width requests with no cache hits on cold deploy."
          why="Default self-hosted optimization generates derivatives on first request. High cardinality sizes and short cache TTL hammer the server without a CDN in front."
          fixSteps={[
            "Set images.minimumCacheTTL to cache derivatives longer at the edge or disk.",
            "Constrain deviceSizes and imageSizes to the breakpoints you actually render.",
            "Put CDN or reverse proxy cache in front of /_next/image.",
          ]}
          code={`// next.config.js
const nextConfig = {
  images: {
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;`}
        />

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b15/lesson-7"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B15.7 Metadata & SEO
          </Link>
          <Link
            href="/learn/app-router/b15/lesson-9"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B15.9 Styling →
          </Link>
        </div>
      </div>
    </div>
  );
}
