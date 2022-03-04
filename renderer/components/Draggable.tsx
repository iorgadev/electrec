import React, { useState } from "react";
import Image from "next/image";
import { ipcRenderer } from "electron";
import { XIcon, MinusSmIcon } from "@heroicons/react/solid";

export default function Draggable({}) {
  const [minimizeHover, setMinimizeHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);

  return (
    <div className="layout__draggable">
      <div className="layout__logo">
        <Image
          src="/images/logo.png"
          width={20}
          height={20}
          alt="app icon"
          layout="intrinsic"
          className="logo__image"
        />
        <span>Record Lite</span>
      </div>
      <div className="appwindow">
        <div
          className="minimize"
          onMouseOver={() => setMinimizeHover((prev) => true)}
          onMouseLeave={() => setMinimizeHover((prev) => false)}
          onClick={() => ipcRenderer.invoke("minimize-app-button", [])}
        >
          {minimizeHover ? <MinusSmIcon /> : null}
        </div>
        <div
          className="close"
          onMouseOver={() => setCloseHover((prev) => true)}
          onMouseLeave={() => setCloseHover((prev) => false)}
          onClick={() => ipcRenderer.invoke("close-app-button", [])}
        >
          {closeHover ? <XIcon /> : null}
        </div>
      </div>
    </div>
  );
}
