const electron = require('electron');

const url = require('url');
const path = require('path');

const {app, BrowserWindow, ipcMain} = electron;

let appWindow;

app.on('ready', () => {
    //Create new window.
    appWindow = new BrowserWindow({title: "Sensor", width: 280, height: 380, frame: false, fullscreenable: false, transparent: true,  webPreferences: {
        nodeIntegration: true,
      }});
    //Load html file into Window.
   
    appWindow.setAlwaysOnTop = true;

    appWindow.loadURL(url.format({
        protocol: 'file:',
        slashes: true,
        pathname: path.join(__dirname, '/../index.html'),
    }));

    appWindow.webContents.session.clearCache(function(){
        //some callback.
        })
    appWindow.webContents.openDevTools({mode:'undocked'});

    appWindow.on('close', () => {
        app.quit();
    })
});

ipcMain.on('command:close', () => {
    app.quit();
});

