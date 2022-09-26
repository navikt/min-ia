import MyApp from "../../src/pages/_app";
import { render } from "@testing-library/react";
import logEvent from "../../src/amplitude/logEvent";
import { Router } from "next/router";

jest.mock("next/router");
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
  window.location = { assign: jest.fn() };
});

it("triggers sidevisning-event at page load", async () => {
  render(
    <MyApp
      Component={() => <div>Hello World!</div>}
      pageProps={{}}
      router={{} as Router}
    />
  );
  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith("sidevisning");
});
