import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "V16.6: React 19.2 Integration - Next.js Mastery",
  description: "Learn about React 19.2 features in Next.js 16",
};

export default function Lesson6Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/recent-updates/v16"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Next.js 16 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          V16.6: React 19.2 Integration & Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn about Next.js 16 compatibility with React 19.2, including View
          Transitions API, useEffectEvent, and Activity component.
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            React 19.2 in Next.js 16
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Next.js 16 comes with React 19.2 support, introducing several new
            features and improvements.
          </p>
          <CodeBlock
            code={`// package.json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}

// React 19.2 features available:
// - View Transitions API
// - useEffectEvent() hook
// - <Activity /> component
// - Improved server components
// - Better hydration`}
            language="javascript"
          />
        </section>

        {/* View Transitions API */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. View Transitions API
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Enables smooth client-side page transitions with the browser's View
            Transitions API.
          </p>
          <CodeBlock
            code={`'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function NavigationWithTransitions() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  function handleNavigate(href) {
    startTransition(() => {
      router.push(href);
    });
  }
  
  return (
    <nav>
      <button 
        onClick={() => handleNavigate('/about')}
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Go to About'}
      </button>
    </nav>
  );
}

// With CSS for transitions
// globals.css
@view-transition {
  navigation: auto;
}

/* Smooth transitions between pages */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}`}
            language="javascript"
          />
        </section>

        {/* useEffectEvent */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. useEffectEvent() Hook
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Allows for cleaner effect logic by separating event handlers from
            effect dependencies.
          </p>
          <CodeBlock
            code={`'use client';

import { useEffect, useEffectEvent, useState } from 'react';

export default function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  
  // Event handler that doesn't need to be a dependency
  const onReceiveMessage = useEffectEvent((message) => {
    setMessages(prev => [...prev, message]);
  });
  
  useEffect(() => {
    const connection = connectToServer(roomId);
    
    connection.on('message', onReceiveMessage);
    
    return () => {
      connection.disconnect();
    };
    // onReceiveMessage doesn't need to be in deps
    // because useEffectEvent handles it
  }, [roomId]); // Only roomId is needed
  
  return <div>{/* Messages */}</div>;
}

// Benefits:
// - Cleaner dependency arrays
// - Avoid unnecessary re-runs
// - Better performance
// - Easier to reason about`}
            language="javascript"
          />
        </section>

        {/* Activity Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Activity Component
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Facilitates managing background UI states and async operations.
          </p>
          <CodeBlock
            code={`'use client';

import { Activity, useActivity } from 'react';
import { useState } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState(null);
  const activity = useActivity();
  
  async function fetchData() {
    activity.start();
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } finally {
      activity.finish();
    }
  }
  
  return (
    <Activity.Provider value={activity}>
      <button onClick={fetchData}>Load Data</button>
      {activity.isActive && <div>Loading...</div>}
      {data && <div>{data.content}</div>}
    </Activity.Provider>
  );
}

// Activity helps manage:
// - Loading states
// - Background operations
// - Async task coordination
// - UI state updates`}
            language="javascript"
          />
        </section>

        {/* Improved Server Components */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Improved Server Components
          </h2>
          <CodeBlock
            code={`// Better Server Component support
// app/components/ServerComponent.js
export default async function ServerComponent() {
  // Improved async handling
  const data = await fetchData();
  
  // Better error boundaries
  if (!data) {
    throw new Error('Failed to fetch');
  }
  
  // Enhanced streaming
  return (
    <div>
      {data.items.map(item => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
}

// Benefits:
// - Better error handling
// - Improved streaming performance
// - Enhanced hydration
// - More reliable server rendering`}
            language="javascript"
          />
        </section>

        {/* Migration Considerations */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Migration Considerations
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Automatic upgrade:</strong> Next.js 16 includes React 19.2
              automatically
            </li>
            <li>
              <strong>Breaking changes:</strong> Review React 19 migration guide
              if coming from React 18
            </li>
            <li>
              <strong>New features:</strong> Opt-in to new React 19.2 features
              as needed
            </li>
            <li>
              <strong>Third-party libraries:</strong> Ensure compatibility with
              React 19.2
            </li>
            <li>
              <strong>Testing:</strong> Test thoroughly, especially with complex
              state management
            </li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/recent-updates/v16/lesson-5"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Smart Routing
          </Link>
          <Link
            href="/learn/recent-updates/v16/lesson-7"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: Build Adapters API →
          </Link>
        </div>
      </div>
    </div>
  );
}
