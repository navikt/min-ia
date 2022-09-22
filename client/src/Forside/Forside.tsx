import styles from "./forside.module.scss";
import { StatistikkIkonIkon } from "./ikoner/StatistikkIkonIkon";
import { SamtalestøtteIkon } from "./ikoner/SamtalestøtteIkon";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { KursOgWebinarerIkon } from "./ikoner/KursOgWebinarerIkon";
import { Calculator } from "@navikt/ds-icons";
import { LenkeflisEkstern } from "../LenkeflisEkstern/LenkeflisEkstern";
import { IdebankenIkon } from "./ikoner/IdebankenIkon";
import { ArbeidsmiljøPortalenIkon } from "./ikoner/ArbeidsmiljøportalenIkon";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import {
  erSykefraværsstatistikkLastetNed,
  RestStatus,
} from "../integrasjoner/rest-status";
import { Infographic } from "../komponenter/Infographic/Infographic";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { hentUtInfographicData } from "../komponenter/Infographic/datauthenting";
import { useOrgnr } from "../hooks/useOrgnr";
import { Alert } from "@navikt/ds-react";
import { getMiljø } from "../utils/miljøUtils";
import {
  Applikasjon,
  getUrlForApplikasjon,
  utledUrlForBedrift,
} from "../utils/navigasjon";
import { InkluderendeArbeidslivPanel } from "../InkluderendeArbeidslivPanel/InkluderendeArbeidslivPanel";
import { ManglerRettighetRedirect } from "../utils/Redirects";

interface ForsideProps {
  harNoenOrganisasjoner: boolean;
}

export const Forside: FunctionComponent<ForsideProps> = ({
  harNoenOrganisasjoner,
}) => {
  const bredde = 60;
  const høyde = 60;

  const orgnr = useOrgnr();
  const miljø = getMiljø();

  const [samtalestotteUrl, setSamtalestotteUrl] = useState("#");
  const [sykefravarsstatistikkUrl, setSykefravarsstatistikkUrl] = useState("#");
  const [kalkulatorUrl, setKalkulatorUrl] = useState("#");

  useEffect(() => {
    setSamtalestotteUrl(
      utledUrlForBedrift(
        getUrlForApplikasjon(Applikasjon.Samtalestøtte, miljø),
        orgnr
      )
    );
    setSykefravarsstatistikkUrl(
      utledUrlForBedrift(
        getUrlForApplikasjon(Applikasjon.Sykefraværsstatistikk, miljø),
        orgnr
      )
    );
    setKalkulatorUrl(
      utledUrlForBedrift(
        getUrlForApplikasjon(Applikasjon.Kalkulator, miljø),
        orgnr
      )
    );
  }, [orgnr, miljø]);

  const aggregertStatistikk = useAggregertStatistikk();
  const aggregertStatistikkData = erSykefraværsstatistikkLastetNed(
    aggregertStatistikk
  )
    ? aggregertStatistikk.data
    : { prosentSiste4KvartalerTotalt: [], trendTotalt: [] };

  const infographicEllerBannerHvisError =
    aggregertStatistikk.status === RestStatus.Feil ||
    (!harNoenOrganisasjoner &&
      aggregertStatistikk.status !== RestStatus.IkkeLastet) ? (
      <Alert variant={"error"} className={styles.forsideAlert}>
        Det har skjedd en feil. Vennligst prøv igjen senere.
      </Alert>
    ) : (
      <Infographic
        {...hentUtInfographicData(aggregertStatistikkData)}
        nedlastingPågår={
          aggregertStatistikk.status === RestStatus.IkkeLastet ||
          aggregertStatistikk.status === RestStatus.LasterInn
        }
      />
    );

  const forside = (
    <>
      <div className={styles.forside}>
        {infographicEllerBannerHvisError}
        <div className={styles.panelGrid}>
          <Lenkeflis
            overskrift={"Samtalestøtten"}
            ikon={<SamtalestøtteIkon />}
            brødtekst={
              "Dette verktøyet hjelper deg å strukturere samtaler med medarbeider."
            }
            href={samtalestotteUrl}
          />
          <Lenkeflis
            overskrift={"Nettkurs"}
            ikon={<KursOgWebinarerIkon />}
            brødtekst={
              "Her finner du kurs for å forebygge, følge opp og redusere sykefravær."
            }
            href={getUrlForApplikasjon(Applikasjon.Nettkurs, miljø)}
          />
          <Lenkeflis
            overskrift={"Fraværs&shy;kalkulator"}
            ikon={<Calculator />}
            brødtekst={
              "Her får du en rask og enkel oversikt over hvor mye sykefraværet kan koste."
            }
            href={kalkulatorUrl}
          />
          <Lenkeflis
            overskrift={"Sykefraværs&shy;statistikk"}
            ikon={<StatistikkIkonIkon />}
            brødtekst={
              "Her finner du oversikt over nyttig sykefraværsstatistikk du kan trenge for å ta gode valg."
            }
            href={sykefravarsstatistikkUrl}
          />
          <InkluderendeArbeidslivPanel />
          <LenkeflisEkstern
            overskrift={"Idébanken"}
            ikon={<IdebankenIkon width={bredde} height={høyde} />}
            brødtekst={
              "På idébanken finner du ideer, erfaringer og verktøy som kan bidra til bedre arbeidsmiljø og lavere sykefravær."
            }
            href={"https://www.idebanken.org"}
          />
          <LenkeflisEkstern
            overskrift={"Arbeidsmiljø&shy;portalen"}
            ikon={<ArbeidsmiljøPortalenIkon width={bredde} height={høyde} />}
            brødtekst={
              "Leter du etter flere gode verktøy for å bedre arbeidsmiljøet? Her finner du kunnskap og digitale verktøy."
            }
            href={"https://www.arbeidsmiljoportalen.no"}
          />
        </div>
      </div>
    </>
  );

  switch (aggregertStatistikk.status) {
    case RestStatus.IkkeInnlogget:
      return <Innloggingsside redirectUrl={window.location.href} />;
    case RestStatus.IngenTilgang:
      return <ManglerRettighetRedirect />;
    default:
      return forside;
  }
};
