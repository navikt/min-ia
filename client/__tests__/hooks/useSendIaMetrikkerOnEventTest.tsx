import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as hooks from "../../src/hooks/useOrgnr";
import * as iatjenestemetrikker from "../../src/integrasjoner/ia-tjenestemetrikker-api";

import { useSendIaTjenesteMetrikkOnEvent } from "../../src/hooks/useSendIaTjenesteMetrikkOnEvent";
import { FunctionComponent } from "react";

beforeEach(() => {
  jest.spyOn(iatjenestemetrikker, "sendLevertInnloggetIaTjeneste");
  jest.spyOn(hooks, "useOrgnr").mockImplementation(() => "999999999");
});

afterEach(() => {
  jest.resetAllMocks();
  jest.fn().mockClear();
});

it("sendLevertInnloggetIaTjeneste kalles når event blir trigget", async () => {
  userEvent.setup();
  render(<UseSendIaTjenesteMetrikkerOnEventExample />);

  const dummyButton = screen.getByTestId("dummy-button");

  expect(
    iatjenestemetrikker.sendLevertInnloggetIaTjeneste
  ).not.toHaveBeenCalled();

  await userEvent.click(dummyButton);

  expect(iatjenestemetrikker.sendLevertInnloggetIaTjeneste).toHaveBeenCalled();
});

const UseSendIaTjenesteMetrikkerOnEventExample: FunctionComponent = () => {
  useSendIaTjenesteMetrikkOnEvent("click");
  return <button data-testid="dummy-button">exampleButton</button>;
};
