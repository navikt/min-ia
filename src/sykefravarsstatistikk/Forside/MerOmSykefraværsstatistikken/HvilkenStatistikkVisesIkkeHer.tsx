import React, { FunctionComponent } from "react";
import styles from "./SlikHarViKommetFramTilDittResultat.module.css";
import { BodyShort, ReadMore } from "@navikt/ds-react";

import { sendPanelEkspanderEvent } from "../../../utils/analytics/analytics";

export const HvilkenStatistikkVisesIkkeHer: FunctionComponent = () => {
  const panelHeader = "Hvilken statistikk vises ikke her?";
  const panelHeaderMedStyle =
    <>Hvilken statistikk vises <span style={{ textDecoration: "underline" }}>ikke</span> her?</>
  return (
    <ReadMore
      header={panelHeaderMedStyle}
      className={styles["slik-har-vi-kommet-fram-til-ditt-resultat"]}
      onClick={() => {
        sendPanelEkspanderEvent(panelHeader);
      }}
    >
      <div
        className={styles["slik-har-vi-kommet-fram-til-ditt-resultat__innhold"]}
      >
        <BodyShort spacing>
          Vi viser ikke egenmeldt sykefravær. Grunnet personvern viser vi ikke statistikk for diagnoser, kjønn, alder
          eller geografi.
        </BodyShort>
        <BodyShort spacing>
          Vi sender aldri ut statistikk på mail. Dersom flere i virksomheten skal se statistikken, må de
          ha tilgangen “Sykefraværsstatistikk for virksomheter”. Dette administreres i Altinn.
        </BodyShort>
      </div>
    </ReadMore>
  );
};
