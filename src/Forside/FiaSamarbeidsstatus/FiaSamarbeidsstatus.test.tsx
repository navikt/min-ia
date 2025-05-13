import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import FiaSamarbeidsstatus from "./FiaSamarbeidsstatus";
import { sendVisSamarbeidsstatusEvent } from "../../analytics/analytics";

jest.mock("../../analytics/analytics", () => ({
	sendVisSamarbeidsstatusEvent: jest.fn(),
}));

describe("FiaSamarbeidsstatus", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("Renderer uten UU-feil", async () => {
		const { container } = render(<FiaSamarbeidsstatus status="test" />);
		expect(container).toBeInTheDocument();
		expect(await axe(container)).toHaveNoViolations();
	});

	it("Skal vise riktig tekst", () => {
		render(<FiaSamarbeidsstatus status="test" />);
		expect(screen.getByText("Samarbeid om Inkluderende arbeidsliv")).toBeInTheDocument();
		expect(screen.getByText("Dere er i samarbeid med Nav Arbeidslivssenter")).toBeInTheDocument();
	});

	it("Kaller sendVisSamarbeidsstatusEvent", () => {
		expect(sendVisSamarbeidsstatusEvent).not.toHaveBeenCalled();
		render(<FiaSamarbeidsstatus status="test" />);
		expect(sendVisSamarbeidsstatusEvent).toHaveBeenCalledWith("test");
	});
});