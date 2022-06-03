import React from "react";
import styles from "./lenkeflis-ekstern.module.scss";
import { ExternalLink } from "@navikt/ds-icons";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";
import { sendNavigereEvent } from "../amplitude/events";
import { navigerEtterCallbacks } from "../utils/navigasjon";

export const LenkeflisEkstern: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
  href: string | undefined;
}> = ({ overskrift, ikon, brødtekst, href }) => {
  const destinasjon = href ?? "#";
  const eventutsendelse = () => sendNavigereEvent(destinasjon, overskrift);
  return (
    <div className={styles.panelWrapper}>
      <a
        className="navds-panel navds-link-panel navds-panel--border"
        href={destinasjon}
        onClickCapture={(e) => {
          e.preventDefault();
        }}
        onClick={() => {
          navigerEtterCallbacks(destinasjon, [eventutsendelse], 500);
        }}
      >
        <div className={styles.ikonOgTekstWrapper}>
          {ikon}
          <div className={styles.tekstWrap}>
            <div className="navds-link-panel__title navds-heading navds-heading--medium">
              <div dangerouslySetInnerHTML={{ __html: overskrift }} />
            </div>
            <PanelBrødtekstSkjultPåMobil tekst={brødtekst} />
          </div>
        </div>
        <ExternalLink className={styles.linkSymbol} />
      </a>
    </div>
  );
};
