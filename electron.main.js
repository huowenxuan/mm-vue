// main.js，在 app ready 事件中，创建了主窗口，并通过 BrowserWindow 的 loadURL 方法加载了本地目录下的 index.html 页面。在 app 的 window-all-closed 事件中，调用 app.quit 方法退出整个 App。
'use strict';

const electron = require('electron');
const {
  app, // 控制应用生命周期的模块
  BrowserWindow, // 创建原生浏览器窗口的模块
  Menu, ipcMain, ipcRenderer,
} = electron;

let isDevelopment = false;

if (isDevelopment) {
  // 代码修改时，自动更新页面
  require('electron-reload')(__dirname, {
    ignored: /node_modules|[\/\\]\./
  });
}

var mainWindow = null;

let template = [
  {
    label: "Application",
    submenu: [
      { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      { label: "Quit", accelerator: "Command+Q", click: function() { app.quit() }}
    ]
  },
  {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  }
];

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: './res/favicon.ico'
  });

  if (isDevelopment) {
    // 开发开发者菜单
    mainWindow.webContents.openDevTools();
  }

  // 读取入口html
  mainWindow.loadURL(`file://${__dirname}/www/index.html`);
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  // 关闭窗口
  mainWindow.on('closed', () => {
    mainWindow = null;
});
}

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候，这个方法就被调用
app.on('ready', ()=>createMainWindow());

// 当 window 被关闭，这个事件会被发出
app.on('window-all-closed', () => {
  app.quit();
});

