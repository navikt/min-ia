import React from "react";
import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis-ekstern.module.scss";

export const LenkeflisEkstern: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
}> = ({ overskrift, ikon, brødtekst }) => {
  return (
    <LinkPanel className={styles.linkpanel} href="#">
      <div
        style={{
          display: "grid",
          gridAutoFlow: "row",
          gap: "var(--navds-spacing-8)",
          alignItems: "center",
        }}
      >
        <div className={styles.ikonOgTekstWrapper}>
          {ikon}
          <div>
            <LinkPanel.Title>{overskrift}</LinkPanel.Title>
            <LinkPanel.Description>{brødtekst}</LinkPanel.Description>
          </div>
        </div>
      </div>
    </LinkPanel>
  );
};
