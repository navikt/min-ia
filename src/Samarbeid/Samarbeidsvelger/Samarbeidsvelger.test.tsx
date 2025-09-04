import React from "react";
import Samarbeidsvelger from ".";
import { SamarbeidsvelgerProvider } from "./SamarbeidsvelgerContext";
import { render, screen, waitFor } from "@testing-library/react";
import { OrgnrProvider } from "../../utils/OrgnrContext";
import { fiaSamarbeidMock } from "../../local/fia-samarbeidMock";
import { axe } from "jest-axe";
import { RestStatus } from "../../integrasjoner/rest-status";
import { penskrivIAStatus } from "../SamarbeidsStatusBadge";
import { SamarbeidStatus } from "./samarbeidtyper";
import { sendSamarbeidValgtEvent } from "../../utils/analytics/analytics";

jest.mock("../../utils/analytics/analytics");

const mockdata = fiaSamarbeidMock().map((samarbeid) => ({
	...samarbeid,
    offentligId: `${samarbeid.offentligId}`,
}));

jest.mock("../fiaSamarbeidAPI", () => ({
	useFiaSamarbeid: jest.fn(() => ({
		status: RestStatus.Suksess,
		data: mockdata,
	})),
}));

describe("Samarbeidsvelger", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Render uten å krasje", () => {
        let valgtSamarbeid = `${mockdata[0].offentligId}`;

		const { container } = render(
			<OrgnrProvider>
                <SamarbeidsvelgerProvider samarbeidOffentligId={valgtSamarbeid}
                                          setSamarbeidOffentligId={(offentligId: string) => {
                                              valgtSamarbeid = offentligId;
				}}>
					<Samarbeidsvelger />
				</SamarbeidsvelgerProvider>
			</OrgnrProvider>
		);
		expect(container).toBeInTheDocument();
	});

	it("Endrer verdi ved klikk", async () => {
        let valgtSamarbeid = mockdata[0].offentligId;

		const { container } = render(
			<OrgnrProvider>
                <SamarbeidsvelgerProvider samarbeidOffentligId={valgtSamarbeid}
                                          setSamarbeidOffentligId={(offentligId: string) => {
                                              valgtSamarbeid = offentligId;
				}}>
					<Samarbeidsvelger />
				</SamarbeidsvelgerProvider>
			</OrgnrProvider>
		);
		expect(container).toBeInTheDocument();

		const knapper = container.querySelectorAll("button");
		expect(knapper.length).toBeGreaterThan(0);
		expect(knapper[0]).toBeInTheDocument();
		expect(knapper[0].textContent).toBe(mockdata[0].navn);

		knapper[0].click();
		const samarbeid2 = await waitFor(() => screen.getByText(mockdata[2].navn));

		expect(samarbeid2).toBeInTheDocument();

		samarbeid2.click();

        expect(valgtSamarbeid).toBe(mockdata[2].offentligId);
		expect(screen.getByText(mockdata[2].navn)).toBeInTheDocument();
	});

	it("Viser riktig status for samarbeid", async () => {
		let valgtSamarbeid = ``;
		const { container } = render(
			<OrgnrProvider>
                <SamarbeidsvelgerProvider samarbeidOffentligId={valgtSamarbeid}
                                          setSamarbeidOffentligId={(offentligId: string) => {
                                              valgtSamarbeid = offentligId;
				}}>
					<Samarbeidsvelger />
				</SamarbeidsvelgerProvider>
			</OrgnrProvider>
		);

		expect(container).toBeInTheDocument();

		const knapper = container.querySelectorAll("button");
		expect(knapper.length).toBeGreaterThan(0);
		knapper[0].click();

		const samarbeid1 = await waitFor(() => screen.getByRole("menuitem", { name: `${mockdata[0].navn} ${penskrivIAStatus(mockdata[0].status as SamarbeidStatus)}` }));
		expect(samarbeid1).toBeInTheDocument();

		for (const samarbeid of mockdata) {
			const status = penskrivIAStatus(samarbeid.status as SamarbeidStatus);
			expect(screen.getByRole("menuitem", { name: `${samarbeid.navn} ${status}` })).toBeInTheDocument();
		}
	});

	it("Sender metrikk ved valg av samarbeid", async () => {
		expect(sendSamarbeidValgtEvent).not.toHaveBeenCalled();
        let valgtSamarbeid = `${mockdata[0].offentligId}`;
		const { container } = render(
			<OrgnrProvider>
                <SamarbeidsvelgerProvider samarbeidOffentligId={valgtSamarbeid}
                                          setSamarbeidOffentligId={(offentligId: string) => {
                                              valgtSamarbeid = offentligId;
				}}>
					<Samarbeidsvelger />
				</SamarbeidsvelgerProvider>
			</OrgnrProvider>
		);
		expect(container).toBeInTheDocument();

		const knapper = container.querySelectorAll("button");
		expect(knapper.length).toBeGreaterThan(0);
		expect(knapper[0]).toBeInTheDocument();
		expect(knapper[0].textContent).toBe(mockdata[0].navn);

		knapper[0].click();
		const samarbeid2 = await waitFor(() => screen.getByText(mockdata[2].navn));
		expect(samarbeid2).toBeInTheDocument();

		samarbeid2.click();

		expect(sendSamarbeidValgtEvent).toHaveBeenCalledTimes(1);
		expect(sendSamarbeidValgtEvent).toHaveBeenCalledWith(mockdata[2].status);
	});

	it("Ingen UU-feil fra axe", async () => {
        let valgtSamarbeid = `${mockdata[0].offentligId}`;

		const { container } = render(
			<OrgnrProvider>
                <SamarbeidsvelgerProvider samarbeidOffentligId={valgtSamarbeid}
                                          setSamarbeidOffentligId={(offentligId: string) => {
                                              valgtSamarbeid = offentligId;
				}}>
					<Samarbeidsvelger />
				</SamarbeidsvelgerProvider>
			</OrgnrProvider>
		);
		expect(container).toBeInTheDocument();

		//uten åpen meny
		expect(await axe(container)).toHaveNoViolations();

		const knapper = container.querySelectorAll("button");
		expect(knapper.length).toBeGreaterThan(0);
		knapper[0].click();

		const samarbeid1 = await waitFor(() => screen.getByRole("menuitem", { name: `${mockdata[0].navn} ${penskrivIAStatus(mockdata[0].status as SamarbeidStatus)}` }));
		expect(samarbeid1).toBeInTheDocument();

		//med åpen meny
		expect(await axe(container)).toHaveNoViolations();
	});
});