import React, { useRef } from "react";
import styles from "./Forside.module.css";
import { getBransjeEllerNæringKategori } from "./Sammenligningspaneler/GetBransjeEllerNæringKategori";
import { Alert, BodyShort, Heading, Skeleton } from "@navikt/ds-react";
import { SlikHarViKommetFramTilDittResultat } from "./SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat";
import { PeriodeForStatistikk } from "./PeriodeForStatistikk";
import { PubliseringsdatoOppdateringsinfo } from "./PubliseringsdatoOppdateringsinfo";
import LastNedKnapp from "./LastNedKnapp";
import { Statistikkategori } from "../domene/statistikkategori";
import { useOrgnr } from "../../hooks/useOrgnr";
import { RestStatus } from "../../integrasjoner/rest-status";
import TestVersjonBanner from "../../komponenter/Banner/TestVersjonBanner";

import { SykefraværAppData } from "../hooks/useSykefraværAppData";
import Historikk from "../Historikk/Historikk";
import { Sammenligningspaneler } from "./Sammenligningspaneler/Sammenligningspaneler";
import Tabell, {
  hentTabellProps,
} from "../Historikk/GrafEllerTabell/Tabell/Tabell";
import useBreadcrumbs from "../../utils/useBreadcrumbs";
import { Layout } from "../../komponenter/Layout/Layout";
import { ManglerRettigheterIAltinnSide } from "../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide";
import PrintOnlyHref from "./PrintOnlyHref";
import Head from "next/head";

