import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";

export const Lenkeflis: React.FunctionComponent<{
  overskrift: string;
  brødtekst: string;
}> = ({ overskrift, brødtekst, children }) => {
  return (
    <LinkPanel href="#" className={styles.lenkeflis}>
      <div
        style={{
          display: "grid",
          gridAutoFlow: "row",
          gap: "var(--navds-spacing-8)",
          alignItems: "center",
        }}
      >
        <div className={styles.ikonOgTekstWrapper}>
          <div className={styles.ikon}>{children}</div>
          <div>
            <LinkPanel.Title>{overskrift}</LinkPanel.Title>
            <LinkPanel.Description>{brødtekst}</LinkPanel.Description>
          </div>
        </div>
      </div>
    </LinkPanel>
  );
};
