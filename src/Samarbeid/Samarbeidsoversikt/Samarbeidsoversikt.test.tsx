import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { fiaSamarbeidMock } from "../../local/fia-samarbeidMock";
import { axe } from "jest-axe";
import { RestStatus } from "../../integrasjoner/rest-status";
import Samarbeidsoversikt, { DEFAULT_MAKS_VISIBLE_SAMARBEID } from ".";
import { sendNavigereEvent, sendKnappEvent } from "../../utils/analytics/analytics";
import { useFiaSamarbeid } from "../fiaSamarbeidAPI";

jest.mock("../../utils/analytics/analytics");
const mockdata = fiaSamarbeidMock(true);

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
		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();
	});

	it("Får \"Vis alle\" knapp når flere enn 3 samarbeid", async () => {
		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(3);

		const seAlleKnapp = screen.getByRole("button", { name: `Vis alle (${mockdata.length})` });
		expect(seAlleKnapp).toBeInTheDocument();

		act(() => seAlleKnapp.click());

		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(mockdata.length));
	});

	it("Riktig lenke", async () => {
		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(3);

		const seAlleKnapp = screen.getByRole("button", { name: `Vis alle (${mockdata.length})` });
		expect(seAlleKnapp).toBeInTheDocument();

		act(() => seAlleKnapp.click());
		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(mockdata.length));

		for (const samarbeid of mockdata) {
			const tittel = screen.getByRole("heading", { name: samarbeid.navn });
			expect(tittel).toBeInTheDocument();

			const lenke = tittel.parentElement?.querySelector("a");
			expect(lenke).toHaveAttribute("href", `/samarbeid/${samarbeid.offentligId}`);
		}
	});

	it("Sender metrikk på klikk", async () => {
		expect(sendNavigereEvent).not.toHaveBeenCalled();

		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(3);


		const lenke = screen.getAllByRole("button", { name: "Se samarbeid" })[0];

		expect(lenke).toBeInTheDocument();

		act(() => lenke?.click());

		expect(sendNavigereEvent).toHaveBeenCalledWith("Se samarbeid", `/samarbeid/[SAMARBEID_ID]`);
	});

	it("Sender metrikk på ekspandering og kollapse", async () => {
		expect(sendKnappEvent).not.toHaveBeenCalled();

		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(3);

		const seAlleKnapp = screen.getByRole("button", { name: `Vis alle (${mockdata.length})` });
		expect(seAlleKnapp).toBeInTheDocument();

		act(() => seAlleKnapp.click());

		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(mockdata.length));
		expect(sendKnappEvent).toHaveBeenCalledWith("Vis alle ([antall])");

		const visFærreKnapp = screen.getByRole("button", { name: "Vis færre" });
		expect(visFærreKnapp).toBeInTheDocument();

		act(() => visFærreKnapp.click());

		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(3));
		expect(sendKnappEvent).toHaveBeenCalledWith("Vis færre");
	});



	it("Viser bare aktive samarbeid over fold", async () => {
		(useFiaSamarbeid as jest.Mock).mockImplementationOnce(() => ({
			status: RestStatus.Suksess,
			data: mockdata.map((v, i) => ({ ...v, status: i < 2 ? "AKTIV" : "FULLFØRT" }))
		}));

		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(2);
		expect(screen.getAllByText("Aktiv")).toHaveLength(2);
	});

	it("Viser ikke mer enn 3 aktive samarbeid over fold", async () => {
		(useFiaSamarbeid as jest.Mock).mockImplementationOnce(() => ({
			status: RestStatus.Suksess,
			data: mockdata.map((v) => ({ ...v, status: "AKTIV" }))
		}));
		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(3);
		expect(screen.getAllByText("Aktiv")).toHaveLength(3);
	});

	it("Autofokuserer på første etter expand", async () => {
		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(3);

		const seAlleKnapp = screen.getByRole("button", { name: `Vis alle (${mockdata.length})` });
		expect(seAlleKnapp).toBeInTheDocument();

		act(() => seAlleKnapp.click());

		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(mockdata.length));

		const filtrerteSamarbeid = mockdata.filter(({ status }) => status === "AKTIV").slice(0, DEFAULT_MAKS_VISIBLE_SAMARBEID);

		const seSamarbeidKnapper = screen.getAllByRole("button", { name: "Se samarbeid" });
		const samarbeidSomIkkeVarSynlig = seSamarbeidKnapper.filter((knapp) => filtrerteSamarbeid.every(s => `/samarbeid/${s.offentligId}` !== knapp.getAttribute("href")));
		expect(samarbeidSomIkkeVarSynlig).toHaveLength(mockdata.length - filtrerteSamarbeid.length);

		expect(document.activeElement).toBe(samarbeidSomIkkeVarSynlig[0]);
	});

	it("Viser samlet rad for inaktive samarbeid når ingen aktive", async () => {
		(useFiaSamarbeid as jest.Mock).mockImplementationOnce(() => ({
			status: RestStatus.Suksess,
			data: mockdata.map((v) => ({ ...v, status: "FULLFØRT" }))
		}));

		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(1);
		// Skjuler status for inaktive samarbeid når ingen aktive
		expect(screen.queryByText("Fullført")).not.toBeInTheDocument();
		expect(screen.getByText(`Avsluttede samarbeid (${mockdata.length})`)).toBeInTheDocument();
	});

	it("Sorterer aktive samarbeid først", async () => {
		(useFiaSamarbeid as jest.Mock).mockImplementationOnce(() => ({
			status: RestStatus.Suksess,
			data: [
				{ ...mockdata[2], status: "AKTIV", sistEndret: "2024-01-01T12:00:00Z", dokumenter: [] },
				{ ...mockdata[0], status: "FULLFØRT", sistEndret: "2024-02-02T12:00:00Z", dokumenter: [] },
				{ ...mockdata[1], status: "AKTIV", sistEndret: "2024-03-03T12:00:00Z", dokumenter: [] },
			]
		}));

		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();

		const seAlleKnapp = screen.getByRole("button", { name: `Vis alle (3)` });
		expect(seAlleKnapp).toBeInTheDocument();

		act(() => seAlleKnapp.click());
		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(3));
		const seSamarbeidKnapper = screen.getAllByRole("button", { name: "Se samarbeid" });


		expect(seSamarbeidKnapper[0].getAttribute("href")).toBe(`/samarbeid/${mockdata[1].offentligId}`);
		expect(seSamarbeidKnapper[1].getAttribute("href")).toBe(`/samarbeid/${mockdata[2].offentligId}`);
		expect(seSamarbeidKnapper[2].getAttribute("href")).toBe(`/samarbeid/${mockdata[0].offentligId}`);
	});

	it("Sorterer på dato innenfor samme status", async () => {
		(useFiaSamarbeid as jest.Mock).mockImplementationOnce(() => ({
			status: RestStatus.Suksess,
			data: [
				{ ...mockdata[0], status: "AKTIV", sistEndret: "2024-01-01T12:00:00Z", dokumenter: [] },
				{ ...mockdata[1], status: "AKTIV", sistEndret: "2024-03-03T12:00:00Z", dokumenter: [] },
				{ ...mockdata[2], status: "AKTIV", sistEndret: "2024-02-02T12:00:00Z", dokumenter: [] },
			]
		}));

		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();

		const seSamarbeidKnapper = screen.getAllByRole("button", { name: "Se samarbeid" });
		expect(seSamarbeidKnapper).toHaveLength(3);

		expect(seSamarbeidKnapper[0].getAttribute("href")).toBe(`/samarbeid/${mockdata[1].offentligId}`);
		expect(seSamarbeidKnapper[1].getAttribute("href")).toBe(`/samarbeid/${mockdata[2].offentligId}`);
		expect(seSamarbeidKnapper[2].getAttribute("href")).toBe(`/samarbeid/${mockdata[0].offentligId}`);
	});

	it("Sorterer basert på dokumentdato når nyere enn sistEndret", async () => {
		(useFiaSamarbeid as jest.Mock).mockImplementationOnce(() => ({
			status: RestStatus.Suksess,
			data: [
				{ ...mockdata[0], status: "AKTIV", sistEndret: "2024-01-01T12:00:00Z", dokumenter: [{ dato: "2024-05-05T12:00:00Z" }] },
				{ ...mockdata[1], status: "AKTIV", sistEndret: "2024-02-02T12:00:00Z", dokumenter: [] },
				{ ...mockdata[2], status: "AKTIV", sistEndret: "2024-03-03T12:00:00Z", dokumenter: [{ dato: "2024-01-01T12:00:00Z" }] },
				{ ...mockdata[3], status: "AKTIV", sistEndret: "2024-04-04T12:00:00Z", dokumenter: [] },
			]
		}));

		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();

		const seAlleKnapp = screen.getByRole("button", { name: `Vis alle (4)` });
		expect(seAlleKnapp).toBeInTheDocument();

		act(() => seAlleKnapp.click());
		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(4));

		const seSamarbeidKnapper = screen.getAllByRole("button", { name: "Se samarbeid" });
		expect(seSamarbeidKnapper).toHaveLength(4);

		expect(seSamarbeidKnapper[0].getAttribute("href")).toBe(`/samarbeid/${mockdata[0].offentligId}`); // dokumentdato 2024-05-05
		expect(seSamarbeidKnapper[1].getAttribute("href")).toBe(`/samarbeid/${mockdata[3].offentligId}`); // sistEndret 2024-04-04
		expect(seSamarbeidKnapper[2].getAttribute("href")).toBe(`/samarbeid/${mockdata[2].offentligId}`); // sistEndret 2024-03-03
		expect(seSamarbeidKnapper[3].getAttribute("href")).toBe(`/samarbeid/${mockdata[1].offentligId}`); // sistEndret 2024-02-02
	});

	it("Ingen UU-feil fra axe", async () => {
		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();

		// uten åpen meny
		expect(await axe(container)).toHaveNoViolations();

		// med ekspandert meny
		const seAlleKnapp = screen.getByRole("button", { name: `Vis alle (${mockdata.length})` });
		act(() => seAlleKnapp.click());
		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(mockdata.length));

		expect(await axe(container)).toHaveNoViolations();
	});
});