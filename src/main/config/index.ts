import Store from 'electron-store'
import { app, ipcMain } from 'electron'
import path from 'path'
import { type AppearanceConfig, DEFAULT_APPEARANCE_CONFIG } from './appearance'
import { type EditorConfig, DEFAULT_EDITOR_CONFIG } from './editor'

export type FluxPadConfig = {
  appearance: AppearanceConfig
  editor: EditorConfig
}

const isDev = !app.isPackaged

// In dev: write to project root. In prod: will be replaced with vault path.
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
      store.set(key, value)
    }
  )

  ipcMain.handle('config:reset', (): void => {
    store.clear()
  })
}
