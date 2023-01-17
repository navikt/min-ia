import { organisasjoner } from "./organisasajonerMockdata";
import { Express } from "express";
import { kurslisteMock } from "./testdata-kurs";
import {
  mockdataOrgnr81096939,
  mockdataOrgnr91096939,
  tomRespons,
} from "./aggregertStatistikkMockdata";

export const backendApiProxyMock = (server: Express) => {
  console.log("========================================");
  console.log("========== Mock Backend API ============");
  console.log("===DETTE SKAL DU IKKE SE I PRODUKSJON===");
  console.log("========================================");

  const testMode: string = process.env.TEST_MODE
    ? process.env.TEST_MODE
    : "NORMAL";
  const delayInMillis = 500;

  server.get("/forebygge-fravar/api/organisasjoner", (request, response) => {
    console.log(`[DEBUG] GET /api/organisasjoner`);

    switch (testMode) {
      case "GENERELL_FEIL":
        response.status(500).json([]);
        break;
      case "KREVER_INNLOGGING":
        response.status(401).json([]);
        break;
      default:
        response.send(organisasjoner);
        break;
    }
  });

  server.get(
    "/forebygge-fravar/api/:orgnr/v1/sykefravarshistorikk/aggregert",
    (request, response) => {
      const orgnr = request.params.orgnr;
      console.log(
        `[DEBUG] GET /api/${orgnr}/v1/sykefravarshistorikk/aggregert`
      );

      let aggregertStatistikkMock: any;
      switch (orgnr) {
        case "810969439": {
          aggregertStatistikkMock = mockdataOrgnr81096939;
          break;
        }
        case "910969439": {
          aggregertStatistikkMock = mockdataOrgnr91096939;
          break;
        }
        case "999999998": {
          response.status(401).json();
          break;
        }
        case "999999997": {
          response.status(500).json();
          break;
        }
        case "999999996": {
          response.status(403).json();
          break;
        }
        default: {
          aggregertStatistikkMock = { tomRespons };
        }
      }

      setTimeout(function () {
        response.send(aggregertStatistikkMock);
      }, delayInMillis);
    }
  );

  server.post(
    `/forebygge-fravar/metrikker/innlogget/mottatt-iatjeneste`,
    (request, response) => {
      setTimeout(function () {
        response.send({
          status: "created",
        });
      }, delayInMillis);
    }
  );

  server.get(`/forebygge-fravar/kursoversikt`, (request, response) => {
    response.send(kurslisteMock);
  });
};
