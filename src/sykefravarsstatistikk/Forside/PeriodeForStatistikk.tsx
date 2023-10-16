import React, { FunctionComponent } from "react";
import { BodyShort, Loader } from "@navikt/ds-react";
import { RestRessurs, RestStatus } from "../../integrasjoner/rest-status";
import { ÅrstallOgKvartal } from "../hooks/useSykefraværAppData";

export const PeriodeForStatistikk: FunctionComponent<{
  restPubliseringsdatoer: RestRessurs<{ gjeldendePeriode: ÅrstallOgKvartal }>;
}> = ({ restPubliseringsdatoer }) => {
  const status = restPubliseringsdatoer.status;
  if (status === RestStatus.Suksess) {
    return (
      <BodyShort>
        {`Sykefraværsstatistikken er fra perioden ` +
          getPeriodeMedDato(restPubliseringsdatoer.data.gjeldendePeriode)}
      </BodyShort>
    );
  } else if (
    status === RestStatus.IkkeLastet ||
    status === RestStatus.LasterInn
  ) {
    return <Loader />;
  } else {
    return <BodyShort>{""}</BodyShort>;
  }
};

const getPeriodeMedDato = (årstallOgKvartal: ÅrstallOgKvartal): string => {
  if (årstallOgKvartal.kvartal === 1) {
    return `1. april ${årstallOgKvartal.årstall - 1} til 31. mars ${
      årstallOgKvartal.årstall
    }`;
  } else if (årstallOgKvartal.kvartal === 2) {
    return `1. juli ${årstallOgKvartal.årstall - 1} til 30. juni ${
      årstallOgKvartal.årstall
    }`;
  } else if (årstallOgKvartal.kvartal === 3) {
    return `1. oktober ${årstallOgKvartal.årstall - 1} til 30. september ${
      årstallOgKvartal.årstall
    }`;
  } else if (årstallOgKvartal.kvartal === 4) {
    return `1. januar ${årstallOgKvartal.årstall} til 31. desember ${årstallOgKvartal.årstall}`;
  } else {
    return ``;
  }
};
