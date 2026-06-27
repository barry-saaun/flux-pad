import Store from 'electron-store'
import { app, ipcMain } from 'electron'
import {
  type AppearanceConfig,
  DEFAULT_APPEARANCE_CONFIG,
  normalizeAppearanceConfig
} from './appearance'
import { type EditorConfig, DEFAULT_EDITOR_CONFIG } from './editor'

export { appStore, registerAppStateHandlers, type AppState } from './app-state'

// User-facing preferences that travel with the vault. Lives inside the vault
// directory once the user picks one. The vault's own path is tracked in
// AppState, not here — the config can't know its own location.
export type FluxPadConfig = {
  appearance: AppearanceConfig
  editor: EditorConfig
}

const isDev = !app.isPackaged

// TODO: once onboarding lands, point this at the chosen vault dir
// (appStore.get('vault').dirPath) instead.
const configDir = isDev ? app.getAppPath() : app.getPath('userData')

export const store = new Store<FluxPadConfig>({
  defaults: {
    appearance: DEFAULT_APPEARANCE_CONFIG,
    editor: DEFAULT_EDITOR_CONFIG
  },
  name: 'fluxpad-config',
  cwd: configDir
})

export function registerConfigHandlers(): void {
  ipcMain.handle('config:get', (): FluxPadConfig => {
    return store.store
  })
  ipcMain.handle(
    'config:set',
    <K extends keyof FluxPadConfig>(
      _event: Electron.IpcMainInvokeEvent,
      key: K,
      value: FluxPadConfig[K]
    ): void => {
      const next =
        key === 'appearance'
          ? (normalizeAppearanceConfig(value as AppearanceConfig) as FluxPadConfig[K])
          : value
      store.set(key, next)
    }
  )

  ipcMain.handle('config:reset', (): void => {
    store.clear()
  })
}
