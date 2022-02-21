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
import React from "react";

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
        />
        <Lenkeflis
          overskrift={"Din statistikk"}
          ikon={<StatistikkIkonIkon />}
          brødtekst={
            "Her finner du oversikt over nyttig sykefraværsstatistikk du kan trenge for å ta gode valg."
          }
        />
        <Lenkeflis
          overskrift={"Hva gjør de som lykkes"}
          ikon={<HvaGjørDeSomLykkesIkon />}
          brødtekst={
            "Lær av de som forebygger sykefravær på en god, strukturert måte."
          }
        />
        <Lenkeflis
          overskrift={"Kurs og webinarer"}
          ikon={<KursOgWebinarerIkon />}
          brødtekst={
            "er finner du kurs Nav tilbyr til arbeidsgivere som vil bli bedre i inkluderende arbeidsliv."
          }
        />
        <Lenkeflis
          overskrift={"Kalkulator"}
          ikon={<Calculator />}
          brødtekst={
            "er finner du kurs Nav tilbyr til arbeidsgivere som vil bli bedre i inkluderende arbeidsliv."
          }
        />
        <LenkeflisEkstern
          overskrift={"Idébanken"}
          ikon={<IdebankenIkon width={bredde} height={høyde} />}
          brødtekst={
            "Idébanken har flere nyttige verktøy man kan anvende for å få kontroll over fraværet og arbeidsmiljø."
          }
        />
        <LenkeflisEkstern
          overskrift={"Arbeidsmiljø&shy;portalen"}
          ikon={<ArbeidsmiljøPortalenIkon width={bredde} height={høyde} />}
          brødtekst={
            "På arbeidsmiljøportalen finner du skreddersydde verktøy for alle bransjer!"
          }
        />
      </div>
    </div>
  );
};
