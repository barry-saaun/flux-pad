import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FileTree, type FileTreeNode } from './FileTree'

const DEMO_TREE: FileTreeNode[] = [
  { id: '01', name: '01 - Uni Notes', type: 'folder', children: [] },
  { id: '02', name: '02 - Resources', type: 'folder', children: [] },
  {
    id: '06', name: '06 - Projects', type: 'folder',
    children: [
      {
        id: '06-flux', name: 'Flux-pad', type: 'folder',
        children: [
          { id: '06-flux-arch', name: 'Architecture', type: 'folder', children: [] },
          { id: '06-flux-style', name: 'Styling', type: 'folder', children: [] },
          { id: '06-flux-theme', name: 'themes config', type: 'folder', children: [] },
          { id: '06-flux-electron', name: 'Electron Layers & Processes', type: 'file' },
          { id: '06-flux-todo', name: 'Project TODO Board', type: 'file' },
          { id: '06-flux-untitled', name: 'Untitled', type: 'file' },
        ],
      },
    ],
  },
  { id: '07', name: '07 - Main Notes', type: 'folder', children: [] },
]

interface SidebarProps {
  collapsed: boolean
  className?: string
}

export function Sidebar({ collapsed, className }: SidebarProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>()

  return (
    <div
      className={cn('flex h-full flex-col overflow-hidden', className)}
      style={{ backgroundColor: 'var(--color-mantle)', color: 'var(--color-text)' }}
    >
      {/* Label row — only visible when expanded */}
      <div
        className={cn(
          'px-3 py-2 text-xs font-medium tracking-wider uppercase transition-opacity duration-200',
          collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        style={{ borderBottom: '1px solid var(--color-surface1)', color: 'var(--color-overlay1)' }}
      >
        Files
      </div>

      {/* Tree */}
      <div
        className={cn(
          'flex-1 overflow-y-auto py-2 px-1 transition-opacity duration-200',
          collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
      >
        <FileTree nodes={DEMO_TREE} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
    </div>
  )
}
