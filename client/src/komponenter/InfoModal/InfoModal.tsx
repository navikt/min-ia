import { FunctionComponent, useEffect, useState } from "react";
import styles from "../../Infographic/Infographic.module.scss";
import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import { Information } from "@navikt/ds-icons";

interface Props {
  bransjeEllerNæring?: string;
  bransjeEllerNæringLabel?: string;
}
export const InfoModal: FunctionComponent<Props> = ({
  bransjeEllerNæring,
  bransjeEllerNæringLabel,
}: Props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (Modal !== undefined) {
      // @ts-ignore
      Modal?.setAppElement("#__next");
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
        <Information />
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
            Utregningene på dette panelet blir gjort fortløpende, basert på et
            <br />
            større statistisk grunnlag, basert på statistikk beregnet av NAV og SSB.
          </BodyLong>
        </Modal.Content>
      </Modal>
    </div>
  );
};
