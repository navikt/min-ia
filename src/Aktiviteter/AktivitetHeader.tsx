import { ProgressBar } from "../ProgressBar/ProgressBar";
import { AktivitetStatistikkType } from "./typer";

import styles from "./Aktiviteter.module.scss";
import { AktivitetType } from "./AktivitetData";

export const AktivitetHeader = ({
  aktivitet,
  aktivitetStatistikk,
}: {
  aktivitet: AktivitetType;
  aktivitetStatistikk: AktivitetStatistikkType;
}) => {
  return (
    <>
      {aktivitet.tittel}
      <ProgressBar
        max={aktivitetStatistikk.totalt}
        value={aktivitetStatistikk.ferdige}
        partial={aktivitetStatistikk.påbegynte}
        title={getAktivitetStatusBeskrivelseTekst(aktivitetStatistikk)}
        navn={aktivitet.tittel}
        className={styles["aktivitet-header-progress-bar"]}
      />
    </>
  );
};

export function getAktivitetStatusBeskrivelseTekst(
  aktivitetStatistikk: AktivitetStatistikkType
) {
  if (aktivitetStatistikk.totalt === aktivitetStatistikk.ferdige) {
    return "Alle oppgaver i denne seksjonen er ferdigstilt.";
  }

  if (
    aktivitetStatistikk.ferdige === 0 &&
    aktivitetStatistikk.påbegynte === 0
  ) {
    return "Ingen oppgaver i denne seksjonen er påbegynt.";
  }

  return `${aktivitetStatistikk.ferdige} oppgave${
    aktivitetStatistikk.ferdige === 1 ? "" : "r"
  } ferdig og ${aktivitetStatistikk.påbegynte} påbegynt av ${
    aktivitetStatistikk.totalt
  } tilgjengelige oppgaver.`;
}
