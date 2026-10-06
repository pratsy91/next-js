import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.7: Metadata & SEO Incidents (B7)",
  description:
    "Production metadata incidents: titles, Open Graph, generateMetadata, sitemaps, robots, JSON-LD, streaming metadata, and favicons",
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

export default function Lesson7Page() {
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
          B15.7: Metadata & SEO Incidents (B7)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Wrong titles in production, broken social cards, sitemap gaps, and
          metadata that never reaches crawlers without JavaScript.
        </p>
      </div>

      <div className="space-y-6">
        <IncidentScenario
          number={1}
          level="Junior"
          title="Production title still Create Next App"
          incident="Marketing launches a rebrand but every browser tab and Google result still says Create Next App. The root layout metadata was deleted during a refactor and child pages never defined their own title."
          why="Metadata merges from root to leaf. Removing or failing to override the default export in app/layout.js leaves the scaffold title. Child routes without metadata inherit whatever the root still exports."
          fixSteps={[
            "Restore export const metadata or generateMetadata on app/layout.js with your brand default.",
            "Set page-specific titles on each route segment that needs a unique label.",
            "Verify production build HTML head, not only dev overlay tab titles.",
          ]}
          code={`// app/layout.js
export const metadata = {
  title: {
    default: 'Acme Commerce',
    template: '%s | Acme Commerce',
  },
  description: 'Official Acme storefront',
};

// app/about/page.js
export const metadata = {
  title: 'About us',
};`}
        />

        <IncidentScenario
          number={2}
          level="Junior"
          title="metadata exported from a Client Component"
          incident="A product team added use client to a marketing page for a carousel and moved metadata into the same file. The document title never updates and the Metadata export warning appears in the build log."
          why="The metadata API runs only in Server Components. Client Components are excluded from the static metadata pipeline, so exports in those files are ignored."
          fixSteps={[
            "Keep metadata and generateMetadata in Server Component page or layout files.",
            "Split interactive UI into a client child imported by a server page wrapper.",
            "Colocate data fetching for titles in the server parent, pass props to the client carousel.",
          ]}
          code={`// app/landing/page.js — Server Component (no use client)
import HeroCarousel from './HeroCarousel';

export const metadata = {
  title: 'Summer Sale',
  description: 'Limited-time offers',
};

export default function LandingPage() {
  return (
    <main>
      <h1>Summer Sale</h1>
      <HeroCarousel />
    </main>
  );
}

// app/landing/HeroCarousel.js
'use client';
export default function HeroCarousel() { /* slides */ }`}
        />

        <IncidentScenario
          number={3}
          level="Mid"
          title="generateMetadata uses params without await"
          incident="After upgrading to Next 15, dynamic product titles show undefined in the tab and CI fails type-checking. Blog posts share the same generic title for every slug."
          why="In Next 15 and later, params and searchParams passed to pages and generateMetadata are Promises. Reading params.slug synchronously yields undefined or rejected builds."
          fixSteps={[
            "Make generateMetadata async and await params before reading fields.",
            "Apply the same await pattern in page components using dynamic segments.",
            "Add tests or smoke script that hits a dynamic route in production mode.",
          ]}
          code={`// app/products/[slug]/page.js
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return <h1>{product.name}</h1>;
}`}
        />

        <IncidentScenario
          number={4}
          level="Mid"
          title="Relative Open Graph image URLs"
          incident="Slack and LinkedIn previews show a broken image icon for every share link. The og:image tag points at /og/home.png without a host."
          why="Social crawlers fetch absolute URLs. Relative paths resolve against the crawler context, not your site, unless metadataBase is set and images are absolute."
          fixSteps={[
            "Set metadataBase in the root layout to your production origin.",
            "Use absolute URLs for openGraph.images or paths resolved against metadataBase.",
            "Validate with each platform debugger after deploy.",
          ]}
          code={`// app/layout.js
export const metadata = {
  metadataBase: new URL('https://www.acme.com'),
  openGraph: {
    title: 'Acme Commerce',
    images: ['/og/default.png'],
  },
};

// Resolved as https://www.acme.com/og/default.png`}
        />

        <IncidentScenario
          number={5}
          level="Mid"
          title="Social preview stuck on old OG image"
          incident="Design ships a new OG asset but Twitter still shows last year's banner for the homepage. Direct browser access to the PNG shows the new art immediately."
          why="CDNs, social caches, and og:image URL stability mean platforms reuse prior fetches. Same URL with updated bytes is often ignored until cache expiry."
          fixSteps={[
            "Change the image path or add a version query when replacing creative.",
            "Revalidate static assets or bump cache headers on the OG route if dynamically generated.",
            "Use each network sharing debugger to force a rescrape after URL change.",
          ]}
          code={`export const metadata = {
  metadataBase: new URL('https://www.acme.com'),
  openGraph: {
    images: ['/og/home-v2026.png'],
  },
};

// Dynamic OG route — bump param when creative changes
// app/opengraph-image.js or image?id=2026-q1`}
        />

        <IncidentScenario
          number={6}
          level="Mid"
          title="title.template double-prefixes brand"
          incident="Search results show Home | Acme | Acme and nested docs pages read Docs | Docs | Acme. Editors manually added the brand suffix on every page."
          why="title.template on the root layout appends the site name to each child title. Hard-coding the suffix again in child titles stacks both patterns."
          fixSteps={[
            "Use short leaf titles only, for example Pricing, not Pricing | Acme.",
            "Keep template definition once in root layout metadata.title.template.",
            "Use absolute title property only when a page must bypass the template entirely.",
          ]}
          code={`// app/layout.js
export const metadata = {
  title: {
    default: 'Acme',
    template: '%s | Acme',
  },
};

// app/pricing/page.js
export const metadata = {
  title: 'Pricing',
};

// Browser title: Pricing | Acme`}
        />

        <IncidentScenario
          number={7}
          level="Senior"
          title="Dynamic products missing from sitemap"
          incident="New SKUs sell for weeks but never appear in Search Console URL inventory. The static sitemap.xml lists only marketing pages hand-written at launch."
          why="Search engines discover URLs from sitemaps and links. Hard-coded sitemaps omit database-backed routes, so new product slugs are never submitted."
          fixSteps={[
            "Implement app/sitemap.js that queries all public product URLs.",
            "Set revalidate or dynamic policy so the sitemap refreshes on a schedule.",
            "Include lastModified when the catalog changes for better crawl hints.",
          ]}
          code={`// app/sitemap.js
import { getProductSlugs } from '@/lib/catalog';

export default async function sitemap() {
  const slugs = await getProductSlugs();
  const products = slugs.map((slug) => ({
    url: 'https://www.acme.com/products/' + slug,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    { url: 'https://www.acme.com', lastModified: new Date() },
    ...products,
  ];
}

export const revalidate = 3600;`}
        />

        <IncidentScenario
          number={8}
          level="Senior"
          title="robots.txt blocks the entire site"
          incident="Organic traffic drops to zero after deploy. robots.txt copied from preview contains Disallow: / and Google stops crawling production."
          why="app/robots.js ships with the app. A staging configuration that blocks all crawlers must not ship unchanged. Production must allow public routes."
          fixSteps={[
            "Audit app/robots.js for environment-specific rules.",
            "Allow / in production and disallow only private paths like /admin.",
            "Resubmit sitemap in Search Console after fixing robots.",
          ]}
          code={`// app/robots.js
import { isProduction } from '@/lib/env';

export default function robots() {
  if (!isProduction()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.acme.com/sitemap.xml',
  };
}`}
        />

        <IncidentScenario
          number={9}
          level="Mid"
          title="Invalid or missing JSON-LD"
          incident="Rich results testing fails for product pages. Google Search Console reports parsing errors and stars never appear in SERPs."
          why="Structured data must be valid JSON-LD in a script tag. Invalid JSON, wrong types, or client-only injection after hydration means crawlers never see trustworthy schema."
          fixSteps={[
            "Render JSON-LD from a Server Component alongside page content.",
            "Serialize with JSON.stringify and avoid unescaped user HTML in strings.",
            "Validate with Google Rich Results Test using the deployed URL.",
          ]}
          code={`// app/products/[slug]/page.js
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{product.name}</h1>
    </main>
  );
}`}
        />

        <IncidentScenario
          number={10}
          level="Mid"
          title="Canonical and OG point at localhost"
          incident="SEO audit flags canonical links to http://localhost:3000 on production pages. metadataBase was wired to NEXT_PUBLIC_APP_URL that defaults to localhost in CI artifacts."
          why="metadataBase drives canonical URLs and absolute social tags. If the env var is missing in production, the build bakes in dev defaults that leak to users and crawlers."
          fixSteps={[
            "Set a production-only site URL secret such as SITE_URL without localhost default in prod.",
            "Fail the build when SITE_URL is missing in production pipelines.",
            "Spot-check link rel=canonical in view-source on a prod deploy.",
          ]}
          code={`// app/layout.js
const siteUrl = process.env.SITE_URL;

if (process.env.NODE_ENV === 'production' && !siteUrl) {
  throw new Error('SITE_URL must be set in production');
}

export const metadata = {
  metadataBase: new URL(siteUrl ?? 'http://localhost:3000'),
  alternates: { canonical: '/' },
};`}
        />

        <IncidentScenario
          number={11}
          level="Senior"
          title="Streaming metadata and late title tags"
          incident="Automated SEO crawler reports empty title on key landing pages while Lighthouse in Chrome shows the correct title after JavaScript runs. Non-JS audits fail marketing sign-off."
          why="Some metadata can stream after the initial shell when tied to slow async generateMetadata. Tools that only parse first HTML chunk miss late head updates."
          fixSteps={[
            "Keep business-critical title and description static or fast-resolving in generateMetadata.",
            "Avoid blocking metadata on slow third-party calls; prefetch data with caching.",
            "Understand which tags Next emits in the initial head vs streamed updates for your version.",
          ]}
          code={`// Prefer fast, cached title sources
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostMeta(slug); // cached DB read, not remote CMS on critical path
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title },
  };
}

// Static marketing route — no async dependency
export const metadata = {
  title: 'Enterprise',
  description: 'Acme for teams',
};`}
        />

        <IncidentScenario
          number={12}
          level="Junior"
          title="Favicon 404 after file moves"
          incident="Browser tabs show a generic icon and /favicon.ico returns 404. The team added logo.svg to public while also keeping app/icon.png, then deleted the wrong file during cleanup."
          why="App Router serves icons from app/icon.png, app/favicon.ico, or metadata icons. Conflicting or missing files and stale public favicon links produce 404s depending on which path the browser requests."
          fixSteps={[
            "Use one canonical approach: app/icon.png or metadata icons export.",
            "Remove duplicate favicon.ico from public if app/icon handles it.",
            "Clear CDN cache and verify /favicon.ico and apple-touch-icon after deploy.",
          ]}
          code={`// app/layout.js
export const metadata = {
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

// Place app/icon.png and app/apple-icon.png
// Delete stale public/favicon.ico if it conflicts`}
        />

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b15/lesson-6"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B15.6 Navigation
          </Link>
          <Link
            href="/learn/app-router/b15/lesson-8"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B15.8 Image, Script & Font →
          </Link>
        </div>
      </div>
    </div>
  );
}
