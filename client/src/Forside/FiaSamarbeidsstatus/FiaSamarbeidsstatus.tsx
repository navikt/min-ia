import React from "react";
import { Heading, ReadMore } from "@navikt/ds-react";
import styles from "./fiaSamarbeidsstatus.module.scss"
import { HandsHeart } from "@navikt/ds-icons";
import { useFiaSamarbeidsstatus } from "./fiaSamarbeidsstatusAPI";
import { RestStatus } from "../../integrasjoner/rest-status";
import { sendLesMerÅpnetEvent } from "../../amplitude/events";

const FiaSamarbeidsstatus: React.FunctionComponent = () => {
    const fiaSamarbeidsstatus = useFiaSamarbeidsstatus();

    if (fiaSamarbeidsstatus.status === RestStatus.Suksess && fiaSamarbeidsstatus.data.samarbeid === "I_SAMARBEID") {
        return (
            <div className={styles.fiaSamarbeidsstatus}>
                <Heading size={"large"} level={"2"} className={styles.fiaSamarbeidsstatusTittelMedIkon}>
                    <div className={styles.ikonWrapper}>
                        <HandsHeart aria-hidden/>
                    </div>
                    Dere er i et forebyggende samarbeid med NAV

                </Heading>
                <ReadMore header="Les mer" onClick={(e) => {
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
    } else {
        return null
    }
}

export default FiaSamarbeidsstatus
