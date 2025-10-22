import React from "react";

import KartleggingFane from ".";

import { render, screen, waitFor } from "@testing-library/react";
import { RestStatus } from "../../../integrasjoner/rest-status";
import { fiaSamarbeidDokumentMock, fiaSamarbeidMock } from "../../../local/fia-samarbeidMock";
import { axe } from "jest-axe";
import { useFiaDokument } from "../../fiaSamarbeidDokumenterAPI";
import { SvaralternativResultat, TemaMedSpørsmålOgSvar } from "../../../komponenter/Spørreundersøkelsesresultat/SpørreundersøkelseRad";
import { useDokumenterPåValgtSamarbeid } from "../../Samarbeidsvelger/SamarbeidsvelgerContext";
import { sendPanelEkspanderEvent } from "../../../utils/analytics/analytics";

jest.mock("../../../utils/analytics/analytics");
const mockdata = fiaSamarbeidMock();

const dummyDokumenterPåValgtSamarbeid = [
	{
		"dokumentId": "ba7d8dc5-b363-421b-9773-7e3c2185fa86",
		"type": "BEHOVSVURDERING",
		"dato": new Date("2023-12-01T12:00:00Z"),
		"tittel": "Behovsvurdering for samarbeid 1",
		"status": "FERDIGSTILT"
	},
	{
		"dokumentId": "c1a2b3d4-e5f6-7890-abcd-ef0123456789",
		"type": "BEHOVSVURDERING",
		"dato": new Date("2023-11-15T09:30:00Z"),
		"tittel": "Behovsvurdering for samarbeid 2",
		"status": "PÅBEGYNT"
	}
];

jest.mock("../../fiaSamarbeidAPI", () => ({
	useFiaSamarbeid: jest.fn(() => ({
		status: RestStatus.Suksess,
		data: mockdata,
	})),
}));
jest.mock("../../Samarbeidsvelger/SamarbeidsvelgerContext", () => ({
	useDokumenterPåValgtSamarbeid: jest.fn(() => dummyDokumenterPåValgtSamarbeid),
}));

jest.mock("../../fiaSamarbeidDokumenterAPI", () => ({
	useFiaDokument: jest.fn(({ dokumentId }: { dokumentId: string }) => {
		const mocked = fiaSamarbeidDokumentMock(dokumentId);
		return {
			data: {
				...mocked,
				innhold: JSON.parse(mocked.innhold) // Deep copy to avoid test pollution
			},
			status: RestStatus.Suksess
		};
	})
}))

