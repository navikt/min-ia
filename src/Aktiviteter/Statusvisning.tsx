import React from "react";
import styles from "./Oppgave/Oppgave.module.scss";
import { Tag } from "@navikt/ds-react";
import { StatusType } from "./AktivitetData";

export function Statusvisning({ status }: { status?: StatusType }) {
  switch (status) {
    case "STARTET":
      return (
        <Tag data-color="warning" className={styles.oppgavestatus} variant="outline">Under arbeid
                  </Tag>
      );
    case "FULLFØRT":
      return (
        <Tag data-color="success" className={styles.oppgavestatus} variant="outline">Fullført
                  </Tag>
      );
    case "AVBRUTT":
    case null:
    case undefined:
    default:
      return null;
  }
}
