import React, { ReactNode } from "react";
import styles from "./InfographicFlis.module.scss";
import { Label } from "@navikt/ds-react";
import Skeleton from "react-loading-skeleton";
import {SkeltonWrapper} from "../komponenter/Skeleton/SkeletonWrapper";

export const InfographicFlis = (props: {
  ikon: ReactNode;
  tekst: string;
  verdi: string;
  nedlastingPågår?: boolean;
}) => {
  return (
    <div className={styles.infographicFlis}>
      <div className={styles.ikonWrapper}>{props.ikon}</div>
        {props.nedlastingPågår?<SkeltonWrapper>
                <Skeleton height={15} />
            </SkeltonWrapper>:
        <Label size="small" className={styles.tekst}>
        {props.tekst}
        <span style={{ fontWeight: 700 }}>{props.verdi}</span>
      </Label>}
    </div>
  );
};
