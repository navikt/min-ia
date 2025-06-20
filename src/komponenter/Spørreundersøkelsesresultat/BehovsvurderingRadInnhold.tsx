import { ExpansionCard } from "@navikt/ds-react";
import { Spørreundersøkelse } from "./SpørreundersøkelseRad";
import { TemaResultat } from "./TemaResultat";
/* import { SpørreundersøkelseResultat } from "./SpørreundersøkelseResultat"; */
/* import { CardInnholdProps, useSpørreundersøkelse } from "../../../components/Spørreundersøkelse/SpørreundersøkelseContext"; */

export const BehovsvurderingRadInnhold = ({
    spørreundersøkelse
}: {
    spørreundersøkelse: Spørreundersøkelse;
}) => {
    return (
        <ExpansionCard.Content>
            {
                spørreundersøkelse.spørsmålMedSvarPerTema.map((tema) => (
                    <TemaResultat navn={tema.navn} spørsmålResultat={tema.spørsmålMedSvar} key={tema.id} />
                ))}
            BehovsvurderingRadInnhold
        </ExpansionCard.Content>
    );
};
/* 
export const BehovsvurderingRadInnhold = ({
    spørreundersøkelse: behovsvurdering,
}: CardInnholdProps) => {
    const behovsvurderingStatus = behovsvurdering.status;
    const { iaSak } = useSpørreundersøkelse();

    if (iaSak !== undefined) {
        if (behovsvurderingStatus === "AVSLUTTET") {
            return (
                <ExpansionCard.Content>
                    <SpørreundersøkelseResultat
                        iaSak={iaSak}
                        spørreundersøkelseId={behovsvurdering.id}
                    />
                </ExpansionCard.Content>
            );
        }
    }
}; */