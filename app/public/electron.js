const { app, BrowserWindow, ipcMain } = require('electron'); // electron
const isDev = require('electron-is-dev'); // To check if electron is in development mode
const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(
  isDev
    ? path.join(__dirname, '../db/myAppDb.db') // my root folder if in dev mode
    : path.join(process.resourcesPath, 'db/myAppDb.db'), // the resources path if in production build
  (err) => {
    if (err) {
      console.log(`Database Error: ${err}`);
    } else {
      console.log('Database Loaded');
    }
  }
);
//Creation of client table
db.serialize(() => {
  db.each(`CREATE TABLE IF NOT EXISTS client (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    npa TEXT NOT NULL,
    phone TEXT UNIQUE
  );`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});

db.serialize(() => {
  db.each(`CREATE TABLE IF NOT EXISTS project (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    startdate TEXT NOT NULL,
    client_id INTEGER NOT NULL,
    FOREIGN KEY (client_id)
       REFERENCES client (id) 
  );`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});

db.serialize(() => {
  db.each(`CREATE TABLE IF NOT EXISTS invoice (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    startdate TEXT NOT NULL,
    client_id INTEGER NOT NULL,
    FOREIGN KEY (client_id)
       REFERENCES client (id) 
  );`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});

db.serialize(() => {
  db.each(`CREATE TABLE IF NOT EXISTS event (
    id INTEGER PRIMARY KEY,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    description TEXT NOT NULL,
    project_id INTEGER NOT NULL,
    FOREIGN KEY (project_id)
       REFERENCES client (id) 
  );`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});


let mainWindow;

// Initializing the Electron Window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600, // width of window
    height: 600, // height of window
    webPreferences: {
      // The preload file where we will perform our app communication
      preload: isDev 
        ? path.join(app.getAppPath(), './public/preload.js') // Loading it from the public folder for dev
        : path.join(app.getAppPath(), './build/preload.js'), // Loading it from the build folder for production
      worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
      contextIsolation: true, // Isolating context so our app is not exposed to random javascript executions making it safer.
    },
  });

	// Loading a webpage inside the electron window we just created
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // Loading localhost if dev mode
      : `file://${path.join(__dirname, '../build/index.html')}` // Loading build file if in production
  );

	// Setting Window Icon - Asset file needs to be in the public/images folder.
  mainWindow.setIcon(path.join(__dirname, 'images/appicon.ico'));

	// In development mode, if the window has loaded, then load the dev tools.
  if (isDev) {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    });
  }
};

// ((OPTIONAL)) Setting the location for the userdata folder created by an Electron app. It default to the AppData folder if you don't set it.
app.setPath(
  'userData',
  isDev
    ? path.join(app.getAppPath(), 'userdata/') // In development it creates the userdata folder where package.json is
    : path.join(process.resourcesPath, 'userdata/') // In production it creates userdata folder in the resources folder
);

// When the app is ready to load
app.whenReady().then(async () => {
  await createWindow(); // Create the mainWindow

  // If you want to add React Dev Tools
  if (isDev) {
    await session.defaultSession
      .loadExtension(
        path.join(__dirname, `../userdata/extensions/react-dev-tools`) // This folder should have the chrome extension for React Dev Tools. Get it online or from your Chrome extensions folder.
      )
      .then((name) => console.log('Dev Tools Loaded'))
      .catch((err) => console.log(err));
  }
});

// Exiting the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    //Closing database
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
});

// Activating the app
app.on('activate', () => {
  if (mainWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Logging any exceptions
process.on('uncaughtException', (error) => {
  console.log(`Exception: ${error}`);
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//setting electron backend api
//testing send data from electron
ipcMain.handle('test-invoke', (event, args)=>{
  return "Data from Electron";
});
//testing send calendar data from electron
ipcMain.handle('get-calendar', (event, args)=>{
  return {'january':[1,2,3,4,5,6,7],'february':[1,2,3,4,5,6,7],'mars':[1,2,3,4,5,6,7]};
});
// testing send data data from electron
ipcMain.handle('get-clients', (event, args)=>{
  console.log(clients)
  return clients
});

// handling of create-client event in electronjs
ipcMain.handle('create-client', (event, args)=>{
  console.log('handling of create-client event in electronjs: ')
  
  //Excecuting database query
  db.serialize(() => {
    db.run(`INSERT INTO client (name, email, address, city, npa, phone)
    VALUES('${args.name}', '${args.email}', '${args.address}', '${args.city}', '${args.npa}', '${args.phone}');`)
    ;
  });
  return 'ElectronMessage: Client added to Database'
});