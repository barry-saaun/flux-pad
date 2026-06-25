/**
 * Canonical semantic colour tokens.
 *
 * Every theme adapter must produce this shape. The CSS reads only these
 * --color-* vars, so adding a new theme never requires touching CSS.
 *
 * Naming follows surface hierarchy (base < mantle < crust) and role
 * (overlay = muted UI chrome, accent = primary brand colour).
 */
export interface ThemeTokens {
  // Backgrounds — darkest to lightest
  base: string      // main content background
  mantle: string    // slightly darker (code blocks, sidebars)
  crust: string     // darkest chrome (titlebars, borders)

  // Interactive surfaces
  surface0: string  // subtle highlight / hover
  surface1: string  // borders, dividers
  surface2: string  // stronger borders, table headers

  // Text overlays (for non-content UI: line numbers, gutters)
  overlay0: string  // faintest — very muted
  overlay1: string  // gutter text, bullets, counters
  overlay2: string  // stronger muted text

  // Prose text
  text: string      // primary body text
  subtext0: string  // captions, secondary text
  subtext1: string  // slightly stronger secondary

  // Accent — used for links, blockquote borders, inline code
  accent: string
}

const TOKEN_NAMES = [
  'base', 'mantle', 'crust',
  'surface0', 'surface1', 'surface2',
  'overlay0', 'overlay1', 'overlay2',
  'text', 'subtext0', 'subtext1',
  'accent',
] as const satisfies ReadonlyArray<keyof ThemeTokens>

/** Write all tokens as --color-* CSS custom properties on <html>. */
export function applyThemeVars(tokens: ThemeTokens): void {
  const root = document.documentElement
  for (const key of TOKEN_NAMES) {
    root.style.setProperty(`--color-${key}`, tokens[key])
  }
}
