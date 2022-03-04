import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.scss";

import { atom } from "jotai";
export const isRecordingAtom = atom(false);
export const sourceAtom = atom<Electron.DesktopCapturerSource | null>(null);

export const startRecording = (mediaRecorder) => {
  mediaRecorder.start();
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
