import React, { ReactNode } from "react";
import styles from "./InfographicFlis.module.scss";
import { BodyShort, Box, Skeleton } from "@navikt/ds-react";

export function InfographicFlis({
  label,
  innhold,
  nedlastingPågår = false,
  utenLabel = false,
}: {
  label?: ReactNode;
  innhold: ReactNode;
  nedlastingPågår?: boolean;
  utenLabel?: boolean;
}) {
  if (utenLabel) {
    if (nedlastingPågår) {
      return (
        <Box padding="4" background="surface-success-subtle" className={styles.infographicFlisBox}>
          <Skeleton width="12rem" />
        </Box>
      );
    }
    return (
      <Box padding="4" background="surface-success-subtle" className={styles.infographicFlisBox}>
        <BodyShort size="small" className={styles.verdi}>
          {innhold}
        </BodyShort>
      </Box>
    );
  }

  if (nedlastingPågår) {
    return (
      <Box padding="4" background="surface-success-subtle" className={styles.infographicFlisBox}>
        <Skeleton width="8rem" />
        <Skeleton width="5rem" height="4rem" />
      </Box>
    );
  }

  return (
    <Box padding="4" background="surface-success-subtle" className={styles.infographicFlisBox}>
      {label && <BodyShort className={styles.label}>{label}:</BodyShort>}
      <BodyShort size="small" className={styles.verdi}>
        {innhold}
      </BodyShort>
    </Box>
  )
}
