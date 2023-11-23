import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fraværskalulator } from "./Kalkulator";
import { axe } from "jest-axe";
import { sendDigitalIaTjenesteMetrikk } from "../../integrasjoner/ia-tjenestemetrikker-api";
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
jest.mock("../../integrasjoner/ia-tjenestemetrikker-api", () => ({
  __esModule: true,
  ...jest.requireActual("../../integrasjoner/ia-tjenestemetrikker-api"),
  sendDigitalIaTjenesteMetrikk: jest.fn(),
}));
jest.mock("../../hooks/useOrgnr", () => ({
  useOrgnr: () => "999999999",
}));

afterEach(() => {
  jest.resetAllMocks();
  jest.fn().mockClear();
});

it("Kaller sendIaTjenesteMetrikk ved endring av modus", async () => {
  render(<Fraværskalulator {...dummyData} nedlastingPågår={false} />);
  const user = userEvent.setup();

  const dagsverkLenke = screen.getByText("Dagsverk");

  expect(sendDigitalIaTjenesteMetrikk).toHaveBeenCalledTimes(0);

  await user.click(dagsverkLenke);

  expect(sendDigitalIaTjenesteMetrikk).toHaveBeenCalledTimes(1);
});

it("Ingen uu-feil fra axe", async () => {
  const { container: myContainer } = render(
    <Fraværskalulator {...dummyData} nedlastingPågår={false} />
  );
  const results = await axe(myContainer);
  expect(results).toHaveNoViolations();
});

const dummyData = {
  fraværsprosentVirksomhet: "14,0",
  tapteDagsverk: "7800",
  muligeDagsverk: "52000",
};
