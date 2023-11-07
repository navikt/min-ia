export type AktivitetStatistikkType = {
    ferdige: number;
    påbegynte: number;
    ikkeStartet: number;
    totalt: number;
};

export interface Aktivitet {
    aktivitetsmalId: string;
    aktivitetsmalVersjon: string;
    tittel: string;
    beskrivelse: string;
    mål: string;
    innhold?: string[]; //TODO
    status: AktivitetStatus;
    aktivitetsId?: number;
    frist?: string;
    fullførtTidspunkt?: string;
    orgnr?: string;
}

export type AktivitetStatus = "IKKE_VALGT" | "VALGT" | "FULLFØRT";
