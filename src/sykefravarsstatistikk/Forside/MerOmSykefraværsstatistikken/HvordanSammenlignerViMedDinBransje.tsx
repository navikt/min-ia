import React, { FunctionComponent } from "react";
import styles from "./SlikHarViKommetFramTilDittResultat.module.css";
import EksternLenke from "../../felleskomponenter/EksternLenke/EksternLenke";
import { BodyShort, ReadMore } from "@navikt/ds-react";

import { sendPanelEkspanderEvent } from "../../../utils/analytics/analytics";

interface HvordanSammenlignerViMedDinBransjeProps {
  harBransje: boolean,
}

export const HvordanSammenlignerViMedDinBransje: FunctionComponent<HvordanSammenlignerViMedDinBransjeProps> = ({ harBransje }: HvordanSammenlignerViMedDinBransjeProps) => {
  const panelHeader = harBransje ? "Hvordan sammenligner vi med din bransje" : "Hvordan sammenligner vi med din næring";
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
          Sammenligningen tar ikke hensyn til størrelsen på din virksomhet.
        </BodyShort>
        <BodyShort spacing>
          Din {harBransje ? "bransje" : "næring"} er hentet fra Brønnøysundregisterne.
        </BodyShort>
        <BodyShort spacing>
          <EksternLenke href="https://info.altinn.no/skjemaoversikt/bronnoysundregistrene/samordnet-registermelding---registrering-av-nye-og-endring-av-eksisterende-foretak-og-enheter/">
            Trykk her for å endre næringskode i Altinn
          </EksternLenke>
        </BodyShort>
        <BodyShort spacing>
          <EksternLenke
            href="https://www.brreg.no/bedrift/naeringskoder/">
            Les mer om næringskoder i Brønnøysundregistrene
          </EksternLenke>
        </BodyShort>
      </div>
    </ReadMore>
  );
};
