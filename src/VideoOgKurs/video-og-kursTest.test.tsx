import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoOgKurs from "../pages/video-og-kurs";
import logEvent from "../amplitude/logEvent";
import { QbrickVideoPlayer } from "../EmbeddedVideoPlayer/QbrickVideoPlayer";
import { sendLevertInnloggetIaTjeneste } from "../integrasjoner/ia-tjenestemetrikker-api";

jest.mock("../../src/amplitude/logEvent");
jest.mock("../../src/EmbeddedVideoPlayer/QbrickVideoPlayer");
jest.mock("../../src/integrasjoner/ia-tjenestemetrikker-api", () => ({
  ...jest.requireActual("../../src/integrasjoner/ia-tjenestemetrikker-api"),
  sendLevertInnloggetIaTjeneste: jest.fn(() => Promise.resolve(true)),
}));
jest.mock("../../src/hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    query: {},
    push: jest.fn(),
  })),
}));

describe("VideoOgKurs", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.fn().mockClear();
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

  const user = userEvent.setup();

  it("sender nettkurs-filter-valgt-event ved klikk på Psykisk helse-filter", async () => {
    renderNettkurs();

    const knappetekst = "Psykisk helse";
    const psykiskHelseFilter = screen.getByRole("button", {
      name: knappetekst,
    });
    await user.click(psykiskHelseFilter);

    expect(logEvent).toHaveBeenCalledTimes(1);
    expect(logEvent).toHaveBeenCalledWith("chip valgt", {
      chipId: knappetekst,
      tekst: knappetekst,
    });
  });

  it("sender metrikker etter play-klikk", async () => {
    (QbrickVideoPlayer as jest.Mock).mockImplementation(MockQbrickVideoPlayer);
    renderNettkurs();

    expect(sendLevertInnloggetIaTjeneste).not.toHaveBeenCalled();

    const playknapper = screen.getAllByText("mock qbrick play button");
    await user.click(playknapper[0]);

    await waitFor(() => {
      expect(sendLevertInnloggetIaTjeneste).toHaveBeenCalledTimes(1);
    });

    // sjekk at det ikke sendes flere metrikker ved klikk forskjellige videoer
    await user.click(playknapper[1]);
    await waitFor(() => {
      expect(sendLevertInnloggetIaTjeneste).toHaveBeenCalledTimes(1);
    });
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
