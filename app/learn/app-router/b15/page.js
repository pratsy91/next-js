import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B15.1: Foundation Incidents (B1)",
    description:
      "Production incidents from Server vs Client boundaries, hydration, and wrong component placement",
    topics: [
      "Hydration mismatches",
      "'use client' boundary mistakes",
      "Secrets in the client bundle",
      "Hooks crashing Server Components",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B15.2: Routing Incidents (B2)",
    description:
      "Real routing failures: layouts not updating, 404s, parallel slots, and modal intercepts",
    topics: [
      "Nested layout state bugs",
      "loading.js / error.js misses",
      "Parallel route 404s",
      "Intercepting route modals",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B15.3: Data Fetching Incidents (B3)",
    description:
      "Stale data, accidental dynamic rendering, waterfalls, and cache bugs seen in production",
    topics: [
      "Stale ISR / Data Cache",
      "Route became dynamic overnight",
      "Request waterfalls",
      "Suspense blank screens",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "B15.4: Server Action Incidents (B4)",
    description:
      "Form double-submits, silent failures, missing revalidation, and action security incidents",
    topics: [
      "Double submit / duplicate orders",
      "UI not updating after mutation",
      "Validation bypass",
      "Optimistic UI stuck",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "B15.5: Route Handler Incidents (B5)",
    description:
      "API outages: wrong status codes, CORS, webhook retries, and auth gaps on route.js",
    topics: [
      "500 from non-Response returns",
      "CORS and cookie failures",
      "Webhook replay storms",
      "Unauthenticated mutations",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-6",
    title: "B15.6: Navigation Incidents (B6)",
    description:
      "Broken client navigation, stale router cache, searchParams crashes, and prefetch storms",
    topics: [
      "Full page reloads",
      "Stale page after mutation",
      "useSearchParams Suspense crash",
      "Filter state lost on refresh",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-7",
    title: "B15.7: Metadata & SEO Incidents (B7)",
    description:
      "Wrong titles in production, broken social previews, and sitemap/robots mistakes",
    topics: [
      "Title not updating",
      "Open Graph showing old image",
      "Client Component metadata ignored",
      "Sitemap missing dynamic URLs",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-8",
    title: "B15.8: Image, Script & Font Incidents (B8)",
    description:
      "LCP and CLS regressions from images, third-party scripts, and font loading",
    topics: [
      "Layout shift from images",
      "Remote images 400 in production",
      "Third-party script blocking LCP",
      "FOUT / font CLS",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-9",
    title: "B15.9: Styling Incidents (B9)",
    description:
      "FOUC, missing CSS after deploy, Tailwind purge bugs, and CSS-in-JS breaking RSC",
    topics: [
      "Styles missing in production",
      "Hydration style mismatch",
      "Tailwind classes stripped",
      "CSS-in-JS on Server Components",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-10",
    title: "B15.10: Advanced Feature Incidents (B10)",
    description:
      "Middleware redirect loops, leaked env vars, i18n locale bugs, and draft mode leaks",
    topics: [
      "Infinite redirect loops",
      "NEXT_PUBLIC_ secret leak",
      "Locale routing broken",
      "Draft content visible to users",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-11",
    title: "B15.11: Performance Incidents (B11)",
    description:
      "Core Web Vitals regressions, cache stampedes, bundle bloat, and slow TTFB",
    topics: [
      "LCP / CLS / INP regressions",
      "Cache stampede after deploy",
      "Client bundle too large",
      "Data waterfalls",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-12",
    title: "B15.12: Deployment Incidents (B12)",
    description:
      "Build failures, missing env in production, standalone Docker issues, and ISR not refreshing",
    topics: [
      "Build works locally, fails in CI",
      "Env undefined only in prod",
      "Docker standalone missing files",
      "ISR stuck on self-host",
      "How to fix each incident",
    ],
    status: "available",
  },
  {
    id: "lesson-13",
    title: "B15.13: General Production Debugging",
    description:
      "Cross-cutting incidents that span topics: outages, auth, data races, timeouts, and on-call fixes",
    topics: [
      "Works locally, 500 in production",
      "ChunkLoadError after deploy",
      "Auth/session bugs",
      "Timeouts, races, and N+1 queries",
      "How to debug and fix",
    ],
    status: "available",
  },
];

export default function B15Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to App Router
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B15: Real-World Scenario Interview Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Production incidents and scenario questions for the Next.js App
          Router. Each lesson maps to a phase (B1–B12). The last lesson is
          general on-call debugging that spans topics. Every scenario includes
          the incident, why it happens, and how to fix it.
        </p>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <p className="text-sm text-amber-900 dark:text-amber-100">
          Read each card as an interview prompt: what broke in production, the
          root cause, and the exact fix. Levels run from Junior through Senior.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b15/${lesson.id}`}
            className="block rounded-lg border-2 border-blue-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
          >
            <h2 className="mb-2 text-xl font-semibold text-blue-600 dark:text-blue-400">
              {lesson.title}
            </h2>
            <p className="mb-3 text-gray-600 dark:text-gray-300">
              {lesson.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {lesson.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
