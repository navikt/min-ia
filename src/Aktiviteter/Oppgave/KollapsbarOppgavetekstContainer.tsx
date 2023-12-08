import React from "react";
import styles from "./Oppgave.module.scss";
import { StatusType } from "../AktivitetData";

function erKollapsetType(status?: StatusType): boolean {
  return status === "AVBRUTT" || status === "FULLFØRT" || status === undefined;
}
export function KollapsbarOppgavetekstContainer({
  children,
  knapper,
  status,
}: {
  children: React.ReactNode;
  knapper: React.ReactNode;
  status?: StatusType;
}) {
  const kollapset = erKollapsetType(status);
  return (
    <div
      className={
        `${styles.oppgavetekst} ${kollapset ? styles.kollapsetOppgavetekst : ''}`
      }
    >
      <div aria-hidden={kollapset ? "true" : "false"} className={styles.oppgavetekstinnhold}>{children}</div>
      <div className={styles.oppgavetekstOverlayGradient}>{knapper}</div>
    </div>
  );
}
