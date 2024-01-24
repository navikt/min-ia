import { render } from "@testing-library/react";
import Home from "./pages";
import { sendDigitalIaTjenesteMetrikk } from "./integrasjoner/ia-tjenestemetrikker-api";
import { afterEach } from "node:test";
import Kalkulator from "./pages/kalkulator";



jest.mock("./integrasjoner/ia-tjenestemetrikker-api", () => ({
  __esModule: true,
  ...jest.requireActual("./integrasjoner/ia-tjenestemetrikker-api"),
  sendDigitalIaTjenesteMetrikk: jest.fn(),
  sendIaMetrikkInteraksjonstjeneste: jest.fn(),
}));

jest.mock("./hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));

jest.mock("./Banner/Banner", () => {
  return function Dummy() {
    return <div>dummy</div>;
  };
});

describe("Tester at metrikker blir registrert etter fem sekunder", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("Forsiden registrerer levert ia-tjeneste etter fem sekunder", async () => {
    renderHomePage();

    expect(sendDigitalIaTjenesteMetrikk).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5200);

    expect(sendDigitalIaTjenesteMetrikk).toHaveBeenCalled();
  });

  it("Kalkulatoren registrerer levert ia-tjeneste etter fem sekunder", async () => {
    renderKalkulatorPage();

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
  const kjørerMockApp = true;
  render(
    <Kalkulator
      page={{
        title: "Kalkulator",
        description: "noe",
      }}
      kjørerMockApp={kjørerMockApp}
      grafanaAgentUrl="grafanaAgentUrl"
    />,
  );
}
