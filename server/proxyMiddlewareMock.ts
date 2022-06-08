import { FRONTEND_METRIKKER_PATH } from "./proxyMiddlewares";
import {
  bransjeKvartalsvisSykefraværsprosentV1OffentligMock,
  næringKvartalsvisSykefraværsprosentV1OffentligMock,
  organisasjoner,
} from "./local/testdata";
import { Express } from "express";
import { kurslisteMock } from "./local/testdata-kurs";

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

  console.debug(
    `Setter opp mock for GET-endepunkt med path ${FRONTEND_METRIKKER_PATH}/innlogget/mottatt-iatjeneste`
  );
  server.get(
    "/min-ia/api/:orgnr/v1/offentlig/sykefravarshistorikk/kvartalsvis",
    (request, response) => {
      const orgnr = request.params.orgnr;
      console.log(
        `[DEBUG] GET /api/${orgnr}/v1/offentlig/sykefravarshistorikk/kvartalsvis`
      );

      let kvartalsvisSykefraværsprosent: any[];
      switch (orgnr) {
        case "810969439": {
          kvartalsvisSykefraværsprosent =
            næringKvartalsvisSykefraværsprosentV1OffentligMock;
          break;
        }
        case "910969439": {
          kvartalsvisSykefraværsprosent =
            bransjeKvartalsvisSykefraværsprosentV1OffentligMock;
          break;
        }
        case "999999998": {
          response.status(401).json([]);
          break;
        }
        case "999999997": {
          response.status(500).json([]);
          break;
        }
        default: {
          kvartalsvisSykefraværsprosent = [];
        }
      }

      setTimeout(function () {
        response.send(kvartalsvisSykefraværsprosent);
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

  server.get(`/min-ia/kursoversikt/api/kurs`, (request, response) => {
    response.send(kurslisteMock);
  });
};
