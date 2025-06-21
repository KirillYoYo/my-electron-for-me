import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("versions", {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("electron", {
	/**
	 * Возвращает: production или isDev
	 * */
	isAppPackaged: () => ipcRenderer.invoke("get-is-packaged"),
});

contextBridge.exposeInMainWorld("api", {
	sendPing: (msg: string) => ipcRenderer.send("ping", msg),
	onPong: (callback: (data: unknown) => void) =>
		ipcRenderer.on("pong", (_, data) => callback(data)),
	removePong: () => ipcRenderer.removeAllListeners("pong"),
});
