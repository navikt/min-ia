import { render } from "@testing-library/react";
import { Forside } from "../../src/Forside/Forside";
import { mockAmplitudeClient } from "../../src/amplitude/amplitude-mock";
import logEvent from "../../src/amplitude/client";

jest.mock("../../src/amplitude/client", () => jest.fn());

beforeEach(() => {
 // jest.spyOn(mockAmplitudeClient, "logEvent");
});

it("trigger sidevisning-event", async () => {
  const sidevisningEventParams ={eventProperties: {
      app: "min-ia",
      url: "/",
    }
  };
  render(
    <Forside
      amplitudeClient={mockAmplitudeClient}
      harNoenOrganisasjoner={true}
    />
  );
  /*expect(logEvent("sidevisning", { app: "min-ia" })).toHaveBeenCalledWith(
    "sidevisning",
    { app: "min-ia" }
  );*/
expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith(
    "sidevisning",
      sidevisningEventParams
  );
});
