import styles from "./relaterteTjenester.module.scss";
import {Heading} from "@navikt/ds-react";
import {InkluderendeArbeidslivPanel} from "../../InkluderendeArbeidslivPanel/InkluderendeArbeidslivPanel";
import {LenkeflisEkstern} from "../../LenkeflisEkstern/LenkeflisEkstern";
import React from "react";

export function RelaterteTjenester() {
    return <div className={styles.relaterteTjenester}>
        <Heading size={"large"} level={"2"}>Relaterte tjenester</Heading>
        <div className={styles.innhold}>
            <InkluderendeArbeidslivPanel/>
            <LenkeflisEkstern
                overskrift={"Idébanken"}
                brødtekst={
                    "På idébanken finner du ideer, erfaringer og verktøy som kan bidra til bedre arbeidsmiljø og lavere sykefravær."
                }
                href={"https://www.idebanken.org"}
            />
            <LenkeflisEkstern
                overskrift={"Arbeidsmiljøportalen"}
                brødtekst={
                    "Leter du etter flere gode verktøy for å bedre arbeidsmiljøet? Her finner du kunnskap og digitale verktøy."
                }
                href={"https://www.arbeidsmiljoportalen.no"}
            />
        </div>
    </div>;
}