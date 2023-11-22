import React, { FunctionComponent } from "react";

import { LegendMedToggles } from "./LegendMedToggles/LegendMedToggles";
import {
  HistorikkLabel,
  HistorikkLabels,
  KvartalsvisSammenligning,
} from "../../../utils/sykefraværshistorikk-utils";
import GrafVisning from "./GrafVisning";

interface Props {
  kvartalsvisSammenligning: KvartalsvisSammenligning[];
  historikkLabels: HistorikkLabels;
  linjerSomKanVises: HistorikkLabel[];
  linjerSomSkalVises: HistorikkLabel[];
  setLinjerSomSkalVises: (linjer: HistorikkLabel[]) => void;
}

const Graf: FunctionComponent<Props> = (props) => {
  const { linjerSomKanVises, linjerSomSkalVises, setLinjerSomSkalVises } =
    props;

  return (
    <>
      <LegendMedToggles
        labels={props.historikkLabels}
        linjerSomKanVises={linjerSomKanVises}
        linjerSomSkalVises={linjerSomSkalVises}
        setLinjerSomSkalVises={setLinjerSomSkalVises}
      />
      <GrafVisning
        kvartalsvisSammenligning={props.kvartalsvisSammenligning}
        linjerSomSkalVises={linjerSomSkalVises}
      />
    </>
  );
};

export default Graf;
