import React, {FunctionComponent} from "react";
import styles from "./SlikHarViKommetFramTilDittResultat.module.css";
import {BodyShort, ReadMore} from "@navikt/ds-react";

import {sendPanelEkspanderEvent} from "../../../amplitude/amplitude";

export const HvilkenPeriodeErStatistikkenBasertPå: FunctionComponent = () => {
  const panelHeader = "Hvilken periode er statistikken basert på?";
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
          Vi regner ut prosenten som et gjennomsnitt av de fire siste kvartalene som er publisert. Hvis vi mangler ett
          eller flere kvartaler, så bruker vi de som er tilgjengelig. Du får sammenlikning med bransjen når du har tall
          for fire kvartaler.
        </BodyShort>
      </div>
    </ReadMore>
  );
};
