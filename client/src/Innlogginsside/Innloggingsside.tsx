import React from 'react';
import illustrasjonSvg from './statistikk-ikon.svg';
import './Innloggingsside.less';
import {BodyLong, Button, Heading, Link} from "@navikt/ds-react";

interface Props {
    redirectUrl: string;
}
export const Innloggingsside: React.FunctionComponent<Props> = ({ redirectUrl }) => {
    const redirectTilLogin = () => {
        window.location.href = `/sykefravarsstatistikk/redirect-til-login?redirect=${redirectUrl}`;
    };

    return (
        <div className="innloggingsside__wrapper">
            <div className="innloggingsside">
                <img src={illustrasjonSvg} className="innloggingsside__illustrasjon" alt="" />

                <Heading size="2xlarge">Sykefraværsstatistikk</Heading>

                <BodyLong spacing>
                    Se statistikk om sykefraværet i din virksomhet og sammenligne dere med andre
                    virksomheter. For å se statistikken må du logge inn. Tilgangstyringen skjer
                    gjennom Altinn.
                </BodyLong>

                <Link
                    href={
                        'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'
                    }
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
