import { Samarbeid, Samarbeidhendelse } from "./samarbeidtyper";

const dummyHendelser = {
	samarbeidOpprettet: {
		type: "SAMARBEID_STATUSENDRING",
		nyStatus: "AKTIV",
		dato: new Date("2024-12-01")
	} as Samarbeidhendelse,
	samarbeidFullført: {
		type: "SAMARBEID_STATUSENDRING",
		nyStatus: "FULLFØRT",
		dato: new Date("2025-11-31")
	} as Samarbeidhendelse,
	samarbeidSlettet: {
		type: "SAMARBEID_STATUSENDRING",
		nyStatus: "SLETTET",
		dato: new Date("2025-06-31")
	} as Samarbeidhendelse,
	samarbeidAvbrutt: {
		type: "SAMARBEID_STATUSENDRING",
		nyStatus: "AVBRUTT",
		dato: new Date("2025-12-31")
	} as Samarbeidhendelse,
	pågåendePlan: {
		type: "SAMARBEIDSPLAN",
		start: new Date("2025-01-01"),
		slutt: new Date("2025-12-31"),
		dato: new Date("2025-01-01")
	} as Samarbeidhendelse,
	avsluttetPlan: {
		type: "SAMARBEIDSPLAN",
		start: new Date("2025-01-01"),
		slutt: new Date("2025-06-30"),
		dato: new Date("2025-06-30")
	} as Samarbeidhendelse,
	spørreundersøkelseBehovsvurdering: {
		type: "BEHOVSVURDERING",
		gjennomført: new Date("2025-02-15"),
		dato: new Date("2025-02-15")
	} as Samarbeidhendelse,
	spørreundersøkelseEvaluering: {
		type: "EVALUERING",
		gjennomført: new Date("2025-11-15"),
		dato: new Date("2025-11-15")
	} as Samarbeidhendelse,
	spørreundersøkelseEvalueringEtterFullført: {
		type: "EVALUERING",
		gjennomført: new Date("2025-12-31"),
		dato: new Date("2025-12-31")
	} as Samarbeidhendelse,
}

export const dummySamarbeid: Samarbeid[] = [
	{
		id: "1",
		navn: "Avdeling Oslo",
		status: "AKTIV",
		hendelser: [
			dummyHendelser.samarbeidOpprettet,
			dummyHendelser.spørreundersøkelseBehovsvurdering,
			dummyHendelser.pågåendePlan,
		]
	},
	{
		id: "2",
		navn: "Avdeling Gjøvik",
		status: "AKTIV",
		hendelser: [
			dummyHendelser.samarbeidOpprettet,
			dummyHendelser.spørreundersøkelseBehovsvurdering,
		]
	},
	{
		id: "3",
		navn: "Avdeling Bodø",
		status: "AKTIV",
		hendelser: [
			dummyHendelser.samarbeidOpprettet,
		]
	},
	{
		id: "4",
		navn: "Avdeling Arendal",
		status: "FULLFØRT",
		hendelser: [
			dummyHendelser.samarbeidOpprettet,
			dummyHendelser.spørreundersøkelseBehovsvurdering,
			dummyHendelser.avsluttetPlan,
			dummyHendelser.spørreundersøkelseEvalueringEtterFullført,
			dummyHendelser.samarbeidFullført
		]
	},
	{
		id: "5",
		navn: "Avdeling Bergen",
		status: "AVBRUTT",
		hendelser: [
			dummyHendelser.samarbeidOpprettet,
			dummyHendelser.spørreundersøkelseBehovsvurdering,
			dummyHendelser.pågåendePlan,
			dummyHendelser.samarbeidAvbrutt
		]
	},
	{
		id: "6",
		navn: "Avdeling Trondheim",
		status: "AKTIV",
		hendelser: [

		]
	},
	{
		id: "7",
		navn: "Avdeling Tromsø",
		status: "AKTIV",
		hendelser: [

		]
	},
	{
		id: "8",
		navn: "Avdeling Stavanger",
		status: "AKTIV",
		hendelser: [

		]
	},
	{
		id: "9",
		navn: "Avdeling Kristiansand",
		status: "AKTIV",
		hendelser: [

		]
	},
	{
		id: "10",
		navn: "Avdeling Drammen",
		status: "FULLFØRT",
		hendelser: [

		]
	},
	{
		id: "11",
		navn: "Avdeling Lillehammer",
		status: "SLETTET",
		hendelser: [

		]
	},
	{
		id: "12",
		navn: "Avdeling Haugesund",
		status: "AVBRUTT",
		hendelser: [

		]
	},
];
