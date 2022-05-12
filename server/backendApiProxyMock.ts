import { FRONTEND_METRIKKER_PATH } from "./backendApiProxy";
import {
  bransjeKvartalsvisSykefraværsprosentV1OffentligMock,
  næringKvartalsvisSykefraværsprosentV1OffentligMock,
  organisasjoner,
} from "./local/testdata";
import { Express } from "express";

export const backendApiProxyMock = (server: Express) => {
  console.log("========================================");
  console.log("========== Mock Backend API ============");
  console.log("===DETTE SKAL DU IKKE SE I PRODUKSJON===");
  console.log("========================================");

  const testMode: string = process.env.TEST_MODE
    ? process.env.TEST_MODE
    : "NORMAL";
  const delayFaktorIMillis = 500;

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
      }, delayFaktorIMillis);
    }
  );

  console.debug(
    `Setter opp mock POST-endepunkt for ${FRONTEND_METRIKKER_PATH}/innlogget/mottatt-iatjeneste`
  );
  server.post(
    `/min-ia/metrikker/innlogget/mottatt-iatjeneste`,
    (request, response) => {
      console.log("[DEBUG] POST /metrikker/innlogget/mottatt-iatjeneste");

      setTimeout(function () {
        response.send({
          status: "created",
        });
      }, delayFaktorIMillis);
    }
  );
};
