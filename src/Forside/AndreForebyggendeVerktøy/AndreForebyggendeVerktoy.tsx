import styles from "./andreForebyggendeVerktøy.module.scss";
import { Lenkeflis } from "../../Lenkeflis/Lenkeflis";
import { Calculator, SpeechBubble } from "@navikt/ds-icons";
import React from "react";
import { Heading } from "@navikt/ds-react";

export function AndreForebyggendeVerktoy(props: { href: string }) {
  return (
    <div className={styles.andreForebyggendeVerktøy}>
      <Heading size={"large"} level={"2"}>
        Andre forebyggende verktøy
      </Heading>
      <div className={styles.panelGrid}>
        <Lenkeflis
          overskrift={"Samtalestøtten"}
          ikon={<SpeechBubble aria-hidden />}
          href={props.href}
        />
        <Lenkeflis
          overskrift={"Fraværskalkulator"}
          ikon={<Calculator aria-hidden />}
          href={"/forebygge-fravar/kalkulator"}
        />
      </div>
    </div>
  );
}
