import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import electron, { dialog } from "electron";
import { writeFile } from "fs";

function Home() {
  const desktopCapturer = electron.desktopCapturer;
  const recordedChunks = [];
  const [windows, setWindows] = useState<Electron.DesktopCapturerSource[]>([]);
  const [source, setSource] = useState<Electron.DesktopCapturerSource>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (desktopCapturer) {
      desktopCapturer
        .getSources({
          types: ["window"],
          thumbnailSize: { width: 320, height: 200 },
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
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div>
        {windows.map((w, i) => (
          <Image
            key={w.id}
            src={w.thumbnail.toDataURL()}
            alt={w.name}
            width={320}
            height={200}
            layout="intrinsic"
            onClick={(e) => handleSource(i)}
          />
        ))}
      </div>
      <button onClick={handleStart}>Record</button> -
      <button onClick={stopRecording}>Stop</button>
    </React.Fragment>
  );
}

export default Home;
