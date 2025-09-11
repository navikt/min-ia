import React from "react";
import { RestStatus } from "../../integrasjoner/rest-status";
import { fiaSamarbeidMock } from "../../local/fia-samarbeidMock";
import Samarbeidsside from ".";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { penskrivIAStatus } from "../SamarbeidsStatusBadge";
import { SamarbeidStatus } from "../Samarbeidsvelger/samarbeidtyper";

const mockdata = fiaSamarbeidMock();

jest.mock("../fiaSamarbeidAPI", () => ({
	useFiaSamarbeid: jest.fn(() => ({
		status: RestStatus.Suksess,
		data: mockdata,
	})),
}));

describe("Samarbeidsside", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Render uten å krasje", () => {
		const { container } = render(
			<Samarbeidsside samarbeidOffentligId={mockdata[0].offentligId} setSamarbeidOffentligId={() => { }} />
		);
		expect(container).toBeInTheDocument();

		// TODO: Sjekk at fanen "Kartlegginger" er tilstede når vi skrur på tabber igjen.
		// expect(screen.getByRole("tab", { name: "Kartlegginger" })).toBeInTheDocument();
		// Sjekk at samarbeidsvelgeren er tilstede
		expect(screen.getByText("Velg samarbeid")).toBeInTheDocument();
		// Sjekk at samarbeidsinfo er tilstede
		expect(screen.getByRole("heading", { name: mockdata[0].navn })).toBeInTheDocument();
	});

	it("Viser riktig status på samarbeid", () => {
		const førsteFullførte = mockdata.find((s) => s.status === "FULLFØRT");
		const førsteAktive = mockdata.find((s) => s.status === "AKTIV");
		expect(førsteFullførte).toBeDefined();
		expect(førsteAktive).toBeDefined();

		if (!førsteFullførte || !førsteAktive) {
			return;
		}

		const { container, rerender } = render(
			<Samarbeidsside samarbeidOffentligId={førsteFullførte.offentligId} setSamarbeidOffentligId={() => { }} />
		);
		expect(container).toBeInTheDocument();

		const heading = screen.getByRole("heading", { name: førsteFullførte.navn });
		expect(heading).toBeInTheDocument();
		expect(screen.getByText(penskrivIAStatus(førsteFullførte.status as SamarbeidStatus))).toBeInTheDocument();
		expect(screen.queryByText(penskrivIAStatus(førsteAktive.status as SamarbeidStatus))).not.toBeInTheDocument();

		rerender(
			<Samarbeidsside samarbeidOffentligId={førsteAktive.offentligId} setSamarbeidOffentligId={() => { }} />
		);
		expect(container).toBeInTheDocument();

		const heading2 = screen.getByRole("heading", { name: førsteAktive.navn });
		expect(heading2).toBeInTheDocument();
		expect(screen.getByText(penskrivIAStatus(førsteAktive.status as SamarbeidStatus))).toBeInTheDocument();
		expect(screen.queryByText(penskrivIAStatus(førsteFullførte.status as SamarbeidStatus))).not.toBeInTheDocument();
	});

	it("Håndterer feil ved lasting av samarbeid", () => {
		(jest.requireMock("../fiaSamarbeidAPI").useFiaSamarbeid as jest.Mock).mockReturnValue({
			status: RestStatus.Feil,
			data: null,
		});
		render(
			<Samarbeidsside samarbeidOffentligId={mockdata[0].offentligId} setSamarbeidOffentligId={() => { }} />
		);
		expect(screen.getByText("Noe gikk galt ved lasting av samarbeid")).toBeInTheDocument();
	});

	it("Håndterer ingen samarbeid", () => {
		(jest.requireMock("../fiaSamarbeidAPI").useFiaSamarbeid as jest.Mock).mockReturnValue({
			status: RestStatus.Suksess,
			data: [],
		});
		render(
			<Samarbeidsside samarbeidOffentligId={undefined} setSamarbeidOffentligId={() => { }} />
		);
		expect(screen.getByText("Denne virksomheten har ingen aktive samarbeid")).toBeInTheDocument();
	});

	it("Håndterer lasting av samarbeid", () => {
		(jest.requireMock("../fiaSamarbeidAPI").useFiaSamarbeid as jest.Mock).mockReturnValue({
			status: RestStatus.LasterInn,
			data: null,
		});
		const { container } = render(
			<Samarbeidsside samarbeidOffentligId={undefined} setSamarbeidOffentligId={() => { }} />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getByTestId("samarbeidsvelger-skeleton")).toBeInTheDocument();
	});

	it("Ingen UU-feil", async () => {
		const { container } = render(
			<Samarbeidsside samarbeidOffentligId={mockdata[0].offentligId} setSamarbeidOffentligId={() => { }} />
		);
		expect(await axe(container)).toHaveNoViolations();
	});
});