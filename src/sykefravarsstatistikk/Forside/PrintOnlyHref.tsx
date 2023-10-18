import { BodyShort } from "@navikt/ds-react";
import styles from "./Forside.module.css";

export default function PrintOnlyHref() {
  return (
    <BodyShort className={styles["forside__innhold__href"]}>
      {window.location.href}
    </BodyShort>
  );
}
