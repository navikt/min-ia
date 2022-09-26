import {
  getKostnadForAntallDagsverk,
  getKostnadForSykefraværsprosent,
  validerDesimaltallOgReturnerMatch,
  validerProsenttallOgReturnerMatch,
} from "./kalkulator-utils";

interface TestCaser {
  input: string;
  forventetMatch: string;
}

describe("Tester for kalkulator-utils", () => {
  test("getKostnadForAntallDagsverk", () => {
    const kostnadForAntallDagsverk = getKostnadForAntallDagsverk("3000", "100");
    expect(kostnadForAntallDagsverk).toBe(300000);
  });

  test("getKostnadForSykefraværsprosent", () => {
    const kostnadForAntallSykefraværsprosent = getKostnadForSykefraværsprosent(
      "3000",
      "10",
      "100"
    );
    expect(kostnadForAntallSykefraværsprosent).toBe(30000);
  });

  describe("validerDesimaltallOgReturnerMatch", () => {
    test("skal returnere samme verdi ved gyldig desimaltall", () => {
      const gyldigeDesimaltall = [
        "333333.33",
        "24",
        "0",
        "13,37",
        ".99",
        ",11",
        "0,0",
        ",",
        ".",
        "4.",
      ];
      gyldigeDesimaltall.forEach((desimaltall) => {
        const result = validerDesimaltallOgReturnerMatch(desimaltall);
        expect(result).toBe(desimaltall);
      });
    });

    test("skal returnere match ved ugyldig desimaltall", () => {
      const ugyldigeDesimaltall = ["e", "-", "", "asdf"];
      ugyldigeDesimaltall.forEach((ugyldigDesimaltall) => {
        const result = validerDesimaltallOgReturnerMatch(ugyldigDesimaltall);
        expect(result).toBe("");
      });
    });

    test("skal returnere match ved ugyldig desimaltall", () => {
      const desimaltallMedForMangeDesimalerOgForventetMatch: TestCaser[] = [
        { input: "44,444", forventetMatch: "44,44" },
        { input: ".555444", forventetMatch: ".55" },
        { input: "1.x", forventetMatch: "1." },
        { input: "777,777777", forventetMatch: "777,77" },
      ];

      desimaltallMedForMangeDesimalerOgForventetMatch.forEach((testCase) => {
        const result = validerDesimaltallOgReturnerMatch(testCase.input);
        expect(result).toBe(testCase.forventetMatch);
      });
    });
  });

  describe("validerDesimaltallOgReturnerMatch", () => {
    test("skal returnere match ved gyldig prosent", () => {
      const gyldigeProsenttall = ["100", "0", ".7", "50,55", "0.0", "0,0"];
      gyldigeProsenttall.forEach((prosenttall) => {
        const result = validerProsenttallOgReturnerMatch(
          prosenttall,
          "forrige verdi"
        );
        expect(result).toBe(prosenttall);
      });
    });

    test("skal returnere forrige verdi ved ugyldig prosent", () => {
      const ugyldigeProsenttall = ["-1", "101", "1000", "asdf"];
      ugyldigeProsenttall.forEach((prosenttall) => {
        const result = validerProsenttallOgReturnerMatch(
          prosenttall,
          "forrige verdi"
        );
        expect(result).toBe("forrige verdi");
      });
    });

    test("skal returnere tall med to desimaler dersom input har flere enn to desimaler", () => {
      const prosenttallMedForMangeDesimalerOgForventetMatch: TestCaser[] = [
        { input: "44,444", forventetMatch: "44,44" },
        { input: ".555444", forventetMatch: ".55" },
      ];

      prosenttallMedForMangeDesimalerOgForventetMatch.forEach((testCase) => {
        const result = validerProsenttallOgReturnerMatch(
          testCase.input,
          "forrige verdi"
        );
        expect(result).toBe(testCase.forventetMatch);
      });
    });
  });
});
