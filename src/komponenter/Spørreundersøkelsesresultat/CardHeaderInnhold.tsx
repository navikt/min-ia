import { ExpansionCard } from "@navikt/ds-react";
import React from "react";
import styles from "./CardHeader.module.scss";
export interface CardHeaderProps {
    dato?: string;
    typetekst: string;
}

export const CardHeaderInnhold = ({
    dato,
    typetekst
}: CardHeaderProps) => {
    return (
        <ExpansionCard.Header className={styles.expansionHeader}>
            <ExpansionCard.Title>{typetekst}</ExpansionCard.Title>
            <span className={styles.spørreundersøkelseDato}>{dato}</span>
        </ExpansionCard.Header>
    );
};
