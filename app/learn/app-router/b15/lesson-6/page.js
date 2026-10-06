import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.6: Navigation Incidents (B6)",
  description:
    "Production App Router navigation incidents: Link vs anchor, next/navigation, Suspense, stale cache, prefetch storms, and URL state",
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

export default function Lesson6Page() {
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
          B15.6: Navigation Incidents (B6)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Real production navigation failures in the App Router: soft navigation,
          router cache, search params, prefetch load, and post-login redirects.
        </p>
      </div>

      <div className="space-y-6">
        <IncidentScenario
          number={1}
          level="Junior"
          title="Internal links use plain anchor tags"
          incident="Every sidebar click triggers a white flash, the SPA cart count resets to zero, and React Query caches are wiped. Support tickets mention the app feels slower after a redesign that swapped Link for anchor tags."
          why="A native anchor performs a full document navigation. The browser tears down the JavaScript runtime, refetches HTML and bundles, and remounts the tree. App Router client state and in-memory caches do not survive that reload."
          fixSteps={[
            "Replace internal hrefs with next/link Link components.",
            "Keep plain anchors only for external URLs, mailto, and file downloads.",
            "Verify shared layouts still mount once when navigating between sibling routes.",
          ]}
          code={`import Link from 'next/link';

// Before: full reload, loses client state
// <a href="/dashboard">Dashboard</a>

export function SidebarNav() {
  return (
    <nav>
      <Link href="/dashboard" className="nav-item">
        Dashboard
      </Link>
      <Link href="/orders">Orders</Link>
    </nav>
  );
}`}
        />

        <IncidentScenario
          number={2}
          level="Junior"
          title="useRouter imported from next/router"
          incident="After migrating from the Pages Router, programmatic navigation from a settings form does nothing in production. Locally it sometimes throws that NextRouter was not mounted. The team copied hooks from legacy pages."
          why="next/router targets the Pages Router. App Router client components must use next/navigation. The legacy router is not wired into the app/ tree, so push and replace are no-ops or error at runtime."
          fixSteps={[
            "Import useRouter, usePathname, and useSearchParams from next/navigation.",
            "Remove next/router imports from app directory code.",
            "Use router.push, router.replace, and router.refresh from the App Router API.",
          ]}
          code={`'use client';

// Wrong: import { useRouter } from 'next/router';

import { useRouter } from 'next/navigation';

export function SaveAndGo({ id }) {
  const router = useRouter();

  async function onSaved() {
    router.push('/projects/' + id);
  }

  return <button type="button" onClick={onSaved}>Save</button>;
}`}
        />

        <IncidentScenario
          number={3}
          level="Mid"
          title="useSearchParams without Suspense"
          incident="The filters page builds fine in dev but fails in CI with an error that useSearchParams should be wrapped in a Suspense boundary. Production deploy is blocked on a one-line hook in the page file."
          why="Reading search params can defer rendering until the request URL is known. Next.js requires a Suspense boundary so static shells can stream while the client hook resolves, avoiding build-time static generation errors."
          fixSteps={[
            "Move useSearchParams into a small client child component.",
            "Wrap that child in Suspense with a skeleton fallback in the page or layout.",
            "Keep data fetching in Server Components; pass parsed filters as props when possible.",
          ]}
          code={`// app/products/page.js
import { Suspense } from 'react';
import ProductFilters from './ProductFilters';

export default function ProductsPage() {
  return (
    <Suspense fallback={<p>Loading filters…</p>}>
      <ProductFilters />
    </Suspense>
  );
}

// app/products/ProductFilters.js
'use client';

import { useSearchParams } from 'next/navigation';

export default function ProductFilters() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  return <input defaultValue={q} name="q" />;
}`}
        />

        <IncidentScenario
          number={4}
          level="Mid"
          title="List unchanged after Server Action delete"
          incident="Deleting a row shows a toast success message but the deleted item remains in the table until the user hard-refreshes. QA reproduces on staging with Server Actions only, no client fetch."
          why="Mutations do not automatically invalidate the Router Cache or Data Cache entries for the current segment. The client still renders the last RSC payload for that route until something revalidates server data or triggers a refresh."
          fixSteps={[
            "Call revalidatePath or revalidateTag inside the Server Action after the DB delete.",
            "From the client, call router.refresh after the action resolves to refetch RSC for the current route.",
            "Use both when the list is cached aggressively or tagged fetches are involved.",
          ]}
          code={`'use client';

import { useRouter } from 'next/navigation';
import { deleteItem } from './actions';

export function DeleteButton({ id }) {
  const router = useRouter();

  async function handleDelete() {
    await deleteItem(id);
    router.refresh();
  }

  return <button type="button" onClick={handleDelete}>Delete</button>;
}

// actions.js
'use server';

import { revalidatePath } from 'next/cache';

export async function deleteItem(id) {
  await db.item.delete({ where: { id } });
  revalidatePath('/items');
}`}
        />

        <IncidentScenario
          number={5}
          level="Mid"
          title="Filters live only in useState"
          incident="Users share filtered catalog URLs but recipients see the unfiltered view. Refreshing the page also clears sort and category chips even though the UI looked correct before reload."
          why="Client component state is not encoded in the URL. App Router can restore UI from searchParams on the server and on navigation, but useState defaults reinitialize on every full load."
          fixSteps={[
            "Drive filter values from searchParams via useSearchParams or server page props.",
            "Update the URL with router.push or Link href including query strings when filters change.",
            "Use replace when you do not want extra history entries for every keystroke debounce.",
          ]}
          code={`'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? 'all';

  function setCategory(next) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', next);
    router.replace(pathname + '?' + params.toString());
  }

  return (
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="all">All</option>
      <option value="sale">Sale</option>
    </select>
  );
}`}
        />

        <IncidentScenario
          number={6}
          level="Mid"
          title="router.push inside useEffect loop"
          incident="Safari tabs freeze and the address bar flickers between two routes. Sentry shows thousands of navigations per minute from a single mount after an auth guard was added."
          why="Calling push or replace during render or in an effect without stable dependencies re-triggers navigation on every commit. Each navigation re-renders the component, which schedules another push, creating an infinite loop."
          fixSteps={[
            "Navigate in event handlers or one-time effects with explicit dependency arrays.",
            "Compare pathname or searchParams before pushing to avoid redundant navigations.",
            "Prefer redirect in middleware or Server Components for auth gates instead of client loops.",
          ]}
          code={`'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AuthGate({ isLoggedIn, children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn && pathname !== '/login') {
      router.replace('/login?next=' + encodeURIComponent(pathname));
    }
  }, [isLoggedIn, pathname, router]);

  if (!isLoggedIn) return null;
  return children;
}`}
        />

        <IncidentScenario
          number={7}
          level="Senior"
          title="Prefetch storm on large data tables"
          incident="After shipping an admin table with five hundred row links, origin CPU and RSC flight traffic spike 10x. CloudWatch shows prefetch requests for routes the user never opens."
          why="Link prefetches eligible routes when links enter the viewport. Hundreds of visible rows mean hundreds of parallel prefetches, each hitting the server for partial RSC payloads."
          fixSteps={[
            "Set prefetch to false on low-priority or rarely visited row links.",
            "Keep prefetch enabled on primary nav and high-conversion paths only.",
            "Paginate or virtualize tables so fewer links are in the viewport at once.",
          ]}
          code={`import Link from 'next/link';

export function OrderRow({ order }) {
  return (
    <tr>
      <td>{order.id}</td>
      <td>
        <Link href={'/admin/orders/' + order.id} prefetch={false}>
          View
        </Link>
      </td>
    </tr>
  );
}

// High-traffic nav — default prefetch stays on
<Link href="/admin">Admin home</Link>`}
        />

        <IncidentScenario
          number={8}
          level="Senior"
          title="router.refresh still shows stale fetch data"
          incident="Support toggles a feature flag in the database and calls router.refresh from the admin UI. Layout text updates but KPI numbers from fetch inside the page stay wrong until a hard refresh."
          why="router.refresh re-fetches the React Server Component tree for the current route, but fetch responses cached in the Data Cache can still be reused unless their tags or paths were revalidated. RSC shell updates while embedded cached data does not."
          fixSteps={[
            "Tag fetches with next tags and call revalidateTag in the mutation or webhook.",
            "Use cache no-store or revalidate zero for highly dynamic metrics when appropriate.",
            "Pair router.refresh on the client with revalidatePath or revalidateTag on the server action.",
          ]}
          code={`// lib/metrics.js
export async function getKpis() {
  const res = await fetch(process.env.API_URL + '/kpis', {
    next: { tags: ['kpis'] },
  });
  return res.json();
}

// actions.js
'use server';

import { revalidateTag } from 'next/cache';

export async function refreshKpis() {
  revalidateTag('kpis');
}

// client
'use client';
import { useRouter } from 'next/navigation';
import { refreshKpis } from './actions';

export function RefreshKpisButton() {
  const router = useRouter();
  async function onRefresh() {
    await refreshKpis();
    router.refresh();
  }
  return <button type="button" onClick={onRefresh}>Refresh KPIs</button>;
}`}
        />

        <IncidentScenario
          number={9}
          level="Mid"
          title="redirect called from a Client Component"
          incident="Clicking checkout redirect throws that redirect is not allowed in client components. The developer copied a server helper into a use client file."
          why="redirect from next/navigation throws a special error consumed by the server rendering pipeline. Client components cannot throw that navigation signal; they must use imperative router APIs or receive a redirect from the server."
          fixSteps={[
            "Use redirect only in Server Components, Server Actions, and Route Handlers.",
            "On the client, use router.replace for post-login or guard redirects.",
            "Return a flag from a Server Action and navigate client-side when needed.",
          ]}
          code={`// Server Component or Server Action — OK
import { redirect } from 'next/navigation';

export async function checkoutAction(formData) {
  const ok = await charge(formData);
  if (!ok) redirect('/checkout?error=payment');
  redirect('/thank-you');
}

// Client Component
'use client';
import { useRouter } from 'next/navigation';

export function GoDashboard() {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.replace('/dashboard')}>
      Continue
    </button>
  );
}`}
        />

        <IncidentScenario
          number={10}
          level="Mid"
          title="Back button breaks modal intercept routes"
          incident="Opening a product quick-view modal works, but pressing Back leaves a blank overlay or the modal URL without the modal UI. Users must click twice to escape."
          why="Using push for every modal open stacks history entries that do not match parallel or intercepting route state. replace avoids polluting history when the modal is a transient layer on the same underlying page."
          fixSteps={[
            "Use router.replace when opening intercepting modal routes if Back should close the modal once.",
            "Ensure default.tsx slots render null when the modal slot is inactive.",
            "Test Back and Forward with parallel routes after changing push vs replace.",
          ]}
          code={`'use client';

import { useRouter } from 'next/navigation';

export function OpenQuickView({ productId }) {
  const router = useRouter();

  function openModal() {
    router.replace('/products/' + productId, { scroll: false });
  }

  function closeModal() {
    router.back();
  }

  return (
    <>
      <button type="button" onClick={openModal}>Quick view</button>
      <button type="button" onClick={closeModal}>Close</button>
    </>
  );
}`}
        />

        <IncidentScenario
          number={11}
          level="Senior"
          title="Expecting shallow routing for searchParams"
          incident="A Pages Router veteran moved filter state to the URL and expected the heavy server dashboard to skip refetching like shallow routing did. Instead every filter change refetches the entire RSC page and resets expensive client charts."
          why="App Router always re-renders Server Components for the active segment when searchParams change. There is no shallow option; the RSC payload is recomputed for that navigation."
          fixSteps={[
            "Keep expensive interactive visualizations in client islands that do not remount on unrelated URL tweaks.",
            "Pass searchParams from the page into client children with stable keys only when data must reset.",
            "Split routes: lightweight server shell plus client-heavy analytics route if refetch cost is too high.",
          ]}
          code={`// app/dashboard/page.js — server component re-runs when searchParams change
export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const range = params.range ?? '7d';
  const summary = await getSummary(range);

  return (
    <div>
      <SummaryCards data={summary} />
      {/* Charts live in client module — state preserved if not keyed by range */}
      <AnalyticsCharts initialRange={range} />
    </div>
  );
}`}
        />

        <IncidentScenario
          number={12}
          level="Junior"
          title="Post-login dashboard shows logged-out shell"
          incident="Users log in successfully but land on a dashboard that still shows Sign in until they refresh. The session cookie is set in DevTools but the first client navigation shows cached public RSC."
          why="The Router Cache may still serve a prefetched or previously visited static RSC payload for the destination route. Setting a cookie on the server does not automatically invalidate that cached tree on the client transition."
          fixSteps={[
            "Redirect from the Server Action with redirect after setting the session cookie.",
            "If using client router.push after login, call router.refresh immediately after the cookie is set.",
            "Revalidate protected layout paths so the next RSC fetch sees the authenticated session.",
          ]}
          code={`// actions/login.js
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function loginAction(formData) {
  const session = await authenticate(formData);
  cookies().set('session', session, { httpOnly: true, secure: true });
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

// Alternative client follow-up after fetch to login API
'use client';
import { useRouter } from 'next/navigation';

async function onLoginSuccess() {
  router.push('/dashboard');
  router.refresh();
}`}
        />

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b15/lesson-5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B15.5 Route Handlers
          </Link>
          <Link
            href="/learn/app-router/b15/lesson-7"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: B15.7 Metadata & SEO →
          </Link>
        </div>
      </div>
    </div>
  );
}
