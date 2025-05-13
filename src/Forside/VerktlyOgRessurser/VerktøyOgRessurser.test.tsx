import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import VerktøyOgRessurser from "./VerktøyOgRessurser";
import { ARBEIDSMILJØPORTALEN_URL, IDEBANKEN_URL, SAMTALESTØTTE_URL } from "../../utils/konstanter";

describe("VerktøyOgRessurser", () => {
	it("Render uten UU-feil", async () => {
		const { container } = render(<VerktøyOgRessurser />);
		expect(container).toBeInTheDocument();
		expect(await axe(container)).toHaveNoViolations();
	});
	it("Skal vise riktig tekst", () => {
		render(<VerktøyOgRessurser />);
		expect(screen.getByRole("heading", { name: "Gode verktøy og ressurser", level: 2 })).toBeInTheDocument();
		expect(screen.getByText("har gode verktøy for å bedre arbeidsmiljøet")).toBeInTheDocument();
		expect(screen.getByText("finner du ideer, erfaringer og verktøy for bedre arbeidsmiljø og lavere sykefravær", { exact: false })).toBeInTheDocument();
		expect(screen.getByText("gir gode råd for gjennomføring av samtaler med ansatte")).toBeInTheDocument();
	});
	it("Lenker går til riktig sted", () => {
		render(<VerktøyOgRessurser />);
		expect(screen.getByRole("link", { name: "Arbeidsmiljøportalen" })).toHaveAttribute("href", ARBEIDSMILJØPORTALEN_URL);
		expect(screen.getByRole("link", { name: "Idébanken" })).toHaveAttribute("href", IDEBANKEN_URL);
		expect(screen.getByRole("link", { name: "nav.no" })).toHaveAttribute("href", SAMTALESTØTTE_URL);
	});
});

