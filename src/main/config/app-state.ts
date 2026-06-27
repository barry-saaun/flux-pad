import Store from 'electron-store'
import { app, ipcMain } from 'electron'

export type AppState = {
  onboarding: {
    completed: boolean
    completedAt?: string
  }
  vault: {
    // Path to the currently active vault. Undefined until the user picks one
    // during onboarding. FluxPadConfig will eventually live inside this dir.
    dirPath?: string
  }
}

export const DEFAULT_APP_STATE: AppState = {
  onboarding: { completed: false },
  vault: {}
}

// Always in userData — survives app updates, per-OS, and is independent of
// where the user's vault lives.
export const appStore = new Store<AppState>({
  defaults: DEFAULT_APP_STATE,
  name: 'app-state',
  cwd: app.getPath('userData')
})

export function registerAppStateHandlers(): void {
  ipcMain.handle('app-state:get', (): AppState => appStore.store)

  ipcMain.handle(
    'app-state:set',
    <K extends keyof AppState>(
      _event: Electron.IpcMainInvokeEvent,
      key: K,
      value: AppState[K]
    ): void => {
      appStore.set(key, value)
    }
  )
}
