import { ExpansionCard } from "@navikt/ds-react";
import React from "react";
import { CardHeaderInnhold } from "./CardHeaderInnhold";
import { RadInnhold } from "./RadInnhold";

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

    return (
        <StyledExpansionCard
            className={styles.spørreundersøkelseRad}
            aria-label={`${spørreundersøkelseType} ${spørreundersøkelse.opprettetTidspunkt.toLocaleDateString("no-NO")}`}
            open={erÅpen}
            onToggle={(open: boolean) => {
                setErÅpen(open);
            }}
        >
            <CardHeaderInnhold spørreundersøkelse={spørreundersøkelse} dato={dato} />
            {erÅpen && spørreundersøkelse.status === "AVSLUTTET" && (
                <RadInnhold spørreundersøkelse={spørreundersøkelse} />
            )}
        </StyledExpansionCard>
    );
}
