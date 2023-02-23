import { FunctionComponent, ReactNode } from "react";
import styles from "./Infographic.module.scss";
import { InfographicFlis } from "./InfographicFlis/InfographicFlis";
import { useOrgnr } from "../../hooks/useOrgnr";
import { useMobileVersion } from "../../hooks/useMobileVersion";
import { InngangTilSykefraværsstatistikk } from "./InngangTilSykefraværsstatistikk";
import { BodyLong, Detail, Heading, Label } from "@navikt/ds-react";
import { leggTilBedriftPåUrl } from "../../utils/navigasjon";

const SYKEFRAVÆRSSTATISTIKK_URL =
  process.env.NEXT_PUBLIC__SYKEFRAVARSSTATISTIKK_URL || "#";

export interface InfographicData {
  fraværsprosentNorge?: string;
  fraværsprosentBransjeEllerNæring?: string;
  stigningstallTrendBransjeEllerNæring: number;
  bransjeEllerNæring: "bransje" | "næring";
  bransjeEllerNæringLabel?: string;
}

export const Infographic: FunctionComponent<
  InfographicData & {
    nedlastingPågår: boolean;
  }
> = (props) => {
  const orgnr = useOrgnr();
  const usingMobileVersion = useMobileVersion();
  const sykefraværsstatistikkUrlMedBedrift = leggTilBedriftPåUrl(
    SYKEFRAVÆRSSTATISTIKK_URL,
    orgnr
  );

  return (
    <div className={styles.infographicWrapper}>
      <div className={styles.infographicContent__wrapper}>
        <Heading size={"medium"} level={"2"}>
          Sykefraværsstatistikk siste 12 måneder
        </Heading>
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
                  <BodyLong
                    className={styles.infographicFlisOversikt}
                    size={"small"}
                  >
                    Vanligste diagnose i Norge
                  </BodyLong>
                  <Label style={{ textAlign: "center" }}>
                    Muskel og skjelett
                  </Label>
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
      </div>
      <InngangTilSykefraværsstatistikk
        sykefravarsstatistikkUrl={sykefraværsstatistikkUrlMedBedrift}
        useMobileVersion={usingMobileVersion}
      />
    </div>
  );
};

function displaytekstSykefraværNorge(prosent: string | undefined) {
  return (
    <>
      <Detail>I Norge</Detail>
      <Label>{prosent ?? "- "}%</Label>
    </>
  );
}

const displaytekstSykefraværBransjeEllerNæring = (
  data: InfographicData
): ReactNode => {
  if (data.fraværsprosentBransjeEllerNæring) {
    return (
      <>
        <Detail>I {data.bransjeEllerNæring}</Detail>
        <Label>{data.fraværsprosentBransjeEllerNæring}%</Label>
      </>
    );
  } else {
    return `Vi mangler data til beregning av sykefraværet i din ${data.bransjeEllerNæring}`;
  }
};

const displaytekstTrendBransjeEllerNæring = (
  props: InfographicData
): ReactNode => {
  const stigningstall = props.stigningstallTrendBransjeEllerNæring;
  // Hack for å få skjermleser til å oppføre seg korrekt:
  if (isFinite(stigningstall)) {
    return (
      <>
        Trend i bransjen
        <br />
        <b>Fravær {stigningstallTilTekst(stigningstall)}</b>
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
