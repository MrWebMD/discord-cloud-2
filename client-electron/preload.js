// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  minimize: () => ipcRenderer.send("windowAction", "minimize"),
  maximize: () => ipcRenderer.send("windowAction", "maximize"),
  close: () => ipcRenderer.send("windowAction", "close"),
});
