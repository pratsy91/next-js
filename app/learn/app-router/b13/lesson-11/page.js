import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B13.11: Debugging Code Questions & Solutions - Next.js Mastery",
  description:
    "Master React & Next.js debugging with real interview questions and solutions",
};

export default function Lesson11Page() {
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
          B13.11: Debugging Code Questions & Solutions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive collection of React & Next.js debugging scenarios with
          detailed explanations. Master common interview debugging questions.
        </p>
      </div>

      <div className="space-y-8">
        {/* Question 1: Using Hooks in Server Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 1: Using Hooks in Server Component
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              The code will throw an error: "React Hooks can only be called
              inside of the body of a function component"
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              React hooks (useState, useEffect, etc.) can only be used in Client
              Components. Server Components run on the server and don't have
              access to browser APIs or React hooks. The component is missing
              the{" "}
              <code className="rounded bg-red-100 px-1 py-0.5 dark:bg-red-800">
                'use client'
              </code>{" "}
              directive, so Next.js treats it as a Server Component by default.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/page.js
import { useState, useEffect } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Add the{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                'use client'
              </code>{" "}
              directive at the top of the file to make it a Client Component.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
// app/page.js
'use client'; // Add this directive

import { useState, useEffect } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Question 2: Async Server Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 2: Async Function Missing Await
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              The component returns a Promise object instead of JSX. You'll see
              [object Promise] rendered or an error.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              When you mark a Server Component as{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                async
              </code>
              , the function returns a Promise. If you use{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                await
              </code>{" "}
              inside but forget to await the fetch call or return the Promise
              directly, React receives a Promise instead of JSX. The component
              needs to await all async operations before returning JSX.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/products/page.js
export default async function ProductsPage() {
  const response = fetch('https://api.example.com/products');
  const products = response.json(); // Missing await!
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Add{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                await
              </code>{" "}
              to both the fetch call and the json() call.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
// app/products/page.js
export default async function ProductsPage() {
  const response = await fetch('https://api.example.com/products');
  const products = await response.json();
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Question 3: useEffect Missing Dependencies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 3: useEffect Missing Dependencies
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              The effect will only run once, and the count displayed will always
              be the initial value. When the button is clicked, the effect won't
              re-run to update the display.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              The{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useEffect
              </code>{" "}
              hook has an empty dependency array{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                []
              </code>
              , so it only runs once after the initial render. When{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                count
              </code>{" "}
              changes, the effect doesn't re-run because{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                count
              </code>{" "}
              is not in the dependency array. This creates a stale closure where
              the effect captures the initial value of count.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, []); // Missing 'count' in dependencies!
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Add{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                count
              </code>{" "}
              to the dependency array so the effect runs whenever count changes.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
'use client';
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]); // Add 'count' to dependencies
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Question 4: Event Handler in Server Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 4: Event Handler in Server Component
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Event handlers cannot be passed to Client Component props
              from Server Component" or the button won't work.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Server Components cannot handle browser events because they run on
              the server where there's no DOM or event system. The{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                onClick
              </code>{" "}
              handler is a browser event, but Server Components render on the
              server before sending HTML to the browser. You cannot pass event
              handlers or functions as props from Server Components to Client
              Components.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/page.js (Server Component)
import Button from './Button';

export default function Page() {
  const handleClick = () => {
    console.log('Clicked!');
  };
  
  return <Button onClick={handleClick}>Click me</Button>;
}

// Button.js (Client Component)
'use client';
export default function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Move the event handler into the Client Component, or make the
              parent component a Client Component if it needs interactivity.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Handler in Client Component
// app/page.js (Server Component)
import Button from './Button';

export default function Page() {
  return <Button>Click me</Button>;
}

// Button.js (Client Component)
'use client';
export default function Button({ children }) {
  const handleClick = () => {
    console.log('Clicked!');
  };
  
  return <button onClick={handleClick}>{children}</button>;
}

// ✅ ALTERNATIVE: Make parent a Client Component
// app/page.js
'use client';
import Button from './Button';

export default function Page() {
  const handleClick = () => {
    console.log('Clicked!');
  };
  
  return <Button onClick={handleClick}>Click me</Button>;
}`}
            language="javascript"
          />
        </section>

        {/* Question 5: Hydration Mismatch */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 5: Hydration Mismatch Error
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Warning: "Hydration failed because the initial UI does not match
              what was rendered on the server". The component will re-render to
              fix the mismatch.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              The HTML rendered on the server doesn't match what React renders
              on the client during hydration. In this case,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                Date.now()
              </code>{" "}
              generates different values on the server and client, causing a
              mismatch. Server Components render once on the server with one
              timestamp, but when the client hydrates, it generates a new
              timestamp, causing React to detect different content.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
export default function Timestamp() {
  return <div>Current time: {Date.now()}</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                useState
              </code>{" "}
              and{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                useEffect
              </code>{" "}
              to set the timestamp only on the client side, or suppress
              hydration warnings with{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                suppressHydrationWarning
              </code>{" "}
              if the mismatch is intentional.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Client-only rendering
'use client';
import { useState, useEffect } from 'react';

export default function Timestamp() {
  const [time, setTime] = useState(null);
  
  useEffect(() => {
    setTime(Date.now());
  }, []);
  
  if (time === null) return <div>Loading...</div>;
  
  return <div>Current time: {time}</div>;
}

// ✅ FIXED CODE - Option 2: Suppress hydration warning (if intentional)
'use client';
export default function Timestamp() {
  return (
    <div suppressHydrationWarning>
      Current time: {Date.now()}
    </div>
  );
}

// ✅ FIXED CODE - Option 3: Server Component with static time
// app/page.js
export default function Page() {
  const time = new Date().toISOString(); // Same on server and initial render
  return <div>Page loaded at: {time}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Question 6: useState with Function Initializer */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 6: useState Initialization Performance Issue
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              The expensive calculation runs on every render, causing
              performance issues. The component re-calculates the initial value
              unnecessarily.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              When you pass a value directly to{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useState
              </code>
              , React uses that value only for the initial render. However, if
              the value comes from a function call or expensive computation,
              that function runs on every render (including re-renders), even
              though React only uses the result on the first render. This is
              inefficient for expensive operations.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useState } from 'react';

function expensiveCalculation() {
  console.log('Running expensive calculation...');
  // Expensive operation
  return Array.from({ length: 1000000 }, (_, i) => i).reduce((a, b) => a + b);
}

export default function Component() {
  // Runs on EVERY render, not just the first!
  const [value, setValue] = useState(expensiveCalculation());
  
  return <div>Value: {value}</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Pass a function to{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                useState
              </code>{" "}
              instead of calling the function. React will only call the function
              on the initial render.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
'use client';
import { useState } from 'react';

function expensiveCalculation() {
  console.log('Running expensive calculation...');
  // Expensive operation
  return Array.from({ length: 1000000 }, (_, i) => i).reduce((a, b) => a + b);
}

export default function Component() {
  // Function is only called on initial render
  const [value, setValue] = useState(() => expensiveCalculation());
  
  return <div>Value: {value}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Question 7: setState with Previous Value */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 7: Incorrect State Update in Loop
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Clicking the button only increments the count by 1 instead of 3.
              The state updates don't accumulate as expected.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              State updates in React are asynchronous and batched. When you call{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                setCount(count + 1)
              </code>{" "}
              three times in a loop, all three calls use the same initial value
              of{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                count
              </code>{" "}
              (stale closure). React batches these updates, but they all compute
              based on the same starting value, resulting in only +1 instead of
              +3. You need to use the functional update form to get the previous
              state.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    // All three calls use the same 'count' value (stale closure)
    for (let i = 0; i < 3; i++) {
      setCount(count + 1); // Uses stale 'count' value
    }
    // Result: count only increases by 1, not 3
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Add 3</button>
    </div>
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use the functional update form of{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                setState
              </code>{" "}
              that receives the previous state as a parameter.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    // Functional update receives previous state
    for (let i = 0; i < 3; i++) {
      setCount(prevCount => prevCount + 1);
    }
    // Result: count increases by 3
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Add 3</button>
    </div>
  );
}

// ✅ ALTERNATIVE: Update once with the final value
const handleClick = () => {
  setCount(count + 3); // Simple case
};

// ✅ ALTERNATIVE: Multiple updates with functional form
const handleClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};`}
            language="javascript"
          />
        </section>

        {/* Question 8: Missing Key in List */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 8: Missing Key Prop in List
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Warning: "Each child in a list should have a unique 'key' prop".
              Items may not update correctly when the list changes, causing UI
              bugs.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              React uses the{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                key
              </code>{" "}
              prop to identify which items have changed, been added, or removed
              in a list. Without keys, React can't efficiently update the DOM
              when list items change. When you reorder, add, or remove items,
              React may update the wrong elements, causing state bugs, lost
              input focus, or performance issues. Keys should be stable, unique,
              and predictable.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
export default function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li>{todo.text}</li> // Missing key prop!
      ))}
    </ul>
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Add a unique{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                key
              </code>{" "}
              prop using a stable identifier (preferably an ID from your data,
              not the array index).
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
'use client';
export default function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li> // Use stable ID
      ))}
    </ul>
  );
}

// ✅ If no ID exists, use index (not ideal but acceptable if list is stable)
{todos.map((todo, index) => (
  <li key={index}>{todo.text}</li>
))}

// ⚠️ NEVER use index if items can be reordered, added, or removed dynamically`}
            language="javascript"
          />
        </section>

        {/* Question 9: useEffect Infinite Loop */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 9: useEffect Infinite Loop
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              The component re-renders infinitely, causing performance issues
              and potential browser crashes. The API is called repeatedly.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              The{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useEffect
              </code>{" "}
              has{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                data
              </code>{" "}
              in its dependency array. When the effect runs, it calls{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                setData
              </code>
              , which updates{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                data
              </code>
              . This triggers the effect again because{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                data
              </code>{" "}
              changed, creating an infinite loop. The fetched data object is new
              on every fetch, so even if the content is the same, the reference
              changes, triggering re-renders.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data)); // Updates 'data', triggering effect again!
  }, [data]); // 'data' in dependencies causes infinite loop
  
  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Remove{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                data
              </code>{" "}
              from the dependency array if you only want to fetch once on mount,
              or use an empty dependency array for one-time fetching.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Fetch once on mount
'use client';
import { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array = run once on mount
  
  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}

// ✅ If you need to re-fetch based on a parameter, use that parameter
export default function DataFetcher({ id }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(\`/api/data/\${id}\`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [id]); // Re-fetch when 'id' changes, not when 'data' changes
}`}
            language="javascript"
          />
        </section>

        {/* Question 10: Server Action Not Marked */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 10: Server Action Missing 'use server'
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Only async functions are allowed to be exported from a
              Server Actions file" or the function doesn't work as a Server
              Action.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Server Actions must be marked with the{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                'use server'
              </code>{" "}
              directive at the top of the file or at the function level. Without
              this directive, Next.js doesn't know the function should run on
              the server. The directive creates a server-client boundary and
              ensures the function code never gets bundled and sent to the
              client. When used in a file with other code, you need the
              directive at the top of the file.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/actions.js
export async function createPost(formData) {
  'use server'; // Wrong location!
  
  const title = formData.get('title');
  await db.post.create({ data: { title } });
}

// ❌ OR this broken version
// app/actions.js
export async function createPost(formData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
} // Missing 'use server' entirely`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Add{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                'use server'
              </code>{" "}
              at the top of the file (for all exports) or at the function level
              (for individual functions).
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - At file level (all exports are Server Actions)
// app/actions.js
'use server'; // At the top of the file

export async function createPost(formData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
}

export async function deletePost(id) {
  await db.post.delete({ where: { id } });
}

// ✅ FIXED CODE - At function level (individual Server Action)
// app/actions.js
export async function createPost(formData) {
  'use server'; // At function level
  
  const title = formData.get('title');
  await db.post.create({ data: { title } });
}

// ✅ For inline Server Actions in Client Components
'use client';
export default function Form() {
  async function handleSubmit(formData) {
    'use server'; // Inline Server Action
    
    const title = formData.get('title');
    await createPost(title);
  }
  
  return <form action={handleSubmit}>...</form>;
}`}
            language="javascript"
          />
        </section>

        {/* Question 11: Dynamic Import Missing Default */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 11: Dynamic Import with Named Export
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Element type is invalid" or the component doesn't render.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-300">
              When you use{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                dynamic()
              </code>{" "}
              with{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                import()
              </code>
              , it expects a default export by default. If the module uses named
              exports,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                dynamic()
              </code>{" "}
              receives{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                undefined
              </code>{" "}
              as the default export, causing React to fail rendering. You need
              to extract the named export from the module.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// components/Chart.js
export function Chart() { // Named export, not default
  return <div>Chart</div>;
}

// app/page.js
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./components/Chart'));
// Error: Module has no default export`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                .then()
              </code>{" "}
              to extract the named export from the module.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Extract named export
// app/page.js
import dynamic from 'next/dynamic';

const Chart = dynamic(() => 
  import('./components/Chart').then(mod => mod.Chart)
);

export default function Page() {
  return <Chart />;
}

// ✅ FIXED CODE - Option 2: Change to default export
// components/Chart.js
export default function Chart() { // Default export
  return <div>Chart</div>;
}

// app/page.js
const Chart = dynamic(() => import('./components/Chart'));`}
            language="javascript"
          />
        </section>

        {/* Question 12: Route Handler Wrong Export */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 12: Route Handler Wrong Export Name
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Route Handlers must export one of the following HTTP
              methods" or 405 Method Not Allowed error.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Route Handlers in App Router use named exports for HTTP methods
              (GET, POST, PUT, DELETE, PATCH, etc.). The function name must
              match exactly - it's case-sensitive. Using{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                Get
              </code>{" "}
              instead of{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                GET
              </code>
              , or{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                handleGet
              </code>{" "}
              instead of{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                GET
              </code>
              , won't work. Next.js specifically looks for these exact named
              exports to map HTTP methods to handler functions.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/api/users/route.js
import { NextResponse } from 'next/server';

export async function handleGet(request) { // Wrong name!
  return NextResponse.json({ users: [] });
}

// ❌ OR this
export async function Get(request) { // Wrong case!
  return NextResponse.json({ users: [] });
}

// ❌ OR this
export default async function handler(request) { // Default export!
  return NextResponse.json({ users: [] });
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use the exact HTTP method name as a named export:{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                GET
              </code>
              ,{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                POST
              </code>
              , etc. (all uppercase).
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
// app/api/users/route.js
import { NextResponse } from 'next/server';

export async function GET(request) { // Correct: exact name, uppercase
  return NextResponse.json({ users: [] });
}

export async function POST(request) { // Multiple methods in one file
  const body = await request.json();
  return NextResponse.json({ created: true }, { status: 201 });
}

// ✅ Allowed HTTP methods:
// GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS`}
            language="javascript"
          />
        </section>

        {/* Question 13: useSearchParams Without Suspense */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 13: useSearchParams Causing Suspense Boundary Error
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "useSearchParams() should be wrapped in a suspense boundary
              at page" or the page fails to render.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useSearchParams()
              </code>{" "}
              can cause the component to suspend during rendering because search
              params are not available during static rendering. Next.js requires
              components that use{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useSearchParams()
              </code>{" "}
              to be wrapped in a Suspense boundary to handle the loading state.
              Without Suspense, Next.js can't properly handle the async nature
              of reading search parameters during static generation.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams(); // Needs Suspense!
  const query = searchParams.get('q');
  
  return <div>Searching for: {query}</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Wrap the component using{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                useSearchParams()
              </code>{" "}
              in a Suspense boundary with a fallback.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Wrap in Suspense
'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  return <div>Searching for: {query}</div>;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

// ✅ FIXED CODE - Option 2: In parent layout/page
export default function Layout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Question 14: Image Missing Width/Height */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 14: next/image Missing Required Props
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Image with src '/image.jpg' must use 'width' and 'height'
              properties or 'fill' property"
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Next.js Image component requires explicit dimensions to prevent
              layout shift (Cumulative Layout Shift - CLS). Without width and
              height, the browser can't reserve space for the image before it
              loads, causing content to jump when the image loads. The{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                next/image
              </code>{" "}
              component requires either{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                width
              </code>{" "}
              and{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                height
              </code>{" "}
              props, or the{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                fill
              </code>{" "}
              prop for responsive images that fill their container.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
import Image from 'next/image';

export default function Page() {
  return (
    <Image 
      src="/hero.jpg" 
      alt="Hero image"
      // Missing width and height!
    />
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Add{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                width
              </code>{" "}
              and{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                height
              </code>{" "}
              props, or use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                fill
              </code>{" "}
              for responsive images.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Fixed dimensions
import Image from 'next/image';

export default function Page() {
  return (
    <Image 
      src="/hero.jpg" 
      alt="Hero image"
      width={800}
      height={600}
    />
  );
}

// ✅ FIXED CODE - Option 2: Fill container (responsive)
import Image from 'next/image';

export default function Page() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Image 
        src="/hero.jpg" 
        alt="Hero image"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Question 15: RevalidatePath in Client Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 15: Using Revalidation Functions in Client Component
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "revalidatePath only works in Server Components, Server
              Actions, and Route Handlers" or the cache doesn't update.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Cache revalidation functions like{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                revalidatePath()
              </code>{" "}
              and{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                revalidateTag()
              </code>{" "}
              must run on the server because they manipulate server-side cache.
              Client Components run in the browser and don't have access to
              Next.js server-side cache APIs. These functions can only be called
              from Server Components, Server Actions, or Route Handlers where
              they have access to the server runtime.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { revalidatePath } from 'next/cache';

export default function DeleteButton({ id }) {
  const handleDelete = async () => {
    await deleteItem(id);
    revalidatePath('/items'); // Can't use this in Client Component!
  };
  
  return <button onClick={handleDelete}>Delete</button>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Move the revalidation logic to a Server Action, then call that
              Server Action from the Client Component.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
// app/actions.js
'use server';

import { revalidatePath } from 'next/cache';

export async function deleteItem(id) {
  await db.item.delete({ where: { id } });
  revalidatePath('/items'); // Revalidation in Server Action
}

// app/components/DeleteButton.js
'use client';
import { deleteItem } from '@/app/actions';

export default function DeleteButton({ id }) {
  const handleDelete = async () => {
    await deleteItem(id); // Call Server Action
  };
  
  return <button onClick={handleDelete}>Delete</button>;
}

// ✅ ALTERNATIVE: Use router.refresh() for client-side refresh
'use client';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }) {
  const router = useRouter();
  
  const handleDelete = async () => {
    await deleteItem(id);
    router.refresh(); // Refresh current route
  };
  
  return <button onClick={handleDelete}>Delete</button>;
}`}
            language="javascript"
          />
        </section>

        {/* Question 16: Object as Child */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 16: Rendering Objects as Children
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Objects are not valid as a React child" or "[object
              Object]" rendered.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              React can only render primitives (strings, numbers) or React
              elements as children. When you try to render an object directly,
              React doesn't know how to display it and throws an error. Objects
              must be converted to strings (using JSON.stringify) or you need to
              render specific properties of the object. This commonly happens
              when accidentally passing an object instead of a property value,
              or when trying to render API response data directly.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
export default function UserProfile({ user }) {
  return (
    <div>
      <h1>{user}</h1> {/* 'user' is an object! */}
      <p>{user}</p> {/* Can't render object directly */}
    </div>
  );
}

// Usage: <UserProfile user={{ name: 'John', age: 30 }} />`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Render specific properties of the object, or use JSON.stringify
              for debugging.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Render specific properties
'use client';
export default function UserProfile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1> {/* Render specific property */}
      <p>Age: {user.age}</p>
    </div>
  );
}

// ✅ For debugging: stringify the object
<div>
  <pre>{JSON.stringify(user, null, 2)}</pre>
</div>`}
            language="javascript"
          />
        </section>

        {/* Question 17: Conditional Hook */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 17: Conditional Hook Call
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "React Hooks must be called in the exact same order in
              every component render" or "Rendered fewer hooks than expected".
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              React Hooks must be called in the same order on every render.
              React relies on the order of hook calls to maintain state between
              renders. When you conditionally call a hook (inside an if
              statement, loop, or after an early return), the order of hook
              calls changes between renders, breaking React's internal state
              management. This is a fundamental rule of hooks: hooks must always
              be called at the top level of your component, never conditionally.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useState, useEffect } from 'react';

export default function Component({ shouldFetch }) {
  const [data, setData] = useState(null);
  
  if (shouldFetch) {
    useEffect(() => { // Hook called conditionally!
      fetch('/api/data')
        .then(res => res.json())
        .then(setData);
    }, []);
  }
  
  return <div>{data ? data.name : 'No data'}</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Always call hooks at the top level. Use conditional logic inside
              the hook instead.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
'use client';
import { useState, useEffect } from 'react';

export default function Component({ shouldFetch }) {
  const [data, setData] = useState(null);
  
  // Always call hook, use conditional logic inside
  useEffect(() => {
    if (shouldFetch) {
      fetch('/api/data')
        .then(res => res.json())
        .then(setData);
    }
  }, [shouldFetch]); // Add shouldFetch to dependencies
  
  return <div>{data ? data.name : 'No data'}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Question 18: Async useEffect */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 18: Async Function in useEffect
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Warning about cleanup function or the effect doesn't work as
              expected. The async operation may not be properly handled.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              The{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useEffect
              </code>{" "}
              callback cannot be an async function directly because async
              functions always return a Promise, and useEffect expects either
              nothing or a cleanup function (which returns void or a function).
              If you make the effect callback async, React receives a Promise
              instead of a cleanup function, causing issues. Additionally,
              errors in async operations won't be caught properly.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useEffect } from 'react';

export default function Component() {
  useEffect(async () => { // Can't be async!
    const data = await fetch('/api/data').then(r => r.json());
    setData(data);
  }, []);
  
  return <div>...</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Create an async function inside the effect and call it, or use
              .then() chains.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Async function inside
'use client';
import { useEffect, useState } from 'react';

export default function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
    }
    
    fetchData();
  }, []);
  
  return <div>{data ? data.name : 'Loading...'}</div>;
}

// ✅ FIXED CODE - Option 2: Using .then()
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData)
    .catch(error => console.error(error));
}, []);`}
            language="javascript"
          />
        </section>

        {/* Question 19: Reading SearchParams in Server Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 19: Reading searchParams Without Proper Handling
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              The page may not show dynamic content, or searchParams might be
              undefined. Dynamic rendering may not work as expected.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              In App Router, when you use{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                searchParams
              </code>{" "}
              in a Server Component, Next.js opts that route into dynamic
              rendering. However,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                searchParams
              </code>{" "}
              is only available in page components, not in layout components. If
              you try to access it incorrectly or in the wrong component type,
              it will be undefined. Also, searchParams is a Promise in async
              Server Components in Next.js 15+.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/products/page.js
export default function ProductsPage({ searchParams }) {
  const category = searchParams.category; // May be undefined or wrong type
  const products = fetchProducts(category);
  
  return <div>{products.map(...)}</div>;
}

// ❌ OR trying to use in layout
// app/layout.js
export default function Layout({ children, searchParams }) {
  // searchParams is undefined in layouts!
  return <div>{children}</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Access searchParams correctly in page components. In Next.js 15+,
              await searchParams if the component is async. Always handle
              undefined values.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Next.js 14
// app/products/page.js
export default function ProductsPage({ searchParams }) {
  const category = searchParams?.category || 'all'; // Handle undefined
  const products = await fetchProducts(category);
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// ✅ FIXED CODE - Next.js 15+ (searchParams is Promise)
export default async function ProductsPage({ searchParams }) {
  const params = await searchParams; // Await the Promise
  const category = params?.category || 'all';
  const products = await fetchProducts(category);
  
  return <div>{products.map(...)}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Question 20: Stale Closure in Callback */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 20: Stale Closure in Event Handler
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              The alert always shows the initial value (0), even after clicking
              multiple times. The callback uses a stale value of count.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              The{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useEffect
              </code>{" "}
              creates a closure over the initial value of{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                count
              </code>{" "}
              (0). When the timeout callback runs, it still references the old
              value from when the effect ran, not the current value. This is a
              stale closure - the function "remembers" old values from when it
              was created. Since{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                count
              </code>{" "}
              is not in the dependency array, the effect doesn't re-run when
              count changes, so the closure never updates.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useState, useEffect } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      alert(count); // Always alerts 0 (stale closure!)
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []); // Missing 'count' in dependencies
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Add{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                count
              </code>{" "}
              to dependencies, or use a ref to always get the current value, or
              restructure to avoid the stale closure.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Add to dependencies
'use client';
import { useState, useEffect } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      alert(count); // Uses current count
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [count]); // Add count to dependencies
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ✅ FIXED CODE - Option 2: Use ref for latest value
import { useState, useEffect, useRef } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  
  useEffect(() => {
    countRef.current = count; // Always update ref
  }, [count]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      alert(countRef.current); // Always gets latest value
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []); // Empty deps, but uses ref
}`}
            language="javascript"
          />
        </section>

        {/* Question 21: Accessing Cookies in Server Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 21: Accessing Cookies Incorrectly
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "cookies() can only be used in Server Components" or
              cookies returns undefined.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              The{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                cookies()
              </code>{" "}
              function from{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                next/headers
              </code>{" "}
              can only be used in Server Components, Server Actions, and Route
              Handlers. It cannot be used in Client Components because cookies
              are part of the HTTP request that only exists on the server. If
              you try to use it in a Client Component, you'll get an error.
              Also, cookies() must be called synchronously, not inside async
              callbacks.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - In Client Component
'use client';
import { cookies } from 'next/headers';

export default function Component() {
  const cookieStore = cookies(); // Error: can only be used in Server Components!
  const token = cookieStore.get('token');
  
  return <div>Token: {token}</div>;
}

// ❌ OR accessing inside async callback
export default async function Component() {
  await someAsyncOperation();
  const cookieStore = cookies(); // May not work correctly
  return <div>...</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use cookies() only in Server Components, and call it at the top
              level, not inside async operations.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Server Component
// app/page.js (Server Component, no 'use client')
import { cookies } from 'next/headers';

export default function Page() {
  const cookieStore = cookies(); // Works in Server Component
  const token = cookieStore.get('token');
  
  return <div>Token: {token?.value || 'Not found'}</div>;
}

// ✅ For Client Components, pass cookies from Server Component
// app/page.js
import ClientComponent from './ClientComponent';
import { cookies } from 'next/headers';

export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  
  return <ClientComponent token={token} />;
}

// ClientComponent.js
'use client';
export default function ClientComponent({ token }) {
  return <div>Token: {token}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Question 22: Metadata in Client Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 22: Exporting Metadata from Client Component
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Warning: "export 'metadata' is not supported in Client Components"
              or metadata doesn't work.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              The Metadata API (exporting{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                metadata
              </code>{" "}
              or{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                generateMetadata
              </code>
              ) only works in Server Components because metadata is injected
              into the HTML document head during server-side rendering. Client
              Components render in the browser after the HTML is already sent,
              so they can't modify the document head that way. Metadata must be
              defined in Server Components (pages or layouts).
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
export const metadata = { // Can't export metadata from Client Component!
  title: 'My Page',
  description: 'Page description',
};

export default function Page() {
  return <div>Content</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Remove 'use client' to make it a Server Component, or define
              metadata in a parent Server Component.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Make it a Server Component
// app/page.js (no 'use client')
export const metadata = {
  title: 'My Page',
  description: 'Page description',
};

export default function Page() {
  return <div>Content</div>;
}

// ✅ FIXED CODE - Option 2: Metadata in parent Server Component
// app/layout.js (Server Component)
export const metadata = {
  title: 'My App',
  description: 'App description',
};

// app/page.js
'use client';
export default function Page() {
  return <div>Content</div>;
  // Metadata comes from layout
}

// ✅ FIXED CODE - Option 3: Use next/head in Client Component (legacy)
'use client';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>My Page</title>
        <meta name="description" content="Page description" />
      </Head>
      <div>Content</div>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Question 23: useFormState with Wrong Signature */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 23: useFormState Server Action Signature Mismatch
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Server Action signature mismatch" or the form doesn't
              submit correctly. State doesn't update after form submission.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              When using{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useFormState
              </code>
              , the Server Action must accept{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                prevState
              </code>{" "}
              as the first parameter, followed by{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                formData
              </code>
              . This allows React to manage the form state and pass the previous
              state between submissions. If the Server Action doesn't have this
              signature,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useFormState
              </code>{" "}
              can't properly manage state transitions, causing the form to not
              update correctly.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useFormState } from 'react-dom';
import { createPost } from './actions';

const initialState = { message: null };

export default function Form() {
  const [state, formAction] = useFormState(createPost, initialState);
  // Server Action doesn't match useFormState signature!
  
  return (
    <form action={formAction}>
      <input name="title" />
      <button type="submit">Submit</button>
    </form>
  );
}

// actions.js
'use server';
export async function createPost(formData) { // Missing prevState parameter!
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  return { message: 'Created!' };
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Update the Server Action to accept{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                prevState
              </code>{" "}
              as the first parameter.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
'use client';
import { useFormState } from 'react-dom';
import { createPost } from './actions';

const initialState = { message: null, errors: {} };

export default function Form() {
  const [state, formAction] = useFormState(createPost, initialState);
  
  return (
    <form action={formAction}>
      <input name="title" />
      {state.errors?.title && <p>{state.errors.title}</p>}
      {state.message && <p>{state.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

// actions.js
'use server';
export async function createPost(prevState, formData) { // Add prevState parameter!
  const title = formData.get('title');
  
  if (!title) {
    return {
      message: 'Title required',
      errors: { title: 'Title is required' },
    };
  }
  
  await db.post.create({ data: { title } });
  return { message: 'Created!', errors: {} };
}`}
            language="javascript"
          />
        </section>

        {/* Question 24: Multiple Root Elements */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 24: Multiple Root Elements (React 17 and earlier)
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Adjacent JSX elements must be wrapped in an enclosing tag"
              (React 17 and earlier) or components must return a single element.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              React components must return a single root element. In React 17
              and earlier, you couldn't return multiple sibling elements without
              wrapping them. This is because React.createElement() expects a
              single element. React 18+ supports fragments natively, but if
              you're using an older version or have strict linting rules, you'll
              get this error. The JSX transform in React 17 also doesn't
              automatically handle fragments the way React 18+ does.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE (React 17 and earlier)
export default function Component() {
  return (
    <div>First</div>
    <div>Second</div> // Error: Adjacent elements!
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Wrap multiple elements in a parent element or React Fragment.
              React 18+ supports multiple root elements in some cases.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Fragment
import { Fragment } from 'react';

export default function Component() {
  return (
    <Fragment>
      <div>First</div>
      <div>Second</div>
    </Fragment>
  );
}

// ✅ FIXED CODE - Option 2: Shorthand Fragment
export default function Component() {
  return (
    <>
      <div>First</div>
      <div>Second</div>
    </>
  );
}

// ✅ FIXED CODE - Option 3: Wrapper div
export default function Component() {
  return (
    <div>
      <div>First</div>
      <div>Second</div>
    </div>
  );
}

// ✅ React 18+ (if supported by your setup)
export default function Component() {
  return (
    <div>First</div>
    <div>Second</div>
  ); // Works in React 18+ with new JSX transform
}`}
            language="javascript"
          />
        </section>

        {/* Question 25: Forgetting to Handle Loading States */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 25: Not Handling Async Loading States
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Cannot read property 'map' of undefined" or blank screen
              while data is loading. The component tries to render before data
              is available.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              When fetching data asynchronously, there's a period between when
              the component first renders and when the data arrives. During this
              time, the state variable (like{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                data
              </code>
              ) is{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                null
              </code>{" "}
              or{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                undefined
              </code>
              . If you try to call methods like{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                .map()
              </code>{" "}
              on undefined, you'll get a runtime error. Always check if data
              exists before trying to use it.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useState, useEffect } from 'react';

export default function ProductsList() {
  const [products, setProducts] = useState(null);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);
  
  return (
    <ul>
      {products.map(product => ( // Error if products is null!
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Always check if data exists before rendering, and provide a
              loading state or fallback.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Conditional rendering
'use client';
import { useState, useEffect } from 'react';

export default function ProductsList() {
  const [products, setProducts] = useState(null);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);
  
  if (products === null) {
    return <div>Loading...</div>; // Handle loading state
  }
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// ✅ FIXED CODE - Option 2: Default to empty array
const [products, setProducts] = useState([]); // Default to empty array

return (
  <ul>
    {products.map(product => (
      <li key={product.id}>{product.name}</li>
    ))}
  </ul>
);

// ✅ FIXED CODE - Option 3: Optional chaining
return (
  <ul>
    {products?.map(product => (
      <li key={product.id}>{product.name}</li>
    )) || <li>No products</li>}
  </ul>
);`}
            language="javascript"
          />
        </section>

        {/* Question 26: useCallback Missing Dependencies */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 26: useCallback Missing Dependencies
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              The callback always uses stale values. The callback function
              doesn't update when dependencies change, causing bugs in child
              components.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useCallback
              </code>{" "}
              memoizes a function, but if you don't include all dependencies in
              the dependency array, the memoized function will capture stale
              values from when it was first created. This is similar to the
              useEffect dependency issue - the function closure captures old
              values. When{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                count
              </code>{" "}
              changes but isn't in the dependency array, the callback still
              references the old count value.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
import { useState, useCallback } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log(count); // Always logs 0 (stale closure!)
    alert(count);
  }, []); // Missing 'count' in dependencies!
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={handleClick}>Show Count</button>
    </div>
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Add all referenced variables to the{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                useCallback
              </code>{" "}
              dependency array.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
'use client';
import { useState, useCallback } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log(count); // Uses current count
    alert(count);
  }, [count]); // Add 'count' to dependencies
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={handleClick}>Show Count</button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Question 27: Accessing Window/Document in Server Component */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 27: Using Browser APIs in Server Component
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "window is not defined" or "document is not defined". Build
              fails or runtime error.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Browser APIs like{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                window
              </code>
              ,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                document
              </code>
              ,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                localStorage
              </code>
              , and{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                navigator
              </code>{" "}
              don't exist on the server. Server Components render on the Node.js
              server where there's no browser environment. When Next.js tries to
              render the component during build time or server-side rendering,
              these APIs are undefined, causing errors. These APIs are only
              available in the browser (Client Components).
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/page.js (Server Component)
export default function Page() {
  const width = window.innerWidth; // Error: window is not defined!
  const theme = localStorage.getItem('theme'); // Error: localStorage is not defined!
  
  return <div>Width: {width}</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Move browser API access to a Client Component, or check if window
              exists before using it, or use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                useEffect
              </code>{" "}
              in a Client Component.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Move to Client Component
// app/components/WindowInfo.js
'use client';
import { useState, useEffect } from 'react';

export default function WindowInfo() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <div>Width: {width}</div>;
}

// app/page.js (Server Component)
import WindowInfo from './components/WindowInfo';

export default function Page() {
  return <WindowInfo />;
}

// ✅ FIXED CODE - Option 2: Check if window exists (SSR-safe)
'use client';
export default function Page() {
  const width = typeof window !== 'undefined' ? window.innerWidth : 0;
  return <div>Width: {width}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Question 28: Context Provider Wrapping */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 28: useContext Used Outside Provider
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Cannot read property 'value' of undefined" or the context
              value is undefined. Component doesn't receive context data.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              React Context only works when components are descendants of a
              Context Provider. When you use{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useContext()
              </code>{" "}
              in a component that's not wrapped by the corresponding Provider,
              it returns the default value (usually undefined). This happens
              when the Provider is missing, placed in the wrong location in the
              component tree, or the component using the context is outside the
              Provider's children. Always ensure the component using context is
              a descendant of the Provider.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/components/ThemeContext.js
'use client';
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = 'dark';
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// app/page.js
import { useContext } from 'react';
import { ThemeContext } from './components/ThemeContext';

export default function Page() {
  const { theme } = useContext(ThemeContext); // undefined - no Provider!
  return <div>Theme: {theme}</div>;
}

// app/layout.js
export default function Layout({ children }) {
  // ThemeProvider is missing!
  return <html><body>{children}</body></html>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Wrap components that need context with the Provider, typically in
              the layout or a parent component.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
// app/components/ThemeContext.js
'use client';
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = 'dark';
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// app/layout.js
import { ThemeProvider } from './components/ThemeContext';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// app/page.js
'use client';
import { useTheme } from './components/ThemeContext';

export default function Page() {
  const { theme } = useTheme(); // Works - wrapped by Provider
  return <div>Theme: {theme}</div>;
}`}
            language="javascript"
          />
        </section>

        {/* Question 29: Environment Variables Client Access */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 29: Accessing Server-Only Environment Variables in Client
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Environment variable is undefined or shows as empty string in the
              browser. Sensitive data might be exposed if not properly
              configured.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              In Next.js, environment variables without the{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                NEXT_PUBLIC_
              </code>{" "}
              prefix are only available on the server for security reasons.
              They're not exposed to the browser bundle. If you try to access{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                process.env.API_KEY
              </code>{" "}
              in a Client Component, it will be{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                undefined
              </code>
              . Only{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                NEXT_PUBLIC_*
              </code>{" "}
              variables are embedded in the client bundle. This is intentional
              to prevent exposing sensitive server-side secrets to the client.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
'use client';
export default function Component() {
  const apiKey = process.env.API_KEY; // undefined in Client Component!
  const apiUrl = process.env.API_URL; // undefined in Client Component!
  
  useEffect(() => {
    fetch(apiUrl, { // Error: apiUrl is undefined
      headers: { 'Authorization': apiKey }
    });
  }, []);
  
  return <div>API Key: {apiKey}</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              For client access, use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                NEXT_PUBLIC_
              </code>{" "}
              prefix (only for non-sensitive data), or fetch from a Server
              Component/Route Handler that has access to server env vars.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: NEXT_PUBLIC_ prefix (non-sensitive only)
'use client';
export default function Component() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Works - prefixed
  // ⚠️ Never use NEXT_PUBLIC_ for secrets (API keys, tokens, etc.)
  
  return <div>API URL: {apiUrl}</div>;
}

// ✅ FIXED CODE - Option 2: Fetch from Server Component/Route Handler
// app/api/data/route.js
export async function GET() {
  const apiKey = process.env.API_KEY; // Server-only, secure
  const data = await fetchData(apiKey);
  return Response.json(data);
}

// app/components/ClientComponent.js
'use client';
export default function ClientComponent() {
  useEffect(() => {
    fetch('/api/data') // Server Route Handler has access to server env vars
      .then(res => res.json())
      .then(setData);
  }, []);
}

// ✅ FIXED CODE - Option 3: Pass from Server Component
// app/page.js (Server Component)
export default function Page() {
  const apiUrl = process.env.API_URL; // Works in Server Component
  return <ClientComponent apiUrl={apiUrl} />;
}`}
            language="javascript"
          />
        </section>

        {/* Question 30: useRef vs useState */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 30: Using useState Instead of useRef for Non-Reactive
            Values
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Unnecessary re-renders causing performance issues. Component
              re-renders every time the value changes, even though the UI
              doesn't need to update.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useState
              </code>{" "}
              triggers re-renders whenever the state changes. If you're storing
              a value that doesn't need to trigger a re-render (like a timer ID,
              DOM reference, previous value for comparison, or mutable value
              that doesn't affect rendering), using{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useState
              </code>{" "}
              causes unnecessary re-renders and performance issues.{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useRef
              </code>{" "}
              stores mutable values without causing re-renders when they change.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - Unnecessary re-renders
'use client';
import { useState, useEffect } from 'react';

export default function Component() {
  const [timerId, setTimerId] = useState(null); // Causes re-render when changed!
  const [previousValue, setPreviousValue] = useState(null); // Unnecessary re-render!
  
  useEffect(() => {
    const id = setInterval(() => {
      console.log('Tick');
    }, 1000);
    setTimerId(id); // Triggers re-render even though UI doesn't change
    
    return () => clearInterval(timerId);
  }, [timerId]);
  
  return <div>Timer running...</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                useRef
              </code>{" "}
              for values that don't need to trigger re-renders.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Use useRef for non-reactive values
'use client';
import { useRef, useEffect } from 'react';

export default function Component() {
  const timerId = useRef(null); // No re-render when changed
  const previousValue = useRef(null); // Stores value without re-render
  
  useEffect(() => {
    timerId.current = setInterval(() => {
      console.log('Tick');
    }, 1000);
    
    return () => clearInterval(timerId.current); // Access via .current
  }, []); // No dependency needed
  
  return <div>Timer running...</div>;
}

// ✅ When to use each:
// useState: Values that affect UI rendering (count, text, visible/hidden)
// useRef: Values that don't affect rendering (timer IDs, DOM refs, previous values)`}
            language="javascript"
          />
        </section>

        {/* Question 31: Error Boundary Placement */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 31: Error Boundary Not Catching Errors
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Errors still crash the app. Error boundary doesn't catch the error
              and display fallback UI.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Error boundaries only catch errors in their child component tree
              during rendering, in lifecycle methods, and in constructors. They
              do NOT catch errors in: event handlers (use try-catch instead),
              async code (use try-catch), Server Components (errors should be
              handled in the component), or during SSR (use error.js files).
              Also, error boundaries must be class components or use a library
              like react-error-boundary. If your error is happening in one of
              these unsupported places, the error boundary won't catch it.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - Error in event handler (not caught)
'use client';
import { ErrorBoundary } from 'react-error-boundary';

function ComponentWithError() {
  const handleClick = () => {
    throw new Error('Event handler error!'); // Not caught by ErrorBoundary!
  };
  
  return <button onClick={handleClick}>Click</button>;
}

export default function Page() {
  return (
    <ErrorBoundary fallback={<div>Error occurred</div>}>
      <ComponentWithError />
    </ErrorBoundary>
  );
}

// ❌ OR error in async code (not caught)
function ComponentWithError() {
  useEffect(() => {
    fetch('/api/data').then(() => {
      throw new Error('Async error!'); // Not caught!
    });
  }, []);
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use try-catch for event handlers and async code. Error boundaries
              only catch rendering errors.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Handle errors in event handlers
'use client';
import { ErrorBoundary } from 'react-error-boundary';
import { useState } from 'react';

function ComponentWithError() {
  const [error, setError] = useState(null);
  
  const handleClick = () => {
    try {
      throw new Error('Event handler error!');
    } catch (err) {
      setError(err.message); // Handle error, don't throw
      console.error(err);
    }
  };
  
  if (error) return <div>Error: {error}</div>;
  
  return <button onClick={handleClick}>Click</button>;
}

// ✅ Handle async errors
function ComponentWithError() {
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(() => {
        throw new Error('Async error!');
      })
      .catch(err => {
        setError(err.message); // Handle async errors
      });
  }, []);
  
  if (error) return <div>Error: {error}</div>;
  return <div>Content</div>;
}

// ✅ Error boundary for rendering errors
<ErrorBoundary fallback={<div>Rendering error occurred</div>}>
  <Component /> {/* Catches rendering errors */}
</ErrorBoundary>`}
            language="javascript"
          />
        </section>

        {/* Question 32: Import Path Issues */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 32: Incorrect Import Paths
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Module not found" or "Cannot resolve module". Build fails
              or runtime import error.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Next.js uses different path resolution rules. Relative paths must
              be accurate relative to the current file. Absolute paths (starting
              with{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                /
              </code>
              ) resolve from the{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                app
              </code>{" "}
              or{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                public
              </code>{" "}
              directory. TypeScript/JavaScript path aliases (like{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                @/components
              </code>
              ) must be configured in{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                tsconfig.json
              </code>{" "}
              or{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                jsconfig.json
              </code>
              . File extensions (.js, .tsx) are optional but case-sensitive.
              Incorrect relative paths or missing alias configuration cause
              module resolution failures.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/page.js
import Button from '../components/Button'; // Wrong path - should be '@/components/Button'
import { utils } from './utils'; // Missing file extension or wrong path
import styles from './styles.module.css'; // Path doesn't exist

// tsconfig.json missing path alias configuration
// No "@/*" path mapping configured`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use correct relative paths or configure path aliases. Verify file
              exists and path is correct.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Configure path aliases
// tsconfig.json or jsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

// app/page.js
import Button from '@/components/Button'; // Uses alias
import { utils } from '@/lib/utils'; // Absolute path from root
import styles from './page.module.css'; // Relative path, correct location

// ✅ Alternative: Use correct relative paths
// app/page.js
import Button from '../components/Button'; // Relative to app/page.js
import { utils } from '../lib/utils'; // Go up to root, then into lib

// ✅ For public assets
import Image from 'next/image';
<Image src="/images/logo.png" /> // Resolves from public/ directory`}
            language="javascript"
          />
        </section>

        {/* Question 33: Route Handler Response Issue */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 33: Route Handler Not Returning Response
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Route Handlers must return a Response instance" or the API
              endpoint returns 500 error.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Route Handlers in App Router must return a{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                Response
              </code>{" "}
              object (or a{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                NextResponse
              </code>{" "}
              which extends Response). If you return a plain object, string, or
              nothing, Next.js can't serialize it properly. This is different
              from Pages Router API routes where you could use{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                res.json()
              </code>
              . Route Handlers use Web Response APIs, so you must return a
              proper Response instance.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/api/users/route.js
export async function GET() {
  const users = await db.user.findMany();
  return users; // Error: Must return Response!
}

// ❌ OR this
export async function GET() {
  const users = await db.user.findMany();
  return { users }; // Error: Plain object, not Response!
}

// ❌ OR this
export async function GET() {
  const users = await db.user.findMany();
  return JSON.stringify(users); // Error: String, not Response!
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Always return a{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                NextResponse
              </code>{" "}
              or{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                Response
              </code>{" "}
              object.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
// app/api/users/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users); // Returns Response instance
}

// ✅ OR using Response constructor
export async function GET() {
  const users = await db.user.findMany();
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// ✅ With status code
export async function POST(request) {
  const user = await createUser();
  return NextResponse.json(user, { status: 201 });
}

// ✅ With headers
export async function GET() {
  const data = await fetchData();
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'no-store' },
  });
}`}
            language="javascript"
          />
        </section>

        {/* Question 34: Caching Issues */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 34: Data Not Updating Due to Caching
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Data appears stale. After updating data in the database, the page
              still shows old data. Changes don't appear immediately.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Next.js caches fetch requests by default to improve performance.
              When you fetch data without specifying cache options, it's cached
              indefinitely. After you update data (via Server Action or API),
              the cached fetch result still contains old data. The page
              continues to show cached data until you manually revalidate the
              cache. This is common when you forget to call{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                revalidatePath()
              </code>{" "}
              or{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                revalidateTag()
              </code>{" "}
              after mutations, or when using cached fetch without revalidation.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/products/page.js
export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products');
  // Cached indefinitely - won't update after changes!
  const data = await products.json();
  
  return <div>{data.map(...)}</div>;
}

// app/actions.js
'use server';
export async function updateProduct(id, data) {
  await db.product.update({ where: { id }, data });
  // Missing revalidation - cache not updated!
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Call revalidation after mutations, or use cache options for
              dynamic data, or use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                cache: 'no-store'
              </code>{" "}
              for always-fresh data.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Revalidate after mutations
// app/products/page.js
export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products', {
    next: { tags: ['products'] }, // Tag for revalidation
  });
  const data = await products.json();
  
  return <div>{data.map(...)}</div>;
}

// app/actions.js
'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function updateProduct(id, data) {
  await db.product.update({ where: { id }, data });
  
  // Revalidate the specific path
  revalidatePath('/products');
  revalidatePath(\`/products/\${id}\`);
  
  // OR revalidate by tag
  revalidateTag('products');
}

// ✅ ALTERNATIVE: Force fresh data (no cache)
const products = await fetch('https://api.example.com/products', {
  cache: 'no-store', // Always fetch fresh
});

// ✅ ALTERNATIVE: Time-based revalidation (ISR)
const products = await fetch('https://api.example.com/products', {
  next: { revalidate: 60 }, // Revalidate every 60 seconds
});`}
            language="javascript"
          />
        </section>

        {/* Question 35: TypeScript Type Errors */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 35: TypeScript Type Errors with Props
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              TypeScript error: "Property 'propName' does not exist on type" or
              type mismatch errors. Build fails or IDE shows type errors.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              TypeScript enforces type safety. When component props don't match
              the expected type definition, TypeScript throws errors. Common
              issues include: missing prop types/interface definitions,
              accessing props that aren't defined in the type, type mismatches
              (string vs number), optional props accessed without checking, or
              Next.js-specific types not imported (like{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                Metadata
              </code>
              ,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                PageProps
              </code>
              ). Without proper type definitions, TypeScript can't verify your
              code is correct.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// components/Button.tsx
export default function Button(props) { // No type definition!
  return <button onClick={props.onClick}>{props.children}</button>;
}

// app/page.tsx
export default function Page({ params }) { // params type not defined!
  return <div>Product: {params.id}</div>;
}

// ❌ OR accessing undefined props
interface Props {
  title: string;
}

function Component({ title, description }: Props) {
  return <div>{description}</div>; // Error: 'description' not in Props!
}`}
            language="typescript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Define proper TypeScript interfaces/types for all props and use
              Next.js types for route params.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Define prop types
// components/Button.tsx
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// ✅ Next.js App Router types
// app/products/[id]/page.tsx
interface PageProps {
  params: Promise<{ id: string }>; // Next.js 15+
  // OR
  // params: { id: string }; // Next.js 14
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params; // Next.js 15+
  // OR
  // const { id } = params; // Next.js 14
  return <div>Product: {id}</div>;
}

// ✅ With searchParams
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { category } = await searchParams;
  return <div>Product {id}, Category: {category}</div>;
}

// ✅ Optional props
interface Props {
  title: string;
  description?: string; // Optional
}

function Component({ title, description }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>} // Check optional prop
    </div>
  );
}`}
            language="typescript"
          />
        </section>

        {/* Question 36: Memory Leak - Missing Cleanup */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 36: Memory Leak from Missing Cleanup
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Memory leaks, event listeners not removed, timers continue running
              after component unmounts. Performance degrades over time.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              When{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useEffect
              </code>{" "}
              sets up subscriptions, timers, or event listeners, they persist
              even after the component unmounts if not cleaned up. This causes
              memory leaks - the browser holds references to unmounted
              components, preventing garbage collection. Event listeners
              continue firing, timers keep running, and subscriptions stay
              active. Always return a cleanup function from{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useEffect
              </code>{" "}
              to remove subscriptions, clear timers, and cancel requests when
              the component unmounts or dependencies change.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - Memory leak
'use client';
import { useEffect, useState } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Timer never cleared - memory leak!
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    // Missing cleanup function!
  }, []);
  
  useEffect(() => {
    // Event listener never removed - memory leak!
    window.addEventListener('resize', () => {
      console.log('Resized');
    });
    // Missing cleanup!
  }, []);
  
  return <div>Count: {count}</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Always return a cleanup function from{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                useEffect
              </code>{" "}
              to clear subscriptions, timers, and event listeners.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Proper cleanup
'use client';
import { useEffect, useState } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    // Cleanup function
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      console.log('Resized');
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <div>Count: {count}</div>;
}

// ✅ Async operations cleanup
useEffect(() => {
  let cancelled = false;
  
  fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      if (!cancelled) {
        setData(data); // Only update if not cancelled
      }
    });
  
  return () => {
    cancelled = true; // Cancel on unmount
  };
}, []);`}
            language="javascript"
          />
        </section>

        {/* Question 37: Router Navigation Issues */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 37: Router Navigation Not Working
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Navigation doesn't happen, or full page reload occurs instead of
              client-side navigation. URL doesn't update.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              In App Router, you must use{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                next/navigation
              </code>{" "}
              for routing, not{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                next/router
              </code>{" "}
              (which is for Pages Router). Using the wrong import or regular
              anchor tags (
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                &lt;a&gt;
              </code>
              ) causes full page reloads. The{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useRouter
              </code>{" "}
              hook from App Router has different methods than Pages Router.
              Also, navigation hooks only work in Client Components.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - Wrong router import
'use client';
import { useRouter } from 'next/router'; // Wrong - this is Pages Router!

export default function Component() {
  const router = useRouter();
  router.push('/dashboard'); // Doesn't work correctly in App Router
}

// ❌ OR using regular anchor tag
export default function Component() {
  return <a href="/dashboard">Go to Dashboard</a>; // Full page reload!
}

// ❌ OR using router in Server Component
// app/page.js (Server Component)
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter(); // Error: hooks only work in Client Components!
  return <div>...</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                next/navigation
              </code>{" "}
              for App Router, use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                Link
              </code>{" "}
              component for navigation, or use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                redirect()
              </code>{" "}
              in Server Components.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - App Router navigation
'use client';
import { useRouter } from 'next/navigation'; // Correct import

export default function Component() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/dashboard'); // Client-side navigation
    // router.replace('/dashboard'); // Replace history
    // router.back(); // Go back
    // router.refresh(); // Refresh current route
  };
  
  return <button onClick={handleClick}>Navigate</button>;
}

// ✅ Use Link component
import Link from 'next/link';

export default function Component() {
  return <Link href="/dashboard">Go to Dashboard</Link>; // Client-side navigation
}

// ✅ Server Component redirect
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/dashboard'); // Server-side redirect
}`}
            language="javascript"
          />
        </section>

        {/* Question 38: Form State Not Resetting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 38: Form Not Resetting After Submission
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              After submitting the form, input fields still contain the
              submitted values. Form doesn't clear for the next submission.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              When using controlled inputs with{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useState
              </code>
              , the state persists after form submission. If you don't reset the
              state after a successful submission, the input values remain. For
              uncontrolled forms using{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                ref
              </code>
              s, you need to manually clear the form element. Server Actions
              don't automatically reset forms - you need to handle it manually
              in your component or use form reset methods.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - State not reset
'use client';
import { useState } from 'react';
import { createPost } from './actions';

export default function Form() {
  const [title, setTitle] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ title });
    // State not reset - input still has value!
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Reset state after successful submission, or use form.reset() for
              uncontrolled forms, or use form keys to reset on success.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Reset state after submission
'use client';
import { useState } from 'react';
import { createPost } from './actions';

export default function Form() {
  const [title, setTitle] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ title });
    setTitle(''); // Reset state after submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ FIXED CODE - Using form.reset() with refs
'use client';
import { useRef } from 'react';

export default function Form() {
  const formRef = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await createPost(formData);
    formRef.current?.reset(); // Reset form
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="title" />
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ FIXED CODE - Using key to reset form
const [key, setKey] = useState(0);

const handleSubmit = async (e) => {
  e.preventDefault();
  await createPost(formData);
  setKey(prev => prev + 1); // Change key to reset form
};

<form key={key} onSubmit={handleSubmit}>...</form>`}
            language="javascript"
          />
        </section>

        {/* Question 39: Middleware Matcher Issues */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 39: Middleware Not Running or Running Too Often
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Middleware doesn't execute for expected routes, or runs for every
              request including static assets, causing performance issues.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              The{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                matcher
              </code>{" "}
              configuration determines which routes the middleware runs on. If
              the matcher is missing or incorrectly configured, middleware might
              not run when expected, or it might run for all requests (including
              static files, images, fonts, API routes). Middleware should be
              optimized to only run on routes that need it to avoid performance
              overhead. Without a matcher, middleware runs on every request,
              which is inefficient.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - Missing matcher (runs on EVERY request)
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Running on:', request.nextUrl.pathname);
  // Runs on /_next/static, /api, /favicon.ico, images, etc.
  // Performance issue!
  
  return NextResponse.next();
}

// ❌ OR incorrect matcher pattern
export const config = {
  matcher: '/dashboard', // Missing :path* - only matches exact /dashboard
};

// ❌ OR matcher running on static files
export const config = {
  matcher: '/(.*)', // Runs on everything including static assets!
};`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Configure matcher to only run on necessary routes, exclude static
              files and API routes if not needed, use proper path patterns.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Proper matcher configuration
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Only runs on matched routes
  const token = request.cookies.get('token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', // Match /dashboard and all sub-routes
    '/profile/:path*',
    // Exclude static files, API routes, _next
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// ✅ Specific route matcher
export const config = {
  matcher: '/dashboard/:path*', // Only /dashboard routes
};

// ✅ Multiple routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/settings/:path*',
  ],
};

// ✅ Exclude specific paths
export const config = {
  matcher: [
    '/((?!api|_next|static|.*\\..*|favicon.ico).*)', // Exclude API, _next, files
  ],
};`}
            language="javascript"
          />
        </section>

        {/* Question 40: Server Component in Client Component Props */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 40: Passing Server Component as Prop
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Functions cannot be passed directly to Client Components"
              or "Cannot pass Server Components as props". Component doesn't
              render.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Server Components cannot be passed as props to Client Components
              because Server Components are serialized and sent to the client as
              rendered HTML, not as executable code. When you try to pass a
              Server Component as a prop, React can't serialize the component
              function itself. Only serializable data (strings, numbers,
              objects, arrays) can be passed between Server and Client
              Components. If you need to pass component-like content, pass the
              rendered result or use composition patterns.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/components/ServerCard.js (Server Component)
export default function ServerCard({ title }) {
  const data = await fetchData(); // Server-side fetch
  return <div>{title}: {data}</div>;
}

// app/components/ClientWrapper.js (Client Component)
'use client';
export default function ClientWrapper({ Card }) { // Can't pass Server Component!
  return <Card title="Test" />;
}

// app/page.js
import ServerCard from './components/ServerCard';
import ClientWrapper from './components/ClientWrapper';

export default function Page() {
  return <ClientWrapper Card={ServerCard} />; // Error!
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use composition by passing children (rendered content), or render
              Server Component directly and pass data instead of the component.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Option 1: Pass as children (composition)
// app/components/ServerCard.js (Server Component)
export default function ServerCard({ title, children }) {
  const data = await fetchData();
  return (
    <div>
      <h2>{title}</h2>
      {children} {/* Rendered content, not component */}
      <p>{data}</p>
    </div>
  );
}

// app/components/ClientWrapper.js (Client Component)
'use client';
export default function ClientWrapper({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(count + 1)}>
      {children} {/* Accept rendered content */}
    </div>
  );
}

// app/page.js
import ServerCard from './components/ServerCard';
import ClientWrapper from './components/ClientWrapper';

export default function Page() {
  return (
    <ClientWrapper>
      <ServerCard title="Test">Content</ServerCard>
    </ClientWrapper>
  );
}

// ✅ FIXED CODE - Option 2: Pass data, not components
'use client';
export default function ClientWrapper({ title, data }) { // Pass data
  return <div>{title}: {data}</div>;
}

// app/page.js
export default async function Page() {
  const data = await fetchData();
  return <ClientWrapper title="Test" data={data} />; // Pass data
}`}
            language="javascript"
          />
        </section>

        {/* Question 41: Suspense Boundary Missing */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 41: Suspense Boundary Missing for Async Component
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Component throws error or page crashes when async Server Component
              takes time to load. No loading state displayed.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              When an async Server Component is suspended (waiting for data),
              React needs a Suspense boundary to catch the promise and show
              fallback UI. Without a Suspense boundary wrapping the async
              component, React doesn't know how to handle the suspension,
              causing errors or blank screens. Suspense boundaries tell React
              "while this component is loading, show the fallback instead." This
              is especially important for streaming SSR where components load
              progressively.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/components/UserProfile.js (async Server Component)
export default async function UserProfile({ userId }) {
  const user = await fetchUser(userId); // May take time
  return <div>{user.name}</div>;
}

// app/page.js
import UserProfile from './components/UserProfile';

export default function Page() {
  // No Suspense boundary - error if UserProfile is slow!
  return <UserProfile userId="123" />;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Wrap async components with{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                Suspense
              </code>{" "}
              and provide a fallback UI.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
import { Suspense } from 'react';
import UserProfile from './components/UserProfile';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userId="123" />
    </Suspense>
  );
}

// ✅ Multiple async components
export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile userId="123" />
      </Suspense>
      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPosts userId="123" />
      </Suspense>
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Question 42: useTransition Infinite Loop */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 42: useTransition Causing Infinite Re-renders
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Component re-renders infinitely. The UI is stuck in a loading
              state or updates continuously, causing performance issues.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useTransition
              </code>{" "}
              is used to mark state updates as non-urgent, but if you call{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                startTransition
              </code>{" "}
              during render (not in an event handler), it triggers a state
              update which causes re-render, which calls{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                startTransition
              </code>{" "}
              again, creating an infinite loop. Also, if the state update inside{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                startTransition
              </code>{" "}
              depends on the current render, it can create circular
              dependencies.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - startTransition in render
'use client';
import { useTransition, useState } from 'react';

export default function Component() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  // Called during render - infinite loop!
  startTransition(() => {
    setCount(count + 1);
  });
  
  return <div>Count: {count}</div>;
}

// ❌ OR in useEffect without dependencies
useEffect(() => {
  startTransition(() => {
    setCount(count + 1); // Causes infinite loop
  });
}); // Missing dependency array`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Only call{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                startTransition
              </code>{" "}
              in event handlers or after user interactions, not during render.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Use in event handler
'use client';
import { useTransition, useState } from 'react';

export default function Component() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    startTransition(() => {
      setCount(count + 1); // Safe - in event handler
    });
  };
  
  return (
    <div>
      <div>Count: {count}</div>
      {isPending && <div>Updating...</div>}
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

// ✅ With useEffect - add proper dependencies
useEffect(() => {
  if (someCondition) {
    startTransition(() => {
      setCount(prev => prev + 1); // Use functional update
    });
  }
}, [someCondition]); // Proper dependencies`}
            language="javascript"
          />
        </section>

        {/* Question 43: useOptimistic Update Conflicts */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 43: useOptimistic Not Reverting on Error
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Optimistic update stays even after the server action fails. UI
              shows incorrect state that doesn't match server state.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-green-300">
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                useOptimistic
              </code>{" "}
              provides optimistic UI updates, but if the server action throws an
              error or fails, the optimistic state doesn't automatically revert.
              The hook updates optimistically when you call the update function,
              but if the server action fails, you need to handle the error and
              manually revert or refresh the state. Without proper error
              handling, the UI remains in an inconsistent state.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - No error handling
'use client';
import { useOptimistic } from 'react';
import { addComment } from './actions';

export default function Comments({ comments }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  
  const handleSubmit = async (text) => {
    addOptimisticComment({ id: 'temp', text }); // Optimistic update
    await addComment(text); // If this fails, optimistic state remains!
    // No error handling - UI shows incorrect state
  };
  
  return (
    <div>
      {optimisticComments.map(c => <div key={c.id}>{c.text}</div>)}
      <button onClick={() => handleSubmit('New comment')}>Add</button>
    </div>
  );
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Handle errors and revert optimistic updates or refresh state when
              server action fails.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Handle errors properly
'use client';
import { useOptimistic, useState } from 'react';
import { addComment } from './actions';
import { useRouter } from 'next/navigation';

export default function Comments({ comments }) {
  const router = useRouter();
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  
  const handleSubmit = async (text) => {
    const tempId = 'temp-' + Date.now();
    addOptimisticComment({ id: tempId, text });
    
    try {
      await addComment(text);
      router.refresh(); // Refresh to get server state
    } catch (error) {
      // Revert by refreshing server state
      router.refresh(); // This will restore original comments
      alert('Failed to add comment');
    }
  };
  
  return (
    <div>
      {optimisticComments.map(c => <div key={c.id}>{c.text}</div>)}
      <button onClick={() => handleSubmit('New comment')}>Add</button>
    </div>
  );
}

// ✅ ALTERNATIVE: Use startTransition for better error handling
import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();

const handleSubmit = (text) => {
  startTransition(async () => {
    addOptimisticComment({ id: 'temp', text });
    try {
      await addComment(text);
      router.refresh();
    } catch {
      router.refresh(); // Revert on error
    }
  });
};`}
            language="javascript"
          />
        </section>

        {/* Question 44: Parallel Routes Missing @default */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 44: Parallel Route Missing @default Slot
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Missing required @default slot" or parallel route doesn't
              render correctly when navigating. 404 error on certain routes.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Parallel routes use slots (folders prefixed with{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                @
              </code>
              ) to render multiple routes simultaneously. When you have a
              parallel route slot (like{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                @analytics
              </code>
              ), you need a{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                @default.tsx
              </code>{" "}
              file to handle routes that don't match the slot pattern. Without{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                @default
              </code>
              , Next.js doesn't know what to render for unmatched routes,
              causing errors. The default slot serves as a fallback.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE
// app/dashboard/@analytics/page.js
export default function Analytics() {
  return <div>Analytics</div>;
}

// app/dashboard/layout.js
export default function Layout({ children, analytics }) {
  return (
    <>
      {children}
      {analytics} {/* Error: Missing @default for unmatched routes */}
    </>
  );
}

// Navigating to /dashboard/settings fails - no @default slot!`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Create{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                @default.tsx
              </code>{" "}
              file to handle routes that don't match parallel route slots.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
// app/dashboard/@analytics/page.js
export default function Analytics() {
  return <div>Analytics</div>;
}

// app/dashboard/@default/page.js (REQUIRED)
export default function Default() {
  return null; // Empty default slot
}

// app/dashboard/layout.js
export default function Layout({ children, analytics }) {
  return (
    <>
      {children}
      {analytics}
    </>
  );
}

// ✅ ALTERNATIVE: Default with content
// app/dashboard/@default/page.js
export default function Default() {
  return <div>Default dashboard view</div>;
}

// ✅ OR handle in layout with conditional rendering
export default function Layout({ children, analytics }) {
  return (
    <>
      {children}
      {analytics || <div>No analytics</div>} {/* Fallback */}
    </>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Question 45: Intercepting Route Wrong Pattern */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 45: Intercepting Route Not Triggering
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Modal or intercepted route doesn't show. Navigating to the route
              shows the full page instead of intercepting.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Intercepting routes use the{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                (.)
              </code>{" "}
              pattern to intercept routes at the same level,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                (..)
              </code>{" "}
              for one level up,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                (..)(..)
              </code>{" "}
              for two levels up, or{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                (...)
              </code>{" "}
              for root. They only work when navigating via client-side
              navigation (Link or router.push), not on direct URL access or page
              refresh. Also, the pattern must match exactly - wrong pattern
              means interception doesn't trigger. The route structure must be
              correct: intercept route at a level that can catch the target
              route.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - Wrong pattern
// app/photos/@modal/(.)photo/[id]/page.js
// This won't intercept /photos/photo/123 because pattern is wrong!

export default function PhotoModal({ params }) {
  return <div>Modal: {params.id}</div>;
}

// ❌ OR intercepting at wrong level
// app/@modal/(.)photos/photo/[id]/page.js
// Pattern (.) only works for same level, not child routes

// ❌ OR expecting interception on direct URL
// Visiting /photos/photo/123 directly won't trigger interception!`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use correct intercepting route pattern, ensure client-side
              navigation, and match route structure properly.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE
// Target route: /photos/photo/[id]
// app/photos/photo/[id]/page.js
export default function PhotoPage({ params }) {
  return <div>Full page: {params.id}</div>;
}

// Intercept route at same level: (.)photo
// app/photos/@modal/(.)photo/[id]/page.js
export default function PhotoModal({ params }) {
  return (
    <div className="modal">
      Modal: {params.id}
    </div>
  );
}

// Layout to render modal slot
// app/photos/layout.js
export default function Layout({ children, modal }) {
  return (
    <>
      {children}
      {modal} {/* Modal shows when intercepted */}
    </>
  );
}

// ✅ Patterns:
// (.) - intercept same level: /photos/(.)photo/[id] intercepts /photos/photo/[id]
// (..) - intercept one level up: /(..)photos/photo/[id] intercepts /photos/photo/[id]
// (..)(..) - intercept two levels up
// (...) - intercept from root

// ✅ Use Link for client-side navigation
import Link from 'next/link';
<Link href="/photos/photo/123">View Photo</Link> // Triggers interception`}
            language="javascript"
          />
        </section>

        {/* Question 46: Edge Runtime Limitations */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 46: Using Node.js APIs in Edge Runtime
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Error: "Module not found" or "API not available in Edge Runtime".
              Route Handler or Middleware fails to execute.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Edge Runtime (Vercel Edge Network) uses a subset of Web APIs, not
              full Node.js APIs. When you set{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                runtime: 'edge'
              </code>
              , you can't use Node.js modules like{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                fs
              </code>
              ,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                path
              </code>
              ,{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                crypto
              </code>{" "}
              (use Web Crypto API instead), or many npm packages that depend on
              Node.js. Edge Runtime is optimized for low latency but has
              limitations. Middleware always runs on Edge Runtime, so it can't
              use Node.js APIs. Route Handlers can be either Edge or Node.js
              runtime.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - Node.js APIs in Edge Runtime
// app/api/data/route.js
export const runtime = 'edge';

import fs from 'fs'; // Error: Not available in Edge Runtime!
import path from 'path'; // Error: Not available in Edge Runtime!
import crypto from 'crypto'; // Error: Use Web Crypto API instead!

export async function GET() {
  const data = fs.readFileSync('data.json'); // Fails!
  const hashed = crypto.createHash('sha256').update(data).digest('hex'); // Fails!
  return Response.json({ data });
}

// ❌ OR in middleware (always Edge Runtime)
// middleware.js
import fs from 'fs'; // Error: Middleware always uses Edge Runtime!

export function middleware(request) {
  const config = fs.readFileSync('config.json'); // Fails!
  return NextResponse.next();
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Remove{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                runtime: 'edge'
              </code>{" "}
              to use Node.js runtime, or replace Node.js APIs with Web APIs, or
              move file operations to Server Components/Server Actions.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Use Node.js runtime
// app/api/data/route.js
export const runtime = 'nodejs'; // Default, can omit

import fs from 'fs/promises'; // Works with Node.js runtime
import path from 'path';

export async function GET() {
  const data = await fs.readFile(path.join(process.cwd(), 'data.json'), 'utf8');
  return Response.json({ data });
}

// ✅ FIXED CODE - Use Web APIs for Edge Runtime
// app/api/hash/route.js
export const runtime = 'edge';

export async function POST(request) {
  const text = await request.text();
  
  // Use Web Crypto API instead of Node.js crypto
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return Response.json({ hash: hashHex });
}

// ✅ FIXED CODE - Move file operations to Server Component
// app/data/page.js (Server Component, Node.js runtime)
import fs from 'fs/promises';

export default async function DataPage() {
  const data = await fs.readFile('data.json', 'utf8');
  return <div>{data}</div>;
}

// ✅ Middleware - only Web APIs
// middleware.js
export function middleware(request) {
  // Only Web APIs available
  const url = request.nextUrl; // Works
  const headers = request.headers; // Works
  // fs, path, etc. - NOT available
  
  return NextResponse.next();
}`}
            language="javascript"
          />
        </section>

        {/* Question 47: Server Action with File Upload */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 47: Server Action Not Handling File Upload
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              File upload fails or returns undefined. FormData file is not
              received or processed correctly in Server Action.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Server Actions receive{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                FormData
              </code>{" "}
              when called from forms, but file objects need special handling. If
              you try to access the file directly or convert it incorrectly,
              you'll get undefined or errors.{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                FormData.get()
              </code>{" "}
              returns a{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                File
              </code>{" "}
              object (or Blob) which needs to be converted to a Buffer or stream
              for storage. Also, Server Actions have size limits, so large files
              may fail silently. You need to handle file validation, size
              checks, and proper conversion.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - Incorrect file handling
'use server';
export async function uploadFile(formData) {
  const file = formData.get('file');
  const filename = file.name; // Error: file might be null or not a File
  
  // Can't directly save File object
  await saveFile(file); // Error: needs conversion to Buffer
  
  return { success: true };
}

// ❌ OR missing form encoding
<form action={uploadFile}>
  <input type="file" name="file" />
  <button type="submit">Upload</button>
</form> // Missing enctype="multipart/form-data"`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Properly validate and convert File to Buffer, handle errors, and
              ensure form has correct encoding.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Proper file handling
'use server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function uploadFile(formData) {
  const file = formData.get('file');
  
  // Validate file
  if (!file || !(file instanceof File)) {
    return { error: 'No file provided' };
  }
  
  // Check file size (e.g., 10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    return { error: 'File too large' };
  }
  
  // Convert File to Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Save file
  const filename = file.name;
  const path = join(process.cwd(), 'uploads', filename);
  await writeFile(path, buffer);
  
  return { success: true, filename };
}

// ✅ Client component with form
'use client';
import { uploadFile } from './actions';

export default function UploadForm() {
  return (
    <form action={uploadFile}>
      <input 
        type="file" 
        name="file" 
        accept="image/*" 
        required 
      />
      <button type="submit">Upload</button>
    </form>
  );
  // enctype is automatically set for file uploads in modern browsers
}

// ✅ With progress tracking (using useFormStatus)
'use client';
import { useFormStatus } from 'react-dom';
import { uploadFile } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Uploading...' : 'Upload'}
    </button>
  );
}

export default function UploadForm() {
  return (
    <form action={uploadFile}>
      <input type="file" name="file" required />
      <SubmitButton />
    </form>
  );
}

// ✅ For larger files, consider using Route Handler
// app/api/upload/route.js
export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  // Handle file upload with streaming for large files
}`}
            language="javascript"
          />
        </section>

        {/* Question 48: Streaming Response Errors */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 48: Streaming Response Not Working
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Streaming doesn't work, or error "Response object is not
              streamable". Data doesn't stream to client incrementally.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              To stream responses, you need to return a{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                ReadableStream
              </code>{" "}
              or use React's streaming APIs. If you try to use{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                Response.json()
              </code>{" "}
              or return a regular Response with a string body, it won't stream.
              Streaming requires creating a ReadableStream and writing to it
              incrementally. Also, streaming only works with Server Components
              or Route Handlers, not Client Components. You need to use proper
              streaming patterns with{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                TextEncoder
              </code>{" "}
              and manual chunk writing.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - Not actually streaming
// app/api/stream/route.js
export async function GET() {
  const data = await fetchLargeData();
  return Response.json(data); // Sends all at once, not streaming!
}

// ❌ OR trying to stream incorrectly
export async function GET() {
  const stream = 'some data'; // String, not ReadableStream!
  return new Response(stream); // Not streaming, sends all at once
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Create a proper{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                ReadableStream
              </code>{" "}
              and write chunks incrementally, or use Server Components with
              Suspense for automatic streaming.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Proper streaming with ReadableStream
// app/api/stream/route.js
export async function GET() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      // Stream data incrementally
      for (let i = 0; i < 10; i++) {
        const data = \`Chunk \${i}\\n\`;
        controller.enqueue(encoder.encode(data));
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      }
      controller.close();
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    },
  });
}

// ✅ Streaming Server Component (automatic)
// app/streaming/page.js
import { Suspense } from 'react';

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return <div>Loaded!</div>;
}

export default function Page() {
  return (
    <div>
      <div>Fast content</div>
      <Suspense fallback={<div>Loading slow content...</div>}>
        <SlowComponent /> {/* Streams automatically */}
      </Suspense>
    </div>
  );
}

// ✅ Streaming with async generator
export async function GET() {
  async function* generateData() {
    for (let i = 0; i < 10; i++) {
      yield \`data: \${i}\\n\\n\`;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of generateData()) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    }
  });
  
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}`}
            language="javascript"
          />
        </section>

        {/* Question 49: Partial Prerendering Issues */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 49: Partial Prerendering Not Working
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Page doesn't use Partial Prerendering (PPR). Static parts aren't
              prerendered, or dynamic parts block the entire page.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Partial Prerendering (PPR) in Next.js 15+ allows static parts to
              be prerendered while dynamic parts stream in. To enable PPR, you
              need to set{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                experimental.ppr: true
              </code>{" "}
              in{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                next.config.js
              </code>{" "}
              and use{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                export const experimental_ppr = true
              </code>{" "}
              in pages. If dynamic parts aren't wrapped in Suspense, they block
              static content. Also, using{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                dynamic = 'force-static'
              </code>{" "}
              disables PPR. The feature must be enabled in config and pages
              properly structured.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - PPR not enabled
// next.config.js
module.exports = {}; // Missing PPR config

// app/page.js
export default async function Page() {
  const data = await fetchData(); // Blocks entire page
  return (
    <div>
      <StaticHeader />
      <DynamicContent data={data} /> {/* Blocks static content */}
    </div>
  );
}

// ❌ OR dynamic content not wrapped in Suspense
export default async function Page() {
  const data = await fetchData(); // No Suspense - blocks page
  return <div>{data}</div>;
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Enable PPR in config, wrap dynamic parts in Suspense, and ensure
              page exports{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                experimental_ppr
              </code>
              .
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - Enable PPR
// next.config.js
module.exports = {
  experimental: {
    ppr: true, // Enable Partial Prerendering
  },
};

// app/page.js
import { Suspense } from 'react';

export const experimental_ppr = true; // Enable for this page

export default function Page() {
  return (
    <div>
      {/* Static content - prerendered */}
      <StaticHeader />
      <StaticSidebar />
      
      {/* Dynamic content - streamed */}
      <Suspense fallback={<div>Loading content...</div>}>
        <DynamicContent /> {/* Wrapped in Suspense */}
      </Suspense>
    </div>
  );
}

// Dynamic component
async function DynamicContent() {
  const data = await fetchData(); // Streams in separately
  return <div>{data}</div>;
}

// ✅ Multiple dynamic sections
export default function Page() {
  return (
    <div>
      <StaticHeader />
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsList />
      </Suspense>
      <Suspense fallback={<div>Loading comments...</div>}>
        <CommentsList />
      </Suspense>
    </div>
  );
}

// ✅ With loading states
async function PostsList() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const posts = await fetchPosts();
  return posts.map(post => <div key={post.id}>{post.title}</div>);
}`}
            language="javascript"
          />
        </section>

        {/* Question 50: Cache Component Issues */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Question 50: 'use cache' Directive Not Working
          </h2>
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
              What's Wrong:
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Function result not cached or cache directive has no effect.
              Component or function still executes on every render.
            </p>
          </div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h3 className="mb-2 font-semibold text-yellow-800 dark:text-yellow-400">
              Why It Happens:
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              The{" "}
              <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-800">
                'use cache'
              </code>{" "}
              directive (Next.js 16+) memoizes function results, but it only
              works in Server Components, not Client Components. If used in a
              Client Component or function that's not called during render, it
              won't work. Also, the function must be pure and its arguments
              determine the cache key. If arguments change frequently, caching
              won't help. Cache components require Next.js 16+ and must be used
              correctly - the directive caches the function's result based on
              its arguments during a single request/render cycle.
            </p>
          </div>
          <CodeBlock
            code={`// ❌ BROKEN CODE - In Client Component
'use client';
'use cache'; // Error: 'use cache' only works in Server Components!

export default function Component() {
  return <div>Content</div>;
}

// ❌ OR function not pure
'use cache';
function fetchData(userId) {
  return fetch(\`/api/user/\${userId}?\${Date.now()}\`); 
  // Date.now() makes it non-pure - different result each time!
}

// ❌ OR in event handler
'use cache';
function handleClick() { // Not called during render - won't cache
  return expensiveCalculation();
}`}
            language="javascript"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold text-green-800 dark:text-green-400">
              Exact Fix:
            </h3>
            <p className="mb-2 text-green-700 dark:text-green-300">
              Use{" "}
              <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                'use cache'
              </code>{" "}
              only in Server Components, ensure functions are pure, and call
              them during render.
            </p>
          </div>
          <CodeBlock
            code={`// ✅ FIXED CODE - In Server Component
// app/components/UserData.js (Server Component)
'use cache';

function fetchUserData(userId) {
  // Pure function - same input = same output
  return fetch(\`/api/user/\${userId}\`, {
    next: { tags: ['user'] }
  }).then(res => res.json());
}

export default async function UserData({ userId }) {
  const userData = await fetchUserData(userId); // Cached during render
  return <div>{userData.name}</div>;
}

// ✅ With proper arguments
'use cache';
function processData(data, filter) {
  // Pure function - deterministic result
  return data.filter(item => item.type === filter);
}

export default function DataList({ data, filter }) {
  const filtered = processData(data, filter); // Cached per filter value
  return (
    <ul>
      {filtered.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

// ✅ Multiple cache functions
'use cache';
function getUser(id) {
  return db.user.findUnique({ where: { id } });
}

'use cache';
function getPosts(userId) {
  return db.post.findMany({ where: { userId } });
}

export default async function Profile({ userId }) {
  const user = await getUser(userId); // Cached
  const posts = await getPosts(userId); // Cached separately
  return (
    <div>
      <h1>{user.name}</h1>
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}

// ✅ Note: 'use cache' caches during single render/request
// For persistent caching across requests, use fetch with cache options`}
            language="javascript"
          />
        </section>

        {/* Quick Reference Summary */}
        <section className="rounded-lg bg-blue-50 p-6 shadow-sm dark:bg-blue-900/20">
          <h2 className="mb-4 text-2xl font-semibold text-blue-900 dark:text-blue-100">
            Quick Reference: Common Debugging Patterns
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Server vs Client Issues
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Hooks → Add 'use client'</li>
                <li>Event handlers → Use Client Component</li>
                <li>Browser APIs → Move to Client Component</li>
                <li>Cookies → Use in Server Component only</li>
                <li>Metadata → Server Component only</li>
                <li>Server Component as prop → Pass children/data</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                State & Effects
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Missing deps → Add to dependency array</li>
                <li>Infinite loops → Remove deps or fix logic</li>
                <li>Stale closures → Use functional updates</li>
                <li>Missing cleanup → Return cleanup function</li>
                <li>Initialization → Use function for expensive ops</li>
                <li>useRef vs useState → Use ref for non-reactive values</li>
                <li>useCallback deps → Include all referenced vars</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Data Fetching
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Missing await → Add await to async calls</li>
                <li>Stale data → Revalidate cache after mutations</li>
                <li>Loading states → Check if data exists</li>
                <li>Undefined data → Handle null/undefined</li>
                <li>Promise in JSX → Await before returning</li>
                <li>Suspense missing → Wrap async components</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Forms & Actions
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Missing 'use server' → Add directive</li>
                <li>useFormState → Add prevState parameter</li>
                <li>Form not reset → Clear state after submit</li>
                <li>Validation → Handle in Server Action</li>
                <li>Progressive enhancement → Use native forms</li>
                <li>File upload → Use FormData, not JSON</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Rendering Issues
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Missing keys → Add unique key prop</li>
                <li>Hydration mismatch → Fix server/client diff</li>
                <li>Object rendering → Render properties</li>
                <li>Multiple roots → Wrap in Fragment</li>
                <li>Conditional hooks → Call at top level</li>
                <li>Error boundary → Only catches render errors</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Next.js Routing
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Route Handler → Return Response instance</li>
                <li>useSearchParams → Wrap in Suspense</li>
                <li>Router → Use next/navigation (not router)</li>
                <li>Parallel routes → Add @default slot</li>
                <li>Intercepting routes → Correct pattern matching</li>
                <li>Middleware → Configure matcher properly</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Advanced Hooks
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>useTransition → Use in event handlers only</li>
                <li>useOptimistic → Handle error reverting</li>
                <li>useCallback → Include all dependencies</li>
                <li>useRef → For non-reactive mutable values</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Next.js 16+ Features
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>'use cache' → Server Components only</li>
                <li>PPR → Enable in config, use properly</li>
                <li>Streaming → Use Response.stream()</li>
                <li>Edge runtime → No Node.js APIs</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Other Common Issues
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Import paths → Configure aliases or fix relative</li>
                <li>TypeScript → Define proper types/interfaces</li>
                <li>Env vars → Use NEXT_PUBLIC_ for client</li>
                <li>Context → Wrap with Provider</li>
                <li>Image → Add width/height or fill</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/app-router/b13/lesson-10"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: Advanced Patterns
          </Link>
        </div>
      </div>
    </div>
  );
}
