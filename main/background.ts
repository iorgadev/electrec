import { app } from "electron";
import { ipcMain } from "electron";
import serve from "electron-serve";
import { BrowserWindow } from "electron";
import { createWindow } from "./helpers";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 640,
    height: 500,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.handle("minimize-app-button", async (event, arg) => {
  // mainWindow.minimize();
  BrowserWindow.getFocusedWindow().minimize();
});
ipcMain.handle("close-app-button", async (event, arg) => {
  app.quit();
});
