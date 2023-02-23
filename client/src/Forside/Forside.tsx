import styles from "./forside.module.scss";
import { SamtalestøtteIkon } from "./ikoner/SamtalestøtteIkon";
import { Calculator, HandsHeart } from "@navikt/ds-icons";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { KursOgWebinarerIkon } from "./ikoner/KursOgWebinarerIkon";
import { LenkeflisEkstern } from "../LenkeflisEkstern/LenkeflisEkstern";
import { IdebankenIkon } from "./ikoner/IdebankenIkon";
import { ArbeidsmiljøPortalenIkon } from "./ikoner/ArbeidsmiljøportalenIkon";
import React from "react";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import { erFerdigNedlastet, RestStatus } from "../integrasjoner/rest-status";
import { Infographic } from "../komponenter/Infographic/Infographic";
import { hentUtInfographicData } from "../komponenter/Infographic/datauthenting";
import { useOrgnr } from "../hooks/useOrgnr";
import { Alert } from "@navikt/ds-react";
import { InkluderendeArbeidslivPanel } from "../InkluderendeArbeidslivPanel/InkluderendeArbeidslivPanel";
import { tomtDataobjekt } from "../integrasjoner/aggregert-statistikk-api";
import { leggTilBedriftPåUrl } from "../utils/navigasjon";

const samtalestøtteUrl = () => process.env.NEXT_PUBLIC__SAMTALESTOTTE_URL || "#";
const forebyggingsplanUrl = () => process.env.NEXT_PUBLIC__FOREBYGGINGSPLAN_URL || "#"

export const Forside = () => {
  const bredde = 60;
  const høyde = 60;

  const orgnr = useOrgnr();

  const samtalestøtteUrlMedOrgnr = leggTilBedriftPåUrl(
    samtalestøtteUrl(),
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
      <Infographic
        {...hentUtInfographicData(aggregertStatistikkData)}
        nedlastingPågår={!erFerdigNedlastet(aggregertStatistikk)}
      />
    );

  return (
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
            href={samtalestøtteUrlMedOrgnr}
          />
          <Lenkeflis
            overskrift={"Video og kurs"}
            ikon={<KursOgWebinarerIkon />}
            brødtekst={
              "Her finner du videoer og kurs for å forebygge, følge opp og redusere sykefravær."
            }
            href={"/forebygge-fravar/video-og-kurs"}
          />
          <Lenkeflis
            overskrift={"Fraværs&shy;kalkulator"}
            ikon={<Calculator />}
            brødtekst={
              "Her får du en rask og enkel oversikt over hvor mye sykefraværet kan koste."
            }
            href={"/forebygge-fravar/kalkulator"}
          />
          <Lenkeflis
            overskrift={"Forebygg fravær hos dere"}
            ikon={<HandsHeart />}
            brødtekst={
              "Vi har samlet nyttige forslag til aktiviteter dere kan gjøre for å forebygge fravær."
            }
            href={forebyggingsplanUrl()}
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
};
