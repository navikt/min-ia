import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { sizeWidth } from "@material-ui/system";

const mobileScreenMaxWidth = 480;

export const Lenkeflis: React.FunctionComponent<{
  overskrift: string;
  brødtekst: string;
}> = ({ overskrift, brødtekst, children }) => {
  return (
    <LinkPanel href="#" className={styles.lenkeflis}>
      <div className={styles.ikonOgTekstWrapper}>
        <div className={styles.ikon}>{children}</div>
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

  if (windowSize.width === undefined) {
    return null;
  }

  return windowSize.width < mobileScreenMaxWidth ? null : (
    <LinkPanel.Description>{props.tekst}</LinkPanel.Description>
  );
}
