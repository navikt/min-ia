import { FunctionComponent, useEffect, useState } from "react";
import styles from "../Infographic.module.scss";
import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import { Information } from "@navikt/ds-icons";

interface Props {
  bransjeEllerNæring: "bransje" | "næring";
  bransjeEllerNæringLabel?: string;
}

export const InfoModal: FunctionComponent<Props> = ({
  bransjeEllerNæring,
  bransjeEllerNæringLabel,
}: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      // sikrer at skjermlesere ikke leser opp innholdet bak modal når den er åpen
      Modal?.setAppElement?.("#__next");
    } catch (e) {
      // under testkjøring fins ikke "#__next"
    }
  }, []);

  return (
    <div className={styles.hjelpetekstWrapper}>
      <Button
        id={"modalButton"}
        variant={"tertiary"}
        onClick={() => {
          setOpen((open) => !open);
        }}
      >
        <Information style={{width:"2rem", height:"2rem"}}/>
      </Button>
      <Modal
        aria-label="Modal for mer informasjon"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        shouldCloseOnOverlayClick={true}
      >
        <Modal.Content>
          <Heading level="1" size="large" spacing={true}>
            Informasjon
          </Heading>
          {bransjeEllerNæringLabel && (
            <Heading level="2" size="medium" spacing={true}>
              Din {bransjeEllerNæring}: {bransjeEllerNæringLabel}
            </Heading>
          )}
          <BodyLong spacing={true}>
            Utregningene på dette panelet blir gjort fortløpende,
            <br />
            basert på statistikk beregnet av NAV og SSB.
          </BodyLong>
        </Modal.Content>
      </Modal>
    </div>
  );
};
