import { useEffect, useState } from "react";
import { RestStatus } from "../integrasjoner/rest-status";
import {
  hentAggregertStatistikk,
  RestAggregertStatistikk,
} from "../integrasjoner/aggregert-statistikk-api";
import { useOrgnr } from "./useOrgnr";

export function useAggregertStatistikk() {
  const orgnr = useOrgnr();

  const [aggregertStatistikk, setAggregertStatistikk] =
    useState<RestAggregertStatistikk>({ status: RestStatus.IkkeLastet });

  useEffect(() => {
    if (orgnr) {
      setAggregertStatistikk({
        status: RestStatus.IkkeLastet,
      });
      (async () => {
        setAggregertStatistikk(await hentAggregertStatistikk(orgnr));
      })();
    }
  }, [orgnr]);
  return aggregertStatistikk;
}
