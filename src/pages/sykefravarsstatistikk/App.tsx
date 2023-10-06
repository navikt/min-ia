import React from "react";
import { Forside } from "./Forside/Forside";
import { useSykefraværAppData } from "./hooks/useSykefraværAppData";

const App = () => {
  //TODO: Redirect til innloggingsside hvis ikke innlogget
  //TODO: Redirect til feilside hvis feil fra altinn
  return <Forside {...useSykefraværAppData()} />;
};

export default App;
