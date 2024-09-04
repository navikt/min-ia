import styles from "./forside.module.scss";
import React from "react";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import { erFerdigNedlastet, RestStatus } from "../integrasjoner/rest-status";
import { hentUtSykefraværsstatistikkData } from "../komponenter/Infographic/datauthenting";
import { Alert } from "@navikt/ds-react";
import { tomtDataobjekt } from "../integrasjoner/aggregert-statistikk-api";
import { RelaterteTjenester } from "./RelaterteTjenester/RelaterteTjenester";
import { Sykefraværsstatistikk } from "./Sykefraværsstatistikk/Sykefraværsstatistikk";
import { KontaktOss } from "./KontaktOss/KontaktOss";
import FiaSamarbeidsstatus from "./FiaSamarbeidsstatus/FiaSamarbeidsstatus";
import { useFiaSamarbeidsstatus } from "./FiaSamarbeidsstatus/fiaSamarbeidsstatusAPI";
import TestVersjonBanner from "../komponenter/Banner/TestVersjonBanner";
import Aktiviteter from "../Aktiviteter/Aktiviteter";
import {Artikkel} from "../Artikkel/Artikkel";

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

  const sykefraværsstatistikkEllerBannerHvisError =
    aggregertStatistikk.status === RestStatus.Feil ? (
      <Alert variant={"error"} className={styles.forsideAlert}>
        Det har skjedd en feil. Vennligst prøv igjen senere.
      </Alert>
    ) : (
      <Sykefraværsstatistikk
        {...hentUtSykefraværsstatistikkData(aggregertStatistikkData)}
        nedlastingPågår={!erFerdigNedlastet(aggregertStatistikk)}
        sykefraværsstatistikkUrl={props.sykefraværsstatistikkUrl}
      />
    );

  const fiaSamarbeidsstatus = useFiaSamarbeidsstatus();

  return (
    <div className={styles.sentrertSide}>
      <TestVersjonBanner
        sidenavn="siden for å forebygge fravær"
        prodUrl={props.prodUrl}
        kjørerMockApp={props.kjørerMockApp}
      />
      <div className={styles.forside}>
        {props.children}
        {sykefraværsstatistikkEllerBannerHvisError}
        <Artikkel/>
        <Aktiviteter sykefraværsstatistikk={aggregertStatistikkData} />
        {fiaSamarbeidsstatus.status === RestStatus.Suksess &&
          fiaSamarbeidsstatus.data.samarbeid === "I_SAMARBEID" && (
            <FiaSamarbeidsstatus status={fiaSamarbeidsstatus.data.samarbeid} />
          )}
        <RelaterteTjenester />
        <KontaktOss kontaktOssUrl={props.kontaktOssUrl} />
      </div>
    </div>
  );
};
