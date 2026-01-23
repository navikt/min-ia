import React, { FunctionComponent } from "react";
import { InnloggingssideIkon } from "./InnloggingssideIkon";
import { BodyLong, Button, Heading, Link } from "@navikt/ds-react";
import { API_BASE_PATH } from "../utils/konstanter";
import styles from "./Innloggingsside.module.scss";

interface InnloggingssideProps {
  redirectUrl: string;
}
export const Innloggingsside: FunctionComponent<InnloggingssideProps> = ({
  redirectUrl,
}) => {
  const redirectTilLogin = () => {
    window.location.href = `${API_BASE_PATH}/authentication?redirect=${redirectUrl}`;
  };

  return (
    <div className={styles.innloggingsside__wrapper}>
      <div className={styles.innloggingsside}>
        <div className={styles.innloggingsside__illustrasjon}>
          <InnloggingssideIkon height={80} width={80} />
        </div>
        <Heading level="1" size="xlarge">
          Forebygge fravær
        </Heading>

        <BodyLong spacing>
          Her finner du legemeldt sykefraværsstatistikk, sammenligning med din
          bransje og verktøy for å forebygge fravær
        </BodyLong>

        <Button
          onClick={redirectTilLogin}
          style={{ paddingLeft: 40, paddingRight: 40 }}
        >
          Logg inn
        </Button>

        <Link
          href={
            "https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring"
          }
          className={styles.innloggingsside__link}
        >
          Siden krever Altinn-tilganger, les mer om roller og tilganger her
        </Link>
      </div>
    </div>
  );
};
