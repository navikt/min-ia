import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nettkurs from "../../src/pages/nettkurs";
import logEvent from "../../src/amplitude/logEvent";

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

it("sender navigere-event ved klikk på lenke til statistikksiden", async () => {
  const user = userEvent.setup();
  render(<Nettkurs page={{
    title: "Nettkurs",
    description:
      "Her får du informasjon om hvordan du kan forebygge fravær på arbeidsplassen",
  }}/>);

  const lenketekst = "Psykisk helse";
  const statistikklenke = screen.getByRole("button", {
    name: lenketekst,
  });
  await user.click(statistikklenke);

  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith("nettkurs-filter-valgt", {filter: lenketekst});
});
