import { Alert, ExpansionCard, Loader } from "@navikt/ds-react";
import { TemaResultat } from "./TemaResultat";
import { FiaSamarbeidDokument } from "../../Samarbeid/fiaSamarbeidAPI";
import {
  FiaBehovsvurderingDokument,
  useFiaDokument,
} from "../../Samarbeid/fiaSamarbeidDokumenterAPI";
import { RestRessurs, RestStatus } from "../../integrasjoner/rest-status";

export const RadInnhold = ({
  dokument,
}: {
  dokument: FiaSamarbeidDokument;
}) => {
  const fiaDokument = useFiaDokument({
    dokumentId: dokument.dokumentId,
  }) as RestRessurs<FiaBehovsvurderingDokument>;

  if (
    fiaDokument.status === RestStatus.Feil ||
    fiaDokument.status === RestStatus.IkkeInnlogget ||
    fiaDokument.status === RestStatus.IngenTilgang
  ) {
    return (
      <ExpansionCard.Content>
        <Alert variant="error">
          Noe gikk galt ved lasting. Vennligst prøv igjen senere.
        </Alert>
      </ExpansionCard.Content>
    );
  }

  if (
    fiaDokument.status === RestStatus.IkkeLastet ||
    fiaDokument.status === RestStatus.LasterInn
  ) {
    return (
      <ExpansionCard.Content style={{ textAlign: "center" }}>
        <Loader size="large" />
      </ExpansionCard.Content>
    );
  }

  return (
    <ExpansionCard.Content>
      {fiaDokument.data.innhold.spørsmålMedSvarPerTema.map((tema) => (
        <TemaResultat
          navn={tema.navn}
          spørsmålResultat={tema.spørsmålMedSvar}
          key={tema.id}
        />
      ))}
    </ExpansionCard.Content>
  );
};
