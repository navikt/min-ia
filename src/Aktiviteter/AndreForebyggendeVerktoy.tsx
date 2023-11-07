import styles from "./Aktiviteter.module.scss";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { Calculator, SpeechBubble } from "@navikt/ds-icons";
import React from "react";

export function AndreForebyggendeVerktoy(props: { href: string }) {
  return (
    <div className={styles.lenkefliser}>
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
  );
}