export const Forside = ({
  kjørerMockApp,
  prodUrl,
  ...appData
}: SykefraværAppData & {
  kjørerMockApp: boolean;
  prodUrl?: string;
}) => {
  useBreadcrumbs([
    {
      title: "Min side – arbeidsgiver",
      url: "/min-side-arbeidsgiver",
    },
    {
      title: "Forebygge fravær",
      url: "/forebygge-fravar",
    },
    {
      title: "Sykefraværsstatistikk",
      url: "/forebygge-fravar/sykefravarsstatistikk",
    },
  ]);

  const orgnr = useOrgnr() || "";
  const harFeil = appData.aggregertStatistikk.restStatus === RestStatus.Feil;

  const brukerHarIaRettighetTilValgtBedrift =
    appData.altinnOrganisasjonerMedStatistikktilgang.status ===
      RestStatus.Suksess &&
    appData.altinnOrganisasjonerMedStatistikktilgang.data
      .map((org) => org.OrganizationNumber)
      .includes(orgnr);

  const innholdRef = useRef<HTMLDivElement>(null);

  const loading = React.useMemo(() => {
    return [
      appData.aggregertStatistikk.restStatus,
      appData.altinnOrganisasjoner.status,
      appData.altinnOrganisasjonerMedStatistikktilgang.status,
      appData.publiseringsdatoer.status,
      appData.sykefraværshistorikk.status,
    ].some((status) =>
      [RestStatus.LasterInn, RestStatus.IkkeLastet].includes(status),
    );
  }, [
    appData.aggregertStatistikk.restStatus,
    appData.altinnOrganisasjoner.status,
    appData.altinnOrganisasjonerMedStatistikktilgang.status,
    appData.publiseringsdatoer.status,
    appData.sykefraværshistorikk.status,
  ]);

  if (loading) {
    return (
      <div className={styles["forside__wrapper"]}>
        <div className={styles["forside"]}>
          <TestVersjonBanner
            sidenavn="sykefraværsstatistikken"
            prodUrl={prodUrl}
            kjørerMockApp={kjørerMockApp}
          />
          <div className={styles["forside__innhold"]}>
            <div className={styles["forside__innhold__header"]}>
              <PrintOnlyHref />
              <Heading spacing size="medium" level="2" as="span">
                <Skeleton width="65%" />
              </Heading>
            </div>
            <Skeleton
              variant="rectangle"
              width={105}
              height={48}
              className={styles["forside__innhold__knapp"]}
            />
            <BodyShort as="div">
              <strong>
                <Skeleton width="40%" />
              </strong>
            </BodyShort>
            <BodyShort spacing as="div">
              <strong>
                <Skeleton width="30%" />
              </strong>
            </BodyShort>
            <Skeleton width="60%" />
            <Skeleton width="30%" />
            <Skeleton width="45%" />
            <Skeleton width="50%" />
            <Sammenligningspaneler
              aggregertStatistikk={{ restStatus: RestStatus.IkkeLastet }}
              orgnr={orgnr}
            />
            <Historikk
              orgnr={orgnr}
              restSykefraværsstatistikk={{ status: RestStatus.IkkeLastet }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!brukerHarIaRettighetTilValgtBedrift) {
    return (
      <ManglerRettigheterIAltinnSide
        restOrganisasjonerMedStatistikk={
          appData.altinnOrganisasjonerMedStatistikktilgang
        }
      />
    );
  }

  const statistikKategori = getBransjeEllerNæringKategori(
    appData.aggregertStatistikk,
  );
  const harBransje = statistikKategori === Statistikkategori.BRANSJE;

  const bransjeEllerNæring = appData.aggregertStatistikk.aggregertData?.get(
    harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING,
  );
  const navnPåVirksomhet =
    appData.altinnOrganisasjoner.status === RestStatus.Suksess &&
    appData.altinnOrganisasjoner.data.find(
      (organisasjon) => organisasjon.OrganizationNumber === orgnr,
    )?.Name;
  const tabellProps = hentTabellProps(appData.sykefraværshistorikk);

  return (
    <div className={styles["forside__wrapper"]}>
      <div className={styles["forside"]}>
        <TestVersjonBanner
          sidenavn="sykefraværsstatistikken"
          prodUrl={prodUrl}
          kjørerMockApp={kjørerMockApp}
        />
        <div className={styles["forside__innhold"]} ref={innholdRef}>
          {harFeil && (
            <Alert
              variant={"error"}
              className={styles["forside__innhold__info-eller-feilmelding"]}
            >
              Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv
              igjen senere.
            </Alert>
          )}
          <div className={styles["forside__innhold__header"]}>
            <PrintOnlyHref />
            <Heading spacing size="medium" level="2">
              Sykefraværsstatistikk for {navnPåVirksomhet}
            </Heading>
          </div>
          <LastNedKnapp innholdRef={innholdRef} />
          <BodyShort>
            <strong>Organisasjonsnummer: {orgnr}</strong>
          </BodyShort>
          <BodyShort spacing>
            <strong>
              {harBransje ? "Bransje" : "Næring"}:{" "}
              {bransjeEllerNæring?.prosentSiste4KvartalerTotalt?.label}
            </strong>
          </BodyShort>
          <PeriodeForStatistikk
            restPubliseringsdatoer={appData.publiseringsdatoer}
          />
          <PubliseringsdatoOppdateringsinfo
            restPubliseringsdatoer={appData.publiseringsdatoer}
          />
          <SlikHarViKommetFramTilDittResultat />
          <Sammenligningspaneler
            aggregertStatistikk={appData.aggregertStatistikk}
            orgnr={orgnr}
          />
          {!!tabellProps && (
            <div className={styles["forside__innhold__kun-print"]}>
              <Tabell {...tabellProps} />
            </div>
          )}
          <Historikk
            restSykefraværsstatistikk={appData.sykefraværshistorikk}
            orgnr={orgnr}
          />
        </div>
      </div>
    </div>
  );
};

const WrappedForside = (
  props: SykefraværAppData & {
    kjørerMockApp: boolean;
    prodUrl?: string;
  },
) => {
  return (
    <>
      <Head>
        <title>Sykefraværsstatistikk</title>
        <meta property="og:title" content="Page title" key="title" />
      </Head>
      <Layout
        title="Sykefraværsstatistikk"
        description="INKLUDERENDE ARBEIDSLIV"
        kjørerMockApp={props.kjørerMockApp}
        altinnOrganisasjoner={
          props.altinnOrganisasjoner.status === RestStatus.Suksess
            ? props.altinnOrganisasjoner.data
            : []
        }
      >
        <Forside {...props} />
      </Layout>
    </>
  );
};

export default WrappedForside;
