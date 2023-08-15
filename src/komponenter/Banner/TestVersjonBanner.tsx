import { Alert, BodyShort, Heading } from "@navikt/ds-react";
import styles from "./TestVersjonBanner.module.css";
const TestVersjonBanner = ({ sidenavn }: { sidenavn: string }) => {
  return (
    <Alert variant="warning" size="medium" className={styles.alert}>
      <Heading spacing level="2" size="small">
        Dette er en testversjon
      </Heading>
      <BodyShort>Her kan du bli bedre kjent med siden {sidenavn}</BodyShort>
    </Alert>
  );
};

export default TestVersjonBanner;
