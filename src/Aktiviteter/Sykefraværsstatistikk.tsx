import { Loader } from "@navikt/ds-react";
import styles from "./Sykefraværsstatistikk.module.scss";
import { useSykefraværsstatistikkForAktivitet } from "./context/aktivitetStatus";
import { StatistikkPanel } from "./StatistikkPanel";
import {
  StatistikkDto,
  Statistikkategori,
} from "../integrasjoner/aggregert-statistikk-api";

export const Sykefraværsstatistikk = () => {
  const sykefraværsstatistikk = useSykefraværsstatistikkForAktivitet();

  const sykefraværIVirksomhet = finnStatistikkVerdi(
    Statistikkategori.VIRKSOMHET,
    sykefraværsstatistikk?.prosentSiste4KvartalerTotalt
  );
  const sykefraværIBransje = finnStatistikkVerdi(
    Statistikkategori.BRANSJE,
    sykefraværsstatistikk?.prosentSiste4KvartalerTotalt
  );
  const trendIVirksomhet = finnStatistikkVerdi(
    Statistikkategori.VIRKSOMHET,
    sykefraværsstatistikk?.trendTotalt
  );
  const trendIBransje = finnStatistikkVerdi(
    Statistikkategori.BRANSJE,
    sykefraværsstatistikk?.trendTotalt
  );

  return sykefraværsstatistikk ? (
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
              (s) => s.statistikkategori === "BRANSJE"
            )?.label ?? "Din bransje"
          }
        />
      )}
    </div>
  ) : (
    <Loader variant="interaction" />
  );
};

const finnStatistikkVerdi = (
  kategori: Statistikkategori,
  liste?: StatistikkDto[]
): string | undefined => {
  return liste?.find((e) => e.statistikkategori === kategori)?.verdi;
};
