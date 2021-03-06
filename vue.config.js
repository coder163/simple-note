// vue.config.js
//const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')



module.exports = {

    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '简单笔记'
                return args
            })
      
    },

    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                "asar": false,
                "appId": "com.coder163",
                "productName": "简单笔记",//项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "Copyright © 2022",//版权信息
                directories: {
                    output: 'build' // 打包产物的位置
                },
                linux: {
                    "icon": "./logo.png", // 包含各种尺寸图标的文件夹
                    target: [
                        "AppImage"
                    ],

                },
                win: {//win相关配置
                    "icon": "./logo.ico",//图标，当前图标在根目录下，注意这里有两个坑
                    // "requestedExecutionLevel": "highestAvailable", // 申请高级权限
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": [
                                "x64",//64位
                                "ia32"//32位
                            ]
                        }
                    ]
                },
                nsis: {
                    oneClick: false, // 是否一鍵安裝
                    perMachine: true, // 是否為每一台機器安裝
                    // installerIcon: 'public/icon.ico', // 安裝圖示
                    // uninstallerIcon: 'public/icon.ico', // 卸載圖示
                    // installerHeaderIcon: 'public/icon.ico', // 安裝頂部圖示
                    allowToChangeInstallationDirectory: true, // 是否可更改安裝目錄
                    createDesktopShortcut: true, // 是否建立桌面捷徑
                    createStartMenuShortcut: true // 是否建立開始捷徑
                }
            }

        }
    }
}