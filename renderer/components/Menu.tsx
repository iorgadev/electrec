import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
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

  const [timer, setTimer] = useState(0);

  // function that takes an int and returns a string with the number of minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  };

  // set interval to update timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer((prev) => 0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

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
          <Image src={source.thumbnail.toDataURL()} width={240} height={150} />
          <div className="menu__buttons">
            <div
              className={`menu__buttons__record ${
                isRecording ? "stop" : "play"
              }`}
              onClick={() => setIsRecording((prev) => !prev)}
            >
              {isRecording ? (
                <StopIcon className="stop" />
              ) : (
                <PlayIcon className="play" />
              )}
              <span>{isRecording ? "Stop" : "Start"}</span>
            </div>
            <span className="menu__buttons__time">{formatTime(timer)}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Menu;
