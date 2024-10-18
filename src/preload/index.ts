import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import loudness from 'loudness'
const os = require('os')
const dns = require('dns')

// Custom APIs for renderer
const api = {}

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

// 獲取設備訊息
const getDeviceInfo = () => {
  const cpus = os.cpus()
  const freeMemory = os.freemem()
  const totalMemory = os.totalmem()
  const platform = os.platform()

  return {
    cpu: cpus[0].model,
    memory: `${Math.round(freeMemory / 1024 / 1024)} MB / ${Math.round(totalMemory / 1024 / 1024)} MB`,
    platform: platform,
  }
}

// 檢查網絡狀態
const checkNetworkStatus = () => {
  return new Promise((resolve) => {
    dns.resolve('www.google.com', (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

// 獲取本機 IP 地址
const getIPAddress = () => {
  const networkInterfaces = os.networkInterfaces()
  let ipAddress = ''
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    networkInterfaces[interfaceName].forEach((interfaceInfo) => {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        ipAddress = interfaceInfo.address
      }
    })
  })
  return ipAddress
}

// 將功能暴露給前端
contextBridge.exposeInMainWorld('electronAPI', {
  getDeviceInfo: () => getDeviceInfo(),
  checkNetworkStatus: () => checkNetworkStatus(),
  getIPAddress: () => getIPAddress(),
})

// 將功能暴露給前端
contextBridge.exposeInMainWorld('volumeAPI', {
  getVolume: async () => {
    const volume = await loudness.getVolume() // 獲取當前音量（0-100）
    return volume
  },
  setVolume: async (volume) => {
    await loudness.setVolume(volume) // 設置音量（0-100）
  },
  mute: async () => {
    await loudness.setMuted(true) // 靜音
  },
  unmute: async () => {
    await loudness.setMuted(false) // 取消靜音
  },
  isMuted: async () => {
    const muted = await loudness.getMuted() // 檢查是否靜音
    return muted
  }
})