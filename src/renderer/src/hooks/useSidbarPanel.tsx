import { useRef, useState } from 'react'
import type { PanelImperativeHandle, PanelSize } from 'react-resizable-panels'

const SIDEBAR_CONSTANTS: Record<string, number> = {
  COLLAPSED_SIZE: 10,
  SIZEBAR_SIZE_MAX: 400,
  SIZEBAR_SIZE_MIN: 200,
  SIZEBAR_SIZE_DEFAULT: 350
}

export default function useSidebarPanel() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const panelRef = useRef<PanelImperativeHandle | null>(null)
  const sidebarElementRef = useRef<HTMLDivElement | null>(null)
  const isAnimatingRef = useRef(false)

  function handleSidebarResize(size: PanelSize) {
    setSidebarCollapsed(size.asPercentage <= SIDEBAR_CONSTANTS.COLLAPSED_SIZE)
  }

  function toggleSidebar() {
    const panel = panelRef.current
    const el = sidebarElementRef.current
    if (!panel || !el || isAnimatingRef.current) return

    isAnimatingRef.current = true
    el.style.transition = 'flex 200ms ease'

    requestAnimationFrame(() => {
      if (sidebarCollapsed) {
        panel.expand()
      } else {
        panel.collapse()
      }
      window.setTimeout(() => {
        el.style.transition = ''
        isAnimatingRef.current = false
      }, 220)
    })
  }

  return {
    panelRef,
    sidebarElementRef,
    toggleSidebar,
    handleSidebarResize,
    sidebarCollapsed,
    SIDEBAR_CONSTANTS
  }
}
