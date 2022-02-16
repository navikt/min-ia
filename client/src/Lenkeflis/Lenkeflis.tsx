import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import { useWindowSize } from "../hooks/useWindowSize";

const mobileScreenMaxWidth = 480;

export const Lenkeflis: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
}> = ({ overskrift, brødtekst, ikon }) => {
  return (
    <LinkPanel href="#" className={styles.lenkeflis}>
      <div className={styles.ikonOgTekstWrapper}>
        <div className={styles.ikonWrapper}>{ikon}</div>
        <div>
          <LinkPanel.Title>{overskrift}</LinkPanel.Title>
          <Beskrivelse tekst={brødtekst} />
        </div>
      </div>
    </LinkPanel>
  );
};

function Beskrivelse(props: { tekst: string }) {
  const windowSize = useWindowSize();

  if (
    windowSize.width === undefined ||
    windowSize.width < mobileScreenMaxWidth
  ) {
    return null;
  }

  return <LinkPanel.Description>{props.tekst}</LinkPanel.Description>;
}
