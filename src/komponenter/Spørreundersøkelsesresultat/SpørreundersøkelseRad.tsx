import { ExpansionCard } from "@navikt/ds-react";
import React from "react";
import { BehovsvurderingCardHeaderInnhold } from "./BehovsvurderingCardHeaderInnhold";
import { BehovsvurderingRadInnhold } from "./BehovsvurderingRadInnhold";
/* import {
    useSpørreundersøkelseKomponenter,
    useSpørreundersøkelseType,
} from "./SpørreundersøkelseContext"; */

/* const StyledExpansionCard = styled(ExpansionCard) <{ $avstandFraSiste: number }>`
    margin-top: 1rem;

    & > div {
        z-index: ${(props) => props.$avstandFraSiste + 5};
    }
`; */

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
    /* avstandFraSiste, */
}: {
    spørreundersøkelse: Spørreundersøkelse;
    dato?: string;
    defaultOpen?: boolean;
    /* avstandFraSiste: number; */
}) {
    const [erÅpen, setErÅpen] = React.useState(defaultOpen);

    const spørreundersøkelseType = "Behovsvurdering"; //useSpørreundersøkelseType();
    /* const { CardHeader, CardInnhold } = useSpørreundersøkelseKomponenter(); */
    const CardHeader = BehovsvurderingCardHeaderInnhold;
    const CardInnhold = BehovsvurderingRadInnhold;

    return (
        <StyledExpansionCard
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
