import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B4.1: Server Actions Basics",
    description:
      "'use server' directive, Server Action functions, async actions, error handling, and TypeScript types",
    topics: [
      "'use server' directive",
      "Server Action functions",
      "Async Server Actions",
      "Error handling",
      "TypeScript types",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B4.2: Form Actions",
    description:
      "Forms with Server Actions, Progressive Enhancement, useFormStatus, useFormState, validation, file uploads, and multi-step forms",
    topics: [
      "Form with Server Actions",
      "Progressive Enhancement",
      "useFormStatus hook",
      "useFormState hook",
      "Form validation",
      "File uploads",
      "Multi-step forms",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B4.3: Server Actions Patterns",
    description:
      "Inline Server Actions, Server Action files, revalidation after actions, optimistic updates, and error handling patterns",
    topics: [
      "Inline Server Actions",
      "Server Action files",
      "Revalidation after actions",
      "Optimistic updates",
      "Error handling patterns",
    ],
    status: "available",
  },
];

export default function B4Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to App Router Chapters
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B4: Server Actions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master Server Actions in Next.js App Router. Learn how to create
          server-side functions, handle forms with progressive enhancement, and
          implement advanced patterns for data mutations.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b4/${lesson.id}`}
            className="block rounded-lg border-2 border-blue-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
          >
            <h2 className="mb-2 text-2xl font-semibold text-blue-600 dark:text-blue-400">
              {lesson.title}
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {lesson.description}
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Topics Covered:
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {lesson.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
