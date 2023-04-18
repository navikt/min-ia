import { leggTilBedriftPåUrl } from "./navigasjon";

describe("Tester at bedrift legges korrekt til på URL", () => {
  it("returnerer opprinnelig URL dersom orgnummer er undefined", () => {
    expect(leggTilBedriftPåUrl("url", undefined)).toBe("url");
  });

  it("legger på orgnr dersom orgnummer finnes", () => {
    expect(leggTilBedriftPåUrl("url", "999999999")).toBe("url?bedrift=999999999");
  });
});
