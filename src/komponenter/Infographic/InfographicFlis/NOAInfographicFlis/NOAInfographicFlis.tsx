import React, { ReactNode } from "react";
import styles from "./NOAInfographicFlis.module.scss";
import { BodyShort, Box } from "@navikt/ds-react";

export function NOAInfographicFlis({
  label,
  innhold,
}: {
  label?: ReactNode;
  innhold: ReactNode;
}) {
  return (
    <Box className={styles.NOA_infographicFlisBox}>
      {label && <BodyShort className={styles.label}>{label}</BodyShort>}
      <BodyShort size="small" className={styles.verdi}>
        {innhold}
      </BodyShort>
    </Box>
  );
}
