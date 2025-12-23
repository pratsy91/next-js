"use client";

import { useState } from "react";

export default function CodeBlock({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4">
      <div className="flex items-center justify-between rounded-t-lg bg-gray-800 px-4 py-2">
        <span className="text-sm text-gray-400">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-sm text-gray-400 hover:text-white"
          title="Copy code"
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-b-lg bg-gray-900 p-4 text-sm text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
