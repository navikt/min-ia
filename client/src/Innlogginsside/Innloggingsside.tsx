import React, { FunctionComponent } from "react";
import { InnloggingssideIkon } from "./InnloggingssideIkon";
import { BodyLong, Button, Heading, Link } from "@navikt/ds-react";
import { BASE_PATH } from "../utils/konstanter";
import styles from "./Innloggingsside.module.scss";

interface InnloggingssideProps {
  redirectUrl: string;
}
export const Innloggingsside: FunctionComponent<InnloggingssideProps> = ({
  redirectUrl,
}) => {
  const redirectTilLogin = () => {
    window.location.href = `${BASE_PATH}/redirect-til-login?redirect=${redirectUrl}`;
  };

  return (
    <div className={styles.innloggingsside__wrapper}>
      <div className={styles.innloggingsside}>
        <div className={styles.innloggingsside__illustrasjon}>
          <InnloggingssideIkon height={80} width={80} />
        </div>
        <Heading level="1" size="xlarge">Forebygge fravær</Heading>

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
          style={{paddingLeft:40, paddingRight:40 }}
        >
          Logg inn
        </Button>
      </div>
    </div>
  );
};
