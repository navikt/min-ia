import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fraværskalulator } from "./komponenter/Kalkulator/Kalkulator";
import Home from "./pages";
import {
  sendIaTjenesteMetrikk,
  sendIaMetrikkInteraksjonstjeneste,
} from "./integrasjoner/ia-tjenestemetrikker-api";
import { RestStatus } from "./integrasjoner/rest-status";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));
jest.mock("./integrasjoner/ia-tjenestemetrikker-api", () => ({
  __esModule: true,
  ...jest.requireActual("./integrasjoner/ia-tjenestemetrikker-api"),
  sendIaTjenesteMetrikk: jest.fn(),
  sendIaMetrikkInteraksjonstjeneste: jest.fn(),
}));

jest.mock("./Aktiviteter/status-klient", () => ({
  __esModule: true,
  ...jest.requireActual("./Aktiviteter/status-klient"),
  oppdaterStatus: jest.fn(),
}));

jest.mock("./hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));

jest.mock("./hooks/useAltinnOrganisasjoner", () => ({
  useAltinnOrganisasjoner: () => RestStatus.LasterInn,
  useAltinnOrganisasjonerMedStatistikktilgang: () => RestStatus.LasterInn,
}));

jest.mock("./hooks/useAggregertStatistikk", () => ({
  useAggregertStatistikk: () => RestStatus.LasterInn,
}));

jest.mock("./hooks/useAggregertStatistikk", () => ({
  useAggregertStatistikk: () => RestStatus.LasterInn,
}));

jest.mock("./hooks/useRestRessursSWR", () => ({
  useRestRessursSWR: () => RestStatus.LasterInn,
}));

const user = userEvent.setup();

describe("Metrikktester av hele siden", () => {
  describe("Kalkulator", () => {
    it("Kaller sendIaTjenesteMetrikk ved endring av modus", async () => {
      render(
        <Fraværskalulator
          fraværsprosentVirksomhet="14,0"
          tapteDagsverk="7800"
          muligeDagsverk="52000"
          nedlastingPågår={false}
        />,
      );

      const dagsverkLenke = screen.getByText("Dagsverk");

      expect(sendIaTjenesteMetrikk).toHaveBeenCalledTimes(0);

      await user.click(dagsverkLenke);

      expect(sendIaTjenesteMetrikk).toHaveBeenCalledTimes(1);
    });
  });

  describe("Forside", () => {
    it("Kaller sendIaMetrikkInteraksjonstjeneste ved endring av status på aktivitet", async () => {
      renderPage();
      const aktivitetHeader = await waitFor(() => {
        const lenke = screen.getByText(
          "Bli gode på å tilrettelegge for ansatte",
        );

        expect(lenke).toBeInTheDocument();

        return lenke;
      });
      await user.click(aktivitetHeader);
      expect(sendIaMetrikkInteraksjonstjeneste).toHaveBeenCalledTimes(0);

      const startKnapp = await waitFor(() => {
        const lenke = screen.getAllByText("Start")[0];

        expect(lenke).toBeInTheDocument();

        return lenke;
      });
      await user.click(startKnapp);

      expect(sendIaMetrikkInteraksjonstjeneste).toHaveBeenCalledTimes(1);
    });

    function renderPage() {
      const kjørerMockApp = true;
      render(
        <Home
          page={{
            title: "Home",
            description: "noe",
          }}
          forsideProps={{
            samtalestøtteUrl: "samtalestøtteUrl",
            sykefraværsstatistikkUrl: "sykefraværsstatistikkUrl",
            kontaktOssUrl: "kontaktOssUrl",
            kjørerMockApp,
          }}
          minSideArbeidsgiverUrl="minSideArbeidsgiverUrl"
          kjørerMockApp={kjørerMockApp}
          grafanaAgentUrl="grafanaAgentUrl"
        />,
      );
    }
  });
});
