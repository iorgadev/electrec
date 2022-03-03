import React from "react";
import { ipcRenderer } from "electron";
import {
  LogoutIcon,
  VideoCameraIcon,
  FolderDownloadIcon,
  CogIcon,
} from "@heroicons/react/outline";

function Menu() {
  return (
    <div className="menu">
      <span className="menu__logo">RecBit</span>

      <ul className="menu__links">
        <li className="menu__links__record">
          <VideoCameraIcon />
          <span>Record</span>
        </li>
        <li>
          <FolderDownloadIcon />
          <span>Saved Videos</span>
        </li>
        <li>
          <CogIcon />
          <span>Settings</span>
        </li>
      </ul>

      <div className="menu__links__quit">
        <div
          className="menu__links__quit__item"
          onClick={() => ipcRenderer.invoke("an-action", [1, 2, 3])}
        >
          <LogoutIcon />
          <span>Quit</span>
        </div>
      </div>
    </div>
  );
}

export default Menu;
