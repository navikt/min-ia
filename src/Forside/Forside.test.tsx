import { render, screen, waitFor, within } from "@testing-library/react";
import { sendNavigereEvent, sendÅpneAktivitetEvent, sendOppgaveStatusEvent } from "../utils/analytics/analytics";
import { Forside } from "./Forside";
import React from "react";
import { RestStatus } from "../integrasjoner/rest-status";

jest.mock("../utils/analytics/analytics");
jest.mock('next/router', () => ({
	useRouter: jest.fn(() => {
		return {
			route: "/",
			pathname: "",
			query: "",
			asPath: "",
			push: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn(),
			},
			beforePopState: jest.fn(() => null),
			prefetch: jest.fn(() => null),
			replace: jest.fn(),
		};
	}),
}));


jest.mock("../hooks/useOrgnr", () => ({
	useOrgnr: () => "999999999",
}));

jest.mock("../hooks/useAltinnOrganisasjoner", () => ({
	useAltinnOrganisasjoner: jest.fn(() => ({
		status: RestStatus.Suksess,
		data: [
			{
				Name: "FLESK OG FISK AS [Local server]",
				Type: "Enterprise",
				OrganizationNumber: "999999999",
				OrganizationForm: "AS",
				Status: "Active",
				ParentOrganizationNumber: "",
			},
		],
	})),
	useAltinnOrganisasjonerMedStatistikktilgang: jest.fn(() => ({
		status: RestStatus.Suksess,
		data: [
			{
				Name: "FLESK OG FISK AS [Local server]",
				Type: "Enterprise",
				OrganizationNumber: "999999999",
				OrganizationForm: "AS",
				Status: "Active",
				ParentOrganizationNumber: "",
			},
		],
	})),
}));


