import { API_BASE_PATH } from "../utils/konstanter";
import { RestRessurs, RestStatus } from "./rest-status";
import { fetchMedFeilhåndtering } from "./api-utils";
import * as z from "zod";
import {logger, predefinerteFeilmeldinger} from "../utils/logger";

export enum Statistikkategori {
  LAND = "LAND",
  NÆRING = "NÆRING",
  BRANSJE = "BRANSJE",
  VIRKSOMHET = "VIRKSOMHET",
}

export type RestAggregertStatistikk = RestRessurs<AggregertStatistikkDto>;

export interface AggregertStatistikkDto {
  prosentSiste4KvartalerTotalt: StatistikkDto[];
  muligeDagsverkTotalt: StatistikkDto[];
  tapteDagsverkTotalt: StatistikkDto[];
  trendTotalt: StatistikkDto[];
}

export interface StatistikkDto {
  statistikkategori: Statistikkategori;
  label: string;
  verdi: string;
  antallPersonerIBeregningen: number;
  kvartalerIBeregningen: Kvartal[];
}

export interface Kvartal {
  årstall: number;
  kvartal: number;
}

export const tomtDataobjekt: AggregertStatistikkDto = {
  prosentSiste4KvartalerTotalt: [],
  muligeDagsverkTotalt: [],
  tapteDagsverkTotalt: [],
  trendTotalt: [],
};

const sykefraværshistorikkPath = (orgnr: string) =>
  `${API_BASE_PATH}/${orgnr}/v1/sykefravarshistorikk/aggregert`;

export const hentAggregertStatistikk = async (
  orgnr: string
): Promise<RestAggregertStatistikk> => {
  try {
    z.string().length(9).parse(orgnr);
  } catch {
    logger.info(predefinerteFeilmeldinger.ugyldigOrgnummer)
    return { status: RestStatus.IngenTilgang };
  }
  const response = await fetchMedFeilhåndtering<AggregertStatistikkDto>(
    sykefraværshistorikkPath(orgnr),
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (response.status === RestStatus.Suksess) {
    return {
      status: RestStatus.Suksess,
      data: response.data,
    };
  } else {
    return response;
  }
};
