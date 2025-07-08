import { render } from "@testing-library/react";
import Home from "./pages";
import { sendDigitalIaTjenesteMetrikk } from "./integrasjoner/ia-tjenestemetrikker-api";
import { afterEach } from "node:test";
import Kalkulator from "./pages/kalkulator";
import Sykefravarsstatistikk from "./pages/sykefravarsstatistikk";

jest.mock("./integrasjoner/ia-tjenestemetrikker-api", () => ({
  __esModule: true,
  ...jest.requireActual("./integrasjoner/ia-tjenestemetrikker-api"),
  sendDigitalIaTjenesteMetrikk: jest.fn(),
}));

jest.mock("./hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));

jest.mock("./komponenter/Banner/Banner", () => {
  return function Dummy() {
    return <div>dummy</div>;
  };
});

describe("Tester at metrikker blir registrert etter ca fem sekunder", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });


  it("Forsiden registrerer ia-metrikker", async () => {
    renderHomePage();

    expect(sendDigitalIaTjenesteMetrikk).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5200);

    expect(sendDigitalIaTjenesteMetrikk).toHaveBeenCalled();
  });


  it("Kalkulatoren registrerer ia-metrikker", async () => {
    renderKalkulatorPage();

    expect(sendDigitalIaTjenesteMetrikk).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5200);

    expect(sendDigitalIaTjenesteMetrikk).toHaveBeenCalled();
  });


  it("Sykefraværsstatistikken registrerer ia-metrikker", async () => {
    renderSykefraværsstatistikkPage();

    expect(sendDigitalIaTjenesteMetrikk).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5200);

    expect(sendDigitalIaTjenesteMetrikk).toHaveBeenCalled();
  });
});

function renderHomePage() {
  const kjørerMockApp = true;
  render(
    <Home
      page={{
        title: "Home",
        description: "noe",
      }}
      forsideProps={{
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

function renderKalkulatorPage() {
  render(
    <Kalkulator
      page={{
        title: "Kalkulator",
        description: "noe",
      }}
      kjørerMockApp={true}
      grafanaAgentUrl="grafanaAgentUrl"
    />,
  );
}

function renderSykefraværsstatistikkPage() {
  render(
    <Sykefravarsstatistikk
      kjørerMockApp={true}
      grafanaAgentUrl="grafanaAgentUrl"
    />,
  );
}
