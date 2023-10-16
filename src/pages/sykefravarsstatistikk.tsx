import React from "react";
import {
  useSykefraværAppData,
  transformSykefraværAppData,
} from "../sykefravarsstatistikk/hooks/useSykefraværAppData";
import Forside from "../sykefravarsstatistikk/Forside/Forside";

export function AppContent() {
  return <Forside {...transformSykefraværAppData(useSykefraværAppData())} />;
}

export default AppContent;
