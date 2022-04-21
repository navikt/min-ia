import {
  Accordion,
  BodyLong,
  BodyShort,
  Link,
  LinkPanel,
} from "@navikt/ds-react";
import { FunctionComponent } from "react";
import styles from "./InkluderendeArbeidslivPanel.module.scss";
import classNames from "classnames";

export const InkluderendeArbeidslivPanel: FunctionComponent = () => {
  return (
    <>
      <Accordion className={styles.inkluderendeArbeidslivPanel}>
        <Accordion.Item>
          <Accordion.Header
            className={styles.inkluderendeArbeidslivPanel__header}
          >
            Inkluderende arbeidsliv IA
          </Accordion.Header>
          <Accordion.Content>
            <BodyShort
              className={classNames(
                styles.inkluderendeArbeidslivPanel__avsnitt,
                styles.inkluderendeArbeidslivPanel__avsnitt__tittel
              )}
            >
              Hva er Inkulderende Arbeidsliv (IA)?
            </BodyShort>
            <BodyShort className={styles.inkluderendeArbeidslivPanel__avsnitt}>
              Partene i arbeidslivet har laget en intensjonsavtale om et mer
              inkluderende arbeidsliv.
            </BodyShort>
            <div className={styles.inkluderendeArbeidslivPanel__avsnitt}>
              <BodyShort
                className={styles.inkluderendeArbeidslivPanel__avsnitt__tittel}
              >
                De nasjonale målene i IA-avtalen i perioden 2019-2022 er:
              </BodyShort>
              <ul>
                <li>
                  Sykefraværsprosenten skal reduseres med 10 prosent
                  sammenlignet med årsgjennomsnittet for 2018
                </li>
                <li>Frafallet fra arbeidslivet skal reduseres</li>
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
              href={
                "https://www.regjeringen.no/no/tema/arbeidsliv/arbeidsmiljo-og-sikkerhet/inkluderende_arbeidsliv/ia-avtalen-20192022/ia-avtalen-20192022/id2623741/"
              }
              className={classNames(
                styles.inkluderendeArbeidslivPanel__avsnitt,
                styles.inkluderendeArbeidslivPanel__lenke
              )}
            >
              Les mer om IA-avtalen på sidene til regjeringen
            </Link>
            <div className={styles.inkluderendeArbeidslivPanel__avsnitt}>
              <BodyShort
                className={styles.inkluderendeArbeidslivPanel__avsnitt__tittel}
              >
                Virkemidler som NAV leverer i IA-avtalen:
              </BodyShort>
              <div
                className={
                  styles.inkluderendeArbeidslivPanel__lenkepanel__gruppe
                }
              >
                <LinkPanel
                  className={styles.inkluderendeArbeidslivPanel__lenkepanel}
                  href={
                    "https://arbeidsgiver.nav.no/veiviserarbeidsgiver/tiltak/ekspertbistand"
                  }
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
                  href={
                    "https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyttig-a-vite/delta-i-prosjekt-med-kompetansetiltak-for-sykmeldte"
                  }
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
                  href={
                    "https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/nav-anbefaler-nytt-nasjonalt-konsept-helseiarbeid"
                  }
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
                  href={
                    "https://arbeidsgiver.nav.no/forebygge-sykefravaer/#oppfolging-fra-nav-arbeidslivssenter"
                  }
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
            </div>
            <Link
              className={classNames(
                styles.inkluderendeArbeidslivPanel__avsnitt,
                styles.inkluderendeArbeidslivPanel__lenke
              )}
              href={"https://arbeidsgiver.nav.no/forebygge-sykefravaer"}
            >
              Se fullstendig oversikt over NAVs tilbud her
            </Link>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
