import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B14.4: Server Actions - Next.js Mastery",
  description:
    "Most asked interview questions on Server Actions, forms, and mutations",
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
          href="/learn/app-router/b14"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B14 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B14.4: Server Actions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Most asked interview questions on Server Actions, forms, progressive
          enhancement, and mutations (maps to B4).
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            What are Server Actions?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Server Actions are async functions that
              run exclusively on the server, marked with{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">&apos;use server&apos;</code>.
              They handle mutations (create, update, delete) and can be invoked
              from forms or Client Components without writing separate API routes.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Built into App Router — not a separate HTTP layer you design</li>
              <li>POST requests under the hood with CSRF protection</li>
              <li>Support progressive enhancement (forms work without JS)</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            How do you define Server Actions?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Two patterns:</p>
            <CodeBlock
              code={`// 1. Inline in a Server Component file
async function createTodo(formData) {
  'use server';
  const title = formData.get('title');
  await db.todo.create({ data: { title } });
}

// 2. Dedicated actions file (recommended)
// app/actions/todos.js
'use server';

export async function createTodo(formData) {
  const title = formData.get('title');
  await db.todo.create({ data: { title } });
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Server Actions vs API Routes (Route Handlers) — when to use each?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>Server Actions:</strong> Form mutations, internal app logic, progressive enhancement, tight React integration</li>
              <li><strong>Route Handlers (route.js):</strong> Public REST/GraphQL APIs, webhooks, third-party integrations, non-React clients</li>
            </ul>
            <p>Rule of thumb: Server Actions for app-internal mutations; Route Handlers when you need a standard HTTP API surface.</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            How do forms work with Server Actions?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Pass the Server Action to the form&apos;s{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">action</code>{" "}
              prop. On submit, Next.js serializes FormData and calls the action on the server.
            </p>
            <CodeBlock
              code={`// app/new-post/page.js
import { createPost } from '@/app/actions/posts';

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" />
      <button type="submit">Publish</button>
    </form>
  );
}

