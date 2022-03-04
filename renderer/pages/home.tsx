import React, { useEffect, useState } from "react";
import Image from "next/image";
import electron from "electron";
import { writeFile } from "fs";

import { ViewListIcon, ViewGridIcon } from "@heroicons/react/outline";

import { useAtom } from "jotai";
import { isRecordingAtom, sourceAtom } from "./_app";

function Home() {
  const desktopCapturer = electron.desktopCapturer;
  const recordedChunks = [];
  const [windows, setWindows] = useState<Electron.DesktopCapturerSource[]>([]);
  const [source, setSource] = useAtom(sourceAtom);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  // const [isRecording, setIsRecording] = useState(false);
  const [isRecording, setIsRecording] = useAtom(isRecordingAtom);

  useEffect(() => {}, [isRecording]);

  useEffect(() => {
    if (desktopCapturer) {
      desktopCapturer
        .getSources({
          types: ["window"],
          thumbnailSize: { width: 320, height: 200 },
          fetchWindowIcons: true,
        })
        .then((s) => {
          setWindows(s);
        });
    }
  }, [desktopCapturer]);

  //HANDLE START RECORDING
  const handleStart = () => {
    if (mediaRecorder == null) {
      console.log("mediaRecorder is null");
      return;
    }

    if (!isRecording) {
      console.log("RECORDING: STARTED");
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  //STOP RECORDING
  const stopRecording = () => {
    console.log("RECORDING: STOPPED");
    mediaRecorder.stop();
    setIsRecording(false);
  };

  // HANDLE STOP RECORDING
  async function handleStop() {
    const blob = new Blob(recordedChunks, {
      type: "video/webm; codecs=vp9",
    });
    const buffer = Buffer.from(await blob.arrayBuffer());
    const filePath = `vid-${Date.now()}.webm`;
    // const savePath = path.join(__dirname, "/videos/", filePath);

    // console.log("path: ", savePath);

    if (filePath) {
      writeFile(filePath, buffer, () => {
        console.log("Video saved successfully.");
      });
    }
  }

  // HANDLE
  const handleDataAvailable = (e) => {
    recordedChunks.push(e.data);
  };

  // HANDLE SOURCE
  function handleSource(id: number) {
    console.log("WINDOW SELECTED: ", id);
    setSource(windows[id]);
    setVideoSource(windows[id]);
  }

  // SET VIDEO SOURCE
  async function setVideoSource(src: Electron.DesktopCapturerSource) {
    const constraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: src.id,
        },
      },
    };

    const mediaDevices = navigator.mediaDevices as any;
    await mediaDevices.getUserMedia(constraints).then((stream) => {
      //create media recorder
      const options = { mimeType: "video/webm; codecs=vp9" };
      const recorder = new MediaRecorder(stream, options);
      //register event handler
      recorder.ondataavailable = handleDataAvailable;
      recorder.onstop = handleStop;
      setMediaRecorder(recorder);
    });
  }

  return (
    <div className="screens">
      <div className="screens__header">
        <div className="screens__links">
          <span>Source: </span>
          {/* <span>Windows</span> */}
          {/* <span>Screens</span> */}
        </div>
        <div className="screens__icons">
          <ViewListIcon />
          <ViewGridIcon />
        </div>
      </div>
      <div className="screens__thumbnails">
        {windows.map((w, i) => (
          <div className="screens__thumbnail">
            <div className="screens__title">
              <Image
                src={w.appIcon ? w.appIcon.toDataURL() : "/images/logo.png"}
                width={16}
                height={16}
                alt="app icon"
                layout="fixed"
              />
              <span>{w.name.slice(0, 20)}</span>
            </div>
            <Image
              key={w.id}
              src={w.thumbnail.toDataURL()}
              alt={w.name}
              width={240}
              height={150}
              layout="intrinsic"
              onClick={(e) => handleSource(i)}
            />
          </div>
        ))}
      </div>
      <button onClick={handleStart}>Record</button> -
      <button onClick={stopRecording}>Stop</button> -
    </div>
  );
}

export default Home;
