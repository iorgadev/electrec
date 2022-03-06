import { useEffect, useState } from "react";
import Image from "next/image";
import electron from "electron";
import { writeFile } from "fs";

import { ViewListIcon, ViewGridIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, StopIcon, PlayIcon } from "@heroicons/react/solid";

import { useAtom } from "jotai";
import { isRecordingAtom, sourceAtom, timerAtom } from "../pages/_app";

function Recorder() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
  const [source, setSource] = useAtom(sourceAtom);
  const [timer, setTimer] = useAtom(timerAtom);
  let recordedChunks = [];

  // Handle recording states
  useEffect(() => {
    if (mediaRecorder == null) {
      console.log("MediaRecorder is null.");
      return;
    }
    if (!isRecording) {
      handleStop();
    } else {
      handleStart();
    }
  }, [isRecording]);

  // Handle START recording
  const handleStart = () => {
    if (mediaRecorder == null) {
      console.log("mediaRecorder is null");
      return;
    }
    console.log("RECORDING: STARTED");
    mediaRecorder.start();
  };

  // Handle STOP recording
  const handleStop = () => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
      console.log("mediaRecorder is null");
      return;
    }
    console.log("RECORDING: STOPPED");
    mediaRecorder.stop();
  };

  // Function that deals when the MediaRecorder is stopped
  async function stopRecording() {
    const blob = new Blob(recordedChunks, {
      type: "video/webm; codecs=vp9",
    });
    const buffer = Buffer.from(await blob.arrayBuffer());
    const filePath = `vid-${Date.now()}.webm`;

    if (filePath) {
      writeFile(filePath, buffer, () => {
        console.log("Video saved successfully.");
      });
      recordedChunks = [];
    }
  }

  // Handle DATA available
  const handleDataAvailable = (e) => {
    recordedChunks.push(e.data);
  };

  // Handle SOURCE selection
  useEffect(() => {
    // might also need to check if already recording
    if (source) handleVideoSource(source);
  }, [source]);

  // Handle for when Video Source is selected
  async function handleVideoSource(src: Electron.DesktopCapturerSource) {
    recordedChunks = [];
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
      const options = { mimeType: "video/webm; codecs=vp9" };
      const recorder = new MediaRecorder(stream, options);
      recorder.ondataavailable = handleDataAvailable;
      recorder.onstop = stopRecording;

      setMediaRecorder((prev) => recorder);
    });
  }

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
    <div className={`recorder ${source ? `active` : ``}`}>
      <div className="recorder__header">
        <ChevronLeftIcon onClick={() => setSource(null)} />
        <h2>Recorder</h2>
      </div>
      <div className="recorder__screen">
        {source ? (
          <div className="recorder__thumbnail">
            <Image
              src={source.thumbnail.toDataURL()}
              width={320}
              height={200}
              alt="screen display"
              layout="intrinsic"
            />
          </div>
        ) : null}
      </div>
      <div className="controls">
        <div
          className={`controls__buttons ${isRecording ? "stop" : "play"}`}
          onClick={() => setIsRecording((prev) => !prev)}
        >
          {isRecording ? (
            <StopIcon className="controls__button stop" />
          ) : (
            <PlayIcon className="controls__button play" />
          )}
          <span className="controls__timer">{formatTime(timer)}</span>
        </div>
      </div>
    </div>
  );
}

export default Recorder;
