import { LinkPanel, Loader } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React, { useState } from "react";
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

  const [isLoading, setIsLoading] = useState(false);

  const håndtereOnClickMedTimeout = (
    destinasjon: string,
    lenketekst: string,
    timeout: number
  ) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(destinasjon);
    }, timeout);
    sendLenkeKlikketPåEvent(destinasjon, lenketekst).then(() => {
      router.push(destinasjon);
    });
  };

  return (
    <div className={styles.loaderOgLinkPanelWrapper}>
      {isLoading && (
        <Loader
          className={styles.loaderRight}
          variant="interaction"
          size="medium"
          title="venter..."
        />
      )}
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
          håndtereOnClickMedTimeout(
            href ? href : "#",
            overskrift,
            TIMEOUT_IN_MILLIS
          );
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
    </div>
  );
};
