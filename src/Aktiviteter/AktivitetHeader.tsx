import { ProgressBar } from "../ProgressBar/ProgressBar";
import { getAktivitetStatusBeskrivelseTekst } from "./Aktivitetsmal/AktivitetsstatusBeskrivelse";
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
