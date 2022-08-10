import { API_BASE_PATH } from "../utils/konstanter";
import { RestRessurs, RestStatus } from "./rest-status";
import { fetchMedFeilhåndtering } from "./api-utils";

export enum Statistikkategori {
  LAND = "LAND",
  NÆRING = "NÆRING",
  BRANSJE = "BRANSJE",
}

export type RestAggregertStatistikk = RestRessurs<AggregertStatistikkDto>;

export interface AggregertStatistikkDto {
  prosentSiste4Kvartaler: StatistikkDto[];
  trend: StatistikkDto[];
}

export interface StatistikkDto {
  statistikkategori: Statistikkategori;
  label: string;
  verdi: number;
  antallPersonerIBeregningen: number;
  kvartalerIBeregningen: Kvartal[];
}

export interface Kvartal {
  årstall: number;
  kvartal: number;
}

const sykefraværshistorikkPath = (orgnr: string) =>
  `${API_BASE_PATH}/${orgnr}/sykefravarshistorikk/aggregert/v1`;

export const hentAggregertStatistikk = async (
  orgnr: string
): Promise<RestAggregertStatistikk> => {
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
