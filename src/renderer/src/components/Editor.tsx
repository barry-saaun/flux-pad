import { useRef, useEffect, useState } from 'react'
import ReactCodeMirror, { Extension, ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { vim } from '@replit/codemirror-vim'
import { basicSetup } from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { loadCatppuccinTheme } from '../themes/catppuccin'
import type { AppearanceConfig } from '../../../main/config/appearance'
import MarkdownPreview from './MarkdownPreview'
import './Editor.css'

// TODO: remove the VIM from the base extension later
const baseExtensions = [basicSetup(), vim(), markdown()]

const MyEditor = () => {
  const viewRef = useRef<ReactCodeMirrorRef>(null)
  const [doc, setDoc] = useState('# Heading 1')
  const [themeExtension, setThemeExtension] = useState<Extension | null>(null)

  useEffect(() => {
    window.api.config.get().then(({ appearance }) => {
      setThemeExtension(loadCatppuccinTheme(appearance as AppearanceConfig))
    })
  }, [])

  return (
    <div className="flex flex-row h-screen w-full overflow-hidden">
      <div className="flex-1 h-full overflow-auto">
        <ReactCodeMirror
          ref={viewRef}
          value={doc}
          height="100%"
          extensions={themeExtension ? [...baseExtensions, themeExtension] : baseExtensions}
          onChange={(value) => setDoc(value)}
          style={{ height: '100%' }}
        />
      </div>
      <div className="w-px bg-gray-700 shrink-0" />
      <div className="flex-1 h-full overflow-hidden">
        <MarkdownPreview content={doc} />
      </div>
    </div>
  )
}

export default MyEditor
