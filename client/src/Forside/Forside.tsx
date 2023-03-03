import styles from "./forside.module.scss";
import React from "react";
import {useAggregertStatistikk} from "../hooks/useAggregertStatistikk";
import {erFerdigNedlastet, RestStatus} from "../integrasjoner/rest-status";
import {hentUtInfographicData} from "../komponenter/Infographic/datauthenting";
import {useOrgnr} from "../hooks/useOrgnr";
import {Alert} from "@navikt/ds-react";
import {tomtDataobjekt} from "../integrasjoner/aggregert-statistikk-api";
import {leggTilBedriftPåUrl} from "../utils/navigasjon";
import {NyttVerktoyTilDeg} from "./NyttVerktøyTilDeg/NyttVerktoyTilDeg";
import {AndreForebyggendeVerktoy} from "./AndreForebyggendeVerktøy/AndreForebyggendeVerktoy";
import {RelaterteTjenester} from "./RelaterteTjenester/RelaterteTjenester";
import {Sykefraværsstatistikk} from "./Sykefraværsstatistikk/Sykefraværsstatistikk";
import {KontaktOss} from "./KontaktOss/KontaktOss";

export interface ForsideProps {
    samtalestøtteUrl: string;
    forebyggingsplanUrl: string;
    sykefraværsstatistikkUrl: string;
}

export const Forside = (props: ForsideProps) => {
    const orgnr = useOrgnr();

    const samtalestøtteUrlMedOrgnr = leggTilBedriftPåUrl(
        props.samtalestøtteUrl,
        orgnr
    );

    const aggregertStatistikk = useAggregertStatistikk();
    const aggregertStatistikkData = erFerdigNedlastet(aggregertStatistikk)
        ? aggregertStatistikk.data
        : tomtDataobjekt;

    const infographicEllerBannerHvisError =
        aggregertStatistikk.status === RestStatus.Feil ? (
            <Alert variant={"error"} className={styles.forsideAlert}>
                Det har skjedd en feil. Vennligst prøv igjen senere.
            </Alert>
        ) : (
            <Sykefraværsstatistikk
                {...hentUtInfographicData(aggregertStatistikkData)}
                nedlastingPågår={!erFerdigNedlastet(aggregertStatistikk)}
                sykefraværsstatistikkUrl={props.sykefraværsstatistikkUrl}
            />
        );

    return (
        <div className={styles.sentrertSide}>
            <div className={styles.forside}>
                {infographicEllerBannerHvisError}
                <NyttVerktoyTilDeg href={props.forebyggingsplanUrl}/>
                <AndreForebyggendeVerktoy href={samtalestøtteUrlMedOrgnr}/>
                <RelaterteTjenester/>
            </div>
            <div className={styles.forside__footer}>
                <KontaktOss/>
            </div>
        </div>
    );
};
