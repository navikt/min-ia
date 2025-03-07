import {
  organisasjoner,
  organisasjonerMedIaRettighet,
} from "./organisasajonerMockdata";
import {
  mockdataOrgnr81096939,
  mockdataOrgnr91096939,
  tomRespons,
} from "./aggregertStatistikkMockdata";
import { NextRequest, NextResponse } from "next/server";
import { notifikasjonerMockdata } from "./notifikasjonerMockdata";
import { fiaArbeidsgiverMock } from "./fia-arbeidsgiverMock";
import { kvartalsvisHistorikkMockdata } from "./kvartalsvisHistorikkMockdata";
import { aktiviteterMock } from "./aktiviteterMock";

export default async function mockRequest(req: NextRequest) {
  const testMode: string = process.env.TEST_MODE
    ? process.env.TEST_MODE
    : "NORMAL";
  const delayInMillis = 500;

  if (
    req.url?.endsWith("/api/authenticated/sykefravarsstatistikk/organisasjoner")
  ) {
    console.log(
      "[DEBUG] GET /api/authenticated/sykefravarsstatistikk/organisasjoner"
    );

    switch (testMode) {
      case "GENERELL_FEIL":
        return new NextResponse(JSON.stringify([]), { status: 500 });
      case "KREVER_INNLOGGING":
        return new NextResponse(JSON.stringify([]), { status: 401 });
      default:
        return new NextResponse(JSON.stringify(organisasjoner), {
          status: 200,
        });
    }
  }

  if (
    req.url?.endsWith(
      "/api/authenticated/sykefravarsstatistikk/organisasjoner-med-statistikktilgang"
    )
  ) {
    console.log(
      "[DEBUG] GET /api/authenticated/sykefravarsstatistikk/organisasjoner-med-statistikktilgang"
    );

    switch (testMode) {
      case "GENERELL_FEIL":
        return new NextResponse(JSON.stringify([]), { status: 500 });
      case "KREVER_INNLOGGING":
        return new NextResponse(JSON.stringify([]), { status: 401 });
      default:
        return new NextResponse(JSON.stringify(organisasjonerMedIaRettighet), {
          status: 200,
        });
    }
  }

  if (
      req.nextUrl.pathname.includes(
          "/api/authenticated/sykefravarsstatistikk/aggregert"
      ) || req.nextUrl.pathname.includes(
          "/api/authenticated/sykefravarsstatistikk/v2/aggregert"
      )
  ) {
    const orgnr = req.nextUrl.searchParams.get("orgnr") as string;
    console.log(
        `[DEBUG] GET ${req.nextUrl.pathname}  - w/ params: ${req.nextUrl.searchParams}`
    );

    let aggregertStatistikkMock;

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
        return new NextResponse(JSON.stringify([]), { status: 500 });
      }
      case "999999996": {
        return new NextResponse(JSON.stringify([]), { status: 403 });
      }
      default: {
        aggregertStatistikkMock = { tomRespons };
      }
    }

    await new Promise((r) => setTimeout(r, delayInMillis));
    return new NextResponse(JSON.stringify(aggregertStatistikkMock), {
      status: 200,
      headers: {'content-type': 'application/json'},
    });
  }

  if (
    req.url?.includes(
      "/api/sykefravarsstatistikk-api/kvartalsvis-sykefravarshistorikk?orgnr="
    )
  ) {
    const orgnr = req.nextUrl.searchParams.get("orgnr") as string;
    console.log(
      `[DEBUG] GET /api/sykefravarsstatistikk-api/kvartalsvis-sykefraværshistorikk?orgnr=${orgnr}`
    );

    const historikk = kvartalsvisHistorikkMockdata;

    await new Promise((r) => setTimeout(r, delayInMillis));
    return new NextResponse(JSON.stringify(historikk), {
      status: 200,
    });
  }
  if (req.url?.includes("/api/sykefravarsstatistikk-api/publiseringsdato")) {
    console.log(`[DEBUG] GET /api/sykefravarsstatistikk-api/publiseringsdato`);

    const publiseringsdato = {
      gjeldendePeriode: {
        årstall: 2022,
        kvartal: 2,
      },
      nestePubliseringsdato: "2022-12-01",
      sistePubliseringsdato: "2022-09-08",
    };

    await new Promise((r) => setTimeout(r, delayInMillis));
    return new NextResponse(JSON.stringify(publiseringsdato), {
      status: 200,
    });
  }

  if (req.url?.endsWith("/api/authenticated/metrikker")) {
    console.log("[DEBUG] GET /api/authenticated/metrikker");
    await new Promise((r) => setTimeout(r, delayInMillis));
    return new NextResponse(JSON.stringify({ status: "created" }), {
      status: 201,
    });
  }

  if (req.url?.endsWith("/api/authenticated/notifikasjoner")) {
    console.log("[DEBUG] GET /api/authenticated/notifikasjoner");
    return new NextResponse(JSON.stringify({ data: notifikasjonerMockdata }), {
      status: 200,
    });
  }

  if (req.url?.includes("api/authenticated/fia-samarbeidsstatus?orgnr=")) {
    const orgnr = req.nextUrl.searchParams.get("orgnr") as string;
    console.log(
      `[DEBUG] GET /api/authenticated/fia-samarbeidsstatus?orgnr=${orgnr}`
    );

    await new Promise((r) => setTimeout(r, delayInMillis));
    return new NextResponse(JSON.stringify(fiaArbeidsgiverMock(orgnr)), {
      status: 200,
    });
  }

  if (req.url?.includes("/api/aktiviteter/orgnr/")) {
    console.log(`[DEBUG] GET /api/aktiviteter/orgnr/{orgnr}`);

    await new Promise((r) => setTimeout(r, delayInMillis));
    return new NextResponse(JSON.stringify(aktiviteterMock), {
      status: 200,
    });
  }
  if (req.url?.includes("/api/aktivitet/")) {
    console.log(
      `[DEBUG] POST /api/aktivitet/{aktivitetId}/orgnr/{orgnr}/oppdater`
    );

    await new Promise((r) => setTimeout(r, delayInMillis));
    return new NextResponse(JSON.stringify({ status: 200 }), {
      status: 200,
    });
  }

  console.log(`[DEBUG][MISSING] ${req.method} ${req.url}`);
}
