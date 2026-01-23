import React from "react";
import { SykefraværAppData } from "./hooks/useSykefraværAppData";
import { RestStatus } from "../integrasjoner/rest-status";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import FeilFraAltinnSide from "./FeilSider/FeilFraAltinnSide/FeilFraAltinnSide";
import WrappedForside from "./Forside/Forside";

export default function Sykefraværsstatistikkside(
  props: SykefraværAppData & {
    kjørerMockApp: boolean;
    prodUrl?: string;
  },
) {
  if (props.altinnOrganisasjoner.status === RestStatus.IkkeInnlogget) {
    return <Innloggingsside redirectUrl={window.location.href} />;
  }

  if (
    [RestStatus.IngenTilgang, RestStatus.Feil].includes(
      props.altinnOrganisasjoner.status,
    )
  ) {
    return <FeilFraAltinnSide />;
  }

  return <WrappedForside {...props} />;
}
