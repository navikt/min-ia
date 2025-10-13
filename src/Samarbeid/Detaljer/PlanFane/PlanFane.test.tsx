import React from "react";

import PlanFane from ".";

import { queryAllByText, render, screen, waitFor } from "@testing-library/react";
import { sendPlanUndertemaÅpnet } from "../../../utils/analytics/analytics";
import { axe } from "jest-axe";
import { RestStatus } from "../../../integrasjoner/rest-status";
import { fiaSamarbeidMock, fiaSamarbeidDokumentMock } from "../../../local/fia-samarbeidMock";

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

	it("skal rendre PlanFane", () => {
		const { container } = render(
			<PlanFane />
		);
		expect(container).toBeInTheDocument();
		// TODO: Utvid tester når vi har mer enn dummydata.
		expect(screen.getByText("Partssamarbeid")).toBeInTheDocument();
	});

	it("Sender analytics ved åpning av undertema", async () => {
		const { container } = render(
			<PlanFane />
		);
		expect(container).toBeInTheDocument();
		const rader = await screen.findAllByRole("button", { name: /Utvikle partssamarbeidet/ });
		expect(rader).toHaveLength(1);
		rader[0].click();
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
		rader[0].click();
		waitFor(() => expect(queryAllByText(container, innholdstekst)[0].parentElement).not.toHaveClass("navds-accordion__content--closed", { exact: false }));
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
		rader[0].click();
		waitFor(() => expect(queryAllByText(container, innholdstekst)[0].parentElement).not.toHaveClass("navds-accordion__content--closed", { exact: false }));
		expect(await axe(container)).toHaveNoViolations();
	});
});
