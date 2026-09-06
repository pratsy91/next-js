import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.6: Navigation - Most Asked Interview Q&A",
  description:
    "Most asked Next.js interview questions on navigation: Link, next/navigation, prefetching, redirect, URL state, and soft navigation",
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

export default function Lesson6Page() {
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
          B14.6: Navigation (B6)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Most asked interview questions on App Router navigation — Link,
          hooks, prefetching, redirects, and URL-as-state patterns.
        </p>
      </div>

      <div className="space-y-6">
        {/* Q1 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              1. What is the difference between Link and a regular &lt;a&gt; tag?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Link
            </code>{" "}
            from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/link
            </code>{" "}
            performs client-side navigation (soft navigation) without a full page
            reload. It prefetches routes in the viewport, preserves React state
            in shared layouts, and enables instant transitions. A plain{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              &lt;a&gt;
            </code>{" "}
            triggers a full document reload, losing client state and re-downloading
            all assets.
          </p>
          <CodeBlock
            code={`import Link from 'next/link';

// Client-side navigation — preferred for internal routes
<Link href="/dashboard">Dashboard</Link>

// Full page reload — use only for external URLs or downloads
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site
</a>

// Link renders an <a> under the hood — still accessible & SEO-friendly
<Link href="/about" className="text-blue-600">
  About
</Link>`}
            language="javascript"
          />
        </section>

        {/* Q2 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              2. How does Link prefetching work?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            By default,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Link
            </code>{" "}
            prefetches the linked route&apos;s React Server Component payload
            when the link enters the viewport (production only). Prefetching
            downloads the RSC flight data into the client cache so navigation
            feels instant. Static routes prefetch fully; dynamic routes prefetch
            partially (down to the nearest loading boundary).
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Disable with{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              prefetch={false}
            </code>{" "}
            for rarely visited or auth-gated routes. Prefetch respects the
            network — it is skipped on slow connections or when data saver is
            enabled.
          </p>
          <CodeBlock
            code={`import Link from 'next/link';

// Default: prefetches when in viewport
<Link href="/products">Products</Link>

// Disable prefetch for admin/settings pages
<Link href="/admin" prefetch={false}>Admin</Link>

// Prefetch still works with dynamic segments
<Link href="/users/123">User Profile</Link>`}
            language="javascript"
          />
        </section>

        {/* Q3 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              3. useRouter from next/navigation vs next/router?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router uses{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useRouter
            </code>{" "}
            from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/navigation
            </code>
            . Pages Router uses{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/router
            </code>
            . They are incompatible — mixing them causes errors.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router&apos;s router has a smaller API:{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              push
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              replace
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              refresh
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              back
            </code>
            ,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              forward
            </code>
            . It removed{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.query
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.pathname
            </code>{" "}
            — use dedicated hooks instead.
          </p>
          <CodeBlock
            code={`// App Router — next/navigation
'use client';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const router = useRouter();
  router.push('/dashboard');
  router.replace('/login');
  router.refresh(); // re-fetch server data, keep client state
  router.back();
}

// Pages Router — next/router (DO NOT use in App Router)
// import { useRouter } from 'next/router';
// router.query, router.pathname, router.events — not available in App Router`}
            language="javascript"
          />
        </section>

        {/* Q4 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              4. How do usePathname and useSearchParams work? Why Suspense?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              usePathname()
            </code>{" "}
            returns the current URL path.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useSearchParams()
            </code>{" "}
            returns a read-only URLSearchParams for query strings. Both require
            Client Components.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            During static rendering,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useSearchParams
            </code>{" "}
            causes the component to bail out to client rendering. Wrap it in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              Suspense
            </code>{" "}
            to show a fallback during static generation and avoid de-opting the
            entire page.
          </p>
          <CodeBlock
            code={`// app/components/SearchFilters.js
'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function FiltersInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') ?? 'newest';
  const category = searchParams.get('category');

  return (
    <p>
      Path: {pathname} | Sort: {sort} | Category: {category}
    </p>
  );
}

export default function SearchFilters() {
  return (
    <Suspense fallback={<p>Loading filters...</p>}>
      <FiltersInner />
    </Suspense>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q5 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              5. redirect() vs router.push() — when to use each?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              redirect()
            </code>{" "}
            from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              next/navigation
            </code>{" "}
            is for Server Components, Server Actions, and Route Handlers. It
            throws internally and sends an HTTP redirect (307 temporary, or use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              permanentRedirect
            </code>{" "}
            for 308).
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.push()
            </code>{" "}
            is client-side only — use after user interactions (button clicks,
            form success) without a full server round-trip.
          </p>
          <CodeBlock
            code={`// Server Component — redirect before render
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');
  return <Dashboard user={session.user} />;
}

// Client Component — after user action
'use client';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  async function handleSubmit() {
    await login();
    router.push('/dashboard'); // client navigation after success
  }
  // ...
}`}
            language="javascript"
          />
        </section>

        {/* Q6 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              6. What is the difference between client-side and server-side navigation?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Client-side navigation</strong> (Link, router.push) swaps
            page content via the RSC protocol without reloading the document.
            Shared layouts persist, client state in sibling components survives,
            and only changed segments re-fetch.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Server-side navigation</strong> (redirect, full page load,
            form GET submit) triggers a new HTTP request. The server renders
            fresh HTML/RSC payload. Use server redirects for auth guards; use
            client navigation for in-app UX.
          </p>
          <CodeBlock
            code={`// Soft navigation — layout stays mounted, only page segment updates
<Link href="/settings">Settings</Link>

// Hard navigation — full reload (avoid for internal routes)
<a href="/settings">Settings</a>

// Server redirect — HTTP 307, browser makes new request
redirect('/login');`}
            language="javascript"
          />
        </section>

        {/* Q7 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              7. Is there a shallow routing equivalent in App Router?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Pages Router&apos;s{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              shallow: true
            </code>{" "}
            updated the URL without re-running data fetching. App Router has no
            direct equivalent — changing search params or pathname always
            triggers a navigation and re-renders affected Server Components.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Workarounds: keep filter state in client state (useState) and sync to
            URL optionally; use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              window.history.replaceState
            </code>{" "}
            for cosmetic URL updates without navigation; or accept the re-fetch
            and optimize with caching tags.
          </p>
          <CodeBlock
            code={`// Update URL without triggering Next.js navigation
'use client';
import { useEffect, useState } from 'react';

export default function Tabs() {
  const [tab, setTab] = useState('overview');

  function selectTab(id) {
    setTab(id);
    window.history.replaceState(null, '', \`?tab=\${id}\`);
  }

  return (
    <div>
      <button onClick={() => selectTab('overview')}>Overview</button>
      <button onClick={() => selectTab('settings')}>Settings</button>
      {tab === 'overview' && <OverviewPanel />}
      {tab === 'settings' && <SettingsPanel />}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q8 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              8. How do you manage filters and pagination via searchParams?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Treat the URL as the source of truth. Server Components receive{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              searchParams
            </code>{" "}
            as a prop; client components update via{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.push
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useRouter
            </code>{" "}
            with new query strings. This makes filters shareable and
            bookmarkable.
          </p>
          <CodeBlock
            code={`// app/products/page.js — Server Component reads searchParams
export default async function ProductsPage({ searchParams }) {
  const { sort = 'newest', page = '1', category } = await searchParams;
  const products = await getProducts({ sort, page: Number(page), category });
  return <ProductList products={products} />;
}

// Client filter control
'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setSort(sort) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    params.delete('page'); // reset pagination on filter change
    router.push(\`\${pathname}?\${params.toString()}\`);
  }

  return (
    <select onChange={(e) => setSort(e.target.value)} defaultValue="newest">
      <option value="newest">Newest</option>
      <option value="price">Price</option>
    </select>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q9 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              9. What does router.refresh() do?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.refresh()
            </code>{" "}
            re-fetches the current route&apos;s Server Component tree from the
            server without losing client-side React state (unlike a full reload).
            Use it after mutations when you need fresh server data but want to
            stay on the same page.
          </p>
          <CodeBlock
            code={`'use client';
import { useRouter } from 'next/navigation';

export default function RefreshButton() {
  const router = useRouter();

  async function handleUpdate() {
    await fetch('/api/settings', { method: 'POST', body: JSON.stringify(data) });
    router.refresh(); // re-render Server Components with new data
  }

  return <button onClick={handleUpdate}>Save & Refresh</button>;
}

// Often unnecessary if you use revalidatePath/revalidateTag in Server Actions`}
            language="javascript"
          />
        </section>

        {/* Q10 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              10. How do you prevent navigation with unsaved changes?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            App Router removed{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.events
            </code>
            . Use the browser{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              beforeunload
            </code>{" "}
            event for tab close/refresh, and intercept Link clicks / router
            navigation with a custom confirmation dialog for in-app navigation.
          </p>
          <CodeBlock
            code={`'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditForm() {
  const [isDirty, setIsDirty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleBeforeUnload(e) {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  function navigateSafely(href) {
    if (isDirty && !confirm('You have unsaved changes. Leave anyway?')) return;
    router.push(href);
  }

  return (
    <form onChange={() => setIsDirty(true)}>
      {/* fields */}
      <button type="button" onClick={() => navigateSafely('/dashboard')}>
        Cancel
      </button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q11 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              11. What are common programmatic navigation patterns?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.push('/path')
            </code>{" "}
            after async operations,{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              router.replace('/path')
            </code>{" "}
            when you don&apos;t want back-button return (login → dashboard),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              redirect('/path')
            </code>{" "}
            in Server Components for auth guards, and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              notFound()
            </code>{" "}
            when a resource doesn&apos;t exist.
          </p>
          <CodeBlock
            code={`import { redirect, notFound, permanentRedirect } from 'next/navigation';

// Auth guard in Server Component
export default async function Page({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();
  if (!post.published) redirect('/drafts');
  return <Article post={post} />;
}

// Permanent redirect for moved content (308)
export default function OldPage() {
  permanentRedirect('/new-url');
}

// Client: conditional navigation
'use client';
function CheckoutButton({ cartEmpty }) {
  const router = useRouter();
  return (
    <button onClick={() => {
      if (cartEmpty) router.push('/cart');
      else router.push('/checkout');
    }}>
      Continue
    </button>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Q12 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              12. When should you set prefetch={false}?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Disable prefetch when the linked page is expensive, user-specific,
            rarely visited, or would trigger unnecessary server load. Common
            cases: admin panels, logout links, pages behind auth, large dynamic
            dashboards, and links with many instances on one page (e.g., 100
            product links where prefetching all would be wasteful).
          </p>
          <CodeBlock
            code={`// Admin — only visited by few users
<Link href="/admin/users" prefetch={false}>Manage Users</Link>

// Auth-gated — prefetch would hit server unnecessarily
<Link href="/account/billing" prefetch={false}>Billing</Link>

// Many links on one page — prefetch only on hover pattern
<Link href={\`/posts/\${post.id}\`} prefetch={false}>
  {post.title}
</Link>`}
            language="javascript"
          />
        </section>

        {/* Q13 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              13. How does navigation work with parallel routes?
            </h2>
            <LevelBadge level="Senior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Parallel routes use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              @slot
            </code>{" "}
            folders. Navigation updates all active slots simultaneously. Use{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              default.js
            </code>{" "}
            fallbacks for unmatched slots. Soft navigation preserves slot state
            when the URL matches slot patterns; intercepting routes can show
            modals while updating the URL.
          </p>
          <CodeBlock
            code={`// app/dashboard/layout.js
export default function Layout({ children, analytics, team }) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-2">
        {analytics}
        {team}
      </div>
    </div>
  );
}

// Navigate to /dashboard — both @analytics and @team update
<Link href="/dashboard/reports">Reports</Link>

// Intercepting route: app/dashboard/@modal/(.)photos/[id]/page.js
// Shows photo modal on soft nav, full page on hard refresh`}
            language="javascript"
          />
        </section>

        {/* Q14 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              14. router.push() vs router.replace() — history stack behavior?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              push
            </code>{" "}
            adds a new entry to the browser history stack — the back button
            returns to the previous page.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              replace
            </code>{" "}
            swaps the current entry — back skips the replaced page.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Use replace after login (don&apos;t return to login on back), after
            form submission success, or when correcting URL params. Use push for
            normal forward navigation.
          </p>
          <CodeBlock
            code={`'use client';
import { useRouter } from 'next/navigation';

// After login — don't let user go "back" to login page
router.replace('/dashboard');

// Normal navigation — user can go back
router.push('/products/123');

// Updating filters — replace avoids cluttering history
const params = new URLSearchParams(searchParams);
params.set('page', '2');
router.replace(\`\${pathname}?\${params}\`);`}
            language="javascript"
          />
        </section>

        {/* Q15 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              15. How does useParams work in Client Components?
            </h2>
            <LevelBadge level="Junior" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useParams()
            </code>{" "}
            returns dynamic route parameters in Client Components — the client
            equivalent of the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              params
            </code>{" "}
            prop in Server Components. For a route{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              /blog/[slug]
            </code>
            , it returns{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              {`{ slug: 'hello-world' }`}
            </code>
            .
          </p>
          <CodeBlock
            code={`// app/blog/[slug]/CommentForm.js
'use client';
import { useParams } from 'next/navigation';

export default function CommentForm() {
  const { slug } = useParams();

  async function submitComment(text) {
    await fetch(\`/api/posts/\${slug}/comments\`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  return <form action={submitComment}>{/* ... */}</form>;
}`}
            language="javascript"
          />
        </section>

        {/* Q16 */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              16. What is soft navigation and why does it matter for UX?
            </h2>
            <LevelBadge level="Mid" />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Soft navigation updates only the changed route segments via the RSC
            flight protocol. Shared layouts (nav, sidebar) stay mounted — no
            flicker, no re-initialization of client providers. The browser URL
            updates, but the document, CSS, and JS bundle are not reloaded.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            This enables SPA-like speed with server-rendered content. Interview
            tip: mention that loading.js shows instant feedback during soft nav
            while server data fetches, and that prefetching makes subsequent
            navigations near-instant.
          </p>
          <CodeBlock
            code={`// User clicks Link to /dashboard/analytics
// 1. Next.js checks prefetch cache
// 2. If miss, fetches RSC payload for changed segments
// 3. Root layout + dashboard layout stay mounted
// 4. Only analytics page segment swaps in
// 5. loading.js shows skeleton during fetch

// app/dashboard/layout.js — persists across /dashboard/* navigations
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar /> {/* stays mounted */}
      <main>{children}</main> {/* only this swaps */}
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b14/lesson-5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B14.5 Route Handlers
          </Link>
          <Link
            href="/learn/app-router/b14/lesson-7"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B14.7 Metadata API →
          </Link>
        </div>
      </div>
    </div>
  );
}
