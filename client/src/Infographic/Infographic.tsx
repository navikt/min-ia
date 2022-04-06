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
  nedlastingPågår?: boolean;
}

export const Infographic: FunctionComponent<InfographicData> = ({
  sykefraværNorge,
  sykefraværBransje,
  sykefraværNæring,
  trendStigningstall,
    nedlastingPågår
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
        tekst={"Sykefraværsprosenten i Norge det siste kvartalet er: "}
        verdi={sykefraværNorge + "%"}
        nedlastingPågår={nedlastingPågår}
      />

      <InfographicFlis
        ikon={<Bag {...ikonstorrelse} />}
        tekst={`Sykefraværsprosenten i din ${bransjeEllerNæring} det siste kvartalet er: `}
        verdi={(sykefraværBransje ?? sykefraværNæring) + "%"}
        nedlastingPågår={nedlastingPågår}
      />

      <InfographicFlis
        ikon={<HealthCase {...ikonstorrelse} />}
        tekst={"Vanligste årsak til sykemelding i Norge er: "}
        verdi={"Muskel- og skjelettplager"}
        nedlastingPågår={nedlastingPågår}
      />

      <InfographicFlis
        ikon={
          <Up
            className={roterTrendpil(stigningstallTilTekst(trendStigningstall))}
            {...ikonstorrelse}
          />
        }
        tekst={`Sykefraværet i din ${bransjeEllerNæring} de to siste kvartalene er `}
        verdi={stigningstallTilTekst(trendStigningstall)}
        nedlastingPågår={nedlastingPågår}
      />

      <BodyLong className={styles.oversiktTekst} size="medium">
        Trenger du en større oversikt?{" "}
        <Link href={sykefravarsstatistikkUrl}>
          Klikk her for å gå til statistikksiden.
        </Link>
      </BodyLong>
      <div className={styles.hjelpetekstWrapper}>
        <HelpText title="Hvor kommer tallene fra?" strategy={"fixed"}>
          For flere definisjoner gå til sykefraværsstatistikk.
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
