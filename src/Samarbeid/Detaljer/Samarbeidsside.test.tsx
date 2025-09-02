import React from "react";
import { RestStatus } from "../../integrasjoner/rest-status";
import { fiaSamarbeidMock } from "../../local/fia-samarbeidMock";
import Samarbeidsside from ".";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { penskrivIAStatus } from "../SamarbeidsStatusBadge";
import { SamarbeidStatus } from "../Samarbeidsvelger/samarbeidtyper";

const mockdata = fiaSamarbeidMock().map((samarbeid) => ({
	...samarbeid,
	id: `${samarbeid.id}`,
}));

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
			<Samarbeidsside samarbeidId={mockdata[0].id} setSamarbeidId={() => { }} />
		);
		expect(container).toBeInTheDocument();

		// Sjekk at fanen "Kartlegginger" er tilstede
		expect(screen.getByRole("tab", { name: "Kartlegginger" })).toBeInTheDocument();
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
			<Samarbeidsside samarbeidId={førsteFullførte.id} setSamarbeidId={() => { }} />
		);
		expect(container).toBeInTheDocument();

		const heading = screen.getByRole("heading", { name: førsteFullførte.navn });
		expect(heading).toBeInTheDocument();
		expect(screen.getByText(penskrivIAStatus(førsteFullførte.status as SamarbeidStatus))).toBeInTheDocument();
		expect(screen.queryByText(penskrivIAStatus(førsteAktive.status as SamarbeidStatus))).not.toBeInTheDocument();

		rerender(
			<Samarbeidsside samarbeidId={førsteAktive.id} setSamarbeidId={() => { }} />
		);
		expect(container).toBeInTheDocument();

		const heading2 = screen.getByRole("heading", { name: førsteAktive.navn });
		expect(heading2).toBeInTheDocument();
		expect(screen.getByText(penskrivIAStatus(førsteAktive.status as SamarbeidStatus))).toBeInTheDocument();
		expect(screen.queryByText(penskrivIAStatus(førsteFullførte.status as SamarbeidStatus))).not.toBeInTheDocument();
	});

	it("Ingen UU-feil", async () => {
		const { container } = render(
			<Samarbeidsside samarbeidId={mockdata[0].id} setSamarbeidId={() => { }} />
		);
		expect(await axe(container)).toHaveNoViolations();
	});
});