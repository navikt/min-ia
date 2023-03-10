import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Forside} from "../../src/Forside/Forside";
import logEvent from "../../src/amplitude/logEvent";

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
    window.location = {assign: jest.fn()};
});

jest.mock("../../src/hooks/useOrgnr", () => ({
    useOrgnr: () => "999999999",
}));

it.skip("sender navigere-event ved klikk på lenke til statistikksiden", async () => {
    const user = userEvent.setup();
    render(
        <Forside
            sykefraværsstatistikkUrl={"https://url-til-sykefraværsstatistikk"}
            forebyggingsplanUrl={"https://url-til-forebyggingsplan"}
            samtalestøtteUrl={"https://url-til-samtalestøtte"}
            kontaktOssUrl={"https://url-til-samtalestøtte"}/>
    );

    const lenketekst = "Be om tilgang";
    const lenkebeskrivelse =
        "Be om tilgang Klikk her for å be om tilgang for å se denne virksomhetens sykefraværsstatistikk.";
    const statistikklenke = screen.getByRole("link", {
        name: lenkebeskrivelse,
    });
    await user.click(statistikklenke);

    expect(logEvent).toBeCalledTimes(1);
    expect(logEvent).toHaveBeenCalledWith("navigere", {
        destinasjon: "https://url-til-sykefraværsstatistikk/bedrift=999999999",
        lenketekst,
    });
});