describe("Forside", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it.each([
		{
			knappetekst: "Se din sykefraværsstatistikk",
			knappeurl: "sykefraværsstatistikkUrl",
		}, {
			knappetekst: "Fraværskalkulator",
			knappeurl: "/forebygge-fravar/kalkulator",
		}, {
			knappetekst: "Få tilskudd til ekspertbistand",
			knappeurl: "https://www.nav.no/arbeidsgiver/ekspertbistand",
			getKnapp: async () => screen.queryAllByText("Les mer")[0],
		}, {
			knappetekst: "Få hjelp til å redusere sykefraværet",
			knappeurl: "https://www.nav.no/arbeidsgiver/navarbeidslivssenter",
			getKnapp: async () => screen.queryAllByText("Les mer")[1],
		}, {
			knappetekst: "Bli med på kurs",
			knappeurl: "https://arbeidsgiver.nav.no/kursoversikt/?tema=Inkluderende%20arbeidsliv%20(IA)",
			getKnapp: async () => screen.queryAllByText("Les mer")[2],
		}, {
			knappetekst: "Arbeidsmiljøportalen",
			knappeurl: "https://www.arbeidsmiljoportalen.no",
		}, {
			knappetekst: "Idébanken",
			knappeurl: "https://www.idebanken.org",
		}, {
			knappetekst: "nav.no",
			knappeurl: "https://www.nav.no/arbeidsgiver/samtalestotte-arbeidsgiver",
		}, {
			knappetekst: "Les mer om IA-avtalen på sidene til regjeringen",
			knappeurl: "https://www.regjeringen.no/no/tema/arbeidsliv/arbeidsmiljo-og-sikkerhet/inkluderende_arbeidsliv",
		}, {
			knappetekst: "55 55 33 36",
			knappeurl: "tel:+4755553336",
		}, {
			knappetekst: "Kontaktskjema",
			knappeurl: "https://kontaktskjema.arbeidsgiver.nav.no",
		}, {
			knappetekst: "Kontakt oss",
			knappeurl: "kontaktOssUrl",
		}
	])("Kaller sendNavigereEvent for lenkeklikk", async ({ knappetekst, knappeurl, getKnapp }) => {
		expect(sendNavigereEvent).not.toHaveBeenCalled();
		render(<Forside
			sykefraværsstatistikkUrl="sykefraværsstatistikkUrl"
			kontaktOssUrl="kontaktOssUrl"
			kjørerMockApp={false}
		/>);
		expect(sendNavigereEvent).not.toHaveBeenCalled();
		const knapp = getKnapp ? await getKnapp() : await screen.findByRole("link", { name: knappetekst });
		knapp.click();
		expect(sendNavigereEvent).toHaveBeenCalledTimes(1);
		expect(sendNavigereEvent).toHaveBeenCalledWith(knappetekst, knappeurl);
	});

	it.each([
		"Bli gode på å tilrettelegge for ansatte",
		"Kom i gang med å føre din egen sykefraværsstatistikk",
		"Bruk egen sykefraværstatistikk aktivt"
	])("Kaller sendÅpneAktivitetEvent for ekspandering av aktivitetaccordion", (accordiontittel) => {
		render(<Forside
			sykefraværsstatistikkUrl="sykefraværsstatistikkUrl"
			kontaktOssUrl="kontaktOssUrl"
			kjørerMockApp={false}
		/>);

		expect(sendÅpneAktivitetEvent).not.toHaveBeenCalled();
		const aktivitetAccordion = screen.getByText(accordiontittel);
		aktivitetAccordion.click();
		expect(sendÅpneAktivitetEvent).toHaveBeenCalledTimes(1);
		expect(sendÅpneAktivitetEvent).toHaveBeenCalledWith(accordiontittel, false);
	});

	it("Kaller sendOppgaveStatusEvent ved statusendring på oppgave", async () => {
		render(<Forside
			sykefraværsstatistikkUrl="sykefraværsstatistikkUrl"
			kontaktOssUrl="kontaktOssUrl"
			kjørerMockApp={false}
		/>);

		expect(sendOppgaveStatusEvent).not.toHaveBeenCalled();
		const aktivitetAccordion = screen.getByText("Bli gode på å tilrettelegge for ansatte");
		aktivitetAccordion.click();
		const parent = aktivitetAccordion.closest("div") as HTMLElement;

		const oppgave = within(parent).getByText("Oppgave: Kunnskap om tilrettelegging").parentElement?.parentElement as HTMLElement;

		const startknapp = within(oppgave).getAllByText("Start")[0].closest("button") as HTMLButtonElement;
		startknapp.click();
		expect(sendOppgaveStatusEvent).toHaveBeenCalledTimes(1);
		expect(sendOppgaveStatusEvent).toHaveBeenCalledWith("STARTET", "Oppgave: Kunnskap om tilrettelegging");
		await waitFor(() => {
			expect(within(oppgave).getAllByText("Fullfør")[0].closest("button")).toBeInTheDocument();
		});

		const fullførknapp = within(oppgave).getAllByText("Fullfør")[0].closest("button") as HTMLButtonElement;
		fullførknapp.click();
		expect(sendOppgaveStatusEvent).toHaveBeenCalledTimes(2);
		expect(sendOppgaveStatusEvent).toHaveBeenCalledWith("FULLFØRT", "Oppgave: Kunnskap om tilrettelegging");
		await waitFor(() => {
			expect(within(oppgave).getAllByText("Tilbakestill")[0].closest("button")).toBeInTheDocument();
		});
	});

	it("Kaller sendNavigereEvent for lenkeklikk i øvelser og verktøy", async () => {
		render(<Forside
			sykefraværsstatistikkUrl="sykefraværsstatistikkUrl"
			kontaktOssUrl="kontaktOssUrl"
			kjørerMockApp={false}
		/>);

		expect(sendNavigereEvent).not.toHaveBeenCalled();
		const aktivitetAccordion = screen.getByText("Bruk egen sykefraværstatistikk aktivt");
		aktivitetAccordion.click();
		const parent = aktivitetAccordion.closest("div") as HTMLElement;
		within(parent).getByText("NAV har oversikt over ditt og bransjens legemeldte korttidsfravær.").click();
		expect(sendNavigereEvent).toHaveBeenCalledTimes(1);
		expect(sendNavigereEvent).toHaveBeenCalledWith("NAV har oversikt over ditt og bransjens legemeldte korttidsfravær.", "https://arbeidsgiver.nav.no/sykefravarsstatistikk/");
	});
});