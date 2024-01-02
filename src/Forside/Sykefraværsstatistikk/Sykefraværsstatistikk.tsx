import { ReactNode } from "react";
import { useOrgnr } from "../../hooks/useOrgnr";
import styles from "./sykefraværsstatistikk.module.scss";
import { Detail, Heading, Label, Loader } from "@navikt/ds-react";
import { InfographicFlis } from "../../komponenter/Infographic/InfographicFlis/InfographicFlis";
import { Lenkeflis } from "../../Lenkeflis/Lenkeflis";
import { DataFilled } from "@navikt/ds-icons";
import "./sykefraværsstatistikk.module.scss";
import { RestStatus } from "../../integrasjoner/rest-status";
import { RestAltinnOrganisasjoner } from "../../integrasjoner/altinnorganisasjon-api";
import { useAltinnOrganisasjonerMedStatistikktilgang } from "../../hooks/useAltinnOrganisasjoner";

export interface SykefraværsstatistikkData {
  fraværsprosentNorge?: string;
  fraværsprosentBransjeEllerNæring?: string;
  stigningstallTrendBransjeEllerNæring: number;
  bransjeEllerNæring: "bransje";
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

  return (
    <div className={styles.sykefraværsstatistikk}>
      <Heading size={"large"} level={"2"}>
        Sykefraværsstatistikk
      </Heading>
      <div className={styles.infographicContent__wrapper}>
        <div className={styles.infographicContent}>
          <div className={styles.infographicRad}>
            <InfographicFlis
              innhold={displaytekstSykefraværNorge(props.fraværsprosentNorge)}
              nedlastingPågår={props.nedlastingPågår}
            />

            <InfographicFlis
              innhold={displaytekstSykefraværBransjeEllerNæring(props)}
              nedlastingPågår={props.nedlastingPågår}
            />
          </div>

          <div className={styles.infographicRad}>
            <VirksomhetInfographicFlis
              fraværsprosentVirksomhet={props.fraværsprosentVirksomhet}
              nedlastingPågår={props.nedlastingPågår}
            />
            <InfographicFlis
              fullBredde={brukerManglerTilgangTilOrg}
              innhold={displaytekstTrendBransjeEllerNæring(props)}
              nedlastingPågår={props.nedlastingPågår}
            />
          </div>
        </div>
        <Sykefraværsstatistikkinnhold
          harTilgangTilOrg={
            (orgnr &&
              organisasjonerHvorBrukerHarStatistikktilgang.status ===
                RestStatus.Suksess &&
              organisasjonerHvorBrukerHarStatistikktilgang.data
                .map((org) => org.OrganizationNumber)
                .includes(orgnr)) ||
            false
          }
          sykefraværsstatistikkUrlMedBedrift={
            sykefraværsstatistikkUrlMedBedrift
          }
          organisasjonerHvorBrukerHarStatistikktilgang={
            organisasjonerHvorBrukerHarStatistikktilgang
          }
        />
      </div>
    </div>
  );
};

function VirksomhetInfographicFlis({
  fraværsprosentVirksomhet,
  nedlastingPågår,
}: {
  fraværsprosentVirksomhet: string;
  nedlastingPågår: boolean;
}) {
  if (fraværsprosentVirksomhet.length) {
    return (
      <InfographicFlis
        innhold={
          <>
            <Detail uppercase={true}>I din virksomhet siste 12 MND</Detail>
            <Label>{fraværsprosentVirksomhet}%</Label>
          </>
        }
        nedlastingPågår={nedlastingPågår}
      />
    );
  }

  return null;
}

const SOFT_HYPHEN = String.fromCharCode(173);

function Sykefraværsstatistikkinnhold({
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
    return <Lenkeflis overskrift="Laster..." ikon={<Loader />} />;
  }

  if (harTilgangTilOrg) {
    return (
      <Lenkeflis
        overskrift={`Sykefraværs${SOFT_HYPHEN}statistikken`}
        href={sykefraværsstatistikkUrlMedBedrift}
        ikon={<DataFilled aria-hidden />}
      />
    );
  }

  return (
    <Lenkeflis
      overskrift="Be om tilgang"
      brødtekst="Klikk her for å be om tilgang for å se denne virksomhetens sykefraværsstatistikk."
      href={sykefraværsstatistikkUrlMedBedrift}
    />
  );
}

function displaytekstSykefraværNorge(prosent: string | undefined) {
  return (
    <>
      <Detail uppercase={true}>I Norge siste 12 mnd</Detail>
      <Label>{prosent ?? "- "}%</Label>
    </>
  );
}

const displaytekstSykefraværBransjeEllerNæring = (
  data: SykefraværsstatistikkData
): ReactNode => {
  if (data.fraværsprosentBransjeEllerNæring) {
    return (
      <>
        <Detail uppercase={true}>
          I {data.bransjeEllerNæring} siste 12 mnd
        </Detail>
        <Label>{data.fraværsprosentBransjeEllerNæring}%</Label>
      </>
    );
  } else {
    return `Vi mangler data til beregning av sykefraværet i din ${data.bransjeEllerNæring}`;
  }
};
const displaytekstTrendBransjeEllerNæring = (
  props: SykefraværsstatistikkData
): ReactNode => {
  const stigningstall = props.stigningstallTrendBransjeEllerNæring;
  // Hack for å få skjermleser til å oppføre seg korrekt:
  if (isFinite(stigningstall)) {
    return (
      <>
        <Detail uppercase={true}>Trend i bransjen</Detail>
        <Label>Fravær {stigningstallTilTekst(stigningstall)}</Label>
      </>
    );
  } else {
    return `Vi mangler data til å kunne beregne utviklingen i sykefraværet i din ${props.bransjeEllerNæring}`;
  }
};

function stigningstallTilTekst(stigning: number): string {
  if (stigning > 0) {
    return "stiger";
  } else if (stigning < 0) {
    return "synker";
  } else {
    return "er uendret";
  }
}
