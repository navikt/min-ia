import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";
import { sendLenkeKlikketPåEvent } from "../amplitude/events";
import classNames from "classnames";
import {
  IaTjeneste,
  registrerLevertInnloggetIaTjeneste,
} from "../integrasjoner/ia-tjenestemetrikker-api";
import { useOrgnr } from "../hooks/useOrgnr";

export const Lenkeflis: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
  href: string | undefined;
  fyltoppBakgrunn?: boolean;
}> = ({ overskrift, brødtekst, ikon, href, fyltoppBakgrunn }) => {
  const TIMEOUT_IN_MILLIS = 750;
  const orgnr = useOrgnr();

  // Amplitude trenger litt tid for å sende ut event når vi navigerer til ekstern side/app.
  const sendEventOgNaviger = async (
    destinasjon: string,
    lenketekst: string,
    maksVentetid: number
  ) => {
    setTimeout(() => {
      window.location.href = destinasjon;
    }, maksVentetid);

    const metrikkutsendelse = registrerLevertInnloggetIaTjeneste(
      IaTjeneste.FOREBYGGE_FRAVÆR,
      orgnr
    );
    const amplitudekall = sendLenkeKlikketPåEvent(destinasjon, lenketekst);

    await Promise.allSettled([metrikkutsendelse, amplitudekall]).then(
      () => (window.location.href = destinasjon)
    );
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
