import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoOgKurs from "../pages/video-og-kurs";
import logEvent from "../amplitude/logEvent";
import { useRouter } from "next/router";

jest.mock("../../src/amplitude/logEvent");
afterEach(() => {
  jest.resetAllMocks();
  jest.fn().mockClear();
});

beforeEach(() => {
  // window.location-assign er ikke implementert i jest, så vi må mocke den
  // eslint-disable-next-line
  // @ts-ignore
  delete window.location;
  // eslint-disable-next-line
  // @ts-ignore
  delete window.postMessage;
  // eslint-disable-next-line
  // @ts-ignore
  window.location = { assign: jest.fn() };
  // eslint-disable-next-line
  // @ts-ignore
  window.postMessage = jest.fn();
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// eslint-disable-next-line
// @ts-ignore
useRouter.mockReturnValue({
  query: {},
  push: jest.fn(),
});

it("sender nettkurs-filter-valgt-event ved klikk på Psykisk helse-filter", async () => {
  const user = userEvent.setup();
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

const renderNettkurs = () => {
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
};
