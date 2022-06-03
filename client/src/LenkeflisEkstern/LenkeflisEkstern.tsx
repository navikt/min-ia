import React from "react";
import styles from "./lenkeflis-ekstern.module.scss";
import { ExternalLink } from "@navikt/ds-icons";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";
import { sendEventOgNaviger, sendNavigereEvent } from "../amplitude/events";

export const LenkeflisEkstern: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
  href: string | undefined;
}> = ({ overskrift, ikon, brødtekst, href }) => {
  const destinasjon = href ?? "#";
  return (
    <div className={styles.panelWrapper}>
      <a
        className="navds-panel navds-link-panel navds-panel--border"
        href={destinasjon}
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
        <ExternalLink
          className={styles.linkSymbol}
          onClickCapture={(e) => {
            e.preventDefault();
          }}
          onClick={() => {
            sendEventOgNaviger(destinasjon, overskrift);
          }}
        />
      </a>
    </div>
  );
};
