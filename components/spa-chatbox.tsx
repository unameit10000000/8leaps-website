"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { MarkdownContent } from "@/components/markdown-content"
import { cn } from "@/lib/utils"

const SESSION_STORAGE_KEY = "8leaps_chat_session"
const SESSION_TTL_MS = 60 * 60 * 1000 // 1 hour

type StoredSession = { sessionId: string; expiresAt: number }

function getStoredSession(): string | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as StoredSession
    if (!data.sessionId || !data.expiresAt) return null
    if (Date.now() >= data.expiresAt) {
      localStorage.removeItem(SESSION_STORAGE_KEY)
      return null
    }
    return data.sessionId
  } catch {
    return null
  }
}

function setStoredSession(sessionId: string): void {
  if (typeof window === "undefined") return
  const payload: StoredSession = {
    sessionId,
    expiresAt: Date.now() + SESSION_TTL_MS,
  }
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload))
}

function clearStoredSession(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(SESSION_STORAGE_KEY)
}

function getApiBase() {
  if (typeof window === "undefined") return "http://localhost:5000"
  return process.env.NEXT_PUBLIC_CHAT_API_BASE || "http://localhost:5000"
}

function getWsUrl(sessionId: string | null): string {
  const base = getApiBase()
  const wsBase = base.replace(/^http/, "ws")
  const url = `${wsBase}/ws/chat`
  if (sessionId) return `${url}?resume=${encodeURIComponent(sessionId)}`
  return url
}

