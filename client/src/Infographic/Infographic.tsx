import { FunctionComponent } from "react";
import {
  KvartalsvisSykefraværshistorikk,
  KvartalsvisSykefraværsprosent,
  SykefraværshistorikkType,
} from "../integrasjoner/kvartalsvis-sykefraværshistorikk-api";
import styles from "./Infographic.module.scss";
import { InfographicSnippet } from "../InfographicSnippet/InfographicSnippet";
import { NorwegianFlag } from "@navikt/ds-icons";
import { Bag } from "@navikt/ds-icons";
import { HealthCase } from "@navikt/ds-icons";
import { Up } from "@navikt/ds-icons";
import { BodyLong, Link } from "@navikt/ds-react";

export interface InfographicData {
  sykefraværNorge: number | null | undefined,
  sykefraværNæring: number | null | undefined,
  trendStigningstall: number | undefined,
}

export const Infographic: FunctionComponent<{
  data: InfographicData;
}> = ({ data }) => {
  const ikonstorrelse = { width: '50px', height: '50px' };

  let trendSomTekst = stigningskurveTilTekst(data.trendStigningstall);

  return (
    <div className={styles.infographicWrapper}>
      <InfographicSnippet
        ikon={<NorwegianFlag {...ikonstorrelse} />}
        tekst={"Sykefraværsprosenten i Norge akkurat nå er: "}
        verdi={data.sykefraværNorge + "%"}
      />

      <InfographicSnippet
        ikon={<Bag {...ikonstorrelse} />}
        tekst={"Sykefraværsprosenten i din bransje akkurat nå er: "}
        verdi={data.sykefraværNæring + "%"}
      />

      <InfographicSnippet
        ikon={<HealthCase {...ikonstorrelse} />}
        tekst={"Vanligste årsak til sykemelding i Norge er: "}
        verdi={"Muskel- og skjelettplager"}
      />

      <InfographicSnippet
        ikon={<Up {...ikonstorrelse} />}
        tekst={"Sykefraværet i din bransje akkurat nå er "}
        verdi={trendSomTekst}
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



function stigningskurveTilTekst(stigning: number | undefined): string {
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
