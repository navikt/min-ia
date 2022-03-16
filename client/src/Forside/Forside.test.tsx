import { render } from "@testing-library/react";
import { Forside } from "./Forside";
import { mockAmplitudeClient } from "../amplitude/amplitude-mock";

beforeEach(() => {
  jest.spyOn(mockAmplitudeClient, "logEvent");
});

it("trigger sidevisning-event", async () => {
  const sidevisningEventParams = {
    app: "min-ia",
    url: "/",
  };
  render(<Forside amplitudeClient={mockAmplitudeClient} />);
  expect(mockAmplitudeClient.logEvent).toHaveBeenCalledWith(
    "sidevisning",
    sidevisningEventParams
  );
});
