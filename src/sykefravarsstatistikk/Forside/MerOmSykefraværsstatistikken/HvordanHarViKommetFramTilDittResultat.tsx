import React, { FunctionComponent } from "react";
import styles from "./SlikHarViKommetFramTilDittResultat.module.css";
import EksternLenke from "../../felleskomponenter/EksternLenke/EksternLenke";
import { BodyShort, ReadMore } from "@navikt/ds-react";

import { sendPanelEkspanderEvent } from "../../../analytics/analytics";

export const HvordanHarViKommetFramTilDittResultat: FunctionComponent = () => {
  const panelHeader = "Hvordan har vi kommet frem til ditt resultat?";
  return (
    <ReadMore
      header={panelHeader}
      className={styles["slik-har-vi-kommet-fram-til-ditt-resultat"]}
      onClick={() => {
        sendPanelEkspanderEvent(panelHeader);
      }}
    >
      <div
        className={styles["slik-har-vi-kommet-fram-til-ditt-resultat__innhold"]}
      >
        <BodyShort spacing>
          Resultatene er basert på legemeldt sykefravær og sammenligningen er hentet fra
          sykefraværsstatistikken som Nav og Statistisk sentralbyrå (SSB)
          utarbeider.
        </BodyShort>
        <BodyShort spacing>
          Les mer om datakilder og utregning på{" "}
          <EksternLenke href="https://www.nav.no/no/nav-og-samfunn/statistikk/sykefravar-statistikk/sykefravar/om-statistikken-sykefravaer">
            «Om statistikken – sykefravær» på nav.no
          </EksternLenke>
        </BodyShort>
      </div>
    </ReadMore>
  );
};
