import React from "react";
//import { Forside } from "./Forside/Forside";
import { useSykefraværAppData } from "./hooks/useSykefraværAppData";
import dynamic from "next/dynamic";

//TODO: Prøv å få til server side rendering
const Forside = dynamic(() => import("./Forside/Forside"), { ssr: false });

const App = () => {
  //TODO: Redirect til innloggingsside hvis ikke innlogget
  //TODO: Redirect til feilside hvis feil fra altinn
  return <Forside {...useSykefraværAppData()} />;
};

export default App;