// actions/posts.js
'use server';
export async function createPost(formData) {
  await db.post.create({
    data: {
      title: formData.get('title'),
      content: formData.get('content'),
    },
  });
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What does progressive enhancement mean with Server Actions?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Forms using{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">action=&#123;serverAction&#125;</code>{" "}
              work as standard HTML form POST even when JavaScript is disabled.
              React enhances with client-side transitions when JS is available.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>No JS: native form submit → server action runs → page navigates/reloads</li>
              <li>With JS: optimistic UI, useFormStatus, no full reload</li>
              <li>Improves accessibility and resilience</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is useFormStatus and what is it for?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong>{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">useFormStatus</code>{" "}
              reads pending state of the parent form submission — typically to
              disable submit buttons or show spinners. Must be used in a child
              component of the form (not the same component that defines the action).
            </p>
            <CodeBlock
              code={`'use client';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}

export default function Form({ action }) {
  return (
    <form action={action}>
      <input name="title" />
      <SubmitButton />
    </form>
  );
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What is the useFormState / useActionState signature?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> React 19 renamed useFormState to useActionState.
              Signature:{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">const [state, formAction, isPending] = useActionState(action, initialState)</code>
            </p>
            <CodeBlock
              code={`'use client';
import { useActionState } from 'react';
import { createPost } from '@/app/actions/posts';

const initialState = { message: null, errors: {} };

export default function PostForm() {
  const [state, formAction, isPending] = useActionState(createPost, initialState);

  return (
    <form action={formAction}>
      <input name="title" />
      {state.errors?.title && <p>{state.errors.title}</p>}
      {state.message && <p>{state.message}</p>}
      <button disabled={isPending}>Submit</button>
    </form>
  );
}

// Server Action receives prevState as first arg
'use server';
export async function createPost(prevState, formData) {
  const title = formData.get('title');
  if (!title) return { message: null, errors: { title: 'Required' } };
  await db.post.create({ data: { title } });
  return { message: 'Created!', errors: {} };
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            How does useOptimistic work with Server Actions?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong>{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">useOptimistic</code>{" "}
              shows immediate UI updates while the Server Action runs. On success,
              real data replaces the optimistic state; on failure, React rolls back.
            </p>
            <CodeBlock
              code={`'use client';
import { useOptimistic, useTransition } from 'react';
import { addMessage } from './actions';

export default function Chat({ messages }) {
  const [optimistic, addOptimistic] = useOptimistic(messages);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData) {
    const text = formData.get('text');
    addOptimistic([...optimistic, { id: 'temp', text, sending: true }]);
    startTransition(async () => {
      await addMessage(formData);
    });
  }

  return (
    <form action={handleSubmit}>
      {optimistic.map(m => <p key={m.id}>{m.text}</p>)}
      <input name="text" />
    </form>
  );
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            How do you revalidate cache after a mutation?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Call revalidation helpers inside the Server Action after the mutation succeeds.</p>
            <CodeBlock
              code={`'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function updateProduct(id, formData) {
  await db.product.update({ where: { id }, data: { /* ... */ } });
  revalidatePath('/products');
  revalidatePath(\`/products/\${id}\`);
  revalidateTag('products');
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Junior" />
            Can Server Actions be called from Client Components?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Yes — import the action and pass it to a form action or call it in an event handler (with startTransition).</p>
            <CodeBlock
              code={`'use client';
import { deleteTodo } from '@/app/actions/todos';
import { useTransition } from 'react';

export default function TodoItem({ id, title }) {
  const [isPending, startTransition] = useTransition();

  return (
    <li>
      {title}
      <button
        onClick={() => startTransition(() => deleteTodo(id))}
        disabled={isPending}
      >
        Delete
      </button>
    </li>
  );
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Senior" />
            What are the security considerations for Server Actions?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li><strong>Always re-validate on server:</strong> Never trust client-sent IDs or permissions</li>
              <li><strong>Closed-over arguments:</strong> Extra args passed from client are serialized — treat as untrusted input</li>
              <li><strong>Authentication:</strong> Check session/user inside every action</li>
              <li><strong>CSRF:</strong> Next.js provides built-in origin checks for actions</li>
              <li><strong>Rate limiting:</strong> Apply at action or middleware level for abuse prevention</li>
            </ul>
            <CodeBlock
              code={`'use server';
import { auth } from '@/lib/auth';

export async function deletePost(postId) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const post = await db.post.findUnique({ where: { id: postId } });
  if (post.authorId !== session.user.id) throw new Error('Forbidden');

  await db.post.delete({ where: { id: postId } });
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            How do file uploads work with Server Actions?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Use{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">enctype=&quot;multipart/form-data&quot;</code>{" "}
              on the form. Files arrive in FormData via{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">formData.get(&apos;file&apos;)</code>.
            </p>
            <CodeBlock
              code={`// Client or Server Component form
<form action={uploadFile} encType="multipart/form-data">
  <input type="file" name="avatar" accept="image/*" />
  <button type="submit">Upload</button>
</form>

'use server';
export async function uploadFile(formData) {
  const file = formData.get('avatar');
  if (!(file instanceof File)) throw new Error('No file');
  const bytes = await file.arrayBuffer();
  await saveToStorage(file.name, bytes);
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            What are common error handling patterns?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong></p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Return error objects from actions for useActionState (field-level validation)</li>
              <li>throw new Error() for unexpected failures — caught by nearest error.js boundary</li>
              <li>try/catch inside action with structured logging</li>
            </ul>
            <CodeBlock
              code={`'use server';
export async function saveSettings(prevState, formData) {
  try {
    await db.settings.update({ /* ... */ });
    return { success: true, error: null };
  } catch (e) {
    return { success: false, error: 'Failed to save settings' };
  }
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Where should validation happen?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p><strong>Answer:</strong> Always validate on the server inside the Server Action. Client validation is optional UX only.</p>
            <CodeBlock
              code={`'use server';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1).max(100),
  email: z.string().email(),
});

export async function createUser(prevState, formData) {
  const parsed = schema.safeParse({
    title: formData.get('title'),
    email: formData.get('email'),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  await db.user.create({ data: parsed.data });
  return { errors: {} };
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Can Server Actions return data to the client?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Yes — return serializable values (objects,
              strings, numbers). The return value is available to useActionState
              or the caller when invoked programmatically.
            </p>
            <CodeBlock
              code={`'use server';
export async function searchProducts(query) {
  const results = await db.product.findMany({
    where: { name: { contains: query } },
  });
  return results.map(p => ({ id: p.id, name: p.name }));
}

// Client
const results = await searchProducts('laptop');`}
              language="javascript"
            />
            <p>Cannot return non-serializable values (functions, class instances, streams in all cases).</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <LevelBadge level="Mid" />
            Can you use redirect() inside Server Actions?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Answer:</strong> Yes.{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">redirect()</code>{" "}
              from <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">next/navigation</code>{" "}
              throws internally — call it after mutations to navigate post-submit.
            </p>
            <CodeBlock
              code={`'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createPost(formData) {
  const post = await db.post.create({ data: { /* ... */ } });
  revalidatePath('/blog');
  redirect(\`/blog/\${post.slug}\`);
}`}
              language="javascript"
            />
            <p>Place redirect() after side effects; code after redirect() does not run.</p>
          </div>
        </section>

        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b14/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Data Fetching
          </Link>
          <Link
            href="/learn/app-router/b14/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Route Handlers →
          </Link>
        </div>
      </div>
    </div>
  );
}
