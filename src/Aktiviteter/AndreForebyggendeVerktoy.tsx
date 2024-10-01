import styles from "./Aktiviteter.module.scss";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { CalculatorIcon, ChatIcon } from "@navikt/aksel-icons";
import React from "react";
import { SAMTALESTØTTE_URL } from "../utils/konstanter";

export function AndreForebyggendeVerktoy() {
  return (
    <div className={styles.lenkefliser}>
      <Lenkeflis
        overskrift={"Samtalestøtten"}
        ikon={<ChatIcon aria-hidden />}
        href={SAMTALESTØTTE_URL}
      />
      <Lenkeflis
        overskrift={"Fraværskalkulator"}
        ikon={<CalculatorIcon aria-hidden />}
        href={"/forebygge-fravar/kalkulator"}
      />
    </div>
  );
}
