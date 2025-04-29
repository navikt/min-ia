import { ReactNode } from "react";
import { useOrgnr } from "../../hooks/useOrgnr";
import styles from "./sykefraværsstatistikk.module.scss";
import { Bleed, BodyShort, Button, Heading, HStack, Page, VStack } from "@navikt/ds-react";
import { InfographicFlis } from "../../komponenter/Infographic/InfographicFlis/InfographicFlis";
import "./sykefraværsstatistikk.module.scss";
import { RestStatus } from "../../integrasjoner/rest-status";
import { RestAltinnOrganisasjoner } from "../../integrasjoner/altinnorganisasjon-api";
import { useAltinnOrganisasjonerMedStatistikktilgang } from "../../hooks/useAltinnOrganisasjoner";
import { TrendUpIcon } from "@navikt/aksel-icons";

export interface SykefraværsstatistikkData {
  fraværsprosentNorge?: string;
  fraværsprosentBransjeEllerNæring?: string;
  stigningstallTrendBransjeEllerNæring: number;
  bransjeEllerNæring: "bransje" | "næring";
  bransjeEllerNæringLabel?: string;
  fraværsprosentVirksomhet: string;
  trendVirksomhet: string;
}

export interface SykefraværsstatistikkProps extends SykefraværsstatistikkData {
  nedlastingPågår: boolean;
  sykefraværsstatistikkUrl: string;
}

export function leggTilBedriftPåUrl(url: string, orgnr?: string) {
  return orgnr ? `${url}?bedrift=${orgnr}` : url;
}

export const Sykefraværsstatistikk = (props: SykefraværsstatistikkProps) => {
  const orgnr = useOrgnr();
  const sykefraværsstatistikkUrlMedBedrift = leggTilBedriftPåUrl(
    props.sykefraværsstatistikkUrl,
    orgnr,
  );

  const organisasjonerHvorBrukerHarStatistikktilgang =
    useAltinnOrganisasjonerMedStatistikktilgang();

  const brukerManglerTilgangTilOrg =
    props.fraværsprosentVirksomhet.length === 0;
  const harTilgangTilOrg = (orgnr &&
    organisasjonerHvorBrukerHarStatistikktilgang.status ===
    RestStatus.Suksess &&
    organisasjonerHvorBrukerHarStatistikktilgang.data
      .map((org) => org.OrganizationNumber)
      .includes(orgnr)) ||
    false;

  return (
    <Bleed style={{ backgroundColor: "white" }}>
      <Page.Block width="xl" className={styles.sykefraværsstatistikk}>
        <HStack justify="space-between" align="start">
          <VStack>
            <Heading size={"large"} level={"2"}>
              Sykefraværsstatistikk
            </Heading>
            <BodyShort>
              Legemeldt sykefravær siste 12 mnd
            </BodyShort>
          </VStack>
          <Sykefraværsstatistikklenke
            harTilgangTilOrg={harTilgangTilOrg}
            sykefraværsstatistikkUrlMedBedrift={sykefraværsstatistikkUrlMedBedrift}
            organisasjonerHvorBrukerHarStatistikktilgang={organisasjonerHvorBrukerHarStatistikktilgang} />
        </HStack>
        <HStack justify="space-between" wrap gap="8">
          {!brukerManglerTilgangTilOrg && <InfographicFlis nedlastingPågår={props.nedlastingPågår} label="I din virksomhet" innhold={`${props.fraværsprosentVirksomhet}%`} />}
          <InfographicFlis nedlastingPågår={props.nedlastingPågår} label="I din bransje" innhold={`${props.fraværsprosentBransjeEllerNæring}%`} />
          <InfographicFlis nedlastingPågår={props.nedlastingPågår} label="I Norge" innhold={`${props.fraværsprosentNorge}%`} />
          <InfographicFlis nedlastingPågår={props.nedlastingPågår} utenLabel innhold={displaytekstTrendBransjeEllerNæring(props)} />
        </HStack>
      </Page.Block>
    </Bleed>
  );
};

function Sykefraværsstatistikklenke({
  harTilgangTilOrg,
  sykefraværsstatistikkUrlMedBedrift,
  organisasjonerHvorBrukerHarStatistikktilgang,
}: {
  harTilgangTilOrg: boolean;
  sykefraværsstatistikkUrlMedBedrift: string;
  organisasjonerHvorBrukerHarStatistikktilgang: RestAltinnOrganisasjoner;
}) {
  if (
    organisasjonerHvorBrukerHarStatistikktilgang.status === RestStatus.LasterInn
  ) {
    return (
      <Button icon={<TrendUpIcon aria-hidden />} as="a" target="_blank" href={sykefraværsstatistikkUrlMedBedrift}>
        Du mangler tilgang i Altinn.
      </Button>
    );
  }
  if (harTilgangTilOrg) {
    return (
      <Button icon={<TrendUpIcon aria-hidden />} as="a" target="_blank" href={sykefraværsstatistikkUrlMedBedrift}>
        Du mangler tilgang i Altinn.
      </Button>
    );
  }

  return (
    <Button icon={<TrendUpIcon aria-hidden />} as="a" target="_blank" href={sykefraværsstatistikkUrlMedBedrift}>
      Du mangler tilgang i Altinn.
    </Button>
  );
}

const displaytekstTrendBransjeEllerNæring = (
  props: SykefraværsstatistikkData
): ReactNode => {
  const stigningstall = props.stigningstallTrendBransjeEllerNæring;
  // Hack for å få skjermleser til å oppføre seg korrekt:
  if (isFinite(stigningstall)) {
    return `Fraværet ${stigningstallTilTekst(stigningstall)} i ${tilBestemtForm(props.bransjeEllerNæring)}`;
  } else {
    return `Vi mangler data til å kunne beregne utviklingen i sykefraværet i din ${props.bransjeEllerNæring}`;
  }
};

function tilBestemtForm(ubestemtForm: "bransje" | "næring"): string {
  if (ubestemtForm === "bransje") {
    return "bransjen";
  } else {
    return "næringen";
  }
}

function stigningstallTilTekst(stigning: number): string {
  if (stigning > 0) {
    return "stiger";
  } else if (stigning < 0) {
    return "synker";
  } else {
    return "er uendret";
  }
}
