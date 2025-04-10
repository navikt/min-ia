import React from "react";
import informasjonsirkelSvg from "./informasjon-sirkel.svg";
import styles from "./ManglerRettigheterIAltinnSide.module.css";
import { OrganisasjonerMedTilgangListe } from "./OrganisasjonerMedTilgangListe/OrganisasjonerMedTilgangListe";
import EksternLenke from "../../felleskomponenter/EksternLenke/EksternLenke";
import { BodyShort, Heading } from "@navikt/ds-react";
import { RestAltinnOrganisasjoner } from "../../../integrasjoner/altinnorganisasjon-api";
import Image from "next/image";

interface Props {
    restOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
}

export const ManglerRettigheterIAltinnSide: React.FunctionComponent<Props> = ({
                                                                                  restOrganisasjonerMedStatistikk,
                                                                              }) => {
    const harRestOrganisasjonerMedStatistikk = restOrganisasjonerMedStatistikk.status === "Suksess" && restOrganisasjonerMedStatistikk.data.length > 0;
    return (
        <div className={styles["mangler-rettigheter-i-altinn__wrapper"]}>
            <div className={styles["mangler-rettigheter-i-altinn"]}>
                <div className={styles["mangler-rettigheter-i-altinn__tekst_og_ikon"]}>
                    <Image
                        src={informasjonsirkelSvg}
                        className={
                            styles["mangler-rettigheter-i-altinn__tekst_og_ikon__ikon"]
                        }
                        alt="informasjonsirkel"
                    />
                    <Heading level="2" size={"medium"}>
                        Du mangler tilgang i Altinn
                    </Heading>
                </div>

                <div className={styles["mangler-rettigheter-i-altinn__overskrifter"]}>
                    <BodyShort
                        className={styles["mangler-rettigheter-i-altinn__overskrift"]}
                        spacing
                    >
                        Du mangler tilgang i Altinn for å se sykefraværsstatistikk
                        for denne virksomheten. Ta kontakt med den i organisasjonen din som kan delegere tilganger.
                    </BodyShort>
                    <BodyShort
                        className={styles["mangler-rettigheter-i-altinn__overskrift"]}
                        spacing
                    >
                        Altinn-tilgangen heter &quot;Virksomhetens legemeldte sykefraværsstatistikk&quot;.
                    </BodyShort>
                </div>

                {harRestOrganisasjonerMedStatistikk &&
                    <OrganisasjonerMedTilgangListe
                        restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                    />
                }
                <EksternLenke href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring">
                    Les mer om hvordan tilgangsstyringen i Altinn fungerer
                </EksternLenke>
            </div>
        </div>
    );
};
