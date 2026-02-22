"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type TransitionType = "fade" | "slide" | "zoom"

interface PageTransitionProps {
  viewKey: string
  type?: TransitionType
  children: ReactNode
}

export function PageTransition({ viewKey, type = "fade", children }: PageTransitionProps) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter")
  const [activeKey, setActiveKey] = useState(viewKey)
  const [activeChildren, setActiveChildren] = useState<ReactNode>(children)
  const pendingRef = useRef<{ key: string; children: ReactNode; type: TransitionType } | null>(null)

  useEffect(() => {
    if (viewKey === activeKey) {
      // Misma vista, actualizar contenido directo
      setActiveChildren(children)
      return
    }

    // Nueva vista: guardar pending y comenzar exit
    pendingRef.current = { key: viewKey, children, type }
    setPhase("exit")

    const timeout = setTimeout(() => {
      const pending = pendingRef.current
      if (pending) {
        setActiveKey(pending.key)
        setActiveChildren(pending.children)
        pendingRef.current = null
        setPhase("enter")
      }
    }, 150)

    return () => clearTimeout(timeout)
  }, [viewKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const className =
    phase === "enter"
      ? `page-transition-${type}`
      : "page-exit-active"

  return (
    <div key={activeKey} className={className}>
      {activeChildren}
    </div>
  )
}
