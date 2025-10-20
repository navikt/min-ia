import React from "react";
import { RestStatus } from "../../integrasjoner/rest-status";
import { fiaSamarbeidMock } from "../../local/fia-samarbeidMock";
import Samarbeidsside from ".";
import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { penskrivIAStatus } from "../SamarbeidsStatusBadge";
import { SamarbeidStatus } from "../Samarbeidsvelger/samarbeidtyper";
import { OrgnrProvider } from "../../utils/OrgnrContext";
import { FiaSamarbeidDto, useFiaSamarbeid } from "../fiaSamarbeidAPI";
import { sendDefaultTabValgt, sendFaneByttetEvent } from "../../utils/analytics/analytics";

const mockdata = fiaSamarbeidMock();

jest.mock("../fiaSamarbeidAPI");
jest.mock("../../utils/analytics/analytics");

describe("Samarbeidsside", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.mocked(useFiaSamarbeid).mockReturnValue({
			status: RestStatus.Suksess,
			data: mockdata as unknown as FiaSamarbeidDto[],
		});
	});

	it("Render uten å krasje", () => {
		const { container } = render(
			<OrgnrProvider>
				<Samarbeidsside samarbeidOffentligId={mockdata[0].offentligId} setSamarbeidOffentligId={() => { }} />
			</OrgnrProvider>
		);
		expect(container).toBeInTheDocument();

		// Sjekk at fanene er tilstede.
		expect(screen.getByRole("tab", { name: "Kartlegginger" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Samarbeidsplan" })).toBeInTheDocument();
		// Sjekk at samarbeidsvelgeren er tilstede
		expect(screen.getByText("Velg samarbeid")).toBeInTheDocument();
		// Sjekk at samarbeidsinfo er tilstede
		expect(screen.getByRole("heading", { name: mockdata[0].navn })).toBeInTheDocument();
	});

	it("Defaulter til kartlegginger når det ikke finnes plan", () => {
		const samarbeidUtenPlan = {
			...mockdata[0],
			dokumenter: mockdata[0].dokumenter?.filter(d => d.type !== "SAMARBEIDSPLAN")
		};
		jest.mocked(useFiaSamarbeid).mockReturnValue({
			status: RestStatus.Suksess,
			data: [samarbeidUtenPlan] as unknown as FiaSamarbeidDto[],
		});
		render(
			<OrgnrProvider>
				<Samarbeidsside samarbeidOffentligId={samarbeidUtenPlan.offentligId} setSamarbeidOffentligId={() => { }} />
			</OrgnrProvider>
		);

		expect(screen.getByRole("tab", { name: "Kartlegginger" })).toHaveAttribute("aria-selected", "true");
		expect(screen.getByRole("tab", { name: "Samarbeidsplan" })).toHaveAttribute("aria-selected", "false");
	});

	it("Defaulter til samarbeidsplan når det finnes plan", () => {
		render(
			<OrgnrProvider>
				<Samarbeidsside samarbeidOffentligId={mockdata[0].offentligId} setSamarbeidOffentligId={() => { }} />
			</OrgnrProvider>
		);

		expect(screen.getByRole("tab", { name: "Samarbeidsplan" })).toHaveAttribute("aria-selected", "true");
		expect(screen.getByRole("tab", { name: "Kartlegginger" })).toHaveAttribute("aria-selected", "false");
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
			<OrgnrProvider>
				<Samarbeidsside samarbeidOffentligId={førsteFullførte.offentligId} setSamarbeidOffentligId={() => { }} />
			</OrgnrProvider>
		);
		expect(container).toBeInTheDocument();

		const heading = screen.getByRole("heading", { name: førsteFullførte.navn });
		expect(heading).toBeInTheDocument();
		expect(screen.getByText(penskrivIAStatus(førsteFullførte.status as SamarbeidStatus))).toBeInTheDocument();
		expect(screen.queryByText(penskrivIAStatus(førsteAktive.status as SamarbeidStatus))).not.toBeInTheDocument();

		rerender(
			<OrgnrProvider>
				<Samarbeidsside samarbeidOffentligId={førsteAktive.offentligId} setSamarbeidOffentligId={() => { }} />
			</OrgnrProvider>
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

	it("Sender metrikk ved bytte av tab", () => {
		const sfbe = jest.mocked(sendFaneByttetEvent);
		const { rerender } = render(
			<OrgnrProvider>
				<Samarbeidsside samarbeidOffentligId={mockdata[0].offentligId} setSamarbeidOffentligId={() => { }} />
			</OrgnrProvider>
		);
		expect(sfbe).toHaveBeenCalledTimes(0);

		const kartleggingTab = screen.getByRole("tab", { name: "Kartlegginger" });
		act(() => kartleggingTab.click());

		expect(sfbe).toHaveBeenCalledTimes(1);
		expect(sfbe).toHaveBeenCalledWith("samarbeidsplan", "kartlegging");

		const samarbeidsplanTab = screen.getByRole("tab", { name: "Samarbeidsplan" });
		act(() => samarbeidsplanTab.click());

		expect(sfbe).toHaveBeenCalledTimes(2);
		expect(sfbe).toHaveBeenCalledWith("kartlegging", "samarbeidsplan");

		// Bytt til kartlegging igjen
		act(() => kartleggingTab.click());
		expect(sfbe).toHaveBeenCalledTimes(3);
		expect(sfbe).toHaveBeenCalledWith("samarbeidsplan", "kartlegging");

		// Rerender uten å endre fane
		rerender(
			<OrgnrProvider>
				<Samarbeidsside samarbeidOffentligId={mockdata[0].offentligId} setSamarbeidOffentligId={() => { }} />
			</OrgnrProvider>
		);
		expect(sfbe).toHaveBeenCalledTimes(3);
	});

	it("Sender metrikk ved default fanevalg", () => {
		const sfbe = jest.mocked(sendFaneByttetEvent);
		const sdte = jest.mocked(sendDefaultTabValgt);
		render(
			<OrgnrProvider>
				<Samarbeidsside samarbeidOffentligId={mockdata[0].offentligId} setSamarbeidOffentligId={() => { }} />
			</OrgnrProvider>
		);
		expect(sdte).toHaveBeenCalledTimes(1);
		expect(sdte).toHaveBeenCalledWith("samarbeidsplan");
		expect(sfbe).toHaveBeenCalledTimes(0);
	});

	it("Sender metrikk ved default fanevalg når det ikke finnes plan", () => {
		const sfbe = jest.mocked(sendFaneByttetEvent);
		const sdte = jest.mocked(sendDefaultTabValgt);
		const samarbeidUtenPlan = {
			...mockdata[0],
			dokumenter: mockdata[0].dokumenter?.filter(d => d.type !== "SAMARBEIDSPLAN")
		};
		jest.mocked(useFiaSamarbeid).mockReturnValue({
			status: RestStatus.Suksess,
			data: [samarbeidUtenPlan] as unknown as FiaSamarbeidDto[],
		});

		render(
			<OrgnrProvider>
				<Samarbeidsside samarbeidOffentligId={samarbeidUtenPlan.offentligId} setSamarbeidOffentligId={() => { }} />
			</OrgnrProvider>
		);
		expect(sdte).toHaveBeenCalledTimes(1);
		expect(sdte).toHaveBeenCalledWith("kartlegging");
		expect(sfbe).toHaveBeenCalledTimes(0);
	});

	it("Ingen UU-feil", async () => {
		const { container } = render(
			<OrgnrProvider>
				<Samarbeidsside samarbeidOffentligId={mockdata[0].offentligId} setSamarbeidOffentligId={() => { }} />
			</OrgnrProvider>
		);
		expect(await axe(container)).toHaveNoViolations();
	});
});