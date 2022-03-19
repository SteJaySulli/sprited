const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const menu = Menu.buildFromTemplate([
    {
        label: "File",
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
]);

Menu.setApplicationMenu(menu);