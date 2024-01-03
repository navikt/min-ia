import { render } from "@testing-library/react";
import { Lenkeflis } from "./Lenkeflis";
import { axe } from "jest-axe";

describe("Lenkeflis", () => {
  test("inneholder ikke uu-feil", async () => {
    const { container: myContainer } = render(
      <Lenkeflis overskrift="Link" brødtekst="Klikk her" href="destinasjon" />,
    );
    const results = await axe(myContainer);
    expect(results).toHaveNoViolations();
  });
});
