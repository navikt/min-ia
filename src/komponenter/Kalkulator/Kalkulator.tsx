import React, { FunctionComponent, useState } from "react";
import styles from "./Kalkulator.module.scss";
import { KalkulatorMedDagsverk } from "./KalkulatorMedDagsverk";
import { KalkulatorMedProsent } from "./KalkulatorMedProsent";
import { Heading, Ingress, Link, ToggleGroup } from "@navikt/ds-react";
import TestVersjonBanner from "../Banner/TestVersjonBanner";
import { sendToggleEvent } from "../../analytics/analytics";

export interface KalkulatorData {
  tapteDagsverk?: string;
  muligeDagsverk?: string;
  fraværsprosentVirksomhet?: string;
}

export const Fraværskalulator: FunctionComponent<
  KalkulatorData & {
    nedlastingPågår: boolean;
    kjørerMockApp?: boolean;
    prodUrl?: string;
  }
> = (props) => {
  const [kalkulatorvariant, setKalkulatorvariant] = useState("prosent");

  return (
    <div className={styles.wrapper}>
      <TestVersjonBanner
        sidenavn="fraværskalkulatoren"
        prodUrl={props.prodUrl}
        kjørerMockApp={props.kjørerMockApp}
      />
      <div className={styles.kalkulator}>
        <div>
          <div className={styles.tittel_wrapper}>
            <div>
              <Heading level="2" size="medium" className={styles.tittel}>
                Hvor mye koster sykefraværet?
              </Heading>
              <Ingress className={styles.ingress}>
                Her kan du beregne hvor mye sykefraværet koster og hvor mye du
                kan spare. Beløpet viser produksjonstap og økte kostnader. Lønn
                og sykepengerefusjoner er ikke en del av beløpet.
              </Ingress>
            </div>
            <div className={styles.dagsverk_eller_prosent_toggle}>
              <ToggleGroup
                onChange={(valgtVariant) => {
                  setKalkulatorvariant(valgtVariant);
                  sendToggleEvent("kalkulatorvariant", valgtVariant);
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
          <Link
            className={styles.les_mer}
            href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/"
          >
            Les mer om hva som påvirker kostnader ved sykefravær (sintef.no)
          </Link>
        </div>
      </div>
    </div>
  );
};
