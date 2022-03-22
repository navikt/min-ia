import { FunctionComponent } from "react";
import styles from "./Infographic.module.scss";
import { InfographicFlis } from "../InfographicFlis/InfographicFlis";
import { Bag, HealthCase, NorwegianFlag, Up } from "@navikt/ds-icons";
import { BodyLong, Link } from "@navikt/ds-react";

export interface InfographicData {
  sykefraværNorge: number | null | undefined;
  sykefraværBransje: number | null | undefined;
  sykefraværNæring: number | null | undefined;
  trendStigningstall: number | undefined;
}

export const Infographic: FunctionComponent<InfographicData> = ({
  sykefraværNorge,
  sykefraværBransje,
  sykefraværNæring,
  trendStigningstall,
}) => {
  const ikonstorrelse = { width: "50px", height: "50px" };

  return (
    <div className={styles.infographicWrapper}>
      <InfographicFlis
        ikon={<NorwegianFlag {...ikonstorrelse} />}
        tekst={"Sykefraværsprosenten i Norge akkurat nå er: "}
        verdi={sykefraværNorge + "%"}
      />

      <InfographicFlis
        ikon={<Bag {...ikonstorrelse} />}
        tekst={
          sykefraværBransje
            ? "Sykefraværsprosenten i din bransje akkurat nå er: "
            : "Sykefraværsprosenten i din næring akkurat nå er: "
        }
        verdi={(sykefraværBransje?sykefraværBransje: sykefraværNæring) + "%"}
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
        tekst={
          sykefraværBransje
            ? "Sykefraværet i din bransje akkurat nå er "
            : "Sykefraværet i din næring akkurat nå er "
        }
        verdi={stigningstallTilTekst(trendStigningstall)}
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
