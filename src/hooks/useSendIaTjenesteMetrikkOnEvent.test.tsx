import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sendIaTjenesteMetrikk } from "../../src/integrasjoner/ia-tjenestemetrikker-api";

import { useSendIaTjenesteMetrikkOnEvent } from "./useSendIaTjenesteMetrikkOnEvent";
import { FunctionComponent } from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { METRIKKER_URL } from "../utils/konstanter";
import { MetrikkKilde } from "@navikt/ia-metrikker-client";

jest.mock("../../src/integrasjoner/ia-tjenestemetrikker-api", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../src/integrasjoner/ia-tjenestemetrikker-api"),
    sendIaTjenesteMetrikk: jest.fn(),
  };
});

jest.mock("../../src/hooks/useOrgnr", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../src/hooks/useOrgnr"),
    useOrgnr: jest.fn(() => "999999999"),
  };
});

const handlerMetrikkerApiCall = [
  rest.post(METRIKKER_URL, (req, res, ctx) => {
    return res(ctx.json({ status: "created" }), ctx.status(201));
  }),
];

const server = setupServer(...handlerMetrikkerApiCall);

beforeAll(() => server.listen());
afterAll(() => server.close());

it("sendLevertInnloggetIaTjeneste kalles når event blir trigget", async () => {
  userEvent.setup();
  render(<UseSendIaTjenesteMetrikkerOnEventExample />);

  const dummyButton = screen.getByTestId("dummy-button");

  expect(sendIaTjenesteMetrikk).not.toHaveBeenCalled();

  await userEvent.click(dummyButton);

  expect(sendIaTjenesteMetrikk).toHaveBeenCalled();
});

const UseSendIaTjenesteMetrikkerOnEventExample: FunctionComponent = () => {
  useSendIaTjenesteMetrikkOnEvent(MetrikkKilde.SAMTALESTØTTE, "click");
  return <button data-testid="dummy-button">exampleButton</button>;
};
