import { render } from "@testing-library/react";
import { Forside } from "../../src/Forside/Forside";
import logEvent from "../../src/amplitude/logEvent";

jest.mock("../../src/amplitude/logEvent", () => jest.fn());

it("trigger sidevisning-event", async () => {
  const sidevisningEventParams = {
      app: "min-ia",
      url: "/",
  };
  render(<Forside harNoenOrganisasjoner={true} />);
  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith("sidevisning", sidevisningEventParams);
});
