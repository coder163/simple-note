'use strict'

import { app, protocol, BrowserWindow, Menu, MenuItemConstructorOptions,MenuItem,ipcMain,OpenDialogOptions,dialog} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// let 

let template: Array<(MenuItemConstructorOptions) | (MenuItem)>= [

{

 label: '文件',
 submenu: [{
    label: '打开文件',
    accelerator: 'CmdOrCtrl+O',
    click() {
      console.log('aaaaa')
    }
  }, {
    label: '打开文件夹',
    accelerator: 'CmdOrCtrl+Shift+O',
    click:function(item: MenuItem, focusedWindow: BrowserWindow|undefined){

				let properties: OpenDialogOptions = { properties: ['openDirectory']}
		         
		    dialog.showOpenDialog(win, properties).then(result => {
		          if (result.filePaths.length > 0 && !result.canceled) {
		            let files = listFiles(result.filePaths[0]);
		           
		            win.webContents.send('open-dir', files)

		          }
		        })

    }
   
  

		 
    
  }, {
    label: '新建文件',
    accelerator: 'CmdOrCtrl+N',
    role: 'cut'
  },
 {
    label: '新建文件夹',
    accelerator: 'CmdOrCtrl+Shift+N',
    role: 'cut'
  }, {
    type: 'separator'
  }
  ]
},
{
	 label: '工具',
},

{
	 label: '设置',
}
,
{
	 label: '帮助',
	 submenu: [{
    label: '提交Bug',
  
  }, {
    type: 'separator'
  }, {
    label: '官方文档',
 
  }, {
    label: '关于版本',
   
  }
  ]
}
]
const appMenu = Menu.buildFromTemplate(template);
  
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


/**
 * 遍历文件
 * @param  {string}        pathName 路径
 * @return {Array<string>}          指定目录下的文件集合
 */
function listFiles(pathName: string): Array<string> {
	const fs=require('fs');

  // let arrFiles = Array<string>();

  const files = fs.readdirSync(pathName)

    //定义结构
    let nodes= Array<any>();

//TODO 要好好研究一下

  for (let i = 0; i < files.length; i++) {
    const item = files[i]
    const stat = fs.lstatSync(pathName + '\\' + item)



    if (stat.isDirectory()) {

      // arrFiles = arrFiles.concat(listFiles(pathName + '\\' + item))
      let node= {
            label:item,
            path:pathName + '\\' + item,
            id: 1,
            expand: false,
            child:[{}]
        }
        nodes.push(node)
    } else{
      /* 获取的是所有的txt和ini文件
      var reg = /^.*\.md$/
      if (reg.test(item) ) { 
    

      } */

           let node= {
                  label:item,
                  id: 1,
                  path:pathName + '\\' + item
                
              }
        nodes.push(node)
    
    }

    // else {
    //   var reg = /^.*\.md$/
    //   if (reg.test(item) ) { /* 获取的是所有的txt和ini文件 */
    //     arrFiles.push(pathName + '\\' + item)
       
    //      nodes.push(node)
    //   }
    // }
   
  }
   // console.log(nodes);
  return nodes
}

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
   Menu.setApplicationMenu(appMenu);
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

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS3_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
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


