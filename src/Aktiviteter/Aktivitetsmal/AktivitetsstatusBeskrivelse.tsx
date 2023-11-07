import styles from "./Aktivitetsmal.module.css";
import { AktivitetStatistikkType } from "../typer";

export function AktivitetsstatusBeskrivelse({
    aktivitetStatistikk,
}: {
    aktivitetStatistikk: AktivitetStatistikkType;
}) {
    if (aktivitetStatistikk.totalt === 0) {
        return null;
    }

    return (
        <div className={styles.aktivitetsstatusBeskrivelse}>
            {getAktivitetStatusBeskrivelseTekst(aktivitetStatistikk)}
        </div>
    );
}

export function getAktivitetStatusBeskrivelseTekst(
    aktivitetStatistikk: AktivitetStatistikkType,
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
