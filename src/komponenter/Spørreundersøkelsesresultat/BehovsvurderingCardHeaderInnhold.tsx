import { ExpansionCard } from "@navikt/ds-react";
import React from "react";
import styles from "./BehovsvurderingCardHeader.module.scss";
import { Spørreundersøkelse } from "./SpørreundersøkelseRad";

const StyledExpansionCardHeader = ExpansionCard.Header;
export interface CardHeaderProps {
    spørreundersøkelse: Spørreundersøkelse;
    dato?: string;
}

export const BehovsvurderingCardHeaderInnhold = ({
    spørreundersøkelse,
    dato,
}: CardHeaderProps) => {
    const spørreundersøkelseStatus = spørreundersøkelse.status;
    if (spørreundersøkelseStatus === "AVSLUTTET") {
        return (
            <StyledExpansionCardHeader>
                <ExpansionCard.Title>Behovsvurdering</ExpansionCard.Title>
                <span className={styles.headerRightContent}>
                    <span className={styles.behovsvurderingDato}>{dato}</span>
                </span>
            </StyledExpansionCardHeader>
        );
    }

    return null;
};
