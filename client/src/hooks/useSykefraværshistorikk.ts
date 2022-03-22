import { useEffect, useState } from "react";
import { RestStatus } from "../integrasjoner/rest-status";
import {
  hentRestSykefraværshistorikk,
  RestSykefraværshistorikk,
} from "../integrasjoner/kvartalsvis-sykefraværshistorikk-api";

export function useSykefraværshistorikk() {
  const orgnr = "910562452"; // TODO: Hent ut faktisk orgnr

  const [restSykefraværshistorikk, setRestSykefraværshistorikk] =
    useState<RestSykefraværshistorikk>({ status: RestStatus.IkkeLastet });

  useEffect(() => {
    if (orgnr) {
      setRestSykefraværshistorikk({
        status: RestStatus.IkkeLastet,
      });
      const hentRestSykefraværshistorikkOgSettState = async () => {
        setRestSykefraværshistorikk(await hentRestSykefraværshistorikk(orgnr));
      };
      hentRestSykefraværshistorikkOgSettState();
    }
  }, [orgnr]);
  return restSykefraværshistorikk;
}
