import { ExpansionCard } from "@navikt/ds-react";
import React from "react";
import { CardHeaderInnhold } from "./CardHeaderInnhold";
import { RadInnhold } from "./RadInnhold";

import styles from "./SpørreundersøkelseRad.module.scss";
import { FiaSamarbeidDokument } from "../../Samarbeid/fiaSamarbeidAPI";
import { sendPanelEkspanderEvent } from "../../utils/analytics/analytics";

const StyledExpansionCard = ExpansionCard;

export type TemaMedSpørsmålOgSvar = {
    id: number;
    navn: string;
    spørsmålMedSvar: SpørsmålResultat[];
};

export type Spørreundersøkelse = {
    id: string;
    opprettetTidspunkt: Date;
    spørsmålMedSvarPerTema: TemaMedSpørsmålOgSvar[];
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
    dokument,
    dato,
    defaultOpen,
}: {
    dokument: FiaSamarbeidDokument;
    dato?: string;
    defaultOpen?: boolean;
}) {
    const [erÅpen, setErÅpen] = React.useState(defaultOpen);

    const spørreundersøkelseType = "Behovsvurdering";

    return (
        <StyledExpansionCard
            className={styles.spørreundersøkelseRad}
            aria-label={`${spørreundersøkelseType} ${dato}`}
            open={erÅpen}
            onToggle={(open: boolean) => {
                if (open) {
                    sendPanelEkspanderEvent(spørreundersøkelseType);
                }
                setErÅpen(open);
            }}
        >
            <CardHeaderInnhold dato={dato} />
            {erÅpen ? <RadInnhold dokument={dokument} /> : null}
        </StyledExpansionCard>
    );
}
