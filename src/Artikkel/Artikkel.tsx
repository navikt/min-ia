import styles from "./Artikkel.module.scss";
import {BodyLong, Heading, Link} from "@navikt/ds-react";
import Image from "next/image";
import artikkelBildeLiten from "./artikkelBilde_liten.png"
import {ExternalLinkIcon} from '@navikt/aksel-icons';


import React from "react";

export function Artikkel() {

    const erIDev = [
        "localhost",
        "forebygge-fravar.intern.dev.nav.no",
    ].includes(window.location.hostname);
    const lenkeTilArtikkel = erIDev?
        "https://arbeidsgiver.intern.dev.nav.no/min-side-arbeidsgiver/artikkel/saferoad_ansetter_ved_hjelp_av_nav" :
        "https://arbeidsgiver.nav.no/min-side-arbeidsgiver/artikkel/saferoad_ansetter_ved_hjelp_av_nav"

    return (
        <div className={styles.lenkeflis}>
            <div className={styles.lenkeflisInnhold}>
                <Image
                    className={styles.lenkeflisBilde}
                    src={artikkelBildeLiten}
                    width={50}
                    height={50}
                    alt="illustrasjon"
                    layout="responsive"
                />
                <div className={styles.lenkeflisInnholdTittelOgTekst}>
                    <Heading level="3" size="medium">Ønsker du hjelp til å rekruttere?</Heading>
                    <BodyLong>
                        <Link href={lenkeTilArtikkel}>Les om hvordan NAV bidrar til at Saferoad kan ansette over 100 nye folk
                            hvert år. <ExternalLinkIcon title="Lenke til artikkel i ny side" fontSize="1.5rem"/> </Link>
                    </BodyLong>
                </div>
            </div>
        </div>
    );
}
