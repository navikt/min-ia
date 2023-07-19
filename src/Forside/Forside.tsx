import styles from "./forside.module.scss";
import React from "react";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import { erFerdigNedlastet, RestStatus } from "../integrasjoner/rest-status";
import { hentUtSykefraværsstatistikkData } from "../komponenter/Infographic/datauthenting";
import { useOrgnr } from "../hooks/useOrgnr";
import { Alert } from "@navikt/ds-react";
import { tomtDataobjekt } from "../integrasjoner/aggregert-statistikk-api";
import { leggTilBedriftPåUrl } from "../utils/navigasjon";
import { NyttVerktoyTilDeg } from "./NyttVerktøyTilDeg/NyttVerktoyTilDeg";
import { AndreForebyggendeVerktoy } from "./AndreForebyggendeVerktøy/AndreForebyggendeVerktoy";
import { RelaterteTjenester } from "./RelaterteTjenester/RelaterteTjenester";
import { Sykefraværsstatistikk } from "./Sykefraværsstatistikk/Sykefraværsstatistikk";
import { KontaktOss } from "./KontaktOss/KontaktOss";
import FiaSamarbeidsstatus from "./FiaSamarbeidsstatus/FiaSamarbeidsstatus";
import { useFiaSamarbeidsstatus } from "./FiaSamarbeidsstatus/fiaSamarbeidsstatusAPI";

export interface ForsideProps {
  samtalestøtteUrl: string;
  forebyggingsplanUrl: string;
  sykefraværsstatistikkUrl: string;
  kontaktOssUrl: string;
  kjørerMockApp: boolean;
  children?: React.ReactNode;
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
      <div className={styles.forside}>
        {props.children}
        {sykefraværsstatistikkEllerBannerHvisError}
        <NyttVerktoyTilDeg href={props.forebyggingsplanUrl} />
        {fiaSamarbeidsstatus.status === RestStatus.Suksess
            && fiaSamarbeidsstatus.data.samarbeid === "I_SAMARBEID"
            && <FiaSamarbeidsstatus status={fiaSamarbeidsstatus.data.samarbeid} />}
        <AndreForebyggendeVerktoy href={samtalestøtteUrlMedOrgnr} />
        <RelaterteTjenester />
        <KontaktOss kontaktOssUrl={props.kontaktOssUrl} />
      </div>
    </div>
  );
};
