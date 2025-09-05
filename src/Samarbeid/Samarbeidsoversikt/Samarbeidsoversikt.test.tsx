import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { fiaSamarbeidMock } from "../../local/fia-samarbeidMock";
import { axe } from "jest-axe";
import { RestStatus } from "../../integrasjoner/rest-status";
import Samarbeidsoversikt from ".";
import { sendNavigereEvent } from "../../utils/analytics/analytics";
import { useFiaSamarbeid } from "../fiaSamarbeidAPI";

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

		seAlleKnapp.click();

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

		seAlleKnapp.click();
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

		lenke?.click();

		expect(sendNavigereEvent).toHaveBeenCalledWith("Se samarbeid", `/samarbeid/[SAMARBEID_ID]`);
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

	it("Ingen UU-feil fra axe", async () => {
		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();

		// uten åpen meny
		expect(await axe(container)).toHaveNoViolations();

		// med ekspandert meny
		const seAlleKnapp = screen.getByRole("button", { name: `Vis alle (${mockdata.length})` });
		seAlleKnapp.click();
		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(mockdata.length));

		expect(await axe(container)).toHaveNoViolations();
	});
});