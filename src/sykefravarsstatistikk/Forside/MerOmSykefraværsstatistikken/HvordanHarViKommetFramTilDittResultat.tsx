import React, { FunctionComponent } from "react";
import styles from "./SlikHarViKommetFramTilDittResultat.module.css";
import EksternLenke from "../../felleskomponenter/EksternLenke/EksternLenke";
import { BodyShort, ReadMore } from "@navikt/ds-react";

import {sendPanelEkspanderEvent} from "../../../amplitude/amplitude";

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
          Legemeldt sykefravær i sammenligningen er hentet fra
          sykefraværsstatistikken som NAV og Statistisk sentralbyrå (SSB)
          utarbeider. Vi viser ikke egenmeldt sykefravær.
        </BodyShort>
        <BodyShort spacing>
          Du kan lese mer om datakilder og utregning på{" "}
          <EksternLenke href="https://www.nav.no/no/nav-og-samfunn/statistikk/sykefravar-statistikk/sykefravar/om-statistikken-sykefravaer">
            «Om statistikken – sykefravær» på nav.no
          </EksternLenke>
        </BodyShort>
      </div>
    </ReadMore>
  );
};
