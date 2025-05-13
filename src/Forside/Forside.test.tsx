import { render, screen } from "@testing-library/react";
import { sendVisSamarbeidsstatusEvent, sendNavigereEvent } from "../analytics/analytics";
import { Forside } from "./Forside";
import React from "react";
import { RestStatus } from "../integrasjoner/rest-status";

jest.mock("../analytics/analytics");
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

jest.mock("./FiaSamarbeidsstatus/fiaSamarbeidsstatusAPI", () => ({
	__esModule: true,
	...jest.requireActual("./FiaSamarbeidsstatus/fiaSamarbeidsstatusAPI"),
	useFiaSamarbeidsstatus: jest.fn(() => ({ status: RestStatus.Suksess, data: { samarbeid: "I_SAMARBEID" } })),
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
	it("Kaller sendVisSamarbeidsstatusEvent", () => {
		expect(sendVisSamarbeidsstatusEvent).not.toHaveBeenCalled();
		render(<Forside
			sykefraværsstatistikkUrl="sykefraværsstatistikkUrl"
			kontaktOssUrl="kontaktOssUrl"
			kjørerMockApp={false}
		/>);
		expect(sendVisSamarbeidsstatusEvent).toHaveBeenCalledTimes(1);
		expect(sendVisSamarbeidsstatusEvent).toHaveBeenCalledWith("I_SAMARBEID");
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
	])("Kaller sendNavigereEvent", async ({ knappetekst, knappeurl, getKnapp }) => {
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
});