describe("KartleggingFane", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Render uten å krasje", () => {
		const { container } = render(
			<KartleggingFane />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getAllByText("Behovsvurdering")).toHaveLength(2);
	});

	it("Viser loader når dokument er under henting", async () => {
		(useFiaDokument as jest.Mock).mockImplementationOnce(() => ({
			status: RestStatus.LasterInn,
			data: null
		}));
		render(
			<KartleggingFane />
		);

		expect(screen.queryByText("Venter…")).not.toBeInTheDocument();

		const rader = await screen.findAllByRole("button", { name: /Vis mer/ });
		expect(rader).toHaveLength(2);
		rader[0].click();
		await waitFor(() => expect(screen.queryByText("Venter…")).toBeInTheDocument());
	});

	it("Rendrer alle spørsmål", async () => {
		render(
			<KartleggingFane />
		);
		expect(useFiaDokument).toHaveBeenCalledTimes(0);
		const rader = await screen.findAllByRole("button", { name: /Vis mer/ });
		expect(rader).toHaveLength(2);
		rader[0].click();
		await waitFor(() => expect(useFiaDokument).toHaveBeenCalledTimes(1));
		for (const spørsmål of JSON.parse(fiaSamarbeidDokumentMock("ba7d8dc5-b363-421b-9773-7e3c2185fa86").innhold).spørsmålMedSvarPerTema.flatMap((t: TemaMedSpørsmålOgSvar) => t.spørsmålMedSvar)) {
			expect(await screen.findAllByText(spørsmål.tekst)).toHaveLength(2);
		}
	});

	it("Rendrer tomme grafer når ingen har svart", async () => {
		(useDokumenterPåValgtSamarbeid as jest.Mock).mockImplementationOnce(() => ([
			{
				"dokumentId": "ba7d8dc5-b363-421b-9773-7e3c2185fa87",
				"type": "BEHOVSVURDERING",
				"dato": new Date("2023-12-01T12:00:00Z"),
				"tittel": "Behovsvurdering for samarbeid 1",
				"status": "FERDIGSTILT"
			}
		]));
		render(
			<KartleggingFane />
		);
		expect(useFiaDokument).toHaveBeenCalledTimes(0);
		const rader = await screen.findAllByRole("button", { name: /Vis mer/ });
		expect(rader).toHaveLength(1);
		rader[0].click();
		await waitFor(() => expect(useFiaDokument).toHaveBeenCalledTimes(1));

		// Viser "feil" om tomme seksjoner.
		expect(await screen.findAllByText("For få deltakere til å vise resultater")).toHaveLength(2);

		// Sjekk at tittel på uferdige spørsmål også vises
		for (const spørsmål of JSON.parse(fiaSamarbeidDokumentMock("ba7d8dc5-b363-421b-9773-7e3c2185fa87").innhold).spørsmålMedSvarPerTema.flatMap((t: TemaMedSpørsmålOgSvar) => t.spørsmålMedSvar).filter((s: { svarListe: SvaralternativResultat[] }) => s.svarListe.every((svar: { antallSvar: number }) => svar.antallSvar === 0))) {
			expect(await screen.findAllByRole("heading", { name: spørsmål.tekst })).toHaveLength(1);
		}
	});


	it("kaller useFiaDokuement med riktig dokumentId", async () => {
		render(
			<KartleggingFane />
		);
		expect(useFiaDokument).toHaveBeenCalledTimes(0);
		const rader = await screen.findAllByRole("button", { name: /Vis mer/ });
		expect(rader).toHaveLength(2);

		rader[0].click();
		await waitFor(() => expect(useFiaDokument).toHaveBeenCalledTimes(1));
		expect(useFiaDokument).toHaveBeenNthCalledWith(1, { dokumentId: "ba7d8dc5-b363-421b-9773-7e3c2185fa86" });
		rader[1].click();
		await waitFor(() => expect(useFiaDokument).toHaveBeenCalledTimes(2));
		expect(useFiaDokument).toHaveBeenNthCalledWith(2, { dokumentId: "c1a2b3d4-e5f6-7890-abcd-ef0123456789" });
	});

	it("Viser For få deltakere til å vise resultater når ingen har svart på grafer i halvferdige tema", async () => {
		(useDokumenterPåValgtSamarbeid as jest.Mock).mockImplementationOnce(() => ([
			{
				"dokumentId": "ce282c64-7aa8-4577-b161-088c405aa3b5",
				"type": "BEHOVSVURDERING",
				"dato": new Date("2023-12-01T12:00:00Z"),
				"tittel": "Behovsvurdering for samarbeid 1",
				"status": "FERDIGSTILT"
			}
		]));
		const dokumentinnhold = JSON.parse(fiaSamarbeidDokumentMock("ce282c64-7aa8-4577-b161-088c405aa3b5").innhold);
		render(
			<KartleggingFane />
		);
		expect(useFiaDokument).toHaveBeenCalledTimes(0);
		const rader = await screen.findAllByRole("button", { name: /Vis mer/ });
		expect(rader).toHaveLength(1);
		rader[0].click();
		await waitFor(() => expect(useFiaDokument).toHaveBeenCalledTimes(1));

		// Viser "feil" i på tomme grafer.
		expect(await screen.findAllByText("For få deltakere til å vise resultater.")).toHaveLength(
			dokumentinnhold.spørsmålMedSvarPerTema
				.flatMap((t: TemaMedSpørsmålOgSvar) => t.spørsmålMedSvar)
				.filter((s: { svarListe: SvaralternativResultat[] }) => s.svarListe.every((svar: { antallSvar: number }) => svar.antallSvar === 0))
				.length
		);

		// Sjekk at tittel på uferdige spørsmål også vises
		for (const spørsmål of dokumentinnhold.spørsmålMedSvarPerTema.flatMap((t: TemaMedSpørsmålOgSvar) => t.spørsmålMedSvar).filter((s: { svarListe: SvaralternativResultat[] }) => s.svarListe.every((svar: { antallSvar: number }) => svar.antallSvar === 0))) {
			expect(await screen.findAllByRole("heading", { name: spørsmål.tekst })).toHaveLength(1);
		}
	});

	it("Sender analyttics ved åpning av rad", async () => {
		render(
			<KartleggingFane />
		);

		expect(sendPanelEkspanderEvent).toHaveBeenCalledTimes(0);

		const rader = await screen.findAllByRole("button", { name: /Vis mer/ });
		expect(rader).toHaveLength(2);
		rader[0].click();

		await waitFor(() => expect(sendPanelEkspanderEvent).toHaveBeenCalledTimes(1));

		expect(sendPanelEkspanderEvent).toHaveBeenNthCalledWith(1, "Behovsvurdering");

		rader[1].click();

		await waitFor(() => expect(sendPanelEkspanderEvent).toHaveBeenCalledTimes(2));
		expect(sendPanelEkspanderEvent).toHaveBeenNthCalledWith(2, "Behovsvurdering");
	});

	it("Viser feil når henting av dokument feiler", async () => {
		(useFiaDokument as jest.Mock).mockImplementationOnce(() => ({
			status: RestStatus.Feil,
			data: null
		}));
		render(
			<KartleggingFane />
		);
		expect(useFiaDokument).toHaveBeenCalledTimes(0);
		const rader = await screen.findAllByRole("button", { name: /Vis mer/ });
		expect(rader).toHaveLength(2);
		rader[0].click();
		await waitFor(() => expect(useFiaDokument).toHaveBeenCalledTimes(1));
		expect(await screen.findByText("Noe gikk galt ved lasting. Vennligst prøv igjen senere.")).toBeInTheDocument();
	});

	it("Viser melding når ingen kartlegginger er tilgjengelig", () => {
		(useDokumenterPåValgtSamarbeid as jest.Mock).mockImplementationOnce(() => ([
			{
				"dokumentId": "some-id",
				"type": "SAMARBEIDSPLAN",
				"dato": new Date("2023-12-01T12:00:00Z"),
				"tittel": "Samarbeidsplan for samarbeid 1",
				"status": "FERDIGSTILT"
			}
		]));
		render(
			<KartleggingFane />
		);
		expect(screen.getByText("Ingen kartlegginger er publisert enda")).toBeInTheDocument();
	});

	it("Rendrer evalueringer når slike finnes", () => {
		(useDokumenterPåValgtSamarbeid as jest.Mock).mockImplementationOnce(() => ([
			{
				"dokumentId": "ba7d8dc5-b363-421b-9773-7e3c2185fa88",
				"type": "EVALUERING",
				"dato": new Date("2023-12-01T12:00:00Z"),
				"tittel": "Evaluering for samarbeid 1",
				"status": "FERDIGSTILT"
			},
			{
				"dokumentId": "behov-1",
				"type": "BEHOVSVURDERING",
				"dato": new Date("2023-11-15T09:30:00Z"),
				"tittel": "Behovsvurdering for samarbeid 1",
				"status": "FERDIGSTILT"
			}
		]));
		render(
			<KartleggingFane />
		);
		expect(screen.getByText("Evaluering")).toBeInTheDocument();
		expect(screen.getByText("Behovsvurdering")).toBeInTheDocument();
	});

	it("Viser innhold for evalueringer når slike finnes", async () => {
		(useDokumenterPåValgtSamarbeid as jest.Mock).mockImplementationOnce(() => ([
			{
				"dokumentId": "ba7d8dc5-b363-421b-9773-7e3c2185fa88",
				"type": "EVALUERING",
				"dato": new Date("2023-12-01T12:00:00Z"),
				"tittel": "Evaluering for samarbeid 1",
				"status": "FERDIGSTILT"
			}
		]));
		render(
			<KartleggingFane />
		);

		expect(useFiaDokument).toHaveBeenCalledTimes(0);
		const rader = await screen.findAllByRole("button", { name: /Vis mer/ });
		expect(rader).toHaveLength(1);
		rader[0].click();
		await waitFor(() => expect(useFiaDokument).toHaveBeenCalledTimes(1));

		const forventetSpørsmålssett = JSON.parse(fiaSamarbeidDokumentMock("ba7d8dc5-b363-421b-9773-7e3c2185fa88").innhold).spørsmålMedSvarPerTema.flatMap((t: TemaMedSpørsmålOgSvar) => t.spørsmålMedSvar);
		expect(forventetSpørsmålssett).not.toHaveLength(0);

		for (const spørsmål of forventetSpørsmålssett) {
			expect(await screen.findAllByText(spørsmål.tekst)).toHaveLength(2);
		}
	});

	it("Sorterer nyeste kartlegginger først", () => {
		(useDokumenterPåValgtSamarbeid as jest.Mock).mockImplementationOnce(() => ([
			{
				"dokumentId": "gammel-kartlegging",
				"type": "BEHOVSVURDERING",
				"dato": "2023-01-01T12:00:00.123456",
				"tittel": "Gammel kartlegging",
				"status": "FERDIGSTILT"
			},
			{
				"dokumentId": "ny-kartlegging",
				"type": "BEHOVSVURDERING",
				"dato": "2023-12-01T12:00:00.123456",
				"tittel": "Ny kartlegging",
				"status": "FERDIGSTILT"
			},
			{
				"dokumentId": "ny-kartlegging",
				"type": "BEHOVSVURDERING",
				"dato": "2023-06-01T12:00:00.123456",
				"tittel": "Ny kartlegging",
				"status": "FERDIGSTILT"
			}
		]));
		render(
			<KartleggingFane />
		);

		expect(screen.getByText("01.12.2023").compareDocumentPosition(screen.getByText("01.06.2023"))).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
		expect(screen.getByText("01.06.2023").compareDocumentPosition(screen.getByText("01.01.2023"))).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
	});

	it("Ingen aksessibilitetsfeil", async () => {
		const { container } = render(
			<KartleggingFane />
		);
		expect(await axe(container)).toHaveNoViolations();
		const rader = await screen.findAllByRole("button", { name: /Vis mer/ });
		expect(rader).toHaveLength(2);

		rader[0].click();
		await waitFor(() => expect(useFiaDokument).toHaveBeenCalledTimes(1));
		expect(useFiaDokument).toHaveBeenNthCalledWith(1, { dokumentId: "ba7d8dc5-b363-421b-9773-7e3c2185fa86" });
		rader[1].click();
		await waitFor(() => expect(useFiaDokument).toHaveBeenCalledTimes(2));
		expect(await axe(container)).toHaveNoViolations();
	});
});