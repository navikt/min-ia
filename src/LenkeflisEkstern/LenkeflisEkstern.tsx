import React from "react";
import { LinkPanel } from "@navikt/ds-react";
import styles from "./lenkeflis-ekstern.module.scss";
import { sendNavigereEvent } from "../amplitude/amplitude";

export const LenkeflisEkstern: React.FunctionComponent<{
  overskrift: string;
  brødtekst: string;
  href: string | undefined;
}> = ({ overskrift, brødtekst, href }) => {
  const destinasjon = href ?? "#";
  return (
    <LinkPanel
      href={destinasjon}
      onClickCapture={(event) => event.preventDefault()}
      onClick={() => sendNavigereEvent(destinasjon, overskrift)}
    >
      <LinkPanel.Title>{overskrift}</LinkPanel.Title>
      <div className={styles.linkPanel__description__wrapper}>
        <LinkPanel.Description>{brødtekst}</LinkPanel.Description>
      </div>
    </LinkPanel>
  );
};
