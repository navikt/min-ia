import styles from "./forside.module.scss";
import React from "react";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import { erFerdigNedlastet, RestStatus } from "../integrasjoner/rest-status";
import { hentUtSykefraværsstatistikkData } from "../komponenter/Infographic/datauthenting";
import { useOrgnr } from "../hooks/useOrgnr";
import { Alert } from "@navikt/ds-react";
import { tomtDataobjekt } from "../integrasjoner/aggregert-statistikk-api";
import { leggTilBedriftPåUrl } from "../utils/navigasjon";
import { RelaterteTjenester } from "./RelaterteTjenester/RelaterteTjenester";
import { Sykefraværsstatistikk } from "./Sykefraværsstatistikk/Sykefraværsstatistikk";
import { KontaktOss } from "./KontaktOss/KontaktOss";
import FiaSamarbeidsstatus from "./FiaSamarbeidsstatus/FiaSamarbeidsstatus";
import { useFiaSamarbeidsstatus } from "./FiaSamarbeidsstatus/fiaSamarbeidsstatusAPI";
import TestVersjonBanner from "../komponenter/Banner/TestVersjonBanner";
import Aktiviteter from "../Aktiviteter/Aktiviteter";

export interface ForsideProps {
  samtalestøtteUrl: string;
  sykefraværsstatistikkUrl: string;
  kontaktOssUrl: string;
  kjørerMockApp: boolean;
  children?: React.ReactNode;
  prodUrl?: string;
}

export const Forside = (props: ForsideProps) => {
  const orgnr = useOrgnr();

  const samtalestøtteUrlMedOrgnr = leggTilBedriftPåUrl(
    props.samtalestøtteUrl,
    orgnr,
  );

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
      {props.kjørerMockApp && (
        <TestVersjonBanner
          sidenavn="siden for å forebygge fravær"
          prodUrl={props.prodUrl}
        />
      )}
      <div className={styles.forside}>
        {props.children}
        {sykefraværsstatistikkEllerBannerHvisError}
        <Aktiviteter
          samtalestøtteUrlMedOrgnr={samtalestøtteUrlMedOrgnr}
          sykefraværsstatistikk={aggregertStatistikkData}
        />
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
