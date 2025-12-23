import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B4.3: Server Actions Patterns - Next.js Mastery",
  description: "Complete guide to Server Actions patterns and best practices",
};

export default function Lesson3Page() {
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
          B4.3: Server Actions Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn advanced patterns for Server Actions: inline actions, action
          files, revalidation, optimistic updates, and error handling patterns.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Inline Server Actions */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Inline Server Actions
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Inline Server Actions are defined directly in Client Components
            using the{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              'use server'
            </code>{" "}
            directive inside the function. They're useful for simple,
            component-specific actions.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Inline Server Action
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

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Inline Action with Parameters
          </h3>
          <CodeBlock
            code={`// app/components/TodoItem.js
'use client'

export default function TodoItem({ todo }) {
  async function toggleTodo() {
    'use server'
    
    await db.todo.update({
      where: { id: todo.id },
      data: { completed: !todo.completed }
    });
    
    revalidatePath('/todos');
  }
  
  async function deleteTodo() {
    'use server'
    
    await db.todo.delete({
      where: { id: todo.id }
    });
    
    revalidatePath('/todos');
  }
  
  return (
    <div>
      <span>{todo.text}</span>
      <form action={toggleTodo}>
        <button type="submit">
          {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
      </form>
      <form action={deleteTodo}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Inline Action with Closure
          </h3>
          <CodeBlock
            code={`// app/components/CommentForm.js
'use client'

export default function CommentForm({ postId }) {
  async function addComment(formData) {
    'use server'
    
    // postId is captured from closure
    const content = formData.get('content');
    
    await db.comment.create({
      data: {
        content,
        postId, // Uses closure value
        createdAt: new Date()
      }
    });
    
    revalidatePath(\`/posts/\${postId}\`);
  }
  
  return (
    <form action={addComment}>
      <textarea name="content" required />
      <button type="submit">Add Comment</button>
    </form>
  );
}`}
            language="javascript"
          />

          <div className="mt-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> Inline Server Actions can only be used in
              Client Components. They cannot be imported or exported. Use them
              for simple, component-specific actions.
            </p>
          </div>
        </section>

        {/* Section 2: Server Action Files */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Server Action Files
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Organize Server Actions in separate files with the{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              'use server'
            </code>{" "}
            directive at the top. This allows you to reuse actions across
            multiple components.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Single Action File
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  const user = await db.user.create({
    data: { name, email }
  });
  
  return user;
}

export async function updateUser(userId, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  const user = await db.user.update({
    where: { id: userId },
    data: { name, email }
  });
  
  return user;
}

export async function deleteUser(userId) {
  await db.user.delete({
    where: { id: userId }
  });
  
  return { success: true };
}

// Usage in components
import { createUser, updateUser, deleteUser } from '@/app/actions/user';`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Organized Action Files by Domain
          </h3>
          <CodeBlock
            code={`// app/actions/users.js
'use server'

export async function createUser(data) { /* ... */ }
export async function getUser(id) { /* ... */ }
export async function updateUser(id, data) { /* ... */ }
export async function deleteUser(id) { /* ... */ }

// app/actions/posts.js
'use server'

export async function createPost(data) { /* ... */ }
export async function getPost(id) { /* ... */ }
export async function updatePost(id, data) { /* ... */ }
export async function deletePost(id) { /* ... */ }

// app/actions/comments.js
'use server'

export async function createComment(data) { /* ... */ }
export async function getComments(postId) { /* ... */ }
export async function deleteComment(id) { /* ... */ }

// Usage
import { createUser } from '@/app/actions/users';
import { createPost } from '@/app/actions/posts';
import { createComment } from '@/app/actions/comments';`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Action File with Shared Utilities
          </h3>
          <CodeBlock
            code={`// app/actions/utils.js
'use server'

// Shared validation
export function validateEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

export function validateRequired(value) {
  return value && value.trim().length > 0;
}

// Shared error handling
export function createErrorResponse(message, code = 'ERROR') {
  return {
    success: false,
    error: message,
    code
  };
}

export function createSuccessResponse(data) {
  return {
    success: true,
    data
  };
}

// app/actions/user.js
'use server'

import { validateEmail, validateRequired, createErrorResponse, createSuccessResponse } from './utils';

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  if (!validateRequired(name)) {
    return createErrorResponse('Name is required', 'VALIDATION_ERROR');
  }
  
  if (!validateEmail(email)) {
    return createErrorResponse('Invalid email', 'VALIDATION_ERROR');
  }
  
  try {
    const user = await db.user.create({
      data: { name, email }
    });
    
    return createSuccessResponse(user);
  } catch (error) {
    return createErrorResponse('Failed to create user', 'DATABASE_ERROR');
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            TypeScript Action Files
          </h3>
          <CodeBlock
            code={`// app/actions/user.ts
'use server'

interface CreateUserParams {
  name: string;
  email: string;
}

interface UserResponse {
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
): Promise<UserResponse> {
  try {
    const user = await db.user.create({
      data: params
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
}

// Usage with type safety
import { createUser } from '@/app/actions/user';

const result = await createUser({
  name: 'John',
  email: 'john@example.com'
});`}
            language="typescript"
          />
        </section>

        {/* Section 3: Revalidation after Actions */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Revalidation after Actions
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            After mutating data with Server Actions, you need to revalidate the
            cache to show updated data. Use{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              revalidatePath
            </code>{" "}
            or{" "}
            <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
              revalidateTag
            </code>{" "}
            to update cached data.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            revalidatePath - Specific Path
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

import { revalidatePath } from 'next/cache';

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  await db.user.create({
    data: { name, email }
  });
  
  // Revalidate the users page
  revalidatePath('/users');
  
  return { success: true };
}

export async function updateUser(userId, formData) {
  const name = formData.get('name');
  
  await db.user.update({
    where: { id: userId },
    data: { name }
  });
  
  // Revalidate specific user page
  revalidatePath(\`/users/\${userId}\`);
  
  // Also revalidate the list page
  revalidatePath('/users');
  
  return { success: true };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            revalidatePath - Layout
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

import { revalidatePath } from 'next/cache';

export async function updateUserProfile(userId, formData) {
  await db.user.update({
    where: { id: userId },
    data: { /* ... */ }
  });
  
  // Revalidate the layout (includes all nested pages)
  revalidatePath('/users', 'layout');
  
  return { success: true };
}

export async function deleteUser(userId) {
  await db.user.delete({
    where: { id: userId }
  });
  
  // Revalidate the entire users section
  revalidatePath('/users', 'layout');
  
  return { success: true };
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            revalidateTag - Tag-Based Revalidation
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

import { revalidateTag } from 'next/cache';

export async function createUser(formData) {
  const user = await db.user.create({
    data: { /* ... */ }
  });
  
  // Revalidate all data tagged with 'users'
  revalidateTag('users');
  
  return { success: true, user };
}

// In your data fetching
export async function getUsers() {
  const users = await fetch('https://api.example.com/users', {
    next: { tags: ['users'] } // Tag the data
  });
  
  return users.json();
}

// Now when createUser runs, it revalidates the getUsers cache`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Combined Revalidation
          </h3>
          <CodeBlock
            code={`// app/actions/post.js
'use server'

import { revalidatePath, revalidateTag } from 'next/cache';

export async function createPost(formData) {
  const post = await db.post.create({
    data: { /* ... */ }
  });
  
  // Revalidate multiple paths
  revalidatePath('/posts');
  revalidatePath('/');
  revalidatePath(\`/posts/\${post.id}\`);
  
  // Revalidate tags
  revalidateTag('posts');
  revalidateTag('feed');
  
  return { success: true, post };
}

export async function updatePost(postId, formData) {
  const post = await db.post.update({
    where: { id: postId },
    data: { /* ... */ }
  });
  
  // Revalidate specific post and list
  revalidatePath(\`/posts/\${postId}\`);
  revalidatePath('/posts');
  revalidateTag('posts');
  
  return { success: true, post };
}`}
            language="javascript"
          />
        </section>

        {/* Section 4: Optimistic Updates */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Optimistic Updates
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Optimistic updates immediately update the UI before the server
            responds, providing instant feedback. If the action fails, you can
            rollback the changes.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Optimistic Update
          </h3>
          <CodeBlock
            code={`// app/components/TodoList.js
'use client'

import { toggleTodo } from '@/app/actions/todo';
import { useState, useTransition } from 'react';

export default function TodoList({ todos: initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [isPending, startTransition] = useTransition();
  
  async function handleToggle(id) {
    // Optimistically update UI
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
    
    // Then update on server
    startTransition(async () => {
      await toggleTodo(id);
    });
  }
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
            disabled={isPending}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Optimistic Update with Rollback
          </h3>
          <CodeBlock
            code={`// app/components/TodoList.js
'use client'

import { toggleTodo } from '@/app/actions/todo';
import { useState, useTransition } from 'react';

export default function TodoList({ todos: initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [isPending, startTransition] = useTransition();
  
  async function handleToggle(id) {
    // Save previous state for rollback
    const previousTodos = todos;
    
    // Optimistically update
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
    
    // Update on server
    startTransition(async () => {
      try {
        const result = await toggleTodo(id);
        
        if (!result.success) {
          // Rollback on error
          setTodos(previousTodos);
        }
      } catch (error) {
        // Rollback on exception
        setTodos(previousTodos);
      }
    });
  }
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
            disabled={isPending}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Optimistic Update with useOptimistic Hook
          </h3>
          <CodeBlock
            code={`// app/components/CommentList.js
'use client'

import { addComment } from '@/app/actions/comments';
import { useOptimistic, useTransition } from 'react';

export default function CommentList({ comments: initialComments }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments,
    (state, newComment) => [
      ...state,
      {
        ...newComment,
        id: 'temp-' + Date.now(),
        pending: true
      }
    ]
  );
  
  const [isPending, startTransition] = useTransition();
  
  async function handleAddComment(formData) {
    const content = formData.get('content');
    
    // Optimistically add comment
    addOptimisticComment({
      content,
      author: 'You',
      createdAt: new Date()
    });
    
    // Add on server
    startTransition(async () => {
      await addComment(formData);
    });
  }
  
  return (
    <div>
      <form action={handleAddComment}>
        <textarea name="content" required />
        <button type="submit" disabled={isPending}>
          Add Comment
        </button>
      </form>
      
      <ul>
        {optimisticComments.map(comment => (
          <li key={comment.id}>
            {comment.pending && <span>(Pending...)</span>}
            <p>{comment.content}</p>
            <small>{comment.author}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Optimistic Delete
          </h3>
          <CodeBlock
            code={`// app/components/PostList.js
'use client'

import { deletePost } from '@/app/actions/posts';
import { useState, useTransition } from 'react';

export default function PostList({ posts: initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [isPending, startTransition] = useTransition();
  
  async function handleDelete(id) {
    // Optimistically remove from UI
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    
    // Delete on server
    startTransition(async () => {
      try {
        const result = await deletePost(id);
        
        if (!result.success) {
          // Re-fetch posts on error
          const updatedPosts = await fetch('/api/posts').then(r => r.json());
          setPosts(updatedPosts);
        }
      } catch (error) {
        // Re-fetch on exception
        const updatedPosts = await fetch('/api/posts').then(r => r.json());
        setPosts(updatedPosts);
      }
    });
  }
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <button
            onClick={() => handleDelete(post.id)}
            disabled={isPending}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Error Handling Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Error Handling Patterns
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Implement consistent error handling patterns across your Server
            Actions for better user experience and debugging.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Standardized Error Response
          </h3>
          <CodeBlock
            code={`// app/actions/utils.js
'use server'

export function createErrorResponse(message, code = 'ERROR', details = null) {
  return {
    success: false,
    error: {
      message,
      code,
      details
    }
  };
}

export function createSuccessResponse(data = null) {
  return {
    success: true,
    data
  };
}

// app/actions/user.js
'use server'

import { createErrorResponse, createSuccessResponse } from './utils';

export async function createUser(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    
    if (!name || !email) {
      return createErrorResponse(
        'Name and email are required',
        'VALIDATION_ERROR',
        { fields: ['name', 'email'] }
      );
    }
    
    const user = await db.user.create({
      data: { name, email }
    });
    
    return createSuccessResponse(user);
  } catch (error) {
    if (error.code === 'P2002') {
      return createErrorResponse(
        'Email already exists',
        'DUPLICATE_EMAIL'
      );
    }
    
    return createErrorResponse(
      'Failed to create user',
      'DATABASE_ERROR',
      { originalError: error.message }
    );
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error Boundary Pattern
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function deleteUser(userId) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    await db.user.delete({
      where: { id: userId }
    });
    
    return { success: true };
  } catch (error) {
    // Log error for debugging
    console.error('Error deleting user:', error);
    
    // Re-throw to be caught by error boundary
    throw error;
  }
}

// Client component with error handling
'use client'

import { deleteUser } from '@/app/actions/user';

export function DeleteUserButton({ userId }) {
  async function handleDelete() {
    try {
      await deleteUser(userId);
      // Success handling
    } catch (error) {
      // Error handling
      console.error('Failed to delete user:', error);
      alert('Failed to delete user. Please try again.');
    }
  }
  
  return <button onClick={handleDelete}>Delete</button>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Retry Pattern
          </h3>
          <CodeBlock
            code={`// app/actions/utils.js
'use server'

export async function retryAction(action, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await action();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

// app/actions/api.js
'use server'

import { retryAction } from './utils';

export async function fetchExternalData(url) {
  return retryAction(async () => {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return await response.json();
  });
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Validation Error Pattern
          </h3>
          <CodeBlock
            code={`// app/actions/user.js
'use server'

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const age = formData.get('age');
  
  const errors = {};
  
  // Validate name
  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  // Validate email
  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    errors.email = 'Invalid email format';
  }
  
  // Validate age
  if (age) {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      errors.age = 'Age must be between 0 and 120';
    }
  }
  
  // Return validation errors if any
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      error: 'Validation failed'
    };
  }
  
  // Proceed with creation
  try {
    const user = await db.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        age: age ? parseInt(age) : null
      }
    });
    
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create user',
      errors: {}
    };
  }
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Error Logging Pattern
          </h3>
          <CodeBlock
            code={`// app/actions/utils.js
'use server'

export function logError(error, context) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
    console.error('Context:', context);
  }
  
  // In production, send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Sentry, LogRocket, etc.
    // errorTracking.captureException(error, { extra: context });
  }
}

// app/actions/user.js
'use server'

import { logError } from './utils';

export async function createUser(formData) {
  try {
    const user = await db.user.create({
      data: { /* ... */ }
    });
    
    return { success: true, user };
  } catch (error) {
    logError(error, {
      action: 'createUser',
      formData: Object.fromEntries(formData)
    });
    
    return {
      success: false,
      error: 'Failed to create user. Please try again.'
    };
  }
}`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b4/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B4.2 Form Actions
          </Link>
          <Link
            href="/learn/app-router/b5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B5 Route Handlers →
          </Link>
        </div>
      </div>
    </div>
  );
}
