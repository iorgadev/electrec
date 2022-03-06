import { useEffect, useState } from "react";
import Image from "next/image";
import electron from "electron";
// import { writeFile } from "fs";

import { ViewListIcon, ViewGridIcon } from "@heroicons/react/outline";

import { useAtom } from "jotai";
import { sourceAtom } from "../pages/_app";

function SourceSelect() {
  const desktopCapturer = electron.desktopCapturer;
  const [windows, setWindows] = useState<Electron.DesktopCapturerSource[]>([]);
  const [source, setSource] = useAtom(sourceAtom);

  // get list of Application windows
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

  // HANDLE SOURCE
  function handleSource(id: number) {
    console.log("WINDOW SELECTED: ", id);
    setSource((prev) => windows[id]);
    // setVideoSource(windows[id]);
  }

  return (
    <div className={`sources ${source ? `slide` : ``}`}>
      {windows.map((w, i) => (
        <div className="screens__thumbnail" key={i}>
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
  );
}

export default SourceSelect;
