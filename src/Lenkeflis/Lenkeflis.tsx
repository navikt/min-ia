import {LinkPanel} from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import {sendNavigereEvent} from "../amplitude/events";
import {sendIaTjenesteMetrikk} from "../integrasjoner/ia-tjenestemetrikker-api";
import {useOrgnr} from "../hooks/useOrgnr";
import {navigerEtterCallbacks} from "../utils/navigasjon";
import {MetrikkKilde} from "@navikt/ia-metrikker-client";

export interface LenkeflisProps {
    overskrift: string;
    ikon?: React.ReactElement;
    href?: string;
    brødtekst?: string;
}

export const Lenkeflis = ({
    overskrift,
    ikon,
    href,
    brødtekst,
}: LenkeflisProps) => {
    const orgnr = useOrgnr();
    const destinasjon = href ?? "#";

    const metrikkutsendelse = () =>
      sendIaTjenesteMetrikk(MetrikkKilde.FOREBYGGE_FRAVÆR, orgnr);
    const eventutsendelse = () =>
      sendNavigereEvent(destinasjon, overskrift) as Promise<boolean>;

    return (
      <LinkPanel
          href={destinasjon}
          className={styles.lenkeflis}
          onClickCapture={(e) => {
              e.preventDefault();
          }}
          onClick={() => {
              navigerEtterCallbacks(destinasjon, [
                  metrikkutsendelse,
                  eventutsendelse,
              ]);
          }}
      >
          <LinkPanel.Title>
              <div className={styles.ikonOgTekstWrapper}>
                  {ikon && <div className={styles.ikonWrapper}>{ikon}</div>}
                  {overskrift}
              </div>
          </LinkPanel.Title>
          {brødtekst && <LinkPanel.Description>{brødtekst}</LinkPanel.Description>}
      </LinkPanel>
    );
};
