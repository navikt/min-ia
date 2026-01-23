import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import KontaktOss from "./KontaktOss";
import { KONTAKTSKJEMA_URL } from "../../utils/konstanter";

describe("KontaktOss", () => {
  it("Render uten UU-feil", async () => {
    const { container } = render(<KontaktOss kontaktOssUrl="http://test/" />);
    expect(container).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
  it("Skal vise riktig tekst", () => {
    render(<KontaktOss kontaktOssUrl="http://test/" />);
    expect(
      screen.getByRole("heading", { name: "Kontakt oss", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Arbeidsgivertelefonen", level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Forebygge fravær", level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Andre alternativer", level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Åpent hverdager kl. 9 til 15. Vi kan ringe deg tilbake hvis ventetiden er over 5 min.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Send inn kontaktskjema hvis du ønsker hjelp til å forebygge og redusere sykefravær.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Se flere alternativer og mer informasjon om hvordan du kan kontakte oss.",
      ),
    ).toBeInTheDocument();
  });
  it("Lenker går til riktig sted", () => {
    render(<KontaktOss kontaktOssUrl="http://test/" />);
    expect(screen.getByRole("link", { name: "55 55 33 36" })).toHaveAttribute(
      "href",
      "tel:+4755553336",
    );
    expect(screen.getByRole("link", { name: "Kontaktskjema" })).toHaveAttribute(
      "href",
      KONTAKTSKJEMA_URL,
    );
    expect(screen.getByRole("link", { name: "Kontakt oss" })).toHaveAttribute(
      "href",
      "http://test/",
    );
  });
});
