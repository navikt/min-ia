
export type PlanStatus = "PLANLAGT" | "PÅGÅR" | "FULLFØRT" | "AVBRUTT";

export type PlanUndertema = {
	id: number;
	navn: string;
	målsetning: string;
	inkludert: boolean;
	status: PlanStatus;
	startDato: string | null;
	sluttDato: string | null;
	harAktiviteterISalesforce: boolean;
}

export type PlanTema = {
	id: number;
	navn: string;
	inkludert: boolean;
	undertemaer: PlanUndertema[];
}

export type PlanType = {
	id: string;
	sistEndret: string;
	sistPublisert: string; // Denne er optional i Lydia, men må vel være true for å ha kommet hit?
	temaer: PlanTema[];
	status: string;
}