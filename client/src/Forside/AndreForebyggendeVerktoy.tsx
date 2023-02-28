import styles from "./forside.module.scss";
import {Lenkeflis} from "../Lenkeflis/Lenkeflis";
import {Calculator, SpeechBubble, VideoRoom} from "@navikt/ds-icons";
import React from "react";

export function AndreForebyggendeVerktoy(props: { href: string }) {
    return <div className={styles.andreForebyggendeVerktoy}>
        <h2>Andre forebyggende verktøy</h2>
        <div className={styles.panelGrid}>
            <Lenkeflis
                overskrift={"Samtalestøtten"}
                ikon={<SpeechBubble/>}
                href={props.href}
            />
            <Lenkeflis
                overskrift={"Video og kurs"}
                ikon={<VideoRoom/>}
                href={"/forebygge-fravar/video-og-kurs"}
            />
            <Lenkeflis
                overskrift={"Fraværs&shy;kalkulator"}
                ikon={<Calculator/>}
                href={"/forebygge-fravar/kalkulator"}
            />
        </div>
    </div>;
}