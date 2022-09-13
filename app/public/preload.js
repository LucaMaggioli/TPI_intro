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
    getClients: (args) => ipcRenderer.invoke('get-clients', args),
    createClient: (args) => ipcRenderer.invoke('create-client', args),
    editClient: (args) => ipcRenderer.invoke('edit-client', args),
    deleteClientById: (args) => ipcRenderer.invoke('delete-client', args),
    getClientById: (args) => ipcRenderer.invoke('get-client-by-id', args),

    getProjects: (args) => ipcRenderer.invoke('get-projects', args),
    createProject: (args) => ipcRenderer.invoke('create-project', args),
    editProject: (args) => ipcRenderer.invoke('edit-project', args),
    deleteProjectById: (args) => ipcRenderer.invoke('delete-project', args),
  });