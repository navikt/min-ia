import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";
import classNames from "classnames";
import { sendEventOgNaviger } from "../amplitude/events";

export const Lenkeflis: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
  href: string | undefined;
  fyltoppBakgrunn?: boolean;
}> = ({ overskrift, brødtekst, ikon, href, fyltoppBakgrunn }) => {
  return (
    <LinkPanel
      href={href ? href : "#"}
      onClickCapture={(e) => {
        e.preventDefault();
      }}
      className={classNames(
        styles.lenkeflis,
        fyltoppBakgrunn ? styles.lenkeflis__fyltoppBakgrunn : ""
      )}
      onClick={() => {
        sendEventOgNaviger(href ? href : "#", overskrift);
      }}
    >
      <div
        className={classNames(
          styles.ikonOgTekstWrapper,
          fyltoppBakgrunn ? styles.ikonOgTekstWrapper__fyltoppBakgrunn : ""
        )}
      >
        <div className={styles.ikonWrapper}>{ikon}</div>
        <div>
          <LinkPanel.Title>
            <div dangerouslySetInnerHTML={{ __html: overskrift }} />
          </LinkPanel.Title>
          <PanelBrødtekstSkjultPåMobil tekst={brødtekst} />
        </div>
      </div>
    </LinkPanel>
  );
};
