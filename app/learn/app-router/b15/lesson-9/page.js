import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.9: Styling Incidents (B9)",
  description:
    "Production styling incidents: global CSS rules, Tailwind purge, CSS-in-JS with RSC, dark mode hydration, and CSS load order in App Router",
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

export default function Lesson9Page() {
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
          B15.9: Styling Incidents (B9)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          FOUC, missing Tailwind utilities in production, CSS-in-JS on Server
          Components, and theme flashes after navigation.
        </p>
      </div>

      <div className="space-y-6">
        <IncidentScenario
          number={1}
          level="Junior"
          title="Global CSS imported in a page file"
          incident="Build fails after a developer imports globals.css into a dashboard page to tweak one utility. Error states global CSS must be imported from the root layout only."
          why="Next.js treats global styles as application-wide side effects. Allowing them in arbitrary modules would duplicate CSS and break ordering guarantees, so only the root layout may import globals."
          fixSteps={[
            "Keep a single import of globals.css in app/layout.js.",
            "Use CSS Modules or Tailwind for page-scoped styling.",
            "Move shared variables to globals or design tokens once in the root.",
          ]}
          code={`// app/layout.js
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/dashboard/page.js — do not import globals.css here
import styles from './dashboard.module.css';

export default function DashboardPage() {
  return <main className={styles.wrap}>Dashboard</main>;
}`}
        />

        <IncidentScenario
          number={2}
          level="Junior"
          title="CSS Module class name undefined"
          incident="Buttons render unstyled in production. styles.button is undefined because the module file exports btn while JSX still references button."
          why="CSS Modules expose camelCase keys derived from class names in the file. A typo or rename in either JSX or the module breaks the className chain silently."
          fixSteps={[
            "Match JSX keys to the exact exported class names in the module.",
            "Use consistent naming between design tokens and module classes.",
            "Enable TypeScript typed modules or lint rules for unknown class keys.",
          ]}
          code={`// Button.module.css
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

// Button.js
import styles from './Button.module.css';

export function Button({ children }) {
  return <button type="button" className={styles.btn}>{children}</button>;
}`}
        />

        <IncidentScenario
          number={3}
          level="Mid"
          title="Dynamic Tailwind classes purged in production"
          incident="CMS-driven badge colors work in dev but badges are unstyled in prod. Classes like bg-red-500 were built from a string prefix plus color name from JSON."
          why="Tailwind scans source for complete class strings at build time. Dynamically concatenated utilities never appear as literals, so the compiler purges them from the CSS bundle."
          fixSteps={[
            "Map CMS values to full class names in a lookup object.",
            "Use safelist in Tailwind config only for known dynamic tokens.",
            "Avoid building utility names with string concatenation.",
          ]}
          code={`const colorClass = {
  red: 'bg-red-100 text-red-800',
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
};

export function StatusBadge({ tone, label }) {
  return (
    <span className={'rounded px-2 py-0.5 text-xs ' + (colorClass[tone] ?? colorClass.blue)}>
      {label}
    </span>
  );
}`}
        />

        <IncidentScenario
          number={4}
          level="Mid"
          title="styled-components in a Server Component"
          incident="Build error after dropping a styled Card into app/page.js without use client. Message mentions createContext or styled is not supported in Server Components."
          why="Traditional css-in-js libraries inject styles at runtime and rely on React context. Server Components cannot use those client runtime APIs during RSC render."
          fixSteps={[
            "Mark styled UI files with use client and import them from server pages.",
            "Prefer CSS Modules, Tailwind, or RSC-friendly styling for server trees.",
            "Use a registry pattern only where the library documents App Router support.",
          ]}
          code={`// app/page.js — Server Component
import { PromoCard } from './PromoCard';

export default function HomePage() {
  return <PromoCard title="Hello" />;
}

// app/PromoCard.js
'use client';

import styled from 'styled-components';

const Card = styled.div(
  'padding:1rem;border-radius:8px;'
);

export function PromoCard({ title }) {
  return <Card>{title}</Card>;
}`}
        />

        <IncidentScenario
          number={5}
          level="Mid"
          title="FOUC from runtime CSS-in-JS"
          incident="First paint shows unstyled content for half a second, then styled-components rules appear. Marketing complains the hero flash hurts brand perception."
          why="Runtime css-in-js often inserts style tags after JavaScript executes. Until hydration, HTML renders without those rules, causing a flash of unstyled content."
          fixSteps={[
            "Use static extraction or zero-runtime CSS for above-the-fold UI.",
            "Migrate critical hero styles to CSS Modules or Tailwind in the server layout.",
            "If staying on css-in-js, follow vendor SSR and registry setup for App Router.",
          ]}
          code={`// Prefer zero-runtime for hero — app/page.js
import styles from './hero.module.css';

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Acme</h1>
    </section>
  );
}

// hero.module.css
.hero { min-height: 60vh; background: #0f172a; }
.title { color: white; font-size: 3rem; }`}
        />

        <IncidentScenario
          number={6}
          level="Mid"
          title="Dark mode hydration mismatch"
          incident="Console warns hydration failed because initial UI did not match. Server HTML uses light theme while client reads dark from localStorage on first paint."
          why="Server render cannot access localStorage. If the client toggles class on html before hydration matches server output, React detects attribute mismatches."
          fixSteps={[
            "Store theme preference in a cookie readable by the server root layout.",
            "Apply className dark on html in layout from cookie, not only after mount.",
            "Use suppressHydrationWarning on html only as a last resort for known theme attrs.",
          ]}
          code={`// app/layout.js
import { cookies } from 'next/headers';

export default async function RootLayout({ children }) {
  const theme = cookies().get('theme')?.value === 'dark' ? 'dark' : 'light';
  return (
    <html lang="en" className={theme}>
      <body>{children}</body>
    </html>
  );
}

// ThemeToggle client writes cookie + router.refresh()`}
        />

        <IncidentScenario
          number={7}
          level="Senior"
          title="Route group layout CSS overrides design system"
          incident="After visiting admin routes, marketing pages pick up compact table styles and broken spacing. Bug only appears after client navigation, not on hard refresh to home."
          why="Global CSS imported in a nested layout loads once and stays in the document for the session. Route groups do not unload stylesheet side effects when leaving the segment."
          fixSteps={[
            "Scope admin overrides with CSS Modules or a dedicated prefix wrapper class.",
            "Avoid global element selectors in segment layouts.",
            "Audit imports in route group layout.js files for leaky resets.",
          ]}
          code={`// app/(admin)/admin/layout.js — leaky
// import './admin-globals.css'; // contains table { font-size: 12px; }

import styles from './admin-shell.module.css';

export default function AdminLayout({ children }) {
  return <div className={styles.adminRoot}>{children}</div>;
}

// admin-shell.module.css
.adminRoot :global(table) {
  font-size: 0.875rem;
}`}
        />

        <IncidentScenario
          number={8}
          level="Mid"
          title="Sass import breaks CI on node-sass"
          incident="Pipeline fails compiling SCSS while laptops build fine. Error references node-sass binary mismatch; dart sass works when swapped locally."
          why="node-sass is deprecated and ties to native bindings per Node version. Next expects the sass package for .scss imports in App Router projects."
          fixSteps={[
            "Remove node-sass; add sass as devDependency.",
            "Import partials with @use instead of legacy @import paths.",
            "Pin Node version in CI to match production builders.",
          ]}
          code={`// package.json — use dart sass
// "devDependencies": { "sass": "^1.77.0" }

// styles/_tokens.scss
$brand: #2563eb;

// app/globals.scss
@use './styles/tokens' as *;

.btn-primary {
  background: $brand;
}`}
        />

        <IncidentScenario
          number={9}
          level="Junior"
          title="CSS Module :global leaks to other pages"
          incident="Checkout buttons lose padding site-wide after a module added :global(.btn) to reuse a utility. Unrelated product pages inherit the global selector."
          why="The global pseudo in CSS Modules emits unscoped rules into the shared stylesheet. Any matching class name anywhere in the app receives those styles."
          fixSteps={[
            "Prefer explicit module classes over global overrides.",
            "Namespace global selectors under a layout wrapper class.",
            "Move shared button styles to globals or a design system package intentionally.",
          ]}
          code={`// Bad in Checkout.module.css
// :global(.btn) { padding: 0; }

.checkoutBtn {
  composes: btn from global;
  width: 100%;
}

// Better — checkout.module.css
.primaryAction {
  padding: 0.75rem 1rem;
  width: 100%;
}`}
        />

        <IncidentScenario
          number={10}
          level="Senior"
          title="Marketing page broken without JavaScript"
          incident="Compliance scan shows pricing layout collapsed when JS is disabled. All spacing came from emotion styles injected only after client bundle runs."
          why="Client-only style injection means non-JS users and slow networks see semantic HTML without layout CSS. Critical content must not depend on hydration for base styling."
          fixSteps={[
            "Ship base layout CSS via Server Component imports or static CSS files.",
            "Treat css-in-js as enhancement, not the only source of layout rules.",
            "Test with JS disabled and with throttled network before launch.",
          ]}
          code={`// app/pricing/page.js — server-safe base styles
import styles from './pricing.module.css';

export default function PricingPage() {
  return (
    <section className={styles.grid}>
      <article className={styles.plan}>
        <h2>Starter</h2>
        <p className={styles.price}>$9</p>
      </article>
    </section>
  );
}

// Optional client enhancement layered on top
// import { AnimatedPrice } from './AnimatedPrice';`}
        />

        <IncidentScenario
          number={11}
          level="Mid"
          title="Tailwind v4 content paths omit app directory"
          incident="Almost no utility classes apply after migrating to Tailwind v4. Only a few legacy classes from an old pages folder remain in the CSS output."
          why="Tailwind generates utilities by scanning configured source globs. If app/** or new src paths are missing from content or source config, most class names never enter the bundle."
          fixSteps={[
            "Verify @source or content globs include app, components, and lib directories.",
            "Restart dev server after config changes and inspect output CSS size.",
            "Search production CSS for a known utility to confirm scanning works.",
          ]}
          code={`// tailwind.config.js (v3 style) or @config for v4
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

// Tailwind v4 in CSS — ensure sources cover app/
// @import 'tailwindcss';
// @source '../app/**/*.{js,ts,jsx,tsx}';`}
        />

        <IncidentScenario
          number={12}
          level="Senior"
          title="Design tokens set on body after paint"
          incident="Rebrand colors flash default blue for one frame before client theme provider applies CSS variables on body. VIP demo catches the glitch on slow devices."
          why="Client Components that set variables after useEffect run cannot affect the first server-rendered paint. Variables must exist on html or body during server render."
          fixSteps={[
            "Define token CSS variables in root layout stylesheet from server-readable theme.",
            "Read theme cookie in layout and emit inline style or class on html.",
            "Avoid setting brand variables only inside client providers after mount.",
          ]}
          code={`// app/layout.js
import { cookies } from 'next/headers';
import './tokens.css';

export default async function RootLayout({ children }) {
  const brand = cookies().get('brand')?.value ?? 'default';
  return (
    <html lang="en" data-brand={brand}>
      <body>{children}</body>
    </html>
  );
}

// app/tokens.css
html[data-brand='default'] {
  --color-primary: #2563eb;
}
html[data-brand='partner'] {
  --color-primary: #059669;
}`}
        />

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b15/lesson-8"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B15.8 Image, Script & Font
          </Link>
          <Link
            href="/learn/app-router/b15/lesson-10"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B15.10 Advanced Features →
          </Link>
        </div>
      </div>
    </div>
  );
}
