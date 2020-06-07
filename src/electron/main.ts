const electron = require('electron');
const socketIO = require("socket.io-client");

const url = require('url');
const path = require('path');

const {app, BrowserWindow, ipcMain} = electron;

let appWindow;

let socket = socketIO.connect('http://localhost:8000', {path: "/test"});
 
app.on('ready', () => {
    //Create new window.  
    appWindow = new BrowserWindow({title: "Sensor", width: 380, height: 312, frame: false, resizable: false, fullscreenable: false, transparent: false, webPreferences: { nodeIntegration: true}});
    
    appWindow.setIcon(path.join(__dirname, '/sensor.png'));

    //Load html file into Window.
    appWindow.setAlwaysOnTop = true;

    appWindow.loadURL(url.format({
        protocol: 'file:',
        slashes: true,
        pathname: path.join(__dirname, '/../index.html'),
    }));

    //appWindow.webContents.openDevTools({mode:'undocked'});

    appWindow.on('close', () => {
        app.quit();
    })
});

ipcMain.on('command:close', () => {
    app.quit();
});


socket.on('connect', () => {
    console.log("Sensor has connected to the server.")

    ipcMain.on('command:sensor-attach', (event:any, sensorData: any) => {
        socket.emit("new-sensor", sensorData)
    });

    ipcMain.on('command:sensor-reading', (event: any, sensorData:any) => {
        socket.emit("new_sensor_reading", sensorData)
    });

    ipcMain.on('command:sensor-dettach', () => {
        socket.emit('disconnect');
    });
});

 