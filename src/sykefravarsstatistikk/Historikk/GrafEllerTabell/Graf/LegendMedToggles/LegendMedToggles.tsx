import React, { FunctionComponent } from "react";
import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import styles from "./LegendMedToggles.module.css";
import {
  HistorikkLabel,
  HistorikkLabels,
} from "../../../../utils/sykefraværshistorikk-utils";
import { GrafSymbol } from "../GrafSymbol/GrafSymbol";
import {sendCheckboxFjernet, sendCheckboxLagtTil} from "../../../../../amplitude/amplitude";

interface Props {
  labels: HistorikkLabels;
  linjerSomKanVises: HistorikkLabel[];
  linjerSomSkalVises: HistorikkLabel[];
  setLinjerSomSkalVises: (linjer: HistorikkLabel[]) => void;
  harStatistikkForBransje?: boolean;
}

export const LegendMedToggles: FunctionComponent<Props> = ({
  labels,
  linjerSomKanVises,
  linjerSomSkalVises,
  setLinjerSomSkalVises,
                                                             harStatistikkForBransje,
}) => {
  const prefikser: { [linje in HistorikkLabel]: string } = {
    virksomhet: "Virksomhet:",
    overordnetEnhet: "Overordnet enhet:",
    næringEllerBransje: harStatistikkForBransje ? "Bransje:" : "Næring:",
    sektor: "Sektor:",
    land: "",
  };

  return (
    <CheckboxGroup
      legend="Velg linjer som skal vises i grafen"
      value={linjerSomSkalVises}
      onChange={(value) => {
        if (value.length > linjerSomSkalVises.length) {
          // Brukeren har lagt til noe
          const verdiLagtTil = value.find(
            (v) => linjerSomSkalVises.indexOf(v) === -1
          );
          sendCheckboxLagtTil(verdiLagtTil);
        } else if (value.length < linjerSomSkalVises.length) {
          // Brukeren har fjernet noe
          const verdiFjernet = linjerSomSkalVises.find(
            (v) => value.indexOf(v) === -1
          );
          sendCheckboxFjernet(verdiFjernet);
        }

        setLinjerSomSkalVises(value);
      }}
    >
      {linjerSomKanVises.map((linje) => (
        <Checkbox key={linje} value={linje}>
          <div
            className={styles["legend-med-toggles__symbol_og_tekst_wrapper"]}
          >
            <GrafSymbol
              linje={linje}
              className={styles["legend-med-toggles__symbol"]}
            />
            {prefikser[linje]} {labels[linje]}
          </div>
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};
