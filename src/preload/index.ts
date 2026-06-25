import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { type FluxPadConfig } from '../main/config'

const api = {
  config: {
    get: (): Promise<FluxPadConfig> => ipcRenderer.invoke('config:get'),
    set: <K extends keyof FluxPadConfig>(key: K, value: FluxPadConfig[K]): Promise<void> =>
      ipcRenderer.invoke('config:set', key, value),
    reset: (): Promise<void> => ipcRenderer.invoke('config:reset')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
