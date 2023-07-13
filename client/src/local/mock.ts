import { NextApiRequest, NextApiResponse } from "next";
import {
  organisasjoner,
  organisasjonerMedIaRettighet,
} from "./organisasajonerMockdata";
import {
  mockdataOrgnr81096939,
  mockdataOrgnr91096939,
  tomRespons,
} from "./aggregertStatistikkMockdata";
import { kurslisteMock } from "./testdata-kurs";
import { fiaArbeidsgiverMock } from "./fia-arbeidsgiverMock";

export default function mockRequest(req: NextApiRequest, res: NextApiResponse) {
  const testMode: string = process.env.TEST_MODE
    ? process.env.TEST_MODE
    : "NORMAL";
  const delayInMillis = 500;
  console.log("req.url", req.url);

  if (
    req.url?.endsWith("/api/authenticated/sykefravarsstatistikk/organisasjoner")
  ) {
    console.log(
      "[DEBUG] GET /api/authenticated/sykefravarsstatistikk/organisasjoner"
    );

    switch (testMode) {
      case "GENERELL_FEIL":
        res.status(500).json([]);
        break;
      case "KREVER_INNLOGGING":
        res.status(401).json([]);
        break;
      default:
        res.send(organisasjoner);
        break;
    }
  }

  if (
    req.url?.endsWith(
      "/api/authenticated/sykefravarsstatistikk/organisasjoner-med-statistikk"
    )
  ) {
    console.log(
      "[DEBUG] GET /api/authenticated/sykefravarsstatistikk/organisasjoner-med-statistikk"
    );

    switch (testMode) {
      case "GENERELL_FEIL":
        res.status(500).json([]);
        break;
      case "KREVER_INNLOGGING":
        res.status(401).json([]);
        break;
      default:
        res.send(organisasjonerMedIaRettighet);
        break;
    }
  }

  if (
    req.url?.includes(
      "/api/authenticated/sykefravarsstatistikk/aggregert?orgnr="
    )
  ) {
    const orgnr = req.query.orgnr as string;
    console.log(
      `[DEBUG] GET /api/authenticated/sykefravarsstatistikk/aggregert?orgnr=${orgnr}`
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
      case "999999997": {
        res.status(500).json([]);
        break;
      }
      case "999999996": {
        res.status(403).json([]);
        break;
      }
      default: {
        aggregertStatistikkMock = { tomRespons };
      }
    }

    setTimeout(function () {
      res.send(aggregertStatistikkMock);
    }, delayInMillis);
  }

  if (req.url?.endsWith("/api/authenticated/metrikker")) {
    console.log("[DEBUG] GET /api/authenticated/metrikker");
    setTimeout(function () {
      res.send({ status: "created" });
    }, delayInMillis);
  }

  if (req.url?.endsWith("/api/authenticated/notifikasjoner")) {
    console.log("[DEBUG] GET /api/authenticated/notifikasjoner");
    setTimeout(function () {
      res.send(tomRespons);
    }, delayInMillis);
  }
}
