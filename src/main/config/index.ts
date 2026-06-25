import Store from 'electron-store'
import { type AppearanceConfig, DEFAULT_APPEARANCE_CONFIG } from './appearance'
import { type EditorConfig, DEFAULT_EDITOR_CONFIG } from './editor'

export type FluxPadConfig = {
  appearance: AppearanceConfig
  editor: EditorConfig
}

export const store = new Store<FluxPadConfig>({
  defaults: {
    appearance: DEFAULT_APPEARANCE_CONFIG,
    editor: DEFAULT_EDITOR_CONFIG,
  },
  name: 'fluxpad-config'
})
