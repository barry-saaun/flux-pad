import { useRef, useEffect, useState } from 'react'
import ReactCodeMirror, { Extension, lineNumbers, ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import Markdown from 'react-markdown'
import { gruvboxDark } from '@uiw/codemirror-theme-gruvbox-dark'
import remarkGfm from 'remark-gfm'

const MyEditor = () => {
  const viewRef = useRef<ReactCodeMirrorRef>(null)

  const [doc, setDoc] = useState('# Heading 1')

  return (
    <div className="w-full min-h-screen flex flex-row justify-center items-center">
      <div className="w-full min-h-screen justify-between items-center flex flex-row">
        <ReactCodeMirror
          value={doc}
          height="200px"
          width="800px"
          maxWidth="1000px"
          extensions={[markdown(), lineNumbers(), gruvboxDark]}
          onChange={(value, ViewUpdate) => {
            setDoc(value)
          }}
        />
        <div className="h-6 w-px bg-gray-300 mx-4" />
      </div>
      <div className="prose prose-invert lg:prose-lg p-4 w-full">
        <Markdown remarkPlugins={[remarkGfm]}>{doc}</Markdown>
      </div>
    </div>
  )
}

export default MyEditor
