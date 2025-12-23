import Link from "next/link";

const lessons = [
  {
    id: "lesson-1",
    title: "A7.1: CSS Modules",
    description:
      "Scoped CSS with CSS Modules: file naming, scoped styles, composition, and global styles",
    topics: [
      "File naming (*.module.css)",
      "Scoped styles",
      "Composition",
      "Global styles in modules",
    ],
    status: "available",
  },
  {
    id: "lesson-2",
    title: "A7.2: Global CSS",
    description:
      "Global stylesheets: importing, CSS reset, CSS variables, and dark mode",
    topics: [
      "Importing global styles",
      "CSS reset",
      "CSS variables",
      "Dark mode",
    ],
    status: "available",
  },
  {
    id: "lesson-3",
    title: "A7.3: CSS-in-JS",
    description:
      "CSS-in-JS solutions: styled-components, Emotion, Styled JSX, and theme providers",
    topics: [
      "Styled-components",
      "Emotion",
      "Styled JSX (built-in)",
      "Theme providers",
    ],
    status: "available",
  },
  {
    id: "lesson-4",
    title: "A7.4: Sass/SCSS",
    description:
      "Sass/SCSS styling: setup, configuration, variables, mixins, and nested styles",
    topics: [
      "Setup and configuration",
      "Variables and mixins",
      "Nested styles",
    ],
    status: "available",
  },
  {
    id: "lesson-5",
    title: "A7.5: Tailwind CSS",
    description:
      "Tailwind CSS utility-first styling: setup, configuration, PurgeCSS, and custom utilities",
    topics: ["Setup", "Configuration", "PurgeCSS", "Custom utilities"],
    status: "available",
  },
];

export default function A7Page() {
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
          A7: Styling
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete guide to styling in Next.js Pages Router: CSS Modules, Global
          CSS, CSS-in-JS, Sass/SCSS, and Tailwind CSS.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/pages-router/a7/${lesson.id}`}
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
