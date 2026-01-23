import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import InkluderendeArbeidsliv from "./InkluderendeArbeidsliv";
import { IA_REGJERINGEN_URL } from "../../utils/konstanter";

describe("InkluderendeArbeidsliv", () => {
  it("Render uten UU-feil", async () => {
    const { container } = render(<InkluderendeArbeidsliv />);
    expect(container).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
  it("Skal vise riktig tekst", () => {
    render(<InkluderendeArbeidsliv />);
    expect(screen.getByText("Inkluderende arbeidsliv")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Partene i arbeidslivet har laget en intensjonsavtale for å redusere sykefraværet og hindre frafall fra arbeidslivet.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Navs innsatsområder i avtalen:"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Få tilskudd til ekspertbistand"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Få hjelp til å redusere sykefraværet"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Les mer om IA-avtalen på sidene til regjeringen",
      }),
    ).toHaveAttribute("href", IA_REGJERINGEN_URL);
  });
});
