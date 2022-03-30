import { BASE_PATH } from "../utils/konstanter";
import { RestRessurs, RestStatus } from "./rest-status";
import { fetchMedFeilhåndtering } from "./api-utils";

export enum SykefraværshistorikkType {
  LAND = "LAND",
  SEKTOR = "SEKTOR",
  NÆRING = "NÆRING",
  BRANSJE = "BRANSJE",
  VIRKSOMHET = "VIRKSOMHET",
  OVERORDNET_ENHET = "OVERORDNET_ENHET",
}

export type RestSykefraværshistorikk = RestRessurs<
  KvartalsvisSykefraværshistorikk[]
>;

export type KvartalsvisSykefraværsprosent = {
  kvartal: number;
  årstall: number;
} & Sykefraværsprosent;

export type Sykefraværsprosent =
  | {
      erMaskert: true;
      prosent: null;
      tapteDagsverk: null;
      muligeDagsverk: null;
    }
  | {
      erMaskert: false;
      prosent: number | undefined;
      tapteDagsverk: number | undefined;
      muligeDagsverk: number | undefined;
    };

export interface KvartalsvisSykefraværshistorikk {
  type: SykefraværshistorikkType;
  label: string;
  kvartalsvisSykefraværsprosent: KvartalsvisSykefraværsprosent[];
}

const sykefraværshistorikkPath = (orgnr: string) =>
  `${BASE_PATH}/api/${orgnr}/v1/offentlig/sykefravarshistorikk/kvartalsvis`;

export const hentRestSykefraværshistorikk = async (
  orgnr: string
): Promise<RestSykefraværshistorikk> => {
  const response = await fetchMedFeilhåndtering<
    KvartalsvisSykefraværshistorikk[]
  >(sykefraværshistorikkPath(orgnr), {
    method: "GET",
    credentials: "include",
  });
  if (response.status === RestStatus.Suksess) {
    return {
      status: RestStatus.Suksess,
      data: response.data,
    };
  } else {
    return response;
  }
};
