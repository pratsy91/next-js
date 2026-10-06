import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B15.4: Server Action Incidents - Next.js Mastery",
  description:
    "Form double-submits, revalidation gaps, validation bypass, and Server Action security (maps to B4)",
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

export default function Lesson4Page() {
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
          B15.4: Server Action Incidents
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Server Actions simplify mutations until forms navigate to odd URLs,
          duplicate orders land in finance, or a crafted POST bypasses client
          validation. These fixes are what production teams ship same-day.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Form navigates to weird URL — not a Server Action
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Submitting contact form performs full document navigation to
              /contact?email=... or 404. Network tab shows GET with query string
              instead of a POST action invocation.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Without use server on the function or module, action is just a
              string URL or undefined and the browser falls back to native form
              navigation behavior.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Add use server to actions.js or inline at top of the async function file.</li>
              <li>Wire form action to the imported server function reference.</li>
              <li>Ensure method is POST implicitly via Server Actions protocol.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — plain async function, no 'use server'
export async function submitContact(formData) {
  await save(formData);
}

// FIXED — actions/contact.js
'use server';
export async function submitContact(formData) {
  await save(formData);
}

// form
<form action={submitContact}>...</form>`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Double-submit orders — button stays enabled
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Users hammer Pay now on slow 3G and finance receives duplicate
              charges. No pending state on the submit control.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Server Actions are async; without UI feedback the browser accepts
              multiple submissions until the first response returns.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Extract SubmitButton that calls useFormStatus and disables while pending.</li>
              <li>Add server-side idempotency keys on payment actions.</li>
              <li>Return early if order already exists for the same client token.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// SubmitButton.js — must be child of form using the action
'use client';
import { useFormStatus } from 'react-dom';

export function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-busy={pending}>
      {pending ? 'Processing…' : label}
    </button>
  );
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Create succeeds but list page shows old data
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              New item appears in DB and toast says saved, yet /items still lists
              without the row until manual refresh.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Router cache and Data Cache still hold the previous RSC payload and
              tagged fetch results. Mutations do not auto-invalidate unless you
              call revalidatePath or revalidateTag.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>After insert, revalidatePath('/items') or the list tag used in fetch.</li>
              <li>redirect to detail page if you want a hard navigation with fresh data.</li>
              <li>Combine with router.refresh on client only when path revalidation is insufficient.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`'use server';
import { revalidatePath } from 'next/cache';

export async function createItem(formData) {
  await db.item.create({ data: { name: formData.get('name') } });
  revalidatePath('/items');
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            useActionState signature mismatch
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Runtime error: An async function with useActionState must have a
              first argument that is the previous state. Form errors never surface.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              useActionState (formerly useFormState) expects action(prevState,
              formData). A plain (formData) handler breaks the contract.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Define async function save(prevState, formData) with use server.</li>
              <li>Return structured state objects for field errors and success flags.</li>
              <li>Pass the action as first arg to useActionState with initialState.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`'use server';
export async function save(prevState, formData) {
  const name = formData.get('name');
  if (!name) return { error: 'Name required' };
  await db.user.update({ data: { name } });
  return { success: true };
}

// client
'use client';
import { useActionState } from 'react';
import { save } from './actions';
const [state, formAction] = useActionState(save, { error: null });`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Optimistic UI snaps back or sticks after server error
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Comment appears instantly then vanishes when API rejects, or a
              failed post stays visible forever until reload.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              useOptimistic updates local state immediately. If you do not revert
              on thrown errors or reconcile when the server response arrives,
              UI diverges from truth.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Wrap action in try/catch; on failure let optimistic state roll back when action rejects.</li>
              <li>Replace temp IDs with server IDs from the returned payload on success.</li>
              <li>Show toast on error so users know the optimistic row was removed.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`'use client';
import { useOptimistic, useTransition } from 'react';
import { addComment } from './actions';

export function Comments({ comments }) {
  const [optimistic, addOptimistic] = useOptimistic(comments, (state, c) => [...state, c]);
  const [, startTransition] = useTransition();

  function onSubmit(formData) {
    const temp = { id: 'temp', text: formData.get('text') };
    startTransition(async () => {
      addOptimistic(temp);
      await addComment(formData); // throws → React reverts optimistic list
    });
  }
  return (/* render optimistic */);
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Client-only validation — crafted request inserts bad data
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Security researcher POSTs directly to the Server Action with
              negative quantity and XSS payload. DB accepts because zod ran only in the browser.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Server Actions are public endpoints. Anything the client checks can
              be bypassed with curl or modified fetch.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Parse and validate formData inside the Server Action with zod or valibot.</li>
              <li>Return field errors via useActionState; never trust client-only checks.</li>
              <li>Sanitize or reject HTML in text fields at persistence boundary.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`'use server';
import { z } from 'zod';

const schema = z.object({
  qty: z.coerce.number().int().min(1).max(99),
  note: z.string().max(500),
});

export async function addLine(prev, formData) {
  const parsed = schema.safeParse({
    qty: formData.get('qty'),
    note: formData.get('note'),
  });
  if (!parsed.success) return { errors: parsed.error.flatten() };
  await db.line.create({ data: parsed.data });
  return { ok: true };
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Hidden userId trusted — IDOR profile update
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              User changes hidden input userId in DevTools and updates another
              account email. Audit log shows legitimate session but wrong target row.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Any form field is attacker-controlled. Using client-supplied IDs
              instead of the authenticated session subject causes insecure direct
              object reference.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Read session via auth() or cookies on the server; derive userId there.</li>
              <li>Remove hidden userId from the form entirely.</li>
              <li>Authorize row access before update with role checks.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN
export async function updateProfile(formData) {
  const userId = formData.get('userId');
  await db.user.update({ where: { id: userId }, data: { email: formData.get('email') } });
}

// FIXED
'use server';
import { auth } from '@/auth';
export async function updateProfile(formData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  await db.user.update({
    where: { id: session.user.id },
    data: { email: formData.get('email') },
  });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Action closed over non-serializable state — prod-only failure
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Dev works but production Server Action throws about non-serializable
              arguments after someone bound a large in-memory cart object into the action.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Server Actions serialize arguments from client invocations. Closures
              capturing complex objects, Maps, or class instances cannot cross the wire
              except via form fields or limited bind args.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Pass IDs and primitives only; reload authoritative state inside the action.</li>
              <li>Use bind for a single primitive like productId, not entire cart graphs.</li>
              <li>Store session cart server-side keyed by session cookie.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN — binding huge object
const action = checkout.bind(null, cartObject);

// FIXED
'use server';
export async function checkout(cartId, formData) {
  const cart = await db.cart.findUnique({ where: { id: cartId } });
  if (!cart) throw new Error('Not found');
  await placeOrder(cart);
}

// client: checkout.bind(null, cartId)`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            File upload via Server Action hits body size limit
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Marketing uploads 80 MB video via form action; serverless function
              OOMs or returns 413. Smaller images work intermittently.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Server Actions read the full multipart body into memory subject to
              platform body limits. Large binaries belong in direct-to-storage uploads.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use presigned S3 or Blob upload URL from a Route Handler, then save metadata via action.</li>
              <li>Increase limits only where self-hosted and stream to storage.</li>
              <li>Validate MIME type and size server-side after upload completes.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// Route Handler — presign
export async function POST() {
  const url = await getSignedUploadUrl();
  return Response.json({ url });
}

// Server Action — small metadata only
'use server';
export async function attachAsset(formData) {
  const key = formData.get('key');
  const size = Number(formData.get('size'));
  if (size > 10_000_000) return { error: 'Too large' };
  await db.asset.create({ data: { key } });
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            redirect() inside try/catch swallowed
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Successful signup should redirect to /welcome but users land back on
              /signup with a generic error object. Logs show NEXT_REDIRECT caught as failure.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              redirect() and notFound() work by throwing special internal errors.
              A broad catch (e) block treats them like application failures.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Re-throw if error digest is NEXT_REDIRECT or use isRedirectError helper.</li>
              <li>Call redirect after try/catch completes on success path.</li>
              <li>Keep try/catch around IO only, not around navigation helpers.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`'use server';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function signup(prev, formData) {
  try {
    await createUser(formData);
    redirect('/welcome');
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { error: 'Signup failed' };
  }
}`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Progressive enhancement broken — preventDefault only
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Form works with JavaScript enabled but no-op with JS disabled or
              blocked extensions. Accessibility audit flags non-functional native submit.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              onSubmit with preventDefault and client fetch replaces the Server
              Action wire-up unless action is still set on the form element.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use native form action pointing at the Server Action without blocking default submit.</li>
              <li>Add client enhancements optionally; do not require preventDefault for core flow.</li>
              <li>Test with JS off in browser devtools coverage.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`// BROKEN
<form onSubmit={(e) => { e.preventDefault(); clientSave(new FormData(e.target)); }}>

// FIXED
<form action={save}>
  <input name="title" />
  <SubmitButton />
</form>`}
          />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            Race on stock — two actions oversell last unit
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">The incident</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Flash sale with stock=1 sells two units. Both tabs clicked Buy within
              100ms and both Server Actions read stock 1 before either decremented.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">Why it happens</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Read-modify-write without atomic constraints is a classic lost update
              race. Server Actions do not serialize concurrent requests automatically.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">How to fix</h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use conditional UPDATE WHERE stock greater than 0 and check affected rows.</li>
              <li>Return sold-out error to second buyer; surface in useActionState.</li>
              <li>Consider DB transactions with SELECT FOR UPDATE for high contention SKUs.</li>
            </ul>
          </div>
          <CodeBlock
            language="javascript"
            code={`'use server';
export async function buy(productId) {
  const result = await db.product.updateMany({
    where: { id: productId, stock: { gt: 0 } },
    data: { stock: { decrement: 1 } },
  });
  if (result.count === 0) return { error: 'Sold out' };
  await createOrder(productId);
  return { ok: true };
}`}
          />
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b15/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Data Fetching Incidents
          </Link>
          <Link
            href="/learn/app-router/b15/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Route Handler Incidents →
          </Link>
        </div>
      </div>
    </div>
  );
}
