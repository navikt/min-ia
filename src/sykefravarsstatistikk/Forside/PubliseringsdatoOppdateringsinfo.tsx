import React, { FunctionComponent } from "react";
import { BodyShort, Loader } from "@navikt/ds-react";
import { RestRessurs, RestStatus } from "../../integrasjoner/rest-status";

import { Publiseringsdatoer } from "../hooks/useSykefraværAppData";

export const PubliseringsdatoOppdateringsinfo: FunctionComponent<{
  restPubliseringsdatoer: RestRessurs<Publiseringsdatoer>;
}> = ({ restPubliseringsdatoer }) => {
  if (restPubliseringsdatoer.status === RestStatus.Suksess) {
    const publiseringsdatoer = restPubliseringsdatoer.data;
    return (
      <div>
        <BodyShort>
          {`Sist oppdatert: ` +
            formatterDatoMedMånedNavn(
              new Date(publiseringsdatoer.sistePubliseringsdato)
            )}
        </BodyShort>
        <BodyShort>
          {isFinite(
            new Date(publiseringsdatoer.nestePubliseringsdato).getDate()
          ) &&
            `Neste oppdatering: ` +
              formatterDatoMedMånedNavn(
                new Date(publiseringsdatoer.nestePubliseringsdato)
              )}
        </BodyShort>
      </div>
    );
  } else if (
    restPubliseringsdatoer.status === RestStatus.LasterInn ||
    restPubliseringsdatoer.status === RestStatus.IkkeLastet
  ) {
    return <Loader />;
  } else {
    return <BodyShort>{""}</BodyShort>;
  }
};

const månedsnavn = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];

export const formatterDatoMedMånedNavn = (dato: Date): string => {
  const dag = dato.getDate();
  const måned = månedsnavn[dato.getMonth()];
  const year = dato.getFullYear();
  return `${dag}. ${måned} ${year}`;
};
