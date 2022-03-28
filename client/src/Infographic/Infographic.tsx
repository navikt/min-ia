import { FunctionComponent } from "react";
import styles from "./Infographic.module.scss";
import { InfographicFlis } from "../InfographicFlis/InfographicFlis";
import { Bag, HealthCase, NorwegianFlag, Up } from "@navikt/ds-icons";
import { BodyLong, Link } from "@navikt/ds-react";

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
  const bransjeEllerNæring = sykefraværBransje ? "bransje" : "næring";

  return (
    <div className={styles.infographicWrapper}>
      <InfographicFlis
        ikon={<NorwegianFlag {...ikonstorrelse} />}
        tekst={"Sykefraværsprosenten i Norge akkurat nå er: "}
        verdi={sykefraværNorge + "%"}
        hjelpetekst={
          "Gjennomsnittlig sykefraværsprosent for hele Norge i siste tilgjengelige kvartal"
        }
      />

      <InfographicFlis
        ikon={<Bag {...ikonstorrelse} />}
        tekst={`Sykefraværsprosenten i din ${bransjeEllerNæring} akkurat nå er: `}
        verdi={(sykefraværBransje ?? sykefraværNæring) + "%"}
        hjelpetekst={`Gjennomsnittlig sykefraværsprosent for din ${bransjeEllerNæring} i siste tilgjengelige kvartal`}
      />

      <InfographicFlis
        ikon={<HealthCase {...ikonstorrelse} />}
        tekst={"Vanligste årsak til sykemelding i Norge er: "}
        verdi={"Muskel- og skjelettplager"}
        hjelpetekst={"Tallene kommer fra Statens Arbeidsmiljøinstitutt (Stami)"}
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
        hjelpetekst={
          "Trenden er regnet ut ved å sammenlikne ditt sykefravær i siste tilgjengelige kvartal med tilsvarende kvartal året før"
        }
      />

      <BodyLong className={styles.oversiktTekst} size="medium">
        Synes du denne informasjonen var bra? På{" "}
        <Link href={"https://arbeidsgiver.nav.no/sykefravarsstatistikk/"}>
          statistikksiden
        </Link>{" "}
        får du oversikt over sykefraværet over tid.
      </BodyLong>
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
