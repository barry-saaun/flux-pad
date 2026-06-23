import { useRef, useEffect, useState, useMemo } from 'react'
import ReactCodeMirror, { lineNumbers, ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import Markdown from 'react-markdown'
import { gruvboxDark } from '@uiw/codemirror-theme-gruvbox-dark'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

import 'highlight.js/styles/github-dark.css'

const extensions = [markdown(), lineNumbers(), gruvboxDark]
const markdownPlugins = {
  remark: [remarkGfm],
  rehype: [rehypeHighlight]
}

const MyEditor = () => {
  const viewRef = useRef<ReactCodeMirrorRef>(null)

  const [doc, setDoc] = useState('# Heading 1')

  return (
    <div className="flex flex-row h-screen w-full overflow-hidden">
      <div className="flex-1 h-full overflow-auto">
        <ReactCodeMirror
          ref={viewRef}
          value={doc}
          height="100%"
          extensions={extensions}
          onChange={(value) => setDoc(value)}
          style={{ height: '100%' }}
        />
      </div>
      <div className="w-px bg-gray-700 shrink-0" />
      <div className="flex-1 h-full overflow-auto">
        <div className="prose prose-invert lg:prose-lg mx-auto px-12 py-10">
          <Markdown remarkPlugins={markdownPlugins.remark} rehypePlugins={markdownPlugins.rehype}>
            {doc}
          </Markdown>
        </div>
      </div>
    </div>
  )
}

export default MyEditor
