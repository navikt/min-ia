import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from "./Kalkulator.module.scss";
import { KalkulatorMedDagsverk } from "./KalkulatorMedDagsverk";
import { KalkulatorMedProsent } from "./KalkulatorMedProsent";
import { useOrgnr } from "../../hooks/useOrgnr";
import { sendToggleEvent } from "../../amplitude/events";
import {Heading, Ingress, Link, ToggleGroup} from "@navikt/ds-react";
import {
  IaTjeneste,
  sendLevertInnloggetIaTjeneste,
} from "../../integrasjoner/ia-tjenestemetrikker-api";
import { useSendIaTjenesteMetrikkOnEvent } from "../../hooks/useSendIaTjenesteMetrikkOnEvent";

export interface KalkulatorData {
  tapteDagsverk?: string;
  muligeDagsverk?: string;
  fraværsprosentVirksomhet?: string;
}

export const Fraværskalulator: FunctionComponent<
  KalkulatorData & {
    nedlastingPågår: boolean;
  }
> = (props) => {
  useSendIaTjenesteMetrikkOnEvent(
    IaTjeneste.KALKULATOR,
    "inputfeltEndretAvBruker"
  );

  const [kalkulatorvariant, setKalkulatorvariant] = useState("prosent");

  return (
    <div className={styles.wrapper}>
      <div className={styles.kalkulator}>
        <div>
          <div className={styles.tittel_wrapper}>
            <div>
              <Heading level="2" size="medium" className={styles.tittel}>
                Hvor mye koster sykefraværet?
              </Heading>
              <Ingress className={styles.ingress}>
                Her kan du beregne hvor mye sykefraværet koster og hvor mye du
                kan spare. Beløpet viser produksjonstap og økte kostnader.
                Lønn og sykepengerefusjoner er ikke en del av beløpet.
              </Ingress>
            </div>
            <div className={styles.dagsverk_eller_prosent_toggle}>
              <ToggleGroup
                onChange={(valgtVariant) => {
                  setKalkulatorvariant(valgtVariant);
                  sendToggleEvent("kalkulatorvariant", valgtVariant);
                  document.dispatchEvent(
                    new CustomEvent("inputfeltEndretAvBruker")
                  );
                }}
                value={kalkulatorvariant}
                size="medium"
              >
                <ToggleGroup.Item value="prosent">Prosent</ToggleGroup.Item>
                <ToggleGroup.Item value="dagsverk">Dagsverk</ToggleGroup.Item>
              </ToggleGroup>
            </div>
          </div>
          <Ingress className={styles.input_overskrift}>
            Fyll inn og juster tallene så de passer for deg:
          </Ingress>
          {kalkulatorvariant === "dagsverk" ? (
            <KalkulatorMedDagsverk
              tapteDagsverkFraDb={props.tapteDagsverk}
              nedlastingPågår={props.nedlastingPågår}
            />
          ) : (
            <KalkulatorMedProsent
              muligeDagsverkFraDb={props.muligeDagsverk}
              sykefraværsprosentFraDb={props.fraværsprosentVirksomhet}
              nedlastingPågår={props.nedlastingPågår}
            />
          )}
            <Link className={styles.les_mer} href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/">
              Les mer om hva som påvirker kostnader ved sykefravær (sintef.no)
            </Link>
        </div>
      </div>
    </div>
  );
};
