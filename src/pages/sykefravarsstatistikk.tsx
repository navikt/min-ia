import React from "react";
import {
  useSykefraværAppData,
  transformSykefraværAppData,
} from "../sykefravarsstatistikk/hooks/useSykefraværAppData";
import Forside from "../sykefravarsstatistikk/Forside/Forside";
import { getGrafanaUrl, getProdUrl, isMockApp } from "../utils/envUtils";
import { doInitializeFaro } from "../utils/initializeFaro";

export function AppContent({
  grafanaAgentUrl,
  ...props
}: {
  kjørerMockApp: boolean;
  grafanaAgentUrl: string;
  prodUrl?: string;
}) {
  React.useEffect(() => {
    if (!props.kjørerMockApp) {
      doInitializeFaro(grafanaAgentUrl, "sykefraværsstatistikk");
    }
  });

  return (
    <Forside
      {...transformSykefraværAppData(useSykefraværAppData())}
      {...props}
    />
  );
}

export async function getServerSideProps() {
  return {
    props: {
      kjørerMockApp: isMockApp(),
      grafanaAgentUrl: getGrafanaUrl(),
      prodUrl: getProdUrl("sykefravarsstatistikk"),
    },
  };
}

export default AppContent;
