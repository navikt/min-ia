import MyApp from "../../src/pages/_app";
import {render} from "@testing-library/react";
import {Router} from "next/router";

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
    window.location = {assign: jest.fn()};
});

it("renders without errors", async () => {
    render(
        <MyApp
            Component={() => <div>Hello World!</div>}
            pageProps={{}}
            router={{} as Router}
        />
    );
});
