import React from "react";
import {
  useSykefraværAppData,
  transformSykefraværAppData,
} from "../sykefravarsstatistikk/hooks/useSykefraværAppData";
import { getGrafanaUrl, getProdUrl, isMockApp } from "../utils/envUtils";
import { doInitializeFaro } from "../utils/initializeFaro";
import Sykefraværsstatistikkside from "../sykefravarsstatistikk/Sykefravarsstatistikkside";
import { useSendIaMetrikkEtterFemSekunder } from "../hooks/useSendIaTjenesteMetrikkEtterFemSekunder";

export function SykefraværsstatistikkAppContent({
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
  useSendIaMetrikkEtterFemSekunder()

  return (
    <Sykefraværsstatistikkside
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

export default SykefraværsstatistikkAppContent;
