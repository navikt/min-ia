import React, { useEffect } from "react";
import { BodyShort, Button, Heading, Page } from "@navikt/ds-react";
import styles from "./fiaSamarbeidsstatus.module.scss"
import { PersonGroupIcon } from "@navikt/aksel-icons";

import { sendVisSamarbeidsstatusEvent } from "../../amplitude/amplitude";

interface FiaSamarbeidsstatusProps {
    status: string;
};

const FiaSamarbeidsstatus: React.FunctionComponent<FiaSamarbeidsstatusProps> = (props) => {
    useEffect(() => {
        sendVisSamarbeidsstatusEvent(props.status)
    }, [props.status]);

    const VIS_SAMARBEIDKNAPP = false;

    return (
        <Page.Block width="xl">
            <div className={styles['samarbeidsstatus-box']}>
                <span>
                    <Heading size="medium" level={"2"} className={styles['samarbeidsstatus-box__tittel']}>
                        Samarbeid om Inkluderende arbeidsliv
                    </Heading>
                    <BodyShort>
                        Dere er i samarbeid med Nav Arbeidslivssenter
                    </BodyShort>
                </span>
                {VIS_SAMARBEIDKNAPP && <Button variant="secondary" icon={<PersonGroupIcon aria-hidden />}>
                    Se samarbeid
                </Button>}
            </div>
        </Page.Block>
    );
}

export default FiaSamarbeidsstatus;
