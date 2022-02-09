import styles from "./forside.module.scss";
import { Heading } from "@navikt/ds-react";

export const Forside = () => {
  return (
    <div className={styles.forside}>
      <Heading size={"small"}>Welkommen til Forsiden!</Heading>
    </div>
  );
};
