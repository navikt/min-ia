import React, { ReactNode } from "react";
import styles from "./NOAInfographicFlisLink.module.scss";
import { BodyShort, Box } from "@navikt/ds-react";
import { ExternalLinkIcon } from "@navikt/aksel-icons";

export function NOAInfographicFlisLink({
  label,
  innhold,
}: {
  label?: ReactNode;
  innhold: ReactNode;
}) {

  return (
    <Box as={"a"} href="https://noa.stami.no/yrker-og-naeringer/noa/barnehage/" className={styles.NOA_infographicFlisLinkBox}>
      <ExternalLinkIcon title="a11y-title" fontSize="1.5rem" className={styles.externalIcon}/>
      {label && <BodyShort className={styles.label} as="div">{label}</BodyShort>}
      <BodyShort size="small" className={styles.verdi} as="div">
        {innhold}
      </BodyShort>
    </Box>
  )
}
