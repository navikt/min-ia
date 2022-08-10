import { FunctionComponent, useEffect, useState } from "react";
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
import { StatistikkDto } from "../integrasjoner/aggregert-statistikk-api";

export interface InfographicData {
  sykefraværNorge: StatistikkDto | undefined;
  sykefraværBransje: StatistikkDto | undefined;
  sykefraværNæring: StatistikkDto | undefined;
  trendBransje: StatistikkDto | undefined;
  trendNæring: StatistikkDto | undefined;

  nedlastingPågår?: boolean;
}

export const Infographic: FunctionComponent<InfographicData> = (data) => {
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

  const sykefraværBransjeEllerNæringTypetekst = data.sykefraværBransje
    ? "bransje"
    : "næring";
  const sykefraværBransjeEllerNæring =
    data.sykefraværBransje ?? data.sykefraværNæring;

  const trendBransjeEllerNæringTypetekst = data.trendBransje
    ? "bransje"
    : "næring";
  const trendBransjeEllerNæring = data.trendBransje ?? data.trendNæring;

  return (
    <div className={styles.infographicWrapper}>
      <InfographicFlis
        ikon={<NorwegianFlag {...ikonstorrelse} />}
        tekst={"Sykefraværsprosenten i Norge det siste kvartalet er: "}
        verdi={data.sykefraværNorge?.verdi + "%"}
        nedlastingPågår={data.nedlastingPågår}
      />

      <InfographicFlis
        ikon={<Bag {...ikonstorrelse} />}
        tekst={`Sykefraværsprosenten i din ${sykefraværBransjeEllerNæringTypetekst} det siste kvartalet er: `}
        verdi={sykefraværBransjeEllerNæring?.verdi + "%"}
        nedlastingPågår={data.nedlastingPågår}
      />

      <InfographicFlis
        ikon={<HealthCase {...ikonstorrelse} />}
        tekst={"Vanligste årsak til sykemelding i Norge er: "}
        verdi={"Muskel- og skjelettplager"}
        nedlastingPågår={data.nedlastingPågår}
      />

      <InfographicFlis
        ikon={
          <Up
            className={roterTrendpil(
              stigningstallTilTekst(trendBransjeEllerNæring?.verdi)
            )}
            {...ikonstorrelse}
          />
        }
        tekst={`Sykefraværet i din ${trendBransjeEllerNæringTypetekst} de to siste kvartalene er `}
        verdi={stigningstallTilTekst(trendBransjeEllerNæring?.verdi)}
        nedlastingPågår={data.nedlastingPågår}
      />

      <DesktopEllerMobilVersjon />
      {windowSize.width !== undefined &&
        windowSize.width > screenSmAsNumeric && (
          <InfoModal
            bransjeEllerNæring={trendBransjeEllerNæringTypetekst}
            bransjeEllerNæringLabel={trendBransjeEllerNæring?.label}
          />
        )}
    </div>
  );
};

function roterTrendpil(a: string) {
  switch (a) {
    case "stigende":
      return styles.rotateOpp;
    case "synkende":
      return styles.rotateNed;
    default:
      return styles.rotateUendret;
  }
}

function stigningstallTilTekst(stigning: number | undefined): string {
  if (stigning === undefined) {
    return "-";
  } else if (stigning > 0) {
    return "stigende";
  } else if (stigning < 0) {
    return "synkende";
  } else {
    return "uendret";
  }
}
