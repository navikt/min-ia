import {
  Accordion,
  BodyLong,
  BodyShort,
  Link,
  LinkPanel,
} from "@navikt/ds-react";
import { FunctionComponent } from "react";
import styles from "./InkluderendeArbeidslivPanel.module.scss";

export const InkluderendeArbeidslivPanel: FunctionComponent = () => {
  return (
    <>
      <Accordion className={styles.inkluderendeArbeidslivPanel}>
        <Accordion.Item>
          <Accordion.Header
            className={styles.inkluderendeArbeidslivPanel__header}
          >
            Inkluderende arbeidsliv (IA)
          </Accordion.Header>
          <Accordion.Content>
            <BodyLong
              spacing
              className={styles.inkluderendeArbeidslivPanel__avsnitt}
            >
              Partene i arbeidslivet har laget en intensjonsavtale om et mer
              inkluderende arbeidsliv.
            </BodyLong>
            <div className={styles.inkluderendeArbeidslivPanel__avsnitt}>
              <BodyShort
                className={styles.inkluderendeArbeidslivPanel__avsnitt__tittel}
              >
                De nasjonale målene i IA-avtalen i perioden 2019-2022 er:
              </BodyShort>
              <ul>
                <li>
                  Sykefraværsprosenten skal reduseres med 10 prosent
                  sammenlignet med årsgjennomsnittet for 2018.
                </li>
                <li>Frafallet fra arbeidslivet skal reduseres.</li>
              </ul>
            </div>
            <div className={styles.inkluderendeArbeidslivPanel__avsnitt}>
              <BodyShort
                className={styles.inkluderendeArbeidslivPanel__avsnitt__tittel}
              >
                For å nå målene er det valgt ut to innsatsområder:
              </BodyShort>
              <ul>
                <li>Forebyggende arbeidsmiljøarbeid</li>
                <li>
                  Innsats mot lange og/eller hyppige gjentagende sykefravær
                </li>
              </ul>
            </div>
            <Link
              href={"#"}
              className={styles.inkluderendeArbeidslivPanel__avsnitt}
            >
              Les mer om IA-avtalen på sidene til regjeringen
            </Link>
            <div className={styles.inkluderendeArbeidslivPanel__avsnitt}>
              <BodyShort
                className={styles.inkluderendeArbeidslivPanel__avsnitt__tittel}
              >
                Virkemidler som NAV leverer i IA-avtalen:
              </BodyShort>
              <LinkPanel
                className={styles.inkluderendeArbeidslivPanel__lenkepanel}
                href={"#"}
              >
                <LinkPanel.Title
                  className={
                    styles.inkluderendeArbeidslivPanel__lenkepanel__tittel
                  }
                >
                  Tilskudd til ekspertbistand
                </LinkPanel.Title>
              </LinkPanel>
              <LinkPanel
                className={styles.inkluderendeArbeidslivPanel__lenkepanel}
                href={"#"}
              >
                <LinkPanel.Title
                  className={
                    styles.inkluderendeArbeidslivPanel__lenkepanel__tittel
                  }
                >
                  Kompetansetiltak for sykmeldte
                </LinkPanel.Title>
              </LinkPanel>
              <LinkPanel
                className={styles.inkluderendeArbeidslivPanel__lenkepanel}
                href={"#"}
              >
                <LinkPanel.Title
                  className={
                    styles.inkluderendeArbeidslivPanel__lenkepanel__tittel
                  }
                >
                  HelseIArbeid
                </LinkPanel.Title>
              </LinkPanel>
              <LinkPanel
                className={styles.inkluderendeArbeidslivPanel__lenkepanel}
                href={"#"}
              >
                <LinkPanel.Title
                  className={
                    styles.inkluderendeArbeidslivPanel__lenkepanel__tittel
                  }
                >
                  Tjenester fra NAV Arbeidslivssenter
                </LinkPanel.Title>
              </LinkPanel>
            </div>
            <div className={styles.inkluderendeArbeidslivPanel__avsnitt}>
              <Link href={'#'}>Se fullstendig oversikt over NAVs tilbud her</Link>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
