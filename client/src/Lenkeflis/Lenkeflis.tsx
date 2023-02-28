import {LinkPanel} from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import {sendNavigereEvent} from "../amplitude/events";
import classNames from "classnames";
import {
    IaTjeneste,
    sendLevertInnloggetIaTjeneste,
} from "../integrasjoner/ia-tjenestemetrikker-api";
import {useOrgnr} from "../hooks/useOrgnr";
import {navigerEtterCallbacks} from "../utils/navigasjon";

export const Lenkeflis: React.FunctionComponent<{
    overskrift: string;
    ikon?: React.ReactElement;
    href: string | undefined;
    infographicLenkeflis?: boolean;
}> = ({
          overskrift,
          ikon,
          href,
          infographicLenkeflis,
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
                infographicLenkeflis ? styles.lenkeflis__infographic : ""
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
                    infographicLenkeflis ? styles.ikonOgTekstWrapper__infographicLenkeflis : ""
                )}
            >
                {ikon && <div className={styles.ikonWrapper}>{ikon}</div>}
                <LinkPanel.Title>
                    <div dangerouslySetInnerHTML={{__html: overskrift}}/>
                </LinkPanel.Title>
            </div>
        </LinkPanel>
    );
};
