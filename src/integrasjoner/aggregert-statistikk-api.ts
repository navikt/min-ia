export enum Statistikkategori {
    LAND = "LAND",
    NÆRING = "NÆRING",
    BRANSJE = "BRANSJE",
    VIRKSOMHET = "VIRKSOMHET",
}

export interface AggregertStatistikkDto {
    prosentSiste4KvartalerTotalt: StatistikkDto[];
    muligeDagsverkTotalt: StatistikkDto[];
    tapteDagsverkTotalt: StatistikkDto[];
    trendTotalt: StatistikkDto[];
    prosentSiste4KvartalerGradert: StatistikkDto[];
    prosentSiste4KvartalerKorttid: StatistikkDto[];
    prosentSiste4KvartalerLangtid: StatistikkDto[];
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
    prosentSiste4KvartalerGradert: [],
    prosentSiste4KvartalerKorttid: [],
    prosentSiste4KvartalerLangtid: [],
    muligeDagsverkTotalt: [],
    tapteDagsverkTotalt: [],
    trendTotalt: [],
};
