import React from "react";

import { useScript } from "./UseScript";

import styles from "./uxSignalsWidget.module.scss";
import { Page } from "@navikt/ds-react";

export const UXSignalsWidget = ({
  eriDev,
  id,
}: {
  eriDev: boolean;
  id: string;
}) => {
  useScript(true);

  return (
    <Page.Block width="xl" gutters>
      <div
        data-uxsignals-embed={id}
        data-uxsignals-mode={eriDev ? "demo" : ""}
        className={styles.uxSignalWidget}
      />
    </Page.Block>
  );
};
