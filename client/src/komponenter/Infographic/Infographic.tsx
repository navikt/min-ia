import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import styles from "./Infographic.module.scss";
import { InfographicFlis } from "./InfographicFlis/InfographicFlis";
import { Bag, HealthCase, NorwegianFlag, Up } from "@navikt/ds-icons";
import { useOrgnr } from "../../hooks/useOrgnr";
import { getMiljø } from "../../utils/miljøUtils";
import {
  Applikasjon,
  getUrlForApplikasjon,
  utledUrlForBedrift,
} from "../../utils/navigasjon";
import { InfoModal } from "./InfoModal/InfoModal";
import { useMobileVersion } from "../../hooks/useMobileVersion";
import { InngangTilSykefraværsstatistikk } from "./InngangTilSykefraværsstatistikk";
import { BodyLong, Detail, Heading, Label } from "@navikt/ds-react";
import { BodyLongSmall } from "@navikt/ds-react/src/typography/typography.stories";

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
  //const ikonstorrelse = {width: "50px", height: "50px"};
  const orgnr = useOrgnr();
  const miljø = getMiljø();
  const usingMobileVersion = useMobileVersion();

  const [sykefravarsstatistikkUrl, setSykefravarsstatistikkUrl] = useState("#");

  useEffect(() => {
    setSykefravarsstatistikkUrl(
      utledUrlForBedrift(
        getUrlForApplikasjon(Applikasjon.Sykefraværsstatistikk, miljø),
        orgnr
      )
    );
  }, [orgnr, miljø]);

  return (
    <div className={styles.infographicWrapper}>
      <Heading size={"medium"} level={"2"}>
        Sykefraværsstatistikk siste 12 måneder
      </Heading>
      <div className={''}>
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
                <BodyLong style={{textAlign:"center"}} size={"small"}>Vanligste diagnose i Norge</BodyLong>
                <Label style={{textAlign:"center"}}>muskel- og skjelettplager</Label>
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
      <InngangTilSykefraværsstatistikk
        sykefravarsstatistikkUrl={sykefravarsstatistikkUrl}
        useMobileVersion={usingMobileVersion}
      />

      {/*{!usingMobileVersion && (
            <InfoModal
                bransjeEllerNæring={props.bransjeEllerNæring}
                bransjeEllerNæringLabel={props.bransjeEllerNæringLabel}
            />
        )}*/}
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
        <Detail> I {data.bransjeEllerNæring} </Detail>
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
