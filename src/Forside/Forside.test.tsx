import { act, render, screen, waitFor, within } from "@testing-library/react";
import {
  sendNavigereEvent,
  sendÅpneAktivitetEvent,
  sendOppgaveStatusEvent,
} from "../utils/analytics/analytics";
import { Forside } from "./Forside";
import React from "react";
import { RestStatus } from "../integrasjoner/rest-status";
import { fiaSamarbeidMock } from "../local/fia-samarbeidMock";

jest.mock("../utils/analytics/analytics");
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
      replace: jest.fn(),
    };
  }),
}));

jest.mock("../hooks/useOrgnr", () => ({
  useOrgnr: jest.fn(() => "999999999"),
  erGyldigOrgnr: jest.fn(() => true),
}));

jest.mock("../hooks/useAltinnOrganisasjoner", () => ({
  useAltinnOrganisasjoner: jest.fn(() => ({
    status: RestStatus.Suksess,
    data: [
      {
        Name: "FIKTIVT SYKEHUS [TEST]",
        Type: "Enterprise",
        OrganizationNumber: "999999999",
        OrganizationForm: "AS",
        Status: "Active",
        ParentOrganizationNumber: "",
      },
    ],
  })),
  useAltinnOrganisasjonerMedStatistikktilgang: jest.fn(() => ({
    status: RestStatus.Suksess,
    data: [
      {
        Name: "FIKTIVT SYKEHUS [TEST]",
        Type: "Enterprise",
        OrganizationNumber: "999999999",
        OrganizationForm: "AS",
        Status: "Active",
        ParentOrganizationNumber: "",
      },
    ],
  })),
}));
const samarbeidMockdata = fiaSamarbeidMock().map((samarbeid) => ({
  ...samarbeid,
  offentligId: `${samarbeid.offentligId}`,
}));

jest.mock("../Samarbeid/fiaSamarbeidAPI", () => ({
  useFiaSamarbeid: jest.fn(() => ({
    status: RestStatus.Suksess,
    data: samarbeidMockdata,
  })),
}));

