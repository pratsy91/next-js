import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "B9.1: CSS Modules",
    description:
      "File naming (*.module.css), scoped styles, composition, and global styles",
    topics: [
      "File naming (*.module.css)",
      "Scoped styles",
      "Composition",
      "Global styles",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "B9.2: Global CSS",
    description: "Importing in layout, CSS reset, CSS variables, and dark mode",
    topics: ["Importing in layout", "CSS reset", "CSS variables", "Dark mode"],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "B9.3: CSS-in-JS",
    description: "Styled-components, Emotion, Styled JSX, and theme providers",
    topics: [
      "Styled-components (Client Components)",
      "Emotion (Client Components)",
      "Styled JSX",
      "Theme providers",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "B9.4: Sass/SCSS",
    description: "Setup, variables and mixins, and nested styles",
    topics: ["Setup", "Variables and mixins", "Nested styles"],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "B9.5: Tailwind CSS",
    description: "Setup, configuration, custom utilities, and dark mode",
    topics: ["Setup", "Configuration", "Custom utilities", "Dark mode"],
    status: "available",
  },
];

export default function B9Page() {
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
          B9: Styling
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master styling in Next.js App Router. Learn CSS Modules, Global CSS,
          CSS-in-JS, Sass/SCSS, and Tailwind CSS for modern web styling.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/app-router/b9/${lesson.id}`}
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
