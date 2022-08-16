import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import styles from "./Infographic.module.scss";
import { InfographicFlis } from "../InfographicFlis/InfographicFlis";
import { Bag, HealthCase, NorwegianFlag, Up } from "@navikt/ds-icons";
import { BodyLong } from "@navikt/ds-react";
import { useOrgnr } from "../hooks/useOrgnr";
import { getMiljø } from "../utils/miljøUtils";
import {
  Applikasjon,
  getUrlForApplikasjon,
  utledUrlForBedrift,
} from "../utils/navigasjon";
import { useWindowSize } from "../hooks/useWindowSize";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { StatistikkIkonIkon } from "../Forside/ikoner/StatistikkIkonIkon";
import { LenkeMedEventutsendelse } from "../LenkeMedNavigereEvent/LenkeMedEventutsendelse";
import { InfoModal } from "../komponenter/InfoModal/InfoModal";

export interface InfographicData {
  fraværsprosentNorge: string | undefined;
  fraværsprosentBransjeEllerNæring: string | undefined;
  stigningstallTrendBransjeEllerNæring: number | typeof NaN;
  bransjeEllerNæring: "bransje" | "næring";
  bransjeEllerNæringLabel: string | undefined;

  nedlastingPågår?: boolean;
}

export const Infographic: FunctionComponent<InfographicData> = (props) => {
  const ikonstorrelse = { width: "50px", height: "50px" };
  const orgnr = useOrgnr();
  const miljø = getMiljø();
  const windowSize = useWindowSize();

  const [sykefravarsstatistikkUrl, setSykefravarsstatistikkUrl] = useState("#");
  const screenSmAsNumeric = parseInt(styles.screenSm.replace(/\D/g, ""));

  const DesktopEllerMobilVersjon = () => {
    if (
      windowSize.width === undefined ||
      windowSize.width < screenSmAsNumeric
    ) {
      return (
        <Lenkeflis
          overskrift={"Sykefraværs&shy;statistikk"}
          ikon={<StatistikkIkonIkon />}
          brødtekst={""}
          href={sykefravarsstatistikkUrl}
          fyltoppBakgrunn={true}
        />
      );
    }
    return (
      <BodyLong className={styles.oversiktTekst} size="medium">
        Trenger du en større oversikt?{" "}
        <LenkeMedEventutsendelse
          href={sykefravarsstatistikkUrl}
          lenketekst="Klikk her for å gå til statistikksiden."
        />
      </BodyLong>
    );
  };

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

      <DesktopEllerMobilVersjon />
      {windowSize.width !== undefined &&
        windowSize.width > screenSmAsNumeric && (
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
        Sykefraværet er <b>{stigningstallTilTekst(stigningstall)}</b> i din{" "}
        {props.bransjeEllerNæring}
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
