import React, { ReactNode } from "react";
import styles from "./InfographicFlis.module.scss";
import { BodyShort, Label } from "@navikt/ds-react";
import Skeleton from "react-loading-skeleton";
import { SkeltonWrapper } from "../../Skeleton/SkeletonWrapper";
import "react-loading-skeleton/dist/skeleton.css";

export const InfographicFlis = (props: {
  ikon: ReactNode;
  innhold: ReactNode;
  nedlastingPågår?: boolean;
}) => {
  return (
    <div className={styles.infographicFlis}>
      <div className={styles.ikonWrapper}>{props.ikon}</div>
      {props.nedlastingPågår ? (
        <SkeltonWrapper>
          <Skeleton style={{ marginTop: "0.5rem" }} />
          <Skeleton style={{ marginTop: "0.5rem" }} />
        </SkeltonWrapper>
      ) : (
        <BodyShort size="small" className={styles.tekst}>
          {props.innhold}
        </BodyShort>
      )}
    </div>
  );
};
