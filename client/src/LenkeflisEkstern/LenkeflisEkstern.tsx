import React, {ReactElement} from "react";
import styles from "./lenkeflis-ekstern.module.scss";
import { ExternalLink } from "@navikt/ds-icons";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";

export const LenkeflisEkstern: React.FunctionComponent<{
  overskriftSomElement?:ReactElement;
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
}> = ({ overskrift, ikon, brødtekst }) => {
  return (
    <div className={styles.panelWrapper}>
      <a className="navds-panel navds-link-panel navds-panel--border" href="#">
        <div className={styles.ikonOgTekstWrapper}>
          {ikon}
          <div className={styles.tekstWrap}>
            <div className="navds-link-panel__title navds-heading navds-heading--medium">
              <div dangerouslySetInnerHTML={__html: overskrift} />
            </div>
            <PanelBrødtekstSkjultPåMobil tekst={brødtekst} />
          </div>
        </div>
        <ExternalLink className={styles.linkSymbol} />
      </a>
    </div>
  );
};
