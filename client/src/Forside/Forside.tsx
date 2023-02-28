import styles from "./forside.module.scss";
import {Calculator, HandsHeart, SpeechBubble, VideoRoom} from "@navikt/ds-icons";
import {Lenkeflis} from "../Lenkeflis/Lenkeflis";
import {LenkeflisEkstern} from "../LenkeflisEkstern/LenkeflisEkstern";
import {IdebankenIkon} from "./ikoner/IdebankenIkon";
import {ArbeidsmiljøPortalenIkon} from "./ikoner/ArbeidsmiljøportalenIkon";
import React from "react";
import {useAggregertStatistikk} from "../hooks/useAggregertStatistikk";
import {erFerdigNedlastet, RestStatus} from "../integrasjoner/rest-status";
import {Infographic} from "../komponenter/Infographic/Infographic";
import {hentUtInfographicData} from "../komponenter/Infographic/datauthenting";
import {useOrgnr} from "../hooks/useOrgnr";
import {Alert} from "@navikt/ds-react";
import {InkluderendeArbeidslivPanel} from "../InkluderendeArbeidslivPanel/InkluderendeArbeidslivPanel";
import {tomtDataobjekt} from "../integrasjoner/aggregert-statistikk-api";
import {leggTilBedriftPåUrl} from "../utils/navigasjon";

export interface ForsideProps {
    samtalestøtteUrl: string;
    forebyggingsplanUrl: string;
    sykefraværsstatistikkUrl: string;
}

export const Forside = (props: ForsideProps) => {
    const bredde = 60;
    const høyde = 60;

    const orgnr = useOrgnr();

    const samtalestøtteUrlMedOrgnr = leggTilBedriftPåUrl(
        props.samtalestøtteUrl,
        orgnr
    );

    const aggregertStatistikk = useAggregertStatistikk();
    const aggregertStatistikkData = erFerdigNedlastet(aggregertStatistikk)
        ? aggregertStatistikk.data
        : tomtDataobjekt;

    const infographicEllerBannerHvisError =
        aggregertStatistikk.status === RestStatus.Feil ? (
            <Alert variant={"error"} className={styles.forsideAlert}>
                Det har skjedd en feil. Vennligst prøv igjen senere.
            </Alert>
        ) : (
            <Infographic
                {...hentUtInfographicData(aggregertStatistikkData)}
                nedlastingPågår={!erFerdigNedlastet(aggregertStatistikk)}
                sykefraværsstatistikkUrl={props.sykefraværsstatistikkUrl}
            />
        );

    return (
        <div className={styles.sentrertSide}>
            <div className={styles.forside}>
                {infographicEllerBannerHvisError}
                <div className={styles.nyttVerktoyTilDeg}>
                    <h2>Vi har et nytt verktøy til deg...</h2>
                    <div className={styles.innhold}>
                        <p className={styles.enhet}>Regelmessig fokus på sykefravær og arbeidsmiljø bidrar til å
                            redusere fravær. Vi har samlet
                            forslag til aktiviteter dere kan gjøre på arbeidsplassen.</p>
                        <Lenkeflis
                            overskrift={"Start forebygging av sykefravær"}
                            ikon={<HandsHeart/>}
                            href={props.forebyggingsplanUrl}
                        />
                    </div>
                </div>
                <div className={styles.andreForebyggendeVerktoy}>
                    <h2>Andre forebyggende verktøy</h2>
                    <div className={styles.panelGrid}>
                        <Lenkeflis
                            overskrift={"Samtalestøtten"}
                            ikon={<SpeechBubble/>}
                            href={samtalestøtteUrlMedOrgnr}
                        />
                        <Lenkeflis
                            overskrift={"Video og kurs"}
                            ikon={<VideoRoom/>}
                            href={"/forebygge-fravar/video-og-kurs"}
                        />
                        <Lenkeflis
                            overskrift={"Fraværs&shy;kalkulator"}
                            ikon={<Calculator/>}
                            href={"/forebygge-fravar/kalkulator"}
                        />
                    </div>
                </div>
                <>
                    <InkluderendeArbeidslivPanel/>
                    <LenkeflisEkstern
                        overskrift={"Idébanken"}
                        ikon={<IdebankenIkon width={bredde} height={høyde}/>}
                        brødtekst={
                            "På idébanken finner du ideer, erfaringer og verktøy som kan bidra til bedre arbeidsmiljø og lavere sykefravær."
                        }
                        href={"https://www.idebanken.org"}
                    />
                    <LenkeflisEkstern
                        overskrift={"Arbeidsmiljø&shy;portalen"}
                        ikon={<ArbeidsmiljøPortalenIkon width={bredde} height={høyde}/>}
                        brødtekst={
                            "Leter du etter flere gode verktøy for å bedre arbeidsmiljøet? Her finner du kunnskap og digitale verktøy."
                        }
                        href={"https://www.arbeidsmiljoportalen.no"}
                    />
                </>
            </div>
        </div>
    );
};
