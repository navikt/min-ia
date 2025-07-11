import { ReactNode } from "react";
import { useOrgnr } from "../../hooks/useOrgnr";
import styles from "./sykefraværsstatistikk.module.scss";
import { Bleed, BodyShort, Button, Heading, HStack, Link, Page, VStack } from "@navikt/ds-react";
import { InfographicFlis } from "../../komponenter/Infographic/InfographicFlis/InfographicFlis";
import { RestStatus } from "../../integrasjoner/rest-status";
import { RestAltinnOrganisasjoner } from "../../integrasjoner/altinnorganisasjon-api";
import { useAltinnOrganisasjonerMedStatistikktilgang } from "../../hooks/useAltinnOrganisasjoner";
import { InformationSquareIcon, TrendUpIcon } from "@navikt/aksel-icons";
import { sendNavigereEvent } from "../../utils/analytics/analytics";

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
        <BrukerManglerTilgangTilOrg
          harTilgangTilOrg={harTilgangTilOrg}
          sykefraværsstatistikkUrlMedBedrift={sykefraværsstatistikkUrlMedBedrift}
          organisasjonerHvorBrukerHarStatistikktilgang={organisasjonerHvorBrukerHarStatistikktilgang} />
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
        Laster
      </Button>
    );
  }
  if (harTilgangTilOrg) {
    return (
      <Button
        icon={<TrendUpIcon aria-hidden />}
        as="a"
        role="link"
        target="_blank"
        href={sykefraværsstatistikkUrlMedBedrift}
        onClick={() => sendNavigereEvent("Se din sykefraværsstatistikk", sykefraværsstatistikkUrlMedBedrift.split("?")[0])}>
        Se din sykefraværsstatistikk
      </Button>
    );
  }

  return null;
}

function BrukerManglerTilgangTilOrg({
  harTilgangTilOrg,
  sykefraværsstatistikkUrlMedBedrift,
  organisasjonerHvorBrukerHarStatistikktilgang,
}: {
  harTilgangTilOrg: boolean;
  sykefraværsstatistikkUrlMedBedrift: string;
  organisasjonerHvorBrukerHarStatistikktilgang: RestAltinnOrganisasjoner;
}) {
  if (organisasjonerHvorBrukerHarStatistikktilgang.status !== RestStatus.LasterInn && !harTilgangTilOrg) {
    return (
      <BodyShort weight="semibold">
        <InformationSquareIcon aria-hidden fontSize="1.75rem" className={styles['info-ikon']} /> Du mangler tilgang i Altinn for å kunne se tall for denne virksomheten. <Link href={sykefraværsstatistikkUrlMedBedrift}>Les mer om tilgang til sykefraværsstatistikk</Link>
      </BodyShort>
    );
  }
  return null;
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
