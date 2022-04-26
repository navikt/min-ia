import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";
import { sendLenkeKlikketPåEvent } from "../amplitude/events";
import { useRouter } from "next/router";
import classNames from "classnames";

export const Lenkeflis: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
  href: string | undefined;
  fyltoppBakgrunn?: boolean;
}> = ({ overskrift, brødtekst, ikon, href, fyltoppBakgrunn }) => {
  const router = useRouter();
  const TIMEOUT_IN_MILLIS = 750;

  // Amplitude trenger litt tid for å sende ut event når vi navigerer til ekstern side/app.
  const sendEventOgNaviger = (
    destinasjon: string,
    lenketekst: string,
    maksVentetid: number
  ) => {
    setTimeout(() => {
      router.push(destinasjon);
    }, maksVentetid);
    sendLenkeKlikketPåEvent(destinasjon, lenketekst).then(() => {
      router.push(destinasjon);
    });
  };

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
        sendEventOgNaviger(href ? href : "#", overskrift, TIMEOUT_IN_MILLIS);
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
