import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "A6.1: Custom _app.js",
    description:
      "Custom App component: structure, pageProps, global styles, layouts, state management, error boundaries, analytics, and getInitialProps",
    topics: [
      "Component structure",
      "pageProps handling",
      "Global styles",
      "Layout components",
      "State management setup",
      "Error boundaries",
      "Analytics integration",
      "getInitialProps in _app",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "A6.2: Custom _document.js",
    description:
      "Custom Document: structure, Html/Head/Main/NextScript, HTML attributes, meta tags, scripts, styled-components, Emotion, and language attributes",
    topics: [
      "Document structure",
      "Html, Head, Main, NextScript components",
      "Custom HTML attributes",
      "Custom meta tags",
      "Script injection",
      "Styled-components setup",
      "Emotion setup",
      "Language attributes",
    ],
    status: "available",
  },
];

export default function A6Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Pages Router Chapters
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A6: Custom App & Document
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to customize the App and Document components to add global
          functionality, styles, and HTML structure.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/pages-router/a6/${lesson.id}`}
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
