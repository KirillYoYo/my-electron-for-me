import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld(
    'electron',
    {
        /** Возвращает путь к resources/ директории Electron-приложения.*/
        getResourcesPath: () => process.resourcesPath,
        /** Возвращает директорию, в которой находится preload.js файл.*/
        getDirName: () => __dirname,
        /**
         * Возвращает: production или isDev
         * */
        isAppPackaged: () => ipcRenderer.invoke('get-is-packaged')
    }
);


