import React from "react";
import styles from "./lenkeflis-ekstern.module.scss";
import { ExternalLink } from "@navikt/ds-icons";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";

export const LenkeflisEkstern: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
}> = ({ overskrift, ikon, brødtekst }) => {
  return (
    <div className={styles.linkpanel}>
      <a className="navds-panel navds-link-panel navds-panel--border" href="#">
        <div className="navds-link-panel__content">
          <div className={styles.panel}>
            {ikon}
            <div>
              <div className="navds-link-panel__title navds-heading navds-heading--medium">
                {overskrift}
              </div>
              <PanelBrødtekstSkjultPåMobil tekst={brødtekst} />
            </div>
          </div>
        </div>
        <ExternalLink />
      </a>
    </div>
  );
};
