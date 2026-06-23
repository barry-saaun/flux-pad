import { ElectronAPI } from '@electron-toolkit/preload'
import type { EditorConfig } from '../main/config'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      config: {
        get: () => Promise<EditorConfig>
        set: <K extends keyof EditorConfig>(key: K, value: EditorConfig[K]) => Promise<void>
        reset: () => Promise<void>
      }
    }
  }
}
