import "../styles/globals.scss";
import type { AppProps } from "next/app";
import {useEffect, useRef} from "react";
import {sendSidevisningEvent} from "../amplitude/events";

export default function MyApp({ Component, pageProps }: AppProps) {

  // Using ref so that the metrics is only sent once per page visit
  const hasLogged = useRef(false)
  useEffect(() => {
    if(!hasLogged.current && typeof document !== 'undefined') {
      sendSidevisningEvent()
      hasLogged.current = true
    }
  }, [])

  return <Component {...pageProps}/>;
}
