const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('testApi', {
  // Invoke Methods
  testInvoke: (args) => ipcRenderer.invoke('test-invoke', args),
  // Send Methods
  testSend: (args) => ipcRenderer.send('test-send', args),
  // Receive Methods
  testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) })
});

contextBridge.exposeInMainWorld('api', {
    // Invoke Methods
    getCalendar:  (args) => ipcRenderer.invoke('get-calendar', args),
  });