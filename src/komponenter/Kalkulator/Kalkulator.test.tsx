import { render } from "@testing-library/react";
import { Fraværskalulator } from "./Kalkulator";
import { axe } from "jest-axe";

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
