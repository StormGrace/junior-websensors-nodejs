const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;

app.on('ready', function(){
    //Create new window.
    mainWindow = new BrowserWindow({width: 280, height: 380, frame: false, fullscreenable: false});
    //Load html file into Window.
    mainWindow.setMenuBarVisibility(null);
    mainWindow.setAlwaysOnTop = true;
    
    mainWindow.loadURL(url.format({
        protocol: 'file:',
        slashes: true,
        pathname: path.join(__dirname, '/../index.html'),
    }));
});

