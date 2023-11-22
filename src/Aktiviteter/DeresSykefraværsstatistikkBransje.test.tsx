import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import DeresSykefraværsstatistikkBransje from "./DeresSykefraværsstatistikkBransje";
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

describe("DeresSykefraværsstatistikkBransje", () => {
  it("Har ingen uu-feil fra axe", async () => {
    const { container } = render(
      <AktivitetProvider
        aktivitetStatuser={[]}
        sykefraværsstatistikk={mockAggregertStatistikkMedBransjetall}
      >
        <DeresSykefraværsstatistikkBransje />
      </AktivitetProvider>
    );

    expect(await screen.findByText("Sykefravær i bransje")).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Skal vise sykefravær med riktige verdier", async () => {
    render(
      <AktivitetProvider
        aktivitetStatuser={[]}
        sykefraværsstatistikk={mockAggregertStatistikkMedBransjetall}
      >
        <DeresSykefraværsstatistikkBransje />
      </AktivitetProvider>
    );

    expect(
      screen.getByText("Deres sykefraværstatistikk sammenlignet med bransjen")
    ).toBeInTheDocument();
    expect(screen.getByText("Sykefravær i bransje")).toBeInTheDocument();
    expect(screen.getByText("5.1 %")).toBeInTheDocument();
    expect(await screen.findByText("Sykefravær hos deg")).toBeInTheDocument();
    expect(screen.getByText("8.8 %")).toBeInTheDocument();
  });

  it("Skal ikke vise sykefravær uten verdier", async () => {
    render(
      <AktivitetProvider
        aktivitetStatuser={[]}
        sykefraværsstatistikk={{
          muligeDagsverkTotalt: [],
          tapteDagsverkTotalt: [],
          prosentSiste4KvartalerTotalt: [],
          prosentSiste4KvartalerGradert: [],
          prosentSiste4KvartalerKorttid: [],
          prosentSiste4KvartalerLangtid: [],
          trendTotalt: [],
        }}
      >
        <DeresSykefraværsstatistikkBransje />
      </AktivitetProvider>
    );

    expect(
      screen.queryByText("Deres sykefraværstatistikk sammenlignet med bransjen")
    ).not.toBeInTheDocument();
  });
});
