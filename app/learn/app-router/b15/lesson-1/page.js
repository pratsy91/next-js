import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.1: Foundation Incidents - Next.js Mastery",
  description:
    "Production incidents from Server vs Client boundaries, hydration, secrets, and RSC placement (maps to B1)",
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

export default function Lesson1Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b15"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B15 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B15.1: Foundation Incidents
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Real production breaks at the Server Component / Client Component
          boundary. Each scenario is an interview prompt: what users saw, why
          App Router behaved that way, and the fix you ship under pressure.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Page crashes: useState in a Server Component
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              After deploy, the dashboard route returns a 500 or a red error
              overlay: hooks can only be called inside Client Components. The
              page worked in a CodeSandbox snippet but not in the real app
              because the file had no client boundary.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              App Router treats every module under app/ as a Server Component by
              default. React state hooks run only in Client Components. The
              server bundle rejects hook usage at build or runtime.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Add &apos;use client&apos; at the top of the file that uses hooks, or extract a small client leaf.</li>
              <li>Keep data fetching in the Server Component parent; pass serializable props down.</li>
              <li>Do not mark the whole page client unless you must — that moves work to the browser.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — app/dashboard/page.js (Server Component)
import { useState } from 'react';
export default function Dashboard() {
  const [tab, setTab] = useState('overview');
  return <button onClick={() => setTab('billing')}>{tab}</button>;
}

// FIXED — app/dashboard/DashboardTabs.js
'use client';
import { useState } from 'react';
export default function DashboardTabs({ initialTab }) {
  const [tab, setTab] = useState(initialTab);
  return <button onClick={() => setTab('billing')}>{tab}</button>;
}

// app/dashboard/page.js — stays a Server Component
import DashboardTabs from './DashboardTabs';
export default async function Dashboard() {
  return <DashboardTabs initialTab="overview" />;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            onClick on a Server Component button does nothing
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              QA reports the &quot;Add to cart&quot; button renders but never
              fires. Build may fail with an error that event handlers cannot be
              passed to Client Component props from Server Components without a
              client boundary on the element that owns the handler.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Server Components render to HTML on the server; their output is
              not hydrated with client event wiring unless a Client Component
              owns the interactive DOM node. Inline onClick in a server file is
              either stripped or rejected.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Move the button into a Client Component with onClick or use a form with a Server Action.</li>
              <li>For mutations, prefer form action pointing at a Server Action for progressive enhancement.</li>
              <li>Keep the product details as Server Component; import a client AddToCartButton leaf.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — app/product/[id]/page.js
export default function ProductPage({ product }) {
  return (
    <button onClick={() => console.log('add')}>Add to cart</button>
  );
}

// FIXED — app/product/[id]/AddToCartButton.js
'use client';
export default function AddToCartButton({ productId }) {
  return (
    <button type="button" onClick={() => {/* client analytics + optimistic UI */}}>
      Add to cart
    </button>
  );
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            window is not defined during SSR or build
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              CI build fails with ReferenceError: window is not defined, or the
              page crashes on first load in production while dev mode felt fine
              if the bad import only ran during static generation.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Server Components and the Node build environment have no browser
              globals. Top-level access to window, document, or localStorage in
              a module that the server evaluates throws immediately.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Guard browser APIs inside useEffect in a Client Component, or check typeof window !== 'undefined' only in client code paths.</li>
              <li>Use next/dynamic with ssr: false for a third-party widget that requires window at import time.</li>
              <li>Never read localStorage in a Server Component; read cookies via cookies() on the server (async in Next 15+).</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — imported by a Server Component
const theme = window.localStorage.getItem('theme');

// FIXED — client-only leaf
'use client';
import { useEffect, useState } from 'react';
export default function ThemeBadge() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    setTheme(window.localStorage.getItem('theme') ?? 'light');
  }, []);
  return <span>{theme}</span>;
}

