import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B4.2: Form Actions - Next.js Mastery",
  description: "Complete guide to forms with Server Actions in Next.js",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b4"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B4 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B4.2: Form Actions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to handle forms with Server Actions, implement progressive
          enhancement, use form status hooks, validate forms, handle file
          uploads, and create multi-step forms.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Form with Server Actions */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Form with Server Actions
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions can be used directly with HTML forms using the{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              action
            </code>{" "}
            prop. This works without JavaScript enabled.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Form with Server Action
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  await db.user.create({
    data: { name, email }
  });
  
  redirect('/users');
}

// app/components/UserForm.js
import { createUser } from '@/app/actions/user';

export default function UserForm() {
  return (
    <form action={createUser}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Form with Client Component
          </h3>
          <CodeBlock
            code={`// app/components/UserForm.js
'use client'

import { createUser } from '@/app/actions/user';
import { useState } from 'react';

export default function UserForm() {
  const [message, setMessage] = useState('');
  
  async function handleSubmit(formData) {
    const result = await createUser(formData);
    setMessage(result.success ? 'User created!' : result.error);
  }
  
  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      {message && <p>{message}</p>}
      <button type="submit">Create User</button>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Inline Server Action in Form
          </h3>
          <CodeBlock
            code={`// app/components/UserForm.js
'use client'

export default function UserForm() {
  async function handleSubmit(formData) {
    'use server'
    
    const name = formData.get('name');
    const email = formData.get('email');
    
    await db.user.create({
      data: { name, email }
    });
    
    redirect('/users');
  }
  
  return (
    <form action={handleSubmit}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Progressive Enhancement */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Progressive Enhancement
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Forms with Server Actions work without JavaScript. When JavaScript
            is enabled, you can enhance the experience with client-side
            validation, optimistic updates, and better UX.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Progressive Enhancement
          </h3>
          <CodeBlock
            code={`// app/components/UserForm.js
'use client'

import { createUser } from '@/app/actions/user';
import { useState } from 'react';

export default function UserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await createUser(formData);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Client-Side Validation Enhancement
          </h3>
          <CodeBlock
            code={`// app/components/UserForm.js
'use client'

import { createUser } from '@/app/actions/user';
import { useState } from 'react';

export default function UserForm() {
  const [errors, setErrors] = useState({});
  
  function validateForm(formData) {
    const newErrors = {};
    const name = formData.get('name');
    const email = formData.get('email');
    
    if (!name || name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email || !email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  
  async function handleSubmit(formData) {
    // Client-side validation (enhancement)
    if (!validateForm(formData)) {
      return; // Prevent submission
    }
    
    // Server-side validation still happens
    const result = await createUser(formData);
    if (!result.success) {
      setErrors(result.errors || {});
    }
  }
  
  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: useFormStatus hook */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. useFormStatus Hook
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              useFormStatus
            </code>{" "}
            hook provides the pending state of a form submission. It must be
            used in a component that is a child of a form.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic useFormStatus Usage
          </h3>
          <CodeBlock
            code={`// app/components/SubmitButton.js
'use client'

import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// app/components/UserForm.js
'use client'

import { createUser } from '@/app/actions/user';
import SubmitButton from './SubmitButton';

export default function UserForm() {
  return (
    <form action={createUser}>
      <input name="name" required />
      <input name="email" type="email" required />
      <SubmitButton />
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            useFormStatus with Loading Indicator
          </h3>
          <CodeBlock
            code={`// app/components/FormStatus.js
'use client'

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={pending ? 'opacity-50 cursor-not-allowed' : ''}
    >
      {pending ? (
        <>
          <span className="spinner" /> Submitting...
        </>
      ) : (
        'Submit'
      )}
    </button>
  );
}

export function FormMessage() {
  const { pending, data, method, action } = useFormStatus();
  
  if (pending) {
    return <p>Processing your request...</p>;
  }
  
  return null;
}

// Usage
'use client'
import { createUser } from '@/app/actions/user';
import { SubmitButton, FormMessage } from './FormStatus';

export default function UserForm() {
  return (
    <form action={createUser}>
      <input name="name" required />
      <input name="email" type="email" required />
      <FormMessage />
      <SubmitButton />
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            useFormStatus Properties
          </h3>
          <CodeBlock
            code={`// app/components/FormStatus.js
'use client'

import { useFormStatus } from 'react-dom';

export function FormDebug() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <div>
      <p>Pending: {pending ? 'Yes' : 'No'}</p>
      <p>Method: {method}</p>
      <p>Action: {action?.toString()}</p>
      {data && (
        <p>Form Data: {JSON.stringify(Object.fromEntries(data))}</p>
      )}
    </div>
  );
}

// All properties:
// - pending: boolean - true when form is submitting
// - data: FormData | null - the form data being submitted
// - method: 'get' | 'post' | null - the form method
// - action: ((formData: FormData) => void) | null - the action function`}
            language="javascript"
          />
        </section>

        {/* Section 4: useFormState hook */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. useFormState Hook
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              useFormState
            </code>{" "}
            hook manages form state and handles the return value from Server
            Actions. It's useful for displaying errors and success messages.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic useFormState Usage
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function createUser(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  if (!name || !email) {
    return { error: 'Name and email are required' };
  }
  
  try {
    const user = await db.user.create({
      data: { name, email }
    });
    
    return { success: true, message: 'User created successfully' };
  } catch (error) {
    return { error: 'Failed to create user' };
  }
}

// app/components/UserForm.js
'use client'

import { createUser } from '@/app/actions/user';
import { useFormState } from 'react-dom';

export default function UserForm() {
  const [state, formAction] = useFormState(createUser, null);
  
  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      {state?.error && (
        <p className="text-red-500">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-500">{state.message}</p>
      )}
      <button type="submit">Create User</button>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            useFormState with Initial State
          </h3>
          <CodeBlock
            code={`// app/components/UserForm.js
'use client'

import { createUser } from '@/app/actions/user';
import { useFormState } from 'react-dom';

const initialState = {
  message: null,
  errors: {}
};

export default function UserForm() {
  const [state, formAction] = useFormState(createUser, initialState);
  
  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        {state.errors?.name && (
          <p className="text-red-500">{state.errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        {state.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
      </div>
      {state.message && (
        <p className={state.success ? 'text-green-500' : 'text-red-500'}>
          {state.message}
        </p>
      )}
      <button type="submit">Create User</button>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            useFormState with Field-Level Errors
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function createUser(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const age = formData.get('age');
  
  const errors = {};
  
  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!email || !email.includes('@')) {
    errors.email = 'Valid email is required';
  }
  
  if (age && (isNaN(age) || parseInt(age) < 0)) {
    errors.age = 'Age must be a positive number';
  }
  
  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }
  
  try {
    await db.user.create({
      data: { name, email, age: age ? parseInt(age) : null }
    });
    
    return { success: true, message: 'User created!' };
  } catch (error) {
    return { error: 'Failed to create user', success: false };
  }
}

// app/components/UserForm.js
'use client'

import { createUser } from '@/app/actions/user';
import { useFormState } from 'react-dom';

export default function UserForm() {
  const [state, formAction] = useFormState(createUser, { errors: {} });
  
  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required
          aria-invalid={state.errors?.name ? 'true' : 'false'}
        />
        {state.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required
          aria-invalid={state.errors?.email ? 'true' : 'false'}
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="age">Age (optional)</label>
        <input 
          type="number" 
          id="age" 
          name="age"
          aria-invalid={state.errors?.age ? 'true' : 'false'}
        />
        {state.errors?.age && (
          <p className="text-red-500 text-sm">{state.errors.age}</p>
        )}
      </div>
      {state.message && (
        <p className={state.success ? 'text-green-500' : 'text-red-500'}>
          {state.message}
        </p>
      )}
      <button type="submit">Create User</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Form Validation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Form Validation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Validate forms both on the client (for UX) and server (for
            security). Always validate on the server, even if you validate on
            the client.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server-Side Validation
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(0).max(120).optional()
});

export async function createUser(prevState, formData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    age: formData.get('age') ? parseInt(formData.get('age')) : undefined
  };
  
  // Validate with Zod
  const result = userSchema.safeParse(rawData);
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    };
  }
  
  try {
    await db.user.create({
      data: result.data
    });
    
    return { success: true, message: 'User created!' };
  } catch (error) {
    return { success: false, error: 'Failed to create user' };
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Client-Side Validation with HTML5
          </h3>
          <CodeBlock
            code={`// app/components/UserForm.js
'use client'

import { createUser } from '@/app/actions/user';
import { useFormState } from 'react-dom';

export default function UserForm() {
  const [state, formAction] = useFormState(createUser, null);
  
  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required
          minLength={2}
          pattern="[A-Za-z ]+"
          title="Name must be at least 2 characters and contain only letters"
        />
        {state?.errors?.name && (
          <p className="text-red-500">{state.errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required
        />
        {state?.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input 
          type="number" 
          id="age" 
          name="age" 
          min="0"
          max="120"
        />
        {state?.errors?.age && (
          <p className="text-red-500">{state.errors.age}</p>
        )}
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Custom Validation Function
          </h3>
          <CodeBlock
            code={`// app/components/UserForm.js
'use client'

import { createUser } from '@/app/actions/user';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export default function UserForm() {
  const [state, formAction] = useFormState(createUser, null);
  const [clientErrors, setClientErrors] = useState({});
  
  function validateClient(formData) {
    const errors = {};
    const name = formData.get('name');
    const email = formData.get('email');
    
    if (!name || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  }
  
  async function handleSubmit(formData) {
    // Client-side validation
    if (!validateClient(formData)) {
      return; // Don't submit if client validation fails
    }
    
    // Clear client errors and submit
    setClientErrors({});
    formAction(formData);
  }
  
  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        {clientErrors.name && (
          <p className="text-red-500 text-sm">{clientErrors.name}</p>
        )}
        {state?.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        {clientErrors.email && (
          <p className="text-red-500 text-sm">{clientErrors.email}</p>
        )}
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>
      {state?.success && (
        <p className="text-green-500">{state.message}</p>
      )}
      <button type="submit">Create User</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 6: File Uploads */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            6. File Uploads
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Handle file uploads with Server Actions. Files are sent as FormData
            and can be processed on the server.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic File Upload
          </h3>
          <CodeBlock
            code={`// app/actions/upload.js
'use server'

import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function uploadFile(formData) {
  const file = formData.get('file');
  
  if (!file) {
    return { error: 'No file provided' };
  }
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const path = join(process.cwd(), 'public', 'uploads', file.name);
  await writeFile(path, buffer);
  
  return { success: true, path: \`/uploads/\${file.name}\` };
}

// app/components/FileUpload.js
'use client'

import { uploadFile } from '@/app/actions/upload';
import { useFormState } from 'react-dom';

export default function FileUpload() {
  const [state, formAction] = useFormState(uploadFile, null);
  
  return (
    <form action={formAction} encType="multipart/form-data">
      <div>
        <label htmlFor="file">Choose a file</label>
        <input type="file" id="file" name="file" required />
      </div>
      {state?.error && (
        <p className="text-red-500">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-500">File uploaded: {state.path}</p>
      )}
      <button type="submit">Upload</button>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            File Upload with Validation
          </h3>
          <CodeBlock
            code={`// app/actions/upload.js
'use server'

import { writeFile } from 'fs/promises';
import { join } from 'path';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function uploadImage(formData) {
  const file = formData.get('file');
  
  if (!file) {
    return { error: 'No file provided' };
  }
  
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' };
  }
  
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return { error: 'File size exceeds 5MB limit.' };
  }
  
  // Generate unique filename
  const timestamp = Date.now();
  const extension = file.name.split('.').pop();
  const filename = \`\${timestamp}.\${extension}\`;
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const path = join(process.cwd(), 'public', 'uploads', filename);
  await writeFile(path, buffer);
  
  return { 
    success: true, 
    filename,
    path: \`/uploads/\${filename}\`,
    size: file.size
  };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple File Upload
          </h3>
          <CodeBlock
            code={`// app/actions/upload.js
'use server'

import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function uploadFiles(formData) {
  const files = formData.getAll('files');
  
  if (files.length === 0) {
    return { error: 'No files provided' };
  }
  
  const uploadedFiles = [];
  
  for (const file of files) {
    if (file.size === 0) continue;
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = \`\${timestamp}-\${file.name}\`;
    
    const path = join(process.cwd(), 'public', 'uploads', filename);
    await writeFile(path, buffer);
    
    uploadedFiles.push({
      originalName: file.name,
      filename,
      path: \`/uploads/\${filename}\`,
      size: file.size
    });
  }
  
  return { success: true, files: uploadedFiles };
}

// app/components/MultiFileUpload.js
'use client'

import { uploadFiles } from '@/app/actions/upload';
import { useFormState } from 'react-dom';

export default function MultiFileUpload() {
  const [state, formAction] = useFormState(uploadFiles, null);
  
  return (
    <form action={formAction} encType="multipart/form-data">
      <div>
        <label htmlFor="files">Choose files (multiple)</label>
        <input 
          type="file" 
          id="files" 
          name="files" 
          multiple 
          required 
        />
      </div>
      {state?.error && (
        <p className="text-red-500">{state.error}</p>
      )}
      {state?.success && (
        <div>
          <p className="text-green-500">Uploaded {state.files.length} files:</p>
          <ul>
            {state.files.map((file, index) => (
              <li key={index}>{file.originalName}</li>
            ))}
          </ul>
        </div>
      )}
      <button type="submit">Upload Files</button>
    </form>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 7: Multi-step Forms */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            7. Multi-step Forms
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create multi-step forms using state management and Server Actions
            for each step or final submission.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Multi-step Form
          </h3>
          <CodeBlock
            code={`// app/components/MultiStepForm.js
'use client'

import { createUser } from '@/app/actions/user';
import { useState } from 'react';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: ''
  });
  
  function updateField(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }
  
  function nextStep() {
    if (step < 3) {
      setStep(step + 1);
    }
  }
  
  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    
    await createUser(formDataObj);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <div>
          <h2>Step 1: Personal Information</h2>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h2>Step 2: Additional Info</h2>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={(e) => updateField('age', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => updateField('address', e.target.value)}
            />
          </div>
          <button type="button" onClick={prevStep}>Previous</button>
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2>Step 3: Review</h2>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Age: {formData.age || 'Not provided'}</p>
          <p>Address: {formData.address || 'Not provided'}</p>
          <button type="button" onClick={prevStep}>Previous</button>
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multi-step Form with Server Actions per Step
          </h3>
          <CodeBlock
            code={`// app/actions/multistep.js
'use server'

export async function saveStep1(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Validate and save to session/database
  // Return validation errors or success
  return { success: true, step: 1 };
}

export async function saveStep2(formData) {
  const age = formData.get('age');
  const address = formData.get('address');
  
  return { success: true, step: 2 };
}

export async function finalizeForm(formData) {
  // Final submission
  const allData = {
    name: formData.get('name'),
    email: formData.get('email'),
    age: formData.get('age'),
    address: formData.get('address')
  };
  
  await db.user.create({ data: allData });
  return { success: true };
}

// app/components/MultiStepForm.js
'use client'

import { saveStep1, saveStep2, finalizeForm } from '@/app/actions/multistep';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [step1State, step1Action] = useFormState(saveStep1, null);
  const [step2State, step2Action] = useFormState(saveStep2, null);
  const [finalState, finalAction] = useFormState(finalizeForm, null);
  
  return (
    <>
      {step === 1 && (
        <form action={step1Action}>
          <h2>Step 1: Personal Information</h2>
          <input name="name" required />
          <input name="email" type="email" required />
          {step1State?.success && (
            <button type="button" onClick={() => setStep(2)}>
              Next Step
            </button>
          )}
        </form>
      )}
      
      {step === 2 && (
        <form action={step2Action}>
          <h2>Step 2: Additional Info</h2>
          <input name="age" type="number" />
          <input name="address" />
          <button type="button" onClick={() => setStep(1)}>Previous</button>
          {step2State?.success && (
            <button type="button" onClick={() => setStep(3)}>
              Next Step
            </button>
          )}
        </form>
      )}
      
      {step === 3 && (
        <form action={finalAction}>
          <h2>Step 3: Final Submission</h2>
          <button type="submit">Submit</button>
          {finalState?.success && (
            <p>Form submitted successfully!</p>
          )}
        </form>
      )}
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b4/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B4.1 Server Actions Basics
          </Link>
          <Link
            href="/learn/app-router/b4/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B4.3 Server Actions Patterns →
          </Link>
        </div>
      </div>
    </div>
  );
}
