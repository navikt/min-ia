import styles from "./forside.module.scss";
import { StatistikkIkonIkon } from "./ikoner/StatistikkIkonIkon";
import { SamtalestøtteIkon } from "./ikoner/SamtalestøtteIkon";
import { DummyIkon } from "./ikoner/DummyIkon";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { HvaGjørDeSomLykkesIkon } from "./ikoner/HvaGjørDeSomLykkesIkon";
import { KursOgWebinarerIkon } from "./ikoner/KursOgWebinarerIkon";
import { Calculator } from "@navikt/ds-icons";
import { LenkeflisEkstern } from "../LenkeflisEkstern/LenkeflisEkstern";

export const Forside = () => {
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
          overskrift={
            "Har du utfordringer med høyt korttidsfravær i din virksomhet?"
          }
          ikon={<DummyIkon />}
          brødtekst={
            "Har du utfordringer med høyt korttidsfravær i din virksomhet?"
          }
        />
        <LenkeflisEkstern
          overskrift={
            "Er du på leting etter gode verktøy innen inkluderende arbeidsliv?"
          }
          ikon={<DummyIkon />}
          brødtekst={
            "På arbeidsmiljøportalen.no finner du skreddersydde verktøy for alle bransjer!"
          }
        />
      </div>
    </div>
  );
};
