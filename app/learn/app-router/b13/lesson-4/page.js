import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.4: Server Actions & Forms - Next.js Mastery",
  description:
    "Server Actions and form handling reference for Next.js App Router",
};

export default function Lesson4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b13"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B13 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B13.4: Server Actions & Forms
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Server Actions reference, form handling, mutations, error handling,
          and progressive enhancement.
        </p>
      </div>

      <div className="space-y-8">
        {/* Server Actions Basics */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Server Actions Basics
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions are async functions that run exclusively on the
            server. They're marked with the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              'use server'
            </code>{" "}
            directive and can be called directly from Client Components,
            eliminating the need for API routes for simple mutations. They
            provide type-safe, end-to-end data mutations with built-in
            progressive enhancement.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Key Benefits:</strong> Server Actions reduce boilerplate by
            removing the need for separate API endpoints, provide automatic
            request serialization, enable progressive enhancement (forms work
            without JavaScript), and integrate seamlessly with React's form
            handling. They're automatically protected against CSRF attacks and
            support streaming responses. For interview purposes, understand that
            Server Actions represent a paradigm shift from traditional REST APIs
            to a more integrated server-client model.
          </p>
          <CodeBlock
            code={`// app/actions.js
'use server';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  await db.post.create({
    data: { title, content },
  });
  
  revalidatePath('/posts');
}

// Using in component
'use client';
import { createPost } from './actions';

export default function Form() {
  return (
    <form action={createPost}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">Create</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Form Actions */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Form Actions & useFormState
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Form Actions allow you to pass Server Actions directly to the{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              action
            </code>{" "}
            prop of HTML forms. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useFormState
            </code>{" "}
            hook (React 19+) manages form state, submission status, and
            validation errors. It accepts the Server Action as the first
            parameter and an initial state as the second, returning the current
            state and a form action function.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it works:</strong> When a form is submitted, the Server
            Action receives a{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              FormData
            </code>{" "}
            object containing all form fields. The action can return data or
            errors, which{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useFormState
            </code>{" "}
            makes available to your component. This enables declarative error
            handling and loading states without manually managing form
            submission logic. The form works even without JavaScript
            (progressive enhancement), making it more resilient and accessible.
          </p>
          <CodeBlock
            code={`'use client';
import { useFormState } from 'react-dom';
import { createPost } from './actions';

const initialState = { message: null, errors: {} };

export default function Form() {
  const [state, formAction] = useFormState(createPost, initialState);
  
  return (
    <form action={formAction}>
      <input name="title" />
      {state.errors?.title && (
        <p className="text-red-500">{state.errors.title}</p>
      )}
      <button type="submit">Create</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}

// Server Action
'use server';
export async function createPost(prevState, formData) {
  const title = formData.get('title');
  
  if (!title) {
    return {
      message: 'Title required',
      errors: { title: 'Title is required' },
    };
  }
  
  await db.post.create({ data: { title } });
  return { message: 'Post created!', errors: {} };
}`}
            language="javascript"
          />
        </section>

        {/* useFormStatus */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. useFormStatus Hook
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useFormStatus
            </code>{" "}
            hook (React 19+) provides access to the status of the nearest parent
            form submission. It must be used within a form and can only be
            called from Client Components that are descendants of a form element
            using a Server Action.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>How it works:</strong> The hook returns an object with
            properties like{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              pending
            </code>{" "}
            (true when form is submitting),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              data
            </code>{" "}
            (FormData being submitted),{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              method
            </code>{" "}
            (HTTP method), and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              action
            </code>{" "}
            (the action being called). This allows you to show loading states,
            disable buttons, or display progress indicators during form
            submission without manually managing state. The hook automatically
            resets when the form submission completes, making it perfect for
            optimistic UI updates and loading indicators.
          </p>
          <CodeBlock
            code={`'use client';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export default function Form() {
  return (
    <form action={createPost}>
      <input name="title" />
      <SubmitButton />
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Optimistic Updates */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Optimistic Updates
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Optimistic updates allow you to immediately update the UI before the
            server action completes, providing instant feedback to users.
            React's{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useOptimistic
            </code>{" "}
            hook (React 19+) makes this pattern straightforward by maintaining
            an optimistic version of your state that gets reverted if the
            mutation fails.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Why use optimistic updates?</strong> They dramatically
            improve perceived performance, especially on slower connections.
            Users see immediate feedback while the actual mutation happens in
            the background. If the mutation fails, React automatically reverts
            to the previous state. This pattern is essential for creating
            responsive, modern applications. Common use cases include liking
            posts, adding items to cart, or updating comments where the user
            expects instant feedback.
          </p>
          <CodeBlock
            code={`'use client';
import { useOptimistic } from 'react';
import { addComment } from './actions';

export default function Comments({ comments }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  
  async function handleSubmit(formData) {
    const comment = { id: Date.now(), text: formData.get('text') };
    addOptimisticComment(comment);
    await addComment(formData);
  }
  
  return (
    <div>
      {optimisticComments.map(comment => (
        <div key={comment.id}>{comment.text}</div>
      ))}
      <form action={handleSubmit}>
        <input name="text" />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Revalidation Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Revalidation Patterns
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Revalidation ensures that cached data stays fresh when content
            changes. After Server Actions mutate data (create, update, delete),
            you typically want to invalidate related caches so users see the
            latest information. Next.js provides several revalidation functions
            for different use cases.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Revalidation Methods:</strong>{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidatePath()
            </code>{" "}
            invalidates all cached data for a specific path, useful when you
            know the exact route that needs updating.{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              revalidateTag()
            </code>{" "}
            (with cacheLife in Next.js 16) invalidates all data tagged with a
            specific tag, perfect for related content that might span multiple
            routes. Tag-based revalidation is more efficient for large
            applications as you can tag related data and invalidate everything
            related at once. Always call revalidation after successful mutations
            to ensure users see updated content immediately.
          </p>
          <CodeBlock
            code={`'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function updatePost(id, data) {
  await db.post.update({
    where: { id },
    data,
  });
  
  // Revalidate specific path
  revalidatePath('/posts');
  revalidatePath(\`/posts/\${id}\`);
  
  // Or revalidate by tag
  revalidateTag('posts');
  revalidateTag(\`post-\${id}\`);
}

// With cacheLife (Next.js 16)
revalidateTag('posts', { cacheLife: 60 });`}
            language="javascript"
          />
        </section>

        {/* Error Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. Error Handling & Validation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions should always handle errors gracefully and validate
            input before processing. Use try-catch blocks for all async
            operations and return meaningful error information that can be
            displayed to users or logged for debugging. The{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useActionState
            </code>{" "}
            hook (React 19+) or{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-700">
              useFormState
            </code>{" "}
            makes it easy to handle errors in the UI.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Error Handling Strategy:</strong> Validate input early and
            return user-friendly error messages. Use try-catch to handle
            unexpected errors and return appropriate error objects. Never expose
            sensitive error details to clients in production. Log errors
            server-side for debugging. Return structured error objects that
            components can easily consume (like error objects with message and
            field-specific errors). Consider using error classes or validation
            libraries to standardize error handling across your application.
            Always handle both validation errors (user input issues) and system
            errors (database failures, network issues).
          </p>
          <CodeBlock
            code={`'use server';

export async function createPost(formData) {
  try {
    const title = formData.get('title');
    
    // Validation
    if (!title || title.length < 3) {
      return {
        error: 'Title must be at least 3 characters',
      };
    }
    
    await db.post.create({ data: { title } });
    revalidatePath('/posts');
    
    return { success: true };
  } catch (error) {
    return {
      error: 'Failed to create post',
    };
  }
}

// Client component
'use client';
import { useActionState } from 'react';
import { createPost } from './actions';

export default function Form() {
  const [state, formAction] = useActionState(createPost, null);
  
  return (
    <form action={formAction}>
      <input name="title" />
      {state?.error && (
        <p className="text-red-500">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-500">Post created!</p>
      )}
      <button type="submit">Create</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Progressive Enhancement */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Progressive Enhancement
          </h2>
          <CodeBlock
            code={`// Server Actions work without JavaScript!
// Form works even if JS is disabled

'use client';
import { createPost } from './actions';

export default function Form() {
  return (
    <form action={createPost}>
      {/* Works without JavaScript */}
      <input name="title" required />
      <button type="submit">Submit</button>
    </form>
  );
}

// Enhanced with JavaScript when available
export default function EnhancedForm() {
  const [isPending, startTransition] = useTransition();
  
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    startTransition(async () => {
      await createPost(formData);
      // Optimistic updates, animations, etc.
    });
  }
  
  return (
    <form action={createPost} onSubmit={handleSubmit}>
      <input name="title" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* File Uploads */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            8. File Uploads & Mutations
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions can handle file uploads by receiving FormData with
            file inputs. The file data is available as File objects that can be
            processed, saved, or uploaded to cloud storage. File uploads require
            proper validation, size limits, and security considerations.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <strong>Security Considerations:</strong> Always validate file types
            using MIME type checking (not just file extensions), enforce size
            limits to prevent DoS attacks, scan files for malicious content if
            storing user uploads, store files outside the web root or in cloud
            storage (not directly accessible), and use secure, unique filenames
            to prevent conflicts and directory traversal attacks. Consider
            implementing progress tracking for large file uploads and provide
            clear error messages when uploads fail. For production, consider
            using dedicated file upload services or CDNs that handle scaling and
            optimization.
          </p>
          <CodeBlock
            code={`'use server';

export async function uploadFile(formData) {
  const file = formData.get('file');
  
  if (!file) {
    return { error: 'No file provided' };
  }
  
  // Save file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  await fs.writeFile(\`./uploads/\${file.name}\`, buffer);
  
  return { success: true, filename: file.name };
}

// Client component
export default function FileUpload() {
  return (
    <form action={uploadFile} encType="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Routing & Navigation
          </Link>
          <Link
            href="/learn/app-router/b13/lesson-5"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: API Routes & Route Handlers →
          </Link>
        </div>
      </div>
    </div>
  );
}
