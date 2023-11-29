import styles from "./Aktiviteter.module.scss";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { Calculator, SpeechBubble } from "@navikt/ds-icons";
import React from "react";
import { SAMTALESTØTTE_URL } from "../utils/konstanter";

export function AndreForebyggendeVerktoy() {
  return (
    <div className={styles.lenkefliser}>
      <Lenkeflis
        overskrift={"Samtalestøtten"}
        ikon={<SpeechBubble aria-hidden />}
        href={SAMTALESTØTTE_URL}
      />
      <Lenkeflis
        overskrift={"Fraværskalkulator"}
        ikon={<Calculator aria-hidden />}
        href={"/forebygge-fravar/kalkulator"}
      />
    </div>
  );
}
