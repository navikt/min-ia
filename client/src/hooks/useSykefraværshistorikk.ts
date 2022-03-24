import { useEffect, useState } from "react";
import { RestStatus } from "../integrasjoner/rest-status";
import {
  hentRestSykefraværshistorikk,
  RestSykefraværshistorikk,
} from "../integrasjoner/kvartalsvis-sykefraværshistorikk-api";
import { useOrgnr } from "./useOrgnr";

export function useSykefraværshistorikk() {
  const orgnr = useOrgnr();

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
