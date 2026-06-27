import { useEffect } from 'react'
import MyEditor from './components/Editor'
import { Sidebar } from './components/Sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { applyThemeVars } from './themes/tokens'
import { catppuccinTokens } from './themes/catppuccin'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import useSidebarPanel from './hooks/useSidbarPanel'

function App(): React.JSX.Element {
  const {
    panelRef,
    sidebarElementRef,
    toggleSidebar,
    handleSidebarResize,
    sidebarCollapsed,
    SIDEBAR_CONSTANTS
  } = useSidebarPanel()

  useEffect(() => {
    window.api.config.get().then(({ appearance }) => {
      if (appearance.theme === 'catppuccin') {
        applyThemeVars(catppuccinTokens(appearance.variant))
      }
    })
  }, [])

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
          defaultSize={SIDEBAR_CONSTANTS.SIZEBAR_SIZE_DEFAULT}
          minSize={SIDEBAR_CONSTANTS.SIZEBAR_SIZE_MIN}
          maxSize={SIDEBAR_CONSTANTS.SIZEBAR_SIZE_MAX}
          collapsible
          collapsedSize={SIDEBAR_CONSTANTS.COLLAPSED_SIZE}
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
              style={{
                borderBottom: '1px solid var(--color-surface1)',
                color: 'var(--color-overlay2)'
              }}
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
