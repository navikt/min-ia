import { BASE_PATH } from "./backendApiProxy";
import {
  bransjeKvartalsvisSykefraværsprosentMock,
  næringKvartalsvisSykefraværsprosentMock,
} from "./local/testdata";

export const backendApiProxyMock = (app) => {
  console.log("========================================");
  console.log("========== Mock Backend API ============");
  console.log("===DETTE SKAL DU IKKE SE I PRODUKSJON===");
  console.log("========================================");

  app.get(`${BASE_PATH}/api/organisasjoner`, (request, response) => {
    console.log(`[DEBUG] GET /api/organisasjoner`);
    response.send([
      {
        Name: "FLESK OG FISK AS [Local server]",
        Type: "Enterprise",
        OrganizationNumber: "111111111",
        OrganizationForm: "AS",
        Status: "Active",
        ParentOrganizationNumber: "",
      },
      {
        Name: "FLESK OG FISK OSLO [Local server]",
        Type: "Business",
        OrganizationNumber: "910969439",
        OrganizationForm: "BEDR",
        Status: "Active",
        ParentOrganizationNumber: "111111111",
      },
      {
        Name: "Trøndelag Tømmerere [Local server]",
        Type: "Enterprise",
        OrganizationNumber: "211111111",
        OrganizationForm: "AS",
        Status: "Active",
        ParentOrganizationNumber: "",
      },
      {
        Name: "Trøndelag Tømmerere avd. OSLO [Local server]",
        Type: "Business",
        OrganizationNumber: "810969439",
        OrganizationForm: "BEDR",
        Status: "Active",
        ParentOrganizationNumber: "211111111",
      },
      {
        Name: "Test innlogging [Local server]",
        Type: "Enterprise",
        OrganizationNumber: "311111111",
        OrganizationForm: "AS",
        Status: "Active",
        ParentOrganizationNumber: "",
      },
      {
        Name: "Her må vi logge inn [Local server]",
        Type: "Business",
        OrganizationNumber: "999999998",
        OrganizationForm: "BEDR",
        Status: "Active",
        ParentOrganizationNumber: "311111111",
      },
    ]);
  });

  app.get(
    `${BASE_PATH}/api/:orgnr/sykefravarshistorikk/kvartalsvis`,
    (request, response) => {
      const orgnr = request.params.orgnr;
      console.log(`[DEBUG] GET /api/${orgnr}/sykefravarshistorikk/kvartalsvis`);

      let kvartalsvisSykefraværsprosent: any[];
      switch (orgnr) {
        case "810969439": {
          kvartalsvisSykefraværsprosent =
            næringKvartalsvisSykefraværsprosentMock;
          break;
        }
        case "910969439": {
          kvartalsvisSykefraværsprosent =
            bransjeKvartalsvisSykefraværsprosentMock;
          break;
        }
        case "999999998": {
          response.status(401).json([]);
          break;
        }
        default: {
          kvartalsvisSykefraværsprosent = [];
        }
      }

      response.send(kvartalsvisSykefraværsprosent);
    }
  );
};
