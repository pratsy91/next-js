import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B4.1: Server Actions Basics - Next.js Mastery",
  description: "Complete guide to Server Actions basics in Next.js App Router",
};

export default function Lesson1Page() {
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
          B4.1: Server Actions Basics
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn the fundamentals of Server Actions: the 'use server' directive,
          creating Server Action functions, handling async operations, error
          handling, and TypeScript types.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: 'use server' directive */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. 'use server' Directive
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              'use server'
            </code>{" "}
            directive marks a file or function as a Server Action. It tells
            Next.js that this code should run on the server, not the client.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            File-Level Directive
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Place{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              'use server'
            </code>{" "}
            at the top of a file to mark all exported functions as Server
            Actions.
          </p>
          <CodeBlock
            code={`// app/actions.js
'use server'

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Server-side logic
  await saveUser({ name, email });
  
  return { success: true };
}

export async function deleteUser(userId) {
  await removeUser(userId);
  return { success: true };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Function-Level Directive
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            You can also mark individual functions as Server Actions by placing
            the directive at the top of the function body.
          </p>
          <CodeBlock
            code={`// app/components/UserForm.js
'use client'

import { updateUser } from './actions';

export function UserForm() {
  async function handleSubmit(formData) {
    'use server'
    
    const name = formData.get('name');
    await updateUser(name);
  }
  
  return (
    <form action={handleSubmit}>
      <input name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}`}
            language="javascript"
          />

          <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> Function-level Server Actions can only be
              used in Client Components. They must be defined inline, not
              imported.
            </p>
          </div>
        </section>

        {/* Section 2: Server Action Functions */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Server Action Functions
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions are async functions that run on the server. They can
            be called from Client Components, Server Components, or form
            actions.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Server Action
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function createUser(name, email) {
  // This runs on the server
  const user = await db.user.create({
    data: { name, email }
  });
  
  return user;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server Action with FormData
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions can receive FormData objects directly from forms.
          </p>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const age = parseInt(formData.get('age'));
  
  // Validate
  if (!name || !email) {
    return { error: 'Name and email are required' };
  }
  
  const user = await db.user.create({
    data: { name, email, age }
  });
  
  return { success: true, user };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server Action with Multiple Parameters
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function updateUser(userId, updates) {
  const user = await db.user.update({
    where: { id: userId },
    data: updates
  });
  
  return user;
}

// Usage in Client Component
'use client'
import { updateUser } from '@/app/actions/user';

export function UserEditor({ userId }) {
  const handleUpdate = async () => {
    await updateUser(userId, { name: 'New Name' });
  };
  
  return <button onClick={handleUpdate}>Update</button>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Server Action Return Values
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions can return any serializable value. The return value
            is sent back to the client.
          </p>
          <CodeBlock
            code={`// app/actions/data.js
'use server'

export async function getData() {
  const data = await fetch('https://api.example.com/data');
  return await data.json(); // Can return objects, arrays, etc.
}

export async function processData(input) {
  const result = {
    processed: true,
    timestamp: Date.now(),
    data: input
  };
  
  return result; // Serialized and sent to client
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Async Server Actions */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Async Server Actions
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            All Server Actions are async functions. You can use await to handle
            asynchronous operations like database queries, API calls, and file
            operations.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Database Operations
          </h3>
          <CodeBlock
            code={`// app/actions/posts.js
'use server'

export async function createPost(title, content) {
  // Database query
  const post = await db.post.create({
    data: { title, content, publishedAt: new Date() }
  });
  
  return post;
}

export async function getPosts() {
  const posts = await db.post.findMany({
    orderBy: { publishedAt: 'desc' }
  });
  
  return posts;
}

export async function updatePost(id, data) {
  const post = await db.post.update({
    where: { id },
    data
  });
  
  return post;
}

export async function deletePost(id) {
  await db.post.delete({
    where: { id }
  });
  
  return { success: true };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            API Calls
          </h3>
          <CodeBlock
            code={`// app/actions/api.js
'use server'

export async function fetchExternalData(url) {
  const response = await fetch(url, {
    headers: {
      'Authorization': \`Bearer \${process.env.API_KEY}\`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return await response.json();
}

export async function sendEmail(to, subject, body) {
  const response = await fetch('https://api.email-service.com/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, body })
  });
  
  return await response.json();
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Multiple Async Operations
          </h3>
          <CodeBlock
            code={`// app/actions/complex.js
'use server'

export async function processOrder(orderId) {
  // Run multiple async operations
  const [order, user, inventory] = await Promise.all([
    db.order.findUnique({ where: { id: orderId } }),
    db.user.findUnique({ where: { id: order.userId } }),
    db.inventory.findMany({ where: { orderId } })
  ]);
  
  // Sequential async operations
  await updateInventory(inventory);
  await sendConfirmationEmail(user.email, order);
  await updateOrderStatus(orderId, 'processed');
  
  return { success: true, order };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            File Operations
          </h3>
          <CodeBlock
            code={`// app/actions/files.js
'use server'

import { writeFile, readFile, unlink } from 'fs/promises';
import { join } from 'path';

export async function saveFile(filename, content) {
  const filePath = join(process.cwd(), 'uploads', filename);
  await writeFile(filePath, content);
  return { success: true, path: filePath };
}

export async function readFileContent(filename) {
  const filePath = join(process.cwd(), 'uploads', filename);
  const content = await readFile(filePath, 'utf-8');
  return content;
}

export async function deleteFile(filename) {
  const filePath = join(process.cwd(), 'uploads', filename);
  await unlink(filePath);
  return { success: true };
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Error Handling */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Error Handling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Server Actions should handle errors gracefully. Errors thrown in
            Server Actions are automatically caught and can be handled on the
            client.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Try-Catch Error Handling
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function createUser(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    
    if (!name || !email) {
      return { error: 'Name and email are required' };
    }
    
    const user = await db.user.create({
      data: { name, email }
    });
    
    return { success: true, user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user' };
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Throwing Errors
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            You can throw errors that will be caught by error boundaries or
            handled in the client.
          </p>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function getUser(userId) {
  const user = await db.user.findUnique({
    where: { id: userId }
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
}

// Client-side error handling
'use client'
import { getUser } from '@/app/actions/user';

export function UserProfile({ userId }) {
  const handleGetUser = async () => {
    try {
      const user = await getUser(userId);
      console.log(user);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return <button onClick={handleGetUser}>Load User</button>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Custom Error Objects
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  if (!name) {
    throw new ValidationError('Name is required', 'name');
  }
  
  if (!email || !email.includes('@')) {
    throw new ValidationError('Valid email is required', 'email');
  }
  
  const user = await db.user.create({
    data: { name, email }
  });
  
  return user;
}

// Client-side handling
'use client'
import { createUser } from '@/app/actions/user';

export function UserForm() {
  const handleSubmit = async (formData) => {
    try {
      const user = await createUser(formData);
      console.log('User created:', user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.error(\`Validation error in \${error.field}: \${error.message}\`);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  
  return (
    <form action={handleSubmit}>
      <input name="name" />
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error Response Pattern
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function createUser(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    
    // Validation
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }
    
    // Database operation
    const user = await db.user.create({
      data: { name, email }
    });
    
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'An error occurred'
    };
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: TypeScript Types */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. TypeScript Types
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            TypeScript provides excellent support for Server Actions. You can
            type parameters, return values, and error responses.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic TypeScript Server Action
          </h3>
          <CodeBlock
            code={`// app/actions/user.ts
'use server'

interface CreateUserParams {
  name: string;
  email: string;
  age?: number;
}

interface CreateUserResult {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
}

export async function createUser(
  params: CreateUserParams
): Promise<CreateUserResult> {
  try {
    const user = await db.user.create({
      data: {
        name: params.name,
        email: params.email,
        age: params.age
      }
    });
    
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create user'
    };
  }
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            FormData Types
          </h3>
          <CodeBlock
            code={`// app/actions/user.ts
'use server'

interface UserFormData {
  name: string;
  email: string;
  age: string; // FormData values are always strings
}

export async function createUser(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const age = formData.get('age') as string;
  
  if (!name || !email) {
    return { success: false, error: 'Name and email required' };
  }
  
  await db.user.create({
    data: {
      name,
      email,
      age: age ? parseInt(age) : undefined
    }
  });
  
  return { success: true };
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Generic Server Action Types
          </h3>
          <CodeBlock
            code={`// app/actions/types.ts
'use server'

type ServerAction<TParams, TResult> = (
  params: TParams
) => Promise<TResult>;

type ServerActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// Usage
interface GetUserParams {
  userId: string;
}

type GetUserResult = ServerActionResult<{
  id: string;
  name: string;
  email: string;
}>;

export async function getUser(
  params: GetUserParams
): Promise<GetUserResult> {
  try {
    const user = await db.user.findUnique({
      where: { id: params.userId }
    });
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    return {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to get user'
    };
  }
}`}
            language="typescript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Type-Safe Error Handling
          </h3>
          <CodeBlock
            code={`// app/actions/user.ts
'use server'

class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'AppError';
  }
}

interface CreateUserParams {
  name: string;
  email: string;
}

type CreateUserResponse = 
  | { success: true; userId: string }
  | { success: false; error: string; code: string };

export async function createUser(
  params: CreateUserParams
): Promise<CreateUserResponse> {
  try {
    if (!params.name) {
      throw new AppError('Name is required', 'VALIDATION_ERROR', 400);
    }
    
    if (!params.email.includes('@')) {
      throw new AppError('Invalid email', 'VALIDATION_ERROR', 400);
    }
    
    const user = await db.user.create({
      data: {
        name: params.name,
        email: params.email
      }
    });
    
    return { success: true, userId: user.id };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }
}`}
            language="typescript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b3/lesson-4"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B3.4 Streaming & Suspense
          </Link>
          <Link
            href="/learn/app-router/b4/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B4.2 Form Actions →
          </Link>
        </div>
      </div>
    </div>
  );
}