// Or dynamic import with ssr: false for legacy SDKs
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('./Map'), { ssr: false });`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Hydration mismatch from Date.now() or Math.random()
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Console floods with hydration failed: text content did not match.
              Users see a flicker and React re-renders the subtree. The footer
              showed different timestamps on server HTML vs client first paint.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Client Components still pre-render on the server for the initial
              HTML. Non-deterministic values differ between that pass and the
              browser hydration pass, so React detects a mismatch.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Render a stable placeholder on the server; set time or random ID in useEffect after mount.</li>
              <li>Pass a server-generated timestamp from a Server Component as a prop if it must match initial HTML.</li>
              <li>Use suppressHydrationWarning only for known-safe drift like locale formatting, not as a default fix.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — 'use client' component
export default function Footer() {
  return <p>Loaded at {Date.now()}</p>;
}

// FIXED
'use client';
import { useEffect, useState } from 'react';
export default function Footer({ serverTime }) {
  const [clientTime, setClientTime] = useState(serverTime);
  useEffect(() => setClientTime(Date.now()), []);
  return <p>Loaded at {clientTime}</p>;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Entire page marked use client — huge bundle, slow TTFB
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Lighthouse shows a 400 KB+ JS bundle on a mostly static marketing
              page. TTFB improved locally but production TTFB regressed because
              data fetching moved into useEffect and the HTML shell is empty
              until JS runs.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              The use client directive at page root pulls the whole tree into
              the client graph. One small hook at the top forces all imports
              below to ship to the browser and forbids async server data in that
              file.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Remove use client from page.js; fetch in an async Server Component.</li>
              <li>Push use client to the smallest interactive island (carousel, modal, chart).</li>
              <li>Measure with @next/bundle-analyzer and confirm server HTML includes primary content for SEO.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — app/pricing/page.js
'use client';
import { useEffect, useState } from 'react';
export default function Pricing() {
  const [plans, setPlans] = useState([]);
  useEffect(() => { fetch('/api/plans').then(r => r.json()).then(setPlans); }, []);
  return plans.map(p => <div key={p.id}>{p.name}</div>);
}

// FIXED — server fetch + client island
// app/pricing/page.js
async function getPlans() {
  const res = await fetch('https://api.example.com/plans', { next: { revalidate: 3600 } });
  return res.json();
}
export default async function Pricing() {
  const plans = await getPlans();
  return <PricingTable plans={plans} />;
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Passing a function or Server Component into a Client Component
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Build fails in production: Functions cannot be passed to Client
              Components. The team passed renderHeader as a callback or nested a
              server-only Card inside a client shell.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              The RSC wire format only serializes JSON-like props. Functions,
              classes, and Server Component elements are not serializable across
              the server/client boundary except documented exceptions like
              Server Actions.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Pass children from the server: wrap client shell around server-rendered children in the parent Server Component.</li>
              <li>Replace function props with data + client-side rendering, or use composition with slots as children.</li>
              <li>Use a Server Action reference instead of an inline server closure when the client needs a mutation callback.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN
'use client';
export default function Shell({ renderTitle }) {
  return <header>{renderTitle()}</header>;
}

// FIXED — composition in Server Component parent
// app/page.js (server)
import ClientShell from './ClientShell';
import Title from './Title';
export default function Page() {
  return (
    <ClientShell>
      <Title />
    </ClientShell>
  );
}

// ClientShell.js — 'use client'; accepts { children } only`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Secret env undefined in client or NEXT_PUBLIC_ leak
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Either Stripe calls fail because process.env.STRIPE_SECRET is
              undefined in the browser bundle, or security audit finds the live
              secret embedded in client JS after someone prefixed it with
              NEXT_PUBLIC_.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Next inlines NEXT_PUBLIC_* at build time into client bundles. Only
              those keys exist in the browser. Server-only vars are stripped from
              client code and appear undefined if referenced in a Client
              Component.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Call payment or admin APIs only from Server Components, Server Actions, or Route Handlers.</li>
              <li>Expose publishable keys only via NEXT_PUBLIC_; rotate any leaked secret immediately.</li>
              <li>Use a server proxy route if the browser needs a capability that requires a secret.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — 'use client'
const key = process.env.STRIPE_SECRET; // undefined in browser

// LEAK — NEXT_PUBLIC_STRIPE_SECRET in .env (never do this)

