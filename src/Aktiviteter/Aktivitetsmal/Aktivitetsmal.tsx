import { PortableText, PortableTextComponents } from "@portabletext/react";
import { BodyLong, Heading } from "@navikt/ds-react";
import styles from "./Aktivitetsmal.module.css";
import { Seksjon } from "../../Seksjon/Seksjon";
import { Oppgave } from "../../Oppgave/Oppgave";
import { block } from "../../PortableText/block/Block";
import { marks } from "../../PortableText/marks/Marks";
import { Aktivitet } from "../../../types/Aktivitet";
import { AktivitetStatistikkType } from "../useAktivitetStatistikk";
import { AktivitetsstatusBeskrivelse } from "./AktivitetsstatusBeskrivelse";

const hovedinnhold: Partial<PortableTextComponents> = {
    types: {
        seksjon: Seksjon,
        oppgave: Oppgave,
    },
    block,
    marks,
};

interface AktivitetsmalProps {
    aktivitet: Aktivitet;
    aktivitetStatistikk: AktivitetStatistikkType;
}
export function Aktivitetsmal({
    aktivitet,
    aktivitetStatistikk,
}: AktivitetsmalProps) {
    return (
        <div className={styles.container}>
            <AktivitetsstatusBeskrivelse
                aktivitetStatistikk={aktivitetStatistikk}
            />
            <BodyLong size="large">{aktivitet.beskrivelse}</BodyLong>
            <div className={styles.mål}>
                <Heading size="medium" level="4">
                    Mål
                </Heading>
                <BodyLong size="large">{aktivitet.mål}</BodyLong>
            </div>
            <PortableText value={aktivitet.innhold} components={hovedinnhold} />
        </div>
    );
}
