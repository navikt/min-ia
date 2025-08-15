import styles from "./forside.module.scss";
import React from "react";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import { erFerdigNedlastet, RestStatus } from "../integrasjoner/rest-status";
import { hentUtSykefraværsstatistikkData } from "../komponenter/Infographic/datauthenting";
import { Alert, Page } from "@navikt/ds-react";
import { tomtDataobjekt } from "../integrasjoner/aggregert-statistikk-api";
import { Sykefraværsstatistikk } from "./Sykefraværsstatistikk/Sykefraværsstatistikk";
import KontaktOss from "./KontaktOss/KontaktOss";
import FiaSamarbeidsstatus from "./FiaSamarbeidsstatus/FiaSamarbeidsstatus";
import { useFiaSamarbeidsstatus } from "./FiaSamarbeidsstatus/fiaSamarbeidsstatusAPI";
import TestVersjonBanner from "../komponenter/TestVersjonBanner/TestVersjonBanner";
import Aktiviteter from "../Aktiviteter/Aktiviteter";
/* import { UXSignalsWidget } from "./UXSignalsWidget"; */
import Fraværskalkulator from "./Fraværskalkulator/Fraværskalkulator";
import TjenesterFraNav from "./TjenesterFraNav/TjenesterFraNav";
import VerktøyOgRessurser from "./VerktlyOgRessurser/VerktøyOgRessurser";
import InkluderendeArbeidsliv from "./InkluderendeArbeidsliv/InkluderendeArbeidsliv";
import Samarbeidsoversikt from "../Samarbeid/Samarbeidsoversikt";

export interface ForsideProps {
    sykefraværsstatistikkUrl: string;
    kontaktOssUrl: string;
    kjørerMockApp: boolean;
    children?: React.ReactNode;
    prodUrl?: string;
}

export const Forside = (props: ForsideProps) => {
    const aggregertStatistikk = useAggregertStatistikk();
    const aggregertStatistikkData = erFerdigNedlastet(aggregertStatistikk)
        ? aggregertStatistikk.data
        : tomtDataobjekt;

    const fiaSamarbeidsstatus = useFiaSamarbeidsstatus();

    return (
        <>
            <TestVersjonBanner
                sidenavn="siden for å forebygge fravær"
                prodUrl={props.prodUrl}
                kjørerMockApp={props.kjørerMockApp}
            />
            <Page.Block width="xl" style={{ position: "relative" }}>
                {props.children}
                {/* <UXSignalsWidget eriDev={props.kjørerMockApp} id={"panel-bcv89ijxbx"} /> */}
            </Page.Block>
            {fiaSamarbeidsstatus.status === RestStatus.Suksess &&
                fiaSamarbeidsstatus.data.samarbeid === "I_SAMARBEID" && (
                    <FiaSamarbeidsstatus status={fiaSamarbeidsstatus.data.samarbeid} />
                )}
            <Samarbeidsoversikt />
            {aggregertStatistikk.status === RestStatus.Feil ? (
                <Page.Block width="xl">
                    <Alert variant={"error"} className={styles.forsideAlert}>
                        Det har skjedd en feil. Vennligst prøv igjen senere.
                    </Alert>
                </Page.Block>
            ) : (
                <Sykefraværsstatistikk
                    {...hentUtSykefraværsstatistikkData(aggregertStatistikkData)}
                    nedlastingPågår={!erFerdigNedlastet(aggregertStatistikk)}
                    sykefraværsstatistikkUrl={props.sykefraværsstatistikkUrl}
                />
            )}
            <Fraværskalkulator />
            <TjenesterFraNav />
            <VerktøyOgRessurser />
            <InkluderendeArbeidsliv />
            <Aktiviteter sykefraværsstatistikk={aggregertStatistikkData} />
            <KontaktOss kontaktOssUrl={props.kontaktOssUrl} />
        </>
    );
};
