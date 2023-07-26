import styles from "./nyttVerktøyTilDeg.module.scss";
import { Lenkeflis } from "../../Lenkeflis/Lenkeflis";
import { HandsHeart } from "@navikt/ds-icons";
import React from "react";
import { Heading } from "@navikt/ds-react";

export function NyttVerktoyTilDeg(props: { href: string }) {
  return (
    <div className={styles.nyttVerktøyTilDeg}>
      <Heading size={"large"} level={"2"}>
        Slik kan du jobbe med forebygging
      </Heading>
      <div className={styles.innhold}>
        <p className={styles.enhet}>
          Regelmessig fokus på sykefravær og arbeidsmiljø bidrar til å redusere
          fravær. Vi har samlet forslag til aktiviteter du kan gjøre alene og
          sammen med ansatte på arbeidsplassen.
        </p>
        <Lenkeflis
          overskrift={"Verktøy for forebygging av sykefravær"}
          ikon={<HandsHeart aria-hidden />}
          href={props.href}
        />
      </div>
    </div>
  );
}
