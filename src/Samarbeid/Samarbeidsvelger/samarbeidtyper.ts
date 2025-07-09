
export type SamarbeidStatus = "AKTIV" | "FULLFØRT" | "SLETTET" | "AVBRUTT";

type SamarbeidhendelseBase = {
	dato: Date;
}
export type SarbeidsplanHendelse = SamarbeidhendelseBase & {
	type: "SAMARBEIDSPLAN";
	start: Date;
	slutt: Date;
}

export type SpørreundersøkelseHendelse = SamarbeidhendelseBase & {
	type: "BEHOVSVURDERING" | "EVALUERING";
	gjennomført: Date;
}

export type SamarbeidOpprettetHendelse = SamarbeidhendelseBase & {
	type: "SAMARBEID_STATUSENDRING";
	nyStatus: SamarbeidStatus;
	dato: Date;
}

export type Samarbeidhendelse = SarbeidsplanHendelse | SpørreundersøkelseHendelse | SamarbeidOpprettetHendelse;

export type Samarbeid = {
	id: string;
	navn: string;
	status: SamarbeidStatus;
	hendelser: Samarbeidhendelse[];
};