export function Chatbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentStreamingReply, setCurrentStreamingReply] = useState("")
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [wsReady, setWsReady] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [awaitingResumeChoice, setAwaitingResumeChoice] = useState(false)
  const [loadingContinuedSession, setLoadingContinuedSession] = useState(false)
  const [reconnectKey, setReconnectKey] = useState(0)
  const [startNewRequested, setStartNewRequested] = useState(false)
  const [hasPreloadedConversation, setHasPreloadedConversation] = useState(false)
  const [tenSecondsPassed, setTenSecondsPassed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const streamingRef = useRef("")
  const preloadedMessagesRef = useRef<Array<{ role: "user" | "assistant"; content: string }>>([])
  const preloadedSessionIdRef = useRef<string | null>(null)
  const userClickedContinueRef = useRef(false)
  const connectedWithResumeRef = useRef(false)
  const { language } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentStreamingReply])

  // After 10s we may show the "no convo" badge (badge visible only when tenSecondsPassed && !hasConversation)
  useEffect(() => {
    const t = setTimeout(() => setTenSecondsPassed(true), 10_000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const normalizeMessages = useCallback((data: { messages?: unknown[]; conversation?: unknown[] }) => {
    const list: Array<{ role?: string; content?: string }> = Array.isArray(data.messages)
      ? (data.messages as Array<{ role?: string; content?: string }>)
      : Array.isArray(data.conversation)
        ? (data.conversation as Array<{ role?: string; content?: string }>)
        : []
    return list.map((m) => ({
      role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: typeof m.content === "string" ? m.content : String(m.content ?? ""),
    }))
  }, [])

  const onPreloadDone = useCallback(() => {
    if ((preloadedMessagesRef.current?.length ?? 0) > 0) {
      setHasPreloadedConversation(true)
    }
    if (userClickedContinueRef.current) {
      setMessages(preloadedMessagesRef.current ?? [])
      setLoadingContinuedSession(false)
      userClickedContinueRef.current = false
    }
  }, [])

  const loadHistoryIntoRef = useCallback(
    async (sessionId: string, onDone?: () => void) => {
      const base = getApiBase()
      try {
        const res = await fetch(`${base}/api/sessions/${sessionId}/conversation`)
        if (res.ok) {
          const data = await res.json()
          preloadedMessagesRef.current = normalizeMessages(data)
        } else {
          preloadedMessagesRef.current = []
        }
      } catch {
        preloadedMessagesRef.current = []
      } finally {
        onDone?.()
      }
    },
    [normalizeMessages]
  )

  // Preload conversation as soon as we have a stored session (before user opens chat)
  useEffect(() => {
    const id = getStoredSession()
    if (id) {
      preloadedSessionIdRef.current = id
      loadHistoryIntoRef(id, onPreloadDone)
    }
  }, [loadHistoryIntoRef, onPreloadDone])

  const loadHistory = useCallback(
    async (sessionId: string) => {
      const base = getApiBase()
      try {
        const res = await fetch(`${base}/api/sessions/${sessionId}/conversation`)
        if (res.ok) {
          const data = await res.json()
          setMessages(normalizeMessages(data))
        }
      } catch {
        // API unreachable or network error
      } finally {
        setLoadingHistory(false)
      }
    },
    [normalizeMessages]
  )

  useEffect(() => {
    if (!isOpen) {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
      setWsReady(false)
      setConnectionError(null)
      setCurrentStreamingReply("")
      setLoadingHistory(false)
      setAwaitingResumeChoice(false)
      setLoadingContinuedSession(false)
      streamingRef.current = ""
      return
    }

    const useNewSession = startNewRequested
    if (useNewSession) setStartNewRequested(false)
    const sessionId = useNewSession ? null : getStoredSession()
    const url = getWsUrl(sessionId)

    if (!sessionId) {
      setMessages([])
      setAwaitingResumeChoice(false)
    } else {
      setAwaitingResumeChoice(true)
    }

    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      setConnectionError(null)
      setWsReady(true)
      connectedWithResumeRef.current = !!sessionId
      if (sessionId) {
        const alreadyLoaded =
          preloadedSessionIdRef.current === sessionId &&
          (preloadedMessagesRef.current?.length ?? 0) > 0
        if (!alreadyLoaded) {
          preloadedSessionIdRef.current = sessionId
          loadHistoryIntoRef(sessionId, onPreloadDone)
        }
      } else {
        setLoadingHistory(false)
      }
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        switch (data.type) {
          case "assistant":
            streamingRef.current += data.content ?? ""
            setCurrentStreamingReply(streamingRef.current)
            break
          case "turn_done": {
            const full = streamingRef.current
            streamingRef.current = ""
            setCurrentStreamingReply("")
            if (full) setMessages((prev) => [...prev, { role: "assistant", content: full }])
            setIsTyping(false)
            break
          }
          case "session_id":
            if (data.session_id) {
              setStoredSession(data.session_id)
              if (connectedWithResumeRef.current) {
                loadHistory(data.session_id)
              }
            }
            break
          case "error":
            setConnectionError(data.message ?? "Something went wrong.")
            setIsTyping(false)
            streamingRef.current = ""
            setCurrentStreamingReply("")
            break
        }
      } catch {
        setConnectionError("Invalid response from assistant.")
      }
    }

    ws.onclose = () => {
      setWsReady(false)
      wsRef.current = null
    }

    ws.onerror = () => {
      setConnectionError(
        language === "en"
          ? "Could not connect to the assistant. Is the API running on port 5000?"
          : "Kon geen verbinding maken met de assistent. Draait de API op poort 5000?"
      )
    }

    return () => {
      ws.close()
      wsRef.current = null
    }
  }, [isOpen, language, loadHistory, loadHistoryIntoRef, onPreloadDone, reconnectKey])

  const handleSend = () => {
    if (!input.trim()) return
    const ws = wsRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      setConnectionError(
        language === "en" ? "Not connected. Please wait or reopen the chat." : "Niet verbonden. Wacht even of open de chat opnieuw."
      )
      return
    }

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setConnectionError(null)
    setIsTyping(true)
    streamingRef.current = ""
    setCurrentStreamingReply("")

    try {
      ws.send(JSON.stringify({ content: userMessage }))
    } catch {
      setConnectionError(
        language === "en" ? "Failed to send message." : "Bericht verzenden mislukt."
      )
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleContinueSession = () => {
    setAwaitingResumeChoice(false)
    userClickedContinueRef.current = true
    if ((preloadedMessagesRef.current?.length ?? 0) > 0) {
      setMessages(preloadedMessagesRef.current ?? [])
    } else {
      setLoadingContinuedSession(true)
    }
  }

  const handleStartNewSession = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setWsReady(false)
    setConnectionError(null)
    setLoadingContinuedSession(false)
    setHasPreloadedConversation(false)
    clearStoredSession()
    preloadedSessionIdRef.current = null
    setAwaitingResumeChoice(false)
    setMessages([])
    setStartNewRequested(true)
    setReconnectKey((k) => k + 1)
  }

  const initialMessage = language === "en" 
    ? "Hi! I'm here to help you find the perfect solution for your project. What would you like to know?"
    : "Hoi! Ik ben hier om u te helpen de perfecte oplossing voor uw project te vinden. Wat wilt u weten?"

  const hasConversation = messages.length > 0 || hasPreloadedConversation
  const showNoConvoBadge = tenSecondsPassed && !hasConversation

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300",
              hasConversation && "shadow-[0_0_20px_4px_rgba(255,255,255,0.6)]"
            )}
            aria-label="Open chat"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </Button>
          {showNoConvoBadge && (
            <span
              className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 border-2 border-card"
              aria-hidden
            />
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[90vw] max-w-md h-[600px] bg-card border-2 rounded-lg shadow-2xl flex flex-col transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-green-500 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-semibold">
              {language === "en" ? "8Leaps Assistant" : "8Leaps Assistent"}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {awaitingResumeChoice && (
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm font-medium">
                    {language === "en"
                      ? "We found a previous conversation. Continue or start new?"
                      : "We hebben een eerder gesprek gevonden. Doorgaan of nieuw starten?"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 pl-11">
                <Button
                  onClick={handleContinueSession}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {language === "en" ? "Continue" : "Doorgaan"}
                </Button>
                <Button
                  onClick={handleStartNewSession}
                  variant="outline"
                  className="border-muted-foreground"
                >
                  {language === "en" ? "Start new" : "Nieuw starten"}
                </Button>
              </div>
            </div>
          )}

          {!awaitingResumeChoice && (loadingHistory || loadingContinuedSession) && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Loading conversation…" : "Gesprek laden…"}
                </p>
              </div>
            </div>
          )}

          {!awaitingResumeChoice && messages.length === 0 && !loadingHistory && !loadingContinuedSession && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                <p className="text-sm">{initialMessage}</p>
              </div>
            </div>
          )}

          {!awaitingResumeChoice && messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-start gap-3",
                msg.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              {msg.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              )}
              <div
                className={cn(
                  "rounded-lg p-3 max-w-[80%]",
                  msg.role === "user"
                    ? "bg-green-500 text-white [&_.markdown-content_a]:text-white [&_.markdown-content_a]:underline"
                    : "bg-muted"
                )}
              >
                <MarkdownContent content={msg.content} className="text-sm" />
              </div>
            </div>
          ))}

          {!awaitingResumeChoice && currentStreamingReply && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                <MarkdownContent content={currentStreamingReply} className="text-sm" />
              </div>
            </div>
          )}

          {!awaitingResumeChoice && isTyping && !currentStreamingReply && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {!awaitingResumeChoice && connectionError && (
            <div className="rounded-lg p-3 bg-destructive/10 text-destructive text-sm">
              {connectionError}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={cn("p-4 border-t", awaitingResumeChoice && "opacity-60 pointer-events-none")}>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === "en" ? "Type your message..." : "Typ uw bericht..."}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping || !wsReady || awaitingResumeChoice}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
