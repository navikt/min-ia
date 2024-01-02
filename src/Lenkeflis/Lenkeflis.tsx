import {LinkPanel} from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import {sendDigitalIaTjenesteMetrikk} from "../integrasjoner/ia-tjenestemetrikker-api";
import {useOrgnr} from "../hooks/useOrgnr";
import {MetrikkKilde} from "@navikt/ia-metrikker-client";
import {sendNavigereEvent} from "../amplitude/amplitude";

export interface LenkeflisProps {
    overskrift: string;
    ikon?: React.ReactElement;
    href?: string;
    brødtekst?: string;
}

export const Lenkeflis = ({overskrift, ikon, href, brødtekst}: LenkeflisProps) => {
    const orgnr = useOrgnr();
    const destinasjon = href ?? "#";

    return (
        <LinkPanel
            href={destinasjon}
            className={styles.lenkeflis}
            onClickCapture={(e) => {
                e.preventDefault();
            }}
            onClick={() => {
                sendDigitalIaTjenesteMetrikk(MetrikkKilde.FOREBYGGE_FRAVÆR, orgnr)
                sendNavigereEvent(destinasjon, overskrift)
            }}
        >
            <LinkPanel.Title>
                <div className={styles.ikonOgTekstWrapper}>
                    {ikon && <div className={styles.ikonWrapper}>{ikon}</div>}
                    {overskrift}
                </div>
            </LinkPanel.Title>
            {brødtekst &&
                <LinkPanel.Description>
                    {brødtekst}
                </LinkPanel.Description>
            }
        </LinkPanel>
    );
};
