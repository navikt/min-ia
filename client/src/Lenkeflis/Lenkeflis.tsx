import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";
import { sendLenkeKlikketPåEvent } from "../amplitude/events";
import { useRouter } from "next/router";

export const Lenkeflis: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
  href: string | undefined;
}> = ({ overskrift, brødtekst, ikon, href }) => {
  const router = useRouter();
  const TIMEOUT_IN_MILLIS = 750;

  const håndtereOnClickMedTimeout = (
    destinasjon: string,
    overskrift: string,
    timeout: number
  ) => {
    setTimeout(() => {
      router.push(destinasjon);
    }, timeout);
    sendLenkeKlikketPåEvent(destinasjon, overskrift).then(() => {
      router.push(destinasjon);
    });
  };

  return (
    <LinkPanel
      href={"#"}
      className={styles.lenkeflis}
      onClick={() => {
        håndtereOnClickMedTimeout(
          href ? href : "#",
          overskrift,
          TIMEOUT_IN_MILLIS
        );
      }}
    >
      <div className={styles.ikonOgTekstWrapper}>
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
