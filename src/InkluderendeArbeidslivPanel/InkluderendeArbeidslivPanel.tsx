import { Accordion, BodyShort, Link, LinkPanel } from "@navikt/ds-react";
import React, { FunctionComponent } from "react";
import styles from "./InkluderendeArbeidslivPanel.module.scss";
import classNames from "classnames";

const Lenkepanel: React.FunctionComponent<{
  lenketekst: string;
  destinasjon: string;
}> = ({ destinasjon, lenketekst }) => {
  return (
    <LinkPanel
      className={styles.inkluderendeArbeidslivPanel__lenkepanel}
      href={destinasjon}
    >
      <LinkPanel.Title
        className={styles.inkluderendeArbeidslivPanel__lenkepanel__tittel}
      >
        {lenketekst}
      </LinkPanel.Title>
    </LinkPanel>
  );
};
const SOFT_HYPHEN = String.fromCharCode(173);

export const InkluderendeArbeidslivPanel: FunctionComponent = () => {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header
          className={classNames(
            "navds-panel",
            "navds-link-panel",
            "navds-panel--border",
            styles.inkluderendeArbeidslivAccordion,
          )}
        >
          <LinkPanel.Title>Inkluderende arbeidsliv</LinkPanel.Title>
        </Accordion.Header>
        <Accordion.Content>
          <BodyShort
            className={classNames(
              styles.inkluderendeArbeidslivPanel__avsnitt,
              styles.inkluderendeArbeidslivPanel__avsnitt__tittel,
            )}
          >
            Hva er Inkluderende Arbeidsliv (IA)?
          </BodyShort>
          <BodyShort className={styles.inkluderendeArbeidslivPanel__avsnitt}>
            Partene i arbeidslivet har laget en intensjonsavtale om et mer
            inkluderende arbeidsliv.
          </BodyShort>
          <div className={styles.inkluderendeArbeidslivPanel__avsnitt}>
            <BodyShort
              className={styles.inkluderendeArbeidslivPanel__avsnitt__tittel}
            >
              Målene i IA-avtalen for perioden 2019-2024 er:
            </BodyShort>
            <ul>
              <li>Redusere sykefraværet</li>
              <li>Hindre frafall fra arbeidslivet</li>
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
              <li>Innsats mot lange og/eller hyppige gjentagende sykefravær</li>
            </ul>
          </div>
          <Link
            href={
              "https://www.regjeringen.no/no/tema/arbeidsliv/arbeidsmiljo-og-sikkerhet/inkluderende_arbeidsliv/ia-avtalen-20192022/ia-avtalen-20192022/id2623741/"
            }
            className={classNames(
              styles.inkluderendeArbeidslivPanel__avsnitt,
              styles.inkluderendeArbeidslivPanel__lenke,
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
              className={styles.inkluderendeArbeidslivPanel__lenkepanel__gruppe}
            >
              <Lenkepanel
                lenketekst={`Tilskudd til ekspert${SOFT_HYPHEN}bistand`}
                destinasjon="https://www.nav.no/arbeidsgiver/ekspertbistand"
              />
              <Lenkepanel
                lenketekst={`Kompetanse${SOFT_HYPHEN}tiltak for sykmeldte`}
                destinasjon="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyttig-a-vite/delta-i-prosjekt-med-kompetansetiltak-for-sykmeldte"
              />
              <Lenkepanel
                lenketekst="HelseIArbeid"
                destinasjon="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/nav-anbefaler-nytt-nasjonalt-konsept-helseiarbeid"
              />
              <Lenkepanel
                lenketekst={`Tjenester fra NAV Arbeidslivs${SOFT_HYPHEN}senter`}
                destinasjon="https://arbeidsgiver.nav.no/forebygge-sykefravaer/#oppfolging-fra-nav-arbeidslivssenter"
              />
            </div>
          </div>
          <Link
            href={"https://arbeidsgiver.nav.no/forebygge-sykefravaer"}
            className={classNames(
              styles.inkluderendeArbeidslivPanel__avsnitt,
              styles.inkluderendeArbeidslivPanel__lenke,
            )}
          >
            Se fullstendig oversikt over NAVs tilbud her
          </Link>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
