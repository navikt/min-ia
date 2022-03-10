import React, { ReactNode } from "react";
import styles from "./InfographicFlis.module.scss";
import { HelpText, Label } from "@navikt/ds-react";

export const InfographicFlis = (props: {
  ikon: ReactNode;
  tekst: string;
  verdi: string;
}) => {
  return (
    <div className={styles.infographicFlis}>
      <div className={styles.ikonWrapper}>{props.ikon}</div>
      <Label size="small" className={styles.tekst}>
        {props.tekst}
        <span style={{ fontWeight: 700 }}>{props.verdi}</span>
      </Label>
      <HelpText title="Hvor kommer dette fra?">
        Informasjonen er hentet fra X sin statistikk fra 2021
      </HelpText>
    </div>
  );
};