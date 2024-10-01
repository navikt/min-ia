import { Button } from "@navikt/ds-react";
import { useReactToPrint } from "react-to-print";
import React from "react";
import { DownloadIcon } from "@navikt/aksel-icons";
import styles from "./LastNedKnapp.module.css";
import { sendKnappEvent } from "../../../amplitude/amplitude";

export default function LastNedKnapp({
  innholdRef,
}: {
  innholdRef: React.RefObject<HTMLDivElement>;
}) {
  const lastNedKnappRef = React.useRef<HTMLButtonElement>(null);
  const printFn = useReactToPrint({
    onBeforePrint: () => {
      sendKnappEvent("skriv ut");
      return Promise.resolve();
    },
    onAfterPrint: () => {
      if (lastNedKnappRef.current) {
        lastNedKnappRef.current.focus();
      }
    },
    contentRef: innholdRef,
  });
  return (
    <Button
      variant="secondary"
      lang="nb"
      aria-label="Last ned sykefraværsstatistikken"
      ref={lastNedKnappRef}
      className={`${styles["last-ned-knapp"]} ${styles["responsiv-last-ned-knapp"]}`}
      onClick={() => printFn()}
    >
      <DownloadIcon title={"Nedlastingsikon"} fontSize="1.75rem" />
      Last ned
    </Button>
  );
}
