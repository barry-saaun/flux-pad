import { useEffect, useRef, useState } from 'react'
import type { PanelImperativeHandle, PanelSize } from 'react-resizable-panels'
import MyEditor from './components/Editor'
import { Sidebar } from './components/Sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { applyThemeVars } from './themes/tokens'
import { catppuccinTokens } from './themes/catppuccin'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

const COLLAPSED_SIZE = 10 
const SIZEBAR_SIZE_MAX = 600
const SIZEBAR_SIZE_MIN = 200
const SIZEBAR_SIZE_DEFAULT = 350

function App(): React.JSX.Element {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const panelRef = useRef<PanelImperativeHandle | null>(null)
  const sidebarElementRef = useRef<HTMLDivElement | null>(null)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    window.api.config.get().then(({ appearance }) => {
      if (appearance.theme === 'catppuccin') {
        applyThemeVars(catppuccinTokens(appearance.variant))
      }
    })
  }, [])

  function handleSidebarResize(size: PanelSize) {
    setSidebarCollapsed(size.asPercentage <= COLLAPSED_SIZE)
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

  return (
    <div
      className="flex h-screen w-full flex-col overflow-hidden"
      style={{ backgroundColor: 'var(--color-base)', color: 'var(--color-text)' }}
    >
      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        {/* Sidebar panel */}
        <ResizablePanel
          panelRef={panelRef}
          elementRef={sidebarElementRef}
          defaultSize={SIZEBAR_SIZE_DEFAULT}
          minSize={SIZEBAR_SIZE_MIN}
          maxSize={SIZEBAR_SIZE_MAX}
          collapsible
          collapsedSize={COLLAPSED_SIZE}
          onResize={handleSidebarResize}
        >
          <Sidebar collapsed={sidebarCollapsed} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Editor panel */}
        <ResizablePanel defaultSize={78} minSize={40}>
          <div className="flex h-full flex-col">
            {/* Editor header — toggle button always lives here */}
            <div
              className="flex items-center gap-2 px-3 py-2 text-sm"
              style={{ borderBottom: '1px solid var(--color-surface1)', color: 'var(--color-overlay2)' }}
            >
              <button
                onClick={toggleSidebar}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded transition-colors hover:bg-[var(--color-surface0)]"
                style={{ color: 'var(--color-overlay1)' }}
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {sidebarCollapsed ? (
                  <ChevronsRight className="h-3.5 w-3.5" />
                ) : (
                  <ChevronsLeft className="h-3.5 w-3.5" />
                )}
              </button>
              <span>File name</span>
            </div>

            <div className="flex-1 overflow-hidden">
              <MyEditor />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default App
