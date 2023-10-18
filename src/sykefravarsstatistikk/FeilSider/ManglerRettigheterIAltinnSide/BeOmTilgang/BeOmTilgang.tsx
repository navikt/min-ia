import React, { FunctionComponent } from "react";
import { BodyShort, Label, LinkPanel } from "@navikt/ds-react";
import altinnLogo from "./altinn-logo.svg";
import styles from "./BeOmTilgang.module.css";
import { useOrgnr } from "../../../../hooks/useOrgnr";
import Image from "next/image";

const beOmTilgangTilSykefraværsstatistikkIAltinnLink = (
  orgnr: string | undefined
) =>
  "https://altinn.no/ui/DelegationRequest?offeredBy=" +
  orgnr +
  "&resources=3403_2";

export const BeOmTilgang: FunctionComponent = () => {
  const orgnr = useOrgnr();
  return (
    <LinkPanel
      border
      href={beOmTilgangTilSykefraværsstatistikkIAltinnLink(orgnr)}
    >
      <LinkPanel.Title>
        <span className={styles["be-om-tilgang"]}>
          <span className={styles["be-om-tilgang__svg"]}>
            <Image
              src={altinnLogo}
              className={
                styles["mangler-rettigheter-i-altinn__tekst_og_ikon__ikon"]
              }
              alt="altinn-logo"
            />
          </span>
          <span className={styles["be-om-tilgang__tekst"]}>
            <Label
              size="medium"
              className={styles["be-om-tilgang__tittel"]}
              spacing
            >
              Be om tilgang i Altinn
            </Label>
            <BodyShort>
              Gå til Altinn og be om tilgang til tjenesten. Du kan velge hvem i
              virksomheten som får forespørselen.
            </BodyShort>
          </span>
        </span>
      </LinkPanel.Title>
    </LinkPanel>
  );
};
