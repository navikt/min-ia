import styles from "./nyttVerktøyTilDeg.module.scss";
import {Lenkeflis} from "../../Lenkeflis/Lenkeflis";
import {HandsHeart} from "@navikt/ds-icons";
import React from "react";
import {Heading} from "@navikt/ds-react";

export function NyttVerktoyTilDeg(props: { href: string }) {
    return <div className={styles.nyttVerktøyTilDeg}>
        <Heading size={"large"} level={"2"}>Vi har et nytt verktøy til deg...</Heading>
        <div className={styles.innhold}>
            <p className={styles.enhet}>
                Regelmessig fokus på sykefravær og arbeidsmiljø bidrar til å
                redusere fravær. Vi har samlet
                forslag til aktiviteter dere kan gjøre på arbeidsplassen.
            </p>
            <Lenkeflis
                overskrift={"Start forebygging av sykefravær"}
                ikon={<HandsHeart/>}
                href={props.href}
            />
        </div>
    </div>;
}