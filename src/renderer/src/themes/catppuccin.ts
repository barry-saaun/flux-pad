import { flavors, type FlavorName } from '@catppuccin/palette'
import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'
import type { AppearanceConfig } from '../../../main/config/appearance'
import type { Extension } from '@uiw/react-codemirror'
import { applyThemeVars, type ThemeTokens } from './tokens'

const darkFlavors: FlavorName[] = ['mocha', 'macchiato', 'frappe']

export const createCatppuccinTheme = (flavor: FlavorName): Extension => {
  const c = flavors[flavor].colors
  const isDark = darkFlavors.includes(flavor)

  return createTheme({
    theme: isDark ? 'dark' : 'light',
    settings: {
      background: c.base.hex,
      foreground: c.text.hex,
      caret: c.rosewater.hex,
      selection: c.surface2.hex,
      selectionMatch: c.surface1.hex,
      lineHighlight: c.surface0.hex,
      gutterBackground: c.mantle.hex,
      gutterForeground: c.overlay1.hex
    },
    styles: [
      { tag: t.comment, color: c.overlay0.hex, fontStyle: 'italic' },
      { tag: t.keyword, color: c.mauve.hex },
      { tag: t.string, color: c.green.hex },
      { tag: t.number, color: c.peach.hex },
      { tag: t.bool, color: c.peach.hex },
      { tag: t.null, color: c.peach.hex },
      { tag: t.variableName, color: c.text.hex },
      { tag: t.definition(t.variableName), color: c.blue.hex },
      { tag: t.function(t.variableName), color: c.blue.hex },
      { tag: t.typeName, color: c.yellow.hex },
      { tag: t.className, color: c.yellow.hex },
      { tag: t.propertyName, color: c.blue.hex },
      { tag: t.operator, color: c.sky.hex },
      { tag: t.punctuation, color: c.overlay2.hex },
      { tag: t.angleBracket, color: c.overlay2.hex },
      { tag: t.tagName, color: c.red.hex },
      { tag: t.attributeName, color: c.yellow.hex }
    ]
  })
}

export const loadCatppuccinTheme = (config: AppearanceConfig): Extension => {
  if (config.theme !== 'catppuccin') {
    return createCatppuccinTheme('mocha')
  }
  return createCatppuccinTheme(config.variant)
}

export const catppuccinTokens = (flavor: FlavorName): ThemeTokens => {
  const c = flavors[flavor].colors
  return {
    base: c.base.hex,
    mantle: c.mantle.hex,
    crust: c.crust.hex,
    surface0: c.surface0.hex,
    surface1: c.surface1.hex,
    surface2: c.surface2.hex,
    overlay0: c.overlay0.hex,
    overlay1: c.overlay1.hex,
    overlay2: c.overlay2.hex,
    text: c.text.hex,
    subtext0: c.subtext0.hex,
    subtext1: c.subtext1.hex,
    accent: c.mauve.hex
  }
}
