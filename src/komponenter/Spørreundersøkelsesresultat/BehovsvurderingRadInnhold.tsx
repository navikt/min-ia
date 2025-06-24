import { ExpansionCard } from "@navikt/ds-react";
import { Spørreundersøkelse } from "./SpørreundersøkelseRad";
import { TemaResultat } from "./TemaResultat";

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
        </ExpansionCard.Content>
    );
};