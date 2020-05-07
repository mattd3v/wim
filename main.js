const { app, BrowserWindow } = require('electron');

// On ready, create the browser window,
// and load the index.html of the app.
app.whenReady().then(function () {
  new BrowserWindow({ width: 800, height: 600 }).loadFile('index.html')
})

