import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Sykefraværsstatistikk } from "./Sykefraværsstatistikk";
import { AktivitetProvider } from "./context/aktivitetStatus";
import { mockAggregertStatistikkMedBransjetall } from "../Forside/Sykefraværsstatistikk/mockAggregertStatistikkMedBransjetall";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: {
        bedrift: "123456789",
      },
      asPath: "",
    };
  },
}));

describe("Sykefraværsstatistikk", () => {
  it("Har ingen uu-feil fra axe", async () => {
    const { container } = render(
      <AktivitetProvider
        aktivitetStatuser={[]}
        sykefraværsstatistikk={mockAggregertStatistikkMedBransjetall}
      >
        <Sykefraværsstatistikk />
      </AktivitetProvider>
    );

    expect(await screen.findByText("Sykefravær i bransje")).toBeInTheDocument(); // Vent på kall til backend (msw)

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Skal vise sykefravær med riktige verdier", async () => {
    render(
      <AktivitetProvider
        aktivitetStatuser={[]}
        sykefraværsstatistikk={mockAggregertStatistikkMedBransjetall}
      >
        <Sykefraværsstatistikk />
      </AktivitetProvider>
    );

    expect(screen.getByText("Sykefravær i bransje")).toBeInTheDocument();
    expect(screen.getByText("5.1 %")).toBeInTheDocument();
    expect(await screen.findByText("Sykefravær hos deg")).toBeInTheDocument(); // Vent på kall til backend (msw)
    expect(screen.getByText("8.8 %")).toBeInTheDocument();
  });
});
