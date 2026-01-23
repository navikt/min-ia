import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { useSykefraværsstatistikkForAktivitet } from "./context/aktivitetStatus";
import { StatistikkPanel } from "./StatistikkPanel";
import {
  StatistikkDto,
  Statistikkategori,
} from "../integrasjoner/aggregert-statistikk-api";
import styles from "./Aktiviteter.module.scss";

export default function DeresSykefraværsstatistikkBransje() {
  const sykefraværsstatistikk = useSykefraværsstatistikkForAktivitet();

  const sykefraværIVirksomhet = finnStatistikkVerdi(
    Statistikkategori.VIRKSOMHET,
    sykefraværsstatistikk?.prosentSiste4KvartalerTotalt,
  );
  const sykefraværIBransje = finnStatistikkVerdi(
    Statistikkategori.BRANSJE,
    sykefraværsstatistikk?.prosentSiste4KvartalerTotalt,
  );
  const trendIVirksomhet = finnStatistikkVerdi(
    Statistikkategori.VIRKSOMHET,
    sykefraværsstatistikk?.trendTotalt,
  );
  const trendIBransje = finnStatistikkVerdi(
    Statistikkategori.BRANSJE,
    sykefraværsstatistikk?.trendTotalt,
  );
  if (sykefraværsstatistikk && sykefraværIVirksomhet) {
    return (
      <div className={styles.infoboks}>
        <Heading level="4" size="medium">
          Deres sykefraværstatistikk sammenlignet med bransjen
        </Heading>
        <div className={styles.statistikkContainer}>
          {sykefraværIVirksomhet && (
            <StatistikkPanel
              tittel={"Sykefravær hos deg"}
              trend={trendIVirksomhet}
              sykefravær={sykefraværIVirksomhet}
              tooltip={"Din bedrift"}
            />
          )}
          {sykefraværIBransje && (
            <StatistikkPanel
              tittel={"Sykefravær i bransje"}
              trend={trendIBransje}
              sykefravær={sykefraværIBransje}
              tooltip={
                sykefraværsstatistikk.prosentSiste4KvartalerTotalt?.find(
                  (s) => s.statistikkategori === "BRANSJE",
                )?.label ?? "Din bransje"
              }
            />
          )}
        </div>
        <BodyLong spacing>
          Tolkning av egne tall øker i verdi når du vet hvordan det ser ut hos
          andre.
        </BodyLong>
        <Link
          href="/forebygge-fravar/sykefravarsstatistikk#historikk"
          className={styles.lenke}
        >
          Se sykefravær over tid
        </Link>
      </div>
    );
  }
  return null;
}

const finnStatistikkVerdi = (
  kategori: Statistikkategori,
  liste?: StatistikkDto[],
): string | undefined => {
  return liste?.find((e) => e.statistikkategori === kategori)?.verdi;
};
