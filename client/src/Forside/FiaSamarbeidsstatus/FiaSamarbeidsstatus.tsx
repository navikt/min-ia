import React from "react";
import { Heading, ReadMore } from "@navikt/ds-react";
import styles from "./fiaSamarbeidsstatus.module.scss"

const FiaSamarbeidsstatus: React.FunctionComponent = () => {

    return (
        <div className={styles.fiaSamarbeidsstatus}>
            <Heading size={"large"} level={"2"}>Dere er i et forebyggende samarbeid med NAV</Heading>
            <ReadMore header="Les mer">
                Din virksomhet samarbeider med NAV om sykefraværs- og forebyggingsarbeid.
                Samarbeidet er tidsbegrenset og forpliktende.
                For mer informasjon kan du kontakte ansvarlig for sykefraværs- og forebyggingsarbeid i din
                virksomhet eller
                lokal NAV-enhet.
            </ReadMore>
        </div>
    )
}

export default FiaSamarbeidsstatus
