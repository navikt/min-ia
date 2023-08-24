import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoOgKurs from "./pages/video-og-kurs";
import { QbrickVideoPlayer } from "./EmbeddedVideoPlayer/QbrickVideoPlayer";
import { Fraværskalulator } from "./komponenter/Kalkulator/Kalkulator";
import Home from "./pages";
import { sendIaTjenesteMetrikk } from "./integrasjoner/ia-tjenestemetrikker-api";

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
}));
jest.mock("./hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));
jest.mock("./EmbeddedVideoPlayer/QbrickVideoPlayer");
const user = userEvent.setup();

describe("Metrikktester av hele siden", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Kalkulator", () => {
    it("Kaller sendIaTjenesteMetrikk ved endring av modus", async () => {
      render(
        <Fraværskalulator
          fraværsprosentVirksomhet="14,0"
          tapteDagsverk="7800"
          muligeDagsverk="52000"
          nedlastingPågår={false}
        />
      );

      const dagsverkLenke = screen.getByText("Dagsverk");

      expect(sendIaTjenesteMetrikk).toHaveBeenCalledTimes(0);

      await user.click(dagsverkLenke);

      expect(sendIaTjenesteMetrikk).toHaveBeenCalledTimes(1);
    });
  });

  describe("Video og kurs", () => {
    afterEach(() => {
      document.addEventListener(
        // fjern/stopp gamle eventlisteners.
        "videoAvspilles",
        (e) => {
          e.stopImmediatePropagation();
          e.stopPropagation();
        },
        true
      );
    });

    it("sender metrikker etter play-klikk", async () => {
      (QbrickVideoPlayer as jest.Mock).mockImplementation(
        MockQbrickVideoPlayer
      );
      renderNettkurs();

      expect(sendIaTjenesteMetrikk).not.toHaveBeenCalled();

      const playknapper = screen.getAllByText("mock qbrick play button");
      await user.click(playknapper[0]);

      await waitFor(() => {
        expect(sendIaTjenesteMetrikk).toHaveBeenCalledTimes(1);
      });

      // sjekk at det ikke sendes flere metrikker ved klikk forskjellige videoer
      await user.click(playknapper[1]);
      await waitFor(() => {
        expect(sendIaTjenesteMetrikk).toHaveBeenCalledTimes(1);
      });
    });

    function MockQbrickVideoPlayer() {
      return (
        <div>
          <span>
            This is a dummy component, and should never be seen outside a code
            editor or terminal
          </span>
          <button
            onClick={() =>
              document.dispatchEvent(new CustomEvent("videoAvspilles"))
            }
          >
            mock qbrick play button
          </button>
        </div>
      );
    }

    const renderNettkurs = () =>
      render(
        <VideoOgKurs
          page={{
            title: "VideoOgKurs",
            description:
              "Her får du informasjon om hvordan du kan forebygge fravær på arbeidsplassen",
          }}
          kjørerMockApp={false}
          grafanaAgentUrl=""
        />
      );
  });

  describe("Forside", () => {
    it("Kaller sendIaTjenesteMetrikk ved klikk på en lenkeflis", async () => {
      renderPage();
      const statistikklenke = await waitFor(() => {
        const lenke = screen.getByRole("link", {
          name: "Verktøy for forebygging av sykefravær",
        });

        expect(lenke).toBeInTheDocument();

        return lenke;
      });

      expect(sendIaTjenesteMetrikk).toHaveBeenCalledTimes(0);

      await user.click(statistikklenke);

      expect(sendIaTjenesteMetrikk).toHaveBeenCalledTimes(1);
    });

    function renderPage() {
      const kjørerMockApp = false;
      render(
        <Home
          page={{
            title: "Home",
            description: "noe",
          }}
          forsideProps={{
            samtalestøtteUrl: "samtalestøtteUrl",
            forebyggingsplanUrl: "forebyggingsplanUrl",
            sykefraværsstatistikkUrl: "sykefraværsstatistikkUrl",
            kontaktOssUrl: "kontaktOssUrl",
            kjørerMockApp,
          }}
          minSideArbeidsgiverUrl="minSideArbeidsgiverUrl"
          kjørerMockApp={kjørerMockApp}
          grafanaAgentUrl="grafanaAgentUrl"
        />
      );
    }
  });
});
