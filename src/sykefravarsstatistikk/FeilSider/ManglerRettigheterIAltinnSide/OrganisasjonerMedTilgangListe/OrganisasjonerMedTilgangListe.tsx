import React, { FunctionComponent } from "react";
import styles from "./OrganisasjonerMedTilgangListe.module.css";
import { Accordion } from "@navikt/ds-react";
import { RestAltinnOrganisasjoner } from "../../../../integrasjoner/altinnorganisasjon-api";
import { RestStatus } from "../../../../integrasjoner/rest-status";

interface Props {
  restOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
}

export const OrganisasjonerMedTilgangListe: FunctionComponent<Props> = ({
  restOrganisasjonerMedStatistikk,
}) => {
  if (restOrganisasjonerMedStatistikk.status !== RestStatus.Suksess) {
    return null;
  }
  return (
    <Accordion className={styles["organisasjoner-med-tilgang-liste"]}>
      <Accordion.Item>
        <Accordion.Header>
          Du har tilgang til sykefraværsstatistikk for disse virksomhetene
        </Accordion.Header>
        <Accordion.Content>
          <ul className={styles["organisasjoner-med-tilgang-liste__liste"]}>
            {restOrganisasjonerMedStatistikk.data.map((org) => (
              <li
                className={
                  styles["organisasjoner-med-tilgang-liste__listeelement"]
                }
                key={org.OrganizationNumber}
              >
                {`${org.Name} (${org.OrganizationNumber})`}
              </li>
            ))}
          </ul>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
