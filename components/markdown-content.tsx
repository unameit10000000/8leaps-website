"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

const proseClasses = {
  p: "mb-2 last:mb-0",
  h1: "text-lg font-semibold mt-3 mb-2",
  h2: "text-base font-semibold mt-3 mb-2",
  h3: "text-sm font-semibold mt-2 mb-1",
  ul: "list-disc list-inside mb-2 space-y-0.5",
  ol: "list-decimal list-inside mb-2 space-y-0.5",
  li: "text-inherit",
  blockquote: "border-l-2 border-muted-foreground/50 pl-3 my-2 text-muted-foreground italic",
  code: "bg-muted rounded px-1.5 py-0.5 text-xs font-mono",
  pre: "bg-muted rounded-md p-3 overflow-x-auto my-2 border border-border",
  a: "text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 underline underline-offset-2",
  table: "w-full border-collapse my-2 text-sm",
  thead: "border-b border-border",
  th: "text-left py-1.5 px-2 font-medium",
  td: "border-b border-border/80 py-1.5 px-2",
  tr: "",
  hr: "my-3 border-border",
  strong: "font-semibold",
  em: "italic",
}

export function MarkdownContent({
  content,
  className,
}: {
  content: string
  className?: string
}) {
  return (
    <div
      className={cn("markdown-content break-words", className)}
      data-testid="markdown-content"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className={proseClasses.p}>{children}</p>,
          h1: ({ children }) => <h1 className={proseClasses.h1}>{children}</h1>,
          h2: ({ children }) => <h2 className={proseClasses.h2}>{children}</h2>,
          h3: ({ children }) => <h3 className={proseClasses.h3}>{children}</h3>,
          ul: ({ children }) => <ul className={proseClasses.ul}>{children}</ul>,
          ol: ({ children }) => <ol className={proseClasses.ol}>{children}</ol>,
          li: ({ children }) => <li className={proseClasses.li}>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className={proseClasses.blockquote}>{children}</blockquote>
          ),
          code: ({ className: codeClassName, children, ...props }) => {
            const isInline = !codeClassName?.startsWith("language-")
            if (isInline) {
              return (
                <code className={proseClasses.code} {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code className={cn(proseClasses.code, "block w-full py-1")} {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => <pre className={proseClasses.pre}>{children}</pre>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={proseClasses.a}
            >
              {children}
            </a>
          ),
          table: ({ children }) => <table className={proseClasses.table}>{children}</table>,
          thead: ({ children }) => <thead className={proseClasses.thead}>{children}</thead>,
          th: ({ children }) => <th className={proseClasses.th}>{children}</th>,
          td: ({ children }) => <td className={proseClasses.td}>{children}</td>,
          tr: ({ children }) => <tr className={proseClasses.tr}>{children}</tr>,
          hr: () => <hr className={proseClasses.hr} />,
          strong: ({ children }) => <strong className={proseClasses.strong}>{children}</strong>,
          em: ({ children }) => <em className={proseClasses.em}>{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
