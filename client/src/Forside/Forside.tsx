import styles from "./forside.module.scss";
import { LinkPanel } from "@navikt/ds-react";
import { StatistikkIkonSVG } from "./StatistikkIkonSVG";
import { SamtalestøtteSVG } from "./SamtalestøtteSVG";
import { DummyIkonSVG } from "./DummyIkonSVG";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { HvaGjørDeSomLykkesSVG } from "./HvaGjørDeSomLykkesSVG";
import { KursOgWebinarerSVG } from "./KursOgWebinarerSVG";
import classNames from "classnames";

export const Forside = () => {
  return (
    <div className={styles.forside}>
      <div className={styles.panelGrid}>
        <Lenkeflis
          overskrift={"Samtalestøtten"}
          brødtekst={
            "Dette verktøyet hjelper deg å strukturere de litt vanskeligere samtalene med medarbeider."
          }
          className={styles.panelMargin}
        >
          <SamtalestøtteSVG />
        </Lenkeflis>
        <Lenkeflis
          overskrift={"Din statistikk"}
          brødtekst={
            "Her finner du oversikt over nyttig sykefraværsstatistikk du kan trenge for å ta gode valg."
          }
          className={styles.panelMargin}
        >
          <StatistikkIkonSVG />
        </Lenkeflis>
        <Lenkeflis
          overskrift={"Hva gjør de som lykkes"}
          brødtekst={
            "Lær av de som forebygger sykefravær på en god, strukturert måte."
          }
          className={styles.panelMargin}
        >
          <HvaGjørDeSomLykkesSVG />
        </Lenkeflis>
        <Lenkeflis
          overskrift={"Kurs og webinarer"}
          brødtekst={
            "er finner du kurs Nav tilbyr til arbeidsgivere som vil bli bedre i inkluderende arbeidsliv."
          }
          className={styles.panelMargin}
        >
          <KursOgWebinarerSVG />
        </Lenkeflis>

        <LinkPanel className={classNames( styles.linkpanel, styles.panelMargin)} href="#">
          <div
            style={{
              display: "grid",
              gridAutoFlow: "row",
              gap: "var(--navds-spacing-8)",
              alignItems: "center",
            }}
          >
            <div className={styles.ikonOgTekstWrapper}>
              <DummyIkonSVG className={styles.ikon} />

              <div>
                <LinkPanel.Title>
                  Har du utfordringer med høyt korttidsfravær i din virksomhet?
                </LinkPanel.Title>
                <LinkPanel.Description>
                  Har du utfordringer med høyt korttidsfravær i din virksomhet?
                </LinkPanel.Description>
              </div>
            </div>
          </div>
        </LinkPanel>
        <LinkPanel className={classNames( styles.linkpanel, styles.panelMargin)} href="#">
          <div
            style={{
              display: "grid",
              gridAutoFlow: "row",
              gap: "var(--navds-spacing-8)",
              alignItems: "center",
            }}
          >
            <div className={styles.ikonOgTekstWrapper}>
              <DummyIkonSVG className={styles.ikon} />

              <div>
                <LinkPanel.Title>
                  Er du på leting etter gode verktøy innen inkluderende
                  arbeidsliv?
                </LinkPanel.Title>
                <LinkPanel.Description>
                  På arbeidsmiljøportalen.no finner du skreddersydde verktøy for
                  alle bransjer!
                </LinkPanel.Description>
              </div>
            </div>
          </div>
        </LinkPanel>
      </div>
    </div>
  );
};