// FIXED — app/api/checkout/route.js (server only)
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);
export async function POST(req) {
  const session = await stripe.checkout.sessions.create({ /* ... */ });
  return Response.json({ url: session.url });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Hydration mismatch only for logged-in users
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Anonymous users see a clean page; authenticated users get hydration
              warnings and a flash from &quot;Guest&quot; to their name. Support
              cannot reproduce in incognito.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Server HTML used cookies() or session in a Server Component while a
              Client Component assumed a default user from client-only storage
              on first paint. In Next 15+, cookies() and headers() are async and
              must be awaited consistently on the server.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Resolve session in the Server Component and pass displayName as a prop to the client header.</li>
              <li>Do not read auth state from localStorage for the initial label if the server already knows the session.</li>
              <li>Align CDN caching: personalized segments may need dynamic rendering or private, no-store fetches.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — client header defaults to Guest while server knew the user
'use client';
export default function UserMenu() {
  const name = typeof window !== 'undefined'
    ? localStorage.getItem('name') ?? 'Guest'
    : 'Guest';
  return <span>{name}</span>;
}

// FIXED — app/layout.js (server)
import { cookies } from 'next/headers';
import UserMenu from './UserMenu';
export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const session = await getSession(cookieStore);
  return (
    <html><body>
      <UserMenu displayName={session?.name ?? 'Guest'} />
      {children}
    </body></html>
  );
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Context provider missing on one route only
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Production error: useCart must be used within CartProvider, but
              only on /checkout/embed which uses a minimal layout without the
              provider wrapper.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Route groups and parallel layouts duplicate layout trees. A
              provider added only to app/(shop)/layout.js does not wrap routes
              under app/(embed)/layout.js unless you hoist providers to root
              layout.js.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Mount global providers in app/layout.js inside a single client Providers.tsx barrel.</li>
              <li>Audit route groups after adding embed or marketing shells.</li>
              <li>For embed-only needs, pass cart state via props or URL instead of assuming a global provider.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// FIXED — app/providers.js
'use client';
import { CartProvider } from './cart-context';
export function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

// app/layout.js
import { Providers } from './providers';
export default function RootLayout({ children }) {
  return (
    <html><body><Providers>{children}</Providers></body></html>
  );
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Node-only library imported into a shared client path
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Client build fails: Module not found: fs, or bcrypt native addon
              cannot run in the browser. A utils.js file mixed password hashing
              with formatPrice used by a Client Component.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Webpack/Turbopack follows imports from Client Components into
              shared modules. Node core modules and native bindings are not
              available in the client graph even if the client only calls the
              safe function.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Split into lib/server/hash.js and lib/formatPrice.js; never import server files from client code.</li>
              <li>Mark server-only modules with the server-only package import at the top.</li>
              <li>Keep hashing inside Server Actions or Route Handlers only.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// lib/password.server.js
import 'server-only';
import bcrypt from 'bcrypt';
export async function hashPassword(pw) {
  return bcrypt.hash(pw, 12);
}

// lib/formatPrice.js — safe for client
export function formatPrice(cents) {
  return (cents / 100).toFixed(2);
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            White flash: Client Component as root layout
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Every navigation shows a blank white frame before content appears.
              Theme and analytics work, but LCP regressed because the entire
              document waits on client hydration.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Root layout.js must emit html and body. Marking it use client forces
              the whole app into a single client boundary, delaying paint and
              blocking server streaming for nested routes.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Keep app/layout.js a Server Component; wrap children with a small Providers client component.</li>
              <li>Load theme class on html via suppressHydrationWarning on html if using next-themes pattern.</li>
              <li>Defer analytics to afterInteractive Script in server layout, not a client root.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — app/layout.js starts with 'use client'

// FIXED
import { Providers } from './providers';
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Inline server closure passed instead of a Server Action
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
              The incident
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              After refactor, production build errors: Functions cannot be passed
              to Client Components. Dev seemed fine until they passed an inline
              async handler from page.js into a client form instead of a
              declared Server Action.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">
              Why it happens
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Serializable props rule: arbitrary closures captured from Server
              Components are not sent to the client. Server Actions are the
              exception — functions marked with use server get a stable action ID
              and secure POST endpoint when referenced from forms or action=
              props.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
              How to fix
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Define actions in a file with use server at top or on each exported async function.</li>
              <li>Pass the imported action reference to the client form action prop, not onSubmit with a server lambda.</li>
              <li>Use bind for partial application only on Server Actions, not generic functions.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — app/page.js (server)
'use client';
import Form from './Form';
export default function Page() {
  async function save(data) { 'use server'; /* wrong placement */ }
  return <Form onSave={async (fd) => updateUser(fd)} />;
}

// FIXED — app/actions.js
'use server';
export async function updateUser(formData) {
  const name = formData.get('name');
  await db.user.update({ data: { name } });
}

// Form.js — 'use client'
import { updateUser } from '../actions';
export default function Form() {
  return <form action={updateUser}><input name="name" /><button>Save</button></form>;
}`}
          />
        </section>

        <div className="flex justify-end border-t pt-8">
          <Link
            href="/learn/app-router/b15/lesson-2"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Routing Incidents →
          </Link>
        </div>
      </div>
    </div>
  );
}
