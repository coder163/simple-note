'use strict'

import { app, protocol, BrowserWindow, Menu, MenuItemConstructorOptions, MenuItem, ipcMain, OpenDialogOptions, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'


let mainMenuTemplate: Array<(MenuItemConstructorOptions) | (MenuItem)> = [

  {

    label: '文件',
    submenu: [{
      label: '打开文件',
      accelerator: 'CmdOrCtrl+O',
      click: function (item: MenuItem, focusedWindow: BrowserWindow | undefined) {

        let properties: OpenDialogOptions = { properties: ['openFile'] }

        dialog.showOpenDialog(win, properties).then(result => {
          if (result.filePaths.length > 0 && !result.canceled) {

            let path = result.filePaths[0]

            const fs = require("fs");

            win.webContents.send('read-file-reply', path, fs.readFileSync(path, "utf8"))

          }
        })

      }

    }, {
      label: '打开文件夹',
      accelerator: 'CmdOrCtrl+Shift+O',
      click: function (item: MenuItem, focusedWindow: BrowserWindow | undefined) {
        let properties: OpenDialogOptions = { properties: ['openDirectory'] }
        dialog.showOpenDialog(win, properties).then(result => {
          if (result.filePaths.length > 0 && !result.canceled) {
            // console.log(result.filePaths[0])
            win.webContents.send('list-dir-reply', result.filePaths[0])


          }
        })

      }

    }
    ]
  },
  {
    label: '视图',
    submenu: [{
      label: '显示/隐藏菜单栏',
      accelerator: 'Ctrl+Shift+V',
      click: function (item: MenuItem, focusedWindow: BrowserWindow | undefined) {

        win.setMenuBarVisibility(!win.isMenuBarVisible());

      }
    }
    ]
  },

  {
    label: '帮助',
    submenu: [{
      label: '文档说明',

    }, {
      type: 'separator'
    }, {
      label: '检查更新',

    }, {
      label: '关于',
    }
    ]
  }

]
/**
 
 *  */

// 菜单模板
const menuTemplate: Array<(MenuItemConstructorOptions) | (MenuItem)> = [
  {
    label: '全选',
    role: 'selectAll'
  },
  {
    label: '剪贴',
    role: 'cut'
  },
  {
    label: '复制',
    role: 'copy'
  },
  {
    label: '粘贴',
    role: 'paste'
  }
];

// 构建菜单项
const menu = Menu.buildFromTemplate(menuTemplate);
//监听菜单请求
ipcMain.on('menu', (ev, arg) => {
  // 弹出上下文菜单
  menu.popup({
    x: arg.x,
    y: arg.y
  });

});



// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
let win: BrowserWindow;
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 735,
    frame: true,//添加这一行采用无边框窗口
    title: '简单笔记',
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true, // 是否集成 Nodejs
      webSecurity: false,//允许跨域请求
      contextIsolation: false,
      enableRemoteModule: true,
      webviewTag: true

    }
  })


  Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenuTemplate));


  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}


app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


app.on('ready', async () => {

  createWindow()

})


if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}



// ipcMain.on('list-dir', function (event, path) {
//   win.webContents.send('list-dir-reply', FileUtil.listFiles(path))
// })

// ipcMain.on('list-child-dir', function (event, path) {

//   let list = FileUtil.listFiles(path);
//   console.log(path)
//   win.webContents.send('list-child-dir-reply', list)
// })

ipcMain.on('read-file', function (event, path) {

  const fs = require("fs");
  let data = fs.readFileSync(path, "utf8");

  win.webContents.send('read-file-reply', path, data)

})
//设置行号
ipcMain.on('set-cursor', function (event, lineNumber) {
  win.webContents.send('set-lineNumber', lineNumber)
})



import { ChannelMessage } from "@/main/domain/message";

//窗口最大化
ipcMain.on(ChannelMessage.WINDOW_OPERATION, function (e, operation) {

  switch (operation) {
    case 'minimize':
      win.minimize();
      break;
    case 'maximize':

      if (win.isMaximized()) {
        win.restore();
      } else {
        win.maximize();
      }
      break;
    case 'close':
      win.destroy()
      app.quit();
  }

})

