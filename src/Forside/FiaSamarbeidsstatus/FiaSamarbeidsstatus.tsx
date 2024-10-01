import React, { useEffect } from "react";
import { Heading, ReadMore } from "@navikt/ds-react";
import styles from "./fiaSamarbeidsstatus.module.scss"
import { HandShakeHeartIcon } from "@navikt/aksel-icons";

import { sendLesMerÅpnetEvent, sendVisSamarbeidsstatusEvent } from "../../amplitude/amplitude";

interface FiaSamarbeidsstatusProps {
    status: string;
}

const FiaSamarbeidsstatus: React.FunctionComponent<FiaSamarbeidsstatusProps> = (props) => {

    useEffect(() => {
        sendVisSamarbeidsstatusEvent(props.status)
    }, [props.status])

    return (
        <div className={styles.fiaSamarbeidsstatus}>
            <Heading size={"large"} level={"2"} className={styles.fiaSamarbeidsstatusTittelMedIkon}>
                <div className={styles.ikonWrapper}>
                    <HandShakeHeartIcon aria-hidden />
                </div>
                Dere er i et forebyggende samarbeid med NAV

            </Heading>
            <ReadMore header="Les mer" onClick={() => {
                sendLesMerÅpnetEvent("Dere er i et forebyggende samarbeid med NAV")
            }}>
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
