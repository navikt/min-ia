import React, { FunctionComponent } from "react";

// TODO: Få inn stylinga herfra.
// import "./Graf.css";
import { LegendMedToggles } from "./LegendMedToggles/LegendMedToggles";
import GrafVisning from "./GrafVisning";
import {
  HistorikkLabel,
  HistorikkLabels,
  KvartalsvisSammenligning,
} from "../../../utils/sykefraværshistorikk-utils";

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
