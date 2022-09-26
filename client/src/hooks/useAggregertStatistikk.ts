import { useEffect, useState } from "react";
import { RestStatus } from "../integrasjoner/rest-status";
import {
  hentAggregertStatistikk,
  RestAggregertStatistikk,
} from "../integrasjoner/aggregert-statistikk-api";
import { useOrgnr } from "./useOrgnr";

export function useAggregertStatistikk(): RestAggregertStatistikk {
  const orgnr = useOrgnr();

  const [aggregertStatistikk, setAggregertStatistikk] =
    useState<RestAggregertStatistikk>({ status: RestStatus.IkkeLastet });

  // TODO: UseMemo? Dumt hvis kallet går flere ganger
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
