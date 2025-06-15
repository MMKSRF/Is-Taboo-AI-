// src/components/ChatUiHandel.jsx

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders AI-generated content with rich Markdown formatting using Tailwind CSS.
 * This component handles paragraphs, lists, bold/italics, headers, code blocks, and more.
 *
 * @param {object} props - The component props.
 * @param {string} props.content - The Markdown string to render.
 */
export default function ChatUiHandel({ content }) {
  return (
    // The `prose` classes from @tailwindcss/typography provide beautiful defaults.
    // `prose-invert` is for dark backgrounds. `max-w-none` removes width constraints.
    // We add our own text color for the base paragraph.
    <div className="prose prose-sm prose-invert max-w-none text-gray-200">
      <ReactMarkdown
        // remarkGfm is crucial for tables, strikethrough, etc.
        remarkPlugins={[remarkGfm]}
        components={{
          // Control font size and weight for headers
          h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-white mb-3" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-lg font-semibold text-gray-100 mb-2 border-b border-gray-600 pb-1" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-base font-semibold text-gray-200 mb-2" {...props} />,

          // Improve list styling
          ul: ({ node, ...props }) => <ul className="list-disc pl-5" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          
          // Ensure paragraphs have proper spacing
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,

          // Make links stand out
          a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
          
          // Style bold text for emphasis
          strong: ({ node, ...props }) => <strong className="font-bold text-gray-100" {...props} />,

          // Custom styling for code blocks to make them look great
          code({ node, inline, className, children, ...props }) {
            return !inline ? (
              <pre className="bg-black/40 p-3 my-3 rounded-lg overflow-x-auto">
                <code className={`text-sm font-mono ${className}`} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              // Inline code
              <code className="bg-gray-600 text-red-300 font-mono text-sm rounded px-1.5 py-0.5 mx-0.5" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}