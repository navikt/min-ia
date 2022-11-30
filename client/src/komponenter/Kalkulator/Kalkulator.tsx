import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from "./Kalkulator.module.scss";
import { KalkulatorMedDagsverk } from "./KalkulatorMedDagsverk";
import { KalkulatorMedProsent } from "./KalkulatorMedProsent";
import { useOrgnr } from "../../hooks/useOrgnr";
import { sendSidevisningEvent, sendToggleEvent } from "../../amplitude/events";
import { Heading, Ingress, ToggleGroup } from "@navikt/ds-react";
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
  const orgnr = useOrgnr();
  useSendIaTjenesteMetrikkOnEvent(
    IaTjeneste.KALKULATOR,
    "inputfeltEndretAvBruker"
  );

  const [kalkulatorvariant, setKalkulatorvariant] = useState("prosent");

  // Using ref so that the metrics is only sent once per page visit
  const hasLoggedPageVisit = useRef(false);
  useEffect(() => {
    if (!hasLoggedPageVisit.current && typeof document !== "undefined") {
      sendSidevisningEvent();
      hasLoggedPageVisit.current = true;
    }
  }, []);

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
                kan spare. Lønnskostnader og sykepengerefusjon er ikke med i
                regnestykket og kommer i tillegg til kostnad per dag.
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
        </div>
      </div>
    </div>
  );
};
