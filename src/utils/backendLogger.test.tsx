import { anonymizeOrgnr } from "./backendLogger";

describe("Tester anonymize orgnr", () => {
    it("Erstatter et orgnr med 9 stjerner", async () => {
        expect(anonymizeOrgnr("Dette er et orgnr: 987654321"))
            .toBe("Dette er et orgnr: *********");
    });
    it("Kan erstatteflere orgnr", async () => {
        expect(anonymizeOrgnr("Dette er et orgnr: 987654321, og et annet orgnr: 123456789"))
            .toBe("Dette er et orgnr: *********, og et annet orgnr: *********");
    });
    it("Erstatter ikke enkelte tall", async () => {
        expect(anonymizeOrgnr("Dette er et kortere tall: 12345678"))
            .toBe("Dette er et kortere tall: 12345678");
    });
    it("Erstatter ikke enkelte tall blandet med orgn", async () => {
        expect(anonymizeOrgnr("Dette er et orgnr: 987654321, men ikke det her: 12345678"))
            .toBe("Dette er et orgnr: *********, men ikke det her: 12345678");
    });
});
