import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";

export interface LenkeflisProps {
  overskrift: string;
  ikon?: React.ReactElement;
  href?: string;
  brødtekst?: string;
}

export const Lenkeflis = ({
  overskrift,
  ikon,
  href,
  brødtekst,
}: LenkeflisProps) => {
  const destinasjon = href ?? "#";

  return (
    <LinkPanel
      href={destinasjon}
      className={styles.lenkeflis}
    >
      <LinkPanel.Title>
        <div className={styles.ikonOgTekstWrapper}>
          {ikon && <div className={styles.ikonWrapper}>{ikon}</div>}
          {overskrift}
        </div>
      </LinkPanel.Title>
      {brødtekst && <LinkPanel.Description>{brødtekst}</LinkPanel.Description>}
    </LinkPanel>
  );
};
