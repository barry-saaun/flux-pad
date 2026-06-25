export type PropertiesInDocument = 'visible' | 'hidden' | 'source'

export type EditorConfig = {
  // Display
  readableLineLength: boolean
  strictLineBreaks: boolean
  propertiesInDocument: PropertiesInDocument
  foldHeading: boolean
  foldIndent: boolean
  lineNumbers: boolean
  indentationGuides: boolean
  rightToLeft: boolean

  // Behaviour
  spellcheck: boolean
  autoPairBrackets: boolean
  autoPairMarkdownSyntax: boolean
  smartLists: boolean
  indentUsingTabs: boolean
  indentVisualWidth: number
}

export const DEFAULT_EDITOR_CONFIG: EditorConfig = {
  // Display
  readableLineLength: true,
  strictLineBreaks: false,
  propertiesInDocument: 'visible',
  foldHeading: true,
  foldIndent: true,
  lineNumbers: false,
  indentationGuides: false,
  rightToLeft: false,

  // Behaviour
  spellcheck: true,
  autoPairBrackets: false,
  autoPairMarkdownSyntax: false,
  smartLists: false,
  indentUsingTabs: false,
  indentVisualWidth: 4
}
