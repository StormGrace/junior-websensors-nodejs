const electron = require('electron');
const socketIO = require("socket.io-client");

const url = require('url');
const path = require('path');

const {app, BrowserWindow, ipcMain} = electron;

let appWindow;

let socket = socketIO.connect('http://localhost:8000', {path: "/test"});
 
app.on('ready', () => {
    //Create new window.  
    appWindow = new BrowserWindow({title: "Sensor", width: 280, height: 300, frame: false, fullscreenable: false, transparent: true,  webPreferences: { nodeIntegration: true}});
    
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

socket.on('connect', () => {
    console.log("Sensor has connected.")

    ipcMain.on('command:send', () => {
        socket.emit("sensors_data", { sensorID: 1, sensorName: "hey", sensorTemp: 23.5, sensorHumi: 45.5})
    });
});

 