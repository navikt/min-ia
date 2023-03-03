import React from "react";
import {BodyLong, Heading, Link} from "@navikt/ds-react";
import styles from "./kontaktOss.module.scss"

export function KontaktOss() {
    return (
        <div className={styles.kontaktOss}>
            <Heading size={"large"} level={"2"}>
                Kontakt oss
            </Heading>
            <div className={styles.kontaktOss__innhold}>
                <div className={styles.duKanChatteMedOss}>
                    <Heading size={"medium"} level={"3"}>
                        <Link>
                            Du kan chatte med oss
                        </Link>
                    </Heading>
                    <BodyLong>
                        Du møter først chatbot Frida som har døgnåpent. Mellom klokken 9 og 15 på hverdager kan du be
                        Frida
                        om å få chatte med en veileder.
                    </BodyLong>
                </div>
                <div className={styles.duKanOgsåRingeEllerSkriveTilOss}>
                    <Heading size={"medium"} level={"3"}>
                        <Link>
                            Du kan også ringe eller skrive til oss
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