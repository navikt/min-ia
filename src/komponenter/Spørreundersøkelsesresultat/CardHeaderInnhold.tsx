import { ExpansionCard } from "@navikt/ds-react";
import React from "react";
import styles from "./CardHeader.module.scss";
export interface CardHeaderProps {
    dato?: string;
}

export const CardHeaderInnhold = ({
    dato,
}: CardHeaderProps) => {
    return (
        <ExpansionCard.Header className={styles.expansionHeader}>
            <ExpansionCard.Title>Behovsvurdering</ExpansionCard.Title>
            <span className={styles.spørreundersøkelseDato}>{dato}</span>
        </ExpansionCard.Header>
    );
};
