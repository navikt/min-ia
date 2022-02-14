import { LinkPanel } from "@navikt/ds-react";
import styles from "./blåLinkPanel.module.scss";
import { SamtalestøtteSVG } from "../Forside/SamtalestøtteSVG";
import { ReactChild } from "react";

export interface BlåLinkPanelProps {
  tittel: string;
  brødtekst: string;
}

export const BlåLinkPanel: React.FunctionComponent<BlåLinkPanelProps> = ({
  tittel,
  brødtekst,
  children,
}) => {
  return (
    <LinkPanel href="#" className={styles.panel}>
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
            <LinkPanel.Title>{tittel}</LinkPanel.Title>
            <LinkPanel.Description>{brødtekst}</LinkPanel.Description>
          </div>
        </div>
      </div>
    </LinkPanel>
  );
};
