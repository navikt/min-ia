import React, { ReactNode } from "react";
import styles from "./NOAInfographicFlisLink.module.scss";
import { BodyShort, Box } from "@navikt/ds-react";
import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { sendNavigereRisikofaktorEvent } from "../../../../utils/analytics/analytics";

export function NOAInfographicFlisLink({
  label,
  innhold,
  lenke,
  bransje,
}: {
  label: string;
  innhold: ReactNode;
  lenke: string;
  bransje: string;
}) {
  return (
    <Box
      as={"a"}
      href={lenke}
      className={styles.NOA_infographicFlisLinkBox}
      onClick={() => sendNavigereRisikofaktorEvent(label, lenke, bransje)}
    >
      <ExternalLinkIcon
        aria-hidden
        fontSize="1.5rem"
        className={styles.externalIcon}
      />
      {label && <BodyShort className={styles.label}>{label}</BodyShort>}
      <BodyShort size="small" className={styles.verdi}>
        {innhold}
      </BodyShort>
    </Box>
  );
}
