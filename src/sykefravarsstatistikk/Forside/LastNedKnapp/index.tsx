import { Button } from "@navikt/ds-react";
import ReactToPrint from "react-to-print";
import React from "react";
import { DownloadIcon } from "@navikt/aksel-icons";
import styles from "./LastNedKnapp.module.css";
import {sendKnappEvent} from "../../../amplitude/amplitude";

export default function LastNedKnapp({
  innholdRef,
}: {
  innholdRef: React.RefObject<HTMLDivElement>;
}) {
  const lastNedKnappRef = React.useRef<HTMLButtonElement>(null);
  return (
    <ReactToPrint
      onBeforePrint={() => {
        sendKnappEvent("skriv ut");
      }}
      onAfterPrint={() => {
        if (lastNedKnappRef.current) {
          lastNedKnappRef.current.focus();
        }
      }}
      content={() => innholdRef.current}
      trigger={() => (
        <Button
          variant="secondary"
          lang="nb"
          aria-label="Last ned sykefraværsstatistikken"
          ref={lastNedKnappRef}
          className={`${styles["last-ned-knapp"]} ${styles["responsiv-last-ned-knapp"]}`}
        >
          <DownloadIcon title={"Nedlastingsikon"} fontSize="1.75rem" />
          Last ned
        </Button>
      )}
    />
  );
}
