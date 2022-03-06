import React, { useEffect, useState } from "react";
import Image from "next/image";
import electron from "electron";
import { writeFile } from "fs";

import { ViewListIcon, ViewGridIcon } from "@heroicons/react/outline";

import { useAtom } from "jotai";
import { isRecordingAtom, sourceAtom } from "./_app";
import SourceSelect from "../components/SourceSelect";
import Recorder from "../components/Recorder";

function Home() {
  // const desktopCapturer = electron.desktopCapturer;
  // let recordedChunks = [];
  // const [windows, setWindows] = useState<Electron.DesktopCapturerSource[]>([]);
  // const [source, setSource] = useAtom(sourceAtom);
  // const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  // const [isRecording, setIsRecording] = useAtom(isRecordingAtom);

  // useEffect(() => {
  //   if (mediaRecorder == null) {
  //     console.log("mediaRecorder is null");
  //     return;
  //   }
  //   if (!isRecording) {
  //     stopRecording();
  //   } else {
  //     handleStart();
  //   }
  // }, [isRecording]);

  // useEffect(() => {
  //   if (desktopCapturer) {
  //     desktopCapturer
  //       .getSources({
  //         types: ["window"],
  //         thumbnailSize: { width: 320, height: 200 },
  //         fetchWindowIcons: true,
  //       })
  //       .then((s) => {
  //         setWindows(s);
  //       });
  //   }
  // }, [desktopCapturer]);

  // //HANDLE START RECORDING
  // const handleStart = () => {
  //   if (mediaRecorder == null) {
  //     console.log("mediaRecorder is null");
  //     return;
  //   }
  //   console.log("RECORDING: STARTED");
  //   // recordedChunks = [];
  //   mediaRecorder.start();
  // };

  // //STOP RECORDING
  // const stopRecording = () => {
  //   if (!mediaRecorder || mediaRecorder.state === "inactive") {
  //     console.log("mediaRecorder is null");
  //     return;
  //   }
  //   console.log("RECORDING: STOPPED");
  //   mediaRecorder.stop();
  //   // setIsRecording(false);
  // };

  // // HANDLE STOP RECORDING
  // async function handleStop() {
  //   // if (!mediaRecorder || mediaRecorder.state === "inactive") return;

  //   const blob = new Blob(recordedChunks, {
  //     type: "video/webm; codecs=vp9",
  //   });
  //   const buffer = Buffer.from(await blob.arrayBuffer());
  //   const filePath = `vid-${Date.now()}.webm`;

  //   if (filePath) {
  //     writeFile(filePath, buffer, () => {
  //       console.log("Video saved successfully.");
  //     });
  //     recordedChunks = [];
  //   }
  // }

  // // HANDLE
  // const handleDataAvailable = (e) => {
  //   console.log("DATA AVAILABLE: ", e);

  //   recordedChunks.push(e.data);
  // };

  // // HANDLE SOURCE
  // function handleSource(id: number) {
  //   console.log("WINDOW SELECTED: ", id);
  //   setSource((prev) => windows[id]);
  //   setVideoSource(windows[id]);
  // }

  // // SET VIDEO SOURCE
  // async function setVideoSource(src: Electron.DesktopCapturerSource) {
  //   recordedChunks = [];
  //   const constraints = {
  //     audio: false,
  //     video: {
  //       mandatory: {
  //         chromeMediaSource: "desktop",
  //         chromeMediaSourceId: src.id,
  //       },
  //     },
  //   };

  //   const mediaDevices = navigator.mediaDevices as any;
  //   await mediaDevices.getUserMedia(constraints).then((stream) => {
  //     //create media recorder
  //     const options = { mimeType: "video/webm; codecs=vp9" };
  //     const recorder = new MediaRecorder(stream, options);
  //     //register event handler
  //     recorder.ondataavailable = handleDataAvailable;
  //     recorder.onstop = handleStop;
  //     setMediaRecorder((prev) => recorder);
  //   });
  // }

  // return (
  //   <div className="screens">
  //     <div className="screens__header">
  //       <div className="screens__links">
  //         <span>Source: </span>
  //         {/* <span>Windows</span> */}
  //         {/* <span>Screens</span> */}
  //       </div>
  //       <div className="screens__icons">
  //         <ViewListIcon />
  //         <ViewGridIcon />
  //       </div>
  //     </div>
  //     <div className="screens__thumbnails">
  //       {windows.map((w, i) => (
  //         <div className="screens__thumbnail" key={i}>
  //           <div className="screens__title">
  //             <Image
  //               src={w.appIcon ? w.appIcon.toDataURL() : "/images/logo.png"}
  //               width={16}
  //               height={16}
  //               alt="app icon"
  //               layout="fixed"
  //             />
  //             <span>{w.name.slice(0, 20)}</span>
  //           </div>
  //           <Image
  //             key={w.id}
  //             src={w.thumbnail.toDataURL()}
  //             alt={w.name}
  //             width={240}
  //             height={150}
  //             layout="intrinsic"
  //             onClick={(e) => handleSource(i)}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //     <button onClick={handleStart}>Record</button> -
  //     <button onClick={stopRecording}>Stop</button> -
  //   </div>
  // );

  return (
    <>
      <SourceSelect />
      <Recorder />
    </>
  );
}

export default Home;
