import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import "./Kalkulator.less";
import { KalkulatorMedDagsverk } from "./KalkulatorMedDagsverk";
import { KalkulatorMedProsent } from "./KalkulatorMedProsent";
import { useOrgnr } from "../../../hooks/useOrgnr";
import {
  sendSidevisningEvent,
  sendToggleEvent,
} from "../../../amplitude/events";
import { scrollToBanner } from "../../../utils/scroll-utils";
import { Heading, Ingress, ToggleGroup } from "@navikt/ds-react";
import {
  IaTjeneste,
  sendLevertInnloggetIaTjeneste,
} from "../../../integrasjoner/ia-tjenestemetrikker-api";

export interface KalkulatorData {
  tapteDagsverk?: number;
  muligeDagsverk?: number;
  fraværsprosentVirksomhet?: number;
}

export const Fraværskalkulator: FunctionComponent<
  KalkulatorData & {
    nedlastingPågår: string;
  }
> = (props) => {
  const orgnr = useOrgnr();

  const [kalkulatorvariant, setKalkulatorvariant] = useState("prosent");

  // Using ref so that the metrics is only sent once per page visit
  const hasLoggedPageVisit = useRef(false);
  useEffect(() => {
    if (!hasLoggedPageVisit.current && typeof document !== "undefined") {
      sendSidevisningEvent();
      hasLoggedPageVisit.current = true;
    }
  }, []);

  // TODO: Er denne nødvendig?
  useEffect(() => {
    scrollToBanner();
  }, []);

  return (
    <div className="kalkulator__wrapper">
      <div className="kalkulator">
        <div>
          <div className="kalkulator__tittel-wrapper">
            <div>
              <Heading level="1" size="medium" className="kalkulator__tittel">
                Hvor mye koster sykefraværet?
              </Heading>
              <Ingress className="kalkulator__ingress">
                Her kan du beregne hvor mye sykefraværet koster og hvor mye du
                kan spare. Lønnskostnader og sykepengerefusjon er ikke med i
                regnestykket og kommer i tillegg til kostnad per dag.
              </Ingress>
            </div>
            <div className="kalkulator__dagsverk-eller-prosent-toggle">
              <ToggleGroup
                onChange={(valgtVariant) => {
                  setKalkulatorvariant(valgtVariant);
                  sendToggleEvent("kalkulatorvariant", valgtVariant);
                  sendLevertInnloggetIaTjeneste(IaTjeneste.KALKULATOR, orgnr);
                }}
                value={kalkulatorvariant}
                size="medium"
              >
                <ToggleGroup.Item value="prosent">Prosent</ToggleGroup.Item>
                <ToggleGroup.Item value="dagsverk">Dagsverk</ToggleGroup.Item>
              </ToggleGroup>
            </div>
          </div>
          <Ingress className="kalkulator__input-overskrift">
            Fyll inn og juster tallene så de passer for deg
          </Ingress>
          {kalkulatorvariant === "dagsverk" ? (
            <KalkulatorMedDagsverk tapteDagsverkFraDb={props.tapteDagsverk} />
          ) : (
            <KalkulatorMedProsent
              muligeDagsverkFraDb={props.muligeDagsverk}
              sykefraværsprosentFraDb={props.fraværsprosentVirksomhet}
            />
          )}
        </div>
      </div>
    </div>
  );
};
