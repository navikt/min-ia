import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";
import { sendNavigereEvent } from "../amplitude/events";
import classNames from "classnames";
import {
  IaTjeneste,
  sendLevertInnloggetIaTjeneste,
} from "../integrasjoner/ia-tjenestemetrikker-api";
import { useOrgnr } from "../hooks/useOrgnr";
import { navigerEtterCallbacks } from "../utils/navigasjon";

export const Lenkeflis: React.FunctionComponent<{
  overskrift: string;
  ikon?: React.ReactElement;
  brødtekst: string;
  href: string | undefined;
  infographicLenkleflis?: boolean;
  visBrødtekstPåMobil?: boolean;
}> = ({
  overskrift,
  brødtekst,
  ikon,
  href,
  infographicLenkleflis,
  visBrødtekstPåMobil,
}) => {
  const orgnr = useOrgnr();
  const destinasjon = href ?? "#";

  const metrikkutsendelse = () =>
    sendLevertInnloggetIaTjeneste(IaTjeneste.FOREBYGGE_FRAVÆR, orgnr);
  const eventutsendelse = () => sendNavigereEvent(destinasjon, overskrift);

  return (
    <LinkPanel
      href={destinasjon}
      className={classNames(
        styles.lenkeflis,
        infographicLenkleflis ? styles.lenkeflis__infographic : ""
      )}
      onClickCapture={(e) => {
        e.preventDefault();
      }}
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
          infographicLenkleflis ? styles.ikonOgTekstWrapper__fyltoppBakgrunn : ""
        )}
      >
        {ikon && <div className={styles.ikonWrapper}>{ikon}</div>}
        <div>
          <LinkPanel.Title>
            <div dangerouslySetInnerHTML={{ __html: overskrift }} />
          </LinkPanel.Title>
          {visBrødtekstPåMobil ? (
            <LinkPanel.Description>{brødtekst}</LinkPanel.Description>
          ) : (
            <PanelBrødtekstSkjultPåMobil tekst={brødtekst} />
          )}
        </div>
      </div>
    </LinkPanel>
  );
};
