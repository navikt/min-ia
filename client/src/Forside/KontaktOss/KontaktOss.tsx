import React from "react";
import {BodyLong, Heading, Link} from "@navikt/ds-react";
import styles from "./kontaktOss.module.scss"

export interface KontaktOssProps {
    kontaktOssUrl: string
}

export function KontaktOss(props: KontaktOssProps) {
    return (
        <div className={styles.kontaktOss}>
            <Heading size={"large"} level={"2"}>
                Kontakt oss
            </Heading>
            <div className={styles.kontaktOss__innhold}>
                <div className={styles.duKanOgsåRingeEllerSkriveTilOss}>
                    <Heading size={"medium"} level={"3"}>
                        <Link href={`${props.kontaktOssUrl}/kontaktskjema`}>
                            Du kan ringe eller skrive til oss
                        </Link>
                    </Heading>
                    <BodyLong>
                        Arbeidet med å forebygge sykefravær og sikre godt arbeidsmiljø, er et ansvar som deles mellom
                        arbeidsgiver og tillitsvalgte eller ansattrepresentant. NAV Arbeidslivssenter kan bistå i dette
                        arbeidet.
                    </BodyLong>
                </div>
            </div>
        </div>
    );
}