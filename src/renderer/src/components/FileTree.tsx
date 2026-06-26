import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronRight, File, Folder, FolderOpen } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface FileTreeNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileTreeNode[]
}

interface TreeNodeProps {
  node: FileTreeNode
  depth?: number
  selectedId?: string
  onSelect?: (id: string) => void
}

function TreeNode({ node, depth = 0, selectedId, onSelect }: TreeNodeProps) {
  const [open, setOpen] = useState(false)
  const isSelected = selectedId === node.id
  const indent = depth * 12

  if (node.type === 'file') {
    return (
      <button
        onClick={() => onSelect?.(node.id)}
        className={cn(
          'flex w-full items-center gap-1.5 rounded px-2 py-[3px] text-left text-sm transition-colors',
          'hover:bg-[var(--color-surface0)]',
          isSelected && 'bg-[var(--color-surface0)]'
        )}
        style={{ paddingLeft: `${indent + 8}px`, color: 'var(--color-subtext1)' }}
      >
        <File className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-overlay2)' }} />
        <span className="truncate">{node.name}</span>
      </button>
    )
  }

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <button
          className={cn(
            'flex w-full items-center gap-1.5 rounded px-2 py-[3px] text-left text-sm transition-colors',
            'hover:bg-[var(--color-surface0)]',
            isSelected && 'bg-[var(--color-surface0)]'
          )}
          style={{ paddingLeft: `${indent + 8}px`, color: 'var(--color-text)' }}
          onClick={() => onSelect?.(node.id)}
        >
          <ChevronRight
            className={cn('h-3 w-3 shrink-0 transition-transform duration-150', open && 'rotate-90')}
            style={{ color: 'var(--color-overlay1)' }}
          />
          {open ? (
            <FolderOpen className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-accent)' }} />
          ) : (
            <Folder className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-overlay2)' }} />
          )}
          <span className="truncate">{node.name}</span>
        </button>
      </Collapsible.Trigger>

      <Collapsible.Content>
        {node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            depth={depth + 1}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

interface FileTreeProps {
  nodes: FileTreeNode[]
  selectedId?: string
  onSelect?: (id: string) => void
  className?: string
}

export function FileTree({ nodes, selectedId, onSelect, className }: FileTreeProps) {
  return (
    <div className={cn('flex flex-col gap-px', className)}>
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} selectedId={selectedId} onSelect={onSelect} />
      ))}
    </div>
  )
}
