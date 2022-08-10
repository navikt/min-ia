import {
  aggregertStatistikkMedBransjeMock,
  aggregertStatistikkNæringMock,
  organisasjoner,
} from "./testdata";
import { Express } from "express";
import { kurslisteMock } from "./testdata-kurs";

export const backendApiProxyMock = (server: Express) => {
  console.log("========================================");
  console.log("========== Mock Backend API ============");
  console.log("===DETTE SKAL DU IKKE SE I PRODUKSJON===");
  console.log("========================================");

  const testMode: string = process.env.TEST_MODE
    ? process.env.TEST_MODE
    : "NORMAL";
  const delayInMillis = 500;

  server.get("/min-ia/api/organisasjoner", (request, response) => {
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
    "/min-ia/api/:orgnr/sykefravarshistorikk/aggregert/v1",
    (request, response) => {
      const orgnr = request.params.orgnr;
      console.log(
        `[DEBUG] GET /api/${orgnr}/sykefravarshistorikk/aggregert/v1`
      );

      let aggregertStatistikkMock: any;
      switch (orgnr) {
        case "810969439": {
          aggregertStatistikkMock = aggregertStatistikkNæringMock;
          break;
        }
        case "910969439": {
          aggregertStatistikkMock = aggregertStatistikkMedBransjeMock;
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
        default: {
          aggregertStatistikkMock = aggregertStatistikkNæringMock;
        }
      }

      setTimeout(function () {
        response.send(aggregertStatistikkMock);
      }, delayInMillis);
    }
  );

  server.post(
    `/min-ia/metrikker/innlogget/mottatt-iatjeneste`,
    (request, response) => {
      setTimeout(function () {
        response.send({
          status: "created",
        });
      }, delayInMillis);
    }
  );

  server.get(`/min-ia/kursoversikt`, (request, response) => {
    response.send(kurslisteMock);
  });
};
