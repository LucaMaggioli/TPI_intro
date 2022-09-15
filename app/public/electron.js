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
//Creation of tables if they not exists
db.serialize(() => {
  db.each(`CREATE TABLE IF NOT EXISTS client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    width: 1200, // width of window
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
    //Closing database when the app is closed
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
ipcMain.handle('get-clients', async (event, args)=>{
  console.log('handling of get-clients event in electronjs: ')

  //creating a new promise to rsolve the result of the query
  let data = await new Promise((resolve, reject)=>{
    db.all("SELECT * from client",((err, result)=>{
      // resolving the result of the query
      resolve(result)
    }))
  })
  //returning the result of the promise that contain the query
  return data;
});

// handling of create-client event in electronjs
ipcMain.handle('create-client', async (event, args)=>{
  console.log('handling of create-client event in electronjs: ')
  
  //Excecuting database query
  let data = await new Promise ((resolve, reject)=>{
    db.all(`INSERT INTO client (name, email, address, city, npa, phone)
    VALUES('${args.name}', '${args.email}', '${args.address}', '${args.city}', '${args.npa}', '${args.phone}');`,
      (err ,result)=>{
        if(err){
          reject(err)
        }
        // resolving the result of the query
      // resolve(this.lastID)
      resolve(true)
    })
  });
  return data
});

ipcMain.handle('delete-client', async (event, args)=>{
  let data = await new Promise ((resolve, reject)=>{
    db.all(`DELETE FROM client WHERE id = ${args}`,
      (err ,result)=>{
        if(err){
          reject(err)
        }
        // resolving the result of the query
      // resolve(this.lastID)
      resolve(true)
    })
  });
  return data
});

ipcMain.handle('get-client-by-id', async (event, args)=>{
  let data = await new Promise ((resolve, reject)=>{
    if(args === null || args === undefined || args.length < 1){ // checking if id is present
      console.log("id is null")
      reject("can't find client with null id in DB")
    }
    db.all(`SELECT * FROM client WHERE id = ${args}`,
      (err ,result)=>{
        if(err){
          reject(err)
        }
        // resolving the result of the query, if no result, return empty list
      result !== undefined ? resolve(result[0]) : reject('no client find with that id')
    })
  });
  return data
})

ipcMain.handle('edit-client', async (event, args)=>{
  let data = await new Promise ((resolve, reject)=>{
    db.all(`UPDATE client
    SET name = '${args.name}',
    email = '${args.email}',
    address = '${args.address}',
    city = '${args.city}',
    npa = '${args.npa}',
    phone = '${args.phone}'
    WHERE id = ${args.id};`,
      (err ,result)=>{
        if(err){
          reject(err)
        }
        // resolving the result of the query
      resolve(true)
    })
  });
  return data
})
ipcMain.handle('get-projects-client', async (event, args)=>{
  let data = await new Promise ((resolve, reject)=>{
    db.all(`SELECT * from project
    WHERE client_id = ${args};`,
      (err ,result)=>{
        if(err){
          reject(err)
        }
        // resolving the result of the query
        result !== undefined ? resolve(result) : reject('no projects found for the given client id')
    })
  });
  return data
})

ipcMain.handle('get-projects', async (event, args)=>{
  console.log('handling of get-projects event in electronjs: ')

  //creating a new promise to rsolve the result of the query
  let data = await new Promise((resolve, reject)=>{
    db.all("SELECT * from project",((err, result)=>{
      // resolving the result of the query$
      resolve(result)
    }))
  })
  //returning the result of the promise that contain the query
  return data;
});

// handling of create-client event in electronjs
ipcMain.handle('create-project', async (event, args)=>{
  console.log('handling of create-project event in electronjs: ')
  
  //Excecuting database query
  let data = await new Promise ((resolve, reject)=>{
    db.all(`INSERT INTO project (name, description, startdate, client_id)
    VALUES('${args.name}', '${args.description}', '${args.startdate}', '${args.client_id}');`,
      (err ,result)=>{
        if(err){
          reject(err)
        }
        // resolving the result of the query
      // resolve(this.lastID)
      resolve(true)
    })
  });
  return data
});

ipcMain.handle('edit-project', async (event, args)=>{
  let data = await new Promise ((resolve, reject)=>{
    db.all(`UPDATE project
    SET name = '${args.name}',
    description = '${args.description}',
    startdate = '${args.startdate}',
    client_id = '${args.client_id}'
    WHERE id = ${args.id};`,
      (err ,result)=>{
        if(err){
          reject(err)
        }
        // resolving(returning) the result of the query as true to say that the sql operation has been succeded
      resolve(true)
    })
  });
  return data
})

ipcMain.handle('delete-project', async (event, args)=>{
  let data = await new Promise ((resolve, reject)=>{
    db.all(`DELETE FROM project WHERE id = ${args}`,
      (err ,result)=>{
        if(err){
          reject(err)
        }
        // resolving the result of the query as true to say that the sql operation has been succeded
      resolve(true)
    })
  });
  return data
});