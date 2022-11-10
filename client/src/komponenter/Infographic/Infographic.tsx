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
  const ikonstorrelse = { width: "50px", height: "50px" };
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
      <InfographicFlis
        ikon={<NorwegianFlag {...ikonstorrelse} />}
        innhold={displaytekstSykefraværNorge(props.fraværsprosentNorge)}
        nedlastingPågår={props.nedlastingPågår}
      />

      <InfographicFlis
        ikon={<Bag {...ikonstorrelse} />}
        innhold={displaytekstSykefraværBransjeEllerNæring(props)}
        nedlastingPågår={props.nedlastingPågår}
      />

      <InfographicFlis
        ikon={<HealthCase {...ikonstorrelse} />}
        innhold={
          <>
            Vanligste årsak til sykemelding i Norge er:{" "}
            <b>muskel- og skjelettplager</b>
          </>
        }
        nedlastingPågår={props.nedlastingPågår}
      />

      <InfographicFlis
        ikon={
          <Up
            className={roterTrendpil(
              props.stigningstallTrendBransjeEllerNæring
            )}
            {...ikonstorrelse}
          />
        }
        innhold={displaytekstTrendBransjeEllerNæring(props)}
        nedlastingPågår={props.nedlastingPågår}
      />

      <InngangTilSykefraværsstatistikk
        sykefravarsstatistikkUrl={sykefravarsstatistikkUrl}
        useMobileVersion={usingMobileVersion}
      />

      {!usingMobileVersion && (
        <InfoModal
          bransjeEllerNæring={props.bransjeEllerNæring}
          bransjeEllerNæringLabel={props.bransjeEllerNæringLabel}
        />
      )}
    </div>
  );
};

function displaytekstSykefraværNorge(prosent: string | undefined) {
  return (
    <>
      Sykefraværet i Norge de siste tolv månedene er: <b>{prosent ?? "- "}%</b>
    </>
  );
}

const displaytekstSykefraværBransjeEllerNæring = (
  data: InfographicData
): ReactNode => {
  if (data.fraværsprosentBransjeEllerNæring) {
    return (
      <>
        Sykefraværet i din {data.bransjeEllerNæring} de siste tolv månedene er:{" "}
        <b>{data.fraværsprosentBransjeEllerNæring}%</b>
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
  if (isFinite(stigningstall)) {
    return (
      <>
        Sykefraværet er <b>{stigningstallTilTekst(stigningstall)}</b> i din bransje
      </>
    );
  } else {
    return `Vi mangler data til å kunne beregne utviklingen i sykefraværet i din ${props.bransjeEllerNæring}`;
  }
};

function roterTrendpil(stigningstall: number | undefined) {
  if (stigningstall == undefined || stigningstall == 0) {
    return styles.rotateUendret;
  } else if (stigningstall > 0) {
    return styles.rotateOpp;
  } else {
    return styles.rotateNed;
  }
}

function stigningstallTilTekst(stigning: number): string {
  if (stigning > 0) {
    return "stigende";
  } else if (stigning < 0) {
    return "synkende";
  } else {
    return "uendret";
  }
}
