import { FunctionComponent } from "react";
import { useSykefraværshistorikk } from "../hooks/useSykefraværshistorikk";
import { RestStatus } from "../integrasjoner/rest-status";

export const Infographic: FunctionComponent = () => {
  const sykefraværshistorikk = useSykefraværshistorikk();

  if (sykefraværshistorikk.status === RestStatus.Suksess) {
    return <p>{sykefraværshistorikk.data.length}</p>;
  }

  return <p>hellu</p>;
};
