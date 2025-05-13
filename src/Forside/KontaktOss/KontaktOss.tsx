import React from "react";
import { Bleed, BodyShort, Heading, Link, Page } from "@navikt/ds-react";
import styles from "./kontaktOss.module.scss"
import { Chat2Icon, PaperplaneIcon, PersonHeadsetIcon } from "@navikt/aksel-icons";
import { KONTAKTSKJEMA_URL } from "../../utils/konstanter";
import { sendNavigereEvent } from "../../analytics/analytics";

export interface KontaktOssProps {
    kontaktOssUrl: string
}

export default function KontaktOss(props: KontaktOssProps) {
    return (
        <Bleed className={styles.kontaktOss}>
            <Page.Block width="xl" className={styles.kontaktOss__innhold}>
                <Heading size={"large"} level={"2"} className={styles.kontaktOss__tittel}>
                    Kontakt oss
                </Heading>
                <div className={styles.kontaktOss__stack}>
                    <KontaktOssItem
                        tittel="Arbeidsgivertelefonen"
                        brødtekst="Åpent hverdager kl. 9 til 15. Vi kan ringe deg tilbake hvis ventetiden er over 5 min."
                        ikon={<PersonHeadsetIcon aria-hidden />}
                        lenke="tel:+4755553336"
                        lenketekst="55 55 33 36" />
                    <KontaktOssItem
                        tittel="Forebygge fravær"
                        brødtekst="Send inn kontaktskjema hvis du ønsker hjelp til å forebygge og redusere sykefravær."
                        ikon={<PaperplaneIcon aria-hidden />}
                        lenke={KONTAKTSKJEMA_URL}
                        lenketekst="Kontaktskjema" />
                    <KontaktOssItem
                        tittel="Andre alternativer"
                        brødtekst="Se flere alternativer og mer informasjon om hvordan du kan kontakte oss."
                        ikon={<Chat2Icon aria-hidden />}
                        lenke={props.kontaktOssUrl}
                        lenketekst="Kontakt oss" />
                </div>
            </Page.Block>
        </Bleed>
    )
}

function KontaktOssItem({
    tittel,
    brødtekst,
    ikon,
    lenke,
    lenketekst,
}: {
    tittel: string;
    brødtekst: string;
    ikon: React.ReactNode;
    lenke: string;
    lenketekst: string;
}) {
    return (
        <div className={styles.kontaktOssItem}>
            <div className={styles.kontaktOssItem__ikon}>{ikon}</div>
            <div className={styles.kontaktOssItem__innhold}>
                <Heading size={"medium"} level={"3"}>
                    {tittel}
                </Heading>
                <BodyShort>{brødtekst}</BodyShort>
                <Link href={lenke} target="_blank" onClick={() => sendNavigereEvent(lenketekst, lenke)}>
                    {lenketekst}
                </Link>
            </div>
        </div>
    );
}