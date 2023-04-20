import { ReactNode } from "react";
import { useOrgnr } from "../../hooks/useOrgnr";
import { leggTilBedriftPåUrl } from "../../utils/navigasjon";
import styles from "./sykefraværsstatistikk.module.scss";
import { Detail, Heading, Label } from "@navikt/ds-react";
import { InfographicFlis } from "../../komponenter/Infographic/InfographicFlis/InfographicFlis";
import { Lenkeflis } from "../../Lenkeflis/Lenkeflis";
import { DataFilled } from "@navikt/ds-icons";
import "./sykefraværsstatistikk.module.scss";
import { useAltinnOrganisasjonerMedStatistikktilgang } from "../../hooks/useAltinnOrganisasjonerMedStatistikktilgang";
import { RestStatus } from "../../integrasjoner/rest-status";

export interface SykefraværsstatistikkData {
  fraværsprosentNorge?: string;
  fraværsprosentBransjeEllerNæring?: string;
  stigningstallTrendBransjeEllerNæring: number;
  bransjeEllerNæring: "bransje" | "næring";
  bransjeEllerNæringLabel?: string;
}

export interface SykefraværsstatistikkProps extends SykefraværsstatistikkData {
  nedlastingPågår: boolean;
  sykefraværsstatistikkUrl: string;
}

export const Sykefraværsstatistikk = (props: SykefraværsstatistikkProps) => {
  const orgnr = useOrgnr();
  const sykefraværsstatistikkUrlMedBedrift = leggTilBedriftPåUrl(
    props.sykefraværsstatistikkUrl,
    orgnr
  );

  const organisasjonerHvorBrukerHarStatistikktilgang =
    useAltinnOrganisasjonerMedStatistikktilgang();

  function organisasjonslistaInkludererValgtBedrift(orgnr: string) {
    return (
      organisasjonerHvorBrukerHarStatistikktilgang.status ===
        RestStatus.Suksess &&
      organisasjonerHvorBrukerHarStatistikktilgang.data
        .map((org) => org.OrganizationNumber)
        .includes(orgnr)
    );
  }

  const brukerHarIaRettighetTilValgtBedrift = orgnr
    ? organisasjonslistaInkludererValgtBedrift(orgnr)
    : false;

  const sykefraværstatistikk = () => {
    if (brukerHarIaRettighetTilValgtBedrift) {
      return (
        <Lenkeflis
          overskrift={"Sykefraværsstatistikken"}
          href={sykefraværsstatistikkUrlMedBedrift}
          ikon={<DataFilled />}
        />
      );
    } else {
      return (
        <Lenkeflis
          overskrift="Be om tilgang"
          brødtekst="Klikk her for å be om tilgang for å se denne virksomhetens sykefraværsstatistikk."
          href={sykefraværsstatistikkUrlMedBedrift}
        />
      );
    }
  };

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
            <InfographicFlis
              innhold={
                <>
                  <Detail uppercase={true}>Vanligste diagnose i Norge</Detail>
                  <Label>Muskel og skjelett</Label>
                </>
              }
              nedlastingPågår={props.nedlastingPågår}
            />

            <InfographicFlis
              innhold={displaytekstTrendBransjeEllerNæring(props)}
              nedlastingPågår={props.nedlastingPågår}
            />
          </div>
        </div>
        {sykefraværstatistikk()}
      </div>
    </div>
  );
};

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
