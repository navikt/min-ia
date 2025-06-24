import { ExpansionCard } from "@navikt/ds-react";
import React from "react";
import { BehovsvurderingCardHeaderInnhold } from "./BehovsvurderingCardHeaderInnhold";
import { BehovsvurderingRadInnhold } from "./BehovsvurderingRadInnhold";

import styles from "./SpørreundersøkelseRad.module.scss";

const StyledExpansionCard = ExpansionCard;

export type SpørreundersøkelseStatus = "OPPRETTET" | "PÅBEGYNT" | "AVSLUTTET" | "SLETTET";

export type TemaMedSpørsmålOgSvar = {
    id: number;
    navn: string;
    spørsmålMedSvar: SpørsmålResultat[];
};

export type Spørreundersøkelse = {
    id: string;
    status: SpørreundersøkelseStatus;
    opprettetTidspunkt: Date;
    spørsmålMedSvarPerTema: TemaMedSpørsmålOgSvar[];
    gyldigTilTidspunkt: Date;
};


export type SvaralternativResultat = {
    id: string;
    tekst: string;
    antallSvar: number;
};

export type SpørsmålResultat = {
    id: string;
    tekst: string;
    flervalg: boolean;
    antallDeltakereSomHarSvart: number;
    svarListe: SvaralternativResultat[];
    kategori?: string;
};

export default function SpørreundersøkelseRad({
    spørreundersøkelse,
    dato,
    defaultOpen,
}: {
    spørreundersøkelse: Spørreundersøkelse;
    dato?: string;
    defaultOpen?: boolean;
}) {
    const [erÅpen, setErÅpen] = React.useState(defaultOpen);

    const spørreundersøkelseType = "Behovsvurdering";
    const CardHeader = BehovsvurderingCardHeaderInnhold;
    const CardInnhold = BehovsvurderingRadInnhold;

    return (
        <StyledExpansionCard
            className={styles.spørreundersøkelseRad}
            aria-label={spørreundersøkelseType}
            open={erÅpen}
            onToggle={(open: boolean) => {
                setErÅpen(open);
            }}
        >
            <CardHeader spørreundersøkelse={spørreundersøkelse} dato={dato} />
            {erÅpen && spørreundersøkelse.status === "AVSLUTTET" && (
                <CardInnhold spørreundersøkelse={spørreundersøkelse} />
            )}
        </StyledExpansionCard>
    );
}
