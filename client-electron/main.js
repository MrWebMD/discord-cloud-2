const { app, BrowserWindow, ipcMain  } = require("electron");

const path = require("path");
const url = require("url");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // win.webContents.openDevTools();
  win.loadURL(
    url.format({
      // pathname: path.join(__dirname, "../client-dev/build/index.html"),
      pathname: path.join(__dirname, "/public/index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  // win.loadFile('./public/index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on("window-all-closed", () => {
    app.quit();
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.on('windowAction', function (event, action) {
    console.log("WINDOW ACTION: ", action);

    var win = BrowserWindow.getFocusedWindow();

    switch(action){
      case "minimize":
        win.minimize();
        console.log("Minimizing");
        break;
      case "maximize":
        !win.isMaximized() ? win.maximize() : win.restore()
        console.log("Maximizing");
        break;
      case "close":
        win.close();
        console.log("Closing");
        break;
      default:
        break;
    }
  });
});
