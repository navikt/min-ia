import React from "react";
import { InnloggingssideIkon } from "./InnloggingssideIkon";
import "@navikt/ds-css";
import { BodyLong, Button, Heading, Link } from "@navikt/ds-react";
import { API_BASE_URL } from "../utils/konstanter";
import styles from "./Innloggingsside.module.scss";

interface Props {
  redirectUrl: string;
}

export const Innloggingsside: React.FunctionComponent<Props> = ({
  redirectUrl,
}) => {
  const redirectTilLogin = () => {
    window.location.href = `${API_BASE_URL}/redirect-til-login?redirect=${redirectUrl}`;
  };

  return (
    <div className={styles.innloggingsside__wrapper}>
      <div className={styles.innloggingsside}>
        <div className={styles.innloggingsside__illustrasjon}>
          <InnloggingssideIkon height={60} width={60} />
        </div>
        <Heading size="xlarge">Forebygge fravær</Heading>

        <BodyLong spacing>Inkluderende arbeidsliv</BodyLong>

        <Link
          href={
            "https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring"
          }
          className={styles.innloggingsside__link}
        >
          Les mer om roller og tilganger
        </Link>

        <Button
          onClick={redirectTilLogin}
          className={styles.innloggingsside__loginKnappWrapper}
        >
          Logg inn
        </Button>
      </div>
    </div>
  );
};
