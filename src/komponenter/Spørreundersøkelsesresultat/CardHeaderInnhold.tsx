import { ExpansionCard } from "@navikt/ds-react";
import React from "react";
import styles from "./CardHeader.module.scss";
import { Spørreundersøkelse } from "./SpørreundersøkelseRad";
export interface CardHeaderProps {
    spørreundersøkelse: Spørreundersøkelse;
    dato?: string;
}

export const CardHeaderInnhold = ({
    spørreundersøkelse,
    dato,
}: CardHeaderProps) => {
    const spørreundersøkelseStatus = spørreundersøkelse.status;
    if (spørreundersøkelseStatus === "AVSLUTTET") {
        return (
            <ExpansionCard.Header className={styles.expansionHeader}>
                <ExpansionCard.Title>Behovsvurdering</ExpansionCard.Title>
                <span className={styles.spørreundersøkelseDato}>{dato}</span>
            </ExpansionCard.Header>
        );
    }

    return null;
};
