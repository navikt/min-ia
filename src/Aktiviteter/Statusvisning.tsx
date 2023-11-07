import React from "react";
import styles from "./Statusvisning.module.scss";
import { Tag } from "@navikt/ds-react";
import { StatusType } from "./AktivitetData";

export function Statusvisning({ status }: { status?: StatusType }) {
  switch (status) {
    case "STARTET":
      return (
        <Tag className={styles.status} variant="warning">
          Under arbeid
        </Tag>
      );
    case "FULLFØRT":
      return (
        <Tag className={styles.status} variant="success">
          Fullført
        </Tag>
      );
    case "AVBRUTT":
    case null:
    case undefined:
    default:
      return null;
  }
}
