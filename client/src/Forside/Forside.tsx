import styles from "./forside.module.scss";
import { StatistikkIkonIkon } from "./ikoner/StatistikkIkonIkon";
import { SamtalestøtteIkon } from "./ikoner/SamtalestøtteIkon";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { KursOgWebinarerIkon } from "./ikoner/KursOgWebinarerIkon";
import { Calculator } from "@navikt/ds-icons";
import { LenkeflisEkstern } from "../LenkeflisEkstern/LenkeflisEkstern";
import { IdebankenIkon } from "./ikoner/IdebankenIkon";
import { ArbeidsmiljøPortalenIkon } from "./ikoner/ArbeidsmiljøportalenIkon";
import React, { useEffect, useState } from "react";
import { useSykefraværshistorikk } from "../hooks/useSykefraværshistorikk";
import { RestStatus } from "../integrasjoner/rest-status";
import { Infographic } from "../Infographic/Infographic";
import { kalkulerInfographicData } from "../Infographic/datatransformasjon";
import { useAmplitude } from "../amplitude/useAmplitude";
import { AmplitudeClient } from "../amplitude/client";
import { sendSidevisningEvent } from "../amplitude/events";
import { useOrgnr } from "../hooks/useOrgnr";
import { Alert } from "@navikt/ds-react";
import { getMiljø } from "../utils/miljøUtils";
import {
  Applikasjon,
  getUrlForApplikasjon,
  utledUrlForBedrift,
} from "../utils/urlUtils";

export const Forside = (props: { amplitudeClient: AmplitudeClient }) => {
  const bredde = 60;
  const høyde = 60;

  useAmplitude(props.amplitudeClient);
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
    sendSidevisningEvent();
  }, [orgnr, miljø]);

  const sykefraværshistorikk = useSykefraværshistorikk();
  const infographicHvisDataOk =
    sykefraværshistorikk.status !== RestStatus.Suksess ? null : (
      <Infographic {...kalkulerInfographicData(sykefraværshistorikk.data)} />
    );

  return (
    <div className={styles.forside}>
      <Alert variant={"info"} className={styles.forsideAlert}>
        Vi jobber med å oppdatere sidene våre.
      </Alert>
      {infographicHvisDataOk}
      <div className={styles.panelGrid}>
        <Lenkeflis
          overskrift={"Samtalestøtten"}
          ikon={<SamtalestøtteIkon />}
          brødtekst={
            "Dette verktøyet hjelper deg å strukturere de litt vanskeligere samtalene med medarbeider."
          }
          href={samtalestotteUrl}
        />
        <Lenkeflis
          overskrift={"Statistikk"}
          ikon={<StatistikkIkonIkon />}
          brødtekst={
            "Her finner du oversikt over nyttig sykefraværsstatistikk du kan trenge for å ta gode valg."
          }
          href={sykefravarsstatistikkUrl}
        />
        {/* Lenkeflisa er fjernet inntil vi har "Hva gjør de som lykkes"-siden oppe å kjøre
        <Lenkeflis
          overskrift={"Hva gjør de som lykkes"}
          ikon={<HvaGjørDeSomLykkesIkon />}
          brødtekst={
            "Lær av de som forebygger sykefravær på en god, strukturert måte."
          }
          href={"/hva_gjor_de_som_lykkes"}
        />*/}
        <Lenkeflis
          overskrift={"Kurs og webinarer"}
          ikon={<KursOgWebinarerIkon />}
          brødtekst={
            "Her finner du kurs Nav tilbyr til arbeidsgivere som vil bli bedre i inkluderende arbeidsliv."
          }
          href={getUrlForApplikasjon(Applikasjon.Nettkurs, miljø)}
        />
        <Lenkeflis
          overskrift={"Kalkulator"}
          ikon={<Calculator />}
          brødtekst={
            "Her får du en rask og enkel oversikt over hvor mye sykefraværet kan koste."
          }
          href={kalkulatorUrl}
        />
        <LenkeflisEkstern
          overskrift={"Idébanken"}
          ikon={<IdebankenIkon width={bredde} height={høyde} />}
          brødtekst={
            "Idébanken har flere nyttige verktøy man kan anvende for å få kontroll over fraværet og arbeidsmiljø."
          }
          href={"https://www.idebanken.org"}
        />
        <LenkeflisEkstern
          overskrift={"Arbeidsmiljø&shy;portalen"}
          ikon={<ArbeidsmiljøPortalenIkon width={bredde} height={høyde} />}
          brødtekst={
            "På arbeidsmiljøportalen finner du skreddersydde verktøy for alle bransjer!"
          }
          href={"https://www.arbeidsmiljoportalen.no"}
        />
      </div>
    </div>
  );
};
