import { Accordion } from "@navikt/ds-react";
import {FunctionComponent} from "react";
import styles from './InkluderendeArbeidslivPanel.module.scss';

export const InkluderendeArbeidslivPanel:FunctionComponent=()=> {
  return (
    <>
      <Accordion className={styles.inkluderendeArbeidsliv}>
        <Accordion.Item>
          <Accordion.Header>Inkluderende arbeidsliv (IA) </Accordion.Header>
          <Accordion.Content>
              <div >Partene i arbeidslivet har laget en intensjonsavtale om et mer inkluderende arbeidsliv.</div>
              <div>De nasjonale målene i IA-avtalen i perioden 2019-2022 er:
                  Sykefraværsprosenten skal reduseres med 10 prosent sammenlignet med årsgjennomsnittet for 2018.
                  Frafallet fra arbeidslivet skal reduseres.
              </div>
              <div>For å nå målene er det valgt ut to innsatsområder:
                  Forebyggende arbeidsmiljøarbeid
                  Innsats mot lange og/eller hyppige gjentagende sykefravær
                  </div>
              <div>Les mer om IA-avtalen på sidene til regjeringen</div>
              <div>Virkemidler som NAV leverer i IA-avtalen:
                  Tilskudd til ekspertbistand
                  Kompetansetiltak for sykmeldte
                  HelseIArbeid
                  Tjenester fra NAV Arbeidslivssenter
              </div>
              <div>Se fullstendig oversikt over NAVs tilbud her</div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
