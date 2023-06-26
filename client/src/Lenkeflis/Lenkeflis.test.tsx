import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Lenkeflis} from "./Lenkeflis";
import logEvent from "../amplitude/logEvent";
import { axe } from 'jest-axe';

jest.mock("../amplitude/logEvent");

beforeEach(() => {
    // window.location-assign er ikke implementert i jest, så vi må mocke den
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};
});

it("sender navigere-event ved klikk på en lenkeflis", async () => {
    render(
        <Lenkeflis
            overskrift="Link"
            brødtekst="Klikk her"
            href="destinasjon"
        />
    );

    const statistikklenke = screen.getByRole("link", {
        name: "Link Klikk her",
    });

    const user = userEvent.setup();
    await user.click(statistikklenke);

    expect(logEvent).toBeCalledTimes(1);
    expect(logEvent).toHaveBeenCalledWith("navigere", {
        destinasjon: "destinasjon",
        lenketekst: "Link",
    });
});

test("uu-feil fra axe", async () => {
    const { container: myContainer } = render(
      <Lenkeflis overskrift="Link" brødtekst="Klikk her" href="destinasjon" />
    );
    const results = await axe(myContainer);
    expect(results).toHaveNoViolations();
  });
  