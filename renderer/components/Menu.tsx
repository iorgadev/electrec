import React from "react";
import Image from "next/image";
import { ipcRenderer } from "electron";
import {
  LogoutIcon,
  VideoCameraIcon,
  FolderDownloadIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";

import { useAtom } from "jotai";
import { isRecordingAtom, sourceAtom } from "../pages/_app";

function Menu() {
  const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
  const [source] = useAtom(sourceAtom);

  return (
    <div className="menu">
      {/* <span className="menu__logo">RecBit</span> */}

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

      {/* SOURCE IS SET, SHOW RECORD BUTTONS */}
      {source ? (
        <div className="menu__recorder">
          <div className="menu__source">
            <Image
              src={source.appIcon.toDataURL()}
              width={16}
              height={16}
              layout="intrinsic"
              className="fixed"
            />
            <span>{source.name}</span>
          </div>
          <div className="menu__buttons">
            <PlayIcon className="play" />
            <span>Start Recording</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Menu;
