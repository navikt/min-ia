import styles from "./MerOmSykefraværsstatistikk.module.css";
import {Heading} from "@navikt/ds-react";
import {HvordanHarViKommetFramTilDittResultat} from "./HvordanHarViKommetFramTilDittResultat";
import {HvilkenStatistikkVisesIkkeHer} from "./HvilkenStatistikkVisesIkkeHer";
import {HvilkenPeriodeErStatistikkenBasertPå} from "./HvilkenPeriodeErStatistikkenBasertPå";
import {HvordanSammenlignerViMedDinBransje} from "./HvordanSammenlignerViMedDinBransje";
import React from "react";

interface MerOmSykefraværsstatistikkProps {
    synnligPåStoreFlater: boolean
}

export const MerOmSykefraværsstatistikk = ({synnligPåStoreFlater}: MerOmSykefraværsstatistikkProps) => {
    const classNames = synnligPåStoreFlater ? "mer_om_statistikk__store_flater" : "mer_om_statistikk";
    return (
        <div className={styles[classNames]}>
            <Heading spacing size="small" level="2">
                Mer om sykefraværsstatistikk
            </Heading>
            <HvordanHarViKommetFramTilDittResultat/>
            <HvilkenStatistikkVisesIkkeHer/>
            <HvilkenPeriodeErStatistikkenBasertPå/>
            <HvordanSammenlignerViMedDinBransje/>
        </div>
    );
}