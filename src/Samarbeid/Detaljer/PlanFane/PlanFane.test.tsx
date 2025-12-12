import React from "react";

import PlanFane from ".";

import { act, queryAllByText, render, screen, waitFor, within } from "@testing-library/react";
import { sendPlanUndertemaÅpnet } from "../../../utils/analytics/analytics";
import { axe } from "jest-axe";
import { RestStatus } from "../../../integrasjoner/rest-status";
import { fiaSamarbeidMock, fiaSamarbeidDokumentMock } from "../../../local/fia-samarbeidMock";
import { FiaDokument, useFiaDokument } from "../../fiaSamarbeidDokumenterAPI";
import { useDokumenterPåValgtSamarbeid } from "../../Samarbeidsvelger/SamarbeidsvelgerContext";

jest.mock("../../../utils/analytics/analytics");
const mockdata = fiaSamarbeidMock();

jest.mock("../../fiaSamarbeidAPI", () => ({
	useFiaSamarbeid: jest.fn(() => ({
		status: RestStatus.Suksess,
		data: mockdata,
	})),
}));
jest.mock("../../Samarbeidsvelger/SamarbeidsvelgerContext", () => ({
	useDokumenterPåValgtSamarbeid: jest.fn(() => ([
		{
			"dokumentId": "7b758002-8beb-4943-9500-f694a92e1d9a",
			"type": "SAMARBEIDSPLAN",
			"dato": new Date("2023-10-20T14:45:00Z"),
			"tittel": "Samarbeidsplan",
			"status": "AKTIV"
		}
	])),
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
}));

describe("PlanFane", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("skal rendre PlanFane", async () => {
		const { container } = render(
			<PlanFane />
		);
		expect(container).toBeInTheDocument();

		expect(screen.getByText("Partssamarbeid")).toBeInTheDocument();

		const utviklePartssamarbeidet = await screen.findAllByText("Utvikle partssamarbeidet");
		expect(utviklePartssamarbeidet).toHaveLength(2);

		expect(utviklePartssamarbeidet[0].parentElement).toBeInTheDocument();

		expect(within(utviklePartssamarbeidet[0].parentElement!).getByTestId("i-dag-pin")).toBeInTheDocument();
		expect(within(utviklePartssamarbeidet[0].parentElement!).getByTestId("timeline-period")).toBeInTheDocument();
	});

	it("Sender analytics ved åpning av undertema", async () => {
		const { container } = render(
			<PlanFane />
		);
		expect(container).toBeInTheDocument();
		const rader = await screen.findAllByRole("button", { name: /Utvikle partssamarbeidet/ });
		expect(rader).toHaveLength(1);
		act(() => rader[0].click());
		expect(sendPlanUndertemaÅpnet).toHaveBeenCalledTimes(1);
	});

	it("Viser innhold i undertema når det er åpnet", async () => {
		const innholdstekst = "Styrke og strukturere samarbeidet mellom leder, tillitsvalgt og verneombud, samt øke kunnskap og ferdigheter for å jobbe systematisk og forebyggende med sykefravær og arbeidsmiljø.";
		const { container } = render(
			<PlanFane />
		);
		expect(container).toBeInTheDocument();
		const rader = await screen.findAllByRole("button", { name: /Utvikle partssamarbeidet/ });
		expect(rader).toHaveLength(1);
		expect(queryAllByText(container, innholdstekst)[0].parentElement).toHaveClass("navds-accordion__content--closed", { exact: false });
		act(() => rader[0].click());
		waitFor(() => expect(queryAllByText(container, innholdstekst)[0].parentElement).not.toHaveClass("navds-accordion__content--closed", { exact: false }));

		// Sjekk at vi ikke har noen UU-feil
		expect(await axe(container)).toHaveNoViolations();
	});

	it("Viser lasteskeleton", async () => {
		jest.mocked(useFiaDokument).mockReturnValueOnce({
			status: RestStatus.LasterInn
		});
		const { container } = render(
			<PlanFane />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getByTestId("plan-skeleton")).toBeInTheDocument();

		// Sjekk at vi ikke har noen UU-feil
		expect(await axe(container)).toHaveNoViolations();
	});

	it("Viser feil ved feil i henting av dokument", async () => {
		jest.mocked(useFiaDokument).mockReturnValueOnce({
			status: RestStatus.Suksess,
			data: null as unknown as FiaDokument // Tvinger fram feil
		});
		const { container } = render(
			<PlanFane />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getByTestId("plan-feil")).toBeInTheDocument();

		// Sjekk at vi ikke har noen UU-feil
		expect(await axe(container)).toHaveNoViolations();
	});

	it("Viser feil ved RestStatus.Feil i henting av dokument", async () => {
		jest.mocked(useFiaDokument).mockReturnValueOnce({
			status: RestStatus.Feil,
		});
		const { container } = render(
			<PlanFane />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getByTestId("plan-feil")).toBeInTheDocument();

		// Sjekk at vi ikke har noen UU-feil
		expect(await axe(container)).toHaveNoViolations();
	});

	it("Viser ingen plan tilgjengelig når det ikke finnes noen plan", async () => {
		jest.mocked(useDokumenterPåValgtSamarbeid).mockReturnValueOnce([]);
		const { container } = render(
			<PlanFane />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getByTestId("ingen-plan-tilgjengelig")).toBeInTheDocument();

		// Sjekk at vi ikke har noen UU-feil
		expect(await axe(container)).toHaveNoViolations();
	});

	it("Har ingen UU-feil", async () => {
		const innholdstekst = "Styrke og strukturere samarbeidet mellom leder, tillitsvalgt og verneombud, samt øke kunnskap og ferdigheter for å jobbe systematisk og forebyggende med sykefravær og arbeidsmiljø.";
		const { container } = render(
			<PlanFane />
		);
		expect(container).toBeInTheDocument();
		expect(await axe(container)).toHaveNoViolations();

		// Åpne ett undertema og sjekk på nytt
		const rader = await screen.findAllByRole("button", { name: /Utvikle partssamarbeidet/ });
		expect(rader).toHaveLength(1);
		act(() => rader[0].click());
		waitFor(() => expect(queryAllByText(container, innholdstekst)[0].parentElement).not.toHaveClass("navds-accordion__content--closed", { exact: false }));
		expect(await axe(container)).toHaveNoViolations();
	});
});
