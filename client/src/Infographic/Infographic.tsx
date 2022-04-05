import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Infographic.module.scss";
import { InfographicFlis } from "../InfographicFlis/InfographicFlis";
import { Bag, HealthCase, NorwegianFlag, Up } from "@navikt/ds-icons";
import { BodyLong, HelpText, Link } from "@navikt/ds-react";
import { useOrgnr } from "../hooks/useOrgnr";
import { getMiljø } from "../utils/miljøUtils";
import {
  Applikasjon,
  getUrlForApplikasjon,
  utledUrlForBedrift,
} from "../utils/urlUtils";

export type MuligSykefravær = number | null | undefined;
export type MuligTall = number | undefined;

export interface InfographicData {
  sykefraværNorge: MuligSykefravær;
  sykefraværBransje: MuligSykefravær;
  sykefraværNæring: MuligSykefravær;
  trendStigningstall: MuligTall;
}

export const Infographic: FunctionComponent<InfographicData> = ({
  sykefraværNorge,
  sykefraværBransje,
  sykefraværNæring,
  trendStigningstall,
}) => {
  const ikonstorrelse = { width: "50px", height: "50px" };
  const orgnr = useOrgnr();
  const miljø = getMiljø();

  const [sykefravarsstatistikkUrl, setSykefravarsstatistikkUrl] = useState("#");

  useEffect(() => {
    setSykefravarsstatistikkUrl(
      utledUrlForBedrift(
        getUrlForApplikasjon(Applikasjon.Sykefraværsstatistikk, miljø),
        orgnr
      )
    );
  }, [orgnr, miljø]);

  const bransjeEllerNæring = sykefraværBransje ? "bransje" : "næring";

  return (
    <div className={styles.infographicWrapper}>
      <InfographicFlis
        ikon={<NorwegianFlag {...ikonstorrelse} />}
        tekst={"Sykefraværsprosenten i Norge akkurat nå er: "}
        verdi={sykefraværNorge + "%"}
      />

      <InfographicFlis
        ikon={<Bag {...ikonstorrelse} />}
        tekst={`Sykefraværsprosenten i din ${bransjeEllerNæring} akkurat nå er: `}
        verdi={(sykefraværBransje ?? sykefraværNæring) + "%"}
      />

      <InfographicFlis
        ikon={<HealthCase {...ikonstorrelse} />}
        tekst={"Vanligste årsak til sykemelding i Norge er: "}
        verdi={"Muskel- og skjelettplager"}
      />

      <InfographicFlis
        ikon={
          <Up
            className={roterTrendpil(stigningstallTilTekst(trendStigningstall))}
            {...ikonstorrelse}
          />
        }
        tekst={`Sykefraværet i din ${bransjeEllerNæring} akkurat nå er `}
        verdi={stigningstallTilTekst(trendStigningstall)}
      />

      <BodyLong className={styles.oversiktTekst} size="medium">
          Trenger du en større oversikt?{" "}
        <Link href={sykefravarsstatistikkUrl}>Klikk her for å gå til tatistikksiden.</Link>
      </BodyLong>
      <div className={styles.hjelpetekstWrapper}>
        <HelpText title="Hvor kommer tallene fra?" strategy={'fixed'}>
          Tallene viser de siste tilgjengelige 12 månedene. For flere
          definisjoner gå til sykefraværsstatistikk.
        </HelpText>
      </div>
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

function stigningstallTilTekst(stigning: MuligTall): string {
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
