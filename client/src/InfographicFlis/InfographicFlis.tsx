import React, { ReactNode } from "react";
import styles from "./InfographicFlis.module.scss";
import { Label } from "@navikt/ds-react";
import Skeleton from "react-loading-skeleton";
import { SkeltonWrapper } from "../komponenter/Skeleton/SkeletonWrapper";
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
        <Label size="small" className={styles.tekst}>
          {props.innhold}
        </Label>
      )}
    </div>
  );
};
