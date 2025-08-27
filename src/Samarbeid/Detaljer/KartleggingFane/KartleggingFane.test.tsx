import React from "react";

import KartleggingFane from ".";

import { render, screen, waitFor } from "@testing-library/react";
import { RestStatus } from "../../../integrasjoner/rest-status";
import { fiaSamarbeidDokumentMock, fiaSamarbeidMock } from "../../../local/fia-samarbeidMock";
import { axe } from "jest-axe";
import { useFiaDokument } from "../../fiaSamarbeidDokumenterAPI";

jest.mock("../../../utils/analytics/analytics");
const mockdata = fiaSamarbeidMock().map((samarbeid) => ({
	...samarbeid,
	id: `${samarbeid.id}`,
}));
Object.defineProperty(global.CSS, 'supports', {
	value: () => jest.fn()
});
jest.mock("../../fiaSamarbeidAPI", () => ({
	useFiaSamarbeid: jest.fn(() => ({
		status: RestStatus.Suksess,
		data: mockdata,
	})),
}));
jest.mock("highcharts-react-official", () => <div>Highcharts</div>);
jest.mock("highcharts", () => ({}));
jest.mock("../../Samarbeidsvelger/SamarbeidsvelgerContext", () => ({
	useDokumenterPåValgtSamarbeid: jest.fn(() => ([
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
	])),
}));

jest.mock("../../fiaSamarbeidDokumenterAPI", () => ({
	useFiaDokument: jest.fn(({ dokumentId }: { dokumentId: string }) => fiaSamarbeidDokumentMock(dokumentId))
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

	it("Ingen aksessibilitetsfeil", async () => {
		const { container } = render(
			<KartleggingFane />
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});