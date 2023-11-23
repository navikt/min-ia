import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Lenkeflis} from "./Lenkeflis";
import logEvent from "../amplitude/logEvent";
import {axe} from "jest-axe";
import {sendDigitalIaTjenesteMetrikk} from "../integrasjoner/ia-tjenestemetrikker-api";

jest.mock("../amplitude/logEvent");
jest.mock("../hooks/useOrgnr", () => ({
    useOrgnr: () => "999999999",
}));
jest.mock("../integrasjoner/ia-tjenestemetrikker-api", () => ({
    __esModule: true,
    ...jest.requireActual("../integrasjoner/ia-tjenestemetrikker-api"),
    sendDigitalIaTjenesteMetrikk: jest.fn(),
}));

beforeEach(() => {
    // window.location-assign er ikke implementert i jest, så vi må mocke den
    // eslint-disable-next-line
    // @ts-ignore
    delete window.location;
    // eslint-disable-next-line
    // @ts-ignore
    window.location = {assign: jest.fn()};
});

afterEach(() => {
    jest.resetAllMocks();
    jest.fn().mockClear();
});

describe("Lenkeflis", () => {
    it("sender navigere-event ved klikk", async () => {
        render(
            <Lenkeflis overskrift="Link" brødtekst="Klikk her" href="destinasjon"/>
        );

        const statistikklenke = screen.getByRole("link", {
            name: "Link Klikk her",
        });

        const user = userEvent.setup();
        await user.click(statistikklenke);

        expect(logEvent).toHaveBeenCalledTimes(1);
        expect(logEvent).toHaveBeenCalledWith("navigere", {
            destinasjon: "destinasjon",
            lenketekst: "Link",
        });
    });

    it("Kaller sendLevertInnloggetIaTjeneste ved klikk", async () => {
        render(
            <Lenkeflis overskrift="Link" brødtekst="Klikk her" href="destinasjon"/>
        );
        const user = userEvent.setup();

        const statistikklenke = screen.getByRole("link", {
            name: "Link Klikk her",
        });

        expect(sendDigitalIaTjenesteMetrikk).toHaveBeenCalledTimes(0);

        await user.click(statistikklenke);

        expect(sendDigitalIaTjenesteMetrikk).toHaveBeenCalledTimes(1);
    });

    test("inneholder ikke uu-feil", async () => {
        const {container: myContainer} = render(
            <Lenkeflis overskrift="Link" brødtekst="Klikk her" href="destinasjon"/>
        );
        const results = await axe(myContainer);
        expect(results).toHaveNoViolations();
    });
})