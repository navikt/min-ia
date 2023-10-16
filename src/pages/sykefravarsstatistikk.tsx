import React from "react";
import {
  useSykefraværAppData,
  transformSykefraværAppData,
} from "../sykefravarsstatistikk/hooks/useSykefraværAppData";

import dynamic from "next/dynamic";

const Forside = dynamic(
  () => import("../sykefravarsstatistikk/Forside/Forside"),
  {
    ssr: false,
  }
);

export function AppContent() {
  return <Forside {...transformSykefraværAppData(useSykefraværAppData())} />;
}

export default AppContent;
