import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import TjenesterFraNav from "./TjenesterFraNav";
import {
  EKSPERTBISTAND_URL,
  FÅ_HJELP_URL,
  KURS_URL,
} from "../../utils/konstanter";

describe("TjenesterFraNav", () => {
  it("Render uten UU-feil", async () => {
    const { container } = render(<TjenesterFraNav />);
    expect(container).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
  it("Skal vise riktig tekst", () => {
    render(<TjenesterFraNav />);
    expect(
      screen.getByRole("heading", { name: "Tjenester fra Nav", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Få tilskudd til ekspertbistand",
        level: 3,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Få hjelp til å redusere sykefraværet",
        level: 3,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Bli med på kurs", level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Få hjelp fra en nøytral ekspert med kompetanse på sykefravær og arbeidsmiljø.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Nav arbeidslivssenter gir oppfølging til virksomheter som sliter med høyt sykefravær.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Nav tilbyr en rekke kurs innen sykefravær og arbeidsmiljø. Se hvilke kurs som holdes i ditt fylke.",
      ),
    ).toBeInTheDocument();
  });
  it("Lenker går til riktig sted", () => {
    render(<TjenesterFraNav />);
    const lenker = screen.getAllByRole("link");
    expect(lenker).toHaveLength(3);
    expect(lenker[0]).toHaveAttribute("href", EKSPERTBISTAND_URL);
    expect(lenker[1]).toHaveAttribute("href", FÅ_HJELP_URL);
    expect(lenker[2]).toHaveAttribute("href", KURS_URL);
  });
});
