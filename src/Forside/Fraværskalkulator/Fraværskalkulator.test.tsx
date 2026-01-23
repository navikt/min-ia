import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import Fraværskalkulator from "./Fraværskalkulator";

describe("FiaSamarbeidsstatus", () => {
  it("Render uten UU-feil", async () => {
    const { container } = render(<Fraværskalkulator />);
    expect(container).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
  it("Skal vise riktig tekst", () => {
    render(<Fraværskalkulator />);
    expect(screen.getByText("Fraværskalkulatoren")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Beregn hvor mye sykefraværet koster og sett mål for sykefraværet",
      ),
    ).toBeInTheDocument();
  });
});
