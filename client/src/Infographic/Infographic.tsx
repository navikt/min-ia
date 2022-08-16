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
import {
  Statistikkategori,
  StatistikkDto,
} from "../integrasjoner/aggregert-statistikk-api";

export interface InfographicData {
  fraværsprosentNorge: StatistikkDto | undefined;
  fraværsprosentBransjeEllerNæring: StatistikkDto | undefined;
  trendBransjeEllerNæring: StatistikkDto | undefined;

  nedlastingPågår?: boolean;
}

export const Infographic: FunctionComponent<InfographicData> = (data) => {
  const ikonstorrelse = { width: "50px", height: "50px" };
  const orgnr = useOrgnr();
  const miljø = getMiljø();
  const windowSize = useWindowSize();

  const [sykefravarsstatistikkUrl, setSykefravarsstatistikkUrl] = useState("#");
  const screenSmAsNumeric = parseInt(styles.screenSm.replace(/\D/g, ""));

  const bransjeEllerNæring =
    data.fraværsprosentBransjeEllerNæring?.statistikkategori ===
    Statistikkategori.BRANSJE
      ? "bransje"
      : "næring";

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
        innhold={innholdSykefraværNorge(data)}
        nedlastingPågår={data.nedlastingPågår}
      />

      <InfographicFlis
        ikon={<Bag {...ikonstorrelse} />}
        innhold={innholdProsentBransjeEllerNæring(data, bransjeEllerNæring)}
        nedlastingPågår={data.nedlastingPågår}
      />

      <InfographicFlis
        ikon={<HealthCase {...ikonstorrelse} />}
        innhold={
          <>
            Vanligste årsak til sykemelding i Norge er:{" "}
            <b>muskel- og skjelettplager</b>
          </>
        }
        nedlastingPågår={data.nedlastingPågår}
      />

      <InfographicFlis
        ikon={
          <Up
            className={roterTrendpil(
              Number(data.trendBransjeEllerNæring?.verdi)
            )}
            {...ikonstorrelse}
          />
        }
        innhold={innholdTrendBransjeEllerNæring(
          Number(data.trendBransjeEllerNæring?.verdi),
          bransjeEllerNæring
        )}
        nedlastingPågår={data.nedlastingPågår}
      />

      <DesktopEllerMobilVersjon />
      {windowSize.width !== undefined &&
        windowSize.width > screenSmAsNumeric && (
          <InfoModal
            bransjeEllerNæring={bransjeEllerNæring}
            bransjeEllerNæringLabel={data.trendBransjeEllerNæring?.label}
          />
        )}
    </div>
  );
};

function innholdSykefraværNorge(data: InfographicData) {
  return (
    <>
      Sykefraværet i Norge de siste tolv månedene er:{" "}
      <b>{data.fraværsprosentNorge?.verdi ?? "- "}%</b>
    </>
  );
}

const innholdProsentBransjeEllerNæring = (
  data: InfographicData,
  bransjeEllerNæring: "bransje" | "næring"
): ReactNode => {
  const sykefravær = data.fraværsprosentBransjeEllerNæring?.verdi;
  if (sykefravær) {
    return (
      <>
        Sykefraværet i din {bransjeEllerNæring} de siste tolv månedene er:{" "}
        <b>{sykefravær}%</b>
      </>
    );
  } else {
    return `Vi mangler data til beregning av sykefraværet i din ${bransjeEllerNæring}`;
  }
};

const innholdTrendBransjeEllerNæring = (
  stigningstall: number | typeof NaN,
  bransjeEllerNæring: "bransje" | "næring"
): ReactNode => {
  if (isFinite(stigningstall)) {
    return (
      <>
        Sykefraværet er <b>{stigningstallTilTekst(stigningstall)}</b> i din{" "}
        {bransjeEllerNæring}
      </>
    );
  } else {
    return `Vi mangler data til å kunne beregne utviklingen i sykefraværet i din ${bransjeEllerNæring}`;
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
