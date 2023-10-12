import React, { useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./Forside.module.css";
import { getBransjeEllerNæringKategori } from "./Sammenligningspaneler/GetBransjeEllerNæringKategori";
import { Alert, BodyShort, Heading, Skeleton } from "@navikt/ds-react";
import { SlikHarViKommetFramTilDittResultat } from "./SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat";
import { PeriodeForStatistikk } from "./PeriodeForStatistikk";
import { PubliseringsdatoOppdateringsinfo } from "./PubliseringsdatoOppdateringsinfo";
import LastNedKnapp from "./LastNedKnapp";
import { Statistikkategori } from "../domene/statistikkategori";
import { useOrgnr } from "../../../hooks/useOrgnr";
import { RestStatus } from "../../../integrasjoner/rest-status";
import TestVersjonBanner from "../../../komponenter/Banner/TestVersjonBanner";

import { SykefraværAppData } from "../hooks/useSykefraværAppData";
import Historikk from "../Historikk/Historikk";
import { Sammenligningspaneler } from "./Sammenligningspaneler/Sammenligningspaneler";
import Tabell, {
  hentTabellProps,
} from "../Historikk/GrafEllerTabell/Tabell/Tabell";
import useBreadcrumbs from "../../../utils/useBreadcrumbs";

const PrintOnlyHref = dynamic(() => import("./PrintOnlyHref"), {
  ssr: false,
});

export const Forside = (appData: SykefraværAppData) => {
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
  const { skalSendeMetrikkerAutomatisk = true } = appData;

  const innholdRef = useRef<HTMLDivElement>(null);

  const loading = React.useMemo(() => {
    return [
      appData.aggregertStatistikk.restStatus,
      appData.altinnOrganisasjoner.status,
      appData.altinnOrganisasjonerMedStatistikktilgang.status,
      appData.publiseringsdatoer.status,
      appData.sykefraværshistorikk.status,
    ].some((status) =>
      [RestStatus.LasterInn, RestStatus.IkkeLastet].includes(status)
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
          {/* TODO: Props inn i TestVersjonBanner må være rett */}
          <TestVersjonBanner
            sidenavn="fraværskalkulatoren"
            prodUrl={"props.prodUrl"}
            kjørerMockApp={true}
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
              restSykefraværsstatistikk={{ status: RestStatus.IkkeLastet }}
            />
          </div>
        </div>
      </div>
    );
  }

  // TODO: handle manglende rettigheter fra Altinn
  /*
  if (!brukerHarIaRettighetTilValgtBedrift) {
    return (
      <ManglerRettigheterIAltinnSide
        restOrganisasjonerMedStatistikk={
          appData.altinnOrganisasjonerMedStatistikktilgang
        }
      />
    );
  }
  */

  const statistikKategori = getBransjeEllerNæringKategori(
    appData.aggregertStatistikk
  );
  const harBransje = statistikKategori === Statistikkategori.BRANSJE;

  const bransjeEllerNæring = appData.aggregertStatistikk.aggregertData?.get(
    harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING
  );
  const navnPåVirksomhet =
    appData.altinnOrganisasjoner.status === RestStatus.Suksess &&
    appData.altinnOrganisasjoner.data.find(
      (organisasjon) => organisasjon.OrganizationNumber === orgnr
    )?.Name;
  const tabellProps = hentTabellProps(appData.sykefraværshistorikk);

  return (
    <div className={styles["forside__wrapper"]}>
      <div className={styles["forside"]}>
        {/* TODO: Props inn i TestVersjonBanner må være rett */}
        <TestVersjonBanner
          sidenavn="fraværskalkulatoren"
          prodUrl={"props.prodUrl"}
          kjørerMockApp={true}
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
          <LastNedKnapp innholdRef={innholdRef} orgnr={orgnr} />
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
            skalSendeMetrikkerAutomatisk={skalSendeMetrikkerAutomatisk}
            aggregertStatistikk={appData.aggregertStatistikk}
            orgnr={orgnr}
          />
          {!!tabellProps && (
            <div className={styles["forside__innhold__kun-print"]}>
              <Tabell {...tabellProps} />
            </div>
          )}
          <Historikk restSykefraværsstatistikk={appData.sykefraværshistorikk} />
        </div>
      </div>
    </div>
  );
};

export default Forside;
