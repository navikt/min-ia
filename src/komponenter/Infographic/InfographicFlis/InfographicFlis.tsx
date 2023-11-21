import React, { ReactNode } from "react";
import styles from "./InfographicFlis.module.scss";
import { BodyShort } from "@navikt/ds-react";
import Skeleton from "react-loading-skeleton";
import { SkeletonWrapper } from "../../Skeleton/SkeletonWrapper";
import "react-loading-skeleton/dist/skeleton.css";

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
        <SkeletonWrapper>
          <Skeleton style={{ marginTop: "0.5rem" }} />
          <Skeleton style={{ marginTop: "0.5rem" }} />
        </SkeletonWrapper>
      ) : (
        <BodyShort size="small" className={styles.tekst} as="div">
          {props.innhold}
        </BodyShort>
      )}
    </div>
  );
};
