import {BASE_PATH} from "../utils/konstanter";

export enum SykefraværshistorikkType {
    LAND = 'LAND',
    SEKTOR = 'SEKTOR',
    NÆRING = 'NÆRING',
    BRANSJE = 'BRANSJE',
    VIRKSOMHET = 'VIRKSOMHET',
    OVERORDNET_ENHET = 'OVERORDNET_ENHET',
}

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
    `${BASE_PATH}/api/${orgnr}/sykefravarshistorikk/kvartalsvis`;



