import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";
import { sendNavigereEvent } from "../amplitude/events";
import classNames from "classnames";
import {
  IaTjeneste,
  registrerLevertInnloggetIaTjeneste,
} from "../integrasjoner/ia-tjenestemetrikker-api";
import { useOrgnr } from "../hooks/useOrgnr";
import { navigerEtterCallbacks } from "../utils/navigasjon";

export const Lenkeflis: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
  href: string | undefined;
  fyltoppBakgrunn?: boolean;
}> = ({ overskrift, brødtekst, ikon, href, fyltoppBakgrunn }) => {
  const orgnr = useOrgnr();
  const destinasjon = href ?? "#";

  const metrikkutsendelse = () =>
    registrerLevertInnloggetIaTjeneste(IaTjeneste.FOREBYGGE_FRAVÆR, orgnr);
  const eventutsendelse = () => sendNavigereEvent(destinasjon, overskrift);

  return (
    <LinkPanel
      href={destinasjon}
      onClickCapture={(e) => {
        e.preventDefault();
      }}
      className={classNames(
        styles.lenkeflis,
        fyltoppBakgrunn ? styles.lenkeflis__fyltoppBakgrunn : ""
      )}
      onClick={() => {
        navigerEtterCallbacks(destinasjon, [
          metrikkutsendelse,
          eventutsendelse,
        ]);
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
