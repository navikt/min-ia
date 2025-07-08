import { Alert, BodyShort, Heading, Link } from "@navikt/ds-react";
import styles from "./TestVersjonBanner.module.scss";
import React from "react";

const TestVersjonBanner = ({
  sidenavn,
  prodUrl,
  kjørerMockApp = false,
}: {
  sidenavn: string;
  prodUrl?: string;
  kjørerMockApp?: boolean;
}) => {
  const [show, setShow] = React.useState(true);
  if (!kjørerMockApp) return null;

  if (!show) return null;

  return (
    <Alert variant="warning" size="medium" className={styles.alert} onClose={() => setShow(false)} closeButton>
      <Heading spacing level="2" size="small">
        Dette er en testversjon
      </Heading>
      <BodyShort>
        Her kan du bli bedre kjent med {sidenavn}.
        {prodUrl?.length ? (
          <>
            <br />
            <Link href={prodUrl}>
              Klikk her for å gå til den vanlige siden.
            </Link>
          </>
        ) : null}
      </BodyShort>
    </Alert>
  );
};
export default TestVersjonBanner;
