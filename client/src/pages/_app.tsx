import "../styles/globals.scss";
import type {AppProps} from "next/app";
import {useEffect} from "react";
import {logger} from "../utils/logger";

export default function MyApp({Component, pageProps}: AppProps) {

  //TODO fjern før merge til master
  useEffect(() => {
    logger.info("tester frontendlogging fra forebygge fravær")
  }, [])

    return <Component {...pageProps}/>;
}
