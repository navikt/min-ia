import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { fiaSamarbeidMock } from "../../local/fia-samarbeidMock";
import { axe } from "jest-axe";
import { RestStatus } from "../../integrasjoner/rest-status";
import Samarbeidsoversikt from ".";
import { sendNavigereEvent } from "../../utils/analytics/analytics";

jest.mock("../../utils/analytics/analytics");
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

	it("Får \"se alle\" knapp når flere enn 3 samarbeid", async () => {
		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();
		expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(3);

		const seAlleKnapp = screen.getByRole("button", { name: `Se alle (${mockdata.length})` });
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

		const seAlleKnapp = screen.getByRole("button", { name: `Se alle (${mockdata.length})` });
		expect(seAlleKnapp).toBeInTheDocument();

		seAlleKnapp.click();
		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(mockdata.length));

		for (const samarbeid of mockdata) {
			const tittel = screen.getByRole("heading", { name: samarbeid.navn });
			expect(tittel).toBeInTheDocument();

			const lenke = tittel.parentElement?.querySelector("a");
			expect(lenke).toHaveAttribute("href", `/samarbeid/${samarbeid.id}`);
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
	it("Ingen UU-feil fra axe", async () => {
		const { container } = render(
			<Samarbeidsoversikt />
		);
		expect(container).toBeInTheDocument();

		// uten åpen meny
		expect(await axe(container)).toHaveNoViolations();

		// med ekspandert meny
		const seAlleKnapp = screen.getByRole("button", { name: `Se alle (${mockdata.length})` });
		seAlleKnapp.click();
		await waitFor(() => expect(screen.getAllByRole("button", { name: "Se samarbeid" })).toHaveLength(mockdata.length));

		expect(await axe(container)).toHaveNoViolations();
	});
});