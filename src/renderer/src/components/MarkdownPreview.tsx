import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkBreaks from 'remark-breaks'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'

import 'highlight.js/styles/github-dark.css'
import './MarkdownPreview.css'

const remarkPlugins = [remarkGfm, remarkBreaks, remarkMath]
const rehypePlugins = [rehypeHighlight, rehypeKatex]

interface Props {
  content: string
}

const MarkdownPreview = ({ content }: Props) => {
  return (
    <div className="markdown-preview h-full overflow-auto">
      <div className="prose prose-invert">
        <Markdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
          {content}
        </Markdown>
      </div>
    </div>
  )
}

export default MarkdownPreview
