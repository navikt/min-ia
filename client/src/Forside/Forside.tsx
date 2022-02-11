import styles from "./forside.module.scss";
import { LinkPanel } from "@navikt/ds-react";
import { StatistikkIkonSVG } from "./StatistikkIkonSVG";
import { SamtalestøtteSVG } from "./SamtalestøtteSVG";
import { DummyIkonSVG } from "./DummyIkonSVG";

export const Forside = () => {
  return (
    <div className={styles.forside}>
      <div className={styles.panelGrid}>
        <div className={styles.panelRow}>
          <LinkPanel href="#" className={styles.panel}>
            <div
              style={{
                display: "grid",
                gridAutoFlow: "row",
                gap: "var(--navds-spacing-8)",
                alignItems: "center",
              }}
            >
              <div className={styles.ikonOgTekstWrapper}>
                <SamtalestøtteSVG className={styles.ikon} />
                <div>
                  <LinkPanel.Title>Samtalestøtten</LinkPanel.Title>
                  <LinkPanel.Description>
                    Dette verktøyet hjelper deg å strukturere de litt
                    vanskeligere samtalene med medarbeider.
                  </LinkPanel.Description>
                </div>
              </div>
            </div>
          </LinkPanel>
          <LinkPanel href="#" className={styles.panel}>
            <div
              style={{
                display: "grid",
                gridAutoFlow: "row",
                gap: "var(--navds-spacing-8)",
                alignItems: "center",
              }}
            >
              <div className={styles.ikonOgTekstWrapper}>
                <StatistikkIkonSVG className={styles.ikon} />
                <div>
                  <LinkPanel.Title>Din statistikk</LinkPanel.Title>
                  <LinkPanel.Description>
                    Her finner du oversikt over nyttig sykefraværsstatistikk du
                    kan trenge for å ta gode valg.
                  </LinkPanel.Description>
                </div>
              </div>
            </div>
          </LinkPanel>
        </div>
        <div className={styles.panelRow}>
          <LinkPanel href="#" className={styles.panel}>
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
                  <LinkPanel.Title>Hva gjør de beste</LinkPanel.Title>
                  <LinkPanel.Description>
                    Lær av de som forebygger sykefravær på en god, strukturert
                    måte.
                  </LinkPanel.Description>
                </div>
              </div>
            </div>
          </LinkPanel>
          <LinkPanel href="#" className={styles.panel}>
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
                  <LinkPanel.Title>Kurs og webinarer</LinkPanel.Title>
                  <LinkPanel.Description>
                    Her finner du kurs Nav tilbyr til arbeidsgivere som vil bli
                    bedre i inkluderende arbeidsliv.
                  </LinkPanel.Description>
                </div>
              </div>
            </div>
          </LinkPanel>
        </div>
      </div>
    </div>
  );
};
