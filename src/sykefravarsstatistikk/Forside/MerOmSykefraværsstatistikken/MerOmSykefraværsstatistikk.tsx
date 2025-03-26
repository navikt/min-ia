import styles from "./MerOmSykefraværsstatistikk.module.css";
import {Heading} from "@navikt/ds-react";
import {HvordanHarViKommetFramTilDittResultat} from "./HvordanHarViKommetFramTilDittResultat";
import {HvilkenStatistikkVisesIkkeHer} from "./HvilkenStatistikkVisesIkkeHer";
import {HvilkenPeriodeErStatistikkenBasertPå} from "./HvilkenPeriodeErStatistikkenBasertPå";
import {HvordanSammenlignerViMedDinBransje} from "./HvordanSammenlignerViMedDinBransje";
import React from "react";

interface MerOmSykefraværsstatistikkProps {
    harBransje: boolean,
    synnligPåStoreFlater: boolean
}

export const MerOmSykefraværsstatistikk = ({harBransje, synnligPåStoreFlater}: MerOmSykefraværsstatistikkProps) => {
    const classNames = synnligPåStoreFlater ? "mer_om_statistikk__store_flater" : "mer_om_statistikk";
    return (
        <div className={styles[classNames]}>
            <Heading spacing size="small" level="2">
                Mer om sykefraværsstatistikken
            </Heading>
            <HvordanHarViKommetFramTilDittResultat/>
            <HvilkenStatistikkVisesIkkeHer/>
            <HvilkenPeriodeErStatistikkenBasertPå/>
            <HvordanSammenlignerViMedDinBransje harBransje={harBransje}/>
        </div>
    );
}