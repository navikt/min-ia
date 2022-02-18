import React from "react";
import illustrasjonSvg from "./statistikk-ikon.svg";
//import './Innloggingsside.scss';
import "@navikt/ds-css";
import Image from 'next/image'
import { BodyLong, Button, Heading, Link } from "@navikt/ds-react";

interface Props {
  redirectUrl: string;
}

export const Innloggingsside: React.FunctionComponent<Props> = ({
  redirectUrl,
}) => {
  const redirectTilLogin = () => {
    window.location.href = `/min-ia/redirect-til-login?redirect=${redirectUrl}`;
  };

  return (
    <div className="innloggingsside__wrapper">
      <div className="innloggingsside">
        <Image
          src={illustrasjonSvg}
          className="innloggingsside__illustrasjon"
          alt=""
        />

        <Heading size="2xlarge">Forebygge fravær</Heading>

        <BodyLong spacing>
          TODO hente riktig tekst til min-ia innloggingsside
          .....Tilgangstyringen skjer gjennom Altinn.
        </BodyLong>

        <Link
          href={
            "https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring"
          }
          className="innloggingsside__link"
        >
          Les mer om roller og tilganger
        </Link>

        <Button
          onClick={redirectTilLogin}
          className="innloggingsside__loginKnapp-wrapper"
        >
          Logg inn
        </Button>
      </div>
    </div>
  );
};