describe("Forside", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    {
      knappetekst: "Se din sykefraværsstatistikk",
      knappeurl: "sykefraværsstatistikkUrl",
    },
    {
      knappetekst: "Fraværskalkulator",
      knappeurl: "/forebygge-fravar/kalkulator",
    },
    {
      knappetekst: "Få tilskudd til ekspertbistand",
      knappeurl: "https://www.nav.no/arbeidsgiver/ekspertbistand",
      getKnapp: async () => screen.queryAllByText("Les mer")[0],
    },
    {
      knappetekst: "Få hjelp til å redusere sykefraværet",
      knappeurl: "https://www.nav.no/arbeidsgiver/navarbeidslivssenter",
      getKnapp: async () => screen.queryAllByText("Les mer")[1],
    },
    {
      knappetekst: "Bli med på kurs",
      knappeurl:
        "https://arbeidsgiver.nav.no/kursoversikt/?tema=Inkluderende%20arbeidsliv%20(IA)",
      getKnapp: async () => screen.queryAllByText("Les mer")[2],
    },
    {
      knappetekst: "Arbeidsmiljøportalen",
      knappeurl: "https://www.arbeidsmiljoportalen.no",
    },
    {
      knappetekst: "Idébanken",
      knappeurl: "https://www.idebanken.org",
    },
    {
      knappetekst: "nav.no",
      knappeurl: "https://www.nav.no/arbeidsgiver/samtalestotte-arbeidsgiver",
    },
    {
      knappetekst: "Les mer om IA-avtalen på sidene til regjeringen",
      knappeurl:
        "https://www.regjeringen.no/no/tema/arbeidsliv/arbeidsmiljo-og-sikkerhet/inkluderende_arbeidsliv",
    },
    {
      knappetekst: "55 55 33 36",
      knappeurl: "tel:+4755553336",
    },
    {
      knappetekst: "Kontaktskjema",
      knappeurl: "https://kontaktskjema.arbeidsgiver.nav.no",
    },
    {
      knappetekst: "Kontakt oss",
      knappeurl: "kontaktOssUrl",
    },
  ])(
    "Kaller sendNavigereEvent for lenkeklikk",
    async ({ knappetekst, knappeurl, getKnapp }) => {
      expect(sendNavigereEvent).not.toHaveBeenCalled();
      render(
        <Forside
          sykefraværsstatistikkUrl="sykefraværsstatistikkUrl"
          kontaktOssUrl="kontaktOssUrl"
          kjørerMockApp={false}
        />,
      );
      expect(sendNavigereEvent).not.toHaveBeenCalled();
      const knapp = getKnapp
        ? await getKnapp()
        : await screen.findByRole("link", { name: knappetekst });
      act(() => knapp.click());
      expect(sendNavigereEvent).toHaveBeenCalledTimes(1);
      expect(sendNavigereEvent).toHaveBeenCalledWith(knappetekst, knappeurl);
    },
  );

  it.each([
    "Bli gode på å tilrettelegge for ansatte",
    "Kom i gang med å føre din egen sykefraværsstatistikk",
    "Bruk egen sykefraværstatistikk aktivt",
  ])(
    "Kaller sendÅpneAktivitetEvent for ekspandering av aktivitetaccordion",
    (accordiontittel) => {
      render(
        <Forside
          sykefraværsstatistikkUrl="sykefraværsstatistikkUrl"
          kontaktOssUrl="kontaktOssUrl"
          kjørerMockApp={false}
        />,
      );

      expect(sendÅpneAktivitetEvent).not.toHaveBeenCalled();
      const aktivitetAccordion = screen.getByText(accordiontittel);
      act(() => aktivitetAccordion.click());
      expect(sendÅpneAktivitetEvent).toHaveBeenCalledTimes(1);
      expect(sendÅpneAktivitetEvent).toHaveBeenCalledWith(
        accordiontittel,
        false,
      );
    },
  );

  it("Viser IA-samarbeid", () => {
    render(
      <Forside
        sykefraværsstatistikkUrl="sykefraværsstatistikkUrl"
        kontaktOssUrl="kontaktOssUrl"
        kjørerMockApp={false}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "IA-samarbeid med Nav arbeidslivssenter",
      }),
    ).toBeInTheDocument();
    const samarbeidSomVisesOverFold = samarbeidMockdata
      .filter((s) => s.status === "AKTIV")
      .slice(0, 3);

    expect(samarbeidSomVisesOverFold.length).toBeGreaterThan(0);
    for (const samarbeid of samarbeidSomVisesOverFold) {
      const tittel = screen.getByRole("heading", { name: samarbeid.navn });
      expect(tittel).toBeInTheDocument();

      const lenke = tittel.parentElement?.querySelector("a");
      expect(lenke).toHaveAttribute(
        "href",
        `/samarbeid/${samarbeid.offentligId}`,
      );
    }
  });

  it("Kaller sendOppgaveStatusEvent ved statusendring på oppgave", async () => {
    render(
      <Forside
        sykefraværsstatistikkUrl="sykefraværsstatistikkUrl"
        kontaktOssUrl="kontaktOssUrl"
        kjørerMockApp={false}
      />,
    );

    expect(sendOppgaveStatusEvent).not.toHaveBeenCalled();
    const aktivitetAccordion = screen.getByText(
      "Bli gode på å tilrettelegge for ansatte",
    );
    act(() => aktivitetAccordion.click());
    const parent = aktivitetAccordion.closest("div") as HTMLElement;

    const oppgave = within(parent).getByText(
      "Oppgave: Kunnskap om tilrettelegging",
    ).parentElement?.parentElement as HTMLElement;

    const startknapp = within(oppgave)
      .getAllByText("Start")[0]
      .closest("button") as HTMLButtonElement;
    act(() => startknapp.click());
    expect(sendOppgaveStatusEvent).toHaveBeenCalledTimes(1);
    expect(sendOppgaveStatusEvent).toHaveBeenCalledWith(
      "STARTET",
      "Oppgave: Kunnskap om tilrettelegging",
    );
    await waitFor(() => {
      expect(
        within(oppgave).getAllByText("Fullfør")[0].closest("button"),
      ).toBeInTheDocument();
    });

    const fullførknapp = within(oppgave)
      .getAllByText("Fullfør")[0]
      .closest("button") as HTMLButtonElement;
    act(() => fullførknapp.click());
    expect(sendOppgaveStatusEvent).toHaveBeenCalledTimes(2);
    expect(sendOppgaveStatusEvent).toHaveBeenCalledWith(
      "FULLFØRT",
      "Oppgave: Kunnskap om tilrettelegging",
    );
    await waitFor(() => {
      expect(
        within(oppgave).getAllByText("Tilbakestill")[0].closest("button"),
      ).toBeInTheDocument();
    });
  });

  it("Kaller sendNavigereEvent for lenkeklikk i øvelser og verktøy", async () => {
    render(
      <Forside
        sykefraværsstatistikkUrl="sykefraværsstatistikkUrl"
        kontaktOssUrl="kontaktOssUrl"
        kjørerMockApp={false}
      />,
    );

    expect(sendNavigereEvent).not.toHaveBeenCalled();
    const aktivitetAccordion = screen.getByText(
      "Bruk egen sykefraværstatistikk aktivt",
    );
    act(() => aktivitetAccordion.click());
    const parent = aktivitetAccordion.closest("div") as HTMLElement;
    act(() =>
      within(parent)
        .getByText(
          "NAV har oversikt over ditt og bransjens legemeldte korttidsfravær.",
        )
        .click(),
    );
    expect(sendNavigereEvent).toHaveBeenCalledTimes(1);
    expect(sendNavigereEvent).toHaveBeenCalledWith(
      "NAV har oversikt over ditt og bransjens legemeldte korttidsfravær.",
      "https://arbeidsgiver.nav.no/sykefravarsstatistikk/",
    );
  });
});
