import React from "react";
import informasjonsirkelSvg from "./informasjon-sirkel.svg";
import styles from "./ManglerRettigheterIAltinnSide.module.css";
import { OrganisasjonerMedTilgangListe } from "./OrganisasjonerMedTilgangListe/OrganisasjonerMedTilgangListe";
import { BeOmTilgang } from "./BeOmTilgang/BeOmTilgang";
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
            Du mangler rettigheter i Altinn
          </Heading>
        </div>

        <BodyShort
          className={styles["mangler-rettigheter-i-altinn__overskrift"]}
          spacing
        >
          Du har ikke Altinn-tilgangen du trenger for å se sykefraværsstatistikk
          for denne virksomheten. Bytt til en virksomhet der du har tilgang
          eller be om tilgang i Altinn for denne virksomheten.
        </BodyShort>
        <BeOmTilgang />

        <OrganisasjonerMedTilgangListe
          restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
        />
        <EksternLenke href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring">
          Les mer om hvordan tilgangsstyringen i Altinn fungerer
        </EksternLenke>
      </div>
    </div>
  );
};
