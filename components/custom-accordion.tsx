"use client"

import React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomAccordionProps {
  title: string
  children: React.ReactNode
  className?: string
  titleClassName?: string
  contentClassName?: string
  isOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

export function CustomAccordion({
  title,
  children,
  className,
  titleClassName,
  contentClassName,
  isOpen: controlledIsOpen,
  onToggle,
}: CustomAccordionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined)
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen

  // Update content height when content changes or when accordion opens/closes
  React.useEffect(() => {
    if (contentRef.current) {
      // Only measure when open to get accurate height
      if (isOpen) {
        setContentHeight(contentRef.current.scrollHeight)
      } else {
        setContentHeight(0)
      }
    }
  }, [isOpen, children])

  const handleToggle = () => {
    const newState = !isOpen
    if (onToggle) {
      onToggle(newState)
    } else {
      setInternalIsOpen(newState)
    }
  }

  return (
    <div className={cn("border-t", className)}>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex w-full items-center justify-between py-2 px-4 text-sm font-medium transition-all",
          titleClassName,
        )}
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")}
        />
      </button>
      <div
        ref={contentRef}
        className={cn("overflow-hidden transition-all duration-300", contentClassName)}
        style={{
          maxHeight: contentHeight !== undefined ? `${contentHeight}px` : isOpen ? "1000px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  )
}
