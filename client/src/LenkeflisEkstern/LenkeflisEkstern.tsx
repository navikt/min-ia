import React from "react";
import {sendNavigereEvent} from "../amplitude/events";
import {navigerEtterCallbacks} from "../utils/navigasjon";
import {LinkPanel} from "@navikt/ds-react";
import styles from "./lenkeflis-ekstern.module.scss"

export const LenkeflisEkstern: React.FunctionComponent<{
    overskrift: string;
    brødtekst: string;
    href: string | undefined;
}> = ({overskrift, brødtekst, href}) => {
    const destinasjon = href ?? "#";
    const eventutsendelse = () => sendNavigereEvent(destinasjon, overskrift);
    return (
        <LinkPanel href={destinasjon}
                   onClickCapture={event => event.preventDefault()}
                   onClick={() => navigerEtterCallbacks(destinasjon, [eventutsendelse], 500)}
        >
            <LinkPanel.Title>{overskrift}</LinkPanel.Title>
            <div className={styles.linkPanel__description__wrapper}>
                <LinkPanel.Description>{brødtekst}</LinkPanel.Description>
            </div>
        </LinkPanel>
    )
};
