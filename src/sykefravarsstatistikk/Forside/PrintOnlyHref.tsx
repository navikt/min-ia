import { BodyShort } from "@navikt/ds-react";
import styles from "./Forside.module.css";
import { useEffect, useState } from "react";

export default function PrintOnlyHref() {
  const [href, setRef] = useState<string | undefined>(undefined);

  useEffect(() => {
    setRef(window.location.href);
  }, []);

  if (!href) {
    return null;
  }

  return (
    <BodyShort className={styles["forside__innhold__href"]}>{href}</BodyShort>
  );
}
