import styles from "./forside.module.scss";
import { StatistikkIkonIkon } from "./ikoner/StatistikkIkonIkon";
import { SamtalestøtteIkon } from "./ikoner/SamtalestøtteIkon";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { HvaGjørDeSomLykkesIkon } from "./ikoner/HvaGjørDeSomLykkesIkon";
import { KursOgWebinarerIkon } from "./ikoner/KursOgWebinarerIkon";
import { Calculator } from "@navikt/ds-icons";
import { LenkeflisEkstern } from "../LenkeflisEkstern/LenkeflisEkstern";
import { IdebankenIkon } from "./ikoner/IdebankenIkon";
import { ArbeidsmiljøPortalenIkon } from "./ikoner/ArbeidsmiljøportalenIkon";
import React, { useEffect, useState } from "react";
import { string } from "prop-types";

export const Forside = () => {
  const bredde = 60;
  const høyde = 60;
  return (
    <div className={styles.forside}>
      <div className={styles.panelGrid}>
        <Lenkeflis
          overskrift={"Samtalestøtten"}
          ikon={<SamtalestøtteIkon />}
          brødtekst={
            "Dette verktøyet hjelper deg å strukturere de litt vanskeligere samtalene med medarbeider."
          }
          href={process.env.SAMTALESTOTTE_URL}
        />
        <Lenkeflis
          overskrift={"Din statistikk"}
          ikon={<StatistikkIkonIkon />}
          brødtekst={
            "Her finner du oversikt over nyttig sykefraværsstatistikk du kan trenge for å ta gode valg."
          }
          href={process.env.SYKEFRAVARSSTATISTIKK}
        />
        <Lenkeflis
          overskrift={"Hva gjør de som lykkes"}
          ikon={<HvaGjørDeSomLykkesIkon />}
          brødtekst={
            "Lær av de som forebygger sykefravær på en god, strukturert måte."
          }
          href={"/hva_gjor_de_som_lykkes"}
        />
        <Lenkeflis
          overskrift={"Kurs og webinarer"}
          ikon={<KursOgWebinarerIkon />}
          brødtekst={
            "er finner du kurs Nav tilbyr til arbeidsgivere som vil bli bedre i inkluderende arbeidsliv."
          }
          href={"/kurs_og_webinar"}
        />
        <Lenkeflis
          overskrift={"Kalkulator"}
          ikon={<Calculator />}
          brødtekst={
            "er finner du kurs Nav tilbyr til arbeidsgivere som vil bli bedre i inkluderende arbeidsliv."
          }
          href={process.env.KALKULATOR}
        />
        <LenkeflisEkstern
          overskrift={"Idébanken"}
          ikon={<IdebankenIkon width={bredde} height={høyde} />}
          brødtekst={
            "Idébanken har flere nyttige verktøy man kan anvende for å få kontroll over fraværet og arbeidsmiljø."
          }
          href={process.env.IDEBANKEN}
        />
        <LenkeflisEkstern
          overskrift={"Arbeidsmiljø&shy;portalen"}
          ikon={<ArbeidsmiljøPortalenIkon width={bredde} height={høyde} />}
          brødtekst={
            "På arbeidsmiljøportalen finner du skreddersydde verktøy for alle bransjer!"
          }
          href={process.env.ARBEIDSMILJOPORTALEN}
        />
      </div>
    </div>
  );
};
