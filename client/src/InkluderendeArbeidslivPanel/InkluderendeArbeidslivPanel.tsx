import {Accordion, BodyShort, LinkPanel} from "@navikt/ds-react";
import React, {FunctionComponent} from "react";
import styles from "./InkluderendeArbeidslivPanel.module.scss";
import classNames from "classnames";
import {LenkeMedEventutsendelse} from "../LenkeMedNavigereEvent/LenkeMedEventutsendelse";
import {navigerEtterCallbacks} from "../utils/navigasjon";
import {sendNavigereEvent} from "../amplitude/events";

const Lenkepanel: React.FunctionComponent<{
    lenketekst: string; destinasjon: string;
}> = ({destinasjon, lenketekst}) => {
    const eventutsendelse = () => sendNavigereEvent(destinasjon, lenketekst);
    return (<LinkPanel
        className={styles.inkluderendeArbeidslivPanel__lenkepanel}
        href={destinasjon}
        onClickCapture={(e) => {
            e.preventDefault();
        }}
        onClick={() => {
            navigerEtterCallbacks(destinasjon, [eventutsendelse]);
        }}
    >
        <LinkPanel.Title className={styles.inkluderendeArbeidslivPanel__lenkepanel__tittel}>
            {lenketekst}
        </LinkPanel.Title>
    </LinkPanel>);
};

export const InkluderendeArbeidslivPanel: FunctionComponent = () => {
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header className={classNames("navds-panel", "navds-link-panel", "navds-panel--border")}>
                    <LinkPanel.Title>
                        Inkluderende arbeidsliv
                    </LinkPanel.Title>
                </Accordion.Header>
                <Accordion.Content>
                    <BodyShort
                        className={classNames(styles.inkluderendeArbeidslivPanel__avsnitt, styles.inkluderendeArbeidslivPanel__avsnitt__tittel)}
                    >
                        Hva er Inkluderende Arbeidsliv (IA)?
                    </BodyShort>
                    <BodyShort className={styles.inkluderendeArbeidslivPanel__avsnitt}>
                        Partene i arbeidslivet har laget en intensjonsavtale om et mer
                        inkluderende arbeidsliv.
                    </BodyShort>
                    <div className={styles.inkluderendeArbeidslivPanel__avsnitt}>
                        <BodyShort className={styles.inkluderendeArbeidslivPanel__avsnitt__tittel}>
                            Målene i IA-avtalen for perioden 2019-2024 er:
                        </BodyShort>
                        <ul>
                            <li>Redusere sykefraværet</li>
                            <li>Hindre frafall fra arbeidslivet</li>
                        </ul>
                    </div>
                    <div className={styles.inkluderendeArbeidslivPanel__avsnitt}>
                        <BodyShort className={styles.inkluderendeArbeidslivPanel__avsnitt__tittel}>
                            For å nå målene er det valgt ut to innsatsområder:
                        </BodyShort>
                        <ul>
                            <li>Forebyggende arbeidsmiljøarbeid</li>
                            <li>
                                Innsats mot lange og/eller hyppige gjentagende sykefravær
                            </li>
                        </ul>
                    </div>
                    <LenkeMedEventutsendelse
                        href={"https://www.regjeringen.no/no/tema/arbeidsliv/arbeidsmiljo-og-sikkerhet/inkluderende_arbeidsliv/ia-avtalen-20192022/ia-avtalen-20192022/id2623741/"}
                        lenketekst="Les mer om IA-avtalen på sidene til regjeringen"
                        className={classNames(styles.inkluderendeArbeidslivPanel__avsnitt, styles.inkluderendeArbeidslivPanel__lenke)}
                    />
                    <div className={styles.inkluderendeArbeidslivPanel__avsnitt}>
                        <BodyShort className={styles.inkluderendeArbeidslivPanel__avsnitt__tittel}>
                            Virkemidler som NAV leverer i IA-avtalen:
                        </BodyShort>
                        <div className={styles.inkluderendeArbeidslivPanel__lenkepanel__gruppe}>
                            <Lenkepanel
                                lenketekst="Tilskudd til ekspertbistand"
                                destinasjon="https://arbeidsgiver.nav.no/veiviserarbeidsgiver/tiltak/ekspertbistand"
                            />
                            <Lenkepanel
                                lenketekst="Kompetansetiltak for sykmeldte"
                                destinasjon="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyttig-a-vite/delta-i-prosjekt-med-kompetansetiltak-for-sykmeldte"
                            />
                            <Lenkepanel
                                lenketekst="HelseIArbeid"
                                destinasjon="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/nav-anbefaler-nytt-nasjonalt-konsept-helseiarbeid"
                            />
                            <Lenkepanel
                                lenketekst="Tjenester fra NAV Arbeidslivssenter"
                                destinasjon="https://arbeidsgiver.nav.no/forebygge-sykefravaer/#oppfolging-fra-nav-arbeidslivssenter"
                            />
                        </div>
                    </div>
                    <LenkeMedEventutsendelse
                        href={"https://arbeidsgiver.nav.no/forebygge-sykefravaer"}
                        lenketekst="Se fullstendig oversikt over NAVs tilbud her"
                        className={classNames(styles.inkluderendeArbeidslivPanel__avsnitt, styles.inkluderendeArbeidslivPanel__lenke)}
                    />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
