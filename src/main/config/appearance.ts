type ThemeVariants = {
  catppuccin: 'latte' | 'frappe' | 'macchiato' | 'mocha'
  gruvbox: 'hard' | 'medium' | 'soft'
  nord: never
}

export type AppearanceConfig =
  | {
      [T in keyof ThemeVariants]: ThemeVariants[T] extends never
        ? never
        : {
            theme: T
            mode: 'light' | 'dark' | 'auto'
            hasVariant: true
            variant: ThemeVariants[T]
          }
    }[keyof ThemeVariants]
  | {
      [T in keyof ThemeVariants]: ThemeVariants[T] extends never
        ? {
            theme: T
            mode: 'light' | 'dark' | 'auto'
            hasVariant: false
          }
        : never
    }[keyof ThemeVariants]

export const DEFAULT_APPEARANCE_CONFIG: AppearanceConfig = {
  theme: 'catppuccin',
  mode: 'light',
  hasVariant: true,
  variant: 'frappe'
}
