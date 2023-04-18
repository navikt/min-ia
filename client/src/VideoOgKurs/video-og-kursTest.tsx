import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoOgKurs from "../../src/pages/video-og-kurs";
import logEvent from "../../src/amplitude/logEvent";
import { useRouter } from "next/router";

jest.mock("../../src/amplitude/logEvent");
afterEach(() => {
  jest.resetAllMocks();
  jest.fn().mockClear();
});

beforeEach(() => {
  // window.location-assign er ikke implementert i jest, så vi må mocke den
  // @ts-ignore
  delete window.location;
  // @ts-ignore
  delete window.postMessage;
  // @ts-ignore
  window.location = { assign: jest.fn() };
  // @ts-ignore
  window.postMessage = jest.fn();
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

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

  expect(logEvent).toBeCalledTimes(1);
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
    />
  );
};
