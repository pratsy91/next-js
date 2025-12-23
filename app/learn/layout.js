import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Next.js Learning Platform",
  description: "Master Next.js with comprehensive lessons",
};

export default function LearnLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
