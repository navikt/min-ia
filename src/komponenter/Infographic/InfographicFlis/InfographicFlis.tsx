import React, { ReactNode } from "react";
import styles from "./InfographicFlis.module.scss";
import { BodyShort, Skeleton } from "@navikt/ds-react";

export const InfographicFlis = (props: {
  innhold: ReactNode;
  nedlastingPågår?: boolean;
  fullBredde?: boolean;
}) => {
  return (
    <div
      className={`${styles.infographicFlis} ${
        props.fullBredde ? styles.fullBredde : ""
      }`}
    >
      {props.nedlastingPågår ? (
        <div className={styles.skeletonWrapper}>
          <Skeleton className={styles.skeleton} />
          <Skeleton className={styles.skeleton} />
        </div>
      ) : (
        <BodyShort size="small" className={styles.tekst} as="div">
          {props.innhold}
        </BodyShort>
      )}
    </div>
  );
};
