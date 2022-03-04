import React, { ReactNode } from "react";
import styles from "./InfographicSnippet.module.scss";
import { Label } from "@navikt/ds-react";

export const InfographicSnippet = (props: {
  ikon: ReactNode;
  tekst: string;
  verdi: string;
}) => {
  return (
    <div className={styles.infographicSnippet}>
      <div className={styles.ikonWrapper}>{props.ikon}</div>
      <Label size="small" className={styles.tekst}>
        {props.tekst}
        <span style={{ fontWeight: 700 }}>{props.verdi}</span>
      </Label>
    </div>
  );
};
