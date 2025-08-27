import { ExpansionCard, Loader } from "@navikt/ds-react";
import { TemaResultat } from "./TemaResultat";
import { FiaSamarbeidDokument } from "../../Samarbeid/fiaSamarbeidAPI";
import { useFiaDokument } from "../../Samarbeid/fiaSamarbeidDokumenterAPI";
import { RestStatus } from "../../integrasjoner/rest-status";

export const RadInnhold = ({
    dokument
}: {
    dokument: FiaSamarbeidDokument;
}) => {
    const fiaDokument = useFiaDokument({ dokumentId: dokument.dokumentId });

    if (fiaDokument.status !== RestStatus.Suksess) {
        return (
            <ExpansionCard.Content style={{ textAlign: "center" }}>
                <Loader size="large" />
            </ExpansionCard.Content>
        )
    }

    return (
        <ExpansionCard.Content>
            {
                fiaDokument.data.innhold.spørsmålMedSvarPerTema.map((tema) => (
                    <TemaResultat navn={tema.navn} spørsmålResultat={tema.spørsmålMedSvar} key={tema.id} />
                ))
            }
        </ExpansionCard.Content>
    );
};