import { render } from "@testing-library/react";
import { Forside } from "../../src/Forside/Forside";
import { mockAmplitudeClient } from "../../src/amplitude/amplitude-mock";

beforeEach(() => {
  jest.spyOn(mockAmplitudeClient, "logEvent");
});

it("trigger sidevisning-event", async () => {
  const sidevisningEventParams = {
    app: "min-ia",
    url: "/",
  };
  render(
    <Forside
      amplitudeClient={mockAmplitudeClient}
      harNoenOrganisasjoner={true}
    />
  );
  expect(mockAmplitudeClient.logEvent).toHaveBeenCalledWith(
    "sidevisning",
    sidevisningEventParams
  );
});
