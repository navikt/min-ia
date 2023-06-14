import React from "react";
import { Heading, ReadMore} from "@navikt/ds-react";
import styles from "./fiaSamarbeidsstatus.module.scss"

const FiaSamarbeidsstatus: React.FunctionComponent = () => {

    return (
        <>
{/*
            <div className={styles.fiaSamarbeidsstatus}>
                <ReadMore header={"I forebyggende samarbeid med NAV"}>
                    Din virksomhet samarbeider med NAV om sykefraværs- og forebyggingsarbeid.
                    Samarbeidet er tidsbegrenset og forpliktende.
                    For mer informasjon kan du kontakte ansvarlig for sykefraværs- og forebyggingsarbeid i din
                    virksomhet
                    eller lokal NAV-enhet.
                </ReadMore>
            </div>

            <div className={styles.fiaSamarbeidsstatus}>
                <BodyShort>I forebyggende samarbeid med NAV</BodyShort>
                <HelpText title="Hva betyr forebyggende samarbeid?">
                    Din virksomhet samarbeider med NAV om sykefraværs- og forebyggingsarbeid.
                    Samarbeidet er tidsbegrenset og forpliktende.
                    For mer informasjon kan du kontakte ansvarlig for sykefraværs- og forebyggingsarbeid i din
                    virksomhet eller
                    lokal NAV-enhet.
                </HelpText>
            </div>
*/}
            <div className={styles.fiaSamarbeidsstatus2}>
                <Heading size={"medium"}>I forebyggende samarbeid med NAV</Heading>
                <ReadMore header="Hva betyr forebyggende samarbeid?">
                    Din virksomhet samarbeider med NAV om sykefraværs- og forebyggingsarbeid.
                    Samarbeidet er tidsbegrenset og forpliktende.
                    For mer informasjon kan du kontakte ansvarlig for sykefraværs- og forebyggingsarbeid i din
                    virksomhet eller
                    lokal NAV-enhet.
                </ReadMore>
            </div>

        </>
    )
}

export default FiaSamarbeidsstatus
